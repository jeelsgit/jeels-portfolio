// components/Header.js
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Box, Flex, Heading, Spacer, useColorModeValue, Icon, Button, Link as ChakraLink } from '@chakra-ui/react';
// Make sure you have @primer/octicons-react installed or use react-icons
import { MarkGithubIcon, DownloadIcon } from '@primer/octicons-react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Header = forwardRef((props, ref) => {
  const bgColor = useColorModeValue('githubLight.bg', 'githubDark.bg'); // Use main bg
  const borderColor = useColorModeValue('githubLight.border', 'githubDark.border');
  const textColor = useColorModeValue('githubLight.text', 'githubDark.text');
  const shadow = useColorModeValue('sm', 'none');

  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(60);
  const lastScrollY = useRef(0);

  // Effect to measure height
  useEffect(() => {
    if (ref?.current) {
      const observer = new ResizeObserver(entries => {
           for (let entry of entries) { setHeight(entry.contentRect.height); }
      });
      observer.observe(ref.current);
      setHeight(ref.current.offsetHeight); // Initial measure
      return () => observer.disconnect();
    }
  }, [ref]);

  // Effect for scroll listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollY.current;
        const delta = 10;
        const effectiveHeight = height || 60;

        if (currentScrollY > previousScrollY + delta && currentScrollY > effectiveHeight + 50) {
            setIsVisible(false);
        } else if (currentScrollY < previousScrollY - delta || currentScrollY < 10) {
            setIsVisible(true);
        }
        lastScrollY.current = Math.max(0, currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [height]);

  return (
    <Box
      ref={ref}
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
      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
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
        <Flex align="center" gap={2}> {/* Added gap */}
            {/* Download Resume Button */}
            <Button
                as={ChakraLink}
                // --- IMPORTANT: Update this filename ---
                href="/Jeel_Tandel_Resume.pdf"
                // ---------------------------------------
                download
                variant="outline" // Use secondary style
                size="sm"
                leftIcon={<Icon as={DownloadIcon} />}
                aria-label="Download Resume"
            >
                Resume
            </Button>
            <ColorModeSwitcher />
        </Flex>
      </Flex>
    </Box>
  );
});

Header.displayName = "Header";
export default Header;