// components/Sidebar.js
import React from 'react';
import { Box, VStack, Link, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

const Sidebar = ({ sections, activeSection, mainContentRef, headerHeight }) => {
  const bgColor = useColorModeValue('githubLight.sidebarBg', 'githubDark.sidebarBg');
  const borderColor = useColorModeValue('githubLight.border', 'githubDark.border');
  const activeColor = useColorModeValue('githubLight.activeItem', 'githubDark.activeItem');
  const activeBg = useColorModeValue('githubLight.activeBg', 'githubDark.activeBg');
  const hoverBg = useColorModeValue('githubLight.activeBg', 'githubDark.activeBg');
  const textColor = useColorModeValue('githubLight.text', 'githubDark.text');

  const sidebarWidth = "296px";
  // Adjust the scroll offset - smaller value scrolls target closer to header
  const scrollOffset = 15; // Pixels below header to stop scrolling

  return (
    <Box
      as="nav"
      position="sticky" // Sticky relative to parent Flex
      top="0" // Aligns to top of parent Flex (which has padding for header)
      height="100%" // Fills height of parent Flex
      width={sidebarWidth}
      borderRightWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      overflowY="auto" // Scroll sidebar only if its content overflows
      display={{ base: 'none', md: 'block' }}
      px={4}
      py={6}
      flexShrink={0}
      zIndex="docked" // Below fixed header
    >
      <VStack align="stretch" spacing={1}>
        {sections.map((section) => (
          <NextLink key={section.id} href={`#${section.id}`} passHref legacyBehavior>
            <Link
              display="block"
              px={3}
              py={1}
              borderRadius="6px"
              fontSize="sm"
              fontWeight={activeSection === section.id ? '600' : 'normal'}
              bg={activeSection === section.id ? activeBg : 'transparent'}
              color={activeSection === section.id ? activeColor : textColor}
              _hover={{
                textDecoration: 'none',
                bg: hoverBg,
                color: activeColor,
              }}
              onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.getElementById(section.id);
                  const scrollContainer = mainContentRef.current;

                  if (targetElement && scrollContainer) {
                      const offsetTop = targetElement.offsetTop;
                      const scrollTarget = offsetTop - scrollOffset; // Apply offset

                      scrollContainer.scrollTo({
                           top: scrollTarget > 0 ? scrollTarget : 0, // Don't scroll negative
                           behavior: "smooth"
                      });
                  }
                 if (history.pushState) { history.pushState(null, null, `#${section.id}`); }
                 else { window.location.hash = `#${section.id}`; }
              }}
            >
              {section.name}
            </Link>
          </NextLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;