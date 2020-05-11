/** @jsx jsx */
import { jsx, Button, Input, Label, Box, Heading, Text } from 'theme-ui';
import { useField, useForm } from "react-jeff";
import { validateEmail, minLength, maxLength } from "../../../data/input";
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CreateVentMutation } from '../../../components/__graphql__/CreateVentMutation';
import { CREATE_VENT_MUTATION, SIGNUP_MUTATION } from '../../../components/TakeActionBlock';
import { TextInput, LargeTextInput, CheckboxInput, Errors, FieldErrors } from './formElements';

export function VentForm({
  onSubmitSuccess
}: {
  onSubmitSuccess: () => void;
}) {
  // Signup
  // @ts-ignore
  const firstName = useField<string>({ defaultValue: "", required: true });
  const lastName = useField<string>({ defaultValue: "", required: true });
  const email = useField<string>({
    defaultValue: "",
    required: true,
    validations: [validateEmail]
  });
  const postcode = useField<string>({
    defaultValue: "",
    required: true,
    validations: [minLength(4), maxLength(10)]
  });
  const canContact = useField<boolean>({ defaultValue: false });

  // My income has fallen as a result of the pandemic
  const tagIncomeFell = useField<boolean>({ defaultValue: false })
  // I am still on full pay
  const tagFullPay = useField<boolean>({ defaultValue: false })
  // I am not eligible for Universal Credit
  const tagCannotGetUC = useField<boolean>({ defaultValue: false })
  // I am not eligible to have 80% of my income paid by the government
  const tagCannotGetFurlough = useField<boolean>({ defaultValue: false })
  // Universal Credit/housing benefit won't cover my rent
  const tagUCDoesntCoverRent = useField<boolean>({ defaultValue: false })
  // I have been asked to move out
  const tagAskedToMoveOut = useField<boolean>({ defaultValue: false })
  // My landlord has offered me a rent holiday/reduction
  const tagRentHolidayOrReduction = useField<boolean>({ defaultValue: false })
  // I've started a new tenancy but now can't move
  const tagCantMove = useField<boolean>({ defaultValue: false })
  // My home is overcrowded
  const tagOvercrowded = useField<boolean>({ defaultValue: false })
  // My home is unfit to live in
  const tagUnfitToLiveIn = useField<boolean>({ defaultValue: false })

  // Vent
  const caption = useField<string>({ defaultValue: "" });
  const [image, setImage] = useState<File>();

  const onSubmit = async () => {
    const errors: string[] = []
    try {
      if (form.valid) {
        const cmds = [signup];
        if (image || caption.value) {
          cmds.push(createVent);
        }
        try {
          await Promise.all(cmds.map(c => c()));
          onSubmitSuccess();
        } catch (e) {
          errors.push("There was a problem saving your submission. Please refresh and try again?")
        }
      } else {
        errors.push("Form isn't valid")
      }
    } catch (e) {
      errors.push(e.toString())
    }
    return errors
  }

  let form = useForm({
    fields: [firstName, lastName, caption, email, postcode, canContact],
    // @ts-ignore
    onSubmit
  });

  const [signupMutation] = useMutation<CreateVentMutation>(SIGNUP_MUTATION);
  const [createVentMutation] = useMutation<CreateVentMutation>(
    CREATE_VENT_MUTATION
  );

  const signup = () => {
    signupMutation({
      variables: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        canContact: canContact.value,
        postcode: postcode.value
      }
    });
  };

  const createVent = () => {
    createVentMutation({
      variables: {
        caption: caption.value,
        firstName: firstName.value,
        image,
        postcode: postcode.value
      }
    });
  };

  return (
    <form {...form.props} onSubmit={event => {
      event.preventDefault() // Make sure you call `event.preventDefault()` on your forms!
      form.submit()
    }}>
      <div>
        <header>
          <Heading variant='formSection'>
            Your rental situation
          </Heading>
          <Text variant='hint'>
            Select all that apply
          </Text>
        </header>

        {/*  */}
        <Heading variant='formSection'>
          Your details
        </Heading>
        <TextInput
          sx={{ my: 2 }}
          type="text"
          placeholder="First name"
          {...firstName.props}
        />
        <FieldErrors {...firstName} />
        <TextInput
          sx={{ my: 2 }}
          type="text"
          placeholder="Last name"
          {...lastName.props}
        />
        <FieldErrors {...lastName} />
        <TextInput
          sx={{ my: 2 }}
          type="email"
          placeholder="Email"
          {...email.props}
        />
        <FieldErrors {...email} />
        <TextInput
          sx={{ my: 2 }}
          type="postcode"
          placeholder="Postcode"
          {...postcode.props}
        />
        <FieldErrors {...postcode} />
      </div>
      <div>
        <p>Share your worst rental experience</p>
        <LargeTextInput
          sx={{ my: 2 }}
          placeholder="Your story here"
          {...caption.props}
        />
        <FieldErrors {...caption} />
      </div>
      <div>
        <Input
          sx={{ my: 2 }}
          type="file"
          name="image"
          accept=".jpg,.jpeg,.png"
          onChange={({ target: { validity, files } }) => {
            if (validity.valid && files && files.length > 0) {
              setImage(files[0]);
            }
          }}
        />
      </div>

      <header sx={{ my: 3 }}>
        <Heading variant='formSection'>
          Further action
        </Heading>
        <Text variant='hint'>
          Generation Rent would like to keep you updated with our work and opportunities to get involved with campaigning for renters’ rights.
        </Text>
      </header>
      <div>
        <CheckboxInput
          id="keep-updated"
          type="checkbox"
          {...canContact.props}
        />
        <Label
          sx={{ width: 'auto', display: 'inline-flex', cursor: 'pointer' }}
          htmlFor="keep-updated"
        >
          Keep me updated
          </Label>
        <p>
          By checking this box, you agree that Generation Rent can email you
          occasionally about campaigns. If you decide later that you don’t
            want to be contacted, our emails contain an{" "}
          <a
            href="https://www.generationrent.org/unsubscribe?utm_campaign=scandal_meet_candidates&utm_medium=email&utm_source=npto"
            target="_blank"
            rel="noopener noreferrer"
          >
            easy link
            </a>{" "}
              to unsubscribe.
          </p>
      </div>
      <Button type="submit" disabled={form.submitting || form.submitted}>
        {form.submitting
          ? "Sending... ⏳"
          : form.submitted
            ? "You've signed ✊"
            : form.submitErrors.length
              ? "Something went wrong"
              : "Add Your Voice"}
      </Button>
      {form.submitted && <Errors errors={form.submitErrors} />}
    </form>
  )
}

