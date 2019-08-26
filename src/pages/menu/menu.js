import React, { Component } from 'react'
import { connect } from 'react-redux'
class menu extends Component {
    handleClick = () => {
        this.props.dispatch({type: 'Append', payload: 1})
    }

    handleClickReset = () => {
        this.props.dispatch({type: 'SetNull', payload: []})
    }

    handleClickSet = () => {
        let a = [{'name': 'frame','amount': 0}]
        this.props.dispatch({type: 'testList', payload: a})
    }
    
    render() {
        console.log(this.props.testList)
        return (
            <div>
                <button onClick={this.handleClickSet}>click me!</button>
                <button onClick={this.handleClick}>Append!</button>
                <button onClick={this.handleClickReset}>RESET</button>
            </div>
        )
    }
}

function mapStatetoProps(state) {
    return {
        testList: state.testList,
    }
}


export default connect(mapStatetoProps)(menu)
