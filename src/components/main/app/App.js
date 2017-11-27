import React, { Component } from 'react';
import SplitPane from "react-split-pane"
//PRISM DEPENDENCIES
import Fullscreen from 'react-full-screen';
// MATERIAL UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// REACT-BOOTSTRAP
import { FormControl, Button, ButtonGroup, Nav } from 'react-bootstrap';
//FILE SERVER
import FileSaver from 'file-saver';
//COMPONENTS
import MenuComp from './AppMenu';
import Visualization from './table/Visualization';
import TextEditor from './code/TextEditor'


const PrismDecorator = require('draft-js-prism');
const Prism = require('prismjs')



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedRow: null,
      data: {
        tables: [
        ],
      },
    };
  };

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

    let newstate = Object.assign({}, this.state);
    let tables = newstate.data.tables;
    newstate.data.tables.push({
          id: guid(),
          name: '',
          attributes: [
            { field: '', type: '' }
          ],
          defaultPosition: 210 * tables.length
    })
    this.setState(newstate)
    // let newstate = this.state.data.tables.slice()
    // this.setState({
    //   data: {
    //     tables: newstate.concat({
    //       id: guid(),
    //       name: '',
    //       attributes: [
    //         { field: '', type: '' }
    //       ]
    //     })
    //   }
    // })
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
      return {
        data: {
          tables: state.data.tables.map((table, i) =>
            (i === tableIndex)
              ? Object.assign({}, table, { name: value })
              : table
          )
        }
      }
    })
  }

  updateRowProp = (tableIndex, rowIndex, value) => {
    this.setState(state => {
      return {
        data: {
          tables: state.data.tables.map((table, i) =>
            (i === tableIndex)
              ? Object.assign({}, table, {
                attributes: table.attributes.map((attr, ai) =>
                  (ai === rowIndex)
                    ? Object.assign({}, attr, { field: value })
                    : attr
                )
              })
              : table
          )
        }
      }
    })
  }

  updateRowType = (tableIndex, rowIndex, value) => {
    this.setState(state => {
      return {
        data: {
          tables: state.data.tables.map((table, i) =>
            (i === tableIndex)
              ? Object.assign({}, table, {
                attributes: table.attributes.map((attr, ai) =>
                  (ai === rowIndex)
                    ? Object.assign({}, attr, { type: value })
                    : attr
                )
              })
              : table
          )
        }
      }
    })
  }

  deleteRow = (tableindex, rowindex) => {
    let spliceit = Object.assign({}, this.state.data.tables[tableindex])
    spliceit.attributes.splice(rowindex, 1);
    this.setState({ spliceit })
  }

  deleteTable = (index) => {
    let spliceit = Object.assign({}, this.state.data)
    // spliceit.tables.splice(index, 1);
    spliceit.tables[index] = null;
    this.setState({ spliceit })
  }

  deleteAllTables = () => {
    let stateNew = Object.assign({}, this.state);
    stateNew.data.tables = [];
    this.setState(stateNew);
  }

  //TABLE POSITION
  refreshTablePositions = (tableIndex, tablePosition, rowPositions) => {
    this.setState(state => {
      //table
      let table = state.data.tables[tableIndex]
      table.tablePositionX = tablePosition.left
      table.tablePositionY = tablePosition.top
      //rows
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


  menuToggle = () => {
    this.setState({open: !this.state.open});
  }

  menuClose = () => {
    this.setState({open: false});
  }

  onRequestChange = (open) => {
    this.setState({open});
  }

  fullscreenToggle = () => {
    this.setState({
      isFullscreenEnabled: this.state.isFullscreenEnabled ? false : true,
      open: false
    })
  }

  saveTextAsFile = () => {
    let text = this.code.getTextFromModel(this.state.data)
    let blob = new Blob([text], { type: "text/javascript" });
    FileSaver.saveAs(blob, 'schema.js')
  }

  render() {
    const { data } = this.state;

    return (
      <MuiThemeProvider>
      <div className="App">
        <Fullscreen style = {{height: '10000px'}}
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}
          >
            <div className='full-screenable-node'>
              {/*PRESS ESC TO EXIT*/}
              <MenuComp state={this.state} menuToggle={this.menuToggle} menuClose={this.menuClose} onRequestChange={this.onRequestChange} fullscreenToggle={this.fullscreenToggle} onAddTable={this.onAddTable} deleteAllTables={this.deleteAllTables} saveTextAsFile={this.saveTextAsFile} />

                <SplitPane style={{'background-color': 'rgb(51,51,51)'}} split="vertical" defaultSize="50%">
                <Visualization data={this.state.data} clickedRow={this.state.clickedRow} onAddRow={this.onAddRow} onAddTable={this.onAddTable}
                    updateTableName={this.updateTableName} updateRowProp={this.updateRowProp} updateRowType={this.updateRowType} onDragTable={this.onDragTable} refreshTablePositions={this.refreshTablePositions} deleteTable = {this.deleteTable} deleteRow = {this.deleteRow} deleteAllTables={this.deleteAllTables} onTableMouseUp={this.onTableMouseUp} onRowMouseDown={this.onRowMouseDown} changeTableMargin={this.changeTableMargin} />

                  <div className="TextEditor">
                      {/*<button className="save" onClick={() => this.saveTextAsFile()}> SAVE SCHEMA CODE
                      </button>*/}
                      <TextEditor data={this.state.data} onRef={ref => (this.code = ref)} />
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

