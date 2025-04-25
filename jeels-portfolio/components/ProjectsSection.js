// components/ProjectsSection.js
import { Box, Heading, SimpleGrid, VStack, useBreakpointValue } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';

// --- REPLACE WITH YOUR ACTUAL PROJECT DATA ---
const projectsData = [
    {
      title: 'Project Alpha',
      description: 'A brief description of Project Alpha, highlighting its purpose and key features.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com/yourusername/project-alpha',
    },
    {
      title: 'Project Beta',
      description: 'Description for Project Beta. Focus on the problem it solves or the technology used.',
      techStack: ['Next.js', 'Chakra UI', 'Vercel'],
      repoUrl: 'https://github.com/yourusername/project-beta',
    },
    {
      title: 'Project Gamma',
      description: 'Showcase another cool project. Maybe mention specific achievements or learning outcomes.',
      techStack: ['Python', 'Flask', 'SQLAlchemy'],
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com/yourusername/project-gamma',
    },
    {
      title: 'Project Delta',
      description: 'Fourth project ensuring the grid works well with even numbers.',
      techStack: ['Vue', 'Firebase'],
      repoUrl: 'https://github.com/yourusername/project-delta',
    },
    // Add more projects here...
];
// --- END OF PROJECT DATA ---

const ProjectsSection = () => {
    const containerMaxWidth = "container.lg"; // Use large container width for content

    return (
    <Box py={{base: 10, md: 16}}>
        <VStack spacing={8} align="flex-start" maxWidth={containerMaxWidth} mx="auto">
            <Heading as="h2" size="xl" id="projects-heading">Projects</Heading> {/* Add id if needed for direct linking */}
            <SimpleGrid
                columns={{ base: 1, md: 2 }} // Max 2 columns from md up
                spacing={6}
                width="full"
            >
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </SimpleGrid>
        </VStack>
    </Box>
    );
};

export default ProjectsSection;