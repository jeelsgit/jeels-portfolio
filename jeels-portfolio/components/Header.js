// components/Header.js
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Box, Flex, Heading, Spacer, useColorModeValue, Icon } from '@chakra-ui/react';
import { MarkGithubIcon } from '@primer/octicons-react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Header = forwardRef((props, ref) => {
  const bgColor = useColorModeValue('githubLight.bg', 'githubDark.bg');
  const borderColor = useColorModeValue('githubLight.border', 'githubDark.border');
  const textColor = useColorModeValue('githubLight.text', 'githubDark.text');
  const shadow = useColorModeValue('sm', 'none');

  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(60); // Initial estimate
  const lastScrollY = useRef(0); // Store last scroll position

  // Effect to measure height using the forwarded ref
  useEffect(() => {
    if (ref?.current) {
      const measureHeight = () => {
        setHeight(ref.current.offsetHeight);
      };
      // Measure initially
      measureHeight();
      // Optional: Re-measure on resize
      window.addEventListener('resize', measureHeight);
      return () => window.removeEventListener('resize', measureHeight);
    }
  }, [ref]);

  // Effect for scroll listener
  useEffect(() => {
    // Only run if window is defined (prevents server-side errors)
    if (typeof window === 'undefined') {
        return;
    }

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollY.current;
        const delta = 10; // Minimum scroll change to trigger hide/show
        const effectiveHeight = height || 60; // Use state height or fallback

        // Scrolling down, past the header height significantly
        if (currentScrollY > previousScrollY + delta && currentScrollY > effectiveHeight + 50) {
            setIsVisible(false);
        }
        // Scrolling up or very near the top
        else if (currentScrollY < previousScrollY - delta || currentScrollY < 10) {
            setIsVisible(true);
        }

        // Update last scroll position (must be done AFTER comparison)
        lastScrollY.current = Math.max(0, currentScrollY); // Ensure it's not negative
    };

    // Add listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);

  }, [height]); // Dependency on height ensures correct threshold

  return (
    <Box
      ref={ref} // Attach forwarded ref
      as="header"
      position="fixed"
      top="0"
      width="full"
      bg={bgColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
      zIndex="sticky" // High z-index
      px={{ base: 4, md: 6 }}
      py={3}
      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
      // Use visibility state and measured height for transform
      transform={isVisible ? 'translateY(0)' : `translateY(-${height}px)`}
      boxShadow={shadow}
    >
      <Flex align="center" maxW="full" mx="auto">
        <Flex align="center">
           <Icon as={MarkGithubIcon} boxSize={8} color={textColor} mr={2} />
           <Heading size="md" fontWeight="600" color={textColor}>
              Jeel Tandel
           </Heading>
        </Flex>
        <Spacer />
        <Flex align="center">
           <ColorModeSwitcher />
        </Flex>
      </Flex>
    </Box>
  );
});

Header.displayName = "Header";
export default Header;