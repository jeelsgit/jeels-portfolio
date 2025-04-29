// components/ExperienceSection.js
import { Box, Heading, VStack, Text, List, ListItem, ListIcon, useColorModeValue, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { FaStar } from 'react-icons/fa'; // Using react-icons for achievement star

// --- Data Structure including Responsibilities and Achievements ---
const experienceData = [
  {
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
      // Add more specific, quantifiable achievements if possible
    ],
  },
  // Add other job experiences here following the same structure
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
            <Box key={index} pb={6} borderBottom={index < experienceData.length - 1 ? '1px' : 'none'} borderColor={itemBorderColor}>
              <Heading size="lg">{job.title}</Heading>
              <Text fontWeight="600" color={primaryTextColor} fontSize="md">
                {job.company}
              </Text>
              <Text fontWeight="normal" color={secondaryTextColor} fontSize="sm" mb={3}>
                {job.location} | {job.dates}
              </Text>


              {/* Render Responsibilities */}
              <List spacing={2} mt={3} pl={1}>
                  {/* Render Responsibilities */}
                  {job.responsibilities && job.responsibilities.length > 0 && (
                     <>
                         {/* Optional: You could add a heading here if desired */}
                         {job.responsibilities.map((point, pIndex) => (
                          <ListItem key={`resp-${pIndex}`} fontSize="sm" color={primaryTextColor} display="flex" alignItems="start">
                            <ListIcon as={CheckCircleIcon} color={successColor} mt="4px" mr={2} flexShrink={0}/>
                            {point}
                          </ListItem>
                         ))}
                     </>
                  )}

                  {/* Render Achievements (can be in the same List or a separate one) */}
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
          ))}
        </VStack>
    </VStack>
  );
};

export default ExperienceSection;