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
            I'm currently pursuing an Associate degree in Computer Programming & Analysis at{' '}
            <ChakraLink href="https://www.algonquincollege.com/" isExternal color={linkColor} fontWeight="500">
                Algonquin College
            </ChakraLink>
            {' '}in Ottawa, maintaining a GPA of 3.0 and consistently achieving Dean's Honors List recognition. My coursework has provided a strong foundation in advanced object-oriented programming with Java, cloud database management, web frameworks, network security, and mobile development using Android Studio.
        </Text>
        <Text color={primaryTextColor} fontSize="md">
            Beyond academics, I have practical experience as a Full-Stack Developer, building platforms using Java, Python, and PostgreSQL, optimizing databases, and implementing secure authentication. I thrive in Agile environments, enjoy collaborating with teams to solve complex problems, and am passionate about clean code architecture and system design.
        </Text>
        <Text color={primaryTextColor} fontSize="md">
            My goal is to find a dynamic role where I can apply my skills in full-stack development, data management, and cloud technologies to contribute to innovative projects, while continuously learning and growing, particularly in emerging tech fields.
        </Text>
    </VStack>
  );
};

export default AboutSection;