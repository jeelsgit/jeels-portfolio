// pages/index.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
// Import Divider from Chakra
import { Box, Flex, useColorModeValue, Divider } from '@chakra-ui/react';
import Head from 'next/head';

// --- VERIFY IMPORTS ---
import HomeSection from '../components/HomeSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
// ----------------------


const sections = [
  { id: 'home', name: 'Home', component: HomeSection },
  { id: 'about', name: 'About', component: AboutSection },
  { id: 'projects', name: 'Projects', component: ProjectsSection },
  { id: 'skills', name: 'Skills', component: SkillsSection },
  { id: 'experience', name: 'Experience', component: ExperienceSection },
  { id: 'contact', name: 'Contact', component: ContactSection },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef(
    sections.reduce((acc, section) => {
      acc[section.id] = React.createRef();
      return acc;
    }, {})
  );
  const mainContentRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(60); // Default height

  // Effect to get header height
  useEffect(() => {
    const timer = setTimeout(() => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);


  // Intersection Observer Callback - Focus on entry closest to the ideal position
  const handleIntersection = useCallback((entries) => {
      let bestCandidateId = null;
      // Define the ideal target position (e.g., 10px below the header)
      // We calculate based on rootBounds later if needed, but aiming for near top.
      const targetOffset = 10; // Pixels below the top edge of the scroll container
      let smallestDistance = Infinity;

      entries.forEach(entry => {
          const { target, isIntersecting, boundingClientRect, rootBounds } = entry;

          if (isIntersecting && rootBounds) {
              // Position of the element's top relative to the scroll container's top
              const topRelativeToRoot = boundingClientRect.top - rootBounds.top;
              // Calculate distance from the ideal target position
              const distanceFromTarget = Math.abs(topRelativeToRoot - targetOffset);

              // If this entry is closer to the target than the current best, update
              if (distanceFromTarget < smallestDistance) {
                  smallestDistance = distanceFromTarget;
                  bestCandidateId = target.id;
              }
          }
      });

      // Explicitly handle scrolling to the absolute top
      if (mainContentRef.current && mainContentRef.current.scrollTop < 50) {
           if (activeSection !== 'home') setActiveSection('home');
      }
      // Update if a best candidate was found and it's different
      else if (bestCandidateId && bestCandidateId !== activeSection) {
          setActiveSection(bestCandidateId);
      }
  }, [activeSection]);


  // Setup Intersection Observer
  useEffect(() => {
    const scrollContainer = mainContentRef.current;
    if (!scrollContainer || headerHeight <= 0) return;

    // rootMargin: Define the observation area more precisely.
    // top: -10px (start observing slightly above the container top)
    // bottom: - (container height - TargetAreaHeight) px. E.g., watch top 100px.
    // Use percentage for flexibility, e.g., watch top 20% -> bottom: -80%
    const observerOptions = {
        root: scrollContainer,
        // Observe a zone starting slightly above the top edge to catch fast scrolls,
        // and extending down (e.g., -70% means top 30% is the active zone).
        rootMargin: `-10px 0px -70% 0px`,
        threshold: 0, // Trigger immediately
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((section) => {
      const sectionElement = sectionRefs.current[section.id]?.current;
      if (sectionElement) {
           observer.observe(sectionElement);
      }
    });

    return () => {
      sections.forEach((section) => {
        const sectionElement = sectionRefs.current[section.id]?.current;
        if (sectionElement && observer) {
             try { observer.unobserve(sectionElement); } catch (e) {}
        }
      });
      observer.disconnect();
    };
  }, [handleIntersection, headerHeight]);


  const mainBgColor = useColorModeValue('githubLight.bg', 'githubDark.bg');
  const borderColor = useColorModeValue('githubLight.border', 'githubDark.border');

  return (
    <>
      <Head>
        <title>Jeel Tandel - Portfolio</title>
        <meta name="description" content="Portfolio of Jeel Tandel, Computer Programming Student focused on Full-Stack Development." />
      </Head>

      <Header ref={headerRef} />

      <Flex
          w="full"
          pt={`${headerHeight}px`}
          height="100vh"
          overflow="hidden"
      >
        <Sidebar
            sections={sections}
            activeSection={activeSection}
            mainContentRef={mainContentRef}
            headerHeight={headerHeight}
        />
        <Box
          ref={mainContentRef}
          flex="1"
          bg={mainBgColor}
          overflowY="auto"
          height="100%"
          sx={{ scrollBehavior: 'smooth' }}
          // Consistent horizontal padding
          px={{ base: 5, md: 8, lg: 10 }}
          // Remove py here, handle spacing with section padding/margins
        >
          {sections.map(({ id, component: Component }, index) => {
            if (!Component) {
                console.error(`Error: Component for section '${id}' is undefined!`);
                return <Box key={id} color="red.500" p={5}>Error loading section: '{id}'.</Box>;
            }
            return (
              // Use Fragment to avoid unnecessary outer Box for each section itself
              <React.Fragment key={id}>
                 {/* Add Divider BEFORE sections (except the first one) */}
                 {index > 0 && (
                    <Divider
                        my={{ base: 12, md: 16 }} // Vertical margin for spacing
                        borderColor={borderColor}
                        // Constrain divider width to match content
                        maxWidth="container.lg" // Match section content width
                        mx="auto" // Center the divider
                    />
                 )}
                 {/* Section Content Box */}
                 <Box
                     id={id} // ID for anchor linking
                     ref={sectionRefs.current[id]} // Ref for IntersectionObserver target
                     // Add padding TOP and BOTTOM for spacing around content
                     pt={{ base: 8, md: 12 }} // Padding top for space after divider/previous section
                     pb={{ base: 8, md: 12 }} // Padding bottom for space before next divider
                 >
                    {/* Render the actual section component */}
                    <Component />
                 </Box>
              </React.Fragment>
            );
           })}
        </Box>
      </Flex>
    </>
  );
}