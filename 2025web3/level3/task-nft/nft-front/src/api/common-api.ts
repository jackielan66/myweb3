import request from "./request";


export const getCollectionsRanking = (params: any) => {
  return request.get("/collections/ranking", params);
};

export const getCollections = (params: any) => {
  return request.get("/collections",  params);
};

export const getCollectionsAddress = (params: any) => {
  return request.get(`/collections/${params.address}`,  params);
};

export const getCollectionsItems = (params: any) => {
  return request.get(`/collections/${params.address}`,  params);
};

export const getActivities = (params: any) => {
  return request.get(`/activities`,  params);
};