import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Draft, { Editor, EditorState, ContentState, convertFromHTML, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import _ from 'lodash'

class ExpressCode extends React.Component {
    constructor(props) {
        super(props)
    
    }

    render() {


        return  ( 
            <textarea className="expressCode" value={this.props.code} onChange={e => this.props.onChange(e.target.value)} />
        )
    }
}

export default ExpressCode;


