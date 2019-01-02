import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import SideBar from './SideBar';

import TvShow from './../TvShow/TvNavigator';
import Movie from './../Movie/MovieNavigator';

const MainDrawer = DrawerNavigator(
  {
    TvShow: { screen: TvShow },
    Movie: { screen: Movie },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);
export default MainDrawer;
