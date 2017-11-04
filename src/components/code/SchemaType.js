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
        let fieldsLine = null;

        if (table.name) {
            tableName = <div> const {`${table.name}Type = new GraphQLObjectType({`}<br /> <span className="tabspace">name: {table.name},</span></div>
            fieldsLine = `fields: () => ({`
            rightBracket = `})`;
        };

        return (
            <div className="schemaType">
                <div>
                    {tableName}
                    <span className="tabspace"/>{fieldsLine}
                    <span className="tabspace"/><span className="tabspace"/><RowData data={table} />
                    {rightBracket}
                </div>
            </div>
        )

    }
}

export default SchemaType;