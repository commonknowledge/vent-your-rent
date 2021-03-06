/** @jsx jsx */
import { jsx, Box, Textarea, Input, InputProps, TextareaProps, Label, Flex } from 'theme-ui';
import { Field } from 'react-jeff'
import { PropsWithoutRef } from 'react';

export function TextInput({ onChange, ...props }:
  Omit<PropsWithoutRef<InputProps>, 'onChange'>
  & Partial<Field<string>>
  & { onChange: (v: any) => void }
) {
  return (
    <Input {...props} onChange={event => onChange(event.currentTarget.value)} />
  )
}

export function LargeTextInput({ onChange, ...props }:
  Omit<PropsWithoutRef<TextareaProps>, 'onChange'>
  & Partial<Field<string>>
  & { onChange: (v: any) => void }
) {
  return (
    <Textarea sx={{ font: 'inherit', width: '100%' }} {...props} onChange={event => onChange(event.currentTarget.value)} />
  )
}

export const CheckboxInput: React.FC<
  Omit<PropsWithoutRef<InputProps>, 'value' | 'onChange'>
  & Partial<Field<boolean>>
  & { onChange: (v: any) => void }
> = ({ onChange, value, ...props }) => (
  <Input variant='checkbox' type='checkbox' {...props} checked={value} onChange={event => onChange(event.currentTarget.checked)} />
)

export const Checkbox: React.FC<
  Omit<PropsWithoutRef<InputProps>, 'value' | 'onChange'>
  & Partial<Field<boolean>> & {
    onChange: (v: any) => void
    label: string
  }
> = ({ label, ...props }) => (
  <Flex sx={{ variant: 'forms.container' }}>
    <CheckboxInput
      id={`form-checkbox-input-${label}`}
      type="checkbox"
      {...props}
    />
    <Label
      sx={{ width: 'auto', display: 'inline-flex', cursor: 'pointer' }}
      htmlFor={`form-checkbox-input-${label}`}
    >
      {label}
    </Label>
  </Flex>
)


export function FieldErrors({ errors, touched, focused, ...props }: Field<any, string>) {
  return touched && !focused ? (
    <Errors errors={errors} />
  ) : null
}

export const Errors: React.FC<{
  errors: string[]
}> = ({ errors }) => {
  return errors?.length ? (
    <Box as="ul" sx={{
      my: 2,
      p: 2,
      bg: 'pink',
      borderRadius: 4
    }}>
      {errors.map((error) => {
        return (
          <Box as='li' key={error} sx={{
            listStyle: 'none',
            '& + &': {
              mt: 2
            },
            color: 'red'
          }}>{error}</Box>
        )
      })}
    </Box>
  ) : null
}
