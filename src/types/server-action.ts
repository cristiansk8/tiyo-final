export type ServerActionResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};