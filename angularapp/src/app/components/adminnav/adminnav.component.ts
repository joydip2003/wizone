import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  username:any="";
  constructor(private readonly auth:AuthService,private readonly router:Router) { }
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
