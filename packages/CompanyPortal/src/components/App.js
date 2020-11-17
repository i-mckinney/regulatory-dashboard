import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApiTable from './api-table/ApiTable';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Breadcrumbs from './utils/Breadcrumbs'

const generateClassName = createGenerateClassName({
  productionPrefix: 'companyapp-',
});

function App() {
  return (
    <div className='ui container'>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <div>
           <Breadcrumbs />
            <Switch>
              <Route path='/api-table' exact component={ApiTable} />
            </Switch>
          </div>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
}

export default App;
