/* eslint-disable new-cap */
import React from 'react';
import Button from '@mui/material/Button';
import styles from './index.module.css';

const Intro = function () {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <img
          className={styles.headerLogo}
          src="Reset-Mode-d-emploi_front-end/logo_img.jpg"
          alt="Logo Reset"
        />
        <Button
          variant="contained"
          size="large"
          href="#/guide"
          style={{
            backgroundColor: 'white',
            color: 'black',
            marginRight: '1em',
          }}
        >
          Lancer le
          <br />
          diagnostic
        </Button>
      </div>
      <div className={styles.secondPart}>
        <p className={styles.title}>
          &quot;Reset mode d&apos;emploi&quot; ...
          <br />
          c&apos;est quoi ?
        </p>
        <p className={styles.boldCenter}>
          Vous avez un objet ...
          <br />A réparer ? A donner ?
        </p>
      </div>
      <div className={styles.thirdPart}>
        <p className={styles.thirdPartText}>
          A partir d&apos;un{' '}
          <span className={styles.bold}>diagnostic personnalisé</span>, Reset
          Mode&apos;emploi vous guide pour savoir quoi faire de votre objet !
        </p>
      </div>
      <div className={styles.forthPart}>
        <p className={styles.forthPartText}>
          Réparez vous même vos objets grâce aux tutoriels certifiés par nos
          experts
          <br />
          Faites réparer ou donner votre objet à la bonne structure de réemploi
          près de chez vous.
        </p>
        <div className={styles.flexEnd}>
          <Button
            variant="contained"
            size="large"
            href="#/guide"
            style={{
              backgroundColor: 'white',
              color: 'black',
              marginRight: '1em',
            }}
          >
            Lancer le
            <br />
            diagnostic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
