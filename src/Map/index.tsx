/* eslint-disable new-cap */
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  rawGSheetData,
  convertData,
  convertDataPoint,
  DataPoint,
} from '../utils/types';
import Markers from '../Markers';
import * as cts from '../utils/constants';
import styles from './index.module.css';
import useCurrentLocation from '../utils/geolocalisation';
import { REPAIR_OPTION } from '../utils/constants';
import Header from '../Header';

type MapProps = {
  date: Date | null;
};

const Map = function ({ date }: MapProps) {
  const { giveOrRepair, object, ref } = useParams();
  const [mapData, setMapData] = useState<rawGSheetData | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const { location, locationError } = useCurrentLocation({
    timeout: 1000 * 60,
  });
  const [hasGotLocationOrError, setHasGotLocationOrError] = useState(false);

  /**
   * Set the bounds with the geolocation
   */
  useEffect(() => {
    if (location && map)
      map.setView([location.latitude, location.longitude], cts.MIN_ZOOM + 1);
  }, [location]);

  /**
   * Display the location error only an amount of time
   */
  useEffect(() => {
    if (locationError !== '') {
      setTimeout(() => {
        setHasGotLocationOrError(true);
      }, cts.LOCATION_STATUS_TIME);
    }
  }, [locationError]);

  const { isLoading, error, data } = useQuery<rawGSheetData, any>('map', () =>
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/17seANKbX3tFKlfO1fqlMpA1PIISM_GUKItTcvcpCoXw/values/data?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    ).then((res) => res.json())
  );

  if (data && data !== mapData) {
    setMapData(data);
  }

  if (error) return <div>An error has occurred: {error.message}</div>;

  function getRefData() {
    if (!mapData) return mapData;
    const dataPoints = convertData(mapData, convertDataPoint) as DataPoint[];
    return dataPoints.filter((e) =>
      giveOrRepair === REPAIR_OPTION
        ? e.repair_oneself === ref || e.repair_pro === ref
        : e.sell === ref || e.give === ref
    );
  }

  return (
    <div>
      <Header
        object={object}
        giveOrRepair={giveOrRepair}
        part={undefined}
        issue={undefined}
      />
      <MapContainer
        className={styles.main}
        center={[45.1876448, 5.7050641]}
        zoom={18}
        zoomControl={false}
        style={{ height: '93vh' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers data={getRefData()} date={date} />
      </MapContainer>
      {isLoading ? (
        <CircularProgress className={styles.progress} size="8em" />
      ) : null}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={locationError !== '' && !hasGotLocationOrError}
        autoHideDuration={cts.TOAST_DISPLAY_TIME}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Failed to get geolocation : {locationError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Map;
