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
  Card,
  CardItem,
} from 'native-base';
import { shortenStr, toOneDecimal, showAlert } from './../../utils/util';
import { smallImgPath, largeImgPath } from './../../utils/ImageSizePath';

const styles = StyleSheet.create({
  darkOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pl: {
    paddingLeft: 12,
  },
  cardTransp: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});

export default class TvShows extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      totalPages: 0,
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getTvShows();
  }

  getTvShows = (page = 1) => {
    const { type } = this.props;
    this.setState({ loading: true });
    axios.get(`https://api.themoviedb.org/3/tv/${type}`, {
      params: {
        api_key: 'e2bb53ebcddecc21c0fa81c0ce41debf',
        language: 'en-US',
        page,
      },
    })
      .then((response) => {
        this.setState({
          page: response.data.page,
          totalPages: response.data.total_pages,
          data: [...this.state.data, ...response.data.results],
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
        showAlert(() => this.getTvShows());
      });
  }

  loadMoreData = () => {
    if (!this.state.loading && (this.state.page <= this.state.totalPages)) {
      this.getTvShows(this.state.page + 1);
    }
  }

  openDetailsView = (id) => {
    this.props.navigation.navigate('TvDetails', { id });
  }

  renderFooter = () => {
    if (this.state.page === this.state.totalPages) return null;
    return (
      <Spinner />
    );
  }

  renderList = ({ item }) => (
    <Card transparent style={styles.cardTransp}>
      <CardItem button onPress={() => this.openDetailsView(item.id)} style={styles.darkOverlay}>
        <Image
          style={{ width: 80, height: 120 }}
          source={{ uri: smallImgPath + item.poster_path }}
          resizeMode="contain"
        />
        <Body>
          <H3 style={styles.pl}>{item.name}</H3>
          <Text style={styles.pl}>Rating: {toOneDecimal(item.vote_average)}</Text>
          <Text style={styles.pl}>{shortenStr(item.overview, 100)}</Text>
        </Body>
      </CardItem>
    </Card>
  );

  render() {
    const {
      data,
      page,
      loading,
      error,
    } = this.state;


    if (page === 0 && (loading || error)) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }

    return (
      <ImageBackground
        source={{ uri: largeImgPath + data[0].poster_path }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <Container style={styles.darkOverlay}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
            onEndReached={this.loadMoreData}
            initialNumToRender={10}
            ListFooterComponent={this.renderFooter(loading)}
            renderItem={this.renderList}
          />
        </Container>
      </ImageBackground>
    );
  }
}

TvShows.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
