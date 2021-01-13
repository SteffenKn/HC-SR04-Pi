import fetch, {RequestInit, Response as FetchResponse} from 'node-fetch';

export class HttpClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  public get(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'GET';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  public head(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'HEAD';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  public post(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'POST';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  public put(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'PUT';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  public delete(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'DELETE';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  public connect(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'CONNECT';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  public options(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'OPTIONS';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  public trace(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'TRACE';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  public patch(route: string, options: RequestInit = {}): Promise<FetchResponse> {
    const url: string = this.buildUrl(route);

    options.method = 'PATCH';
    options.headers = {'Content-Type': 'application/json'};

    return fetch(url, options);
  }

  private buildUrl(route: string): string {
    const url: string = `${this.baseUrl}${route}`;

    if (this.apiKey) {
      return `${url}?apiKey=${this.apiKey}`;
    }

    return url;
  }
}
