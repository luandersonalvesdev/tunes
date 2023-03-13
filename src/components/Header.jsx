import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
            >
              Procurar
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritos
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              data-testid="link-to-profile"
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
