import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
  palette: {
    primary: green,
    background: green,
    text: green
  },
  typography: {
    allVariants: green
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: 'green'
      }
    }
  }
});

