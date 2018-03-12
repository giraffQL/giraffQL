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

//Jest Mock Function
const jestMock = jest.fn();
//Mock State
const mockState = {state: { open: 'test' }};
const dataProps = {
  data: {
    tables: [
      { name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] },
    ]
  }
}
const tbl = shallow(<Table key= {0} data={dataProps.data} tables={dataProps.data.tables} table={dataProps.data.tables[0]} tableIndex={0} draggable={jestMock} onAddRow={jestMock} updateTableName={jestMock} updateRowProp={jestMock} updateRowType={jestMock} deleteTable={jestMock} onDragTable={jestMock} dataEvent={jestMock} refreshTableRefs={jestMock} onTableMouseUp={jestMock} onRowMouseDown={jestMock}/>);

const vis = shallow(<Visualization data={dataProps.data} onAddTable={jestMock} deleteAllTables={jestMock} onAddRow={jestMock} handleMouseMove={jestMock} />)

const bar = shallow(<AppMenu state={mockState} onAddTable={jestMock} deleteAllTables={jestMock} onAddRow={jestMock} />);

describe('<Table />', () => {

  it('Renders a table', () => {
    expect(tbl.find('table').length).toBe(1);
  })

  it('Renders three rows', () => {
    expect(tbl.find('tr').length).toBe(3);
  })

  it('Renders a delete table button', () => {
    expect(tbl.find('.deletetablebutton').length).toBe(1);
  })

  it('Activates deleteTable function when button is clicked', () => {
    tbl.find('.deletetablebutton').simulate('click');
    expect(jestMock).toBeCalled();
  })


});