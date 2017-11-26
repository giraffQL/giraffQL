import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Draft, { Editor, EditorState, ContentState, convertFromHTML, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import _ from 'lodash'

class ExpressCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: this.getEditorStateFromModel(props.data)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            editorState: this.getEditorStateFromModel(nextProps.data)
        })

    }

    getEditorStateFromModel = (data) => {
        const contentState = ContentState.createFromText(this.getCode(data))
        return EditorState.createWithContent(contentState)
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    getCode = (data) => {
        let code = '\n'
        for (let i = 0; i < data.tables.length; i += 1) {
            const table = data.tables[i]
            if (table.name) {
                code += `const ${table.name}Type = new GraphQLObjectType({\n`
                    + `    name: ${table.name},\n`
                    + `    fields: () => ({\n`
                for (let j = 0; j < table.attributes.length; j += 1) {
                    const attr = table.attributes[j]
                    if (attr.field !== '') {
                        code += `        ${attr.field}: {\n`
                            + `            type: ${attr.type}\n`
                            + `        }`
                    }
                    if (j < table.attributes.length - 1 && attr.field !=='') {
                        code += `,\n`
                    }
                }
                code += `\n`
                    + `    })\n`
                    + `})\n\n`
            }
        }

        return code + '\n'
    }


    render() {


        return (
            <Editor editorState={this.state.editorState} onChange={this.onEditorChange} />
        )
    }
}

export default ExpressCode;


