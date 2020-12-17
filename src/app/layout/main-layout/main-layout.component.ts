import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  mobileQuery: MediaQueryList;
  flag = false;
  sideNavContent = ['Dashboard']

  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {




    this.router.url === "/Dashboard" ? this.flag = true : '';
  }
  onClickOfNav(nav) {
    this.flag = true
    this.router.navigate([`/${nav}`]);

  }
  onClickOfLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Thanks!',
          'Logout Succssfully.',
          'success'
        )
        sessionStorage.setItem('loginFlag', 'false')
        this.router.navigate(['']);
      }
    })

  }
}
