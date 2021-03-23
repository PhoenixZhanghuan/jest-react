import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import App from './App';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const wrapper = mount(<App />);
  expect(wrapper).toMatchSnapshot();
  // const container = wrapper.find('[data-test="container"]');
  // expect(container).toExist();
  // expect(container).toHaveProp('title', 'dell lee');
});
