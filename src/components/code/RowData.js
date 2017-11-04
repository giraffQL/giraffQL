import React, { Component } from 'react';

// import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class RowData extends React.Component {

    render() {
        let leftBracket = `{`;
        let rightBracket = `}`;
        let result = [];
        console.log(this.props.data.attributes);
        this.props.data.attributes.forEach((x, i) => {
            result.push(<div key={i}> <span className="tabspace"/>{x.field}: {leftBracket}<br /> 
            <span className="tabspace"/><span className="tabspace"/>type: {x.type} <br />
            <span className="tabspace"/>{rightBracket}</div>)
        });

        return (
            <div>{result}</div>
        )

    }
}

export default RowData;