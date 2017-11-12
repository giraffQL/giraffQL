import React from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';

const PrismDecorator = require('draft-js-prism');
const Prism = require('prismjs')
//TEXT EDITOR COMPONENT FROM DRAFTJS//
class TextEditor extends React.Component {

  render() {
    return (
      <div>
         {/*<button onClick={() => this.props.toggleCode}>Code Block</button> */}
          <Editor
            editorState={this.props.editorState}
            handleKeyCommand={this.props.handleKeyCommand}
            onChange={this.props.onChange}
          />
      </div>
    );
  }
}

export default TextEditor;