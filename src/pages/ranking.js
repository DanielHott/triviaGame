import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.returnHome = this.returnHome.bind(this);
  }

  returnHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1
          data-testid="Ranking-title"
        >
          Title
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.returnHome }
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
};

export default Ranking;
