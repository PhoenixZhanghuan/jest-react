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

it("当addUndoItem被执行的时候，应该新增内容", () => {
    const wrapper = shallow(<TodoList />);
    wrapper.instance().addUndoItem("学习React");
    expect(wrapper.state("undoList").length).toBe(1);

    wrapper.instance().addUndoItem("学习React");
    expect(wrapper.state("undoList").length).toBe(2);
});

it("TodoList应该给未完成列表传递undoList数据，以及deleteItem方法", () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find("UndoList");
    expect(Header.prop("list")).toBeTruthy();
    expect(Header.prop("deleteItem")).toBeTruthy();
});

it("当deleteItem方法被执行时，undoList应该删除内容", () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
        undoList: ["学习Jest", "dell", "lee"],
    });
    wrapper.instance().deleteItem(1);
    expect(wrapper.state("undoList")).toEqual(["学习Jest", "lee"]);
});
