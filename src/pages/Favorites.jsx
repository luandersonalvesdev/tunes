import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../css/Favorites.css';

export default class Favorites extends React.Component {
  state = {
    isLoading: false,
    songs: [],
  };

  async componentDidMount() {
    this.setState(() => ({ isLoading: true }));
    const songs = await getFavoriteSongs();
    this.setState(() => ({ songs: [...songs], isLoading: false }));
  }

  async componentDidUpdate() {
    const songs = await getFavoriteSongs();
    this.setState(() => ({ songs: [...songs] }));
  }

  render() {
    const { isLoading, songs } = this.state;
    return (
      isLoading
        ? <Loading />
        : (
          <>
            <Header />
            <span className="songs-fav">Músicas favoritas</span>
            <div
              data-testid="page-favorites"
              className="container-favorites"
            >
              <MusicCard allMusics={ songs } />
            </div>
          </>
        )
    );
  }
}
