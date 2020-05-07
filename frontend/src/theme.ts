export default {
  fonts: {
    body: 'Rubik, sans-serif',
    heading: 'Rubik, sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    orange: '#FF974B',
    orangeLight: '#FFEBD8',
    grey: '#F0F0F0',
    white: '#FFF',
    text: '#353535',
    textLight: '#949494',
    black: '#000000'
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
    small: {
      fontSize: 0,
      color: 'text',
    },
    bold: {
      fontWeight: 'bold'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      letterSpacing: 'body',
      color: 'text',
    }
  }
}
