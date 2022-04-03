import React, { useState } from 'react';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About';
import Map from './Map';
import Menu from './Menu';
import Guide from './Guide';
import Intro from './Intro';

const queryClient = new QueryClient();
const App = function () {
  const [menuOpen, setMenuOpen] = React.useState(true);
  const [aboutOpen, setAboutOpen] = React.useState(true);
  const [date, setDate] = useState<Date | null>(new Date(Date.now()));

  const buttonStyle = {
    backgroundColor: 'white',
    marginBottom: '0.5vh',
  };

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide/:object" element={<Guide />} />
            <Route path="/guide/:object/:giveOrRepair" element={<Guide />} />
            <Route
              path="/guide/:object/:giveOrRepair/:guarantee"
              element={<Guide />}
            />
            <Route
              path="/guide/:object/:giveOrRepair/:guarantee/:part"
              element={<Guide />}
            />
            <Route
              path="/guide/:object/:giveOrRepair/:guarantee/:part/:issue"
              element={<Guide />}
            />
            <Route
              path="map/:giveOrRepair/:object/:ref"
              element={
                <>
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      left: '2px',
                      top: '8vh',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <IconButton
                      aria-label="menu"
                      onClick={() => setMenuOpen(true)}
                      style={buttonStyle}
                    >
                      <MenuIcon />
                    </IconButton>
                    <IconButton
                      aria-label="menu"
                      href="https://framaforms.org/reset-mode-demploi-ajout-de-lieux-1648893304"
                      style={buttonStyle}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      aria-label="menu"
                      onClick={() => setAboutOpen(true)}
                      style={buttonStyle}
                    >
                      <InfoIcon />
                    </IconButton>
                  </div>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <Menu
                      menuOpen={menuOpen}
                      setMenuOpen={setMenuOpen}
                      date={date}
                      setDate={setDate}
                    />
                    <About aboutOpen={aboutOpen} setAboutOpen={setAboutOpen} />
                  </LocalizationProvider>
                  <Map date={date} />
                </>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
