import React, { Fragment } from 'react';
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import styles from './Map.module.css';
import Loader from '../components/UI/Loader';

const Map = () => {
  const center = useMemo(
    () => ({
      lat: 49.82413102441198,
      lng: 23.982057654910328,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleMarkerClick = (event) => {
    console.log(1);
  };

  if (!isLoaded) return <Loader />;

  return (
    <Fragment>
      <GoogleMap
        zoom={16}
        center={center}
        mapContainerClassName={`${styles.mapcontainer}`}
      >
        <Marker
          title={'RapidService'}
          onClick={handleMarkerClick}
          position={{
            lat: 49.82413102441198,
            lng: 23.982057654910328,
          }}
        ></Marker>
      </GoogleMap>
    </Fragment>
  );
};

export default Map;
