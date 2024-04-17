export default {
  kind: 'collectionType',
  collectionName: 'projects',
  info: {
    singularName: 'project',
    pluralName: 'projects',
    displayName: 'Project',
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    repositoryId: {
      type: 'uid',
      unique: true,
    },
    title: {
      type: 'string',
      required: true,
      unique: true,
    },
    description: {
      type: 'string',
    },
    repositoryUrl: {
      type: 'string',
    },
    longDescription: {
      type: 'richtext',
    },
    logo: {
      type: 'media',
      allowedTypes: ['images'],
      multiple: false,
    },
  },
};
