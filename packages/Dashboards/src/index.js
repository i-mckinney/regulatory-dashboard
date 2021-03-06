import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/ie11';

const ID = "Dashboard-container"

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
if (!document.getElementById(ID)) {
  ReactDOM.render(<App />, document.getElementById('notRoot'));
}



