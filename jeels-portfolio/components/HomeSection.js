// components/HomeSection.js
import { Box, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

const HomeSection = ({ id, sectionRef }) => {
  const headingColor = useColorModeValue('brand.600', 'brand.300');

  return (
    <Box id={id} ref={sectionRef} py={20} minHeight="80vh" display="flex" alignItems="center">
      <VStack spacing={4} align="flex-start" maxWidth="container.md" mx="auto">
        <Heading as="h1" size="2xl" color={headingColor}>
          Your Name {/* <<< REPLACE */}
        </Heading>
        <Heading as="h2" size="lg" fontWeight="medium">
          Your Professional Headline (e.g., Full-Stack Developer | AI Enthusiast) {/* <<< REPLACE */}
        </Heading>
        <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
          A short, engaging summary about your skills and career goals.
          Mention key technologies you work with and what you're passionate about.
          Keep it concise and impactful for HR managers. {/* <<< REPLACE */}
        </Text>
      </VStack>
    </Box>
  );
};

export default HomeSection;