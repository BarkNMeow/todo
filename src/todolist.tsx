import * as React from "react";
import './index.css';

interface TodolistType {
    add: Boolean,
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
            add: false,
        };

        console.log(this.state.add)
    }

    updateTodo(e: any){
        e.preventDefault();

        const text = e.target.text.value;
        this.setState({
            todo: [...this.state.todo, {text: text, due: 0}],
            add: false,
        })
    }

    render() {
        return(
            <div className="tab">
                <div className="tab-title">
                    You have {this.state.todo.length} TODOs left! 
                    <button onClick={_ => this.setState({todo: this.state.todo, add: true})}>Add</button>
                </div>
                <div className="todo-list-scroll">
                    {this.state.todo.map((v, i) => (<Todo key={i} text={v.text} due={v.due} />))}
                    {   
                        this.state.add == true ? (
                        <form className="todo-add" onSubmit={e => this.updateTodo(e)}>
                            <input placeholder="Add your TODO" name="text"></input>
                            <div>
                                <button>confirm</button>
                            </div>
                        </form>
                        ) : (<div></div>)
                    }
                </div>

            </div>
        )
    }
}

export { Todolist }