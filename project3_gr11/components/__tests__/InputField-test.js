import React from 'react';
import renderer from 'react-test-renderer';
import InputField from '../InputField';

test('renders correctly', () => {
    const tree = renderer.create(<InputField/>).toJSON();
    expect(tree).toMatchSnapshot();
});