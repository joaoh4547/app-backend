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

export default ValidationError;
