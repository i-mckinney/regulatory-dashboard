import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApiTable from './api-table/ApiTable';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// Testing
import ApiTablePage from './api-table-page/ApiTablePage';

const generateClassName = createGenerateClassName({
  productionPrefix: 'companyapp-',
});

function App() {
  return (
    <div className='ui container'>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path='/api-table' exact component={ApiTable} />
            </Switch>
            <Switch>
              <Route path='/api-table-page' exact component={ApiTablePage} />
            </Switch>
          </div>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
}

export default App;
