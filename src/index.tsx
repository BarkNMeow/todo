import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Todolist, TodoInfo } from "./todolist";

import './index.css';
import './todo.css';

interface Appstate {
    todo: Array<TodoInfo>
    tabindex: number,
}

class App extends React.Component<{}, Appstate>{
    constructor(props: {}){
        super(props)
        this.state = {
            tabindex: 0,
            todo: []
        }

        this.addTodo = this.addTodo.bind(this);
    }
    
    addTodo(text: string, due: number) {
        this.setState({
            tabindex: this.state.tabindex,
            todo: [...this.state.todo, {text: text, due: due}],
        })
    }

    changeTab(n: number){
        this.setState({
            tabindex: n,
        })
    }

    renderTab(){
        switch(this.state.tabindex){
            case 0:
                return (<Todolist todo={this.state.todo} addTodo={this.addTodo}/>);
            case 1:
                return(<div />);
            default:
                return(<div />);
        }
    }

    render() {
        return (
            <div>
                <main>
                    {
                        this.renderTab()
                    }
                </main>
                <nav>
                    <button onClick={_ => this.changeTab(0)}>List</button>
                    <button onClick={_ => this.changeTab(1)}>Calendar</button>
                    <button onClick={_ => this.changeTab(2)}>Props</button>
                </nav>
            </div>
        )
    }
}

const root_dom = document.getElementById("root");
if(root_dom){
    const root = ReactDOM.createRoot(root_dom);
    root.render(<App/>);
} else {
    console.log('Error: root DOM not found!');
}
