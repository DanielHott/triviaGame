import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { player, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ player.email }
          alt="homem"
        />
        <h3
          data-testid="header-player-name"
        >
          { player.name }
        </h3>
        <h3
          data-testid="header-score"
        >
          { score.score }
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  player: PropTypes.objectOf(PropTypes.string).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.login.player,
  score: state.login.player,
});

export default connect(mapStateToProps)(Header);
