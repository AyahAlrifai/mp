import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CustomerService {
    private host: string = "http://localhost:8080/CIS-SERVER/";
    public  headers:any = {
        "Accept": "application/json, text/plain, */*",
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaOUF1bG9iSlQ2Mmd2al9mX1VwOGp0elcwVWM4dGRiVF8zYkZab3NSbWJvIn0.eyJleHAiOjE2Nzc5MzY3MjUsImlhdCI6MTY3Nzc2MzkyNSwianRpIjoiYzU1NGJlZmItYmExYi00NDA2LTgwMjMtMjE2NTk2MWFiNWZlIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44NDo4MDgwL2F1dGgvcmVhbG1zL2Npcy1wLUQxMDktMDAwMDAwMiIsImF1ZCI6WyJDSVMtU0VSVkVSIiwiU1RPUkUtRlJPTlQiLCJhY2NvdW50Il0sInN1YiI6IjI3MDI5ZTU5LWM4MTUtNDVkMC1hNzA2LTgwY2I2NzY1MDQwMSIsInR5cCI6IkJlYXJlciIsImF6cCI6Ik1BUktFVC1QTEFDRSIsInNlc3Npb25fc3RhdGUiOiJjZGZlOTQ2Ny03NDljLTQ2NGEtYTg1Ni03YjgwMzYwMzVlZDQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vMTkyLjE2OC4xLjg3IiwiaHR0cDovLzE5Mi4xNjguMy4xNzgiLCJodHRwczovL2xvY2FsaG9zdDo4MzgzIiwiaHR0cDovL2xvY2FsaG9zdDo4OTg5IiwiaHR0cDovLzE5Mi4xNjguMS44MyIsImh0dHA6Ly8xOTIuMTY4LjEuODIiLCJodHRwOi8vMTkyLjE2OC4zLjE3MDo4MzgzIiwiKiIsImh0dHA6Ly8xOTIuMTY4LjEuODUiLCJodHRwOi8vbG9jYWxob3N0IiwiaHR0cDovLzE5Mi4xNjguMS44NyIsImh0dHA6Ly8xOTIuMTY4LjEuODgiLCIxOTIuMTY4LjEuODciLCJodHRwOi8vbG9jYWxob3N0OjgzODMiLCJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJodHRwOi8vMTkyLjE2OC4zLjE3MCIsImh0dHBzOi8vMTkyLjE2OC4xLjEzNSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiTUFSS0VULVBMQUNFIjp7InJvbGVzIjpbIm1hcmtldF9yb2xlIl19LCJDSVMtU0VSVkVSIjp7InJvbGVzIjpbImFwaV91c2VyIl19LCJTVE9SRS1GUk9OVCI6eyJyb2xlcyI6WyJ1c2VyX3JvbGUiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ1bWFfcHJvdGVjdGlvbiIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiVXNlckF0dHJpYnV0ZU1hcHBlciIsInNpZCI6ImNkZmU5NDY3LTc0OWMtNDY0YS1hODU2LTdiODAzNjAzNWVkNCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhZGRyZXNzIjp7fSwicGFydG5lckNvZGUiOiJjaXMtcC1EMTA5LTAwMDAwMDIiLCJmaXJzdExvZ2luIjoiTiIsInZhbGlkYXRlQ3VycmVudFBhc3N3b3JkIjpmYWxzZSwidG9rZW5Jc3N1ZURhdGUiOjE2NzQ0NjgwMzc0OTIsInByZWZlcnJlZF91c2VybmFtZSI6Im1wIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoiTVAiLCJhZ2VudFVzZXIiOiJmYWxzZSIsInRva2VuIjoiZTlmYWVkMjVlNzc4NzczZDNkNGUwNzA5Zjc2Njg0ODIiLCJuYW1lIjoiTVAgTVBfIiwidXNlclR5cGUiOiJwb3J0YWxfdXNlciIsInBhc3NUZW1wIjoiTk9fREFUQSIsInBhc3NJc3N1ZURhdGUiOjAsImZhbWlseV9uYW1lIjoiTVBfIiwiZW1haWwiOiJtcEBtcC5tcCJ9.epeqGGsIhvE6d-MP4XvEbU_SUKeoN0h3u9ltU6VNegn7lxYi7PFqDXSQjJtEQI8VGwfs0XgzSfTtQ5i-bxu3xwuzJFi59WS26Gb_8038An5cW8D56iR4wC-pNRfeYU4KKc7C-che45zlNksE9jvIyaf6Cvah0TAm8IbbtdvnAkE6HYNY9_1Kxrc1LL9jH6MQFcDX2hog6yExR_cARaMRMZd97Y0eYIpOlyvnXwEIniluVxLajDS_SmcY8YaWG5laYTPpHE_-ZOiNsMD83vS5KdIxcZVcCQrPc1A6BI6ZJfvEVZQ98Z-jdfYLHz8sZHW6FoTL6gTu4DdlKtlPMDoUog",

    };
    constructor(private http: HttpClient) { }

    public getCategories(): Observable<any> {
        
        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.host}rest/api/v1/customers/searchCustomerCategories`, body, {headers:this.headers});
    }

    
    public getCycles(): Observable<any> {
        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.host}rest/api/v1/customers/searchCycles`, body, {headers:this.headers});
    }

    public getPricebook(): Observable<any> {
        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.host}rest/api/v1/customers/searchPricePlans`, body, {headers:this.headers});
    }

    public search(body : any): Observable<any> {
        return this.http.post<any>(`${this.host}rest/api/v1/ui/searchCustomersBasic`, body, {headers:this.headers});
    }
}