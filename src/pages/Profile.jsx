import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState(() => ({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <img data-testid="profile-image" src={ user.image } alt={ user.name } />
          <h2>{user.name}</h2>
          <p>{user.description}</p>
          <p>{user.email}</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}
