import React, { Component } from 'react';
import SplitPane from "react-split-pane"
//TEXT CSS
// import '../css/index.css';
// import '../css/App.css';
import Fullscreen from 'react-full-screen';
// MATERIAL UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// REACT-BOOTSTRAP
import { FormControl, Button, ButtonGroup, Nav, Popover } from 'react-bootstrap';
//FILE SERVER
import FileSaver from 'file-saver';
//COMPONENTS
import MenuComp from './AppMenu';
import Visualization from './table/Visualization';
import TextEditor from './code/TextEditor'
import ExpressCode from './code/ExpressCode'




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
        ]
      },
      schemaCode: '',
      jsCode: ''
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

    // let newstate = Object.assign({}, this.state);
    // let tables = newstate.data.tables;
    // newstate.data.tables.push({
    //       id: guid(),
    //       name: '',
    //       attributes: [
    //         { field: '', type: '' }
    //       ],
    //       defaultPosition: 210 * tables.length
    let newstate = this.state.data.tables.slice()
    const newData = {
      tables: newstate.concat({
        id: guid(),
        name: '',
        attributes: [
          { field: '', type: '' }
        ],
        defaultPosition: 210 * newstate.length
      })
    }
    this.setState({
      data: newData,
      schemaCode: this.getTextFromModel(newData),
      jsCode: this.getExpressCode(newData)
    })
  }

  // function which is calling when we're adding new row
  onAddRow = (tableIndex) => {
    this.setState(state => {
      const newData = {
        tables: state.data.tables.map((table, i) =>
          (i === tableIndex)
            ? Object.assign({}, table, {
              attributes: table.attributes.concat({ field: '', type: '' })
            })
            : table
        )
      }
      return {
        data: newData,
        schemaCode: this.getTextFromModel(newData),
        jsCode: this.getExpressCode(newData)
      }
    })
  }

  // every time when we change or add table name we're setting up state with thoose new values
  updateTableName = (tableIndex, value) => {
    this.setState(state => {
      const newData = {
        tables: state.data.tables.map((table, i) =>
          (i === tableIndex)
            ? Object.assign({}, table, {
              name: value,
              attributes: table.attributes.map((attr, ia) =>
                (attr.relatedToTableId === state.data.tables[tableIndex].id)
                  ? Object.assign({}, attr, { type: value })
                  : attr
              )
            })
            : Object.assign({}, table, {
              attributes: table.attributes.map((attr, ia) =>
                (attr.relatedToTableId === state.data.tables[tableIndex].id)
                  ? Object.assign({}, attr, { type: value })
                  : attr
              )
            })
        )
      }
      return {
        data: newData,
        schemaCode: this.getTextFromModel(newData),
        jsCode: this.getExpressCode(newData)
      }
    })
  }
  // same for row prop and row type
  updateRowProp = (tableIndex, rowIndex, value) => {
    this.setState(state => {
      const newData = {
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
      return {
        data: newData,
        schemaCode: this.getTextFromModel(newData),
        jsCode: this.getExpressCode(newData)
      }
    })
  }

  updateRowType = (tableIndex, rowIndex, value) => {
    this.setState(state => {
      const newData = {
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
      return {
        data: newData,
        schemaCode: this.getTextFromModel(newData),
        jsCode: this.getExpressCode(newData)
      }
    })
  }

  // function which is calling when we click for delete row
  deleteRow = (tableIndex, rowIndex) => {
    this.setState(state => {
      const newData = {
        tables: state.data.tables.map((table, i) =>
          (i === tableIndex)
            ? Object.assign({}, table, {
              attributes: table.attributes.filter((attr, ai) => ai !== rowIndex)
            })
            : table
        )
      }
      return {
        data: newData,
        schemaCode: this.getTextFromModel(newData),
        jsCode: this.getExpressCode(newData)
      }
    })
  }

  // function which is calling when we click for delete table
  deleteTable = (tableIndex) => {
    this.setState(state => {
      const newData = {
        tables: state.data.tables.filter((table, i) => i !== tableIndex)
      }
      return {
        data: newData,
        schemaCode: this.getTextFromModel(newData),
        jsCode: this.getExpressCode(newData)
      }
    })
  }

  // function which is calling when we click for clear board
  deleteAllTables = () => {
    this.setState(state => {
      const newData = {
        tables: []
      }
      return {
        data: newData,
        schemaCode: this.getTextFromModel(newData),
        jsCode: this.getExpressCode(newData)
      }
    })
  }

  // function which is calling when we drag tables
  // every time when we drag table we are keeping track of table position, and row position
  refreshTablePositions = (tableIndex, tablePosition, rowPositions) => {
    this.setState(state => {
      //table
      let table = state.data.tables[tableIndex]
      if (table) {
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
          data: state.data,
          schemaCode: this.getTextFromModel(state.data),
          jsCode: this.getExpressCode(state.data)
        }
      })
    }
  }


  menuToggle = () => {
    this.setState({ open: !this.state.open });
  }

  menuClose = () => {
    this.setState({ open: false });
  }

  onRequestChange = (open) => {
    this.setState({ open });
  }

  fullscreenToggle = () => {
    this.setState({
      isFullscreenEnabled: this.state.isFullscreenEnabled ? false : true,
      open: false
    })
  }

  // function which is called when you click for save schema js code
  saveTextAsFile = () => {
    let text = this.state.jsCode
    let blob = new Blob([text], { type: "text/javascript" });
    FileSaver.saveAs(blob, 'schema.js')
  }


  onSchemaCodeChange = (schemaCode) => {
    this.setState(state => ({
      schemaCode
    }))
  }

  onJsCodeChange = (jsCode) => {
    this.setState(state => ({
      jsCode
    }))
  }

  submitSchemaCode = () => {
    function post(path, params, method) {
      method = method || "post";

      let form = document.createElement("form");
      form.setAttribute("method", method);
      form.setAttribute("action", path);

      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          let hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);

          form.appendChild(hiddenField);
        }
      }
      document.body.appendChild(form);
      form.submit();
    }
    post('/schemas', { schema: this.state.schemaCode })
  }

  // function to check is input string contains number
  startsWithNumber = (text) => {
    return /^[0-9]/.test(text);
  }

  // function which is creating text in schema text area
  getTextFromModel = (data) => {
    let code = '\n'
    code += 'type Query {\n'

    for (let i = 0; i < data.tables.length; i += 1) {
      const table = data.tables[i]

      if (table.name && !this.startsWithNumber(data.tables[i].name)) {
        code += `    ${table.name}: ${table.name}\n`
      }
    }
    code += `}\n\n`

    for (let i = 0; i < data.tables.length; i += 1) {
      const table = data.tables[i]

      if (table.name && !this.startsWithNumber(data.tables[i].name)) {
        code += `type ${table.name} {\n`
        for (let j = 0; j < table.attributes.length; j += 1) {
          const attr = table.attributes[j]
          if (attr.field !== '') {
            code += `    ${attr.field}: ${attr.type}\n`
          }
        }
        code += `}\n\n`
      }
    }

    return code + '\n'
  }

  // function which is creating schema js code in textarea
  getExpressCode = (data) => {
    let code = '\n'
    for (let i = 0; i < data.tables.length; i += 1) {
      const table = data.tables[i]

      if (table.name && !this.startsWithNumber(data.tables[i].name)) {
        code += `const ${table.name}Type = new GraphQLObjectType({\n`
          + `    name: ${table.name},\n`
          + `    fields: () => ({\n`
        for (let j = 0; j < table.attributes.length; j += 1) {
          const attr = table.attributes[j]
          if (attr.field !== '') {
            code += `        ${attr.field}: {\n`
              + `            type: ${!attr.relatedToTableId ? 'GraphQL' : ''}${attr.type}${attr.relatedToTableId ? 'Type' : ''}\n`
              + `        }`
          }
          if (j < table.attributes.length - 1 && attr.field !== '') {
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
    const { data } = this.state;
    return [
      <MuiThemeProvider>
        <div className="App">
          <Fullscreen style={{ height: '2000px', backgroundColor: 'rgb(51,51,51)' }}
            enabled={this.state.isFullscreenEnabled}
            onChange={isFullscreenEnabled => this.setState({ isFullscreenEnabled })}
          >
            <div className='full-screenable-node'>
              <MenuComp state={this.state} menuToggle={this.menuToggle} menuClose={this.menuClose} onRequestChange={this.onRequestChange} fullscreenToggle={this.fullscreenToggle} onAddTable={this.onAddTable} deleteAllTables={this.deleteAllTables} saveTextAsFile={this.saveTextAsFile} submitSchemaCode={this.submitSchemaCode} />

              <SplitPane style={{ 'backgroundColor': 'rgb(45,45,45)' }} split="vertical" defaultSize="50%">
                <Visualization data={this.state.data} clickedRow={this.state.clickedRow} onAddRow={this.onAddRow} onAddTable={this.onAddTable}
                  updateTableName={this.updateTableName} updateRowProp={this.updateRowProp} updateRowType={this.updateRowType} onDragTable={this.onDragTable} refreshTablePositions={this.refreshTablePositions} deleteTable={this.deleteTable} deleteRow={this.deleteRow} deleteAllTables={this.deleteAllTables} onTableMouseUp={this.onTableMouseUp} onRowMouseDown={this.onRowMouseDown} />

                <div className="TextEditor">
                  <TextEditor code={this.state.schemaCode} onChange={this.onSchemaCodeChange} />
                  <ExpressCode code={this.state.jsCode} onChange={this.onJsCodeChange} />
                </div>
              </SplitPane>
            </div>
          </Fullscreen>
        </div>
      </MuiThemeProvider>
    ];
  }
}

export default App;

