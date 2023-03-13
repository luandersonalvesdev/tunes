import React from 'react';
import Header from '../components/Header';

const INPUT_LENGTH = 2;

export default class Search extends React.Component {
  state = {
    inputValue: '',
  };

  fHandleChange = ({ target }) => {
    const { value } = target;
    this.setState(() => ({ inputValue: value }));
  };

  render() {
    const { inputValue } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
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
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}
