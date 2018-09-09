import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

// Task component - represents a single todo item
export default class About extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { onShow } = this.props
    const opacity = onShow ? 1 : 0
    return (
      <div className="about-container" style={{ opacity: opacity }}>
        <div className="text-container">
          Self and Other is a small project created in 2016 with and for my partner. At a moment of our interaction when everything seemed to be falling apart, the thought of separating scared me so much that I wanted to give the relationship an afterlife while it still existed. 
          <br/><br/>
          Being a long distance partnership, the most tangible traces we had left were in our online written conversations. The afterlife ended up taking the shape of the archive of all our Messenger chats, replayed by this website in real time, exactly two years after they had happened. A week of silence in our chats would mean a week of silence on the website.
          <br/><br/>
          There is something truly romantic and voyeuristic in exposing ourselves so openly to the world. And there is something truly self absorbed in fantasizing that someone would visit that website every day in 2017, to observe our conversations from 2015 unfolding. So self absorbed, that the relationship survived. 
        </div>
      </div>
    );
  }
}

About.propTypes = {
  onShow: PropTypes.bool.isRequired,
};
