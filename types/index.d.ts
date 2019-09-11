// TypeScript Version: 2.3
import Global = NodeJS.Global;
import "jest";

declare global {
    const fetchMock: FetchMock;
    namespace NodeJS {
        interface Global {
            fetch: FetchMock;
        }
    }
}

export interface GlobalWithFetchMock extends Global {
    fetchMock: FetchMock;
    fetch: FetchMock;
}

export interface FetchMock
    extends jest.MockInstance<Promise<Response>, [(string | Request | undefined), (RequestInit | undefined)]> {
    (input?: string | Request, init?: RequestInit): Promise<Response>;

    // Response mocking
    mockResponse(fn: MockResponseInitFunction): FetchMock;
    mockResponse(response: string, responseInit?: MockParams): FetchMock;

    mockResponseOnce(fn: MockResponseInitFunction): FetchMock;
    mockResponseOnce(response: string, responseInit?: MockParams): FetchMock;

    once(fn: MockResponseInitFunction): FetchMock;
    once(url: string, responseInit?: MockParams): FetchMock;

    mockResponses(...responses: Array<string | [string, MockParams] | MockResponseInitFunction>): FetchMock;

    // Error/Reject mocking
    mockReject(error?: ErrorOrFunction): FetchMock;
    mockRejectOnce(error?: ErrorOrFunction): FetchMock;

    mockAbort(): FetchMock;
    mockAbortOnce(): FetchMock;

    // Conditional Mocking
    isMocking(input: string | Request): boolean;

    doMock(): FetchMock;
    doMock(fn: MockResponseInitFunction): FetchMock;
    doMock(response: string, responseInit?: MockParams): FetchMock;

    doMockOnce(): FetchMock;
    doMockOnce(fn?: MockResponseInitFunction): FetchMock;
    doMockOnce(response: string, responseInit?: MockParams): FetchMock;

    doMockIf(urlOrPredicate: UrlOrPredicate): FetchMock;
    doMockIf(urlOrPredicate: UrlOrPredicate, fn: MockResponseInitFunction): FetchMock;
    doMockIf(urlOrPredicate: UrlOrPredicate, response: string, responseInit?: MockParams): FetchMock;

    doMockOnceIf(urlOrPredicate: UrlOrPredicate): FetchMock;
    doMockOnceIf(urlOrPredicate: UrlOrPredicate, fn: MockResponseInitFunction): FetchMock;
    doMockOnceIf(urlOrPredicate: UrlOrPredicate, response: string, responseInit?: MockParams): FetchMock;

    dontMock(): FetchMock;
    dontMock(fn: MockResponseInitFunction): FetchMock;
    dontMock(response: string, responseInit?: MockParams): FetchMock;

    dontMockOnce(): FetchMock;
    dontMockOnce(fn?: MockResponseInitFunction): FetchMock;
    dontMockOnce(response: string, responseInit?: MockParams): FetchMock;

    dontMockIf(urlOrPredicate: UrlOrPredicate): FetchMock;
    dontMockIf(urlOrPredicate: UrlOrPredicate, fn: MockResponseInitFunction): FetchMock;
    dontMockIf(urlOrPredicate: UrlOrPredicate, response: string, responseInit?: MockParams): FetchMock;

    dontMockOnceIf(urlOrPredicate: UrlOrPredicate): FetchMock;
    dontMockOnceIf(urlOrPredicate: UrlOrPredicate, fn: MockResponseInitFunction): FetchMock;
    dontMockOnceIf(urlOrPredicate: UrlOrPredicate, response: string, responseInit?: MockParams): FetchMock;

    resetMocks(): void;
    enableMocks(): void;
    disableMocks(): void;
}

export interface MockParams {
    status?: number;
    statusText?: string;
    headers?: string[][] | { [key: string]: string }; // HeadersInit
    url?: string;
}

export interface MockResponseInit extends MockParams {
    body?: string;
    init?: MockParams;
}

export type ErrorOrFunction = Error | ((...args: any[]) => Promise<any>);
export type UrlOrPredicate = string | RegExp | ((input: Request) => boolean);

export type MockResponseInitFunction = (request: Request) => Promise<MockResponseInit | string>;
