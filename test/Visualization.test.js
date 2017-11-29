import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/main/app/App';
import AppMenu from '../src/components/main/app/AppMenu';
import Table from '../src/components/main/app/table/Table';
import Visualization from '../src/components/main/app/table/Visualization';
// import handleMouseMove from '../src/components/table/Visualization';
import { onAddTable } from '../src/components/main/app/App';
// import { Scrollbars } from 'react-custom-scrollbars';

import { shallow, mount, render } from "enzyme";

const data = { tables: [{ name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] }] };
const dataProps = {
  data: {
    tables: [
      { name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] },
      { name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] },
      { name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] }
    ]
  }
}
const mockState = {state: { open: 'test' }};

const jestMock = jest.fn();
const vis = shallow(<Visualization data={dataProps.data} onAddTable={jestMock} deleteAllTables={jestMock} onAddRow={jestMock} handleMouseMove={jestMock} />);
const visInst = vis.instance();
const app = shallow(<App />);
const bar = shallow(<AppMenu state={mockState} onAddTable={jestMock} deleteAllTables={jestMock} onAddRow={jestMock} />);

describe('Visualization Rendering Properly', () => {

  it('includes Create Table button', () => {
    expect(bar.find('#createTableBtn').length).toEqual(1);
  });

  it('includes Clear Table button', () => {
    expect(bar.find('#clearBtn').length).toEqual(1);
  });

  it('includes a table div', () => {
    expect(vis.find('.tables').length).toEqual(1);
  })
})

describe('Visualization Table Testing', () => {

  it('Vis renders correctly and match Snapshot', () => {
    expect(vis).toMatchSnapshot();
  });

  it('Calls onAddTable when button is clicked', () => {
    bar.find('#createTableBtn').simulate('click');
    expect(jestMock).toBeCalled();
  });

  it('Calls Clear when button is clicked', () => {
    bar.find('#clearBtn').simulate('click');
    expect(jestMock).toBeCalled();
  });

})

describe('Proper CSS Classes are rendered in visualization', () => {

  it('Scrollbars have class name of "toolbar"', () => {
    expect(vis.find('.toolbar').length).toEqual(1);
  });

  it('SVG to have class name of "relations"', () => {
    expect(vis.find('.relations').length).toEqual(1);
  });

  it('Tables div have class name of "tables"', () => {
    expect(vis.find('.tables').length).toEqual(1);
  });
  
  it('Contains class name of "relations"', () => {
    expect(vis.find('.relations').length).toEqual(1);
  });

  it('Contains class name of "visualization"', () => {
    expect(vis.find('.visualization').length).toEqual(1);
  });
  
})


describe('Functionality', () => {

  it('handleMouseMove fires when clicked', () => {
    vis.simulate('mouseMove');
    expect(jestMock).toHaveBeenCalled();
  });

  it('handleMouseDown fires when clicked', () => {
    vis.simulate('mouseDown');
    expect(jestMock).toHaveBeenCalled();
  });

  it('handleMouseUp fires when clicked', () => {
    vis.simulate('mouseup');
    expect(jestMock).toHaveBeenCalled();
  });

})