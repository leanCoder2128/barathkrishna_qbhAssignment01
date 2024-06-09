import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : 'root'
})
export class PDFService {
    apiURL: string;
    baseUrl = environment.API_URL;
  
    constructor(private http: HttpClient) {
      this.apiURL = this.baseUrl + 'pdf';
    }


    viewinPDF(){
        return this.http.get(this.apiURL);
    }
  
}