import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from '../src/components/main/app/code/TextEditor'
import { shallow, mount, render } from "enzyme";
import { wrap } from 'module';

//Jest Mock Function
const jestMock = jest.fn();
//Mock State
const dataProps = {
  data: {
    tables: [{ name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] }]
  },
}
const test = [{ x: 1, y: 2, tables: [1, 2, 3] }]

describe('TextEditor Rendering properly', () => {

  it('TextEditor renders', () => {
    const wrapper = shallow(<TextEditor data={test[0]} />);
    const inst = wrapper.instance();
    expect(inst).toBeTruthy();
  })

  it('TextEditor should mount', () => {
    expect(mount(<TextEditor data={dataProps.data} />)
      .find('TextEditor').length).toBe(1);
  });

  it('TextEditor should contain TextEditor', () => {
    const wrapper = mount(<TextEditor data={dataProps.data} />);
    expect(wrapper.find('TextEditor').exists()).toBe(true);
  });

  it('onChange should fire', () => {
    const wrapper = mount(<TextEditor data={dataProps.data} onChange={jestMock} />);
    wrapper.simulate('change')
    expect(jestMock).toBeCalled();
  });

})