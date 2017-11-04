import React, { Component } from 'react';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class SchemaType extends React.Component {
    
    componentDidUpdate(prevProps, prevState) {
        
    }

    render() {

        const table = this.props.data;
        let tableName = null;
        let rightBracket = null;

        if (table.name) {
            tableName = <div> const {`${table.name}Type = new GraphQLObjectType({`}</div>
            rightBracket = `}`;
            };

        let result = [];
        // if (this.attributes === []){ //this should be attribute instead of result
            table.attributes.forEach((x) => {
                result.push(<p>{x.field} <br /> {x.type}</p>)
            });
        // }
        return (
                <div className="schemaType">
                    <div>
                        {tableName}
                        {result}
                        {rightBracket}
                    </div>
                </div>
        )

    }
}

export default SchemaType;