export interface SearchDataModle {
    "searchField": string,
    "searchValues": string | Array<string> | null,
    "operator": string,
    "condition"?: string,
    "fromExternal"?: boolean
}