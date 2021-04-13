import React from "react";
import { shallow } from "enzyme";
import UndoList from "../../components/UndoList";
import { findTestWrapper } from "../../../../utils/testUtils";
import TodoList from "../..";

it('Header 渲染样式正常', () => {
  const wrapper = shallow(<UndoList list={[]}/>);
  expect(wrapper).toMatchSnapshot();
});

it("未完成列表当数据为空数组时 count数目为0, 列表无内容", () => {  
    const wrapper = shallow(<UndoList list={[]} />);
    const countElem = findTestWrapper(wrapper, "count");
    const listItems = findTestWrapper(wrapper, "list-item");
    expect(countElem.text()).toEqual("0");
    expect(listItems.length).toEqual(0);
});

it("未完成列表当数据有内容时 count数目显示数据长度, 列表不为空", () => {
    // const listData = ['学习Jest', '学习TDD', '学习单元测试'];
    const listData = [{
        status: 'div',
        value: '学习Jest'
    },{
        status: 'div',
        value: '学习TDD'
    },{
        status: 'div',
        value: '学习单元测试'
    }]
    const wrapper = shallow(<UndoList list={listData} />);
    const countElem = findTestWrapper(wrapper, "count");
    const listItems = findTestWrapper(wrapper, "list-item");
    expect(countElem.text()).toEqual("3");
    expect(listItems.length).toEqual(3);
});

it("未完成列表当数据有内容时 要存在删除按钮", () => {
    const listData = [{
        status: 'div',
        value: '学习Jest'
    },{
        status: 'div',
        value: '学习TDD'
    },{
        status: 'div',
        value: '学习单元测试'
    }]
    const wrapper = shallow(<UndoList list={listData} />);
    const deleteItems = findTestWrapper(wrapper, "delete-item");
    expect(deleteItems.length).toEqual(3);
});

it("未完成列表当数据有内容时 点击某个删除按钮, 会调用删除方法", () => {
    const listData = [{
        status: 'div',
        value: '学习Jest'
    },{
        status: 'div',
        value: '学习TDD'
    },{
        status: 'div',
        value: '学习单元测试'
    }]
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn}/>);
    const deleteItems = findTestWrapper(wrapper, "delete-item");
    deleteItems.at(index).simulate("click");
    expect(fn).toHaveBeenLastCalledWith(index)
});

it("当某一项被点击时, 触发执行changeStatus函数", () => {
    const listData = [{
        status: 'div',
        value: '学习Jest'
    },{
        status: 'div',
        value: '学习TDD'
    },{
        status: 'div',
        value: '学习单元测试'
    }]
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<UndoList list={listData} changeStatus={fn}/>);
    const deleteItems = findTestWrapper(wrapper, "list-item");
    deleteItems.at(index).simulate("click");
    expect(fn).toHaveBeenLastCalledWith(index)
});


it("当某一项状态是status是input时，展示输入框", () => {
    const listData = [{
        status: 'input',
        value: '学习Jest'
    },{
        status: 'div',
        value: '学习TDD'
    },{
        status: 'div',
        value: '学习单元测试'
    }]

    const wrapper = shallow(<UndoList list={listData} />);
    const inputItems = findTestWrapper(wrapper, "input");
    expect(inputItems.length).toBe(1);
});

it("当某一个输入框失去焦点时, 触发执行handleBlur函数", () => {
    const listData = [{
        status: 'input',
        value: '学习Jest'
    },{
        status: 'div',
        value: '学习TDD'
    },{
        status: 'div',
        value: '学习单元测试'
    }]
    const fn = jest.fn();
    const wrapper = shallow(<UndoList list={listData} handleBlur={fn}/>);
    const inputElem = findTestWrapper(wrapper, "input");
    inputElem.simulate('blur');
    expect(fn).toHaveBeenLastCalledWith(0)
});

it("当某一个输入框变更时, 触发执行valueChange函数", () => {
    const listData = [{
        status: 'input',
        value: '学习Jest'
    }]
    const value = '学习TDD';
    const fn = jest.fn();
    const wrapper = shallow(<UndoList list={listData} valueChange={fn}/>);
    const inputElem = findTestWrapper(wrapper, "input");
    inputElem.simulate('change', {
        target: {value}
    });
    expect(fn).toHaveBeenLastCalledWith(0, value)
});


it("valueChange方法被调用时, undoList数据项value被修改", () => {
    const wrapper = shallow(<TodoList />);
    const data = [{
        status: 'input',
        value: '学习Jest'
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