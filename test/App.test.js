import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/main/app/App';
import { shallow, mount, render } from "enzyme";

const app = shallow(<App />);

describe('App renders properly to div', () => {
  
  it('renders without crashing', () => {
    expect(app.instance).toBeTruthy();
  });
  
})