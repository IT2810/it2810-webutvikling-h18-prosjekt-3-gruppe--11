import React from 'react';
import renderer from 'react-test-renderer';
import { TheList } from "../TheList";

test('renders correctly', () => {
    const tree = renderer.create(<TheList/>).toJSON();
    expect(tree).toMatchSnapshot();
});
