import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'

class TextEditor extends React.Component {

    render() {
        let code = ''
        for (let i = 0; i < this.props.data.tables.length; i+=1) {
            const table = this.props.data.tables[i]
            for(let j=0; j<table.attributes.length; j+=1){
                const attr = table.attributes[j]
                code += `const ${table.name}Type = new GraphQLObjectType({\n`
                        + `    name: ${table.name},\n`
                         + `    fields: () => ({\n`
                            + `         ${attr.field}: {\n`
                                + `                 type: ${attr.type}\n`
                                + `               }\n`
                                + `     })\n`
                        + `})\n\n`
                
            }
        }
    
        return (
            <textarea value={code} cols={100} rows={30}>
              
            </textarea>
        )

    }
}

export default TextEditor;

// fields: () => ({
//     itemId: {
//       type: (GraphQLInt),
//       description: 'The id of the todo.',
//     },
//     item: {
//       type: GraphQLString,
//       description: 'The name of the todo.',
//     },
//     completed: {
//       type: GraphQLBoolean,
//       description: 'Completed todo? '
//     }
//   })
