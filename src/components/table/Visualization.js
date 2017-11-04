import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Table from './Table'


class Visualization extends React.Component {
    render() {
        const { data, onAddRow, updateTableName, updateRowProp, updateRowType, onAddTable} = this.props
        return (
        
        <div className='visualization'>
        <button onClick={onAddTable}> Create table </button>
        <button> Add relations </button>
                {data.tables.map((table, i) =>
                    <Table key={i} tableIndex={i} table={table} onAddRow={onAddRow}  updateTableName={updateTableName}
                    updateRowProp={updateRowProp} updateRowType={updateRowType}/>
                )}
            </div>
        )
    }
}
export default Visualization;