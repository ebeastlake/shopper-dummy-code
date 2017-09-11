'use strict'
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

render (<Root/>, document.getElementById('main'));

  // <Provider store={store}>
  // 	<Router>
  //   	<Root/>
  //   </Router>
  // </Provider>,
  // document.getElementById('main')