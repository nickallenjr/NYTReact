import React from 'react';
import axios from 'axios';

import Todo from './Todo';

class TodoList extends React.Component {
    state = {
        todos: [],
        newTodo: '',
    };
    
    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos = () => {
        axios
            .get('/api/fetch')
            .then((res) => this.setState({ todos: res.data }))
            .catch((err) => console.error(err));
    }

    handleNewTodoInputChange = (e) => {
        this.setState({
            newTodo: e.target.value
        });
    }

    handleCreateTodo = () => {
        axios
            .post('/api/create', { title: this.state.newTodo })
            .then(this.fetchTodos)
            .catch((err) => console.error(err));            
    }

    handleCompleteTodo = (id) => {
        axios
            .put(`/api/complete/${id}`)
            .then(this.fetchTodos)
            .catch((err) => console.error(err));            
    }

    handleUncompleteTodo = (id) => {
        axios
            .put(`/api/uncomplete/${id}`)
            .then(this.fetchTodos)
            .catch((err) => console.error(err));            
    }

    // handleDeleteTodo = (id) => {
    //     axios
    //         .put(`/api/delete/${id}`)
    //         .then(this.fetchTodos)
    //         .catch((err) => console.error(err));            
    // }

    render() {
        return (
            <div>
                <div>
                    <input
                        type='text'
                        value={this.state.newTodo}
                        onChange={this.handleNewTodoInputChange}
                    />
                    <button onClick={this.handleCreateTodo}>Add</button>
                </div>
                { this.state.todos.map(todo => (
                    <Todo
                        {...todo}
                        key={todo._id}
                        onClick={todo.completed ? this.handleUncompleteTodo : this.handleCompleteTodo}
                    />
                ))}
            </div>
        );

    }
};

export default TodoList;
