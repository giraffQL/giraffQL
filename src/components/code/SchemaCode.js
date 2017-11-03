import React, { Component } from 'react';
import SchemaType from './SchemaType';

class SchemaCode extends React.Component {

    render() {
        const codeBlocks = this.props.code.map((code, i) => {
            return <SchemaType data={code} key={i}/>;
        });
        return (
            <div className="schemaCode">
                {codeBlocks}
            </div>
        )

    }
}

export default SchemaCode;