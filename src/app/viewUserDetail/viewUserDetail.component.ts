import { Component, OnDestroy, OnInit } from '@angular/core';
import { userDetailDto } from '../shared/model';
import { EditUserDetailService } from '../service/editUserDetail.service';
import { UserDetailService } from '../service/userDetail.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PDFService } from '../service/PDF.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-view-user-detail',
  templateUrl: 'viewUserDetail.component.html',
  styleUrl: 'viewUserDetail.component.scss',
})
export class ViewUserDetailComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'phoneNumber',
    'address',
    'action',
  ];
  dataSource = new MatTableDataSource<userDetailDto>();
  private eventSubscription: Subscription;

  constructor(
    private editUserSvc: EditUserDetailService,
    private userDetailSvc: UserDetailService,
    private notificationSvc : NotificationsService
  ) {}

  ngOnInit(): void {
    this.getUserDetail();
    this.eventSubscription = this.editUserSvc.userDetailSaved$.subscribe(
      (res) => {
        this.getUserDetail();
      }
    );
  }

  getUserDetail() {
    this.userDetailSvc.getUserDetail().subscribe((res) => {
      this.dataSource.data = res;
    },(err) => {
      this.notificationSvc.error('Error!, While getting user detail', err);
    });
  }

  editItem(element: userDetailDto) {
    this.editUserSvc.setUserDetail(element);
  }

  deleteItem(element: userDetailDto) {
    this.userDetailSvc.deleteUserDetail(element.id).subscribe((res) => {
      this.notificationSvc.success('Success!, User Deleted Successfully');
      this.getUserDetail();
    },(err) => {
      this.notificationSvc.error('Error!, While deleting user detail', err);
    });
  }

  viewAsPDF(){
    window.open('http://localhost:3000/pdf/view');
  }

  DownloadAsPDF(){
    window.open('http://localhost:3000/pdf');
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
