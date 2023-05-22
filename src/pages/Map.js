import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import styles from './Map.module.css';
import Loader from '../components/UI/Loader';
import { defaultTheme, newYorkTheme } from './ThemeMap';
import CurrentLocationMarker from '../components/comments/CurrentLocationMarker';

const defaultOptionsMap = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  styles: newYorkTheme,
};

const libraries = ['places'];

const Map = () => {
  const mapRef = useRef(undefined);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const zoom = width < 768 ? 15 : 16;

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);
  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const center = useMemo(
    () => ({
      lat: 49.82413,
      lng: 23.982449,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleMarkerClick = (event) => {};

  if (!isLoaded) return <Loader />;

  return (
    <Fragment>
      <GoogleMap
        options={defaultOptionsMap}
        zoom={zoom}
        center={center}
        mapContainerClassName={`${styles.mapcontainer}`}
        libraries={libraries}
      >
        <CurrentLocationMarker position={center} />
      </GoogleMap>
    </Fragment>
  );
};

export default Map;
