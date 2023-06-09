import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/Login.css';
import Logo from '../components/Logo';

const INPUT_LENGTH = 3;

export default class Login extends React.Component {
  state = {
    inputText: '',
    access: '',
  };

  fHandleChange = ({ target }) => {
    const { value } = target;
    this.setState(() => ({ inputText: value }));
  };

  fSaveUser = async (inputText) => {
    this.setState(() => ({ isLoading: true }));
    const data = await createUser({ name: inputText });
    this.setState(() => ({ access: data, isLoading: false }));
  };

  render() {
    const { inputText, access, isLoading } = this.state;

    return (
      <div data-testid="page-login" className="page-login">
        <Logo />
        <form onSubmit={ (e) => { e.preventDefault(); } }>
          <input
            type="text"
            data-testid="login-name-input"
            value={ inputText }
            onChange={ this.fHandleChange }
            id="login-name-input"
            placeholder="Digite seu nome."
            maxLength={ 11 }
          />
          <button
            data-testid="login-submit-button"
            disabled={ (inputText.length < INPUT_LENGTH) }
            onClick={ () => { this.fSaveUser(inputText); } }
          >
            Entrar
          </button>
        </form>
        {
          isLoading
            ? <Loading />
            : access && <Redirect to="/search" />
        }
      </div>
    );
  }
}
