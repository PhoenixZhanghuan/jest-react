import React from "react";
import { shallow } from "enzyme";
import TodoList from "../../index";

it("TodoList 初始化列表为空", () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state("undoList")).toEqual([]);
});

it("TodoList 应该给Header传递一个增加undoList内容的方法", () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find("Header");
    expect(Header.prop("addUndoItem")).toBeTruthy();
});

it("当addUndoItem被执行的时候，undoList数据项增加", () => {
    const wrapper = shallow(<TodoList />);
    const { addUndoItem } = wrapper.instance();
    const content = '学习React';
    addUndoItem(content);
    expect(wrapper.state("undoList").length).toBe(1);
    expect(wrapper.state('undoList')[0]).toEqual({
        status: 'div',
        value: content
    })
    wrapper.instance().addUndoItem("学习React");
    expect(wrapper.state("undoList").length).toBe(2);
});

it("TodoList组件应该接受list, deleteItem, changeStatus, handleBlur, valueChange参数", () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find("UndoList");
    expect(UndoList.prop("list")).toBeTruthy();
    expect(UndoList.prop("deleteItem")).toBeTruthy();
    expect(UndoList.prop("changeStatus")).toBeTruthy();
    expect(UndoList.prop("handleBlur")).toBeTruthy();
    expect(UndoList.prop("valueChange")).toBeTruthy();
});

it("当deleteItem方法被执行时，undoList应该删除内容", () => {
    const wrapper = shallow(<TodoList />);
    const data = [
        {
            status: 'div',
            value: '学习Jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }
    ]
    wrapper.setState({
        undoList: data
    });
    wrapper.instance().deleteItem(1);
    expect(wrapper.state("undoList")).toEqual([data[0], data[2]]);
});

it("当changeStatus方法被执行时，undoList数据项status", () => {
    const wrapper = shallow(<TodoList />);
    const data = [
        {
            status: 'div',
            value: '学习Jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }
    ]
    wrapper.setState({
        undoList: data
    });
    wrapper.instance().changeStatus(1);
    expect(wrapper.state("undoList")[1]).toEqual({
        ...data[1],
        status: 'input'
    });
});

it("handleBlur方法被调用, undoList数据项status被修改", () => {
    const wrapper = shallow(<TodoList />);
    const data = [{
        status: 'input',
        value: '学习Jest'
    },{
        status: 'div',
        value: '学习TDD'
    },{
        status: 'div',
        value: '学习单元测试'
    }]
    wrapper.setState({undoList: data})
    wrapper.instance().handleBlur(0);
    expect(wrapper.state('undoList')[0]).toEqual({
        ...data[0],
        status: 'div'
    })
});


it("valueChange方法被调用时, undoList数据项value被修改", () => {
    const wrapper = shallow(<TodoList />);
    const data = [{
        status: 'input',
        value: '学习Jest'
    }, {
        status: 'input',
        value: '学习TDD'
    }]
    const value = 'dell lee'
    wrapper.setState({
        undoList: data
    });
    wrapper.instance().valueChange(0, value);
    expect(wrapper.state('undoList')[0]).toEqual({
        ...data[0],
        value
    })
});