import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
} from 'native-base';

const SideBar = props => (
  <Container style={{ backgroundColor: '#303030' }}>
    <Content>
      <View
        style={{
          height: 140,
          width: '100%',
          alignSelf: 'stretch',
          position: 'absolute',
          backgroundColor: '#359039',
        }}
      />
      <Image
        style={{
          height: 60,
          width: 60,
          left: 20,
          position: 'absolute',
          alignSelf: 'flex-start',
          top: 40,
        }}
        source={require('./../../../image/watchlist.png')}
      />
      <Text style={{ position: 'absolute', top: 105, left: 20 }} >Watchlist</Text>
      <List style={{ marginTop: 140 }}>
        <ListItem
          button
          onPress={() => props.navigation.navigate('TvShow')}
        >
          <Image style={{ width: 25, height: 25, marginRight: 20 }} source={require('./../../../image/tv_show_icon.png')} />
          <Text>Tv Show</Text>
        </ListItem>
        <ListItem
          button
          onPress={() => props.navigation.navigate('Movie')}
        >
          <Image style={{ width: 25, height: 25, marginRight: 20 }} source={require('./../../../image/movie_icon.png')} />
          <Text>Movie</Text>
        </ListItem>
      </List>
    </Content>
    <View style={{ marginLeft: 10 }}>
      <Image
        style={{ height: 50, width: 116 }}
        source={require('./../../../image/powered_by_TMDb.png')}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 12 }}>This product uses the TMDb API but is not endorsed or certified by TMDb.</Text>
    </View>
  </Container>
);

export default SideBar;

SideBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
