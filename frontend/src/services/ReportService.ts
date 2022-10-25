import http from "../utils/http-common";
import IReportData from "../types/Report";

const getAll = (parameters: any) => {
  return http.get<Array<IReportData>>("/reports", {params: parameters});
};

const get = (id: any) => {
  return http.get<IReportData>(`/reports/${id}`);
};

const create = (data: IReportData) => {
  return http.post<IReportData>("/reports", data);
};

const update = (id: any, data: IReportData) => {
  return http.put<any>(`/reports/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/reports/${id}`);
};

const ReportService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ReportService;