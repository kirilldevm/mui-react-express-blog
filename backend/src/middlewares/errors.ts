export class HttpException {
  message: string;
  status: number;
  errors?: any;

  constructor(message: string, status: number, errors?: any) {
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad request error.', errors?: any) {
    super(message, 400, errors);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not found error.', errors?: any) {
    super(message, 404, errors);
  }
}

export class InternalException extends HttpException {
  constructor(message: string = 'Internal server error.', errors?: any) {
    super(message, 500, errors);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Forbidden error.', errors?: any) {
    super(message, 403, errors);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized error.', errors?: any) {
    super(message, 401, errors);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflict.', errors?: any) {
    super(message, 409, errors);
  }
}