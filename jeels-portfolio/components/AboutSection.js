// components/AboutSection.js
import { Box, Heading, Text, VStack, useColorModeValue, Link as ChakraLink } from '@chakra-ui/react';

const AboutSection = () => {
  const primaryTextColor = useColorModeValue('githubLight.text', 'githubDark.text');
  const secondaryTextColor = useColorModeValue('githubLight.textSecondary', 'githubDark.textSecondary');
  const linkColor = useColorModeValue('githubLight.link', 'githubDark.link');

  return (
    <VStack
        spacing={6}
        align="flex-start"
        maxWidth="container.lg" // Consistent width
        mx="auto"
    >
        <Heading as="h2" size="xl">About Me</Heading>
        <Text color={primaryTextColor} fontSize="md">
            My journey as an AI Engineer at Xenara AI is rooted in my education from {' '}
            <ChakraLink href="https://www.algonquincollege.com/" isExternal color={linkColor} fontWeight="500">
                Algonquin College
            </ChakraLink>
            {' '}'s Computer Programming & Analysis program, where I focused on areas like advanced object-oriented programming (Java), cloud database management, web frameworks, network security, and mobile development using Android Studio. I was fortunate enough to achieve a 3.0 GPA and be recognized on the Dean's Honors List.
        </Text>
        <Text color={primaryTextColor} fontSize="md">
            Prior to this, my experience as a Full-Stack Developer provided invaluable practical skills. I built robust platforms utilizing Java, Python, and PostgreSQL, and gained significant experience in optimizing database performance and implementing secure authentication systems. I'm drawn to Agile methodologies, prioritize clean code architecture and effective system design, and find great satisfaction in collaborating with teams to solve complex challenges.
        </Text>
        <Text color={primaryTextColor} fontSize="md">
            My passion lies in applying my expertise across artificial intelligence, full-stack development, data management, and cloud technologies to create impactful solutions. I'm always eager to embrace new technologies and pursue continuous professional growth.
        </Text>
    </VStack>
  );
};

export default AboutSection;