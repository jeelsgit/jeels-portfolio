// components/ExperienceSection.js
import { Box, Heading, VStack, Text, List, ListItem, ListIcon, useColorModeValue, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { FaStar } from 'react-icons/fa';

// --- Added Xenara AI Experience ---
const experienceData = [
  { // Newest experience first
    title: 'AI Engineer',
    company: 'Xenara AI',
    location: 'Remote', // Specify location if applicable
    dates: 'March 2025 – Present', // Add correct dates
    responsibilities: [
      'Developed and implemented AI/ML models for [Specific Application, e.g., natural language processing].',
      'Collaborated with data scientists and software engineers to integrate AI solutions into production systems.',
      'Processed and analyzed large datasets using [Specific Tools/Libraries, e.g., Pandas, Scikit-learn].',
      'Researched and experimented with new AI techniques and algorithms.',
      // Add more specific responsibilities
    ],
    achievements: [
      'Improved model accuracy by [Specific %] for [Specific Task].',
      'Reduced processing time for [Specific Process] using optimization techniques.',
      // Add more quantifiable achievements
    ],
  },
  { // Previous experience
    title: 'Full-Stack Developer',
    company: 'Appy.Yo',
    location: 'Vancouver, Canada',
    dates: 'Sept 2024 – Dec 2024',
    responsibilities: [
      'Developed a gig worker platform using Java, Python, and PostgreSQL.',
      'Resolved cross-platform compatibility issues across Windows and Linux servers.',
      'Implemented secure authentication systems using OAuth 2.0.',
      'Collaborated within an Agile team, participating in bi-weekly sprints.',
      'Conducted code reviews and documented troubleshooting processes.',
      'Mentored junior developers on clean code architecture best practices.',
    ],
    achievements: [
      'Optimized database performance by 20% through query tuning, indexing strategies, and caching implementations.',
    ],
  },
];
// --- End Data ---


const ExperienceSection = () => {
  const itemBorderColor = useColorModeValue('githubLight.border', 'githubDark.border');
  const primaryTextColor = useColorModeValue('githubLight.text', 'githubDark.text');
  const secondaryTextColor = useColorModeValue('githubLight.textSecondary', 'githubDark.textSecondary');
  const successColor = useColorModeValue('githubLight.success', 'githubDark.success');
  const achievementColor = useColorModeValue('yellow.500', 'yellow.300');

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
            // --- Rendering Logic (no change needed from previous version) ---
            <Box key={index} pb={6} borderBottom={index < experienceData.length - 1 ? '1px' : 'none'} borderColor={itemBorderColor}>
              <Heading size="lg">{job.title}</Heading>
              <Text fontWeight="600" color={primaryTextColor} fontSize="md">{job.company}</Text>
              <Text fontWeight="normal" color={secondaryTextColor} fontSize="sm" mb={3}>{job.location} | {job.dates}</Text>
              <List spacing={2} mt={3} pl={1}>
                  {job.responsibilities && job.responsibilities.length > 0 && (
                     <>
                         {job.responsibilities.map((point, pIndex) => (
                          <ListItem key={`resp-${pIndex}`} fontSize="sm" color={primaryTextColor} display="flex" alignItems="start">
                            <ListIcon as={CheckCircleIcon} color={successColor} mt="4px" mr={2} flexShrink={0}/>
                            {point}
                          </ListItem>
                         ))}
                     </>
                  )}
                   {job.achievements && job.achievements.length > 0 && (
                     <>
                         <Text fontWeight="medium" fontSize="sm" color={secondaryTextColor} mb={1} mt={4}>Key Achievements:</Text>
                         {job.achievements.map((point, pIndex) => (
                          <ListItem key={`ach-${pIndex}`} fontSize="sm" color={primaryTextColor} display="flex" alignItems="start">
                            <ListIcon as={FaStar} color={achievementColor} mt="4px" mr={2} flexShrink={0}/>
                            {point}
                          </ListItem>
                         ))}
                     </>
                  )}
              </List>
            </Box>
            // --- End Rendering Logic ---
          ))}
        </VStack>
    </VStack>
  );
};

export default ExperienceSection;