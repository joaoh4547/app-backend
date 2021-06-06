export class ValidationError {
    errors: FieldError[] = [];
}

export class FieldError {
    name: string;
    message: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
    }
}
class BaseError {
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}

export class NotFound extends BaseError {}

export default ValidationError;
