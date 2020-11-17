import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserTable from './user/UserTable'
import UserCreate from './user/UserCreate'
import UserEdit from './user/UserEdit'
import UserDelete from './user/UserDelete'
import Breadcrumbs from './utils/Breadcrumbs'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'userapp-',
});

function App() {
  return (
    <div className="ui container">
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <div>
            <Breadcrumbs />
            <Switch>
              <Route path="/users" exact component={UserTable} />
              <Route path="/users/new" component={UserCreate} />
              <Route path="/users/edit/:id" component={UserEdit} />
              <Route path="/users/delete/:id" component={UserDelete} />
            </Switch>
          </div>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
}

export default App;
