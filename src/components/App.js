import React, { Component } from 'react';
import '../css/App.css';
import Visualization from './table/Visualization';
import SplitPane from "react-split-pane"
//DRAFT JS DEPENDENCIES
import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import TextEditor from '../components/code/Editor';
//TEXT CSS
import '../index.css';
import '../css/prism.css';
//SCHEMA CODE COMPONENT//
import SchemaCode from './code/SchemaCode';
//PRISM DEPENDENCIES
const PrismDecorator = require('draft-js-prism');
const Prism = require('prismjs')


//PRISM LIBRARY FOR SYNTAX HIGHLIGHTING//
const decorator = new PrismDecorator({
  defaultSyntax: 'javascript',
  prism: Prism,
});

//contentState to provide raw text for code block
const contentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      type: 'code-block',
      text: ''
    }
  ]
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        tables: []
      },
      //DRAFTJS STATE//
      editorState: EditorState.createWithContent(contentState, decorator),
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    }
  };
  //DRAFTJS METHODS//
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not handled';
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onToggleCode = () => {
    // console.log('test');
    this.onChange(RichUtils.toggleCode(this.state.editorState)).bind(this);
  }

  //generate code from state function not working yet
  genCode = () => {
    // console.log('generate code!');
    let data = this.state.data.tables;
    const allCode = [];
    data.forEach((x) => {
      const codeBlock = {};
      codeBlock.name = x.name,
        x.attributes.forEach((y) => {
          codeBlock.field = y.field,
            codeBlock.type = y.type
        })
      allCode.push(codeBlock);
      // console.log(allCode);
    })
  }

  onAddTable = () => {
    let newstate = this.state.data.tables.slice()
    this.setState({
      data:{
        tables:newstate.concat({
            name: '',
            attributes: [
              { field: '', type: '' }
            ]
          })
    }
  })
}


  //this is not correct way to do because state has to be immutable (but it's working)
  onAddRow = (index) => {
    let addit = Object.assign({}, this.state.data.tables[index])
    addit.attributes.push({ field: '', type: '' })
    this.setState({addit})
  }

  updateTableName = (tableIndex, value) => {
    this.setState(state => {
      let table = state.data.tables[tableIndex]
      table.name = value
      return state
    })
  }

  updateRowProp = (tableIndex, rowIndex, value) => {
    this.setState(state => {
      // console.log(tableIndex, rowIndex, value)
      let rowProp = state.data.tables[tableIndex].attributes[rowIndex]
      rowProp.field = value;
      return state;
    })
  }

  updateRowType = (tableIndex, rowIndex, value) => {
    this.setState(state => {
      let rowType = state.data.tables[tableIndex].attributes[rowIndex]
      rowType.type = value;
      return state;
    })
  }

  deleteRow = (tableindex,rowindex) => {
    let spliceit = Object.assign({}, this.state.data.tables[tableindex])
    spliceit.attributes.splice(rowindex,1);
    this.setState({spliceit})
  }

  deleteTable = (index) => {
    let spliceit = Object.assign({}, this.state.data)
    spliceit.tables.splice(index,1);
    this.setState({spliceit})
  }

  deleteAllTables = () => {
    let stateNew = {};
    let keys = Object.keys(this.state);
    console.log(keys)
    keys.forEach((key, i) => {
      stateNew[key] = this.state[key];
    })
    console.log('stateNew', stateNew)
    stateNew.data.tables = [];
    this.setState(stateNew);
  }

  //TABLE POSITION
  onDragTable = (tableIndex, e, dataEvent) => {
    this.setState(state => {
      let posX = state.data.tables[tableIndex]
      posX.tablePositionX = dataEvent.x;
      let posY = state.data.tables[tableIndex]
      posY.tablePositionY = dataEvent.y;
      // console.log(posX.tablePositionX, posY.tablePositionY)
      return state;
    })
  }

  //ROW POSITION
  refreshRowPositions = (tableIndex, rowPositions) => {
    this.setState(state => {
      let attrs = state.data.tables[tableIndex].attributes
      for (let i = 0; i < attrs.length; ++i) {
        attrs[i].x = rowPositions[i].left
        attrs[i].y = rowPositions[i].top
      }
      return state;
    })
  }

  render() {

    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
        <div class="displayWrapper">
          <Visualization data={this.state.data} onAddRow={this.onAddRow} onAddTable={this.onAddTable}
            updateTableName={this.updateTableName} updateRowProp={this.updateRowProp}
            updateRowType={this.updateRowType} refreshRowPositions={this.refreshRowPositions} onAddTable={this.onAddTable} deleteTable = {this.deleteTable} deleteAllTables={this.deleteAllTables} deleteRow = {this.deleteRow} onDragTable={this.onDragTable}/>
        </div>
          <div className="TextEditor">
            <button className = 'editorbutton' onToggleCode={this.onToggleCode}>Code Block</button>
            <TextEditor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} />
            <SchemaCode code={this.state.data.tables}>
            </SchemaCode>
          </div>
        </SplitPane>


      </div>

    );
  }
}

export default App;
