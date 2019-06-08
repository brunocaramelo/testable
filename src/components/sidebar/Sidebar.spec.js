import React from 'react';
import { shallow, mount } from 'enzyme';
import Sidebar from './Sidebar';
import { auth } from '../../pages/login/Auth';

describe('sidebar component', () => {

  test('should be hidden by default', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.find('.z-50').hasClass('hidden')).toBeTruthy();
  });

  test('display sidebar on toggle', () => {
    const wrapper = shallow(<Sidebar />);

    wrapper.instance().onSidebar();

    expect(wrapper.find('.z-50').hasClass('hidden')).toBeFalsy();
  });

  test('display overlay on sidebar toggle', () => {
    const wrapper = shallow(<Sidebar />);

    wrapper.instance().onSidebar();

    expect(wrapper.find('.bg-testable-overlay').exists()).toBeTruthy();
  });

  test('display header', () => {
    auth.isAuthenticated = true;
    const wrapper = mount(<Sidebar />);

    wrapper.instance().onSidebar();

    expect(wrapper.find('Header').exists()).toBeTruthy();
  });
});