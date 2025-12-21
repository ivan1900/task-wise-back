export class ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;

  constructor(params: { success: boolean; data?: T; message?: string; error?: string }) {
    this.success = params.success;
    this.data = params.data;
    this.message = params.message;
    this.error = params.error;
  }

  static success<T>(data: T, message?: string): ApiResponse<T> {
    return new ApiResponse<T>({ success: true, data, message });
  }

  static error<T>(error: string, message?: string): ApiResponse<T> {
    return new ApiResponse<T>({ success: false, error, message });
  }
}
