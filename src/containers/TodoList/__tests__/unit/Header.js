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
  // const newInputElem = wrapper.find("[data-test='input']");
  // expect(newInputElem.prop('value')).toBe(userInput);
});
