import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import TextEditor from '../src/components/code/TextEditor'

import { shallow } from "enzyme";

const dataProps = {
  data: {
    tables: [{name: 'testName', attributes: [{field: 'testField', type: 'testType', x: 0, y: 0}, {field: 'testField2', type: 'testType2', x: 0, y: 0} ]}]
  },
}

const test = [{x:1, y:2, tables: [1,2,3]}]

it('TextEditor renders', () => {
  const wrapper = shallow(<TextEditor data={test[0]} onRef={() => console.log('hello')} />);
  const inst = wrapper.instance();
  expect(inst).toBeTruthy();
})

it('Table fields render in Text Editor', () => {});
