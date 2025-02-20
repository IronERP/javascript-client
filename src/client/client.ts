import { Common } from './common.js'
import { ModelClient } from './model-client.js';
import { Search } from './search.js';

export class IronERPClient {
    private BASE_URL: string;
    private CLIENT_SECRET: string;
    private INITIALIZED: boolean = false;

    private _common: Common;
    private _modelClient: ModelClient;
    private _searchClient: Search;

    constructor(baseUrl: string, clientSecret: string) {
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
    public get common(): Common {
        return this._common;
    }

    /**
     * Interact with Model resources
     */
    public get models(): ModelClient {
        return this._modelClient;
    }

    /**
     * Perform search
     */
    public get search(): Search {
        return this._searchClient;
    }
}