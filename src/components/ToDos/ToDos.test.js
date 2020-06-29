import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from "enzyme-adapter-react-16";
import { ToDos } from './ToDos';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});

describe('ToDos component testing', () => {
    afterEach(cleanup);
    let wrapper;
    let todos = [{ id: 1, todo: 'Rishabh Jain - Adding Test', status: true }]

    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDom.render(<ToDos todos={[]} softDelete={jest.fn()} />, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it("should render ToDos correctly, with empty Todos Data", () => {
        wrapper = render(<ToDos todos={[]} softDelete={jest.fn()} />)
        expect(wrapper).toMatchSnapshot();
        const { getByTestId } = wrapper;
        expect(getByTestId('empty-msg'))
            .toHaveTextContent("Start Adding Your Todos...")
    });


    it('should Render ToDos List', () => {
        let softDelete = jest.fn();
        wrapper = mount(<ToDos todos={todos} softDelete={jest.fn()} />);
        let allToDoListELe = wrapper.find('.todo-list');
        expect(allToDoListELe).toHaveLength(todos.length)
        expect(allToDoListELe.hostNodes().render().text())
            .toEqual(todos[0].todo);
    }); 
});