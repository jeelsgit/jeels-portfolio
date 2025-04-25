// components/ContactSection.js
import { Box, Heading, VStack, Text, Link, HStack, Icon, useColorModeValue, Button } from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

// --- REPLACE WITH YOUR DETAILS ---
const contactDetails = {
  email: 'your.email@example.com',
  linkedin: 'https://linkedin.com/in/yourusername',
  github: 'https://github.com/yourusername',
  // Add other relevant links (e.g., Twitter, personal website)
};
// --- END OF DETAILS ---

const ContactSection = ({ id, sectionRef }) => {
  const iconColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box id={id} ref={sectionRef} py={20}>
      <VStack spacing={8} align="center" maxWidth="container.md" mx="auto" textAlign="center">
        <Heading as="h2" size="xl">Get In Touch</Heading>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
        </Text>

        {/* Option 1: Direct Links */}
        <VStack spacing={4} align="stretch" width={{ base: '80%', md: '50%' }}>
           <Button
              as={Link}
              href={`mailto:${contactDetails.email}`}
              leftIcon={<Icon as={FaEnvelope} />}
              colorScheme="blue" // Or your brand color
              variant="solid"
              size="lg"
              isExternal
            >
              Email Me
            </Button>

           <HStack spacing={4} justify="center" pt={4}>
              <Link href={contactDetails.linkedin} isExternal>
                <Icon as={FaLinkedin} w={8} h={8} color={iconColor} _hover={{ color: useColorModeValue('blue.500', 'blue.300') }} />
              </Link>
              <Link href={contactDetails.github} isExternal>
                <Icon as={FaGithub} w={8} h={8} color={iconColor} _hover={{ color: useColorModeValue('black', 'white') }} />
              </Link>
              {/* Add other social icons here */}
           </HStack>
        </VStack>

         {/* Option 2: Simple Contact Info (if you prefer not to have a big button) */}
         {/* <VStack spacing={3} align="center">
             <HStack>
                <Icon as={FaEnvelope} color={iconColor} />
                <Link href={`mailto:${contactDetails.email}`} isExternal>
                    {contactDetails.email}
                </Link>
             </HStack>
             <HStack>
                 <Icon as={FaLinkedin} color={iconColor} />
                 <Link href={contactDetails.linkedin} isExternal>
                    LinkedIn Profile
                 </Link>
             </HStack>
              <HStack>
                 <Icon as={FaGithub} color={iconColor} />
                 <Link href={contactDetails.github} isExternal>
                    GitHub Profile
                 </Link>
             </HStack>
         </VStack> */}

      </VStack>
    </Box>
  );
};

export default ContactSection;