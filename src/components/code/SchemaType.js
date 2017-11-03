import React, { Component } from 'react';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class SchemaType extends React.Component {

    render() {
        // code is the data
        const code = this.props.data;
        const attr = code.attributes;
        console.log('code', code);
        // const field = [];
        // const fieldType = {};
        console.log(`attributes: ${attr}`);
        // iterate through code attributes
        // insert into h1 tag
        // render array
        const array = [];
        for (let i = 0; i < attr.length; i++) {
          let line = <h1>field {attr[i].field} type {attr[i].type}</h1>
          array.push(line);
        }
        return (
            <Draggable>
                <div className="schemaType">
                    <p>
                        const {code.name} = new GraphQLObjectType<br />
                        {array}
                    </p>
                </div>
            </Draggable>
        )

    }
}

export default SchemaType;