import React, { Component } from 'react';
import { render } from 'react-dom';
import { PathLine } from 'react-svg-pathline'
import _ from 'lodash'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { FormControl, Button, ButtonGroup, Nav } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
// COMPONENTS
import App from '../App'
import Table from './Table'
import colors from './colors';


// creating a grid because we have to have track what we visited before
const n = 2000
const visited = new Array(n*n)

function matrixIndex(x, y) {
    return x * n + y;
}

// this is not exact manhattanPath xD
function manhattanPath(attribute, table, allTables) {
    if (attribute.x === undefined || attribute.y === undefined || attribute.w === undefined || attribute.h === undefined ||
        table.x === undefined || table.y === undefined || table.w === undefined || table.h === undefined) {
        return []
    }
    // n is grid max
    const step = 20
    const destinations = [
        { x: table.x, y: table.y },
        { x: table.x + table.w, y: table.y },
        { x: table.x, y: table.y + table.h },
        { x: table.x + table.w, y: table.y + table.h },
        { x: table.x + Math.floor(table.w / 2), y: table.y },
        { x: table.x + table.w, y: table.y + Math.floor(table.h / 2) },
        { x: table.x, y: table.y + Math.floor(table.h / 2) },
        { x: table.x + Math.floor(table.w / 2), y: table.y + table.h }
    ]
    // A star algorithm optimization- heuristic (create middle of all those points)
    const gravityCenter = {
        x: _.meanBy(destinations, p => p.x),
        y: _.meanBy(destinations, p => p.y)
    }
    // taking middle of rows from left and right side to have at the end shortest path
    const starts = [
        { x: attribute.x, y: attribute.y + Math.floor(attribute.h / 2) },
        { x: attribute.x + attribute.w, y: attribute.y + Math.floor(attribute.h / 2) }
    ]
    // list of where I can go next (recursive)
    // taking starts that we can make line which is a offset
    let discovered = [
        { x: Math.max(0, starts[0].x - step), y: starts[0].y, px: starts[0].x, py: starts[0].y },
        { x: Math.min(n, starts[1].x + step), y: starts[1].y, px: starts[1].x, py: starts[1].y }
    ]

    discovered.forEach(point => point.dist = heuristicDistance(point.x, point.y))
    // for starts points previous is null because it doesnt exist
    // storing a previous point (from where you came)
    visited.fill(undefined)
    starts.forEach(point => visited[matrixIndex(point.x, point.y)] = { px: null, py: null })
    // check if point is overlapping other tables
    function isNotOverlappingTables(x, y) {
        return _.every(allTables, table => (x <= table.x) || ((table.x + table.w) <= x) || (y <= table.y) || ((table.y + table.h) <= y))
    }
    // finds end points which satisfies the condition that's less than step afar from x and y
    function nearValidResult(x, y) {
        return _.find(destinations, point => Math.abs(x - point.x) <= step && Math.abs(y - point.y) <= step)
    }

    // euclid distance between two points (finding distance between gravity centers)
    function heuristicDistance(x, y) {
        return Math.pow(gravityCenter.x - x, 2) + Math.pow(gravityCenter.y - y, 2)
    }
    // start searching (BFS)
    let foundResult = null
    while (discovered.length > 0 && !foundResult) {
        // every time we start we sort based on the distance property
        discovered = _.orderBy(discovered, ['dist'], ['desc'])
        const { x, y, px, py } = discovered.pop()
        //const { x, y, px, py } = discovered.shift()

        if (!visited[matrixIndex(x, y)]) {
            visited[matrixIndex(x, y)] = { px, py }

            foundResult = nearValidResult(x, y)
            if (foundResult) {
                visited[matrixIndex(foundResult.x, foundResult.y)] = { px: x, py: y }
                break
            }

            [
                { dx: step, dy: step },
                { dx: step, dy: -step },
                { dx: -step, dy: step },
                { dx: -step, dy: -step },
                { dx: step, dy: 0 },
                { dx: 0, dy: step },
                { dx: -step, dy: 0 },
                { dx: 0, dy: -step },
            ]//for  each point see if that point is valid
            .forEach(({ dx, dy }) => {
                if (0 < x + dx && x + dx < n &&
                    0 < y + dy && y + dy < n &&
                    !visited[matrixIndex(x + dx, y + dy)] &&
                    isNotOverlappingTables(x + dx, y + dy))
                {
                    discovered.push({ x: x + dx, y: y + dy, px: x, py: y, dist: heuristicDistance(x + dx, y + dy) })
                }
            })
        }
    }

    if (!foundResult) {
        return []
    }
    // if we found result we have to rebuild the path
    const resultingPath = []
    for (
        let pointer = foundResult;
        pointer.x !== null && pointer.y !== null;
        pointer = { x: visited[matrixIndex(pointer.x, pointer.y, n)].px, y: visited[matrixIndex(pointer.x, pointer.y, n)].py }
    ) {
        resultingPath.push(pointer)
    }
    return resultingPath
}



