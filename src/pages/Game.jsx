import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaApi from '../services/triviaApi';
import { scoreSave } from '../redux/actions/index';

class Game extends Component {
  state = {
    questionCategory: '',
    questionText: '',
    answers: [],
    difficulty: '',
    correctAnswer: '',
    borderAnswer: 'hidden',
    isNextEnable: false,
    timeOut: false,
    tempo: 30,
    score: 0,
  };

  componentDidMount() {
    this.getTrivia();
    this.timer();
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
        difficulty: data.results[0].difficulty,
      });
    }
  };

  handleNext = async () => {
    await this.getTrivia();
    this.setState({
      borderAnswer: 'hidden',
      isNextEnable: false,
      timeOut: false,
      tempo: 30,
    });
  };

  handleButtonClick = ({ target }) => {
    const { borderAnswer: current, correctAnswer } = this.state;

    this.setState({
      borderAnswer: current === 'hidden' && 'solid',
      timeOut: true,
      isNextEnable: true,
    }, () => this.updatePlayerScore(false));
    if (target.textContent === correctAnswer) this.updatePlayerScore(true);
    if (target.textContent !== correctAnswer) this.updatePlayerScore(false);
  };

  updatePlayerScore = (boolean) => {
    const { tempo, difficulty, score } = this.state;
    const { dispatch } = this.props;

    if (boolean) {
      let difficultyLevel = 0;
      if (difficulty === 'easy') difficultyLevel = Number('1');
      if (difficulty === 'medium') difficultyLevel = Number('2');
      if (difficulty === 'hard') difficultyLevel = Number('3');
      this.setState((prev) => ({
        score: prev.score + (Number('10') + (tempo * difficultyLevel)),
      }));
      dispatch(scoreSave(score));
    } else {
      this.setState((prev) => ({
        score: prev.score,
      }));
      dispatch(scoreSave(score));
    }
  };

  generateButtons = () => {
    const {
      answers,
      correctAnswer,
      borderAnswer,
      timeOut,
    } = this.state;

    const allBtns = answers.map((answer, index) => {
      if (answer === correctAnswer) {
        return (
          <button
            key={ index }
            data-testid="correct-answer"
            type="button"
            style={ { border: '3px rgb(6, 240, 15)', borderStyle: borderAnswer } }
            onClick={ this.handleButtonClick }
            disabled={ timeOut }
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
          style={ { border: '3px rgb(255, 0, 0)', borderStyle: borderAnswer } }
          onClick={ this.handleButtonClick }
          disabled={ timeOut }
        >
          {answer}
        </button>
      );
    });
    return allBtns;
  };

  timer = async () => {
    setInterval(() => {
      const { tempo } = this.state;
      this.setState({ tempo: tempo - 1 });
      if (tempo === 0) this.setState({ timeOut: true, isNextEnable: true });
    }, Number('1000'));
  };

  render() {
    const { questionCategory, questionText, isNextEnable, tempo } = this.state;
    return (
      <div>
        <Header />
        { tempo < 0 ? <h2>0</h2> : <h2>{tempo}</h2>}
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
          data-testid="btn-next"
        >
          Next
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Game.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Game);
