import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-app-polyfill/ie11';

// render micro frontend function
window.renderDashboard = (containerId) => {
  ReactDOM.render(
      <App/>,
    document.getElementById(containerId)
  );
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

//unmount function
window.unmountDashboard = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

// Mount to root if it is not a micro frontend
if (!document.getElementById('container')) {
  ReactDOM.render(<App />, document.getElementById('notRoot'));
}



