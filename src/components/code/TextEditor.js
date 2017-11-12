import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import {Editor, EditorState, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
var Draft = require('draft-js');
var PrismDecorator = require('draft-js-prism');
var Prism = require('prismjs')

var decorator = new PrismDecorator({
  // Provide your own instance of PrismJS
  prism: Prism,
});
var editorState = Draft.EditorState.createEmpty(decorator)

class TextEditor extends React.Component {
    constructor (props) {
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

    onEditorChange = (editorState) => {
        this.setState({editorState})
    }

    getEditorStateFromModel = (data) => {
        return EditorState.createWithContent(ContentState.createFromText(this.getTextFromModel(data)))
    }

    getTextFromModel = (data) => {
        let code = ''
        for (let i = 0; i < data.tables.length; i += 1) {
            const table = data.tables[i]
            if (table.name) {
                code += `const ${table.name}Type = new GraphQLObjectType({\n`
                    + `                 name: ${table.name},\n`
                    + `                 fields: () => ({\n`
                for (let j = 0; j < table.attributes.length; j += 1) {
                    const attr = table.attributes[j]
                    if (attr.field !== '') {
                        code += `                 ${attr.field}: {\n`
                            + `                             type: ${attr.type}\n`
                            + `                          }`
                    }
                    if (j < table.attributes.length - 1) {
                        code += `,\n`
                    }
                }

                code += `           \n`
                    + `                 })\n`
                    + ` })\n\n`
            }
        }

        return code
    }

    render() {
        

        return (
            <Editor editorState={this.state.editorState} onChange={this.onEditorChange} />
            //<textarea value={code} cols={70} rows={51} style={{ "font-size": "25px" }}></textarea>
        )
    }
}

export default TextEditor;

// fields: () => ({
//     itemId: {
//       type: (GraphQLInt),
//       description: 'The id of the todo.',
//     },
//     item: {
//       type: GraphQLString,
//       description: 'The name of the todo.',
//     },
//     completed: {
//       type: GraphQLBoolean,
//       description: 'Completed todo? '
//     }
//   })