class Visualization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: null,
            end: null,
        }
        this.tableRefs = []
        this.svgPosition = {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        }
    }

    // when we click on row we're taking row DOM cordinates
    handleMouseDown = (mouseEvent) => {
        this.setState({
            start: {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            }
        });
    }

    // take the end coordinate
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

    refreshTableRefs = (tableIndex, tableRef, rowRefs) => {
        this.tableRefs[tableIndex] = { tableRef, rowRefs }

        this.tableRefs.forEach((tableRef, tableIndex) => {
            this.props.refreshTablePositions(
                tableIndex,
                tableRef.tableRef.getBoundingClientRect(),
                tableRef.rowRefs.map(ref => ref.getBoundingClientRect()),
            )
        })
    }

    onDragTable = (tableIndex) => {
        this.props.refreshTablePositions(
            tableIndex,
            this.tableRefs[tableIndex].tableRef.getBoundingClientRect(),
            this.tableRefs[tableIndex].rowRefs.map(ref => ref.getBoundingClientRect()),
        )
    }

    translateSvgPoints = (points) => {
        return points.map(point => ({
            x: point.x - this.svgPosition.left,
            y: point.y - this.svgPosition.top,
        }))
    }

    render() {
        const { start, end } = this.state


        const { clickedRow, data, dataEvent, onAddRow, updateTableName, updateRowProp, updateRowType, onAddTable, deleteTable, deleteRow, deleteAllTables, onDragTable, refreshTablePositions, onTableMouseUp, onRowMouseDown, value } = this.props

        return (

            <div className='visualization' onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}>
            <Scrollbars style={{ height: '100%', width: '100%' }}>
                <div className='toolbar'>
                </div>
                <div>
                    <svg className="relations" ref={e => { this.svgPosition = e && e.getBoundingClientRect() }}>
                        <defs>
                            <marker id="triangle" viewBox="0 0 10 10" refX="1" refY="5"
                                markerWidth="5" markerHeight="5" orient="auto">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fdd217" />
                            </marker>
                            <marker id="circle" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <circle cx="5" cy="5" r="2" fill="#fdd217" />
                            </marker>

                        </defs>
                        {start !== null && end !== null && clickedRow &&
                            <PathLine
                                points={this.translateSvgPoints([start, end])}
                                stroke="#fdd217"
                                strokeWidth="3"
                                fill="none"
                                r={10}
                                markerEnd="url(#triangle)" markerStart="url(#circle)" />
                        }
                        {data.tables.map((table, i) => {
                            if (table) {
                                return table.attributes.map((attr, ai) => {
                                    const relatedTable = data.tables.find(t => {
                                        if (t) {
                                            return t.id === attr.relatedToTableId
                                        }
                                    })
                                    if (relatedTable) {
                                        const pathPoints = manhattanPath(attr, relatedTable, data.tables)
                                        return (
                                            pathPoints.length &&
                                            <PathLine
                                                id="svgId"
                                                key={`${i}-${ai}`}
                                                points={this.translateSvgPoints(_.reverse(pathPoints))}
                                                stroke="#fdd217"
                                                strokeWidth="4"
                                                fill="none"
                                                r={10}
                                                markerEnd="url(#triangle)" markerStart="url(#circle)" />
                                        )
                                    }
                                })
                            }
                        })}
                    </svg>

                    <div className="tables">
                        {
                            data.tables.map((table, i) => {
                                if (table) {
                                    return (
                                        <Table style={{ "backgroundColor": colors[i] }} key={table.id} data={data} value={value} tables={data.tables} draggable={!clickedRow} tableIndex={i} table={table} onAddRow={onAddRow} updateTableName={updateTableName}
                                            updateRowProp={updateRowProp} updateRowType={updateRowType} deleteTable={deleteTable} deleteRow={deleteRow}
                                            onDragTable={this.onDragTable} dataEvent={dataEvent} refreshTableRefs={this.refreshTableRefs} onTableMouseUp={onTableMouseUp} onRowMouseDown={onRowMouseDown} />
                                    );
                                } else {
                                    let placeholder = (
                                      <div>
                                      </div>
                                    )
                                    return placeholder;
                                }
                            })
                        }
                    </div>

                </div>
            </Scrollbars>
            </div>
        )
    }
}
export default Visualization;