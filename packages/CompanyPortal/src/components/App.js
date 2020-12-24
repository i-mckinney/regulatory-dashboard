import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import ApiTable from './api-table/ApiTable';
import ApiTablePage from './api-table-page/ApiTablePage'
import GlobalTableKey from './global-table-key/GlobalTableKey'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Breadcrumbs from './utils/Breadcrumbs'

const generateClassName = createGenerateClassName({
  productionPrefix: 'custapi-',
  seed: 'custapi-'
});

function App() {
  return (
    <div className='ui container'>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <div>
            <Breadcrumbs />
            <Switch>
              {/* <Route path='/api-table' exact component={ApiTable} /> */}
              <Route path='/api-table' exact component={ApiTablePage} />
              <Route
                path='/api-table/global-table-key'
                exact
                component={GlobalTableKey}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </StylesProvider>
    </div>
  )
}

export default App;
