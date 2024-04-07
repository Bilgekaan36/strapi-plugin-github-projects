import React from 'react';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Box, Typography, BaseCheckbox } from '@strapi/design-system';

const COL_COUNT = 5;
const ROW_COUNT = 6;

const Repo = () => {
  return (
    <Box padding={8} background='neutral100'>
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox aria-label='Select all entries' />
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
      </Table>
    </Box>
  );
};

export default Repo;
