/* eslint-disable new-cap */
import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line camelcase
import opening_hours from 'opening_hours';
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
          <>
            <p>{o.opening_hours as string}</p>
            <p>
              {`${nextState} on ${nextChangeDate?.toDateString()} - ${nextChangeDate?.toLocaleTimeString()} (in ${nextChangeHourDiffTime.toFixed(
                0
              )} hours)`}
            </p>
          </>
        );
      } catch {
        console.error(`Invalid opening hours for ${o.type} of id ${o.id}`);
        markerIcon = getIcon('grey');
        popUpOpeningHours = <p>INVALID opening hours</p>;
      }
    } else {
      markerIcon = getIcon('grey');
      popUpOpeningHours = <p>MISSING opening hours</p>;
    }
    return [markerIcon, popUpOpeningHours];
  }

  function getOSMLink(o: DataPoint): string {
    return `https://www.openstreetmap.org/${o.type}/${o.id}`;
  }

  const markers: JSX.Element[] = [];
  let id = 0;
  data?.forEach((e) => {
    const [markerIcon, popUpOpeningHours]: [L.Icon, JSX.Element] =
      getMarkerIconAndPopUpOpeningHours(e);
    markers.push(
      <Marker
        position={[e.lat!, e.lon!]}
        key={`marker-${id}`}
        icon={markerIcon}
      >
        <Popup>
          <p>{(e.name as string) || 'UNKNOWN NAME'}</p>
          {popUpOpeningHours}
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
