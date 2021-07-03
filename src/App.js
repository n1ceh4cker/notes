import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout';
import NoteContextProvider from './context/NoteContext';
import Create from './routes/Create';
import Notes from './routes/Notes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <NoteContextProvider>
          <Layout>
            <Switch>
              <Route exact  path='/' component={Notes} />
              <Route path='/new' component={Create} />
            </Switch>
          </Layout>
        </NoteContextProvider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
