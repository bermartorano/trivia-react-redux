import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  state = {
    storage: [],
  };

  componentDidMount() {
    this.setState({ storage: JSON.parse(localStorage.getItem('ranking')) });
  }

  page = (event) => {
    const { history } = this.props;
    const { name } = event.target;
    if (name === 'Play') {
      history.push('/');
    }
  };

  render() {
    const { storage } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          name="Play"
          onClick={ this.page }
        >
          Play Again
        </button>
        { storage
          .sort((a, b) => b.score - a.score)
          .map((player, index) => (
            <li key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${player.email}` }
                alt={ player.name }
              />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </li>
          ))}
      </div>
    );
  }
}

Ranking.propTypes = {}.isRequired;

export default connect()(Ranking);
