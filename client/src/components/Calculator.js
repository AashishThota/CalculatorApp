import React, {Component } from 'react'
import ResultComponent from './ResultComponent'
import KeyPadComponent from './KeyPadComponent'
import CalculatorHead from './CalculatorHead'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import io from "socket.io-client";

class Calculator extends Component{
    
    constructor(){
        super();
        var host = window.location.hostname;
        const endpoint  ='https://agile-basin-15102.herokuapp.com/'
        
        var array_updated=false;
        this.state ={result: "",
        result1:"",
        equation:"",
        name:"" ,
        sucess:false,
        open:true,
        endpoint:  'https://agile-basin-15102.herokuapp.com/' ,
        socket : io(endpoint) ,
        lastoperations:[]   ,
        
    };
    
       
    }
    

    onClick = button => {

        if(button === "="){
            this.calculate()
        }

        else if(button ==="AC"){
            this.reset()
        }
      

        else {
            console.log(button)
            this.setState({
                result: this.state.result + button,
                result1:this.state.result1+button
            })
            
        }
    };

    componentDidUpdate(){
       
        if(this.state.sucess==true){
            console.log("sendind data to server");
            var dt = new Date();
            var utcDate = dt.toString();
            const data={
                username:this.state.name,
                operation:this.state.result1+" "+this.state.equation,
                timestamp: utcDate
            };
            
            
            this.state.socket.emit("sendingOperation",data);
            
            this.setState({
                sucess:false
            });
            
            this.state.socket.on("catchData",data=>{
                
                
                var new_array=this.state.lastoperations.concat(data)
                if(new_array.length>10){
                    console.log(new_array)
                    var updated_array=new_array.splice(0,1)
                    console.log(new_array)
                    this.setState({
                        lastoperations:Array.from(new Set(new_array)),
                         
                      })    
                }
                else{
                    
                this.setState({
                    lastoperations:Array.from(new Set(new_array)),
                    
                  })}
                
                
                    
                
            });
        }
        
        else{
            
            console.log("not connecting")
        }
        
        // const name=alert("enter Your Name in the Dialog Box provided to continue");
    }
   componentWillUpdate(){

   }
    
    componentWillUnmount(){
        var data={
            name:this.state.name
        };
        console.log(data)
        
        this.state.socket.emit("disconnect",data)
    }
    componentDidMount(){
       this.state.socket.on("welcome",(data)=>{
           console.log("connected")
       });
       
    }
     handleClose = (e) => {
         if(this.state.name=="")
            {
                alert("please re-e;nter the name")
            }
            else{
        this.setState({open:false
      });
    }
    }
    calculate = () => {
        var checkResult = ''
        
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
            
        }

        else {
            checkResult = this.state.result
        }

        try {
            console.log("entered calcuation")
            this.setState({
                // eslint-disable-next-line
            
                equation: eval(checkResult) ,
                result1:this.state.result + "="+ this.state.equation,
                
            })
            console.log(this.state.equation)
        } catch (e) {
            this.setState({
                equation: "error"
            })

        }
        if(this.state.equation!="error")
        {
            this.setState({
                sucess:true
            })}
    };

    reset = () => {
        this.setState({
            result:"",
            equation:"",
            result1:""
        })
        console.log("called reset")
    };

    
    handleChange=(event)=> {
        this.setState({name: event.target.value});
      };
    render(){
        return <div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Your name 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            value={this.state.name}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Ok
          </Button>
          
        </DialogActions>
      </Dialog>
            <CalculatorHead name={this.state.name} id="header"/>
            
            <div className="row no-gutters">
            <div className="col leftside bg-warning" >
            
             <div className="calculator-body">
                   
                    
                    <KeyPadComponent onClick={this.onClick} result={this.state.result1+" "+this.state.equation}/>
                </div>
                
                </div>
                <div className="col rightside bg-info">
                    {console.log(this.state.lastoperations)}
               <ResultComponent result={this.state.lastoperations} />
                
                </div>
                </div>
                
             </div>
    }
}

export default Calculator