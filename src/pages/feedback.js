import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      assertions: 0,
      message: '',
    };
    this.playAgain = this.playAgain.bind(this);
    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.ranking = this.ranking.bind(this);
  }

  componentDidMount() {
    this.feedbackMessage();
  }

  feedbackMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const three = 3;
    const { player } = state;
    this.setState({ score: player.score, assertions: player.assertions });
    if (state.player.assertions < three) {
      return (
        this.setState({ message: 'Podia ser melhor...' }));
    }
    return (
      this.setState({ message: 'Mandou bem!' })
    );
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  ranking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { score, assertions, message } = this.state;
    return (
      <div>
        <Header />
        <h1
          data-testid="feedback-text"
        >
          Feedback
        </h1>
        <p
          data-testid="feedback-text"
        >
          {message}
        </p>
        <h3
          data-testid="feedback-total-score"
        >
          { score }
        </h3>
        <h3
          data-testid="feedback-total-question"
        >
          { assertions }
        </h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.ranking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
};

export default Feedback;
