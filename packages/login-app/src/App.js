import React from 'react';
import './App.css';
import LoginPage from './LoginPage/LoginPage';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'loginApp-',
});

function App() {
  return (
    <div className='App'>
      <StylesProvider generateClassName={generateClassName}>
        <LoginPage />
      </StylesProvider>
    </div>
  );
}

export default App;
