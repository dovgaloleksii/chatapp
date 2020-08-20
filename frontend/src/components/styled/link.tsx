import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const LinkBehavior = React.forwardRef<never, Omit<RouterLinkProps, 'to'>>((props, ref) => (
  <RouterLink ref={ref} to={props.href || ''} {...props} />
));
