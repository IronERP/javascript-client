import { Common } from './common.js'
import { ModelClient } from './model-client.js';
import { Search } from './search.js';

export class IronERPClient {
    private static BASE_URL: string;
    private static CLIENT_SECRET: string;
    private static INITIALIZED: boolean = false;

    private static _common: Common;
    private static _modelClient: ModelClient;
    private static _searchClient: Search;

    public static init(baseUrl: string, clientSecret: string): void {
        this.BASE_URL = baseUrl;
        this.CLIENT_SECRET = clientSecret;
        this.INITIALIZED = true;

        this._common = new Common(baseUrl, clientSecret);
        this._modelClient = new ModelClient(this._common);
        this._searchClient = new Search(this._common);
    }

    /**
     * Get the raw client
     */
    public static get common(): Common {
        return this._common;
    }

    /**
     * Interact with Model resources
     */
    public static get models(): ModelClient {
        return this._modelClient;
    }

    /**
     * Perform search
     */
    public static get search(): Search {
        return this._searchClient;
    }
}