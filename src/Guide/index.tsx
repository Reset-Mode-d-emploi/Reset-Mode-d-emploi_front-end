/* eslint-disable new-cap */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.css';
import { ADVICE_TITLE } from '../utils/constants';
import {
  rawGSheetData,
  GuideData,
  convertData,
  convertGuide,
} from '../utils/types';
import {
  getNextLink,
  getNextStepTexts,
  getQuestion,
  getRef,
  getTutorials,
} from '../utils/guides';
import Header from '../Header';

const Guide = function () {
  const { object, giveOrRepair, part, issue } = useParams();
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

  const buttonTexts = getNextStepTexts(guideData, object, giveOrRepair, part);

  const tutorials = getTutorials(guideData, object, part, issue);

  return (
    <div className={styles.main}>
      {isLoading ? (
        <CircularProgress className={styles.progress} size="8em" />
      ) : null}
      {!isLoading && !buttonTexts ? <p>ERROR : Case not managed</p> : null}
      {!isLoading && buttonTexts ? (
        <>
          <Header
            object={object}
            giveOrRepair={giveOrRepair}
            part={part}
            issue={issue}
          />
          <div className={styles.content}>
            {tutorials ? (
              <>
                <p className={styles.question}>{ADVICE_TITLE}</p>
                {tutorials.map((url) => (
                  <iframe
                    className={styles.video}
                    title={url}
                    src={url}
                    key={url}
                  />
                ))}
                <div className={styles.goToProfessional}>
                  <p className={styles.goToProfessionalText}>Je préfère ...</p>
                  <Button
                    variant="contained"
                    size="large"
                    href={`#/map/${giveOrRepair}/${object}/${getRef(
                      guideData,
                      object
                    )}`}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      marginRight: '1em',
                    }}
                  >
                    M&apos;adresser à un
                    <br />
                    professionnel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className={styles.question}>
                  {getQuestion(object, giveOrRepair, part)}
                </p>
                {buttonTexts.map((text) => (
                  <Button
                    variant="contained"
                    size="large"
                    href={getNextLink(
                      text!,
                      object,
                      giveOrRepair,
                      part,
                      guideData
                    )}
                    key={text}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  >
                    {text}
                  </Button>
                ))}
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Guide;
