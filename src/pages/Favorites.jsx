import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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

  returnFavorites = () => {
    const { songs } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <MusicCard allMusics={ songs } />
        </div>
      </>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      isLoading
        ? <Loading />
        : this.returnFavorites()
    );
  }
}
