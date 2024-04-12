import { Box, Flex, Typography, Button } from '@strapi/design-system';

const BulkActions = ({
  selectedRepos,
  bulkCreateAction,
  bulkDeleteAction,
}: any) => {
  const reposWithoutProject = selectedRepos.filter(
    (repo: any) => !repo.projectId
  );
  const reposWithProject = selectedRepos.filter((repo: any) => repo.projectId);
  const projectsToBeCreated = reposWithoutProject.length;
  const projectsToBeDeleted = reposWithProject.length;
  const projectIdsToDelete = reposWithProject.map(
    (repo: any) => repo.projectId
  );

  return (
    <Box paddingBottom={4}>
      <Flex>
        <Typography>{`You have ${projectsToBeCreated} projects to generate and ${projectsToBeDeleted} to delete`}</Typography>
        {projectsToBeCreated > 0 && (
          <Box paddingLeft={2}>
            <Button
              size='S'
              variant='success-light'
              onClick={() => bulkCreateAction(reposWithoutProject)}
            >
              {`Create ${projectsToBeCreated} project(s)`}
            </Button>
          </Box>
        )}
        {projectsToBeDeleted > 0 && (
          <Box paddingLeft={2}>
            <Button
              size='S'
              variant='danger-light'
              onClick={() => bulkDeleteAction(projectIdsToDelete)}
            >
              {`Delete ${projectsToBeDeleted} project(s)`}
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default BulkActions;
