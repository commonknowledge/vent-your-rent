export const getDeviceLocation = async (): Promise<Coordinates> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      reject,
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 5000
      }
    );
    setTimeout(reject, 5000);
  });
