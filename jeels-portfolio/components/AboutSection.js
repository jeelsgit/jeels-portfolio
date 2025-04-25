// components/AboutSection.js
import { Box, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

const AboutSection = ({ id, sectionRef }) => {
  return (
    <Box id={id} ref={sectionRef} py={20} >
       <VStack spacing={6} align="flex-start" maxWidth="container.md" mx="auto">
          <Heading as="h2" size="xl">About Me</Heading>
          <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.300')}>
            Provide a more detailed background here. Talk about your journey into your field,
            your passion for technology/design/etc., and key experiences that shaped your career.
            Mention specific areas of interest within your profession. {/* <<< REPLACE */}
          </Text>
          <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.300')}>
            You can add another paragraph discussing your work philosophy, collaboration style,
            or what kind of roles and challenges you are currently seeking.
            Remember the target audience (HR Managers). {/* <<< REPLACE */}
          </Text>
       </VStack>
    </Box>
  );
};

export default AboutSection;