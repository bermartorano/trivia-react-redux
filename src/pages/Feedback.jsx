import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const three = 3;

class Feedback extends Component {
  page = (event) => {
    const { history } = this.props;
    const { name } = event.target;
    if (name === 'Play') {
      history.push('/');
    } else {
      history.push('/ranking');
    }
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <h1
          data-testid="feedback-text"
        >
          { assertions < three ? 'Could be better...' : 'Well Done!' }
        </h1>
        <Header />
        <h2
          data-testid="feedback-total-score"
        >
          { score }
        </h2>
        <h3
          data-testid="feedback-total-question"
        >
          { assertions }
        </h3>
        <button
          type="button"
          data-testid="btn-play-again"
          name="Play"
          onClick={ this.page }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          name="Ranking"
          onClick={ this.page }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
