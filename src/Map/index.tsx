/* eslint-disable new-cap */
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DataPoint } from '../utils/types';
import Markers from '../Markers';
import * as cts from '../utils/constants';
import styles from './index.module.css';
import useCurrentLocation from '../utils/geolocalisation';

type MapProps = {
  date: Date | null;
};

const Map = function ({ date }: MapProps) {
  const [mapData, setMapData] = useState<DataPoint[] | null>(null);
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

  const { isLoading, error, data } = useQuery<DataPoint[], any>(
    'data.json',
    () => fetch('data.json').then((res) => res.json())
  );

  if (data && data !== mapData) {
    setMapData(data);
  }

  if (error) return <div>An error has occurred: {error.message}</div>;

  // TODO Avoid calling overpass when clicking on a marker near the border

  return (
    <>
      <MapContainer
        className={styles.main}
        center={[45.1876448, 5.7050641]}
        zoom={18}
        zoomControl={false}
        style={{ height: '100vh' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers data={mapData} date={date} />
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
    </>
  );
};

export default Map;
