// components/HomeSection.js
import { Box, Heading, Text, VStack, useColorModeValue, Button, Link as ChakraLink, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa'; // Or another suitable icon

const HomeSection = () => {
  const headingColor = useColorModeValue('githubLight.link', 'githubDark.link');
  const primaryTextColor = useColorModeValue('githubLight.text', 'githubDark.text');
  const secondaryTextColor = useColorModeValue('githubLight.textSecondary', 'githubDark.textSecondary');

  return (
    // Use minHeight to ensure it takes significant space, align content center vertically
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="calc(80vh - 60px)" textAlign={{ base: 'center', md: 'left' }}>
        <VStack
            spacing={6}
            align={{ base: 'center', md: 'flex-start' }}
            maxWidth="container.lg" // Consistent width
            mx="auto"
        >
            <Heading as="h1" size="2xl" color={headingColor}>
             Jeel Tandel
            </Heading>
            <Heading as="h2" size="lg" fontWeight="medium" color={primaryTextColor}>
              Computer Programming Student | Full-Stack Developer Focus
            </Heading>
            <Text fontSize="md" color={secondaryTextColor} maxW="xl">
                Detail-oriented Computer Programming Student (GPA: 3.0) with hands-on experience in full-stack development (Java, Python, JavaScript),
                database management (SQL, Oracle, NoSQL), and data analytics. Seeking to leverage technical
                expertise in a dynamic role, contributing to innovative solutions and expanding knowledge in emerging technologies.
            </Text>
             {/* Optional: Call to Action */}
             <NextLink href="#contact" passHref legacyBehavior>
                <Button
                    as="a" // Render as an anchor tag
                    colorScheme={useColorModeValue('blue', 'green')} // Match theme button primary color logic
                    size="lg"
                    rightIcon={<FaArrowRight />}
                    variant="solid" // Use solid variant styled in theme
                    onClick={(e) => { // Smooth scroll for anchor link
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start'});
                        if (history.pushState) { history.pushState(null, null, '#contact'); }
                        else { window.location.hash = '#contact'; }
                    }}
                >
                    Get In Touch
                </Button>
             </NextLink>
        </VStack>
    </Box>
  );
};

export default HomeSection;