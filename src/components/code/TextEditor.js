import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../App'

class TextEditor extends React.Component {

    render() {
        let code = ''
        for (let i = 0; i < this.props.data.tables.length; i += 1) {
            const table = this.props.data.tables[i]
            if (table.name) {
                code += `const ${table.name}Type = new GraphQLObjectType({\n`
                    + `                 name: ${table.name},\n`
                    + `                 fields: () => ({\n`
                for (let j = 0; j < table.attributes.length; j += 1) {
                    const attr = table.attributes[j]
                    if (attr.field !== '') {
                        code += `                 ${attr.field}: {\n`
                            + `                             type: ${attr.type}\n`
                            + `                          }`
                    }
                    if (j < table.attributes.length - 1) {
                        code += `,\n`
                    }
                }

                code += `           \n`
                    + `                 })\n`
                    + ` })\n\n`

            }
        }

        return (
            <textarea value={code} cols={70} rows={51} style={{ "font-size": "25px" }}>

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
