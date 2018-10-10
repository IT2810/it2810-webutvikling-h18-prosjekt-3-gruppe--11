import React from 'react';
import { Checkbox } from '../Checkbox';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Checkbox/>).toJSON();
    expect(tree).toMatchSnapshot();
});