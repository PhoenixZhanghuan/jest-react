import React from "react";
import {Provider} from 'react-redux';
import TodoList from "../../index";
import { mount } from "enzyme";
import { findTestWrapper } from "../../../../utils/testUtils";
import store from '../../../../store/createStore';

beforeEach(() => {
    jest.useFakeTimers();
})

it(`
    1. Header 输入框输入内容
    2. 点击回车
    3. 列表中展示用户输入的内容项
`, () => {
    const wrapper = mount(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );
    const inputElem = findTestWrapper(wrapper, 'header-input');
    const content = 'Dell Lee';
    inputElem.simulate('change', {
        target: {value: content}
    });
    inputElem.simulate('keyUp', {
        keyCode: 13
    });
    const listItem = findTestWrapper(wrapper, 'list-item');
    expect(listItem.length).toEqual(1);
    expect(listItem.text()).toContain(content);
});

it(`
    1. 用户打开页面
    2. 应该展示接口返回的数据
`, (done) => {
    const wrapper = mount(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );

    // process.nextTick(() => {
    //     wrapper.update();
    //     const listItem = findTestWrapper(wrapper, 'list-item');
    //     expect(listItem.length).toBe(1);
    //     done();
    // })

    // setTimeout(() => {
    //     wrapper.update();
    //     const listItem = findTestWrapper(wrapper, 'list-item');
    //     expect(listItem.length).toBe(1);
    //     done();
    // }, 4500)

    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    process.nextTick(() => {
        wrapper.update();
        const listItem = findTestWrapper(wrapper, 'list-item');
        expect(listItem.length).toBe(1);
        done();
    })
    
});
