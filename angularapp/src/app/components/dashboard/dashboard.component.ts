import { Component, OnInit } from '@angular/core';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  wifiSchemes: WifiScheme[] = [];
  availableSchemes: WifiScheme[] = [];
  unavailableSchemes: WifiScheme[] = [];
  showAvailableOnly = true;
  availabilityPercentage = 0;

  constructor(private readonly wifiSchemeService: WifiSchemeService) {}

  ngOnInit(): void {
    this.loadWiFiSchemes();
  }

  loadWiFiSchemes(): void {
    this.wifiSchemeService.getAllWiFiSchemes().subscribe((schemes) => {
      this.wifiSchemes = schemes;
      this.availableSchemes = schemes.filter(s => s.availabilityStatus === 'Available');
      this.unavailableSchemes = schemes.filter(s => s.availabilityStatus === 'Unavailable');
      this.updateAvailabilityPercentage();
    });
  }

  toggleAvailability(): void {
    this.showAvailableOnly = !this.showAvailableOnly;
  }

  get totalSchemes(): number {
    return this.wifiSchemes.length;
  }

  get availableCount(): number {
    return this.availableSchemes.length;
  }

  get unavailableCount(): number {
    return this.unavailableSchemes.length;
  }

  updateAvailabilityPercentage(): void {
    this.availabilityPercentage = this.totalSchemes
      ? Math.round((this.availableCount / this.totalSchemes) * 100)
      : 0;
  }
}
