import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/Search.css';

const INPUT_LENGTH = 2;

const linkStyle = {
  textDecoration: 'none',
  fontWeight: '600',
};

export default class Search extends React.Component {
  state = {
    inputValue: '',
    search: false,
    artist: '',
  };

  fHandleChange = ({ target }) => {
    const { value } = target;
    this.setState(() => ({ inputValue: value }));
  };

  fSearch = async (inpValue) => {
    const { inputValue } = this.state;
    this.setState(() => ({ isLoading: true, artist: inputValue }));
    const data = await searchAlbumsAPI(inpValue);
    this.setState(() => ({
      isLoading: false,
      searchAlbums: data,
      search: true,
    }));
  };

  render() {
    const { isLoading, searchAlbums, search, inputValue, artist } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search" id="div-main-search">
          {
            isLoading
              ? <Loading />
              : (
                <form onSubmit={ (e) => { e.preventDefault(); } }>
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    value={ inputValue }
                    onChange={ this.fHandleChange }
                    placeholder="Digite o nome do artista."
                  />
                  <button
                    data-testid="search-artist-button"
                    disabled={ inputValue.length < INPUT_LENGTH }
                    onClick={ () => { this.fSearch(inputValue); } }
                  >
                    Pesquisar
                  </button>
                </form>
              )
          }
          {
            search
              && (!searchAlbums.length
                ? <span id="span-notFound">Nenhum álbum foi encontrado</span>
                : (
                  <>
                    <span id="span-found">
                      Resultado de álbuns de
                      <span id="span-artist">{artist}</span>
                    </span>
                    <section id="section-allAlbums">
                      {
                        searchAlbums.map((album) => (
                          <Link
                            data-testid={ `link-to-album-${album.collectionId}` }
                            to={ `/album/${album.collectionId}` }
                            key={ album.collectionId }
                            style={ linkStyle }
                          >
                            <div id="album">
                              <div id="album-header">
                                <img src={ album.artworkUrl100 } alt="" />
                              </div>
                              <img id="main-img" src={ album.artworkUrl100 } alt="" />
                              <p>{album.artistName}</p>
                              <p>{album.collectionName}</p>
                            </div>
                          </Link>
                        ))
                      }
                    </section>
                  </>
                )
              )
          }

        </div>
      </>
    );
  }
}
