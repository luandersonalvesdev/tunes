import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { allMusics } = this.props;
    return (
      allMusics.filter((music) => music.trackId)
        .map(({ previewUrl, trackId, trackName }) => (
          <li key={ trackId }>
            <span>{trackName}</span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </li>
        ))
    );
  }
}

MusicCard.propTypes = {
  allMusics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
