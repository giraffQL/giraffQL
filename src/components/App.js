import React, { Component } from 'react';
import Visualization from './table/Visualization';
import SplitPane from "react-split-pane"
//TEXT CSS
import '../css/index.css';
import '../css/App.css';
//FILE SERVER (using for save schema code)
import FileSaver from 'file-saver';
//TEXT Editor
import TextEditor from '../components/code/TextEditor'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedRow: null,
      // our data have tables which is object of tables
      // {
      //   id: '1',
      //   name: 'One',
      //   tablePositionX: 0,
      //   tablePositionY: 7,
      //   attributes: [
      //     { field: 'hi', type: '', relatedToTableId: '2' },
      //     { field: 'blah', type: '', relatedToTableId: null }
      //   ]
      // }
      // each table has these properties...attributes are rows and each row has field, type and table which
      // is related to
      data: {
        tables: [
          {
            id: '1',
            name: 'One',
            tablePositionX: 0,
            tablePositionY: 7,
            attributes: [
              { field: 'hi', type: '', relatedToTableId: '2' },
              { field: 'blah', type: '', relatedToTableId: null }
            ]
          },
          {
            id: '2',
            name: 'Two',
            tablePositionX: 100,
            tablePositionY: 200,
            attributes: [
              { field: 'jj', type: '', relatedToTableId: null }
            ]
          }
        ],
      },
    };
  };


  // when we click to make new table call this function
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

  // function which is calling when we're adding new row
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

  // every time when we change or add table name we're setting up state with thoose new values
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
  // same for row prop and row type
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

  // function which is calling when we click for delete row
  deleteRow = (tableindex, rowindex) => {
    let spliceit = Object.assign({}, this.state.data.tables[tableindex])
    spliceit.attributes.splice(rowindex, 1);
    this.setState({ spliceit })
  }

  // function which is calling when we click for delete table
  deleteTable = (index) => {
    let spliceit = Object.assign({}, this.state.data)
    spliceit.tables.splice(index, 1);
    this.setState({ spliceit })
  }

  // function which is calling when we click for clear board
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

  // function which is calling when we drag tables
  // every time when we drag table we are keeping track of table position, and row position
  refreshTablePositions = (tableIndex, tablePosition, rowPositions) => {
    this.setState(state => {
      //table
      let table = state.data.tables[tableIndex]
      table.tablePositionX = table.x = Math.floor(tablePosition.left)
      table.tablePositionY = table.y = Math.floor(tablePosition.top)
      table.w = Math.floor(tablePosition.width)
      table.h = Math.floor(tablePosition.height)
      //rows
      let attrs = state.data.tables[tableIndex].attributes
      for (let i = 0; i < attrs.length; i += 1) {
        attrs[i].x = Math.floor(rowPositions[i].left)
        attrs[i].y = Math.floor(rowPositions[i].top)
        attrs[i].w = Math.floor(rowPositions[i].width)
        attrs[i].h = Math.floor(rowPositions[i].height)
      }
      return state;
    })
  }

  // clickedRow is null at the beginning but when we click on row we are setting state to
  // know which row is clicked, in which table...
  onRowMouseDown = (tableIndex, rowIndex) => {
    this.setState({
      clickedRow: {
        tableIndex,
        rowIndex
      }
    })
  }

  // storing to which table is row connected
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

  // function which is called when you click for save schema code
  saveTextAsFile = () => {
    let text = this.code.getTextFromModel(this.state.data)
    let blob = new Blob([text], { type: "text/javascript" });
    FileSaver.saveAs(blob, 'schema.js')
  }

  render() {
    const { data } = this.state
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
          <Visualization data={this.state.data} clickedRow={this.state.clickedRow} onAddRow={this.onAddRow} onAddTable={this.onAddTable}
            updateTableName={this.updateTableName} updateRowProp={this.updateRowProp}
            updateRowType={this.updateRowType} onAddTable={this.onAddTable} onDragTable={this.onDragTable} refreshTablePositions={this.refreshTablePositions} deleteTable={this.deleteTable} deleteRow={this.deleteRow} deleteAllTables={this.deleteAllTables}
            onTableMouseUp={this.onTableMouseUp} onRowMouseDown={this.onRowMouseDown} />
          <div className="TextEditor">
            <button className="save" onClick={() => this.saveTextAsFile()}> SAVE SCHEMA CODE </button>
            <TextEditor data={this.state.data} onRef={ref => (this.code = ref)} />
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default App;

