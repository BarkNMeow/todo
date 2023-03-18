import * as React from "react";
import './index.css';

interface TodolistType {
    todo: Array<TodoProp>,
}

interface TodoProp {
    text: String,
    due: Number,
}

class Todo extends React.Component <TodoProp, {}>{
    constructor(props: TodoProp){
        super(props);
    }

    render() {
        return (
            <div className="todo-list">
                <div className="todo-text">{ this.props.text }</div>
                <div className="todo-time">4D left</div>
            </div>
        )
    }
}

class Todolist extends React.Component<{}, TodolistType>{
    constructor(props: {}){
        super(props);
        this.state = {
            todo: [{text: 'Do a laundary', due: 0}, {text: 'Buy some foods', due: 0}],
        };
    }

    render() {
        return(
            <div className="tab">
                <div className="tab-title">You have {this.state.todo.length} TODOs left! <button>Add</button></div>
                {this.state.todo.map((v, i) => (<Todo key={i} text={v.text} due={v.due} />))}
            </div>
        )
    }
}

export { Todolist }