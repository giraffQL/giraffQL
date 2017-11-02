import React, { Component } from 'react';
import './App.css';
import Visualization from './Visualization'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        tables: [
        ]
      }
    }
  }


  onAddTable = () => {
    let newstate = this.state.data.tables.slice()
    this.setState({
      data:{
        tables:newstate.concat({
            name: '',
            attributes: [
              { name: '', type: '' }
            ]
          })
    // this.setState(prevState => {
    //   return {
    //     data: {
    //       tables: prevState.data.tables.concat({
    //         name: '',
    //         attributes: [
    //           { name: '', type: '' }
    //         ]
    //       })
    //     }
    //   }
    // })
    }
  })
}

  //this is not correct way to do because state has to be immutable (but it's working) 
  onAddRow = (index) => {
    this.setState(state => {
      let tableObj = state.data.tables[index]
      tableObj.attributes.push({ name: '', type: '' })
      return state
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
      rowProp.name = value;
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

  render() {
    return (
      <div className="App">
        <button onClick={this.onAddTable}> Create table </button>
        <button> Add relations </button>

        <Visualization data={this.state.data} onAddRow={this.onAddRow} onAddTable={this.onAddTable} 
        updateTableName={this.updateTableName} updateRowProp={this.updateRowProp}
        updateRowType={this.updateRowType}/>

      </div>
    );
  }
}

export default App;
