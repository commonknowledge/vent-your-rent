import * as React from "react";
import { useSpring, animated } from "react-spring";
import { SpringProps } from "react-spring/renderprops";

type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;

export const SpringUp = React.forwardRef<
  SpringProps,
  GetComponentProps<typeof animated.div> & {
    spring?: Partial<SpringProps>;
    from?: any;
    to?: any;
  }
>(
  (
    { style = {}, from = {}, to = {}, spring: springProps = {}, ...props },
    ref
  ) => {
    const spring = useSpring({
      from: { transform: `translate3d(0, 10px, 0)`, opacity: 0, ...from },
      to: { transform: `translate3d(0, 0, 0)`, opacity: 1, ...to },
      ...springProps,
      ref
    } as any);

    return <animated.div {...props} style={{ ...spring, ...style }} />;
  }
);
