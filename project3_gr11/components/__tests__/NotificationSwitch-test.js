import React from 'react';
import renderer from 'react-test-renderer';
import { NotificationSwitch } from "../NotificationSwitch";

test('renders correctly', () => {
    const tree = renderer.create(<NotificationSwitch/>).toJSON();
    expect(tree).toMatchSnapshot();
});