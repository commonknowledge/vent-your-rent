import * as React from 'react'
import { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import { Field } from 'react-jeff'

export function TextInput({ onChange, ...props }: Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange'
> & Partial<Field<string>> & { onChange: (v: any) => void }) {
    return (
        <input {...props} onChange={event => onChange(event.currentTarget.value)} />
    )
}

export function LargeTextInput({ onChange, ...props }: Omit<
    DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    'onChange'
> & Partial<Field<string>> & { onChange: (v: any) => void }) {
    return (
        <textarea {...props} onChange={event => onChange(event.currentTarget.value)} />
    )
}

export const CheckboxInput: React.FC<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value' | 'onChange'> & Partial<Field<boolean>> & {
    onChange(v: boolean): void
}> = ({ onChange, value, ...props }) => (
    <input type='checkbox' {...props} checked={value} onChange={event => onChange(event.currentTarget.checked)} />
)

export function Form({ onSubmit, ...props }: any) {
    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                onSubmit()
            }}
            {...props}
        />
    )
}