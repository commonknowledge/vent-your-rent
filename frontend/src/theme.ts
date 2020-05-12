import { Theme } from "theme-ui";

const colors = {
  orange: '#FF974B',
  orangeLight: '#FFEBD8',
  grey: '#F0F0F0',
  text: '#353535',
  textLight: '#949494',
  white: '#FFF',
  black: '#000000',
  pink: '#ffe4e9'
}

const theme: Theme = {
  fonts: {
    body: 'Rubik, sans-serif',
    heading: 'Rubik, sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    ...colors,
    primary: colors.orange,
    background: colors.white,
  },
  fontSizes: [
    '0.9rem', '1rem', '1.7rem', '7rem'
  ],
  lineHeights: {
    body: 1.2,
    heading: 1.1
  },
  letterSpacings: {
    body: '-0.02em',
    heading: '-0.04em',
  },
  fontWeights: {
    body: 400,
    heading: 500,
    emphasis: 500,
    bold: 700
  },
  // @ts-ignore
  text: {
    // variants
    heading: {
      color: 'text',
      fontSize: 2,
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      letterSpacing: 'heading'
    },
    subheading: {
      variant: 'heading',
      fontSize: 1,
      fontWeight: 'bold'
    },
    label: {
      variant: 'heading',
      fontSize: 1,
      fontWeight: 500
    },
    formSection: {
      fontSize: 1,
      fontWeight: 500,
      borderTop: '2px solid black',
      pt: 2,
      my: 2,
    },
    para: {
      fontSize: 1,
      my: 3,
    },
    hint: {
      fontSize: 1,
      color: 'textLight',
    },
    link: {
      color: 'orange',
      textDecoration: 'none',
      bold: {
        display: 'inline-block',
        textTransform: 'uppercase',
        fontWeight: 'emphasis',
        color: 'black',
        borderBottom: '2px solid black',
        borderColor: 'orange'
      }
    },
  },
  // @ts-ignore
  buttons: {
    primary: {
      cursor: 'pointer'
    },
    submit: {
      cursor: 'pointer',
      bg: 'text',
      color: 'white',
      width: '100%',
      p: 3,
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      transition: 'all 0.1s ease',
      ':hover': {
        opacity: 0.8
      }
    }
  },
  forms: {
    input: {
      borderColor: 'textLight'
    },
    textarea: {
      borderColor: 'textLight'
    },
    container: {
      alignItems: 'top',
      my: 2
    },
    checkbox: {
      position: 'relative',
      cursor: 'pointer',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      'vertical-align': 'middle',
      'background': 'white',
      'border': '1px solid black',
      borderColor: 'textLight',
      'width': '1rem',
      'height': '1rem',
      'border-radius': '20%',
      'display': 'inline-flex',
      'justify-content': 'center',
      'align-items': 'center',
      'flex-shrink': '0',
      'line-height': '1em',
      'margin-left': '0',
      'margin-right': '5px',
      '&:disabled': {
        'opacity': '0.25',
        'cursor': 'not-allowed',
      },
      '&:checked:after': {
        'content': '""',
        display: 'block',
        bg: 'orange',
        'border-radius': '20%',
        // 'transform': 'translate(0, 0)',
        top: '0',
        left: '0',
        position: 'absolute',
        'height': '100%',
        'width': '100%',
        'line-height': '0',
      }
    },
    radio: {
      variant: 'forms.checkbox',
      'border-radius': '100%',
      '&:checked:after': {
        variant: 'forms.checkbox.&:checked:after',
        'border-radius': '100%',
      }
    }
  },
  styles: {
    root: {
      fontSize: ['16px', '15px', '14px'],
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      letterSpacing: 'body',
      color: 'text',
      p: {
        variant: 'text.para'
      },
      b: {
        fontWeight: 'emphasis'
      },
      a: {
        variant: 'text.link'
      }
    }
  }
}

export default theme
