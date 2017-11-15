import React, { Component } from 'react';
import Visualization from './table/Visualization';
import SplitPane from "react-split-pane"
//DRAFT JS DEPENDENCIES
import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import TextEditor from '../components/code/Editor';
//TEXT CSS
import '../css/index.css';
import '../css/App.css';
import '../css/prism.css';
//SCHEMA CODE COMPONENT//
import SchemaCode from './code/SchemaCode';
//PRISM DEPENDENCIES
import Fullscreen from 'react-full-screen';
// MATERIAL UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// REACT-BOOTSTRAP
import { FormControl, Button, ButtonGroup, Nav } from 'react-bootstrap';
// MENU COMPONENT
import MenuComp from './Menu';


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

  onAddRow = (tableIndex) => {
    this.setState(state => {
      return {
        data: {
          tables: state.data.tables.map((table, i) =>
            (i === tableIndex)
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

  deleteRow = (tableindex, rowindex) => {
    let spliceit = Object.assign({}, this.state.data.tables[tableindex])
    spliceit.attributes.splice(rowindex, 1);
    this.setState({ spliceit })
  }

  deleteTable = (index) => {
    let spliceit = Object.assign({}, this.state.data)
    spliceit.tables.splice(index, 1);
    this.setState({ spliceit })
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
        table.attributes[state.clickedRow.rowIndex].type = state.data.tables[tableIndex].name
        return {
          clickedRow: null,
          data: state.data
        }
      })
    }
  }


  menuToggle = () => this.setState({open: !this.state.open});

  menuClose = () => this.setState({open: false});

  fullscreenToggle = () => {
    this.setState({isFullscreenEnabled: true})
  }

  render() {
    const { data } = this.state
    const muiStyles = {
      appBar: {
        'background-color': '#9FA767',
        'border-bottom': '4px solid white',
        'line-height': '20px',
        color: '#fbe4a1'
      },
      drawer: {
        'background-color': '#9FA767',
        'color': 'white',
      },
      menuItem: {
        'color': 'white',
        'font-size': '20px'
      }
    }

    return (
      <MuiThemeProvider>
      <div className="App">
        <MenuComp state={this.state} menuToggle={this.menuToggle} menuClose={this.menuClose} fullscreenToggle={this.fullscreenToggle} />
        <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}
          >
            <div className='full-screenable-node'>
              {/*PRESS ESC TO EXIT*/}

            <SplitPane style={{'background-color': '#fbe4a1'}} split="vertical" defaultSize="50%">

            <Visualization data={this.state.data} clickedRow={this.state.clickedRow} onAddRow={this.onAddRow} onAddTable={this.onAddTable}
                updateTableName={this.updateTableName} updateRowProp={this.updateRowProp}
                updateRowType={this.updateRowType} onAddTable={this.onAddTable}
                onDragTable={this.onDragTable} refreshTablePositions={this.refreshTablePositions} deleteTable = {this.deleteTable} deleteRow = {this.deleteRow} deleteAllTables={this.deleteAllTables}
                onTableMouseUp={this.onTableMouseUp} onRowMouseDown={this.onRowMouseDown}/>

              <div className="TextEditor">
              {/* <button className = 'editorbutton' onToggleCode={this.onToggleCode}>Code Block</button>

              <div className="TextEditor force-select">
                {/* <button className = 'editorbutton' onToggleCode={this.onToggleCode}>Code Block</button>

              <TextEditor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} /> */}
                <SchemaCode code={this.state.data.tables}>
                </SchemaCode>
              </div>

            </SplitPane>
        </div>
        </Fullscreen>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
