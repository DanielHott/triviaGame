import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../component/Header';
import { setScore } from '../redux/actions';
import store from '../redux/store';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      category: '',
      question: '',
      correct: '',
      incorrectAnswers: [],
      time: 30,
      isDisabled: false,
      assertions: 0,
      questionNumber: 0,
      isButtonVisible: false,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.timer = this.timer.bind(this);
    this.disabled = this.disabled.bind(this);
    this.score = this.score.bind(this);
    this.next = this.next.bind(this);
    this.renderButtonNext = this.renderButtonNext.bind(this);
    this.renderButtonsAlternatives = this.renderButtonsAlternatives.bind(this);
    this.renderButtonIncorrect = this.renderButtonIncorrect.bind(this);
  }

  componentDidMount() {
    const { saveScore } = this.props;
    saveScore({ score: 0 });
    this.fetchApi();
    this.timer();
    const { player } = store.getState().login;
    const { name, gravatarEmail } = player;
    const user = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    } };
    localStorage.setItem('state', JSON.stringify(user));
  }

  async fetchApi() {
    const { questionNumber } = this.state;
    const { token } = store.getState().login;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const correct = data.results[questionNumber].correct_answer;
    const incorrect = data.results[questionNumber].incorrect_answers;
    incorrect.push(correct);
    incorrect.sort();
    console.log(typeof incorrect);
    const { category, question, difficulty } = data.results[questionNumber];
    this.setState({
      category,
      question,
      correct,
      difficulty,
      incorrectAnswers: [...incorrect],
    });
  }

  changeColor() {
    const wrongs = document.querySelectorAll('.wrong');
    const correct = document.querySelector('.correct');
    wrongs.forEach((element) => { element.style.border = '3px solid rgb(255, 0, 0)'; });
    correct.style.border = '3px solid rgb(6, 240, 15)';
    this.setState({ isButtonVisible: true });
  }

  disabled() {
    this.setState({ isDisabled: true });
    this.changeColor();
  }

  timer() {
    const { time } = this.state;
    const mil = 1000;
    if (time !== 0) {
      setInterval(() => {
        this.setState((prevState) => {
          if (prevState.time > 0) {
            return ({ time: prevState.time - 1 });
          } this.disabled();
        });
      }, mil);
    }
  }

  score() {
    const { saveScore } = this.props;
    const base = 10;
    const { difficulty, time, assertions } = this.state;
    const actAssertion = assertions + 1;
    this.setState({ assertions: actAssertion });
    const levels = [0, 'easy', 'medium', 'hard'];
    const { player } = store.getState().login;
    const { name, gravatarEmail, score } = player;
    const point = levels.indexOf(difficulty);
    const points = base + (time * point);
    const somaPoints = points + score;
    const user = { player: {
      name,
      assertions: actAssertion,
      score: somaPoints,
      gravatarEmail,
    } };
    localStorage.setItem('state', JSON.stringify(user));
    saveScore({ score: somaPoints, assertions: actAssertion });
  }

  next() {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const four = 4;
    if (questionNumber < four) {
      const actNumber = questionNumber + 1;
      this.setState({ questionNumber: actNumber,
        isButtonVisible: false,
        time: 30 });
      this.fetchApi();
    } else if (questionNumber === four) {
      return (history.push('/feedback'));
    }
  }

  renderButtonNext() {
    const { isButtonVisible } = this.state;
    if (isButtonVisible === true) {
      return (
        <button data-testid="btn-next" type="button" onClick={ this.next }>
          Próxima
        </button>);
    }
  }

  renderButtonsAlternatives(correct, isDisabled) {
    return (
      <button
        type="button"
        key={ correct }
        disabled={ isDisabled }
        id="correct-answer"
        onClick={ () => {
          this.changeColor();
          this.score();
        } }
        className="correct"
      >
        {correct}
      </button>);
  }

  renderButtonIncorrect(alternative, isDisabled, index) {
    return (
      <button
        type="button"
        key={ alternative }
        disabled={ isDisabled }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.changeColor }
        className="wrong"
      >
        {alternative}
      </button>);
  }

  render() {
    const { incorrectAnswers, correct,
      question, category, time, isDisabled, isButtonVisible } = this.state;
    return (
      (incorrectAnswers.length > 0) ? (
        <div>
          <Header />
          <section>
            <h4 data-testid="question-category">{ category }</h4>
            <h4
              data-testid="question-text"
            >
              {question}
            </h4>
            { incorrectAnswers.flatMap((alternative, index) => {
              if (alternative === correct) {
                return this.renderButtonsAlternatives(correct, isDisabled);
              } if (alternative !== correct) {
                return this.renderButtonIncorrect(alternative, isDisabled, index);
              }
            })}
            { isButtonVisible && this.renderButtonNext()}
            { time }
          </section>
        </div>
      ) : <p>Loading</p>
    );
  }
}

Game.propTypes = {
  saveScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveScore: (state) => dispatch(setScore(state)),
});

export default connect(null, mapDispatchToProps)(Game);
