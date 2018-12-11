import React from 'react';

/** Функция - декоратор 
 * @function withProps
 * @param {object} newProps new object poperty
 * @return {function} new modified function
*/
const withProps = ( newProps ) => ( WrappedComponent ) => {
    return ModifiedComponent = ( ownProps ) => { // модифицированная версия компонента
        return <WrappedComponent { ...ownProps } { ...newProps } /> // исходные свойства + новые свойства
    };
};

const newProps = { name: "Alex" }; // это добавлено компонентом высшего порядка  

const Details = ( { name, title, language } ) => {
    return (
        <div>
            <h1>{ title }</h1>
            <p>{ name } works with { language }</p>
        </div>
    );
};

const ModifiedDetails = withProps( newProps )/*( Details ); */// компонент высшего порядка каррирован для улучшения читабельности

console.log(ModifiedDetails)
/*export const App = () => (
    <ModifiedDetails 
        title="I'm here to stay"
        language="JavaScript"
    />
);*/
//export default ModifiedDetails;

//----------------------------------
import { combineReducers, createStore, applyMiddleware } from 'redux'

// state
const instate = Object.freeze({
    todos: [{
        text: 'Eat food',
        completed: true
    }, {
        text: 'Exercise',
        completed: false
    }],
    visibilityFilter: 'SHOW_COMPLETED'
})

// actions
// const ADD_TODO = { type: 'ADD_TODO', text: 'Go to swimming pool' }
// const TOGGLE_TODO = { type: 'TOGGLE_TODO', index: 1 }
// const SET_VISIBILITY_FILTER = { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }

// multi-reducers
function visibilityFilter(state = instate.visibilityFilter, action) {
    if (action.type === 'SET_VISIBILITY_FILTER') {
        return action.filter
    } else {
        return state
    }
}
function todos(state = instate.todos, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                { text: action.text, completed: false }
            ]
        case 'TOGGLE_TODO':
            return state.map((todo, index) => {
                if(action.index === index) {
                    return Object.assign({...todo}, {completed: !todo.completed})
                }
                return todo;
            })
        default:
            return state
    }
}

/*function todoApp(state = instate, action) { // combineReducers
    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }
}*/

const request = store => next => action => {
    if(typeof action == 'function') {
        return action({ type: 'GOOD_REQUEST' }, next)
    } else if(typeof action == 'object') {
        return next(action)
    }
}
const progress = store => next => action => {
    if(action.type == 'GOOD_REQUEST') {
        setTimeout(() => {next({ type: 'LOADED' })}, 3000)
    } else if(action.type == 'BAD_REQUEST'){
        setTimeout(() => {next({ type: 'ERROR' })}, 3000)
    }
}
const response = store => next => action => {
    if(action.type == 'LOADED') {
        return next({ type: 'TOGGLE_TODO', index: 1 })
    } else {
        console.log('bad request')
    }
}

const reducer = combineReducers({ visibilityFilter, todos })

const store = createStore(reducer, applyMiddleware(request, progress, response))

let unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(function(action, next) {
    return next(action);
})
// store.dispatch({ type: 'ADD_TODO', text: 'Go to swimming pool' }) // action...reducer...state
// store.dispatch({ type: 'ADD_TODO', text: 'Go to sleep' })
// store.dispatch({ type: 'TOGGLE_TODO', index: 1 })
// store.dispatch({ type: 'TOGGLE_TODO', index: 1 })
// store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' })
// store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'HIDE_ALL' })

window.store = store

const Coords = React.createContext({x: 125, y: 1154});

class AppContext extends React.Component {
    render() {
        return (
            <Coords.Provider value={{x: 125, y: 1154}}>
                <WindowCoords />
            </Coords.Provider>
        )
    }
}
export class WindowCoords extends React.Component {
    static contextType = AppContext
    render() {
        console.log(this.context)
        return <div>{this.context.x}</div>;
    }
}

class RenderPropsTemplate extends React.Component {
    constructor() {
        super()
        this.state = { name: 'Shamil Zubairov' }
    }
    componentDidMount() {
        console.log('mounted')
    }
    changeColor(target) {
        target.style.color = 'red'
    }
    render() {
        return this.props.children(this.state.name, this)
    }
}

export const AppTemplate = () => (
    <RenderPropsTemplate>
        {(name, ctx) => <div onClick = {(e) => ctx.changeColor(e.target)}>{name}</div>}
    </RenderPropsTemplate>)