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


const HeaderMenu = props => (
  <Header style={{ paddingTop: 45, paddingBottom: 25 }}>
    <Left>
      <Button
        transparent
        onPress={() => props.navigation.navigate('DrawerOpen')}
      >
        <Icon name="menu" />
      </Button>
    </Left>
    <Body>
      <Title>Watchlist</Title>
    </Body>
    <Right />
  </Header>
);
export default HeaderMenu;

HeaderMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
