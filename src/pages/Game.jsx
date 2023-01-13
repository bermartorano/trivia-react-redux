import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaApi from '../services/triviaApi';

class GamePage extends Component {
  state = {
    questionCategory: '',
    questionText: '',
    answers: [],
    correctAnswer: '',
  };

  componentDidMount() {
    this.getTrivia();
  }

  getTrivia = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const data = await triviaApi(token);

    if (data.response_code === Number('3')) {
      history.push('/');
    } else {
      // get right and wrong answers and add them to state.
      const rightAnswer = data.results[0].correct_answer;
      const wrongAnswers = data.results[0].incorrect_answers;
      const allAnswers = [...wrongAnswers, rightAnswer]
        .sort(() => Math.random() - Number('0.5'));
      //
      this.setState({
        questionCategory: data.results[0].category,
        questionText: data.results[0].question,
        answers: allAnswers,
        correctAnswer: rightAnswer,
      });
    }
  };

  generateButtons = () => {
    const { answers, correctAnswer } = this.state;
    const allBtns = answers.map((answer, index) => {
      if (answer === correctAnswer) {
        return (
          <button
            key={ index }
            data-testid="correct-answer"
            type="button"
          >
            {answer}
          </button>
        );
      }
      return (
        <button
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          {answer}
        </button>
      );
    });
    return allBtns;
  };

  render() {
    const { questionCategory, questionText } = this.state;
    return (
      <div>
        <Header />
        <h1>Game Page</h1>
        <div>
          <p data-testid="question-category">{questionCategory}</p>
          <p data-testid="question-text">{questionText}</p>
          <div data-testid="answer-options">
            { this.generateButtons() }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.info,
});

GamePage.propTypes = {}.isRequired;

export default connect(mapStateToProps)(GamePage);
