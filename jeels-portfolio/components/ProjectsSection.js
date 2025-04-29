// components/ProjectsSection.js
import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';

// --- UPDATED WITH RESUME PROJECTS ---
const projectsData = [
    {
        title: 'Spotify Database Architect',
        description: 'Led a 3-member team to design a scalable Oracle database, optimizing queries and triggers. Reduced runtime by 15% via indexing and ACID compliance. Automated reporting with stored procedures.',
        techStack: ['PL/SQL', 'Oracle 19c', 'MS Access', 'Database Design', 'Optimization'],
        // repoUrl: 'Link to repo if public', // Add if applicable
    },
    {
        title: 'Personal Portfolio Website',
        description: 'Developed this responsive portfolio website using Next.js, Chakra UI, and Git. Integrated Google Analytics and aimed for high Lighthouse scores for performance and accessibility.',
        techStack: ['Next.js', 'React', 'Chakra UI', 'HTML5', 'CSS3', 'JavaScript', 'Git'],
        repoUrl: 'https://github.com/jeelsgit/jeels-portfolio', // Link to THIS repo
        liveUrl: '#', // Link to the deployed site later
    },
     {
        title: 'Flood Mapping Tool (NASA Space Apps)',
        description: 'Developed during the NASA Space Apps Challenge 2024. Used ArcGIS and historical climate data to analyze and predict high-risk flood zones.',
        techStack: ['ArcGIS', 'Python', 'Data Analysis', 'Geo-Mapping'],
        // repoUrl: 'Link to repo if public', // Add if applicable
    },
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
    // Add other projects if you have them
];
// --- END OF PROJECT DATA ---

const ProjectsSection = () => {
    const containerMaxWidth = "container.lg"; // Consistent width

    return (
        <VStack spacing={8} align="flex-start" maxWidth={containerMaxWidth} mx="auto">
            <Heading as="h2" size="xl">Projects</Heading>
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={6}
                width="full"
            >
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export default ProjectsSection;