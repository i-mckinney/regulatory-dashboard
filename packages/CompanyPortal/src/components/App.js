import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Breadcrumbs from './utils/Breadcrumbs'

import ApiTablePage from './api-table-page/ApiTablePage';
import EntitiesApiTable from './api-table-entities/EntitiesApiTable'
import LoansApiTable from "./api-table-page/api-table-loans/LoansApiTable";

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
              <Route path='/api-table' exact component={ApiTablePage} />
            </Switch>
            <Switch>
              <Route path='/api-entities' exact component={EntitiesApiTable} />
            </Switch>
            <Switch>
              <Route path='/api-loans' exact component={LoansApiTable} />
            </Switch>
          </div>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
}

export default App;
