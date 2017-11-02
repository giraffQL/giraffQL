import React, { Component } from 'react';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class SchemaType extends React.Component {

    render() {
        const code = this.props.data;
        const attr = code.attributes;
        const field = [];
        const fieldType = {};
        console.log(`attributes: ${attr}`);
        attr.forEach((x) => { 
            fieldType.field = x.field,
            fieldType.type = x.type
            field.push(fieldType);
        })
        console.log(`fieldType: ${fieldType}`);
        // console.log(`table: ${code}`);
        return (
            <Draggable>
                <div className="schemaType">
                    <p>
                        const {code.name} = new GraphQLObjectType<br />
                        {JSON.stringify(field)}
                    </p>
                </div>
            </Draggable>
        )

    }
}

export default SchemaType;