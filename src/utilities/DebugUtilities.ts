import httpStatus from 'http-status';
import { IError } from '../model/IError';

export const MessageError = 'ERROR: %j';
export class DebugUtilities {

    public static getMessage(reason: any): string {
        if (reason instanceof Error) {
            return reason.message;
        } else {
            return reason;
        }
    }

    public static error(error: any, typeError: any, uuid?: string): any {
        const descError = error.Reason === undefined ?
            error : error.Reason;
        const codeError = error.CodeError === undefined ?
            '000-0' : error.CodeError.toString();
        const codeStatusError = error.StatusCode === undefined ?
            500 : error.StatusCode;
        //@ts-ignore
        const descStatusError = httpStatus[codeStatusError].toString();
        const statusError: IError = {
            EndDt: new Date().toISOString(),
            Status: {
                CodeError: codeError,
                ServerStatusCode: descStatusError,
                Severity: typeError,
                StatusCode: codeStatusError,
                StatusDesc: descError
            }
        };
        return { statusError, codeStatusError, uuid };
    }
}
