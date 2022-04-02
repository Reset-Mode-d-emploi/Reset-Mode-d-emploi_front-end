/* eslint-disable new-cap */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import styles from './index.module.css';

type headerProps = {
  object: string | undefined;
  giveOrRepair: string | undefined;
  part: string | undefined;
  issue: string | undefined;
};

const Header = function ({ object, giveOrRepair, part, issue }: headerProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        style={{ backgroundColor: '#d4ee04', color: 'white' }}
      />
      <p className={styles.headerText}>
        {giveOrRepair ? `${giveOrRepair.split(' ')[0]} - ` : ''} {object || ''}
        {part ? ` - ${part}` : ''}
        {issue ? ` - ${issue}` : ''}
      </p>
      <img
        className={styles.headerLogo}
        src="Reset-Mode-d-emploi_front-end/logo_img.jpg"
        alt="Logo Reset"
      />
    </div>
  );
};

export default Header;
