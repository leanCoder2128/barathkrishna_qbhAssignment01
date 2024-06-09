import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { userDetailDto } from '../shared/model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  apiURL: string;
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {
    this.apiURL = this.baseUrl + 'user';
  }

  getUserDetail() {
    return this.http.get<userDetailDto[]>(this.apiURL);
  }

  postUserDetail(userDetail: userDetailDto) {
    return this.http.post(this.apiURL, userDetail);
  }

  updateUserDetail(id : number,userDetail: userDetailDto) {
    return this.http.put(this.apiURL + '/' + id, userDetail);
  }

  deleteUserDetail(id : number){
    return this.http.delete(this.apiURL + '/' + id);
  }

}
