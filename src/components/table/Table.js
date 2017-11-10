import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import css from '../../css/Table.css'
import Draggable, { DraggableCore } from 'react-draggable';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import colors from './colors';



class Table extends React.Component {
    constructor(props) {
        super(props)
        this.propertyRowRefs = [];
        this.propertyTableRefs = [];
        this.state = {
            position: {
                x: 0,
                y: 0
            }
        }
    }

    componentDidMount() {
        this.refreshTablePositions()
    }

    componentDidUpdate(oldProps) {
        if (this.props.table.attributes.length > oldProps.table.attributes.length) {
            this.refreshTablePositions()
        }
    }

    onDragTable = (e, dataEvent) => {
        this.refreshTablePositions()
    }

    refreshTablePositions = () => {
        this.props.refreshTablePositions(
            this.props.tableIndex,
            this.propertyTableRefs.getBoundingClientRect(),
            this.propertyRowRefs.map(ref => ref.getBoundingClientRect())
        )
    }



    render() {
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };

        const { style, data, tables, dataEvent, table, tableIndex, onAddRow, rowIndex, updateTableName, updateRowProp, updateRowType, handleRowClick, deleteTable, deleteRow, onTableMouseUp, onRowMouseDown, value } = this.props

        let options = [
            { value: 'GraphQLString', label: 'GraphQLString' },
            { value: 'GraphQLInt', label: 'GraphQLInt' },
            { value: 'GraphQLFloat', label: 'GraphQLFloat' },
            { value: 'GraphQLBoolean', label: 'GraphQLBoolean' },
            { value: 'GraphQLID', label: 'GraphQLID' },
            { value: 'GraphQLList', label: 'GraphQLList' }
        ]
        for (let i = 0; i < data.tables.length; i++) {
            let container = {}
            container.value = data.tables[i].name
            container.label = data.tables[i].name
            options.push(container)

        }
        return (
            <Draggable bounds="parent" handle=".drag-handle"
            enableUserSelectHack={false} onDrag={(e,dataEvent) => this.onDragTable(e, dataEvent)}>
            <div>
            <table className="table"  ref={(e) => { this.propertyTableRefs = e }} onMouseUp={(e) => onTableMouseUp(tableIndex)}>
                <tbody>
                    <tr>
                        <th colSpan={2} style={style}>
                            <input className="tableName" type="text" value={table.name} placeholder="Table Name" onChange={(e) => updateTableName(tableIndex, e.target.value)}/>
                            <div className='deletetablebutton' onClick={()=>deleteTable(tableIndex)}>x</div>
                            <div className='drag-handle'><img className="drag" src={"https://d30y9cdsu7xlg0.cloudfront.net/png/417776-200.png"}/></div>
                        </th>
                    </tr>
                    {table.attributes.map(({field, type, x, y, relatedToTableId}, i) => {
                        const relatedTable = relatedToTableId && tables.find(t => t.id === relatedToTableId)
                        return (
                            <tr key={i} ref={(e) => { this.propertyRowRefs[i] = e }} onMouseDown={(e) => onRowMouseDown(tableIndex, i)}>
                                <td><input className='propertyinput' type="text" placeholder="Property" value={field} onChange={(e) => updateRowProp(tableIndex, i, e.target.value)} /></td>
                                <td className ='typetd'>
                                    <div className='deleterowbutton' onClick={()=>deleteRow(tableIndex,rowIndex)}>x</div>
                                    <div>
                                        {relatedTable &&
                                            <span>{relatedTable.name}</span>
                                        }
                                        {!relatedTable &&
                                            <Select className='dropdown'
                                                onChange={(value) => updateRowType(tableIndex, i, value)}
                                                options={options}
                                                simpleValue
                                                autosize={true}
                                                value={data.tables[tableIndex].attributes[i].value}
                                            />
                                        }
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                    <td colSpan={2}><button className="addRow" onClick={() => onAddRow(tableIndex)}> Add new field </button> </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </Draggable>

        )
    }
}
export default Table;