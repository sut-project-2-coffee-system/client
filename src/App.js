import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiniDrawer from './components/sidebar/MiniDrawer'
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import createOverrides from './theme';

const baseTheme = createMuiTheme();

function App() {
  return (
    <div className="App wrapper">

      <ThemeProvider
        theme={{
          ...baseTheme,
          overrides: createOverrides(baseTheme)
        }}>
        <MiniDrawer />
      </ThemeProvider>
    </div>
  );
}

export default App;
