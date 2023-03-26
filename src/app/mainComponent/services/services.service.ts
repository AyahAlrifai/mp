import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppService } from "src/app/app.service";

@Injectable()
export class ServicesService {
    constructor(private http: HttpClient, private appService: AppService) { }


    public search(body: any): Observable<any> {
        return this.http.post<any>(`${this.appService.host}rest/api/v1/pc/searchServices`, body, { headers: this.appService.headers });
    }
}