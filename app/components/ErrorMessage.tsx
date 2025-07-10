import React, { PropsWithChildren } from 'react'
import { Text } from '@radix-ui/themes';

const ErrorMessage = ({children}:PropsWithChildren) => {
  if (!children) return null; // Return null if no children are provided
  return (<Text color="red" as='p'size="2">{children}</Text>
  )
}

export default ErrorMessage