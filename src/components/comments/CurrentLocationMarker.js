import { Marker } from '@react-google-maps/api';
import React, { Fragment } from 'react';
import styles from './CurrentLocationMarker.module.css';

const CurrentLocationMarker = ({ position }) => {
  const handleMarkerClick = () => {
    const { lat, lng } = position;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.location.href = url;
    } else {
      // Открытие Google Карт в новой вкладке и построение маршрута
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url);
    }
  };

  return (
    <Fragment>
      <Marker
        onClick={handleMarkerClick}
        position={position}
        animation={window.google.maps.Animation.BOUNCE}
        title={'RapidService'}
        icon={{
          url: '../../../check.svg',
        }}
      />
    </Fragment>
  );
};

export default CurrentLocationMarker;
