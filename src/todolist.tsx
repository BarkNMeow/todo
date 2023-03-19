import * as React from "react";
import './index.css';

interface TodoInfo {
    text: string,
    due: number,
}

interface TodoInputProp{
    visible: boolean,
    addTodo: (text: string, due: number) => void,
    hideInput: () => void,
}

interface TodoInputState{
    text: string,
    date: string,
    time: string,
}

interface TodolistProp {
    todo: Array<TodoInfo>
    addTodo: (text: string, due: number) => void,
}

interface TodolistState {
    inputVisible: boolean,
}

enum InputType{
    Text,
    Date,
    Time,
}

class Todo extends React.Component <TodoInfo, {timeleft: number}>{
    interval: NodeJS.Timer;

    constructor(props: TodoInfo){
        super(props);
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
        
        const time_piece: Array<[number, string]> = [
            [Math.floor(interval / 86400), 'd'], 
            [Math.floor((interval % 86400) / 3600), 'h'],
            [Math.floor((interval % 3600) / 60), 'm'],
            [Math.floor(interval % 60), 's']
        ];
        
        let numstart = false;
        let timeleft_str = [];
        for(let val of time_piece){
            if(val[0] > 0 || numstart){
                numstart = true;
                timeleft_str.push(val[0].toString().padStart(2, "0") + val[1]);
            }
        }
        

        return (
            <div className="todo-list">
                <div className="todo-text">{ this.props.text }</div>
                {   
                    due === 0 ? (<div></div>) : (<div className="todo-time">{ timeleft_str.join(' ') }</div>)
                }
            </div>
        )
    }
}

class TodoInput extends React.Component<TodoInputProp, TodoInputState>{
    constructor(props: TodoInputProp){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            text: '',
            date: '',
            time: '',
        };
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement>, type: InputType){
        let new_state = {
            text: this.state.text,
            date: this.state.date,
            time: this.state.time,
        };

        switch(type){
            case InputType.Text:
                new_state.text = e.target.value
                break;

            case InputType.Date:
                new_state.date = e.target.value;
                break;

            case InputType.Time:
                new_state.time = e.target.value;
                break;
        }

        console.log(new_state)

        this.setState(new_state)
        console.log(this.state)
    }

    checkNewTodo(){
        const text = this.state.text;
        const date = this.state.date;
        const time = this.state.time;

        if(text === '' || date === '' || time === '') return;

        let due = new Date(date + ' ' + time).getUTCMilliseconds();
        if(due < Date.now()) return;

        this.props.addTodo(text, due);
    }

    render(){
        const text = this.state.text;
        const date = this.state.date;
        const time = this.state.time;

        if(this.props.visible){
            return(
                <div className="todo-add">
                    <input placeholder="Add your TODO" name="text" value={text} onChange={e => this.handleInputChange(e, InputType.Text)}></input>
                    <div className="todo-add-datetime-wrapper">
                        <input type="date" name="date" value={date} onChange={e => this.handleInputChange(e, InputType.Date)}></input>
                        <input type="time" name="time" value={time} onChange={e => this.handleInputChange(e, InputType.Time)}></input>
                    </div>
                    <div className="todo-add-btn-wrapper">
                        <button id="btn-todo-confirm" onClick={this.checkNewTodo}>confirm</button>
                        <button id="btn-todo-cancel" onClick={_ => this.props.hideInput()}>cancel</button>
                    </div>
                </div>
            )
        } else {
            return (<div />)
        }
    }
}

class Todolist extends React.Component<TodolistProp, TodolistState>{
    constructor(props: TodolistProp){
        super(props);
        this.state = {
            inputVisible: false,
        };
    }

    render() {
        return(
            <div className="tab">
                <div className="tab-title">
                    {this.props.todo.length} TODOs left! 
                    <button onClick={_ => this.setState({inputVisible: true})}>Add</button>
                </div>
                <div className="todo-list-scroll">
                    {this.props.todo.map((v, i) => (<Todo key={i} text={v.text} due={v.due} />))}
                    <TodoInput visible={this.state.inputVisible} addTodo={this.props.addTodo} hideInput={() => this.setState({inputVisible: false})}/>
                </div>
            </div>
        )
    }
}

export { Todolist }
export type {TodoInfo}