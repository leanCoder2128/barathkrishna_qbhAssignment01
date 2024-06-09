import { Injectable } from "@angular/core";
import { userDetailDto } from "../shared/model";
import { BehaviorSubject, Subject } from "rxjs";



@Injectable({
    providedIn : 'root'
})
export class EditUserDetailService {

    private UserDetail  = new BehaviorSubject<object | null>(null);
    private eventSubject = new Subject<any>();
    getUserDetail = this.UserDetail.asObservable();
    userDetailSaved$ = this.eventSubject.asObservable();

    constructor(){}


    setUserDetail(userDetail : userDetailDto){
        this.UserDetail.next(userDetail)
    }

    emitUserDetailSavedEvent(data: string) {
        this.eventSubject.next(data);
      }
}