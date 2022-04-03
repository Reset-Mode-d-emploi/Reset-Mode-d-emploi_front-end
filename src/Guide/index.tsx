/* eslint-disable new-cap */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.css';
import { ADVICE_TITLE, GUARANTEE_OPTION } from '../utils/constants';
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
  const { object, giveOrRepair, guarantee, part, issue } = useParams();
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

  const buttonTexts = getNextStepTexts(
    guideData,
    object,
    giveOrRepair,
    guarantee,
    part
  );

  const tutorials = getTutorials(guideData, object, part, issue);

  function tutorialUrlToHtml(url: string) {
    if (url.includes('youtube')) {
      return (
        <iframe className={styles.video} title={url} src={url} key={url} />
      );
    }
    const imgSrc = url.includes('spareka')
      ? 'Reset-Mode-d-emploi_front-end/spareka.png'
      : 'Reset-Mode-d-emploi_front-end/miss_pieces.png';
    const imgAlt = url.includes('spareka')
      ? 'Spareka logo'
      : 'Miss Pieces .com logo';
    return (
      <a href={url} key={url}>
        <img src={imgSrc} alt={imgAlt} />
      </a>
    );
  }

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
                {tutorials.map((url) => tutorialUrlToHtml(url))}
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
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {guarantee === GUARANTEE_OPTION ? (
                  <p className={styles.question}>
                    Votre objet est encore sous garantie, n&apos;essayez pas de
                    le réparer par vous même car vous la perdrez.
                    <br />
                    <br />
                    Contactez le fabricant ou le revendeur pour qu&apos;il vous
                    explique la marche à suivre.
                  </p>
                ) : (
                  <>
                    <p className={styles.question}>
                      {getQuestion(object, giveOrRepair, guarantee, part)}
                    </p>
                    {buttonTexts.map((text) => (
                      <Button
                        variant="contained"
                        size="large"
                        href={getNextLink(
                          text!,
                          object,
                          giveOrRepair,
                          guarantee,
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
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Guide;
