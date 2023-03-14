import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
  state = {
    isLoading: false,
    songs: [],
  };

  async componentDidMount() {
    this.setState(() => ({ isLoading: true }));
    const songsStorage = await getFavoriteSongs();
    this.setState(() => ({ songs: [...songsStorage], isLoading: false }));
  }

  fHandleChange = async (music) => {
    this.setState(() => ({ isLoading: true }));
    const { songs } = this.state;
    const isChecked = songs.some((m) => m.trackId === music.trackId);
    if (isChecked) {
      await removeSong(music);
    } else {
      this.setState((prev) => ({ songs: [...prev.songs, music] }));
      await addSong(music);
    }
    const songsStorage = await getFavoriteSongs();
    this.setState(() => ({
      isLoading: false,
      songs: [...songsStorage],
    }));
  };

  render() {
    const { allMusics } = this.props;
    const { isLoading, songs } = this.state;
    return (
      isLoading
        ? <Loading />
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
