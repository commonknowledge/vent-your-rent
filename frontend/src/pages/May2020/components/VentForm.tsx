/** @jsx jsx */
import { jsx, Button, Input, Label, Box, Heading, Text, Flex, Grid } from 'theme-ui';
import { useField, useForm } from "react-jeff";
import { validateEmail, minLength, maxLength } from "../../../data/input";
import { useState, useEffect, useRef, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CreateVentMutation } from '../../../components/__graphql__/CreateVentMutation';
import { SIGNUP_MUTATION } from '../../../components/TakeActionBlock';
import { TextInput, LargeTextInput, CheckboxInput, Errors, FieldErrors, Checkbox } from './formElements';
import useLocalStorage from '@rehooks/local-storage'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'
import { categories } from 'emoji-mart/data/apple.json'
import { sample } from 'lodash'
import useOnClickOutside from 'use-onclickoutside'
import { VentCard } from './VentDashboard';
import gql from 'graphql-tag';

const randomEmoji = () => sample(categories.find(c => c.id === 'people')?.emojis)!

export const CREATE_VENT_MUTATION = gql`
  ${(VentCard as any).fragment}

  mutation CreateVentMutation2002(
    $caption: String!
    $firstName: String!
    $image: Upload
    $postcode: String!
    $emoji: String
  ) {
    createVent(
      caption: $caption
      firstName: $firstName
      image: $image
      postcode: $postcode
      emoji: $emoji
    ) {
      success
      vent {
        ...VentCard2020
      }
    }
  }
`;

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

  const emoji = useField<string>({ defaultValue: randomEmoji() })
  const [showPicker, setShowPicker] = useState(false)
  useEffect(() => {
    setShowPicker(false)
  }, [emoji.value, setShowPicker])
  const pickerRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(pickerRef, () => setShowPicker(false))

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
  // It's OK
  const HousingOK = useField<boolean>({ defaultValue: false })

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
        HousingOK: HousingOK.value
      }
    });
  };

  const createVent = async () => {
    const res = await createVentMutation({
      variables: {
        emoji: emoji.value,
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

  const EmojiPicker = () => (
    <Box>
      <Text sx={{ display: 'inline-block', mb: 1, fontWeight: '' }}>
        Pick an emoji for your rent vent story
      </Text>
      <Flex sx={{ position: 'relative', alignItems: 'center' }}>
        {showPicker ? (
          <Box ref={pickerRef}>
            <Picker
              set='apple'
              onSelect={e => { emoji.setValue(e?.colons!) }}
              showSkinTones
              sheetSize={64}
              perLine={8}
              title={false as any}
              include={['people']}
            />
          </Box>
        ) : (
            <Fragment>
              <Flex
                sx={{ alignItems: 'center', justifyContent: 'center', bg: 'grey', p: 2, borderRadius: 8, cursor: 'pointer', width: 50, height: 50, flexShrink: 0 }}
                onClick={() => {
                  console.log(showPicker)
                  setShowPicker(true)
                }}
              >
                <Emoji emoji={emoji.value} set='apple' size={24} />
              </Flex>
              <Text sx={{ mx: 2, fontSize: 0 }} variant='hint'>or</Text>
              <Box>
                <Text
                  sx={{
                    display: 'inline-block',
                    transition: 'all 0.1s ease',
                    p: 2,
                    my: 1,
                    borderRadius: 8,
                    // fontWeight: 'emphasis',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '1px solid grey',
                    borderColor: 'grey',
                    ':hover': {
                      border: '1px solid orangeLight',
                      borderColor: 'orangeLight',
                      bg: 'orangeLight',
                      color: 'orange',
                    }
                  }}
                  onClick={() => { emoji.setValue(randomEmoji()) }}>
                  Pick random
            </Text>
              </Box>
            </Fragment>
          )}
      </Flex>
    </Box>
  )

  return (
    <form {...form.props} onSubmit={event => {
      event.preventDefault() // Make sure you call `event.preventDefault()` on your forms!
      form.submit()
    }}>
      <div>
        <LargeTextInput
          sx={{
            color: 'black',
            my: 2,
            width: '100%',
            fontSize: 1,
            p: 3,
            // bg: 'orangeLight',
            boxShadow: '1px 1px 5px rgba(0,0,0,0.1)',
            borderWidth: 2,
            borderColor: 'orange',
          }}
          placeholder="Your renter experience"
          rows={4}
          {...caption.props}
        />
        <FieldErrors {...caption} />
      </div>
      <Text variant='hint' sx={{ fontSize: 0, my: 3 }}>
        We’ll moderate then post your <em>story</em> + <em>first name</em> + <em>rough location</em> publicly alongside others
        </Text>
      <EmojiPicker />
      <Grid columns={2} gap={2} sx={{ alignItems: 'start', my: 2 }}>
        <TextInput
          type="text"
          placeholder="First name"
          {...firstName.props}
        />
        <FieldErrors {...firstName} />
        <TextInput
          type="text"
          placeholder="Last name"
          {...lastName.props}
        />
      </Grid>
      <FieldErrors {...lastName} />
      <Box sx={{ my: 2 }}>
        <TextInput
          type="email"
          placeholder="Email"
          {...email.props}
        />
        <FieldErrors {...email} />
      </Box>
      <Box sx={{ my: 2 }}>
        <TextInput
          type="postcode"
          placeholder="Postcode"
          {...postcode.props}
        />
        <FieldErrors {...postcode} />
      </Box>


      <header sx={{ mt: 4, mb: 3 }}>
        <Heading variant='formSection'>
          Your rental situation
          </Heading>
        <Text variant='hint'>
          Select all that apply
          </Text>
      </header>

      <Text sx={{ fontWeight: 'emphasis', mt: 3, mb: 3 }}>
        How has coronavirus impacted your finances?
        </Text>
      <Box sx={{ my: 2 }}>
        <Checkbox {...FullPay.props} label="I am still on full pay" />
      </Box>
      <Box sx={{ my: 2 }}>
        <Checkbox {...IncomeFell.props} label="My income has fallen but I’m receiving support" />
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

      <Text sx={{ fontWeight: 'emphasis', mt: 3, mb: 3 }}>
        How has coronavirus affected your housing arrangement?
        </Text>
      <Box sx={{ my: 2 }}>
        <Checkbox {...RentHolidayOrReduction.props} label="My landlord has offered me a rent holiday/reduction" />
      </Box>
      <Box sx={{ my: 2 }}>
        <Checkbox {...AskedToMoveOut.props} label="I have been asked to move out" />
      </Box>
      <Box sx={{ my: 2 }}>
        <Checkbox {...CantMove.props} label="I was due to move house but now I can’t" />
      </Box>

      <Text sx={{ fontWeight: 'emphasis', mt: 3, mb: 3 }}>
        What is your living situation like?
        </Text>
      <Box sx={{ my: 2 }}>
        <Checkbox {...HousingOK.props} label="It's OK" />
      </Box>
      <Box sx={{ my: 2 }}>
        <Checkbox {...Overcrowded.props} label="My home is overcrowded" />
      </Box>
      <Box sx={{ my: 2 }}>
        <Checkbox {...UnfitToLiveIn.props} label="My home is in need of repair" />
      </Box>


      <header sx={{ mt: 4, mb: 3 }}>
        <Heading variant='formSection'>
          Further action
        </Heading>
        <Text variant='hint'>
          Generation Rent would like to keep you updated with our work and opportunities to get involved with campaigning for renters’ rights.
        </Text>
      </header>
      <div>
        <Checkbox
          label="I would like to receive emails from Generation Rent"
          {...canContact.props}
        />
      </div>
      <Text variant='hint'>If you decide later that you don’t
            want to be contacted, our emails contain an{" "}
        <a
          href="https://www.generationrent.org/unsubscribe?utm_campaign=scandal_meet_candidates&utm_medium=email&utm_source=npto"
          target="_blank"
          rel="noopener noreferrer"
        >
          easy link
            </a>{" "}
              to unsubscribe.
        </Text>
      <Box sx={{ my: 4 }}>
        <Button variant='submit' type="submit" disabled={form.submitting || (form.submitted && !form.submitErrors?.length)}>
          {form.submitting
            ? "Sending... ⏳"
            : form.submitted && !form.submitErrors?.length
              ? "You've signed ✊"
              : form?.submitErrors?.length
                ? "Try again"
                : "Submit your story"}
        </Button>
        {form.submitted && <Errors errors={form.submitErrors} />}
      </Box>
    </form>
  )
}
