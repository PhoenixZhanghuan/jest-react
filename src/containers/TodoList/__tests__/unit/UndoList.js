import React from "react";
import { shallow } from "enzyme";
import UndoList from "../../components/UndoList";
import { findTestWrapper } from "../../../../utils/testUtils";

// it('Header 渲染样式正常', () => {
//   const wrapper = shallow(<Header />);
//   expect(wrapper).toMatchSnapshot();
// });

it("未完成列表当数据为空数组时 count数目为0, 列表无内容", () => {
    const wrapper = shallow(<UndoList list={[]} />);
    const countElem = findTestWrapper(wrapper, "count");
    const listItems = findTestWrapper(wrapper, "list-item");
    expect(countElem.text()).toEqual("0");
    expect(listItems.length).toEqual(0);
});

it("未完成列表当数据有内容时 count数目显示数据长度, 列表不为空", () => {
    const listData = ['学习Jest', '学习TDD', '学习单元测试'];
    const wrapper = shallow(<UndoList list={listData} />);
    const countElem = findTestWrapper(wrapper, "count");
    const listItems = findTestWrapper(wrapper, "list-item");
    expect(countElem.text()).toEqual("3");
    expect(listItems.length).toEqual(3);
});

it("未完成列表当数据有内容时 要存在删除按钮", () => {
    const listData = ['学习Jest', '学习TDD', '学习单元测试'];
    const wrapper = shallow(<UndoList list={listData} />);
    const deleteItems = findTestWrapper(wrapper, "delete-item");
    expect(deleteItems.length).toEqual(3);
});

it("未完成列表当数据有内容时 点击某个删除按钮, 会调用删除方法", () => {
    const listData = ['学习Jest', '学习TDD', '学习单元测试'];
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn}/>);
    const deleteItems = findTestWrapper(wrapper, "delete-item");
    deleteItems.at(index).simulate("click");
    expect(fn).toHaveBeenLastCalledWith(index)
});
