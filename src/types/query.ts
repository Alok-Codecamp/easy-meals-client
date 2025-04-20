import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { IMealProvider } from "./mealProvider";

export type TError = {
    data: {
        message: string;
        stack?: string;
        success: boolean;
    },
    status: number
}


export type TQueryParam = {
    name: string;
    value: string | React.Key | Record<string, unknown> | boolean;
};

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

export type TResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    error: TError;
    meta: TMeta;

}

export type TResponseData = {
    data: {
        statusCode: number;
        success: boolean;
        message: string;
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPage: number;
        };
        data: IMealProvider[]; // ✅ The actual array
    };
};

export type TReduxResponse<T> = TResponse<T> & BaseQueryApi;