import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserTable from './user/UserTable'
import UserCreate from './user/UserCreate'
import UserEdit from './user/UserEdit'
import UserDelete from './user/UserDelete'
import jss from 'jss'
import { StylesProvider } from '@material-ui/core/styles'

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const createGenerateId = () => {
  let counter = 0

  return (rule, sheet) => `userApp--${rule.key}-${counter++}`
}

jss.setup({
  createGenerateId,
  insertionPoint: document.getElementById('insertion-point')
})

function App() {
  return (
    <div className="ui container">
      <StylesProvider jss={jss}>
        <BrowserRouter>
          <div>
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
