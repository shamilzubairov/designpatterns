import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect
} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function useExpanded() {
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(
    () => setExpanded(prevExpanded => !prevExpanded),
    []
  );
  const callFunctionsInSequence = (...fns) => (...args) => {
    fns.forEach(fn => fn && fn(...args))
  }
  const getTogglerProps = useCallback(
    ({onClick, ...props} = {}) => ({
      'aria-expanded': expanded,
      onClick: callFunctionsInSequence(toggle, onClick),
      ...props
    }),
    [toggle, expanded]
  );
  const value = useMemo(
    () => ({ expanded, toggle, getTogglerProps }), 
    [expanded, toggle, getTogglerProps]
  );
  return value;
}

function useEffectAfterMount(cb, deps) {
  const componentMounted = useRef(true);
  useEffect(() => {
    if (!componentMounted.current) {
      cb();
    }
    componentMounted.current = false;
  }, deps)
}

function App () {
  const { expanded, getTogglerProps } = useExpanded()
  useEffectAfterMount(
    () => {
      console.log('Yay! button was clicked!!')
    }, 
    [expanded]
  )
  const customClickHandler = (e) => {
    console.log('custom click handler!!!!!')
  };
  return (
    <div style={{ marginTop: '3rem' }}>
      <button {...getTogglerProps({
          id: 'my-btn-id',
          'aria-label': 'custom toggler',
          onClick: customClickHandler
      })
      }>Click to view awesomeness...</button> 
      {expanded ? <p>{'😎 '.repeat(50)}</p> : null}
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
