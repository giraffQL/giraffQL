import React from 'react';
import ReactDOM from 'react-dom';
import ExpressCode from '../src/components/main/app/code/ExpressCode'
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

describe('ExpressCode Rendering properly', () => {

  it('ExpressCode renders', () => {
    const wrapper = shallow(<ExpressCode data={test[0]} />);
    const inst = wrapper.instance();
    expect(inst).toBeTruthy();
  })

  it('ExpressCode should mount', () => {
    expect(mount(<ExpressCode data={dataProps.data} />)
      .find('ExpressCode').length).toBe(1);
  });

  it('ExpressCode should contain ExpressCode', () => {
    const wrapper = mount(<ExpressCode data={dataProps.data} />);
    expect(wrapper.find('ExpressCode').exists()).toBe(true);
  });

  it('onChange should fire', () => {
    const wrapper = mount(<ExpressCode data={dataProps.data} onChange={jestMock} />);
    wrapper.simulate('change')
    expect(jestMock).toBeCalled();
  });

})