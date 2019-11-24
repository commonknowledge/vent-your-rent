export const convertPostcodeToCoordinates = async (
  postcode: string
): Promise<[number, number]> => {
  const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
  if (!res.ok || res.status !== 200) throw new Error("Failed to get postcode");
  const data = await res.json();
  if (data.status !== 200 || !data.result) {
    throw new Error("Failed to validate postcode");
  }
  return [data.result.longitude, data.result.latitude];
};

export const convertCoordinatesToPostcode = async ({
  longitude,
  latitude
}: Coordinates): Promise<string> => {
  const res = await fetch(
    `https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}&radius=1000m&limit=1`
  );
  if (!res.ok || res.status !== 200) throw new Error("Failed to get postcode");
  const data = await res.json();
  if (
    data.status !== 200 ||
    !data.result ||
    !Array.isArray(data.result) ||
    data.result.length === 0
  )
    throw new Error("Failed to validate postcode");
  return data.result[0].postcode;
};

export const convertLocationToCoordinates = async (
  location: string
): Promise<[number, number]> => {
  const encodedLocation = encodeURIComponent(location);
  const res = await fetch(
    `https://nominatim.openstreetmap.com/search?q=${encodedLocation}&format=geojson&countrycodes=gb&limit=1&email=digital@peoplesmomentum.com`
  );
  const data = await res.json();
  if (data.features.length === 0)
    throw new Error("Failed to find co-ordinates for location");
  return data.features[0].geometry.coordinates;
};
