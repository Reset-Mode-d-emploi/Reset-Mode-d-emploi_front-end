/* eslint-disable new-cap */
import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line camelcase
import opening_hours from 'opening_hours';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import styles from './index.module.css';
import { DataPoint } from '../utils/types';
import { getIcon } from '../utils/leafletIcons';

type MarkersProps = {
  data: DataPoint[] | null;
  date: Date | null;
};

const Markers = function ({ data, date }: MarkersProps) {
  function getMarkerIconAndPopUpOpeningHours(
    o: DataPoint
  ): [L.Icon, JSX.Element] {
    let markerIcon: L.Icon;
    let popUpOpeningHours: JSX.Element;
    if (o.opening_hours) {
      try {
        const oh = new opening_hours(o.opening_hours as string);
        const isOpen = oh.getState(date || undefined);
        markerIcon = isOpen ? getIcon('green') : getIcon('red');
        const nextState = isOpen ? 'Closed' : 'Opened';
        const nextChangeDate = oh.getNextChange(date || undefined);
        const nextChangeHourDiffTime = nextChangeDate
          ? (nextChangeDate.getTime() - Date.now()) / 1000 / 3600
          : 1e6;
        if (isOpen && nextChangeHourDiffTime < 1) {
          markerIcon = getIcon('orange');
        }
        popUpOpeningHours = (
          <p className={styles.row}>
            <AccessTimeIcon />
            {o.opening_hours as string}
            <br />
            {`${nextState} on ${nextChangeDate?.toDateString()} - ${nextChangeDate?.toLocaleTimeString()} (in ${nextChangeHourDiffTime.toFixed(
              0
            )} hours)`}
          </p>
        );
      } catch {
        console.error(`Invalid opening hours for ${o.type} of id ${o.id}`);
        markerIcon = getIcon('grey');
        popUpOpeningHours = (
          <p className={styles.row}>
            <AccessTimeIcon />
            INVALID opening hours
          </p>
        );
      }
    } else {
      markerIcon = getIcon('grey');
      popUpOpeningHours = (
        <p className={styles.row}>
          <AccessTimeIcon />
          MISSING opening hours
        </p>
      );
    }
    return [markerIcon, popUpOpeningHours];
  }

  function getOSMLink(o: DataPoint): string {
    return `https://www.openstreetmap.org/${o.type}/${o.id}`;
  }

  function getWebsite(o: DataPoint): string {
    return (
      (o['Site Web'] as string) ||
      (o['contact:website'] as string) ||
      (o.website as string)
    );
  }

  function getPhone(o: DataPoint): string {
    return (o.phone as string) || (o['contact:phone'] as string);
  }

  function getEMail(o: DataPoint): string {
    return (o.email as string) || (o['contact:email'] as string);
  }

  const markers: JSX.Element[] = [];
  let id = 0;
  data?.forEach((e) => {
    const [markerIcon, popUpOpeningHours]: [L.Icon, JSX.Element] =
      getMarkerIconAndPopUpOpeningHours(e);
    const website = getWebsite(e);
    const phone = getPhone(e);
    const email = getEMail(e);
    markers.push(
      <Marker
        position={[e.lat!, e.lon!]}
        key={`marker-${id}`}
        icon={markerIcon}
      >
        <Popup>
          <p>{e.name || e.Sites || 'UNKNOWN NAME'}</p>
          <p>{e.alt_name}</p>
          <p>{e.description}</p>
          {popUpOpeningHours}
          <p className={styles.row}>
            <HomeIcon />
            {e.Adresse ||
              `${e['addr:housenumber'] ? e['addr:housenumber'] : ''} ${
                e['addr:housename'] ? e['addr:housename'] : ''
              } ${e['addr:street'] ? e['addr:street'] : ''} - ${
                e['addr:postcode'] ? e['addr:postcode'] : ''
              } ${e['addr:city'] ? e['addr:city'] : ''}`}
          </p>
          {website ? (
            <p className={styles.row}>
              <LanguageIcon />
              <a href={website}>{website}</a>
            </p>
          ) : (
            ''
          )}
          {phone ? (
            <p className={styles.row}>
              <PhoneIcon />
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          ) : (
            ''
          )}
          {email ? (
            <p className={styles.row}>
              <EmailIcon />
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          ) : (
            ''
          )}
          {e['contact:facebook'] ? (
            <a href={e['contact:facebook']}>
              <FacebookIcon />
            </a>
          ) : (
            ''
          )}
          {e.wheelchair ? (
            <p className={styles.row}>
              <AccessibleIcon />
              {e.wheelchair}
            </p>
          ) : (
            ''
          )}
          <p>
            <a href={getOSMLink(e)}>See on OpenStreetMap</a> (to edit it for
            example)
          </p>
        </Popup>
      </Marker>
    );
    id += 1;
  });
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{markers}</>;
};

export default Markers;
