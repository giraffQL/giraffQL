import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import css from '../../css/Table.css'
import Draggable, { DraggableCore } from 'react-draggable';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.propertyRowRefs = [];
    }

    componentDidMount() {
        this.refreshRowPositions()
    }

    refreshRowPositions = () => {
        this.props.refreshRowPositions(this.props.tableIndex, this.propertyRowRefs.map(ref => ref.getBoundingClientRect()))
    }

    onDragTable = (e, dataEvent) => {
        this.props.onDragTable(this.props.tableIndex, e, dataEvent)
        this.props.refreshRowPositions(this.props.tableIndex, this.propertyRowRefs.map(ref => ref.getBoundingClientRect()))
    }

    render() {
        const { table, dataEvent, tableIndex, onAddRow, rowIndex, updateTableName, updateRowProp, updateRowType } = this.props
        return (
            <Draggable enableUserSelectHack={false} onDrag={(e,dataEvent) => this.onDragTable(e, dataEvent)}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th colSpan={2}>
                                <input className="tableName" type="text" value={table.name} placeholder="Table Name" onChange={(e) => updateTableName(tableIndex, e.target.value)} />
                            </th>
                        </tr>
                        {table.attributes.map(({ field, type, x, y }, i) =>
                            <tr key={i} ref={(e) => { this.propertyRowRefs[i] = e }}>
                                <td><input type="text" placeholder="Property" value={field} onChange={(e) => updateRowProp(tableIndex, i, e.target.value)} /></td>
                                <td><input type="text" placeholder="Type" value={type} onChange={(e) => updateRowType(tableIndex, i, e.target.value)} /></td>
                                {/*<td width="100px"><p> {table.tablePositionX}, {table.tablePositionY} </p></td>*/}
                                <td width="100px"><p> {Math.floor(x)}, {Math.floor(y)} </p></td>
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