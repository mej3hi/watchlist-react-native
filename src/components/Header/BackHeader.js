import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Body,
  Left,
  Right,
  Icon,
  Title,
  Header,
} from 'native-base';


const HeaderBack = props => (
  <Header style={{ paddingTop: 45, paddingBottom: 25 }}>
    <Left>
      <Button
        transparent
        onPress={() => props.navigation.goBack()}
      >
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title>Watchlist</Title>
    </Body>
    <Right />
  </Header>
);
export default HeaderBack;

HeaderBack.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
