import React from 'react';
import { Image, FlatList, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
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
import { genresToString, toOneDecimal, showAlert } from './../../utils/util';
import { smallImgPath, mediumImgPath, largeImgPath } from './../../utils/ImageSizePath';

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

export default class TvDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tvDetails: {
        backdrop_path: '',
        name: '',
        vote_average: '',
        overview: '',
        poster_path: '',
        genres: [],
        seasons: [],
      },
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getTvDetails();
  }

  getTvDetails = () => {
    const { id } = this.props.navigation.state.params;
    this.setState({ loading: true });
    axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: 'e2bb53ebcddecc21c0fa81c0ce41debf',
        language: 'en-US',
      },
    })
      .then((response) => {
        this.setState({
          tvDetails: response.data,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
        showAlert(() => this.getTvDetails());
      });
  }

  openSeasonView = (season) => {
    const { id } = this.props.navigation.state.params;
    this.props.navigation.navigate('TvSeasons', { id, season });
  }

  renderSesonsList = ({ item }) => (
    <TouchableOpacity onPress={() => this.openSeasonView(item.season_number)}>
      <Text>Season {item.season_number}</Text>
      <Image
        style={{ width: 80, height: 120, marginRight: 20 }}
        source={{ uri: smallImgPath + item.poster_path }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )

  render() {
    const { tvDetails } = this.state;
    const { genres } = this.state.tvDetails;
    if (this.state.loading || this.state.error) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }
    return (
      <ImageBackground
        source={{ uri: largeImgPath + tvDetails.poster_path }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <Container style={styles.darkOverlay}>
          <Content padder>
            <H1 >{tvDetails.name}</H1>
            <View style={[styles.listFlaxStart, styles.pt]}>
              <Image
                style={{ width: 220, height: 125 }}
                source={{ uri: mediumImgPath + tvDetails.backdrop_path }}
                resizeMode="contain"
              />
              <Body>
                <H2>Rating</H2>
                <H2 style={styles.pt}>{toOneDecimal(tvDetails.vote_average)}</H2>
                <H3 style={styles.pt}>{tvDetails.first_air_date}</H3>
                <H3 style={styles.pt}>{tvDetails.episode_run_time} min</H3>
              </Body>
            </View>
            <Text style={styles.pt}>{genresToString(genres)}</Text>
            <Text style={styles.pt}>{tvDetails.overview}</Text>
            <FlatList
              horizontal
              data={tvDetails.seasons.reverse()}
              keyExtractor={item => item.id}
              renderItem={this.renderSesonsList}
            />
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}

TvDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
};
