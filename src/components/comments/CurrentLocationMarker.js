import { Marker } from '@react-google-maps/api';
import React, { Fragment } from 'react';
import styles from './CurrentLocationMarker.module.css';

const CurrentLocationMarker = ({ position }) => {
  const handleMarkerClick = () => {
    const { lat, lng } = position;

    const isMobileAndroid =
      /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobileIos = /ios|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobileAndroid) {
      const url = `google.navigation:q=${lat},${lng}`;
      window.location.href = url;
    }
    if (isMobileIos) {
      window.open(`http://maps.apple.com/?daddr=${lat},${lng}`);
    }
    if (!isMobileAndroid && !isMobileIos) {
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
