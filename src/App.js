import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import { ThemeProvider} from '@material-ui/core'
import {createTheme} from '@material-ui/core/styles'
import {deepPurple} from '@material-ui/core/colors'
import Layout from './components/Layout';

const theme = createTheme({
  palette:{
    primary:deepPurple
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Notes />
          </Route>
        </Switch>
        <Route path="/create">
          <CreateNote />
        </Route>
        </Layout>
      </Router>
      </ThemeProvider>
    
   
  );
}

export default App;
