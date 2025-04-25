// components/Header.js
import React, { useState, useEffect, useRef, forwardRef } from 'react'; // Import forwardRef
import { Box, Flex, Heading, Spacer, useColorModeValue, Icon } from '@chakra-ui/react';
import { MarkGithubIcon } from '@primer/octicons-react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

// Wrap component with forwardRef to receive ref from index.js
const Header = forwardRef((props, ref) => {
  const bgColor = useColorModeValue('githubLight.bg', 'githubDark.bg'); // Use main bg
  const borderColor = useColorModeValue('githubLight.border', 'githubDark.border');
  const textColor = useColorModeValue('githubLight.text', 'githubDark.text');

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(60); // Initial estimate

  // Internal ref for height calculation if needed, or use passed ref
  const internalHeaderRef = useRef(null);

  // Use the forwarded ref primarily, fallback to internal if needed
  const headerElementRef = ref || internalHeaderRef;

  // Effect to measure height using the appropriate ref
  useEffect(() => {
      if (headerElementRef.current) {
          setHeaderHeight(headerElementRef.current.offsetHeight);
      }
      // Add resize listener if you want it to be perfectly dynamic on resize
      // const handleResize = () => { ... setHeaderHeight ... };
      // window.addEventListener('resize', handleResize);
      // return () => window.removeEventListener('resize', handleResize);
  }, [headerElementRef]); // Re-run if the ref changes

  // Effect to control visibility
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY < lastScrollY || window.scrollY <= 50) {
          setShowNav(true);
        } else if (window.scrollY > headerHeight) { // Only hide if scrolled past header
          setShowNav(false);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar, { passive: true }); // Use passive listener
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY, headerHeight]); // Depend on headerHeight too


  return (
    <Box
      ref={headerElementRef} // Attach the ref here
      as="header"
      position="fixed"
      top="0"
      width="full"
      bg={bgColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
      zIndex="sticky"
      px={{ base: 4, md: 6 }}
      py={3}
      transition="transform 0.3s ease-in-out"
      // Use measured headerHeight for transform
      transform={showNav ? 'translateY(0)' : `translateY(-${headerHeight}px)`}
      boxShadow={mode('sm', 'none')} // Add subtle shadow in light mode
    >
      <Flex align="center" maxW="full" mx="auto">
        <Flex align="center">
           <Icon as={MarkGithubIcon} boxSize={8} color={textColor} mr={2} />
           <Heading size="md" fontWeight="600" color={textColor}>
              Your Name {/* <<< REPLACE */}
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

// Add display name for DevTools
Header.displayName = "Header";

export default Header;