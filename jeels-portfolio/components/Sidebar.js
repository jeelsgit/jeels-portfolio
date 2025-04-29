// components/Sidebar.js
import React from 'react';
import { Box, VStack, Link, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

const Sidebar = ({ sections, activeSection, mainContentRef, headerHeight }) => {
  const bgColor = useColorModeValue('githubLight.sidebarBg', 'githubDark.sidebarBg');
  const borderColor = useColorModeValue('githubLight.border', 'githubDark.border');
  const activeColor = useColorModeValue('githubLight.activeItem', 'githubDark.activeItem');
  const activeBg = useColorModeValue('githubLight.activeBg', 'githubDark.activeBg');
  const hoverBg = useColorModeValue('githubLight.activeBg', 'githubDark.activeBg');
  const textColor = useColorModeValue('githubLight.text', 'githubDark.text');

  const sidebarWidth = "296px";
  // --- ADJUST SCROLL OFFSET ---
  // Fine-tune this value (pixels) to leave space below the header
  // A value slightly larger than the header height often works.
  const scrollOffset = headerHeight ? headerHeight + 20 : 80; // Add 20px buffer below header
  // ---------------------------

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      height="100%"
      width={sidebarWidth}
      borderRightWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      overflowY="auto"
      display={{ base: 'none', md: 'block' }}
      px={4}
      py={6}
      flexShrink={0}
      zIndex="docked"
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
              // --- Added Cursor ---
              cursor="pointer"
              // ------------------
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
                      // Calculate the target element's top position relative to the viewport
                      const elementRect = targetElement.getBoundingClientRect();
                      // Calculate the scroll container's top position relative to the viewport
                      const containerRect = scrollContainer.getBoundingClientRect();

                      // Calculate the element's position relative to the scroll container's current scroll position
                      const elementTopRelativeToContainer = elementRect.top - containerRect.top + scrollContainer.scrollTop;

                      // Calculate the final scroll position
                      // Subtract the desired offset (headerHeight + buffer)
                      const scrollTarget = elementTopRelativeToContainer - (headerHeight + 20); // Adjust 20px buffer as needed

                      scrollContainer.scrollTo({
                           top: scrollTarget > 0 ? scrollTarget : 0,
                           behavior: "smooth"
                      });
                  }
                 // Update URL hash
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