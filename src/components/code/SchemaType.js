import React, { Component } from 'react';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import RowData from './RowData';
class SchemaType extends React.Component {
    
    componentDidUpdate(prevProps, prevState) {
        
    }

    render() {

        const table = this.props.data;
        
        let tableName = null;
        let rightBracket = null;

        if (table.name) {
            tableName = <div> const {`${table.name}Type = new GraphQLObjectType({`}<br/>name: {table.name}</div>
            rightBracket = `}`;
            };

        return (
            <Draggable>
                <div className="schemaType">
                    <div>
                        {tableName}
                        <RowData data={table}/>
                        {rightBracket}
                    </div>
                </div>
            </Draggable>
        )

    }
}

export default SchemaType;