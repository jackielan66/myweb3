import request from "./request";


export const getCollectionsRanking = (params: any) => {
  return request.get("/collections/ranking", params);
};

export const getCollections = (params: any) => {
  return request.get("/api/collections",  params);
};