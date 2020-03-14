import React, {Component} from 'react';
import './ResultComponent.css'
class ResultComponent extends Component {


    render() {
        let result = this.props.result;
        console.log("result part");
        console.log("--------------");
        console.log("result", result);
        console.log(result[1])
        const listItems = result.map((d) => <li class="list-group-item res" key={d.username}><span id="imp">{d.username}</span> has Performed <span id="imp">{d.operation}</span></li>);
        
        return (
        <div> 
            <div className="calculator card"   >
            <ul class="list-group list-group-flush">{listItems}</ul>
            </div>              
            </div> 
    );
        
    }
}


export default ResultComponent;