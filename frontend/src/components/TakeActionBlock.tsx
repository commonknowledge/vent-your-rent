/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { paddingCss, smallSpacing, fontColorWhite, fontSizeMedium, fontSizeLarge, colorOrange, colorWhite } from "../styles";
import gql from "graphql-tag";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Vent from "./Vent";
import { CreateVentMutation } from './__graphql__/CreateVentMutation';
import { useField, useForm } from "react-jeff";
import { validateEmail } from '../data/input';
import { TextInput, LargeTextInput, CheckboxInput, Form } from './Form';
import Button, { outlineButton } from './Button';

const h2CSS = css`
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 38px;
  letter-spacing: -0.03em;
  ${fontColorWhite}
  margin: 0;
`;

const readTheManifestoLinkCss = css`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  text-decoration-line: underline;
  text-transform: uppercase;
`;

const inputCss = css`
  padding: 10px;
  border-radius: 6px;
`;

const buttonCss = css`
  ${inputCss}
  ${outlineButton}
  font-family: "Rubik Mono One", sans-serif;
  text-transform: uppercase;
`;

const inputFieldCss = css`
  ${inputCss}
  border: none;
  background: #ffffff;
  margin-bottom: ${smallSpacing};
  height: 45px;
  width: 100%;
  ${fontSizeMedium};
`;

const textAreaCss = css`
  ${inputCss}
  border: none;
  background: #ffffff;
  width: 100%;
  height: 150px;
  margin-bottom: ${smallSpacing};
  ${fontSizeMedium};
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
      $firstName:String!
      $lastName: String!
      $postcode: String!
      $email: String!
      $canContact: Boolean
  ) {
    signup(input:{
      firstName: $firstName
      lastName: $lastName
      postcode: $postcode
      email: $email
      canContact: $canContact
    }) {
      signup {
        id
      }
    }
  }
`;

const CREATE_VENT_MUTATION = gql`
  ${Vent.fragment}

  mutation CreateVentMutation(
    $caption: String!
    $firstName: String!
    $image: Upload
    $postcode: String!
  ) {
    createVent(
      caption: $caption
      firstName: $firstName
      image: $image
      postcode: $postcode
    ) {
      success
      vent {
        ...VentCard
      }
    }
  }
`;

function TakeActionBlock({ postcode, onSubmit }: { postcode: string, onSubmit: () => void }) {
  // Signup
  const firstName = useField<string>({ defaultValue: "", required: true });
  const lastName = useField<string>({ defaultValue: "", required: true });
  const email = useField<string>({ defaultValue: "", required: true, validations: [validateEmail] });
  const canContact = useField<boolean>({ defaultValue: false });
  // Vent
  const caption = useField<string>({ defaultValue: "" });
  const [image, setImage] = useState<File>();

  let form = useForm({
    fields: [firstName, lastName, caption, email, canContact],
    // @ts-ignore
    onSubmit: async () => {
      if (form.valid) {
        const cmds = [signup]
        if (image || caption.value) {
          cmds.push(createVent)
        }
        await Promise.all(cmds.map(c => c()))
        onSubmit()
      } else {
        throw new Error("Not valid")
      }
    }
  })

  const [signupMutation, signupState] = useMutation<CreateVentMutation>(SIGNUP_MUTATION);
  const [createVentMutation, createVentState] = useMutation<CreateVentMutation>(CREATE_VENT_MUTATION);

  const signup = () => {
    signupMutation({
      variables: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        canContact: canContact.value,
        postcode,
      }
    })
  }

  const createVent = () => {
    createVentMutation({
      variables: {
        caption: caption.value,
        firstName: firstName.value,
        image,
        postcode
      }
    })
  }

  return (
    <div
      css={css`
        background: #353535;
        ${fontColorWhite}
        padding-top: 30px;
        padding-bottom: 30px;
        font-size: 21px;
        line-height: 25px;
        letter-spacing: -0.04em;
        ${paddingCss}
      `}
    >
      <h2 css={h2CSS}>Take action</h2>
      <p
        css={css`
          font-family: Rubik;
          font-style: normal;
          font-weight: normal;
          font-size: 21px;
          line-height: 25px;
          letter-spacing: -0.04em;
          ${fontColorWhite}
        `}
      >
        We’re in a renting crisis, but no one is talking about it. We want to
        show all parties at this election that renters are a political force.
      </p>
      <p css={readTheManifestoLinkCss}>
        <a
          href="https://www.rentermanifesto.org/read_the_manifesto_full"
          target="_blank"
          rel="noopener noreferrer"
          css={css`
            ${fontColorWhite}
          `}
        >
          Read the full manifesto
        </a>
      </p>
      <Form {...form.props}>
        <div>
          <TextInput type='text' placeholder="First name" css={inputFieldCss} {...firstName.props} />
          <TextInput type='text' placeholder="Last name" css={inputFieldCss} {...lastName.props} />
          <TextInput type='email' placeholder="Email" css={inputFieldCss} {...email.props} />
        </div>
        <div>
          <p>Share your worst rental experience</p>
          <LargeTextInput placeholder="Your story here" css={textAreaCss} {...caption.props} />
        </div>
        <div
          css={css`
            button {
              margin-bottom: ${smallSpacing};
              font-style: normal;
              font-weight: 900;
              font-size: 16px;
              line-height: 19px;
            }
          `}
        >
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            onChange={({ target: { validity, files } }) => {
              if (validity.valid && files && files.length > 0) {
                setImage(files[0]);
              }
            }}
            css={css`
              width: 100%;
              text-align: center;
              ${buttonCss}
            `}
          />
        </div>
        <div css={css`margin: 10px 0;`}>
          <CheckboxInput id='keep-updated' type="checkbox" {...canContact.props} css={css`
            -webkit-appearance: none;
            -moz-appearance: none;
            vertical-align: middle;
            width: 28px; 
            height: 28px;
            font-size: 28px;
            ${buttonCss}

            &:checked {
              background: ${colorOrange}
            }
          `} />
          <label htmlFor='keep-updated' css={css`margin-left: 8px;`}>Keep me updated</label>
          <p
            css={css`
              font-style: normal;
              font-weight: normal;
              font-size: 14px;
              line-height: 17px;
            `}
          >
            By checking this box, you agree that Generation Rent can email you
            occasionally about campaigns. If you decide later that you don’t
            want to be contacted, then{" "}
            <a
              href="https://www.generationrent.org/unsubscribe?utm_campaign=scandal_meet_candidates&utm_medium=email&utm_source=npto"
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                ${fontColorWhite}
              `}
            >
              click here to unsubscribe
            </a>
            .
          </p>
        </div>
        <Button type="submit" disabled={form.submitting || form.submitted}>
          {form.submitting ? "Sending... ⏳" :
            form.submitted ? "You've signed ✊" :
              form.submitErrors.length ? "Something went wrong" :
                "Add Your Voice"
          }
        </Button>
      </Form>
    </div >
  );
}

export default TakeActionBlock;
