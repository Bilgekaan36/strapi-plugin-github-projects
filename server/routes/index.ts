export default [
  {
    method: "GET",
    path: "/repos",
    handler: "getReposController.index",
    config: {
      policies: [],
      auth: false, //TODO: change this tp authorized only for admin users
    },
  },
];
