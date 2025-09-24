import { Component, OnInit } from '@angular/core';
import { WifiSchemeRequest } from 'src/app/models/wifi-scheme-request.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent implements OnInit {

  
  requests: WifiSchemeRequest[] = [];
  filteredRequests: WifiSchemeRequest[] = [];
  searchText: string = '';
  filterStatus: string = 'All';
  

  constructor(private readonly wifiSchemeRequestService: WifiSchemeRequestService,private readonly sanitizer:DomSanitizer) { }


  selectedRequest: WifiSchemeRequest | null = null;


  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.wifiSchemeRequestService.getAllWiFiSchemeRequests().subscribe({
      next: (data) => {
        this.requests = data;
        console.log('Fetched Admin Requests:', this.requests);
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching WiFi scheme requests:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredRequests = this.requests.filter(request => {
      const schemeName = request.wifiScheme?.schemeName ?? '';
      const matchesScheme = schemeName.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = this.filterStatus === 'All' || request.status === this.filterStatus;
      return matchesScheme && matchesStatus;
    });
  }

  showMore(request: WifiSchemeRequest): void {
    this.selectedRequest = request;
  }

  closeModal(): void {
    this.selectedRequest = null;
  }

  approveRequest(request: WifiSchemeRequest): void {
    const updatedRequest = { ...request, status: 'Approved' };
    this.wifiSchemeRequestService.updateWiFiSchemeRequest(request.wifiSchemeRequestId, updatedRequest).subscribe({
      next: () => {
        request.status = 'Approved';
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error approving request:', error);
      }
    });
  }

  rejectRequest(request: WifiSchemeRequest): void {
    const updatedRequest = { ...request, status: 'Rejected' };
    this.wifiSchemeRequestService.updateWiFiSchemeRequest(request.wifiSchemeRequestId, updatedRequest).subscribe({
      next: () => {
        request.status = 'Rejected';
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error rejecting request:', error);
      }
    });
  }

  getProofUrl(base64: string): SafeResourceUrl | null {
    if (!base64) return null;

    let mimeType = 'application/pdf';
    if (base64.startsWith('/9j/')) mimeType = 'image/jpeg';
    else if (base64.startsWith('iVBORw0KGgo')) mimeType = 'image/png';

    const dataUrl = `data:${mimeType};base64,${base64}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
  }
}
