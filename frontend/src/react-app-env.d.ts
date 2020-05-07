import * as React from 'react';
import { SxProps } from 'theme-ui';

declare module 'react' {
  // tslint:disable-next-line: no-empty-interface
  interface DOMAttributes<T> extends SxProps { }
}

declare global {
  namespace JSX {
    // tslint:disable-next-line: no-empty-interface
    interface IntrinsicAttributes extends SxProps { }
  }

  declare module "@use-hook/use-cookie";
}
