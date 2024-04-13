import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Typography,
  BaseCheckbox,
  Loader,
  Alert,
  Flex,
  IconButton,
  Link,
} from '@strapi/design-system';

import { Pencil, Trash, Plus } from '@strapi/icons';
import ConfirmationDialog from './ConfirmationDialog';
import BulkActions from './BulkActions';
import { useFetchClient } from '@strapi/helper-plugin';

const COL_COUNT = 5;

const Repo = () => {
  const [repos, setRepos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRepos, setSelectedRepos] = useState<any>([]);
  const [alert, setAlert] = useState<any>(undefined);
  const [deletingRepo, setDeletingRepo] = useState<any>(undefined);

  const client = useFetchClient();

  const showAlert = (alert: any) => {
    setAlert(alert);
    setTimeout(() => setAlert(undefined), 5000);
  };

  const createProject = async (repo: any) => {
    const response = await client.post('/github-projects/project', repo);
    if (response && response.data) {
      setRepos(
        repos.map((item: any) =>
          item.id !== repo.id ? item : { ...item, projectId: response.data.id }
        )
      );
      showAlert({
        title: 'Project created',
        message: `Successfully created project ${response.data.title}`,
        variant: 'success',
      });
    } else {
      showAlert({
        title: 'An error occured',
        message: 'Error creating the project. Please retry',
        variant: 'danger',
      });
    }
  };

  const deleteProject = async (repo: any) => {
    const { projectId } = repo;
    const response = await client.del(`/github-projects/project/${projectId}`);
    if (response && response.data) {
      setRepos(
        repos.map((item: any) =>
          item.id !== repo.id ? item : { ...item, projectId: null }
        )
      );
      showAlert({
        title: 'Project deleted',
        message: `Successfully deleted project ${response.data.title}`,
        variant: 'success',
      });
    } else {
      showAlert({
        title: 'An error occured',
        message: 'Error deleting the project. Please retry',
        variant: 'danger',
      });
    }
  };

  const createAll = async (reposToBecomeProjects: any) => {
    const response = await client.post('/github-projects/projects', {
      repos: reposToBecomeProjects,
    });
    if (
      response &&
      response.data &&
      response.data.length === reposToBecomeProjects.length
    ) {
      setRepos(
        repos.map((repo: any) => {
          const relatedProjectJustCreated = response.data.find(
            (project: any) => project.repositoryId === repo.id.toString()
          );
          return !repo.projectId && relatedProjectJustCreated
            ? {
                ...repo,
                projectId: relatedProjectJustCreated.id,
              }
            : repo;
        })
      );
      showAlert({
        title: 'Project created',
        message: `Successfully created ${response.data.length} projects`,
        variant: 'success',
      });
    } else {
      showAlert({
        title: 'An error occured',
        message: `At least one project wasn't correctly created. Please check and retry.`,
        variant: 'danger',
      });
    }
    setSelectedRepos([]);
  };

  const deleteAll = async (projectIds: any) => {
    const response = await client.del('/github-projects/projects', {
      params: { projectIds },
    });
    if (
      response &&
      response.data &&
      response.data.length === projectIds.length
    ) {
      setRepos(
        repos.map((repo: any) => {
          const relatedProjectJustDeleted = response.data.find(
            (project: any) => project.repositoryId === repo.id.toString()
          );
          return repo.projectId && relatedProjectJustDeleted
            ? {
                ...repo,
                projectId: null,
              }
            : repo;
        })
      );
      showAlert({
        title: 'Project deleted',
        message: `Successfully deleted ${response.data.length} projects`,
        variant: 'success',
      });
    } else {
      showAlert({
        title: 'An error occured',
        message: `At least one project wasn't correctly deleted. Please check and retry.`,
        variant: 'danger',
      });
    }
    setSelectedRepos([]);
  };

  useEffect(() => {
    setLoading(true);
    // fetch data
    client
      .get('/github-projects/repos')
      .then((repos: any) => setRepos(repos.data))
      .catch((error: any) =>
        showAlert({
          title: 'Error fetching repositories',
          message: error.toString(),
          variant: 'danger',
        })
      );
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  const allChecked = selectedRepos.length === repos.length;
  const isIndeterminate = selectedRepos.length > 0 && !allChecked;

  return (
    <Box padding={8} background='neutral100'>
      {alert && (
        <div style={{ position: 'absolute', top: 0, left: '14%', zIndex: 10 }}>
          <Alert
            closeLabel='Close alert'
            title={alert.title}
            variant={alert.variant}
          >
            {alert.message}
          </Alert>
        </div>
      )}
      {selectedRepos.length > 0 && (
        <BulkActions
          selectedRepos={selectedRepos.map((repoId: string) =>
            repos.find((repo: any) => repo.id === repoId)
          )}
          bulkCreateAction={createAll}
          bulkDeleteAction={deleteAll}
        />
      )}
      <Table colCount={COL_COUNT} rowCount={repos.length}>
        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox
                aria-label='Select all entries'
                value={allChecked}
                indeterminate={isIndeterminate}
                onValueChange={(value: any) =>
                  value
                    ? setSelectedRepos(repos.map((repo: any) => repo.id))
                    : setSelectedRepos([])
                }
              />
            </Th>
            <Th>
              <Typography variant='sigma'>Name</Typography>
            </Th>
            <Th>
              <Typography variant='sigma'>Description</Typography>
            </Th>
            <Th>
              <Typography variant='sigma'>Url</Typography>
            </Th>
            <Th>
              <Typography variant='sigma'>Actions</Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {repos.map((repo: any) => {
            const { id, name, shortDescription, url, projectId } = repo;
            return (
              <Tr key={id}>
                <Td>
                  <BaseCheckbox
                    aria-label={`Select ${id}`}
                    value={selectedRepos.includes(id)}
                    onValueChange={(value: any) => {
                      const newSelectedRepos = value
                        ? [...selectedRepos, id]
                        : selectedRepos.filter((repoId: any) => repoId !== id);
                      setSelectedRepos(newSelectedRepos);
                    }}
                  />
                </Td>
                <Td>
                  <Typography textColor='neutral800'>{name}</Typography>
                </Td>
                <Td>
                  <Typography textColor='neutral800'>
                    {shortDescription}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor='neutral800'>
                    <Link href={url} isExternal>
                      {url}
                    </Link>
                  </Typography>
                </Td>
                <Td>
                  {projectId ? (
                    <Flex>
                      <Link
                        to={`/content-manager/collection-types/plugin::github-projects.project/${projectId}`}
                      >
                        <IconButton
                          onClick={() => console.log('edit')}
                          label='Edit'
                          noBorder
                          icon={<Pencil />}
                        />
                      </Link>
                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => setDeletingRepo(repo)}
                          label='Delete'
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  ) : (
                    <IconButton
                      onClick={() => createProject(repo)}
                      label='Add'
                      noBorder
                      icon={<Plus />}
                    />
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {deletingRepo && (
        <ConfirmationDialog
          visible={!!deletingRepo}
          message='Are you sure you want to delete this project?'
          onClose={() => setDeletingRepo(undefined)}
          onConfirm={() => deleteProject(deletingRepo)}
        />
      )}
    </Box>
  );
};

export default Repo;
