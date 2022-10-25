import http from "../utils/http-common";
import IShopData from "../types/Shop";

const getAll = (parameters: any) => {
  return http.get<Array<IShopData>>("/shops", {params: parameters});
};

const get = (id: any) => {
  return http.get<IShopData>(`/shops/${id}`);
};

const create = (data: IShopData) => {
  return http.post<IShopData>("/shops", data);
};

const update = (id: any, data: IShopData) => {
  return http.put<any>(`/shops/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/shops/${id}`);
};

const ShopService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ShopService;