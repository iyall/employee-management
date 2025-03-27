import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId!: Object;

  // private loggedInStatus = JSON.parse(
  //   localStorage.getItem('loggedIn') || 'false'
  // );
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.platformId = platformId;
  }

  setLoginStatus(value: any) {
    // this.loggedInStatus = value;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('loggedIn', 'true');

      }
  }

  get LoginStatus() {
    var data;
    if (isPlatformBrowser(this.platformId)) {
        data = localStorage.getItem('loggedIn');
    }
    return JSON.parse(
      data || 'false'
    );
  }
}
