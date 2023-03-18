import * as React from "react";
import './index.css';

interface TodoInfo {
    text: string,
    due: number,
}

interface TodolistProp {
    todo: Array<TodoInfo>
    addTodo: (text: string, due: number) => void,
}

interface TodolistState {
    add: boolean,
}

class Todo extends React.Component <TodoInfo, {timeleft: number}>{
    interval: NodeJS.Timer;

    constructor(props: TodoInfo){
        super(props);
        this.state = {timeleft: this.getIntervalSeconds() }; 
        this.interval = setInterval(() => {});
    }

    getIntervalSeconds(){
        return Math.max(0, Math.round((this.props.due - Date.now()) / 1000));
    }

    componentDidMount(){
        this.interval = setInterval(() => this.setState({timeleft: this.getIntervalSeconds() }), 1000);
    }

    render() {
        const due = this.props.due;
        const interval = this.state.timeleft;
        
        const time_piece = [
            [Math.floor(interval / 86400), 'd'], 
            [Math.floor((interval % 86400) / 3600), 'h'],
            [Math.floor((interval % 3600) / 60), 'm'],
            [Math.floor(interval % 60), 's']
        ];

        const timeleft_str = time_piece.filter(val => val[0] !== 0).map(val => val[0].toString() + val[1]).join(' ');

        return (
            <div className="todo-list">
                <div className="todo-text">{ this.props.text }</div>
                {   
                    
                    due === 0 ? (<div></div>) : (<div className="todo-time">{ timeleft_str }</div>)
                }
            </div>
        )
    }
}

class Todolist extends React.Component<TodolistProp, TodolistState>{
    constructor(props: TodolistProp){
        super(props);
        this.state = {
            add: false,
        };
    }

    updateTodo(e: any){
        e.preventDefault();

        const t = e.target;
        let flag = false;
        if(t.text.value === ''){
            t.text.classList.add('error');
            flag = true;
        }

        if(t.date.value === ''){
            t.date.classList.add('error');
            flag = true;
        }

        if(t.time.value === ''){
            t.time.classList.add('error');
            flag = true;
        }

        const duetime = new Date(e.target.date.value + ' ' + e.target.time.value);
        const due = duetime.valueOf();

        if(due <= Date.now()){
            t.date.classList.add('error');
            t.time.classList.add('error');
            flag = true;
        }

        if(flag) return;
            
        this.props.addTodo(e.target.text.value, duetime.valueOf());
        this.setState({add: false});
    }

    render() {
        return(
            <div className="tab">
                <div className="tab-title">
                    {this.props.todo.length} TODOs left! 
                    <button onClick={_ => this.setState({add: true})}>Add</button>
                </div>
                <div className="todo-list-scroll">
                    {this.props.todo.map((v, i) => (<Todo key={i} text={v.text} due={v.due} />))}
                    {   
                        this.state.add ? (
                        <form className="todo-add" onSubmit={e => this.updateTodo(e)}>
                            <input placeholder="Add your TODO" name="text"></input>
                            <div className="todo-add-datetime-wrapper">
                                <input type="date" name="date"></input>
                                <input type="time" name="time"></input>
                            </div>
                            <div className="todo-add-btn-wrapper">
                                <button id="btn-todo-confirm">confirm</button>
                                <button id="btn-todo-cancel" onClick={e => {e.stopPropagation(); this.setState({add: false})}}>cancel</button>
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
export type {TodoInfo}