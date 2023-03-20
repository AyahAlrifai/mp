import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HeaderService {

    public header: String = "";
    private _header = new BehaviorSubject<String>('');


    constructor() {
        this._header.next(this.header);
    }

    public updateHeader(val: String): void {
        this.header = val;
        this._header.next(this.header);
    }
}