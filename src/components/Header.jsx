import React from 'react';
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
        {
          isLoading
            ? <span>Carregando...</span>
            : <span data-testid="header-user-name">{ nameUser }</span>
        }
      </header>
    );
  }
}
