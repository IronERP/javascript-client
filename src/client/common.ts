export class Common {
    private baseUrl: string;

    private clientSecret: string;

    constructor(baseUrl: string, clientSecret: string) {
        this.baseUrl = baseUrl;
        this.clientSecret = clientSecret;
    }

    /**
     * Fetch a generic resource identified by its type
     * @param resourceType
     * @constructor
     */
    public async fetchResource<T>(resourceType: string): Promise<T> {
        // TODO: Auth
        
        const res = await fetch(`${this.baseUrl}/${resourceType}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });
        
        return (await res.json()) as T;
    }

    /**
     * Post a generic object to the API
     * @param resourceType
     * @param obj
     * @constructor
     */
    public async postObject(resourceType: string, obj: any) : Promise<number> {
        // TODO: Auth

        const res = await fetch(`${this.baseUrl}/${resourceType}`, {
            method: "POST",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        
        return res.status;
    }

    /**
     * Fetch a raw object without a schema
     * @param resourceType
     * @constructor
     */
    public async fetchRaw(resourceType: string): Promise<any> {
        // TODO: Auth

        const res = await fetch(`${this.baseUrl}/${resourceType}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });
        
        return (await res.json()) as any;
    }

    /**
     * Fetch a single generic object without a schema identified by an ID
     * @param resourceType
     * @param id
     * @constructor
     */
    public async fetchOneRaw(resourceType: string, id: string): Promise<any> {
        // TODO: Auth

        const res = await fetch(`${this.baseUrl}/${resourceType}/${id}`, {
            method: "GET",
            headers: { 'Accept': 'application/json' }
        });

        return (await res.json()) as any;
    }
    
    /**
     * PUT a resource to the backend
     * @param resourceType 
     * @param content 
     * @returns 
     */
    public async putRaw(resourceType: string, content: any) : Promise<any> {
        // TODO: Auth

        const res = await fetch(`${this.baseUrl}/${resourceType}`, {
            method: "PUT",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        });
        
        return (await res.json()) as any;
    }
    
    /**
     * DELETE a resource from the backend
     * @param resourceType
     * @param id 
     * @returns 
     */
    public async deleteRaw(resourceType: string, id: string) : Promise<boolean> {
        // TODO: Auth
        
        const res = await fetch(`${this.baseUrl}/${resourceType}/?id=${id}`, {
            method: "DELETE",
            headers: { 'Accept': 'application/json' }
        });
        
        return res.status == 200;
    }
}