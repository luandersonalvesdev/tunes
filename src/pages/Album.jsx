import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import '../css/Album.css';

export default class Album extends React.Component {
  state = {
    artistName: '',
    collectionName: '',
    allMusics: [],
  };

  componentDidMount() {
    this.fFetchToAlbum();
  }

  fFetchToAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState(() => ({
      artistName: data[0].artistName,
      allMusics: data,
      collectionName: data[0].collectionName,
      artworkUrl100: data[0].artworkUrl100,
    }));
  };

  render() {
    const { artistName, allMusics, collectionName, artworkUrl100 } = this.state;
    return (
      <>
        <Header />
        <div className="container-album" data-testid="page-album">
          <div className="container-album-cover">
            <img src={ artworkUrl100 } alt="" />
          </div>
          <div className="container-songs">
            <img id="main-img" src={ artworkUrl100 } alt="" />
            <h2 data-testid="artist-name">{artistName}</h2>
            <h3 data-testid="album-name">{collectionName}</h3>
            <ul>
              <MusicCard allMusics={ allMusics } />
            </ul>
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
