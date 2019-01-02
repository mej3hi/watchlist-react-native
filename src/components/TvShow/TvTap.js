import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Footer, FooterTab } from 'native-base';

const TvTap = props => (
  <Footer>
    <FooterTab >
      <Button
        vertical
        active={props.navigationState.index === 0}
        onPress={() => props.navigation.navigate('TvTopRated')}
      >
        <Text>Top Rated</Text>
      </Button>
      <Button
        vertical
        active={props.navigationState.index === 1}
        onPress={() => props.navigation.navigate('TvPopular')}
      >
        <Text>Popular</Text>
      </Button>
      <Button
        vertical
        active={props.navigationState.index === 2}
        onPress={() => props.navigation.navigate('TvToday')}
      >
        <Text>Today</Text>
      </Button>
      <Button
        vertical
        active={props.navigationState.index === 3}
        onPress={() => props.navigation.navigate('TvOnAir')}
      >
        <Text>On Air</Text>
      </Button>
    </FooterTab>
  </Footer>
);
export default TvTap;

TvTap.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navigationState: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
};
