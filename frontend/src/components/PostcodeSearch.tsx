/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Postcode from "postcode";
import React from "react";
import { useField } from "react-jeff";
import {
  convertCoordinatesToPostcode,
  convertLocationToCoordinates
} from "../data/geo";
import { validatePostcode } from "../data/validators";
import { fontSizeMedium, buttonSecondary, smallSpacing } from "../styles";

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <input
            {...input.props}
            type="text"
            onChange={e => input.setValue(e.currentTarget.value)}
            placeholder={label}
            css={css`
              ${fontSizeMedium}
              letter-spacing: -0.04em;
              width: 100%;
              padding: 10px;
            `}
          />

          <input
            type="submit"
            disabled={(!input.dirty && !initialValue) || !input.valid}
            css={css`
              ${buttonSecondary}
              margin-top: ${smallSpacing};
            `}
            value="Search"
          />
        </div>
      </form>
    </div>
  );
};

export default PostcodeSearch;
