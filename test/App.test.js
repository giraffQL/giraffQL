import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import SchemaCode from '../src/components/code/SchemaCode';
import SchemaType from '../src/components/code/SchemaType';
import RowData from '../src/components/code/RowData';
import Table from '../src/components/table/Table';
import Visualization from '../src/components/table/Visualization';

import { shallow } from "enzyme";

const dataProps = {
  data: {
    tables: [{name: 'testName', attributes: [{field: 'testField', type: 'testType', x: 0, y: 0}, {field: 'testField2', type: 'testType2', x: 0, y: 0} ]}]
  },
}

const test = [{x:1, y:2, attr: [1,2,3]}]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('SchemaCode renders', () => {
  const wrapper = shallow(<SchemaCode code={dataProps.data.tables} />)
  const inst = wrapper.instance();
  expect(inst).toBeTruthy();
})

it('SchemaType renders', () => {
  const wrapper = shallow(<SchemaType data={dataProps.data.tables}/>)
  const inst = wrapper.instance();
  expect(inst).toBeTruthy();
})
//Not working yet....
it('RowData renders', () => {
  const wrapper = shallow(<RowData data={[test]}/>)
  const inst = wrapper.instance();
  expect(inst).toBeTruthy();
})