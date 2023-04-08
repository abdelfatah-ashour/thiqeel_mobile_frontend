export class AxiosResponseModel {
  status?: number;
  message?: string;
  data?: { [key: string]: any } | null;
  errors?: { [key: string]: any } | null;

  constructor(
    status?: number,
    message?: string,
    data?: { [key: string]: any } | null,
    errors?: { [key: string]: any } | null,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
}
