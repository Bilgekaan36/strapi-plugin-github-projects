import { Box, Flex, Typography, Button } from '@strapi/design-system';
import ConfirmationDialog from './ConfirmationDialog';
import { useState } from 'react';

const BulkActions = ({
  selectedRepos,
  bulkCreateAction,
  bulkDeleteAction,
}: any) => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
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
              onClick={() => setDialogVisible(true)}
            >
              {`Delete ${projectsToBeDeleted} project(s)`}
            </Button>
          </Box>
        )}
      </Flex>
      <ConfirmationDialog
        visible={!!projectsToBeDeleted}
        message={`Are you sure you want to delete these project(s)?`}
        onClose={() => setDialogVisible(false)}
        onConfirm={() => {
          bulkDeleteAction(projectIdsToDelete);
          setDialogVisible(false);
        }}
      />
    </Box>
  );
};

export default BulkActions;
