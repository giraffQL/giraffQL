import React, { Component } from 'react';

// import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class RowData extends React.Component {

    render() {
        let leftBracket = `{`;
        let rightBracket = `}`;
        let result = [];
        this.props.data.attributes.forEach((x) => {
            result.push(<div>{x.field}: {leftBracket}<br /> 
                type: {x.type} <br /></div>)
        });

        return (
            <div>{result}</div>
        )

    }
}

export default RowData;