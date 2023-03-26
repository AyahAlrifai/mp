import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppService } from "src/app/app.service";

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient, private appService: AppService) { }

    public getCategories(): Observable<any> {

        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.appService.host}rest/api/v1/customers/searchCustomerCategories`, body, { headers: this.appService.headers });
    }


    public getCycles(): Observable<any> {
        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.appService.host}rest/api/v1/customers/searchCycles`, body, { headers: this.appService.headers });
    }

    public getPricebook(): Observable<any> {
        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.appService.host}rest/api/v1/customers/searchPricePlans`, body, { headers: this.appService.headers });
    }

    public search(body: any): Observable<any> {
        return this.http.post<any>(`${this.appService.host}rest/api/v1/ui/searchCustomersBasic`, body, { headers: this.appService.headers });
    }
}