// components/SkillsSection.js
import { Box, Heading, VStack, Text, Wrap, WrapItem, Tag, useColorModeValue, List, ListItem, ListIcon, SimpleGrid, Progress } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

// --- Skills from Resume ---
const programmingSkills = [
    { name: 'Java', level: 85 }, { name: 'Python', level: 80 }, { name: 'JavaScript', level: 90 },
    { name: 'HTML5', level: 95 }, { name: 'CSS3', level: 90 }, { name: 'PHP', level: 65 },
    { name: 'SQL', level: 80 }, { name: 'Bash', level: 70 }, { name: 'PowerShell', level: 60 },
    { name: 'C#', level: 70 }
];
const databaseSkills = ['Oracle 19c', 'MySQL', 'PostgreSQL', 'MongoDB', 'MS Access', 'SQL Server', 'Firebase'];
const toolsSkills = ['Power BI', 'RapidMiner', 'Wireshark', 'Git/GitHub', 'VS Code', 'Eclipse', 'IntelliJ', 'VMware', 'Docker'];
const cloudOsSkills = ['Linux', 'Windows', 'macOS', 'Unix', 'ArcGIS', 'Android Studio', 'Azure Fundamentals'];
const methodologiesSkills = ['Agile/Scrum', 'CI/CD', 'Debugging', 'System Design', 'Data Analytics', 'REST APIs', 'Secure Development'];
const softSkills = ['Leadership', 'Communication', 'Problem-Solving', 'Team Collaboration', 'Time Management', 'Detail-Oriented'];
// --- End of Skills Data ---

// Reusable component for Tag-based skill categories
const SkillCategoryTags = ({ title, skills }) => (
    <VStack align="stretch" spacing={3} width="full">
      <Heading size="md" fontWeight="600">{title}</Heading>
      <Wrap spacing={2}>
        {skills.map((skill) => (
          <WrapItem key={skill}>
            <Tag size="md">{skill}</Tag> {/* Uses default subtle style from theme */}
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
);


const SkillsSection = () => {
  const secondaryTextColor = useColorModeValue('githubLight.textSecondary', 'githubDark.textSecondary');
  const progressColorScheme = useColorModeValue('blue', 'green'); // Match button colors
  const successColor = useColorModeValue('githubLight.success', 'githubDark.success');

  return (
    <VStack
        spacing={10}
        align="flex-start"
        maxWidth="container.lg" // Consistent width
        mx="auto"
    >
        <Heading as="h2" size="xl">Skills</Heading>

        {/* Programming Skills with Progress Bars */}
        <VStack align="stretch" spacing={5} width="full">
            <Heading size="md" fontWeight="600">Programming Languages</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={10} spacingY={5}>
                {programmingSkills.map((skill) => (
                <Box key={skill.name}>
                    <Text mb={1} fontWeight="500" fontSize="sm">{skill.name}</Text>
                    <Progress
                        value={skill.level} // Use level for progress
                        size="sm"
                        colorScheme={progressColorScheme}
                        borderRadius="md"
                        hasStripe // Added stripe
                        isAnimated // Added animation
                    />
                </Box>
                ))}
            </SimpleGrid>
        </VStack>

        {/* Other skill categories using Tags */}
        <SkillCategoryTags title="Databases" skills={databaseSkills} />
        <SkillCategoryTags title="Tools & Technologies" skills={toolsSkills} />
        <SkillCategoryTags title="Cloud, OS & Platforms" skills={cloudOsSkills} />
        <SkillCategoryTags title="Methodologies & Concepts" skills={methodologiesSkills} />

        {/* Soft Skills */}
        <VStack align="stretch" spacing={3} width="full">
            <Heading size="md" fontWeight="600">Soft Skills</Heading>
            <List spacing={2}>
                {softSkills.map((skill) => (
                <ListItem key={skill} fontSize="sm" display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color={successColor} />
                    {skill}
                </ListItem>
                ))}
            </List>
        </VStack>
    </VStack>
  );
};

export default SkillsSection;