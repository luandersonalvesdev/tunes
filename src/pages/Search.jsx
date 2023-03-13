import React from 'react';
// import FormSearch from '../components/FormSearch';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const INPUT_LENGTH = 2;

export default class Search extends React.Component {
  state = {
    inputValue: '',
    search: false,
    artist: '',
  };

  fReturnContainerAlbums = (searchAlbums) => {
    const { artist } = this.state;
    return (
      <>
        <span>
          Resultado de álbuns de:
          {` ${artist}`}
        </span>
        <section>
          {
            searchAlbums.map((album) => (
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
                key={ album.collectionId }
              >
                <p>{album.artistName}</p>
                <p>{album.collectionName}</p>
                <p>{album.trackCount}</p>
              </Link>
            ))
          }
        </section>
      </>
    );
  };

  fReturnForm = () => {
    const { inputValue } = this.state;
    return (
      <form onSubmit={ (e) => { e.preventDefault(); } }>
        <input
          data-testid="search-artist-input"
          type="text"
          value={ inputValue }
          onChange={ this.fHandleChange }
        />
        <button
          data-testid="search-artist-button"
          disabled={ inputValue.length < INPUT_LENGTH }
          onClick={ () => { this.fSearch(inputValue); } }
        >
          Pesquisar
        </button>
      </form>);
  };

  fHandleChange = ({ target }) => {
    const { value } = target;
    this.setState(() => ({ inputValue: value }));
  };

  fSearch = async (inpValue) => {
    const { inputValue } = this.state;
    this.setState(() => ({ inputValue: '', isLoading: true, artist: inputValue }));
    const data = await searchAlbumsAPI(inpValue);
    this.setState(() => ({
      isLoading: false,
      searchAlbums: data,
      search: true,
    }));
  };

  render() {
    const { isLoading, searchAlbums, search } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {
            isLoading
              ? <Loading />
              : this.fReturnForm()
          }
          {
            search
              && (!searchAlbums.length
                ? <span>Nenhum álbum foi encontrado</span>
                : this.fReturnContainerAlbums(searchAlbums)
              )
          }

        </div>
      </>
    );
  }
}
