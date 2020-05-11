/** @jsx jsx */
import { jsx, Button, Input, Label, Box, Heading, Text } from 'theme-ui';
import { useField, useForm } from "react-jeff";
import { validateEmail, minLength, maxLength } from "../../../data/input";
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CreateVentMutation } from '../../../components/__graphql__/CreateVentMutation';
import { CREATE_VENT_MUTATION, SIGNUP_MUTATION } from '../../../components/TakeActionBlock';
import { TextInput, LargeTextInput, CheckboxInput, Errors, FieldErrors, Checkbox } from './formElements';
import useLocalStorage from '@rehooks/local-storage'

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
  const IncomeFell = useField<boolean>({ defaultValue: false })
  // I am still on full pay
  const FullPay = useField<boolean>({ defaultValue: false })
  // I am not eligible for Universal Credit
  const CannotGetUC = useField<boolean>({ defaultValue: false })
  // I am not eligible to have 80% of my income paid by the government
  const CannotGetFurlough = useField<boolean>({ defaultValue: false })
  // Universal Credit/housing benefit won't cover my rent
  const UCDoesntCoverRent = useField<boolean>({ defaultValue: false })
  // I have been asked to move out
  const AskedToMoveOut = useField<boolean>({ defaultValue: false })
  // My landlord has offered me a rent holiday/reduction
  const RentHolidayOrReduction = useField<boolean>({ defaultValue: false })
  // I've started a new tenancy but now can't move
  const CantMove = useField<boolean>({ defaultValue: false })
  // My home is overcrowded
  const Overcrowded = useField<boolean>({ defaultValue: false })
  // My home is unfit to live in
  const UnfitToLiveIn = useField<boolean>({ defaultValue: false })

  // Vent
  const caption = useField<string>({ defaultValue: "" });
  const [image, setImage] = useState<File>();

  const onSubmit = async () => {
    const errors: string[] = []
    try {
      if (form.valid) {
        const cmds: Array<() => Promise<any>> = [signup];
        if (image || caption.value) {
          cmds.push(createVent);
        }
        try {
          await Promise.all(cmds.map(async c => c()));
        } catch (e) {
          errors.push("There was a problem saving your submission. Please refresh and try again?")
        }
      } else {
        errors.push("Go back over the form and add any missing details")
      }
    } catch (e) {
      errors.push(e.toString())
    }
    if (!errors?.length) {
      return setTimeout(() => {
        return onSubmitSuccess();
      }, 750)
    }
    return errors
  }

  let form = useForm({
    fields: [firstName, lastName, caption, email, postcode, canContact],
    // @ts-ignore
    onSubmit
  });

  const [ventIds, setVentIds] = useLocalStorage<Array<number | string>>('VENT_YOUR_RENT_VENT_IDS', [])

  const [signupMutation] = useMutation<CreateVentMutation>(SIGNUP_MUTATION);
  const [createVentMutation] = useMutation<CreateVentMutation>(
    CREATE_VENT_MUTATION
  );

  const signup = async () => {
    return signupMutation({
      variables: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        canContact: canContact.value,
        postcode: postcode.value,
        IncomeFell: IncomeFell.value,
        FullPay: FullPay.value,
        CannotGetUC: CannotGetUC.value,
        CannotGetFurlough: CannotGetFurlough.value,
        UCDoesntCoverRent: UCDoesntCoverRent.value,
        AskedToMoveOut: AskedToMoveOut.value,
        RentHolidayOrReduction: RentHolidayOrReduction.value,
        CantMove: CantMove.value,
        Overcrowded: Overcrowded.value,
        UnfitToLiveIn: UnfitToLiveIn.value,
      }
    });
  };

  const createVent = async () => {
    const res = await createVentMutation({
      variables: {
        caption: caption.value,
        firstName: firstName.value,
        image,
        postcode: postcode.value
      }
    });
    if (res?.data?.createVent?.vent) {
      setVentIds(ventIds.concat([res.data.createVent.vent.id]))
    }
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

        <Text sx={{ fontWeight: 'emphasis', mt: 4, mb: 3 }}>
          How has coronavirus impacted your finances?
        </Text>
        <Box sx={{ my: 2 }}>
          <Checkbox {...IncomeFell.props} label="My income has fallen as a result of the pandemic" />
        </Box>
        <Box sx={{ my: 2 }}>
          <Checkbox {...FullPay.props} label="I am still on full pay" />
        </Box>
        <Box sx={{ my: 2 }}>
          <Checkbox {...CannotGetUC.props} label="I am not eligible for Universal Credit" />
        </Box>
        <Box sx={{ my: 2 }}>
          <Checkbox {...CannotGetFurlough.props} label="I am not eligible to have 80% of my income paid by the government" />
        </Box>
        <Box sx={{ my: 2 }}>
          <Checkbox {...UCDoesntCoverRent.props} label="Universal Credit/housing benefit won't cover my rent" />
        </Box>

        <Text sx={{ fontWeight: 'emphasis', mt: 4, mb: 3 }}>
          How has coronavirus affected your housing arrangement?
        </Text>
        <Box sx={{ my: 2 }}>
          <Checkbox {...AskedToMoveOut.props} label="I have been asked to move out" />
        </Box>
        <Box sx={{ my: 2 }}>
          <Checkbox {...RentHolidayOrReduction.props} label="My landlord has offered me a rent holiday/reduction" />
        </Box>
        <Box sx={{ my: 2 }}>
          <Checkbox {...CantMove.props} label="I've started a new tenancy but now can't move" />
        </Box>

        <Text sx={{ fontWeight: 'emphasis', mt: 4, mb: 3 }}>
          What is your living situation like?
        </Text>
        <Box sx={{ my: 2 }}>
          <Checkbox {...Overcrowded.props} label="My home is overcrowded" />
        </Box>
        <Box sx={{ my: 2 }}>
          <Checkbox {...UnfitToLiveIn.props} label="My home is unfit to live in" />
        </Box>

        {/*  */}
        <header sx={{ mt: 4, mb: 3 }}>
          <Heading variant='formSection'>
            Your details
          </Heading>
        </header>
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

      <header sx={{ mt: 4, mb: 3 }}>
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
          I would like to receive emails from Generation Rent
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
      <Button type="submit" disabled={form.submitting || (form.submitted && !form.submitErrors?.length)}>
        {form.submitting
          ? "Sending... ⏳"
          : form.submitted && !form.submitErrors?.length
            ? "You've signed ✊"
            : form?.submitErrors?.length
              ? "Try again"
              : "Add Your Voice"}
      </Button>
      {form.submitted && <Errors errors={form.submitErrors} />}
    </form>
  )
}

