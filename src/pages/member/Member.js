import React, { Component } from 'react'

export default class Member extends Component {

    componentDidMount(){
        // document.title = this.props.title
        this.props.sideBarName(this.props.title)
    }

    render() {
        return (
            <div>
                Member Page
            </div>
        )
    }
}
