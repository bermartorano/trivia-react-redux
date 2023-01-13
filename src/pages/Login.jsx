import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tokenAndInfoSave } from '../redux/actions/index';
import tokenApi from '../services/api';
import logo from '../trivia.png';
// import '../App.css';

class Login extends Component {
  state = {
    nome: '',
    email: '',
    buttonDisabled: true,
  };

  isFormCompleted = () => {
    const { nome, email } = this.state;
    const ZERO = 0;
    const nomeValidation = nome.length > ZERO;
    const emailValidation = email.length > ZERO;
    const validation = nomeValidation && emailValidation;
    this.setState({
      buttonDisabled: !validation,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.isFormCompleted(); });
  };

  handleOnClick = async () => {
    const { nome, email } = this.state;
    const { dispatch, history } = this.props;
    const token = await tokenApi();
    dispatch(tokenAndInfoSave(token, nome, email));
    localStorage.setItem('token', token);
    history.push('/game');
  };

  redirectSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { nome, email, buttonDisabled } = this.state;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
          </header>
        </div>
        <h1>Login</h1>
        <form>
          <input
            placeholder="Nome"
            type="text"
            name="nome"
            value={ nome }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
          <input
            placeholder="email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
          <button
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleOnClick }
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
        <button
          type="button"
          onClick={ this.redirectSettings }
          data-testid="btn-settings"
        >
          Configuração
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
