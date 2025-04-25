// pages/index.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import Head from 'next/head';

// Import Section Components
import HomeSection from '../components/HomeSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';

// Import Layout Components
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


// Define sections data
const sections = [
  { id: 'home', name: 'Home', component: HomeSection },
  { id: 'about', name: 'About', component: AboutSection },
  { id: 'projects', name: 'Projects', component: ProjectsSection },
  { id: 'skills', name: 'Skills', component: SkillsSection },
  { id: 'experience', name: 'Experience', component: ExperienceSection },
  { id: 'contact', name: 'Contact', component: ContactSection },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(sections[0].id); // Default to first section id
  const sectionRefs = useRef({});
  const mainContentRef = useRef(null);
  const headerRef = useRef(null); // Ref for Header component
  const [headerHeight, setHeaderHeight] = useState(60); // Default/initial height

  // Populate refs
  sections.forEach((section) => {
    sectionRefs.current[section.id] = React.createRef();
  });

  // Effect to get actual header height after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }, 150); // Small delay to allow render
    return () => clearTimeout(timer);
  }, []);


  // Intersection Observer Callback
  const handleIntersection = useCallback((entries) => {
    let bestCandidate = { id: activeSection, ratio: 0, isIntersecting: false, top: Infinity };

    entries.forEach((entry) => {
      const { target, isIntersecting, intersectionRatio, boundingClientRect } = entry;
      const rootBounds = entry.rootBounds; // Bounds of the scroll container

      if (rootBounds && isIntersecting) {
        // Calculate position relative to the scroll container's top edge
        const topRelativeToRoot = boundingClientRect.top - rootBounds.top;

        // Prioritize sections that are fully visible or closest to the top
        // A simple heuristic: highest intersectionRatio, breaking ties by closeness to top
        if (intersectionRatio > bestCandidate.ratio ||
           (intersectionRatio === bestCandidate.ratio && topRelativeToRoot < bestCandidate.top)) {
          bestCandidate = { id: target.id, ratio: intersectionRatio, isIntersecting, top: topRelativeToRoot };
        }
      }
    });

     // Update only if a viable intersecting candidate was found
    if (bestCandidate.isIntersecting) {
        setActiveSection(bestCandidate.id);
    } else {
        // If nothing is intersecting (e.g., scrolled past end), keep last active?
        // Or find the element closest to the top edge (even if not intersecting fully)
        let closestTopId = activeSection;
        let minDistance = Infinity;
        sections.forEach(section => {
            const elem = sectionRefs.current[section.id]?.current;
            if (elem && mainContentRef.current) {
                const dist = Math.abs(elem.getBoundingClientRect().top - mainContentRef.current.getBoundingClientRect().top);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestTopId = section.id;
                }
            }
        });
         setActiveSection(closestTopId);
    }

  }, [activeSection]); // Dependency on activeSection prevents unnecessary updates if ID hasn't changed


  // Setup Intersection Observer
  useEffect(() => {
    const scrollContainer = mainContentRef.current;
    if (!scrollContainer) return;

    // Margin: trigger slightly below header (top: 0), and consider bottom part of viewport
    // Example: Trigger if element is between 0px and 70% from bottom
    const observerOptions = {
        root: scrollContainer,
        rootMargin: `0px 0px -30% 0px`, // Adjust bottom margin as needed
        threshold: 0.1, // Need at least 10% visible within margins
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((section) => {
      const ref = sectionRefs.current[section.id]?.current;
      if (ref) observer.observe(ref);
    });

    return () => {
      sections.forEach((section) => {
        const ref = sectionRefs.current[section.id]?.current;
        if (ref) observer.unobserve(ref);
      });
    };
  }, [handleIntersection, headerHeight]); // Re-run observer setup if header height changes


  const mainBgColor = useColorModeValue('githubLight.bg', 'githubDark.bg');

  return (
    <>
      <Head>
        <title>Your Name - Portfolio</title> {/* <<< REPLACE */}
        <meta name="description" content="Your professional portfolio description." /> {/* <<< REPLACE */}
      </Head>

      {/* Pass ref to Header for height measurement */}
      <Header ref={headerRef} />

      {/* Main layout using Flex */}
      <Flex
          w="full"
          pt={`${headerHeight}px`} // Push content below fixed header
          height="100vh"
          overflow="hidden" // Prevent body scroll
      >
        {/* Sidebar */}
        <Sidebar
            sections={sections}
            activeSection={activeSection}
            mainContentRef={mainContentRef} // Pass ref for scrolling
            headerHeight={headerHeight} // Pass height for offset calc
        />

        {/* Main Content Scrolling Area */}
        <Box
          ref={mainContentRef} // Ref for scroll events and IO root
          flex="1"
          bg={mainBgColor}
          overflowY="auto"
          height="100%" // Fill parent Flex height
          sx={{ scrollBehavior: 'smooth' }}
          // Add padding INSIDE the scrollable area
          px={{ base: 4, md: 6, lg: 8 }} // Adjust padding
          py={8}
        >
          {sections.map(({ id, component: Component }) => (
            // Add section wrapper with ref and id for IO and scrolling
            <Box key={id} id={id} ref={sectionRefs.current[id]}
                 // Add padding/margin *below* each section for spacing
                 pb={{ base: 10, md: 16 }}
            >
              <Component />
            </Box>
          ))}
        </Box>
      </Flex>
    </>
  );
}