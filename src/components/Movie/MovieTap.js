import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Footer, FooterTab } from 'native-base';

const MovieFooter = props => (
  <Footer >
    <FooterTab >
      <Button
        vertical
        active={props.navigationState.index === 0}
        onPress={() => props.navigation.navigate('MovieTopRated')}
      >
        <Text>Top Rated</Text>
      </Button>
      <Button
        vertical
        active={props.navigationState.index === 1}
        onPress={() => props.navigation.navigate('MoviePopular')}
      >
        <Text>Popular</Text>
      </Button>
      <Button
        vertical
        active={props.navigationState.index === 2}
        onPress={() => props.navigation.navigate('MovieNowPlaying')}
      >
        <Text>Now Playing</Text>
      </Button>
      <Button
        vertical
        active={props.navigationState.index === 3}
        onPress={() => props.navigation.navigate('MovieUpcoming')}
      >
        <Text>Upcoming</Text>
      </Button>
    </FooterTab>
  </Footer>
);
export default MovieFooter;

MovieFooter.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navigationState: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
};
