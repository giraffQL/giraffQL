import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Table from './Table'
import css from '../../css/Table.css'
import colors from './colors'

class Visualization extends React.Component {
    render() {

        const { data, onAddRow, updateTableName, updateRowProp, updateRowType, onAddTable, deleteTable, deleteAllTables, deleteRow, onDragTable, refreshRowPositions, dataEvent} = this.props

        return (
        <div className='visualization'>
            <button onClick={onAddTable}> Create table </button>
            <button> Add relations </button>
            <button onClick={deleteAllTables}> Delete All </button>
            <div class="tablesWrapper">
                    {data.tables.map((table, i) =>
                        <Table key={i} tableIndex={i} table={table} onAddRow={onAddRow}  updateTableName={updateTableName} updateRowProp={updateRowProp} updateRowType={updateRowType} deleteTable={deleteTable} deleteRow={deleteRow} onDragTable={onDragTable} dataEvent={dataEvent} refreshRowPositions={refreshRowPositions} style={{"background-color": colors[i]}}/>
                    )}
            </div>
        </div>
        )
    }
}
export default Visualization;