// pages/index.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Flex, useColorModeValue, Divider } from '@chakra-ui/react';
import Head from 'next/head';
import { motion } from 'framer-motion'; // Import motion

// --- Section Component Imports ---
import HomeSection from '../components/HomeSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
// --- Layout Component Imports ---
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// --- Sections Configuration ---
const sections = [
  { id: 'home', name: 'Home', component: HomeSection },
  { id: 'about', name: 'About', component: AboutSection },
  { id: 'projects', name: 'Projects', component: ProjectsSection },
  { id: 'skills', name: 'Skills', component: SkillsSection },
  { id: 'experience', name: 'Experience', component: ExperienceSection },
  { id: 'contact', name: 'Contact', component: ContactSection },
];

// --- Main Page Component ---
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
  const [headerHeight, setHeaderHeight] = useState(60);

  // Effect: Get Header Height
  useEffect(() => {
    const timer = setTimeout(() => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Callback: Handle Intersection Changes for Scrollspy
  const handleIntersection = useCallback((entries) => {
      let bestCandidateId = null;
      const targetOffset = 10; // Ideal position below header (pixels)
      let smallestDistance = Infinity;

      entries.forEach(entry => {
          const { target, isIntersecting, boundingClientRect, rootBounds } = entry;
          if (isIntersecting && rootBounds) {
              const topRelativeToRoot = boundingClientRect.top - rootBounds.top;
              const distanceFromTarget = Math.abs(topRelativeToRoot - targetOffset);
              if (distanceFromTarget < smallestDistance) {
                  smallestDistance = distanceFromTarget;
                  bestCandidateId = target.id;
              }
          }
      });

      if (mainContentRef.current && mainContentRef.current.scrollTop < 50) {
           if (activeSection !== 'home') setActiveSection('home');
      } else if (bestCandidateId && bestCandidateId !== activeSection) {
          setActiveSection(bestCandidateId);
      }
  }, [activeSection]);

  // Effect: Setup Intersection Observer
  useEffect(() => {
    const scrollContainer = mainContentRef.current;
    if (!scrollContainer || headerHeight <= 0) return;

    const observerOptions = {
        root: scrollContainer,
        rootMargin: `-10px 0px -70% 0px`, // Adjust bottom % to tune active zone
        threshold: 0,
    }
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((section) => {
      const sectionElement = sectionRefs.current[section.id]?.current;
      if (sectionElement) observer.observe(sectionElement);
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

  // --- Render Logic ---
  const mainBgColor = useColorModeValue('githubLight.bg', 'githubDark.bg');
  const borderColor = useColorModeValue('githubLight.border', 'githubDark.border');

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 25 }, // Slightly larger y offset
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" } // Smoother ease
    }
  };

  return (
    <>
      <Head>
        <title>Jeel Tandel - Portfolio</title>
        <meta name="description" content="Portfolio of Jeel Tandel, Computer Programming Student focused on Full-Stack Development." />
      </Head>

      <Header ref={headerRef} />

      <Flex
          w="full"
          pt={headerHeight > 0 ? `${headerHeight}px` : '60px'}
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
          px={{ base: 5, md: 8, lg: 10 }} // Consistent horizontal padding
          // No py here, handled by section wrappers/dividers
        >
          {sections.map(({ id, component: Component }, index) => {
            if (!Component) {
                console.error(`Error: Component for section '${id}' is undefined!`);
                return <Box key={id} color="red.500" p={5}>Error loading section: '{id}'.</Box>;
            }
            return (
              <React.Fragment key={id}>
                 {/* Divider Between Sections */}
                 {index > 0 && (
                    <Divider
                        my={{ base: 16, md: 20 }} // Increased vertical margin for more space
                        borderColor={borderColor}
                        maxWidth="container.lg" // Match content width
                        mx="auto"
                    />
                 )}
                 {/* Section Wrapper with Animation */}
                 <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }} // Trigger when 15% is visible
                    variants={sectionVariants}
                 >
                     <Box
                         id={id}
                         ref={sectionRefs.current[id]}
                         // IMPORTANT: Ensure Home section has enough vertical space
                         // Apply minHeight specifically to home, or ensure content gives it height
                         minHeight={id === 'home' ? `calc(90vh - ${headerHeight}px)` : undefined}
                         display={id === 'home' ? 'flex' : undefined} // Use flex for vertical centering on home
                         alignItems={id === 'home' ? 'center' : undefined} // Center home content vertically
                         // Padding applied consistently
                         pt={index === 0 ? { base: 8, md: 12 } : 0} // Pad top of first section
                         pb={{ base: 8, md: 12 }} // Pad bottom of all sections (before divider)
                     >
                        {/* Render component */}
                        <Component />
                     </Box>
                 </motion.div>
              </React.Fragment>
            );
           })}
        </Box>
      </Flex>
    </>
  );
}