import React from 'react';
import Table from '../src/components/main/app/table/Table';
import { shallow, mount, render } from "enzyme";
import { wrap } from 'module';

//Jest Mock Function
const jestMock = jest.fn();
// Mock State
const test = [{ x: 1, y: 2, tables: [1, 2, 3] }]
const mockData = { name: [1, 2, 3], table: { name: [1, 2, 3] } }
const dataProps = {
    tables: [
        { name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] },
        { name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] },
        { name: 'testName', attributes: [{ field: 'testField', type: 'testType', x: 0, y: 0 }, { field: 'testField2', type: 'testType2', x: 0, y: 0 }] }
    ]
}

const mockTable = {name: [1]}

// const table = shallow(<Table data={dataProps} className = {mockTable}/>);

describe('Table Rendering properly', () => {

    it('Table renders without exploding', () => {

    })

    it('Table contains an Add Row Button', () => {

    })

    it('Table contains an Delete Row Button', () => {

    })
})