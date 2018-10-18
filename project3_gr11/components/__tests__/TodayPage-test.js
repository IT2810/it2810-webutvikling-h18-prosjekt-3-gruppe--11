import React from 'react';
import renderer from 'react-test-renderer';
import TodayPage from "../TodayPage";

test('renders correctly', () => {
    const tree = renderer.create(<TodayPage/>).toJSON();
    expect(tree).toMatchSnapshot();
});
