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
  const value = useMemo(() => ({ expanded, toggle }), [expanded, toggle]);
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
  const { expanded, toggle } = useExpanded()
  useEffectAfterMount(
    () => {
      console.log('Yay! button was clicked!!')
    }, 
    [expanded]
  )
  return (
    <div className='Expandable'>
      <Header toggle={toggle}>Awesome Hooks</Header>
      <Icon expanded={expanded} />
      <Body expanded={expanded}>React hooks is awesome!</Body>
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
