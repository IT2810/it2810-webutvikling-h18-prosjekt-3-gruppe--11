import React from 'react';
import { AppHeader } from '../AppHeader';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
   const tree = renderer.create(<AppHeader/>).toJSON();
   expect(tree).toMatchSnapshot();
});