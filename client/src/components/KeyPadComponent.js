import React, {Component} from 'react';

class KeyPadComponent extends Component {

    render() {
        return (
            <div className="calculator card">

            <input type="text" className="calculator-screen z-depth-1" value={this.props.result} disabled />
        
            <div className="calculator-keys">
        
              <button type="button" onClick={e => this.props.onClick(e.target.value)} className="operator btn btn-info" value="+">+</button>
              <button type="button" className="operator btn btn-info" value="-" onClick={e => this.props.onClick(e.target.value)} >-</button>
              <button type="button" className="operator btn btn-info" value="*"onClick={e => this.props.onClick(e.target.value)} >&times;</button>
              <button type="button" className="operator btn btn-info" value="/" onClick={e => this.props.onClick(e.target.value)} >&divide;</button>
        
              <button type="button" value="7" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)} >7</button>
              <button type="button" value="8" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>8</button>
              <button type="button" value="9" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>9</button>
        
        
              <button type="button" value="4" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>4</button>
              <button type="button" value="5" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>5</button>
              <button type="button" value="6" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>6</button>
        
        
              <button type="button" value="1" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>1</button>
              <button type="button" value="2" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>2</button>
              <button type="button" value="3" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>3</button>
        
        
              <button type="button" value="0" className="btn btn-light waves-effect" onClick={e => this.props.onClick(e.target.value)}>0</button>
              <button type="button" className="decimal function btn btn-secondary" value="." onClick={e => this.props.onClick(e.target.value)}>.</button>
              <button type="button" className="all-clear function btn btn-danger btn-sm" value="AC" onClick={e => this.props.onClick(e.target.value)}>AC</button>
        
              <button type="button" className="equal-sign operator btn equal-color" value="=" onClick={e => this.props.onClick(e.target.value)}>=</button>
        
            </div>
          </div>
        );
    }
}


export default KeyPadComponent;