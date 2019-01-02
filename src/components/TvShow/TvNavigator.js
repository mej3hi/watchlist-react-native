import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import TvShows from './TvShows';
import TvTapView from './TvTap';

import MenuHeader from './../Header/MenuHeader';
import BackHeader from './../Header/BackHeader';

import TvDetails from './TvDetails';
import TvSeason from './TvSeason';
import TvEpisode from './TvEpisode';

export const TvShowTap = TabNavigator(
  {
    TvTopRated: { screen: props => (<TvShows {...props} type="top_rated" />) },
    TvPopular: { screen: props => (<TvShows {...props} type="popular" />) },
    TvToday: { screen: props => (<TvShows {...props} type="airing_today" />) },
    TvOnAir: { screen: props => (<TvShows {...props} type="on_the_air" />) },
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => (
      <TvTapView {...props} />
    ),
  },
);

export const TvShowStack = StackNavigator(
  {
    TvShowTap: {
      screen: TvShowTap,
      navigationOptions: props => ({
        header: <MenuHeader {...props} />,
      }),
    },
    TvDetails: { screen: TvDetails },
    TvSeasons: { screen: TvSeason },
    TvEpisode: { screen: TvEpisode },
  },
  {
    initialRouteName: 'TvShowTap',
    cardStyle: { backgroundColor: '#303030' },
    navigationOptions: props => ({
      header: <BackHeader {...props} />,
    }),
  },
);

export default TvShowStack;

