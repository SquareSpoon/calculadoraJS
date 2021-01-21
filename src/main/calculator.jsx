import React, { Component } from 'react'
import './caculator.css'
import '../components/button.css'
import Button from '../components/buttoon.jsx'
import Display from '../components/display'

const initial ={
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}


export default class Calculator extends Component {
    
    state = { ...initial } 


    constructor(props){
        super(props)
        this.clear = this.clear.bind(this)
        this.operation = this.operation.bind(this)
        this.digit = this.digit.bind(this)
    }

    clear(){
        this.setState({ ...initial })
    }
    operation(operation){
       if(this.state.current === 0) {
        this.setState({ operation, current: 1, clearDisplay: true})
       } else {
           const equals = operation === '='
           const currentOP = this.state.operation

           const values = [...this.state.values]
           try{
            values[0] = eval(`${values[0]} ${currentOP} ${values[1]}`)
           } catch(e){
               values[0] = this.state.values[0]
           }
           
           values[1] = 0

           this.setState({
               displayValue: values[0],
               operation: equals ? null : operation,
               current: equals ? 0 : 1,
               clearDisplay: !equals,
               values
           })
       }
    }

    digit(n){
        if(n === '.' && this.state.displayValue.includes('.')){
           return 
        }
        const clearDisplay = this.state.displayValue === '0'
          || this.state.clearDisplay
        const currentValue  = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n 
        this.setState({displayValue, clearDisplay : false})
        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }
 
    render(){
        
        
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label='AC' click= {this.clear} triple/>
                <Button label='/'  click= {this.operation} operation/>
                <Button label='7'  click= {this.digit}/>
                <Button label='8'  click= {this.digit}/>
                <Button label='9'  click= {this.digit}/>
                <Button label='*'  click= {this.operation} operation/>
                <Button label='4'  click= {this.digit}/>
                <Button label='5'  click= {this.digit} />
                <Button label='6'  click= {this.digit}/>
                <Button label='-'  click= {this.operation} operation/>
                <Button label='1'  click= {this.digit}/>
                <Button label='2'  click= {this.digit}/>
                <Button label='3'  click= {this.digit}/>
                <Button label='+'  click= {this.operation} operation/>
                <Button label='0'  click= {this.digit} double/>
                <Button label='.'  click= {this.digit}/>
                <Button label='='  click= {this.operation} operation/>
            </div>
        )
    }
}