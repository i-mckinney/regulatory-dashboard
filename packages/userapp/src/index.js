import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const ID = "User-container"

// Mount to notRoot if it is not a micro frontend
if (!document.getElementById(ID)) {
  ReactDOM.render(
    <App />,
    document.getElementById('notRoot')
  )
}

// render micro frontend function
window.renderUser = (containerId, history) => {
  ReactDOM.render(
    <App history={history} />,
    document.getElementById(containerId)
  )
}

//unmount function
window.unmountUser = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
