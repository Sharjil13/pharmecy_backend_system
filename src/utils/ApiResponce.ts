export class ApiResponce implements ApiResponce {
  status: number;
  success: boolean;
  message: string;
  data: object;
  constructor(status: number, success: boolean, message: string, data: object) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
