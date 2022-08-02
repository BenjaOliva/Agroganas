# Getting Started

All of the components in Chakra UI are designed for Chakra UI v1.0+<br>
In some components we use `react-icons` to pep up the visual appearance. Feel free to replace them with your own icons.

## Dependencies

The following dependencies were used for this component:

| Name             | Version |
| ---------------- | ------- |
| @chakra-ui/react | 1.8.1   |
| @emotion/react   | 11.7.1  |
| @emotion/styled  | 11.6.0  |
| framer-motion    | 6.2.3   |

All dependencies are updated regularly and the components are adjusted if necessary.
If you have issues with a component, please make sure your dependencies match the versions here.

## Setup Chakra UI

Inside your project directory, install Chakra UI by running either of the following:

```sh
# npm
$ npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion react-icons
```

```sh
# yarn
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion react-icons
```

For Chakra UI to work correctly, you need to setup the ChakraProvider at the root of your application.

```tsx
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

export const App = () => {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )
}
```

If you need more help, feel free to visit the [official website](https://chakra-ui.com) of Chakra UI. Here you can find help with installation, theming and much more.
