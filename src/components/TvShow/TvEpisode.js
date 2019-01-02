import React from 'react';
import { Image, View, StyleSheet, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Text,
  Body,
  Container,
  Content,
  Spinner,
  H3,
  H2,
  H1,
} from 'native-base';
import { toOneDecimal, showAlert } from './../../utils/util';
import { mediumImgPath, largeImgPath } from './../../utils/ImageSizePath';

const styles = StyleSheet.create({
  darkOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  listFlaxStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pt: {
    paddingTop: 5,
  },
});

export default class TvEpisode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tvEpisode: {
        still_path: '',
        name: '',
        vote_average: '',
        air_date: '',
        episode_number: '',
        season_number: '',
        overview: '',
      },
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getTvEpisode();
  }

  getTvEpisode = () => {
    const { id, season, episode } = this.props.navigation.state.params;
    this.setState({ loading: true });
    axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}`, {
      params: {
        api_key: 'e2bb53ebcddecc21c0fa81c0ce41debf',
        language: 'en-US',
      },
    })
      .then((response) => {
        this.setState({
          tvEpisode: response.data,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
        showAlert(() => this.getTvEpisode());
      });
  }

  render() {
    const { tvEpisode } = this.state;
    const { posterPath } = this.props.navigation.state.params;

    if (this.state.loading || this.state.error) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }

    return (
      <ImageBackground
        source={{ uri: mediumImgPath + posterPath }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <Container style={styles.darkOverlay}>
          <Content padder>
            <H1>{tvEpisode.name}</H1>
            <View style={[styles.listFlaxStart, styles.pt]}>
              <Image
                style={{ width: 220, height: 125 }}
                source={{ uri: largeImgPath + tvEpisode.still_path }}
                resizeMode="contain"
              />
              <Body>
                <H2>Rating</H2>
                <H2 style={styles.pt}>{toOneDecimal(tvEpisode.vote_average)}</H2>
                <H3 style={styles.pt}>{tvEpisode.air_date}</H3>
                <H3 style={styles.pt}>
                  S{tvEpisode.season_number},
                  Ep{tvEpisode.episode_number}
                </H3>
              </Body>
            </View>
            <Text style={styles.pt}>{tvEpisode.overview}</Text>
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}

TvEpisode.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
        season: PropTypes.number,
        episode: PropTypes.number,
        posterPath: PropTypes.string,
      }),
    }),
  }).isRequired,
};

