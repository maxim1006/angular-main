import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class MGlobalErrorService implements ErrorHandler {
    handleError(error: any): void {
        console.error("Error occurred: ", error.mesaage);
        console.error("error: ", error);
    }
}
