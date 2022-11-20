import { makeRequest } from "./makeRequest";

export const URL = "/postsByUser";

export const getPostsByUser = (config) => {
  config.url = `${URL}${config.url}`;

  return makeRequest({
    method: "GET",
    ...config,
  });
};

export const mutatePosts = (config) => {
  config.url = `${URL}${config.url}`;
  console.log(config, 'config');

  return makeRequest({
    method: 'PUT',
    ...config
  })
}