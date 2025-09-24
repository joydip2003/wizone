import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  constructor(private readonly auth:AuthService,private readonly router:Router) { }
  username:any="";
  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(){
  this.username=this.auth.getUserName();
  }

  onLogout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
