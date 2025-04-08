import request from "./request";

export const getLoginMessage = (params: { address: string }) => {
  return request.get(`/user/${params.address}/login-message`, params);
};

export const handleUserLogin = (data: {
  chain_id: number,
  signature: string,
  address: string,
  message: string
}) => {
  return request.post(`/user/login`, data);
};

export const getUserStatus = (params: any) => {
  return request.get(`/user/${params.address}/sig-status`, params);
};

export const getCollectionsRanking = (params: any) => {
  return request.get("/collections/ranking", params);
};

export const getCollections = (params: any) => {
  return request.get("/collections", params);
};

export const getCollectionsAddress = (params: any) => {
  return request.get(`/collections/${params.address}`, params);
};

export const getCollectionsItems = (params: any) => {
  return request.get(`/collections/${params.address}/items`, {filters: params.filters});
};

export const getActivities = (params: any) => {
  return request.get(`/activities`, params);
};

export const getPortfolioCollections = (params: any) => {
  return request.get(`/portfolio/collections`, params);
};

export const getPortfolioList = (params: any) => {
  return request.get(`/portfolio/listings`, params);
};

export const getPortfolioBids = (params: any) => {
  return request.get(`/portfolio/bids`, params);
};