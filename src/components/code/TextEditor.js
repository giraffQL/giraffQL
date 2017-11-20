import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Draft, { Editor, EditorState, ContentState, convertFromHTML, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
// import PrismDecorator from 'draft-js-prism'
// import Prism from 'prismjs'
import _ from 'lodash'
// import '../../css/prism.css'

// var decorator = new PrismDecorator({
//     prism: Prism,
//     defaultSyntax: 'javascript'
// })

// ---- commented code is prism.js for highlighting a code, but we can't use that because our app is really slow then
class TextEditor extends React.Component {
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

    // onEditorChange = (editorState) => {
    //     const content = editorState.getCurrentContent()

    //     this.setState({ 
    //         editorState: EditorState.set(editorState, { decorator })
    //     })
    // }

    getEditorStateFromModel = (data) => {
        // const blocksFromHTML = convertFromHTML(this.getTextFromModel(data));
        // const contentState = ContentState.createFromBlockArray(
        //     blocksFromHTML.contentBlocks,
        //     blocksFromHTML.entityMap
        // );
        const contentState = ContentState.createFromText(this.getTextFromModel(data))
        return EditorState.createWithContent(contentState)
    }
    componentDidMount() {
        this.props.onRef(this)
      }
      componentWillUnmount() {
        this.props.onRef(undefined)
      }

    getTextFromModel = (data) => {
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
            //<textarea value={code} cols={70} rows={51} style={{ "font-size": "25px" }}></textarea>
        )
    }
}

export default TextEditor;


