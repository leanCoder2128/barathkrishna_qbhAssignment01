import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'qbhAssignment01';

  notificationOptions = {
    timeOut: 1500,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    // animate: 'fromRight',
  };
}
