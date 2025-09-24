import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { AuthService } from 'src/app/services/auth.service';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-user-view-scheme',
  templateUrl: './user-view-scheme.component.html',
  styleUrls: ['./user-view-scheme.component.css']
})
export class UserViewSchemeComponent implements OnInit {
  searchTerm = '';
  schemes: WifiScheme[] = [];
  filteredSchemes: WifiScheme[] = [];

  constructor(private readonly wifiSchemeService: WifiSchemeService, private readonly router: Router, private readonly authservice: AuthService) { }

  ngOnInit(): void {
    this.fetchSchemes();
  }

  fetchSchemes(): void {
    this.wifiSchemeService.getAllWiFiSchemes().subscribe({
      next: (data: WifiScheme[]) => {
        this.schemes = data.filter(s => s.availabilityStatus === 'Available');
        this.filteredSchemes = [...this.schemes];
      },
      error: (err) => {
        console.error('Error fetching schemes:', err);
      }
    });
  }

  filterSchemes(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredSchemes = this.schemes.filter(s =>
      s.schemeName.toLowerCase().includes(term) ||
      s.description.toLowerCase().includes(term) ||
      s.region.toLowerCase().includes(term)
    );
  }


  handleAction(scheme: WifiScheme): void {
    console.log('Navigating with scheme:', scheme);
    this.router.navigate(['/user/wifi-req', scheme.wifiSchemeId]);
  }

  isLoggedIn() {
    return this.authservice.isLoggedIn() &&
      this.authservice.getUserRole().toLowerCase() === 'user';
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
