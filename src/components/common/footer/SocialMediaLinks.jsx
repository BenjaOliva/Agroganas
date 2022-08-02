import { ButtonGroup, IconButton } from '@chakra-ui/react';
import * as React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

export const SocialMediaLinks = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="#"
      target={'_blank'}
      aria-label="LinkedIn"
      icon={<FaInstagram fontSize="20px" />}
    />
    <IconButton
      as="a"
      target={'_blank'}
      href="#"
      aria-label="Twitter"
      icon={<FaFacebook fontSize="20px" />}
    />
    <IconButton
      as="a"
      target={'_blank'}
      href="#"
      aria-label="GitHub"
      icon={<FaEnvelope fontSize="20px" />}
    />
  </ButtonGroup>
);
