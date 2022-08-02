import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
  colors: {
    gray: {
      700: '#1f2733',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.100', 'gray.800')(props),
        fontFamily: 'Nunito, sans-serif',
      },
      html: {
        fontFamily: 'Nunito, sans-serif',
      },
    }),
  },
};
