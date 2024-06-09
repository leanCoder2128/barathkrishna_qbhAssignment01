import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserDetailService } from '../service/editUserDetail.service';
import { userDetailDto } from '../shared/model';
import { UserDetailService } from '../service/userDetail.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-userDetail',
  templateUrl: 'userDetail.componnet.html',
  styleUrl: 'userDetail.componnet.scss',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userDetailForm: FormGroup;
  isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private editUserSvc: EditUserDetailService,
    private userDetailSvc: UserDetailService,
    private notificationSvc : NotificationsService
  ) {
    this.userDetailForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      address: [null, [Validators.required]],
    });

    this.editUserSvc.getUserDetail.subscribe((res) => {
      console.log(res, 'res');
      this.isUpdate = res ? true : false;
      this.userDetailForm.patchValue(res as userDetailDto);
    });
  }

  ngOnInit(): void {}

  submitUserDetail() {
    const userDetail = this.userDetailForm.value;
    if (!this.isUpdate) {
      this.userDetailSvc.postUserDetail(userDetail).subscribe((res) => {
        if(res){
          this.notificationSvc.success('Success !, User created successfully');
          this.editUserSvc.emitUserDetailSavedEvent('success');
        }
      },(err) => {
        this.notificationSvc.success('Error !, While creating user',err);
      });
    } else {
      this.userDetailSvc
        .updateUserDetail(userDetail.id, userDetail)
        .subscribe((res) => {
          this.notificationSvc.success('Success !, User updated successfully')
          this.editUserSvc.emitUserDetailSavedEvent('success');
        },(err) => {
          this.notificationSvc.success('Error !, While updating user',err);
        });
      this.isUpdate = false;
    }

    this.resetForm();
  }

  resetForm() {
    this.userDetailForm.reset();
    this.userDetailForm.markAsUntouched();
  }

  ngOnDestroy(): void {
    this.editUserSvc.getUserDetail.subscribe().unsubscribe();
  }
}
