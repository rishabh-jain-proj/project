import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from "enzyme-adapter-react-16";
import { AddToDoList } from './AddToDoList';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});

describe('AddToDoList component testing', () => {
    afterEach(cleanup);
    let wrapper;

    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDom.render(<AddToDoList addText={jest.fn()} />, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it("should render AddToDoList correctly", () => {
        wrapper = render(<AddToDoList addText={jest.fn()} />)
        expect(wrapper).toMatchSnapshot();
    });

    it("should Render Add Button with disabled state", () => {
        wrapper = mount(<AddToDoList addText={jest.fn()} />);
        let button = wrapper.find("#submit")
        expect(button.hostNodes().render().text())
            .toEqual('Add')
        button = wrapper.find(".disabled")
        expect(button).toHaveLength(1)
    }) 
});