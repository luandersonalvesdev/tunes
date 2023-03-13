import React from 'react';

export default class FormSearch extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
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
        </form>
      </div>
    );
  }
}
