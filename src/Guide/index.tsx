/* eslint-disable new-cap */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.css';
import { rawGuides, GuideData } from '../utils/types';
import { convertGuides } from '../utils/guides';

const Guide = function () {
  const [guideData, setGuideData] = useState<GuideData[] | null>(null);
  const { isLoading, error, data } = useQuery<rawGuides, any>('guides', () =>
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/146ZCdE9z7JCvUEignID7OahIGvMqF6NEmZzwlX9c0Nw/values/guides?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    ).then((res) => res.json())
  );
  if (error) return <div>An error has occurred: {error.message}</div>;

  if (data && !guideData) {
    setGuideData(convertGuides(data) || null);
  }

  // TODO : Remove these placeholders :
  const object = 'Vélo';
  const ref = 'bicycle';
  const part = 'Les roues';

  const issues = guideData?.filter(
    (guide) =>
      guide.object === object && guide.ref === ref && guide.part === part
  );

  return (
    <div className={styles.main}>
      {isLoading ? (
        <CircularProgress className={styles.progress} size="8em" />
      ) : null}
      {!isLoading && !issues ? <p>ERROR : Case not managed</p> : null}
      {!isLoading && issues ? (
        <div className={styles.issues}>
          {issues.map((issue) => (
            <Button variant="contained" size="large" href="#/map">
              {issue.issue}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Guide;
