import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Movies from './Movies';
import MovieTabView from './MovieTap';

import MenuHeader from './../Header/MenuHeader';
import BackHeader from './../Header/BackHeader';

import MovieDetails from './MovieDetails';

export const MovieTap = TabNavigator(
  {
    MovieTopRated: { screen: props => (<Movies {...props} type="top_rated" />) },
    MoviePopular: { screen: props => (<Movies {...props} type="popular" />) },
    MovieNowPlaying: { screen: props => (<Movies {...props} type="now_playing" />) },
    MovieUpcoming: { screen: props => (<Movies {...props} type="upcoming" />) },
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => (
      <MovieTabView {...props} />
    ),
  },
);

export const MovieStack = StackNavigator(
  {
    MovieTap: {
      screen: MovieTap,
      navigationOptions: props => ({
        header: <MenuHeader {...props} />,
      }),
    },
    MovieDetails: { screen: MovieDetails },
  },
  {
    initialRouteName: 'MovieTap',
    cardStyle: { backgroundColor: '#303030' },
    navigationOptions: props => ({
      header: <BackHeader {...props} />,
    }),
  },
);

export default MovieStack;

