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
}
*/
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'ADD_TODO', text: 'Go to swimming pool' }) // action...reducer...state
store.dispatch({ type: 'ADD_TODO', text: 'Go to sleep' })
store.dispatch({ type: 'TOGGLE_TODO', index: 1 })
store.dispatch({ type: 'TOGGLE_TODO', index: 1 })
store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' })
store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'HIDE_ALL' })