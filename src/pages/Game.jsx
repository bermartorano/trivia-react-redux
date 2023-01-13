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
    borderAnswer: 'hidden',
    isNextEnable: false,
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

  handleNext = async () => {
    await this.getTrivia();
    this.setState({
      borderAnswer: 'hidden',
      isNextEnable: false,
    });
  };

  handleButtonClick = () => {
    const { borderAnswer: current } = this.state;
    this.setState({
      borderAnswer: current === 'hidden' && 'solid',
      isNextEnable: true,
    });
  };

  generateButtons = () => {
    const { answers, correctAnswer, borderAnswer } = this.state;
    const allBtns = answers.map((answer, index) => {
      if (answer === correctAnswer) {
        return (
          <button
            key={ index }
            data-testid="correct-answer"
            type="button"
            style={ { border: '3px solid rgb(6, 240, 15)', borderStyle: borderAnswer } }
            onClick={ this.handleButtonClick }
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
          style={ { border: '3px solid rgb(255, 0, 0)', borderStyle: borderAnswer } }
          onClick={ this.handleButtonClick }
        >
          {answer}
        </button>
      );
    });
    return allBtns;
  };

  render() {
    const { questionCategory, questionText, isNextEnable } = this.state;
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
        <button
          type="button"
          onClick={ () => this.handleNext() }
          disabled={ !isNextEnable }
        >
          Next
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.info,
});

GamePage.propTypes = {}.isRequired;

export default connect(mapStateToProps)(GamePage);
