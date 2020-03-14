import React,{Component} from 'react'
import './CalculatorHead.css'
class CalculatorHead extends Component{
    render(){
        return <div id="head">
            <img src="https://image.shutterstock.com/image-vector/calculator-vector-icon-education-logo-260nw-1038626011.jpg" id="logo"></img>
            <h1 id="heading">Calculator<span id="username">Welcome {this.props.name}</span></h1>
    
            </div>
    }
}

export default CalculatorHead