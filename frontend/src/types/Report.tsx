export default interface IReportData {
  id?: number | null;
  name: string;
  email: string;
  description: string;
  latitude: number;
  longitude: number;
  reason: string;
  status: number;
}
