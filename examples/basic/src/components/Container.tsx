import { Box, Flex, FlexProps, useColorMode } from '@chakra-ui/react'
import React from 'react'

import { DarkModeSwitch } from './DarkModeSwitch'

export const Container = ({ children, ...props }: FlexProps) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }

  return (
    <Flex
      direction="column"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    >
      <DarkModeSwitch />
      <Box maxW="640px" m="auto">
        {children}
      </Box>
    </Flex>
  )
}
