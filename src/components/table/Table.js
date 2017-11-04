import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import css from '../../css/Table.css'
import Draggable, {DraggableCore} from 'react-draggable';

class Table extends React.Component {
    render() {
        const { table, tableIndex, onAddRow, rowIndex, updateTableName, updateRowProp, updateRowType, deleteTable, deleteRow } = this.props
        return (
            <Draggable enableUserSelectHack={false}>
            <table className="table">
                <tbody>
                    <tr>
                        <th colSpan={2}>
                            <input className="tableName" type="text" value={table.name} placeholder="Table Name" onChange={(e) => updateTableName(tableIndex, e.target.value)}/>
                            <div className='deletetablebutton' onClick={()=>deleteTable(tableIndex)}>x</div>
                        </th>
                    </tr>
                    {table.attributes.map(({ field, type }, i) =>
                        <tr key={i}>
                            <td><input type="text" placeholder="Property" value={field} onChange={(e) => updateRowProp(tableIndex, i, e.target.value)} /></td>
                            <td className ='typetd'>
                                <input className='typeinput' type="text" placeholder="Type" value={type} onChange={(e) => updateRowType(tableIndex, i, e.target.value)} />
                                <div className='deleterowbutton' onClick={()=>deleteRow(tableIndex,rowIndex)}>x</div>
                            </td>
                            </tr>
                    )}
                    <tr>
                    <td colSpan={2}><button className="addRow" onClick={() => onAddRow(tableIndex)}> Add new field </button> </td>
                    </tr>
                </tbody>
            </table>
            </Draggable>
        )
    }
}
export default Table;