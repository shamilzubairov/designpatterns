import React, { 
  createContext, 
  useState, 
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext
} from 'react'
import ReactDOM from "react-dom";

import "./styles.css";
import "./Expandable.css";
import "./Header.css";
import "./Body.css";
import "./Icon.css";

const ExpandableContext = createContext()
const { Provider } = ExpandableContext

const Expandable = ({ children, onExpand, className = '', ...otherProps }) => {
  const [expanded, setExpanded] = useState(false)
  const combinedClasses = ['Expandable', className].join('')
  const toggle = useCallback(() => setExpanded(prevExpanded => !prevExpanded), [])
  const mounted = useRef(true)
  useEffect(() => {
    if(!mounted.current) {
      onExpand(expanded)
    }
    mounted.current = false
  }, [expanded])
  const value = useMemo(
    () => ({ expanded, toggle }),
    [expanded, toggle]
  )
  return (
    <Provider value={value}>
      <div className={combinedClasses} {...otherProps}>
        {children}
      </div>
    </Provider>)
}

const Header = ({children, className = '', ...otherProps}) => {
  const { toggle } = useContext(ExpandableContext)
  const combinedClasses = ['Expandable-trigger', className].join(' ')
  return (
    <button
      {...otherProps}
      className={combinedClasses}
      onClick={toggle}>
      {children}
    </button>)
}

const Body = ({ children, className = '', ...otherProps }) => {
  const { expanded } = useContext(ExpandableContext)
  const combinedClasses = ['Expandable-panel', className].join('')
  return expanded ? (
    <div className={combinedClasses} {...otherProps}>
      {children}
    </div>
  ) : null 
}

const Icon = ({ className = '', ...otherProps }) => {
  const { expanded } = useContext(ExpandableContext)
  const combinedClasses = ['Expandable-icon', className].join('')
  return (
    <span className={combinedClasses} {...otherProps}>
      {expanded ? '-' : '+'}
    </span>
  ) 
}

Expandable.Header = Header
Expandable.Body = Body
Expandable.Icon = Icon

const App = () => 
  <Expandable onExpand={(val)=>console.log('onExpand', val)}>
    <Expandable.Header
      style={{ color: 'red', border: '1px solid teal' }}>
      Reintroducing React
    </Expandable.Header>
    <Expandable.Icon />
    <Expandable.Body>
      <img
        src='https://i.imgur.com/qpj4Y7N.png'
        style={{ width: '300px' }}
        alt='reintroducing react book cover' />
      <p style={{ opacity: 0.7 }}>
        This book is so f*cking amazing! <br />
        <a
          href='https://leanpub.com/reintroducing-react'
          target='_blank'
          rel='noopener noreferrer'>
          Go get it now.
        </a>
      </p>
    </Expandable.Body>
  </Expandable>

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
