import { Common } from "./common.js";

export interface SearchResult {
    title: string;
    type: string;
    link: string;
}

export class Search {
    private allowedNameFields =  [ "Name", "name", "Title", "title", "Label", "label", "Description", "description" ];

    private _common: Common;

    constructor(common: Common) {
        this._common = common;
    }

    /**
     * Infer the "name" from the object
     * @param item 
     * @returns the name
     */
    private getName(item: any): string {
        let name = item["_v"]["_id"]["$oid"] as string;
        
        this.allowedNameFields.forEach(field => {
            if(item["_v"][field] != null) name = item["_v"][field] as string;            
        });
        
        return name;
    }

    /**
     * Perform a search
     * @param query 
     * @returns 
     */
    public async search(query: string): Promise<SearchResult[]> {
        const ret: SearchResult[] = [];
        
        const res = await this._common.fetchRaw(`_search?query=${query}`);
        
        res.map((i: any) => {
            const itemId = i["_v"]["_id"]["$oid"];
            const entityType = i["_v"]["$_iet"];
            
            ret.push({
                title: this.getName(i),
                type: entityType,
                link: `/entities/${entityType}/${itemId}/edit`
            });
        });
        
        return ret;
    }
}