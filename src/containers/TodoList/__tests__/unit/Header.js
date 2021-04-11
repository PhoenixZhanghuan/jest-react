import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Header from '../../components/Header'

Enzyme.configure({adapter: new Adapter()});

it('Header 组件包含一个input框', () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  expect(inputElem.length).toBe(1);
});

it('Header 组件input框内容，初始化应该为空', () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  expect(inputElem.prop('value')).toEqual('');
});

it('Header 组件input框内容，当用户输入时，会跟随变化', () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find("[data-test='input']");
  const userInput = '今天要学习Jest'
  inputElem.simulate('change', {
    target: {value: userInput}
  });
  expect(wrapper.state('value')).toEqual(userInput); 
});

it("Header 组件input框输入回车时，如果input无内容，无操作", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn}/>);
  const inputElem = wrapper.find("[data-test='input']");
  wrapper.setState({
    value: ''
  })
  inputElem.simulate('keyUp', {
    keyCode: 13
  });
  expect(fn).not.toHaveBeenCalled();
})

it("Header 组件input框输入回车时，如果input有内容，函数应该被调用", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn}/>);
  const inputElem = wrapper.find("[data-test='input']");
  wrapper.setState({
    value: '学习react'
  })
  inputElem.simulate('keyUp', {
    keyCode: 13
  });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith('学习react')
  expect(inputElem.prop('value')).toBe('')
})

it("Header 组件input框输入回车时，如果input有内容，最后应该被清除掉", () => {
  const fn = jest.fn();
  const wrapper = shallow(<Header addUndoItem={fn}/>);
  const inputElem = wrapper.find("[data-test='input']");
  const userInput = '学习React'
  wrapper.setState({
    value: userInput
  })
  inputElem.simulate('keyUp', {
    keyCode: 13
  });
  const newInputElem = wrapper.find("[data-test='input']");
  expect(newInputElem.prop('value')).toBe('');
})
