/* eslint-disable new-cap */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import styles from './index.module.css';

type AboutProps = {
  aboutOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setAboutOpen: (menuOpen: boolean) => void;
};

const About = function ({ aboutOpen, setAboutOpen }: AboutProps) {
  const handleAboutMenu = () => {
    setAboutOpen(false);
  };

  return (
    <Dialog open={aboutOpen} onClose={handleAboutMenu}>
      <DialogContent className={styles.main}>
        <DialogContentText className={styles.text}>
          Ce projet a été réalisé dans le cadre du Grenoble Civic Lab #3
          (Novembre 2021 - Avril 2022)
          <br />
          <a href="https://grenoble.civiclab.eu/">
            <img
              className={styles.image}
              src="Reset-Mode-d-emploi_front-end/GrenobleCivicLab.png"
              alt="Logo du Grenoble Civic Lab"
            />
          </a>
        </DialogContentText>
        <DialogContentText className={styles.text}>
          Ce projet est disponible sur GitHub sous lience Apache 2.0
          <br />
          <a href="https://github.com/Reset-Mode-d-emploi/Reset-Mode-d-emploi_front-end">
            <img
              className={styles.image}
              src="Reset-Mode-d-emploi_front-end/GitHub.png"
              alt="Logo de GitHub"
            />
          </a>
        </DialogContentText>
        <DialogContentText className={styles.text}>
          Les données sont disponibles au téléchargement sous licence ODbL 1.0
          en indiquant comme auteurs Reset Mode d&apos;emploi, &quot;Les
          Contributeurs OpenStreetMap&quot; et Grenoble Alpes Métropole
          <br />
          <a
            href={`https://sheets.googleapis.com/v4/spreadsheets/17seANKbX3tFKlfO1fqlMpA1PIISM_GUKItTcvcpCoXw/values/data?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          >
            Données pour tous les objets
          </a>
          <br />
          <br />
        </DialogContentText>
        <a href="https://framaforms.org/reset-mode-demploi-retour-libre-1648895495">
          Formulaire pour nous faire des retours
        </a>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAboutMenu}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default About;
