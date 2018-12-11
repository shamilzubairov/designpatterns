import React from 'react'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'

const TOGGLE_TODO = 'TOGGLE_TODO'

function todos(state = [], action) {
    switch (action.type) {
        case TOGGLE_TODO:
            return state.map(todo => 
                todo.id === action.id ? 
                    { ...todo, completed: !todo.completed } : 
                    todo
            )
        default:
            return state
    }
}

const todoApp = combineReducers({
    todos
})

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const initState = { 
    todos: [
        { text: 'Learn about actions', completed: false, id: '5b5' }, 
        { text: 'Learn about reducers', completed: false, id: '8bc' }, 
        { text: 'Learn about store', completed: false, id: '113dd' }
    ] 
}

const store = createStore(todoApp, initState, applyMiddleware(logger))


const Todo = ({ onClick, completed, text }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)
Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

const TodoList = ({ todos, toggleTodo }) => (
    <ul>
        {todos.map(todo => (
            <Todo key={todo.id} onClick={() => toggleTodo(todo.id)} {...todo} />
        ))}
    </ul>
)
TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    toggleTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleTodo: id => dispatch({type: 'TOGGLE_TODO', id})
})

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

const App = () => {
    return (
        <div>
            <VisibleTodoList />
        </div>
    )
}

export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}


window.store = store