import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'
import Table from './Table'
import { PathLine } from 'react-svg-pathline'
import colors from './colors';
import { FormControl, Button, ButtonGroup, Nav } from 'react-bootstrap';
import css from '../../css/Table.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Scrollbars } from 'react-custom-scrollbars';


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

        const { clickedRow, data, dataEvent, onAddRow, updateTableName, updateRowProp, updateRowType, onAddTable, deleteTable, deleteRow, deleteAllTables, onDragTable, refreshTablePositions, onTableMouseUp, onRowMouseDown, value } = this.props
        return (

            <div className='visualization' onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}>
            <Scrollbars style={{ height: '100%', width: '100%' }}>

                <div className='toolbar'>
                        {/* <div class="button_base b02_slide_in">
                        <div bsStyle="success" bsSize="large" onClick={onAddTable}><p className ='buttonone'>Create Table</p></div>
                    <div className="button_base b02_slide_in">
                        <div onClick={onAddTable}><p className ='buttonone'>Create Table</p></div>

                        <div></div>
                        {<div onClick={onAddTable}><p className ='buttontwo'>Create Table</p></div>}
                    </div>*/}

                    <Nav id="nav" bsStyle="pills">
                        <Button id="createTableBtn" className="displayBtn" bsSize="large" onClick={onAddTable}> CREATE TABLE </Button>

                        {/* <button onClick={onAddTable}> Create table </button> */}
                        <Button id="clearBtn" className="displayBtn" bsSize="large" onClick={deleteAllTables}> CLEAR </Button>
                    </Nav>

                </div>


                <div>
                    <svg className="relations" >
                        <defs>
                            <marker id="triangle" viewBox="0 0 10 10" refX="1" refY="5"
                                markerWidth="5" markerHeight="5" orient="auto">
                                <path d="M 0 0 L 10 5 L 0 10 z"  fill="red" />
                            </marker>
                            <marker id="circle" markerWidth="5" markerHeight="5" refX="5" refY="5" orient="auto">
                                <circle cx="5" cy="5" r="2" fill="red" />
                            </marker>
                               
                        </defs>

                        {start !== null && end !== null && clickedRow &&
                            <PathLine
                                points={[start, end]}
                                stroke="red"
                                strokeWidth="3"
                                fill="none"
                                r={10}
                                markerEnd="url(#triangle)" markerStart="url(#circle)" />
                        }

                    </svg>
                    <svg className="relation">
                        {data.tables.map((table, i) =>
                            table.attributes.map((attr, ai) => {
                                const relatedTable = data.tables.find(t => t.id === attr.relatedToTableId)
                                if (relatedTable) {
                                    return (
                                        <PathLine
                                            id="svgId"
                                            key={`${i}-${ai}`}
                                            points={[
                                                { ...attr },
                                                { x: relatedTable.tablePositionX, y: relatedTable.tablePositionY }
                                            ]}
                                            stroke="red"
                                            strokeWidth="3"
                                            fill="none"
                                            r={10}
                                            markerEnd="url(#triangle)" markerStart="url(#circle)" />
                                    )
                                }
                            })
                        )}
                    </svg>

                    <div className="tables">
                        {data.tables.map((table, i) =>
                            <Table style={{"backgroundColor": colors[i]}} key={table.id} data={data} value={value} tables={data.tables} draggable={!clickedRow} tableIndex={i} table={table} onAddRow={onAddRow} updateTableName={updateTableName}
                                updateRowProp={updateRowProp} updateRowType={updateRowType} deleteTable={deleteTable} deleteRow={deleteRow}
                                onDragTable={onDragTable} dataEvent={dataEvent} refreshTablePositions={refreshTablePositions} onTableMouseUp={onTableMouseUp} onRowMouseDown={onRowMouseDown} />
                        )}
                    </div>

                </div>
            </Scrollbars>
            </div>
        )
    }
}
export default Visualization;