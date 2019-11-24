import * as React from "react";
import { validatePostcode } from "../data/validators";
import { getDeviceLocation } from "../data/device";
import {
  convertCoordinatesToPostcode,
  convertLocationToCoordinates
} from "../data/geo";
import { useField } from "react-jeff";
import Postcode from "postcode";

type PostcodeSearchType = "search" | "update";

const PostcodeSearch: React.FC<{
  initialValue?: string;
  label?: string;
  onSubmit: (postcode: string) => void;
  inputType?: PostcodeSearchType;
}> = ({
  onSubmit,
  label = "Your Location or Postcode",
  initialValue = "",
  inputType = "search"
}) => {
  const input = useField({
    defaultValue: initialValue || ""
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async () => {
    let normalized;
    if (validatePostcode(input.value.trim())) {
      normalized = new Postcode(input.value.trim()).normalise();
    } else {
      const locationCoords = await convertLocationToCoordinates(
        input.value.trim()
      );
      const formattedCoords = {
        longitude: locationCoords[0],
        latitude: locationCoords[1]
      };
      const postcode = await convertCoordinatesToPostcode(
        formattedCoords as any
      );
      normalized = new Postcode(postcode).normalise();
    }

    if (normalized) {
      onSubmit(normalized);
    }
  }, [input.valid, input.dirty, input.value, onSubmit]);

  const geolocate = React.useCallback(() => {
    (async () => {
      setLoading(true);
      try {
        const coords = await getDeviceLocation();
        const postcode = await convertCoordinatesToPostcode(coords);
        input.setValue(postcode);
        onSubmit(postcode);
      } catch (e) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [input.setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            {...input.props}
            type="text"
            onChange={e => input.setValue(e.currentTarget.value)}
            placeholder={label}
            // aria-label='label'
          />

          <input
            type="submit"
            disabled={(!input.dirty && !initialValue) || !input.valid}
            // aria-label="search"
          />
          {inputType === "search" ? "🔍" : "🚀"}
        </div>
      </form>

      <button
        onClick={geolocate}
        disabled={loading}
        // aria-label="use my location"
      >
        {loading ? "Loading" : "📍"}
      </button>
    </div>
  );
};

export default PostcodeSearch;
