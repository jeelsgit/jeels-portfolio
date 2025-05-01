// components/HomeSection.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, useColorModeValue, Button, Icon } from '@chakra-ui/react';
import Typist from 'react-typist-component'; // Use correct library import
import { FaArrowRight } from 'react-icons/fa';

const HomeSection = ({ mainContentRef, headerHeight }) => { // Accept props again if needed for scrolling
  // Define colors explicitly for light/dark modes
  const termBg = useColorModeValue('gray.100', 'gray.900'); // Lighter dark bg for term
  const termBorder = useColorModeValue('gray.200', 'gray.700');
  const promptColor = useColorModeValue('green.600', 'green.300'); // Adjusted prompt colors
  const commandColor = useColorModeValue('gray.800', 'gray.100'); // Color for typed commands
  const outputColor = useColorModeValue('gray.800', 'gray.100'); // Color for command output
  const nameColor = useColorModeValue('blue.600', 'blue.300'); // Distinct color for name
  const headlineColor = useColorModeValue('gray.800', 'gray.100');
  const summaryColor = useColorModeValue('gray.600', 'gray.400'); // Secondary color for summary

  const [typingKey, setTypingKey] = useState(0);

  const handleScrollToContact = (e) => {
      e.preventDefault();
      const targetElement = document.getElementById('contact');
      const scrollContainer = mainContentRef?.current;

      if (targetElement && scrollContainer && headerHeight > 0) {
          const elementRect = targetElement.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementTopRelativeToContainer = elementRect.top - containerRect.top + scrollContainer.scrollTop;
          // --- ADJUST SCROLL OFFSET FOR CONTACT BUTTON ---
          const buffer = 60; // Larger buffer to center contact more
          const scrollTarget = elementTopRelativeToContainer - (headerHeight + buffer);
          // --- END ADJUSTMENT ---
          scrollContainer.scrollTo({
              top: scrollTarget > 0 ? scrollTarget : 0,
              behavior: "smooth"
          });
      } else {
          console.warn("Scroll elements not ready for contact scroll.");
          // Fallback if refs/height not ready
          const element = document.getElementById('contact');
          if(element) element.scrollIntoView({ behavior: 'smooth', block: 'center'}); // Center block fallback
      }
      if (history.pushState) { history.pushState(null, null, '#contact'); }
      else { window.location.hash = '#contact'; }
  };


  return (
    <VStack
        spacing={8} // Keep spacing between terminal and button
        align={{ base: 'center', md: 'flex-start' }}
        textAlign="left" // Always left align terminal content
        maxWidth="container.lg"
        mx="auto"
        w="full"
        py={{ base: 10, md: 6 }} // Adjust vertical padding
    >
        {/* Terminal Box - Enhanced Styling */}
        <Box
            bg={termBg}
            color={outputColor} // Default text color inside terminal
            fontFamily="mono"
            p={{ base: 4, md: 6}} // Responsive padding
            borderRadius="lg" // Slightly larger radius
            border="1px solid"
            borderColor={termBorder} // Use specific border color
            width="full"
            minHeight={{ base: "300px", md: "280px" }} // Adjusted min height
            boxShadow="md"
        >
            <Typist
                key={typingKey}
                typingDelay={50}
                loop={false}
                 // Default cursor should work fine now, ensure Typist.css is imported in _app.js
            >
                {/* Line 1: whoami */}
                <Text as="span" color={promptColor}>$</Text>
                <Text as="span" ml={2} color={commandColor}>whoami</Text>
                <Typist.Delay ms={500} />
                <br />
                <Text color={nameColor} fontWeight="bold" fontSize="lg">Jeel Tandel</Text>
                <Typist.Delay ms={1000} />
                <br />
                <br />

                {/* Line 2: cat headline.txt */}
                <Text as="span" color={promptColor}>$</Text>
                <Typist.Delay ms={300} />
                <Text as="span" ml={2} color={commandColor}>cat headline.txt</Text>
                <Typist.Delay ms={500} />
                <br />
                <Text color={headlineColor}>Computer Programming Student | Full-Stack Developer Focus</Text>
                <Typist.Delay ms={1000} />
                <br />
                <br />

                {/* Line 3: echo $SUMMARY */}
                <Text as="span" color={promptColor}>$</Text>
                <Typist.Delay ms={300} />
                 <Text as="span" ml={2} color={commandColor}>echo $SUMMARY</Text>
                 <Typist.Delay ms={500} />
                 <br />
                <Text as="span" color={summaryColor} fontSize="sm" display="block" maxW="xl"> {/* Use block & maxW for wrapping */}
                    Detail-oriented student (GPA: 3.0) with hands-on experience in full-stack development (Java, Python, JS), DB management (SQL, NoSQL), and data analytics. Seeking to leverage technical expertise in a dynamic role...
                </Text>
                 <Typist.Delay ms={1500} />
                 <br/>

                 {/* Final prompt */}
                 <Text as="span" color={promptColor}>$ </Text>
            </Typist>
        </Box>

        <Button
            colorScheme={useColorModeValue('blue', 'green')}
            size="lg"
            rightIcon={<FaArrowRight />}
            variant="solid"
            onClick={handleScrollToContact}
            mt={4}
            alignSelf={{ base: 'center', md: 'flex-start' }}
         >
            Get In Touch
         </Button>
    </VStack>
  );
};

export default HomeSection;