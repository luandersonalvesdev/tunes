import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../css/Header.css';
import '../css/colors.css';

const linkStyle = {
  margin: '1rem',
  textDecoration: 'none',
  color: 'white',
  fontSize: '1.2rem',
  fontWeight: '600',
};

export default class Header extends React.Component {
  state = {
    nameUser: '',
  };

  async componentDidMount() {
    this.setState(() => ({ isLoading: true }));
    const { name } = await getUser();
    this.setState(() => ({ nameUser: name, isLoading: false }));
  }

  render() {
    const { isLoading, nameUser } = this.state;

    return (
      <header data-testid="header-component">
        <ul>
          <li>
            <Link
              to="/search"
              data-testid="link-to-search"
              style={ linkStyle }
            >
              Procurar
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              style={ linkStyle }
            >
              Favoritos
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              style={ linkStyle }
            >
              Perfil
            </Link>
          </li>
        </ul>
        {
          isLoading
            ? <span>Carregando...</span>
            : <span data-testid="header-user-name">{ nameUser }</span>
        }
      </header>
    );
  }
}
