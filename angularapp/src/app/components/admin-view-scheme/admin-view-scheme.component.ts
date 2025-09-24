import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';


@Component({
  selector: 'app-admin-view-scheme',
  templateUrl: './admin-view-scheme.component.html',
  styleUrls: ['./admin-view-scheme.component.css']
})
export class AdminViewSchemeComponent implements OnInit {
  wifiSchemes: WifiScheme[] = [];
  filteredSchemes: WifiScheme[] = [];
  searchText: string = '';
  selectedRegion: string = 'All Regions';
  uniqueRegions: string[] = [];
  showDeleteConfirm: boolean = false;
  schemeToDeleteId: number | null = null;

  constructor(private readonly wifiSchemeService: WifiSchemeService,private readonly router:Router)  { }

  ngOnInit(): void {
    this.getAllWifiSchemes();
  }

  getAllWifiSchemes(): void {
    this.wifiSchemeService.getAllWiFiSchemes().subscribe(
      (data: WifiScheme[]) => {
        this.wifiSchemes = data;
        this.filteredSchemes = data;
        this.getUniqueRegions();
      },
      (error: any) => {
        console.error('Error fetching WiFi schemes:', error);
      }
    );
  }

  getUniqueRegions(): void {
    const regions = this.wifiSchemes.map(scheme => scheme.region.toLowerCase());
    this.uniqueRegions = ['All Regions', ...Array.from(new Set(regions))];
  }

  applyFilter(): void {
    this.filteredSchemes = this.wifiSchemes.filter(scheme => {
      const searchMatch = scheme.schemeName.toLowerCase().includes(this.searchText.toLowerCase());
      
    const regionMatch = this.selectedRegion === 'All Regions' || 
    scheme.region.toLowerCase() === this.selectedRegion.toLowerCase();

      return searchMatch && regionMatch;
    });
  }

  confirmDelete(schemeId: number): void {
    this.schemeToDeleteId = schemeId;
    this.showDeleteConfirm = true;
  }

  deleteScheme(): void {
    if (this.schemeToDeleteId !== null) {
      this.wifiSchemeService.deleteWiFiScheme(this.schemeToDeleteId).subscribe(
        () => {
          console.log('Scheme deleted successfully');
          this.getAllWifiSchemes(); // Refresh the list
          this.cancelDelete();
        },
        (error: any) => {
          console.error('Error deleting scheme:', error);
          this.cancelDelete();
        }
      );
    }
  }

  edit(wifiSchemeId:number){

    this.router.navigate(['/admin/wifi-schemes',wifiSchemeId])
    

  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.schemeToDeleteId = null;
  }

  toggleAvailability(scheme: WifiScheme): void {
    const updatedScheme = { ...scheme };
    updatedScheme.availabilityStatus = scheme.availabilityStatus === 'Available' ? 'Unavailable' : 'Available';
    
    this.wifiSchemeService.updateWiFiScheme(updatedScheme.wifiSchemeId!, updatedScheme).subscribe(
      (response: WifiScheme) => {
        console.log('Scheme availability updated:', response);
        this.getAllWifiSchemes(); // Refresh the list
      },
      (error: any) => {
        console.error('Error updating scheme availability:', error);
      }
    );
  }
}
