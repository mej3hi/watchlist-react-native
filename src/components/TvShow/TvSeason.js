import React from 'react';
import { Image, FlatList, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Text,
  Container,
  Body,
  Spinner,
  H3,
  H1,
  Card,
  CardItem,
} from 'native-base';
import { toOneDecimal, showAlert } from './../../utils/util';
import { mediumImgPath, largeImgPath } from './../../utils/ImageSizePath';

const styles = StyleSheet.create({
  darkOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pl: {
    paddingLeft: 12,
  },
  pt: {
    paddingTop: 5,
  },
  cardTransp: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});

export default class TvSeason extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: {
        episodes: [],
        name: '',
        poster_path: '',
      },
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getTvSeasons();
  }

  getTvSeasons = () => {
    const { id, season } = this.props.navigation.state.params;
    this.setState({ loading: true });
    axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}`, {
      params: {
        api_key: 'e2bb53ebcddecc21c0fa81c0ce41debf',
        language: 'en-US',
      },
    })
      .then((response) => {
        this.setState({
          seasons: response.data,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
        showAlert(() => this.getTvSeasons(id, season));
      });
  }

  openEpDetailsView = (episode) => {
    const { id, season } = this.props.navigation.state.params;
    const posterPath = this.state.seasons.poster_path;
    this.props.navigation.navigate('TvEpisode', {
      id, season, episode, posterPath,
    });
  }


  renderList = ({ item }) => (
    <Card transparent style={styles.cardTransp}>
      <CardItem button onPress={() => this.openEpDetailsView(item.episode_number)} style={styles.darkOverlay}>
        <Image
          style={{ width: 160, height: 90 }}
          source={{ uri: mediumImgPath + item.still_path }}
          resizeMode="contain"
        />
        <Body>
          <H3 style={styles.pl}>{item.name}</H3>
          <Text style={styles.pl}>Rating: {toOneDecimal(item.vote_average)}</Text>
          <Text style={styles.pl}>{item.air_date}</Text>
          <Text style={styles.pl}>S{item.season_number}, Ep{item.episode_number}</Text>
        </Body>
      </CardItem>
    </Card>
  );

  render() {
    const { seasons } = this.state;
    if (this.state.loading || this.state.error) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }
    return (
      <ImageBackground
        source={{ uri: largeImgPath + seasons.poster_path }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <Container style={styles.darkOverlay}>
          <H1 style={[styles.pl, styles.pt]}>{seasons.name}</H1>
          <FlatList
            data={seasons.episodes}
            keyExtractor={item => item.id}
            renderItem={this.renderList}
          />
        </Container>
      </ImageBackground>
    );
  }
}

TvSeason.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
        season: PropTypes.number,
      }),
    }),
  }).isRequired,
};
