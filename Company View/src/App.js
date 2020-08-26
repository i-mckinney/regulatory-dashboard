import React, { Component, Fragment } from 'react';
import './App.css';

import { Header, Footer } from './Layout';
import { Main } from './Components';

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Main />
        <Footer />
      </Fragment>
    );
  }
}
