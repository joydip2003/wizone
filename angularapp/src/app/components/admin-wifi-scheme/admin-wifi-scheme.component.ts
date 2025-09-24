import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WifiScheme } from '../../models/wifi-scheme.model';
import { WifiSchemeService } from '../../services/wifi-scheme.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-wifi-scheme',
  templateUrl: './admin-wifi-scheme.component.html',
  styleUrls: ['./admin-wifi-scheme.component.css']
})
export class AdminWifiSchemeComponent implements OnInit {
  successPopup = false;

  scheme: WifiScheme = {
    wifiSchemeId:null,
    schemeName: '',
    description: '',
    region: '',
    speed: '',
    dataLimit: '',
    fee: 0,
    availabilityStatus: 'Available'
  };
  isEditMode:boolean=false;
  successMsg = '';

  constructor(private readonly wifiService: WifiSchemeService,private readonly route:ActivatedRoute,private readonly router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['wifiSchemeId'];
      if (id) {
        this.scheme.wifiSchemeId = +id;
        this.isEditMode = true;
        this.wifiService.getWiFiSchemeById(this.scheme.wifiSchemeId).subscribe(
          (result) => {
            this.scheme = result;
          },
          (error) => {
            console.error("Error fetching scheme:", error);
          }
        );
      }
    });
  }
  

  updateScheme(form: NgForm){
    if(form.valid){
      console.log(form.value)
      this.wifiService.updateWiFiScheme(this.scheme.wifiSchemeId,this.scheme).subscribe((result)=>{
        console.log("Scheme edited");
        this.successMsg='WiFi scheme edited successfully';
        form.resetForm(); // resets the form
        this.scheme = {
          schemeName: '',
          description: '',
          region: '',
          speed: '',
          dataLimit: '',
          fee: 0,
          availabilityStatus: 'Available'
        };
        this.successPopup = true;    
      },
      (error)=>{
        console.log(error);
      });
    }
    else
    {
      this.successMsg = 'Please enter the required fields';
    }
  }
  addScheme(form: NgForm): void {
    if (form.valid) {

      this.wifiService.addWiFiScheme(this.scheme).subscribe((result) => {
        console.log(form.value);
        console.log("Scheme added");
        this.successMsg='WiFi scheme added successfully';
        form.resetForm(); // resets the form
        this.scheme = {
          schemeName: '',
          description: '',
          region: '',
          speed: '',
          dataLimit: '',
          fee: 0,
          availabilityStatus: 'Available'
        };
        this.successPopup = true;       
      },
      (error)=>{
        console.log(error);
      }
      );
    } else {
      this.successMsg = 'Please enter the required fields';
    }
  }
  closePopup(): void {
    this.successPopup = false;
    this.router.navigate(['/admin/view-schemes']);
  }
}
