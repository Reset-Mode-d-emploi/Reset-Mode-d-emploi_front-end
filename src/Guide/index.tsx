/* eslint-disable new-cap */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.css';
import {
  rawGSheetData,
  GuideData,
  convertData,
  convertGuide,
} from '../utils/types';
import { getNextLink, getNextStepTexts, getRef } from '../utils/guides';

const Guide = function () {
  const { object, part } = useParams();
  const [guideData, setGuideData] = useState<Partial<GuideData>[] | null>(null);
  const { isLoading, error, data } = useQuery<rawGSheetData, any>(
    'guides',
    () =>
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/146ZCdE9z7JCvUEignID7OahIGvMqF6NEmZzwlX9c0Nw/values/guides?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      ).then((res) => res.json())
  );
  if (error) return <div>An error has occurred: {error.message}</div>;

  if (data && !guideData) {
    setGuideData(convertData(data, convertGuide) || null);
  }

  const buttonTexts = getNextStepTexts(guideData, object, part);

  const ref = getRef(guideData, object);

  return (
    <div className={styles.main}>
      {isLoading ? (
        <CircularProgress className={styles.progress} size="8em" />
      ) : null}
      {!isLoading && !buttonTexts ? <p>ERROR : Case not managed</p> : null}
      {!isLoading && buttonTexts ? (
        <div className={styles.issues}>
          {buttonTexts.map((text) => (
            <Button
              variant="contained"
              size="large"
              href={getNextLink(text!, object, part, ref)}
              key={text}
              style={{ backgroundColor: 'white', color: 'black' }}
            >
              {text}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Guide;
