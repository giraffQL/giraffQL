import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Table from './Table'


class Visualization extends React.Component {
    render() {
        const { data, onAddRow, updateTableName, updateRowProp, updateRowType} = this.props
        return (
            <div>
                {data.tables.map((table, i) =>
                    <Table key={i} tableIndex={i} table={table} onAddRow={onAddRow}  updateTableName={updateTableName}
                    updateRowProp={updateRowProp} updateRowType={updateRowType}/>
                )}
            </div>
        )
    }
}
export default Visualization;