import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Table from './Table'
import { PathLine } from 'react-svg-pathline'

class Visualization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: null,
            end: null
        }
    }

    handleMouseDown = (mouseEvent) => {
        this.setState({
            start: {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            }
        });
    }

    handleMouseMove = (mouseEvent) => {
        if (this.state.start !== null) {
            this.setState({
                end: {
                    x: mouseEvent.clientX,
                    y: mouseEvent.clientY
                }
            });
        }
    }

    handleMouseUp = (mouseEvent) => {
        if (this.state.start !== null) {
            this.setState({ start: null, end: null })
        }
        this.props.onTableMouseUp(null)
    }

    render() {
        const { start, end } = this.state
        const { clickedRow, data, dataEvent, onAddRow, updateTableName, updateRowProp, updateRowType, onAddTable, deleteTable, deleteRow, onDragTable, refreshTablePositions, onTableMouseUp, onRowMouseDown, value } = this.props
        return (
            <div className='visualization' onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}>
                <div className='toolbar'>
                    <div class="button_base b02_slide_in">
                        <div onClick={onAddTable}><p className ='buttonone'>Create Table</p></div>
                        <div></div>
                        <div onClick={onAddTable}><p className ='buttontwo'>Create Table</p></div>
                    </div>
                    {/* <button onClick={onAddTable}> Create table </button> */}
                </div>
                <div>
                    <svg className="relations" >
                        {start !== null && end !== null && clickedRow &&
                            <PathLine
                                points={[start, end]}
                                stroke="red"
                                strokeWidth="10"
                                fill="none"
                                r={10} />
                        }

                        {data.tables.map((table, i) =>
                            table.attributes.map((attr, ai) => {
                                const relatedTable = data.tables.find(t => t.id === attr.relatedToTableId)
                                if (relatedTable) {
                                    return (
                                        <PathLine
                                            key={`${i}-${ai}`}
                                            points={[
                                                { ...attr },
                                                { x: relatedTable.tablePositionX, y: relatedTable.tablePositionY }
                                            ]}
                                            stroke="red"
                                            strokeWidth="3"
                                            fill="none"
                                            r={10} />
                                    )
                                }
                            })
                        )}
                    </svg>

                    <div className="tables">
                        {data.tables.map((table, i) =>
                            <Table key={table.id} data={data} value={value} tables={data.tables} draggable={!clickedRow} tableIndex={i} table={table} onAddRow={onAddRow} updateTableName={updateTableName}
                                updateRowProp={updateRowProp} updateRowType={updateRowType} deleteTable={deleteTable} deleteRow={deleteRow}
                                onDragTable={onDragTable} dataEvent={dataEvent} refreshTablePositions={refreshTablePositions} onTableMouseUp={onTableMouseUp} onRowMouseDown={onRowMouseDown} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
export default Visualization;