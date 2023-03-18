import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Todolist } from "./todolist";

import './index.css';

interface Appstate {
    tabindex: Number,
}

class App extends React.Component<{}, Appstate>{
    constructor(props: {}){
        super(props)
        this.state = {
            tabindex: 0,
        }
    }

    changeTab(n: Number){
        this.setState({
            tabindex: n,
        })
    }

    renderTab(){
        switch(this.state.tabindex){
            case 0:
                return (<Todolist />);
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
