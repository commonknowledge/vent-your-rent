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
    10, 14, 24, 100
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
      textDecoration: 'none'
    }
  },
  buttons: {
    primary: {
      cursor: 'pointer'
    }
  },
  forms: {
    checkbox: {
      position: 'relative',
      cursor: 'pointer',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      'vertical-align': 'middle',
      'background': 'white',
      'border': '1px solid black',
      'width': '30px',
      'height': '30px',
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
        bg: 'black',
        'border-radius': '20%',
        // 'transform': 'translate(0, 0)',
        top: '12.5%',
        left: '12.5%',
        position: 'absolute',
        'height': '75%',
        'width': '75%',
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
      fontSize: 1,
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
