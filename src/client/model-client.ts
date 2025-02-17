import { Common } from "./common.js";

export interface SimpleModelSpec {
    name: string,
    isGenerated: boolean
}

export interface Schema {
    id: string;
    name: string;
    namespace: string;
    fields: SchemaField[];
}

export interface SchemaField {
    name: string;
    label: string;
    type: string;
    required: boolean;
    secret: boolean;
    redacted: boolean;
    foreignKeyTarget?: string | null;
}

export class ModelClient {
    private _common: Common;

    constructor(common: Common) {
        this._common = common;
    }

    /**
     * Fetch a list of available models
     * @returns
     */
    public async listModels(): Promise<SimpleModelSpec[]> {
        return await this._common.fetchResource<SimpleModelSpec[]>("Configuration/ModelsV2");
    }

    /**
     * Load a model schema definition
     * @param modelName name of the model
     * @returns 
     */
    public async getSchema(modelName: string): Promise<Schema> {
        return await this._common.fetchResource<Schema>(`${modelName}/_schema`);
    }

    /**
     * Fetch a list of entities for the specified model
     * @param modlName name of the model
     */
    public async getItems(modelName: string): Promise<any> {
        return await this._common.fetchRaw(modelName);
    }

    /**
     * Get a specific entity of a model using its ID
     * @param modelName name of the model
     * @param objectId id of the object
     * @returns 
     */
    public async getItem(modelName: string, objectId: string): Promise<any> {
        return await this._common.fetchOneRaw(modelName, objectId);
    }

    /**
     * Create a new item
     * @param modelName name of the model
     * @param item the item
     * @returns amount of created objects
     */
    public async createItem(modelName: string, item: any): Promise<number> {
        return await this._common.postObject(modelName, item);
    }

    /**
     * Update an item
     * @param modelName name of the model 
     * @param item the item to update, must contain an ID
     * @returns
     */
    public async updateItem(modelName: string, item: any): Promise<any> {
        return await this._common.putRaw(modelName, item);
    }

    /**
     * Delete an item
     * @param modelName name of the model 
     * @param objectId ID of the object to delete
     * @returns success?
     */
    public async deleteItem(modelName: string, objectId: string): Promise<boolean> {
        return await this._common.deleteRaw(modelName, objectId);
    }

    /**
     * Search for entities in a specific model
     * @param modelName name of the model
     * @param query the query
     * @returns list of results
     */
    public async searchItems(modelName: string, query: string): Promise<any[]> {
        return await this._common.fetchResource<any[]>(`${modelName}/_search?query=${query}`);
    }
}