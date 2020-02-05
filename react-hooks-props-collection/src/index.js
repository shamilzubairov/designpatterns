import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect
} from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import "./Expandable.css";
import "./Header.css";
import "./Body.css";
import "./Icon.css";

const ExpandableContext = createContext();
const { Provider } = ExpandableContext;

function useExpanded() {
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(
    () => setExpanded(prevExpanded => !prevExpanded),
    []
  );
  const togglerProps = useMemo(
    () => ({
      onClick: toggle,
      'aria-expanded': expanded
    }), 
    [toggle, expanded]
  )
  const value = useMemo(
    () => ({ expanded, toggle, togglerProps }), 
    [expanded, toggle, togglerProps]
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

const Header = ({ children, className = "", toggle, ...otherProps }) => {
  const combinedClasses = ["Expandable-trigger", className].join(" ");
  return (
    <button {...otherProps} className={combinedClasses} onClick={toggle}>
      {children}
    </button>
  );
};
const Body = ({ children, className = "", expanded, ...otherProps }) => {
  const combinedClasses = ["Expandable-panel", className].join("");
  return expanded ? (
    <div className={combinedClasses} {...otherProps}>
      {children}
    </div>
  ) : null;
};
const Icon = ({ className = "", expanded, ...otherProps }) => {
  const combinedClasses = ["Expandable-icon", className].join("");
  return (
    <span className={combinedClasses} {...otherProps}>
      {expanded ? "-" : "+"}
    </span>
  );
};

function App () {
  const { expanded, togglerProps } = useExpanded()
  useEffectAfterMount(
    () => {
      console.log('Yay! button was clicked!!')
    }, 
    [expanded]
  )
  return (
    <div style={{ marginTop: '3rem' }}>
      <button {...togglerProps}>Click to view awesomeness...</button> 
      {expanded ? <p>{'😎 '.repeat(50)}</p> : null}
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
