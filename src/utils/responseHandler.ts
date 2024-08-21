export class ResponseHandler {
  static success(data: any, message: string = '', statusCode: number = 200) {
    return {
      status: statusCode,
      message: message || 'Operation successful',
      data: data,
    };
  }

  static error(
    message: string = '',
    data: any = null,
    statusCode: number = 500,
  ) {
    return {
      status: statusCode,
      message: message || 'Operation failed',
      data: data,
    };
  }
}
