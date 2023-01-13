import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <nav>
        <ul>
          <li>
            <img
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${hashEmail}` }
              alt="Imagem de Perfil"
            />
          </li>
          <li>
            <p data-testid="header-player-name">{name}</p>
          </li>
          <li>
            <p data-testid="header-score">0</p>
          </li>
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  ...state.info,
});

export default connect(mapStateToProps)(Header);
