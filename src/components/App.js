import React, { Component } from 'react';
import '../css/App.css';
import Visualization from './table/Visualization';
import SplitPane from "react-split-pane"
//DRAFT JS DEPENDENCIES
import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import TextEditor from '../components/code/Editor';
//TEXT CSS
import '../css/index.css';
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
// const contentState = convertFromRaw({
//   entityMap: {},
//   blocks: [
//     {
//       type: 'code-block',
//       text: ''
//     }
//   ]
// });
const codeToRender = {
  entityMap: {},
  blocks: [
    {
      type: 'code-block',
      text: 'blah'
    }
  ]
}

const contentState = convertFromRaw(codeToRender);


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedRow: null,
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
    console.log('test');
    this.onChange(RichUtils.toggleCode(this.state.editorState))//.bind(this);
  }

  renderEditor = () => {
    console.log('renderEditor')
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

    // getTableName = () => {
    //   let data = this.state.data.tables;
    //   const allCode = [];
    //   data.forEach((x) => {
    //     const codeBlock = {};
    //     codeBlock.name = x.name,
    //       x.attributes.forEach((y) => {
    //         codeBlock.field = y.field,
    //           codeBlock.type = y.type
    //       })
    //     allCode.push(codeBlock);
    //     console.log(allCode);
    //   })
    // },

    // getRowData = () => {
    //   console.log('getRowData');
    // },

    // compileCode = () => {
    //   console.log('compileCode');
    // }


  }

  onAddTable = () => {
    //function which is making random string for ID
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    let newstate = this.state.data.tables.slice()
    this.setState({
      data: {
        tables: newstate.concat({
          id: guid(),
          name: '',
          attributes: [
            { field: '', type: '' }
          ]
        })
      }
    })
  }


  //this is not correct way to do because state has to be immutable (but it's working)
  //this is not correct way to do because state has to be immutable (but it's working)
  onAddRow = (tableIndex) => {
    this.setState(state => {
      return {
        data: {
          tables: state.data.tables.map((table, i) =>
            (i === tableIndex )
              ? Object.assign({}, table, {
                attributes: table.attributes.concat({ field: '', type: '' })
              })
              : table
          )
        }
      }
    })
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
      rowType.value = value;
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
refreshTablePositions = (tableIndex, tablePosition, rowPositions) => {

    this.setState(state => {
      let table = state.data.tables[tableIndex]
      table.tablePositionX = tablePosition.left
      table.tablePositionY = tablePosition.top

      let attrs = state.data.tables[tableIndex].attributes
      for (let i = 0; i < attrs.length; i += 1) {
        attrs[i].x = rowPositions[i].left
        attrs[i].y = rowPositions[i].top
      }

      return state;
    })
  }

   onRowMouseDown = (tableIndex, rowIndex) => {
      this.setState({
        clickedRow: {
          tableIndex,
          rowIndex
        }
      })
  }

    onTableMouseUp = (tableIndex) => {
    const { clickedRow } = this.state
    if (tableIndex === null || !clickedRow || clickedRow.tableIndex === tableIndex) {
      this.setState({
          clickedRow: null
        })
    } else {
      this.setState(state => {
        const table = state.data.tables[state.clickedRow.tableIndex]
        table.attributes[state.clickedRow.rowIndex].relatedToTableId = state.data.tables[tableIndex].id
        return {
          clickedRow: null,
          data: state.data
        }
      })
    }
  }



  render() {
    const { data } = this.state
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
        <Visualization data={this.state.data} clickedRow={this.state.clickedRow} onAddRow={this.onAddRow} onAddTable={this.onAddTable}
            updateTableName={this.updateTableName} updateRowProp={this.updateRowProp}
            updateRowType={this.updateRowType} onAddTable={this.onAddTable}
            onDragTable={this.onDragTable} refreshTablePositions={this.refreshTablePositions} deleteTable = {this.deleteTable} deleteAllTables={this.deleteAllTables} deleteRow = {this.deleteRow}
            onTableMouseUp={this.onTableMouseUp} onRowMouseDown={this.onRowMouseDown}/>
          <div className="TextEditor">
          {/* <button className = 'editorbutton' onToggleCode={this.onToggleCode}>Code Block</button>
          <TextEditor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} /> */}
          <SchemaCode code={this.state.data.tables}>
          </SchemaCode>
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default App;
