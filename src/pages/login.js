import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchAPI, setUser } from '../redux/actions';
import store from '../redux/store';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  async handleChange() {
    const idName = document.getElementById('input-player-name').value;
    const idEmail = document.getElementById('input-gravatar-email').value;
    const emailCrypto = md5(idEmail).toString();
    const image = await fetch(`https://www.gravatar.com/avatar/${emailCrypto}`);
    const returnedImage = image;
    this.setState({
      name: idName,
      email: returnedImage.url,
    });
    if (idName.length > 0 && idEmail.length > 0) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  async handleClick() {
    const { getToken, history, saveUser } = this.props;
    await getToken();
    saveUser(this.state);
    const { token } = store.getState().login;
    localStorage.setItem('token', token);
    history.push('/game');
  }

  handleRedirect() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { isDisable } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>Sua vez</p>
          <form>
            <label htmlFor="input-player-name">
              Nome
              <input
                type="text"
                name="name"
                id="input-player-name"
                data-testid="input-player-name"
                onKeyUp={ this.handleChange }
              />
            </label>
            <label htmlFor="input-gravatar-email">
              Email
              <input
                type="text"
                name="email"
                id="input-gravatar-email"
                data-testid="input-gravatar-email"
                onKeyUp={ this.handleChange }
              />
            </label>
            <button
              data-testid="btn-play"
              disabled={ isDisable }
              type="button"
              onClick={ () => this.handleClick() }
            >
              Jogar
            </button>
          </form>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => this.handleRedirect() }
          >
            Configuração
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
  saveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchAPI()),
  saveUser: (state) => dispatch(setUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
