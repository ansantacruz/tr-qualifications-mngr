export interface IGenericError {
    Code: string;
    StatusCode: number;
    Reason: unknown;
}

interface IResponseError {
    CodeError: string;
    ServerStatusCode?: string;
    Severity: 'Info' | 'Warning' | 'Error';
    StatusCode: number;
    StatusDesc: any;
}

export interface IError {
    EndDt: string;
    Status: IResponseError;
}
