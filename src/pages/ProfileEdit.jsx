import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends React.Component {
  state = {
    loadingForm: false,
    validateBtn: false,
    isLoading: false,
    user: {
      name: '',
      email: '',
      description: '',
      image: '',
    },
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState(() => ({ user, loadingForm: true }));
    const { name, email, description, image } = user;
    const validateBtn = name.length > 0
      && description.length > 0
      && image.length > 0
      && email.length > 0
      && email.includes('@')
      && email.includes('.com');
    this.setState(() => ({ validateBtn }));
  }

  fValidateBtn = () => {
    const { user: { name, email, description, image } } = this.state;
    const validateBtn = name.length > 0
      && description.length > 0
      && image.length > 0
      && email.length > 0
      && email.includes('@')
      && email.includes('.com');
    this.setState(() => ({ validateBtn }));
  };

  fHandleChange = ({ target: { name, value } }) => {
    const { user } = this.state;
    this.setState(() => {
      user[name] = value;
      return user;
    }, this.fValidateBtn);
  };

  fSubmitChange = async () => {
    const { user } = this.state;
    this.setState(() => ({ isLoading: true }));
    await updateUser(user);
    const { history } = this.props;
    this.setState(() => ({ isLoading: false }));
    history.push('/profile');
  };

  render() {
    const { user, loadingForm, validateBtn, isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {loadingForm
        && (
          isLoading
            ? <Loading />
            : (
              <form onSubmit={ (e) => { e.preventDefault(); } }>
                <p>{user.name}</p>
                <input
                  data-testid="edit-input-name"
                  type="text"
                  value={ user.name }
                  name="name"
                  onChange={ this.fHandleChange }
                />
                <p>{user.email}</p>
                <input
                  data-testid="edit-input-email"
                  type="email"
                  value={ user.email }
                  name="email"
                  onChange={ this.fHandleChange }
                />
                <p>{user.description}</p>
                <textarea
                  data-testid="edit-input-description"
                  type="text"
                  value={ user.description }
                  name="description"
                  onChange={ this.fHandleChange }
                />
                <img src={ user.image } alt={ user.name } />
                <input
                  data-testid="edit-input-image"
                  value={ user.image }
                  type="text"
                  name="image"
                  onChange={ this.fHandleChange }
                />
                <button
                  data-testid="edit-button-save"
                  disabled={ !validateBtn }
                  onClick={ this.fSubmitChange }
                >
                  Salvar
                </button>
              </form>
            )
        )}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
