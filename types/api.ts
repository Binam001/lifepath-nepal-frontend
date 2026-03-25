export type ApiErrorBag = Record<string, string[]>;

export type ApiResponse<T = unknown> = {
  success: boolean;
  status: number;
  message?: string;
  errors?: ApiErrorBag;
  data?: T;
};
