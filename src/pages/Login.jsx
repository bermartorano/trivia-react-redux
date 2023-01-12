import React, { Component } from 'react';
import logo from '../trivia.png';
// import '../App.css';

export default class Login extends Component {
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
            // onClick={}
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
