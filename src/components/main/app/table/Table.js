import React, { Component } from 'react';
import { render } from 'react-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FormControl, Button } from 'react-bootstrap';
// COMPONENTS
import App from '../App'
import colors from './colors';


class Table extends React.Component {
    constructor(props) {
        super(props)
        this.propertyRowRefs = [];
        this.propertyTableRefs = [];
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
            this.propertyRowRefs.filter((el) => {return el !== null}).map(ref => ref.getBoundingClientRect())
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
            let container = {};
            if (data.tables[i]) {
                container.value = data.tables[i].name
                container.label = data.tables[i].name
                options.push(container)
            }
        }

        return (

            <Draggable bounds="parent" handle=".drag-handle"

            enableUserSelectHack={false} onDrag={(e,dataEvent) => this.onDragTable(e, dataEvent)}>
            <div>
            <table className="table" ref={(e) => { this.propertyTableRefs = e }} onMouseUp={(e) => onTableMouseUp(tableIndex)}>
                <tbody>
                    <tr>
                        <th colSpan={2} style={style}>
                            <FormControl className="tableName" type="text" value={table.name} placeholder="Table Name" onChange={(e) => updateTableName(tableIndex, e.target.value)}/>
                            <div className='deletetablebutton' onClick={()=>deleteTable(tableIndex)}>x</div>
                            <div className='drag-handle'><img className ='img' src="https://i.pinimg.com/236x/05/c3/22/05c32290526fb5c507329afd43a58fbc--jungle-animals-farm-animals.jpg" /></div>
                        </th>
                    </tr>
                    {table.attributes.map(({field, type, x, y, relatedToTableId}, i) => {
                        const relatedTable = relatedToTableId && tables.find(t => {
                            if (t) {
                                t.id === relatedToTableId
                            }
                        })
                        return (
                            <tr key={i} ref={(e) => { this.propertyRowRefs[i] = e }} onMouseDown={(e) => onRowMouseDown(tableIndex, i)}>
                                {/* changed from form control to input */}
                                <td><input className='propertyinput' type="text" placeholder="Property" value={field} onChange={(e) => updateRowProp(tableIndex, i, e.target.value)} /></td>
                                <td className ='typetd'>
                                    <div className='deleterowbutton' onClick={()=>deleteRow(tableIndex,i)}>x</div>
                                    <div>
                                        {relatedTable &&
                                            // <span>{relatedTable.name}</span>
                                            <Select className='dropdown'
                                            onChange={(value) => updateRowType(tableIndex, i, value)}
                                            options={options}
                                            simpleValue
                                            autoload= {true}
                                            value={data.tables[i].name}
                                            autosize={true}
                                            clearable={false}
                                            /* value={data.tables[tableIndex].attributes[i].value} */
                                        />
                                        }
                                        {!relatedTable &&
                                            <Select className='dropdown'
                                                onChange={(value) => updateRowType(tableIndex, i, value)}
                                                options={options}
                                                simpleValue
                                                autosize={true}
                                                clearable={false}
                                                value={data.tables[tableIndex].attributes[i].type}
                                            />
                                        }
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td className = 'addRowWrap' colSpan={2}>
                          <Button className="addRow" onClick={() => onAddRow(tableIndex)}> ADD FIELD </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </Draggable>

                )
    }
}
export default Table;