import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'


class ExpressCode extends React.Component {
    render() {
        return  ( 
            <textarea className="expressCode" value={this.props.code} onChange={e => this.props.onChange(e.target.value)} />
        )
    }
}

export default ExpressCode;


