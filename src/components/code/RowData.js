import React, { Component } from 'react';

// import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class RowData extends React.Component {

    componentWillReceiveProps = (nextProps) => {
        (this.props.data.attributes !== nextProps.data.attributes) ? true : false;
    }

    render() {
        let leftBracket = `{`;
        let rightBracket = `}`;
        let comma = `,`;
        let result = new Array;
        let attr = this.props.data.attributes;
        let closeBracket;
        // console.log(this.props.data.attributes);
        attr.forEach((x, i) => {
            if (x.field !== "") {
                console.log(`attr.length: ${attr.length} result.length: ${result.length}`);
                result.push(<div key={i}>
                    <span className="tabspace" />{x.field}: {leftBracket}<br />
                    <span className="tabspace" /><span className="tabspace" />type: {x.type} <br />
                    <span className="tabspace" />{rightBracket}
                    {(attr.length === 1) ?  '' : (attr.length-1 === result.length) ? '' : comma} 
                </div>)
            }
        });

        return (
            <div>
                {result}
            </div>
        )

    }
}

export default RowData;