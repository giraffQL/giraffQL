import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App'


class Table extends React.Component {
    render() {
        const {table, tableIndex, onAddRow, rowIndex, updateTableName, updateRowProp, updateRowType} = this.props
        return (
            <table>
                <tbody>
                    <tr>
                        <th colSpan={2}>
                            <input type="text" value={table.name} placeholder="Table Name" onChange={(e) => updateTableName(tableIndex, e.target.value)}/>
                        </th>
                    </tr>
                    {table.attributes.map(({ name, type }, i) =>
                        <tr key={i}>
                            <td><input type="text" placeholder="Property" value={name} onChange={(e) => updateRowProp(tableIndex, i, e.target.value)}/></td>
                            <td><input type="text" placeholder="Type" value={type} onChange={(e) => updateRowType(tableIndex, i, e.target.value)}/></td>
                        </tr>
                    )}
                    <tr>
                    <td><button onClick={() => onAddRow(tableIndex)}> + </button> </td>
                    </tr>
                 </tbody>
            </table>
        )
    }
}
export default Table;