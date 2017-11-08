import React, { Component } from 'react';

// import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class RowData extends React.Component {

    render() {
        let leftBracket = `{`;
        let rightBracket = `}`;
        let result = new Array;
        let attr = this.props.data.attributes;
        // console.log(this.props.data.attributes);
        attr.forEach((x, i) => {
            if (x.field !== "") {
                result.push(<div key={i}> <span className="tabspace" />{x.field}: {leftBracket}<br />
                    <span className="tabspace" /><span className="tabspace" />type: {x.type} <br />
                    <span className="tabspace" />{rightBracket}</div>)
            }
        });
        // console.log(attr);
        return (
            <div>{result}</div>
        )

    }
}

export default RowData;