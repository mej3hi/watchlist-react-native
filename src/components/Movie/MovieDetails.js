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
import { genresToString, toOneDecimal, showAlert } from './../../utils/util';
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

export default class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        backdrop_path: '',
        title: '',
        vote_average: '',
        overview: '',
        poster_path: '',
      },
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    const { id } = this.props.navigation.state.params;
    this.setState({ loading: true });
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: 'e2bb53ebcddecc21c0fa81c0ce41debf',
        language: 'en-US',
      },
    })
      .then((response) => {
        this.setState({
          details: response.data,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
        showAlert(() => this.getDetails());
      });
  }

  render() {
    const { details } = this.state;
    if (this.state.loading || this.state.error) {
      return (
        <Container >
          <Spinner />
        </Container>
      );
    }
    const { genres } = this.state.details;
    return (
      <ImageBackground
        source={{ uri: largeImgPath + details.poster_path }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <Container style={styles.darkOverlay}>
          <Content padder>
            <H1 >{details.title}</H1>
            <View style={[styles.listFlaxStart, styles.pt]}>
              <Image
                style={{ width: 220, height: 125 }}
                source={{ uri: mediumImgPath + details.backdrop_path }}
                resizeMode="contain"
              />
              <Body>
                <H2>Rating</H2>
                <H2 style={styles.pt}>{toOneDecimal(details.vote_average)}</H2>
                <H3 style={styles.pt}>{details.release_date}</H3>
                <H3 style={styles.pt}>{details.runtime} min</H3>
              </Body>
            </View>
            <Text style={styles.pt}>{genresToString(genres)}</Text>
            <Text style={styles.pt}>{details.overview}</Text>
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}

MovieDetails.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
};

