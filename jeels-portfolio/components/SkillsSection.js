// components/SkillsSection.js
import { Box, Heading, SimpleGrid, VStack, Text, Tag, useColorModeValue, Progress } from '@chakra-ui/react';

// --- REPLACE WITH YOUR SKILLS ---
const technicalSkills = [
  { name: 'JavaScript (ES6+)', level: 90 }, // Level (0-100) is optional, for progress bars
  { name: 'React & Next.js', level: 85 },
  { name: 'Node.js & Express', level: 75 },
  { name: 'HTML5 & CSS3', level: 95 },
  { name: 'Chakra UI / Tailwind', level: 80 },
  { name: 'Python', level: 70 },
  { name: 'SQL & NoSQL (MongoDB)', level: 65 },
  { name: 'Git & GitHub', level: 85 },
  { name: 'Docker', level: 60 },
  // Add more technical skills
];

const softSkills = [
  'Problem Solving',
  'Team Collaboration',
  'Communication',
  'Agile Methodologies',
  'Project Management (Basic)',
  'Adaptability',
  // Add more soft skills
];
// --- END OF SKILLS DATA ---

const SkillsSection = ({ id, sectionRef }) => {
  const tagColorScheme = useColorModeValue('teal', 'cyan');
  const progressColorScheme = useColorModeValue('teal', 'cyan');

  return (
    <Box id={id} ref={sectionRef} py={20}>
      <VStack spacing={10} align="flex-start" maxWidth="container.md" mx="auto">
        <Heading as="h2" size="xl">Skills</Heading>

        {/* Technical Skills */}
        <VStack align="stretch" spacing={4} width="full">
          <Heading size="lg" fontWeight="medium">Technical Skills</Heading>
          {/* Option 1: Badges/Tags */}
          {/* <Wrap spacing={3}>
             {technicalSkills.map((skill) => (
               <WrapItem key={skill.name}>
                  <Tag size="lg" variant="solid" colorScheme={tagColorScheme}>
                    {skill.name}
                  </Tag>
               </WrapItem>
             ))}
           </Wrap> */}

          {/* Option 2: List with Progress Bars (if using levels) */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={10} spacingY={4}>
             {technicalSkills.map((skill) => (
               <Box key={skill.name}>
                 <Text mb={1} fontWeight="medium">{skill.name}</Text>
                 <Progress value={skill.level} size="sm" colorScheme={progressColorScheme} borderRadius="md" />
               </Box>
             ))}
          </SimpleGrid>
        </VStack>

        {/* Soft Skills */}
        <VStack align="stretch" spacing={4} width="full">
           <Heading size="lg" fontWeight="medium">Soft Skills</Heading>
           <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
             {softSkills.map((skill) => (
               <Tag size="md" key={skill} variant="outline" colorScheme={tagColorScheme}>
                 {skill}
               </Tag>
             ))}
           </SimpleGrid>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SkillsSection;