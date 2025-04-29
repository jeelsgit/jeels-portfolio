// components/SkillsSection.js
import { Box, Heading, VStack, Text, Wrap, WrapItem, Tag, useColorModeValue, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'; // Or use react-icons

// --- Skills from Resume ---
const programmingSkills = ['Java', 'Python', 'JavaScript', 'HTML5', 'CSS3', 'PHP', 'SQL', 'Bash', 'PowerShell', 'C#'];
const databaseSkills = ['Oracle 19c', 'MySQL', 'PostgreSQL', 'MongoDB', 'MS Access', 'SQL Server', 'Firebase'];
const toolsSkills = ['Power BI', 'RapidMiner', 'Wireshark', 'Git/GitHub', 'VS Code', 'Eclipse', 'IntelliJ', 'VMware', 'Docker'];
const cloudOsSkills = ['Linux', 'Windows', 'macOS', 'Unix', 'ArcGIS', 'Android Studio', 'Azure Fundamentals'];
const methodologiesSkills = ['Agile/Scrum', 'CI/CD', 'Debugging', 'System Design', 'Data Analytics', 'REST APIs', 'Secure Development'];
const softSkills = ['Leadership', 'Communication', 'Problem-Solving', 'Team Collaboration', 'Time Management', 'Detail-Oriented'];
// --- End of Skills Data ---

const SkillsSection = () => {
  const secondaryTextColor = useColorModeValue('githubLight.textSecondary', 'githubDark.textSecondary');
  const tagColorScheme = useColorModeValue('blue', 'cyan'); // Match theme Tag variant if needed

  const SkillCategory = ({ title, skills }) => (
    <VStack align="stretch" spacing={3} width="full">
      <Heading size="md" fontWeight="600">{title}</Heading>
      <Wrap spacing={2}>
        {skills.map((skill) => (
          <WrapItem key={skill}>
             {/* Use default subtle Tag style from theme */}
            <Tag size="md">{skill}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );

  return (
    <VStack
        spacing={10}
        align="flex-start"
        maxWidth="container.lg" // Consistent width
        mx="auto"
    >
        <Heading as="h2" size="xl">Skills</Heading>

        <SkillCategory title="Programming Languages" skills={programmingSkills} />
        <SkillCategory title="Databases" skills={databaseSkills} />
        <SkillCategory title="Tools & Technologies" skills={toolsSkills} />
        <SkillCategory title="Cloud, OS & Platforms" skills={cloudOsSkills} />
        <SkillCategory title="Methodologies & Concepts" skills={methodologiesSkills} />

        {/* Soft Skills - Different presentation maybe? */}
        <VStack align="stretch" spacing={3} width="full">
            <Heading size="md" fontWeight="600">Soft Skills</Heading>
            <List spacing={2}>
                {softSkills.map((skill) => (
                <ListItem key={skill} fontSize="sm" display="flex" alignItems="center">
                    <ListIcon as={CheckCircleIcon} color={useColorModeValue('githubLight.success', 'githubDark.success')} />
                    {skill}
                </ListItem>
                ))}
            </List>
        </VStack>
    </VStack>
  );
};

export default SkillsSection;