import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';

class App extends React.Component {

    constructor(props: {}){
        super({})
        this.state = {
            tabindex: 0,
        }
    }

    render() {
        return (
            <main>
                <div className="tab-btn-holder">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                </div>
            </main>
        )
    }
}

const root_dom = document.getElementById("root");
if(root_dom){
    const root = ReactDOM.createRoot(root_dom);
    root.render(<App/>);
}
