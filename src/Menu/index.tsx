/* eslint-disable new-cap */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type MenuProps = {
  menuOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setMenuOpen: (menuOpen: boolean) => void;
  date: Date | null;
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date | null) => void;
  repairOneSelf: boolean;
  // eslint-disable-next-line no-unused-vars
  setRepairOneSelf: (repairOneSelf: boolean) => void;
  repairPro: boolean;
  // eslint-disable-next-line no-unused-vars
  setRepairPro: (repairPro: boolean) => void;
  sell: boolean;
  // eslint-disable-next-line no-unused-vars
  setSell: (sell: boolean) => void;
  give: boolean;
  // eslint-disable-next-line no-unused-vars
  setGive: (give: boolean) => void;
  repair: boolean;
};

const Menu = function ({
  menuOpen,
  setMenuOpen,
  date,
  setDate,
  repairOneSelf,
  setRepairOneSelf,
  repairPro,
  setRepairPro,
  sell,
  setSell,
  give,
  setGive,
  repair,
}: MenuProps) {
  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Dialog open={menuOpen} onClose={handleCloseMenu}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
        <DialogContent>
          <DialogContentText>
            Choisir une date pour voir le status d&apos;ouverture des lieux.
          </DialogContentText>
          <DateTimePicker
            value={date}
            onChange={setDate}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          {repair ? (
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Lieux à afficher</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={repairOneSelf}
                      onChange={(e) => setRepairOneSelf(e.target.checked)}
                      name="repairOneSelf"
                    />
                  }
                  label="Réparer par soi-même"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={repairPro}
                      onChange={(e) => setRepairPro(e.target.checked)}
                      name="repairPro"
                    />
                  }
                  label="Réparer par un professionnel"
                />
              </FormGroup>
            </FormControl>
          ) : (
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Lieux à afficher</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sell}
                      onChange={(e) => setSell(e.target.checked)}
                      name="sell"
                    />
                  }
                  label="Vendre"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={give}
                      onChange={(e) => setGive(e.target.checked)}
                      name="give"
                    />
                  }
                  label="Donner"
                />
              </FormGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMenu}>Close</Button>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
};

export default Menu;
