// components/ExperienceSection.js
import { Box, Heading, VStack, Text, List, ListItem, ListIcon, useColorModeValue } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'; // Use Chakra's icon

const experienceData = [
  {
    title: 'Full-Stack Developer',
    company: 'Appy.Yo',
    location: 'Vancouver, Canada', // Added location
    dates: 'Sept 2024 – Dec 2024',
    description: [
      'Built a gig worker platform using Java, Python, and PostgreSQL, resolving cross-platform compatibility issues across Windows and Linux servers.',
      'Optimized database performance by 20% through query tuning, indexing strategies, and cache implementation.',
      'Implemented secure authentication systems using OAuth 2.0 and documented troubleshooting processes.',
      'Collaborated in an Agile team using bi-weekly sprints to diagnose errors and deliver scalable solutions.',
      'Conducted code reviews and mentored junior developers on best practices for clean code architecture.',
    ],
  },
  // Add other experiences if available
];

const ExperienceSection = () => {
  const itemBorderColor = useColorModeValue('githubLight.border', 'githubDark.border');
  const primaryTextColor = useColorModeValue('githubLight.text', 'githubDark.text');
  const secondaryTextColor = useColorModeValue('githubLight.textSecondary', 'githubDark.textSecondary');
  const successColor = useColorModeValue('githubLight.success', 'githubDark.success');

  return (
    <VStack
        spacing={10}
        align="flex-start"
        maxWidth="container.lg" // Consistent width
        mx="auto"
    >
        <Heading as="h2" size="xl">Work Experience</Heading>
        <VStack spacing={8} align="stretch" width="full">
          {experienceData.map((job, index) => (
            <Box key={index} pb={6} borderBottom={index < experienceData.length - 1 ? '1px' : 'none'} borderColor={itemBorderColor}>
              <Heading size="lg">{job.title}</Heading>
              <Text fontWeight="600" color={primaryTextColor} fontSize="md">
                {job.company}
              </Text>
              <Text fontWeight="normal" color={secondaryTextColor} fontSize="sm" mb={3}>
                {job.location} | {job.dates}
              </Text>
              <List spacing={2} mt={1} pl={1}>
                {job.description.map((point, pIndex) => (
                  <ListItem key={pIndex} fontSize="sm" color={primaryTextColor} display="flex" alignItems="start">
                    <ListIcon as={CheckCircleIcon} color={successColor} mt="4px" mr={2} flexShrink={0}/>
                    {point}
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </VStack>
    </VStack>
  );
};

export default ExperienceSection;