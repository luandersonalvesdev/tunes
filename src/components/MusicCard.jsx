import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends React.Component {
  state = {
    isLoading: false,
    songs: [],
  };

  // async componentDidMount() {
  //   this.setState(() => ({ isLoading: true }));
  //   const favoriteStorage = await getFavoriteSongs();
  //   this.setState(() => ({ favoriteSongs: [...favoriteStorage], isLoading: false }));
  // }

  // fHandleChange = async ({ target: { name } }) => {
  //   const { favoriteSongs } = this.state;
  //   const copyFavoriteSongs = [...favoriteSongs];
  //   const music = await getMusics(name);
  //   const verifySong = favoriteSongs.filter((m) => m.trackId === music[0].trackId);
  //   if (verifySong.length) {
  //     const findInd = favoriteSongs.findIndex((s) => s.trackId === music[0].trackId);
  //     copyFavoriteSongs.splice(findInd, 1);
  //     console.log(copyFavoriteSongs);
  //     this.setState(() => ({ favoriteSongs: [...copyFavoriteSongs], isLoading: true }));
  //     localStorage.setItem('favorite_songs', JSON.stringify(copyFavoriteSongs));
  //   } else {
  //     this.setState((prev) => ({
  //       favoriteSongs: [...prev.favoriteSongs, music[0]],
  //       isLoading: true,
  //     }));
  //     await addSong(music[0]);
  //   }
  //   this.setState(() => ({ isLoading: false }));
  // };

  fHandleChange = async (music) => {
    this.setState((prev) => ({ isLoading: true, songs: [...prev.songs, music] }));
    await addSong(music);
    this.setState(() => ({ isLoading: false }));
  };

  render() {
    const { allMusics } = this.props;
    const { isLoading, songs } = this.state;
    return (
      isLoading
        ? <span>Carregando...</span>
        : allMusics.filter((music) => music.trackId)
          .map((music) => {
            const isChecked = songs.some((m) => music.trackId === m.trackId);
            return (
              <li key={ music.trackId }>
                <span>{music.trackName}</span>
                <label data-testid={ `checkbox-music-${music.trackId}` }>
                  <input
                    type="checkbox"
                    name={ music.trackId }
                    onChange={ () => { this.fHandleChange(music); } }
                    checked={ isChecked }
                  />
                  Favorita
                </label>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
              </li>
            );
          })

    );
  }
}

MusicCard.propTypes = {
  allMusics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
