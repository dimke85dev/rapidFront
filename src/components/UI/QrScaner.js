import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const QrScanner = () => {
  const videoRef = useRef();
  const scannerRef = useRef();

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            aspectRatio: { min: 1, max: 100 },
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: [
            'ean_reader',
            'upc_reader',
            'code_128_reader',
            'code_39_reader',
            'qr_reader',
          ],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
        scannerRef.current.addEventListener('detected', onDetected);
      }
    );
    return () => {
      Quagga.stop();
      scannerRef.current.removeEventListener('detected', onDetected);
    };
  }, []);

  const onDetected = (result) => {
    const qrCode = result.codeResult.code;
    console.log(qrCode);
  };

  return (
    <div>
      <video ref={videoRef} />
      <div ref={scannerRef} />
    </div>
  );
};

export default QrScanner;
