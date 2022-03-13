/* eslint-disable new-cap */
import React from 'react';
import { useQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.css';
import { rawGuides } from '../utils/types';
import { convertGuides } from '../utils/guides';

const Guide = function () {
  const { isLoading, error, data } = useQuery<rawGuides, any>('guides', () =>
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/146ZCdE9z7JCvUEignID7OahIGvMqF6NEmZzwlX9c0Nw/values/guides?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    ).then((res) => res.json())
  );
  if (error) return <div>An error has occurred: {error.message}</div>;
  console.log(convertGuides(data));
  return (
    <>
      {isLoading ? (
        <CircularProgress className={styles.progress} size="8em" />
      ) : null}
      ;
    </>
  );
};

export default Guide;
