import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Draft, { Editor, EditorState, ContentState, convertFromHTML, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import PrismDecorator from 'draft-js-prism'
import Prism from 'prismjs'
import _ from 'lodash'
import '../../css/prism.css'

var decorator = new PrismDecorator({
    prism: Prism,
    defaultSyntax: 'javascript'
})

class TextEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: this.getEditorStateFromModel(props.data)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.data, nextProps.data)) {
            this.setState({
                editorState: this.getEditorStateFromModel(nextProps.data)
            })
        }
    }

    onEditorChange = (editorState) => {
        const content = editorState.getCurrentContent()

        this.setState({ 
            editorState: EditorState.set(editorState, { decorator })
        })
    }

    getEditorStateFromModel = (data) => {
        const blocksFromHTML = convertFromHTML(this.getTextFromModel(data));
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );

        return EditorState.createWithContent(contentState, decorator)
    }

    getTextFromModel = (data) => {
        let code = '<pre>\n'
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
                    if (j < table.attributes.length - 1) {
                        code += `,\n`
                    }
                }

                code += `\n`
                    + `    })\n`
                    + `})\n\n`
            }
        }

        return code + '</pre>\n'
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
