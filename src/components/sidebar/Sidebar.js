import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import AchievementContainer from '../achievement/AchievementContainer';
import Logo from '../logo/Logo';
import { track } from '../../emitter/Tracking';
import Loading from '../../components/loading/Loading';

import '../../scss/slide-in-bck-top.scss';
import '../../scss/fade-in-left.scss';
import '../../scss/fade-out-left.scss';

import './sidebar.scss';

/** @param {object} state */
const mapStateToProps = state => ({
  loading: state.loadingReducer.loading,
  user: state.userReducer.user,
});

export class Sidebar extends Component {

  state = {
    open: false,
    hover: false,
    hideSidebarClass: 'hidden'
  }

  onSidebar = () => {
    const toggle = !this.state.open;

    this.setState({
      open: toggle,
      hideSidebarClass: 'fade-out-left'
    });

    track({
      section: 'sidebar',
      action: 'toggle_sidebar|button_click',
      value: toggle,
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.loading && <Loading />}

        <div
          className={`sidebar bg-blue-dark h-screen z-50 overflow-y-auto absolute fade-in-left ${this.state.open ? 'block' : this.state.hideSidebarClass}`}
          style={{ width: '400px'}}
        >
          <AchievementContainer onClose={this.onSidebar} />
        </div>
        <div className="header">
          {this.state.open && <div className="z-30 h-screen w-full absolute bg-testable-overlay-sidebar" onClick={this.onSidebar}></div>}
          { this.props.user && <Header onSidebar={this.onSidebar} /> }
        </div>

        {this.props.children}

        { !this.props.user && <Logo
          className="h-6 hidden md:block absolute pin-b pin-r mr-5 mb-5"
        /> }
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps)(Sidebar);