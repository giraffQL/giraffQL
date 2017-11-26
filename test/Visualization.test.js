import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import Table from '../src/components/table/Table';
import Visualization from '../src/components/table/Visualization';

import { shallow } from "enzyme";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Create Table Button creates Table Element', () =>{});

it('Delete Table Deletes all tables', () => {});