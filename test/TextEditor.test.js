import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import TextEditor from '../src/components/code/TextEditor'
import Editor from 'draft-js'


import { shallow, mount, render } from "enzyme";

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

it('TextEditor should mount in a full DOM', () => {
  expect(mount(<TextEditor data={dataProps.data} onRef={() => console.log('hello')}/>)
  .find('TextEditor').length).toBe(1);
});

it('TextEditor should contain TextEditor', () => {
  const wrapper = mount(<TextEditor data={dataProps.data} onRef={() => console.log('hello')}/>);
  expect(wrapper.find('TextEditor').exists()).toBe(true);
});

