// components/ProjectCard.js
import {
  Card, // Use Card component
  CardHeader, // Optional: for structured header
  CardBody, // Optional: for main content
  CardFooter, // Optional: for links/actions
  Heading,
  Text,
  Link,
  HStack,
  VStack,
  Tag,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ title, description, techStack = [], liveUrl, repoUrl }) => {
  // Get colors needed for elements NOT styled by Card defaults (like specific text/links)
  const textColor = useColorModeValue('githubLight.text', 'githubDark.text');
  const secondaryTextColor = useColorModeValue('githubLight.textSecondary', 'githubDark.textSecondary');
  const linkColor = useColorModeValue('githubLight.link', 'githubDark.link');

  return (
    // Use the Card component - it will inherit theme defaults
    <Card height="100%" variant="outline"> {/* Ensure outline variant if needed, though it's default now */}
        <CardBody> {/* Use CardBody for padding */}
            <VStack align="stretch" spacing={2}>
                {/* Card title using Heading - style links explicitly */}
                <Heading size="md">
                    <Link href={repoUrl || liveUrl || '#'} isExternal _hover={{ textDecoration: 'underline', color: linkColor }}>
                        {title}
                    </Link>
                </Heading>

                {/* Description */}
                <Text fontSize="sm" color={secondaryTextColor} pt={1}>
                {description}
                </Text>

                {/* Tech Stack Tags */}
                <HStack spacing={2} wrap="wrap" pt={2}>
                {techStack.map((tech) => (
                    // Tag will use theme defaults (subtle variant, pill shape)
                    <Tag size="sm" key={tech}>
                    {tech}
                    </Tag>
                ))}
                </HStack>

                {/* Links */}
                <HStack justify="flex-start" spacing={4} pt={4} >
                {liveUrl && (
                    <Link href={liveUrl} isExternal color={secondaryTextColor} fontSize="xs" _hover={{ color: linkColor, textDecoration: 'underline' }}>
                    <Icon as={FaExternalLinkAlt} mx="2px" mb="-2px" /> Live Demo
                    </Link>
                )}
                {repoUrl && (
                    <Link href={repoUrl} isExternal color={secondaryTextColor} fontSize="xs" _hover={{ color: linkColor, textDecoration: 'underline' }}>
                    <Icon as={FaGithub} mx="2px" mb="-2px" /> Code
                    </Link>
                )}
                </HStack>
            </VStack>
        </CardBody>
    </Card>
  );
};

export default ProjectCard;