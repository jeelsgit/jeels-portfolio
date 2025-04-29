// components/HomeSection.js
import { Box, Heading, Text, VStack, useColorModeValue, Button, Link as ChakraLink, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

// Accept props: mainContentRef and headerHeight
const HomeSection = ({ mainContentRef, headerHeight }) => {
  const headingColor = useColorModeValue('githubLight.link', 'githubDark.link');
  const primaryTextColor = useColorModeValue('githubLight.text', 'githubDark.text');
  const secondaryTextColor = useColorModeValue('githubLight.textSecondary', 'githubDark.textSecondary');

  // Define the click handler function
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('contact'); // Target ID
    const scrollContainer = mainContentRef?.current; // Use the ref passed via props

    if (targetElement && scrollContainer && headerHeight > 0) {
        // Calculate positions relative to viewport
        const elementRect = targetElement.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        // Calculate element's top position relative to the container's scrolled content
        const elementTopRelativeToContainer = elementRect.top - containerRect.top + scrollContainer.scrollTop;

        // Define buffer (space below header) - ADJUST AS NEEDED
        const buffer = 20;
        const scrollTarget = elementTopRelativeToContainer - (headerHeight + buffer);

        // Scroll the container
        scrollContainer.scrollTo({
            top: scrollTarget > 0 ? scrollTarget : 0, // Ensure not negative
            behavior: "smooth"
        });
    } else {
        // Fallback or error handling if elements/refs aren't ready
        console.warn("Scroll target or container not found, or header height not measured.");
        // Simple fallback: jump link (less ideal)
        // window.location.hash = '#contact';
    }

     // Update URL hash history
     if (history.pushState) {
         history.pushState(null, null, '#contact');
     } else {
         // Fallback for older browsers
         window.location.hash = '#contact';
     }
  };


  return (
    <VStack
        spacing={6}
        align={{ base: 'center', md: 'flex-start' }}
        textAlign={{ base: 'center', md: 'left' }}
        maxWidth="container.lg"
        mx="auto"
        w="full"
        py={{ base: 10, md: 0 }}
    >
        <Heading as="h1" size="2xl" color={headingColor}>
            Jeel Tandel
        </Heading>
        <Heading as="h2" size="lg" fontWeight="medium" color={primaryTextColor}>
            Computer Programming Student | Full-Stack Developer Focus
        </Heading>
        <Text fontSize="md" color={secondaryTextColor} maxW="xl">
            {/* ... your summary text ... */}
            Detail-oriented Computer Programming Student (GPA: 3.0) with hands-on experience in full-stack development (Java, Python, JavaScript),
            database management (SQL, Oracle, NoSQL), and data analytics. Seeking to leverage technical
            expertise in a dynamic role, contributing to innovative solutions and expanding knowledge in emerging technologies.
        </Text>
         {/* No NextLink needed if we handle scroll manually */}
         <Button
            // as="a" // Not needed if onClick handles everything
            colorScheme={useColorModeValue('blue', 'green')}
            size="lg"
            rightIcon={<FaArrowRight />}
            variant="solid"
            // --- Use the defined handler ---
            onClick={handleScrollToContact}
            // -----------------------------
         >
            Get In Touch
         </Button>
    </VStack>
  );
};

export default HomeSection;