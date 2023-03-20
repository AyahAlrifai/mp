import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CustomerService {
    private host: string = "http://localhost:8080/CIS-SERVER/";
    public headers: any = {
        "Accept": "application/json, text/plain, */*",
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaOUF1bG9iSlQ2Mmd2al9mX1VwOGp0elcwVWM4dGRiVF8zYkZab3NSbWJvIn0.eyJleHAiOjE2NzkzODg5NTgsImlhdCI6MTY3OTIxNjE1OCwianRpIjoiNTcwNGVlZDctNTQ2Yy00ZDZhLTk0NmEtNjMxYmU4NDJhNmFiIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44NDo4MDgwL2F1dGgvcmVhbG1zL2Npcy1wLUQxMDktMDAwMDAwMiIsImF1ZCI6WyJDSVMtU0VSVkVSIiwiU1RPUkUtRlJPTlQiLCJhY2NvdW50Il0sInN1YiI6IjI3MDI5ZTU5LWM4MTUtNDVkMC1hNzA2LTgwY2I2NzY1MDQwMSIsInR5cCI6IkJlYXJlciIsImF6cCI6Ik1BUktFVC1QTEFDRSIsInNlc3Npb25fc3RhdGUiOiIwYzYyMDc2OC1lNTE1LTQ5YTctOTJlMS0xMGQ5ZTg0OWUyOWIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vMTkyLjE2OC4xLjg3IiwiaHR0cDovLzE5Mi4xNjguMy4xNzgiLCJodHRwczovL2xvY2FsaG9zdDo4MzgzIiwiaHR0cDovL2xvY2FsaG9zdDo4OTg5IiwiaHR0cDovLzE5Mi4xNjguMS44MyIsImh0dHA6Ly8xOTIuMTY4LjEuODIiLCJodHRwOi8vMTkyLjE2OC4zLjE3MDo4MzgzIiwiKiIsImh0dHA6Ly8xOTIuMTY4LjEuODUiLCJodHRwOi8vbG9jYWxob3N0IiwiaHR0cDovLzE5Mi4xNjguMS44NyIsImh0dHA6Ly8xOTIuMTY4LjEuODgiLCIxOTIuMTY4LjEuODciLCJodHRwOi8vbG9jYWxob3N0OjgzODMiLCJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJodHRwOi8vMTkyLjE2OC4zLjE3MCIsImh0dHBzOi8vMTkyLjE2OC4xLjEzNSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiTUFSS0VULVBMQUNFIjp7InJvbGVzIjpbIm1hcmtldF9yb2xlIl19LCJDSVMtU0VSVkVSIjp7InJvbGVzIjpbImFwaV91c2VyIl19LCJTVE9SRS1GUk9OVCI6eyJyb2xlcyI6WyJ1c2VyX3JvbGUiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ1bWFfcHJvdGVjdGlvbiIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiVXNlckF0dHJpYnV0ZU1hcHBlciIsInNpZCI6IjBjNjIwNzY4LWU1MTUtNDlhNy05MmUxLTEwZDllODQ5ZTI5YiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhZGRyZXNzIjp7fSwicGFydG5lckNvZGUiOiJjaXMtcC1EMTA5LTAwMDAwMDIiLCJmaXJzdExvZ2luIjoiTiIsInZhbGlkYXRlQ3VycmVudFBhc3N3b3JkIjpmYWxzZSwidG9rZW5Jc3N1ZURhdGUiOjE2NzQ0NjgwMzc0OTIsInByZWZlcnJlZF91c2VybmFtZSI6Im1wIiwibG9jYWxlIjoiZW4iLCJnaXZlbl9uYW1lIjoiTVAiLCJhZ2VudFVzZXIiOiJmYWxzZSIsInRva2VuIjoiZTlmYWVkMjVlNzc4NzczZDNkNGUwNzA5Zjc2Njg0ODIiLCJuYW1lIjoiTVAgTVBfIiwidXNlclR5cGUiOiJwb3J0YWxfdXNlciIsInBhc3NUZW1wIjoiTk9fREFUQSIsInBhc3NJc3N1ZURhdGUiOjAsImZhbWlseV9uYW1lIjoiTVBfIiwiZW1haWwiOiJtcEBtcC5tcCJ9.W2K23hp97FL1250M21uiyZvdClxvluvci7XyyaKNVUj9daXOjxBL1bgZB9d7vp5tErd21Q4vb4ld6V1nRlQ2d1SreNNardysiiwQZa0-d7KagrMjIxq0SOtKAOZ9uI_Tp6xA0NK4jSwFNIZjnveBfLdvTedcjyYci2o6GR53satki9ELAUmxdAZCNIb1BKbFMGp6DhciVb5DIdTYzdgo5mZrOZfU6XLMWxRHA8vZbQSCxvoVCus4GBpLClESmbCiTNzuyl9crFW9Zfe4UxnK5Bd9iG30gxtuTdG2K00G12ydZGMy6g3iwz6dk-YWWc9GfqpwIyXxoW4CPpFYArv9-A"
    };
    constructor(private http: HttpClient) { }

    public getCategories(): Observable<any> {

        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.host}rest/api/v1/customers/searchCustomerCategories`, body, { headers: this.headers });
    }


    public getCycles(): Observable<any> {
        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.host}rest/api/v1/customers/searchCycles`, body, { headers: this.headers });
    }

    public getPricebook(): Observable<any> {
        const body = {
            "length": -1
        };
        return this.http.post<any>(`${this.host}rest/api/v1/customers/searchPricePlans`, body, { headers: this.headers });
    }

    public search(body: any): Observable<any> {
        return this.http.post<any>(`${this.host}rest/api/v1/ui/searchCustomersBasic`, body, { headers: this.headers });
    }
}