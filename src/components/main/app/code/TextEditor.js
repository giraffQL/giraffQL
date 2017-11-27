import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'


class TextEditor extends React.Component {
    render() {
        return (
            <textarea className="schemaCode" value={this.props.code} onChange={e => this.props.onChange(e.target.value)} />
        )
    }
}

export default TextEditor;


