// components/ExperienceSection.js
import { Box, Heading, VStack, Text, List, ListItem, ListIcon, useColorModeValue } from '@chakra-ui/react';
import { MdWork, MdCheckCircle } from 'react-icons/md'; // Example icons

// --- REPLACE WITH YOUR EXPERIENCE ---
const experienceData = [
  {
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    dates: 'Jan 2021 - Present',
    description: [
      'Developed and maintained web applications using React, Node.js, and AWS.',
      'Collaborated with cross-functional teams to deliver features on time.',
      'Improved application performance by 20% through code optimization.',
      'Mentored junior developers and conducted code reviews.',
    ],
  },
  {
    title: 'Junior Web Developer',
    company: 'Web Creators Co.',
    dates: 'Jun 2019 - Dec 2020',
    description: [
      'Assisted in building client websites using HTML, CSS, and JavaScript (jQuery).',
      'Translated Figma designs into responsive web pages.',
      'Managed website content updates and bug fixes.',
    ],
  },
  // Add more relevant experience
];
// --- END OF EXPERIENCE DATA ---

const ExperienceSection = ({ id, sectionRef }) => {
  const itemBorderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box id={id} ref={sectionRef} py={20}>
      <VStack spacing={10} align="flex-start" maxWidth="container.md" mx="auto">
        <Heading as="h2" size="xl">Experience</Heading>
        <VStack spacing={8} align="stretch" width="full">
          {experienceData.map((job, index) => (
            <Box key={index} pb={6} borderBottom={index < experienceData.length - 1 ? '1px' : 'none'} borderColor={itemBorderColor}>
              <Heading size="md">{job.title}</Heading>
              <Text fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                {job.company} | {job.dates}
              </Text>
              <List spacing={2} mt={3} pl={2}>
                {job.description.map((point, pIndex) => (
                  <ListItem key={pIndex} fontSize="sm">
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {point}
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default ExperienceSection;