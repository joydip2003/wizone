import { Component, OnInit } from '@angular/core';
import { WifiSchemeRequestService } from '../../services/wifi-scheme-request.service';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserViewAppliedRequestComponent implements OnInit {
  appliedSchemes: {
    scheme: WifiScheme;
    status: string;
    requestId: number;
    requestDate: string;
    comments: string;
    proof: string;
  }[] = [];

  filteredSchemes: {
    scheme: WifiScheme;
    status: string;
    requestId: number;
    requestDate: string;
    comments: string;
    proof: string;
  }[] = [];
  
  selectedRequest: any = null;
  searchTerm: string = '';
  loading: boolean = true;
  userId: number = 0;
  proofUrl: SafeResourceUrl | null = null;

  constructor(
    private readonly requestService: WifiSchemeRequestService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const loginDTO = localStorage.getItem('loginDTO');
    if (loginDTO) {
      const parsedDTO = JSON.parse(loginDTO);
      this.userId = parsedDTO.userId ?? 0;
    }
    if (!this.userId) {
      console.error('No user ID found in localStorage');
      this.router.navigate(['/login']);
      return;
    }
    console.log('Logged-in User ID:', this.userId);

    this.requestService.getWiFiSchemeRequestsByUserId(this.userId).subscribe({
      next: (requests) => {
        console.log('Requests fetched for user:', requests);
        this.appliedSchemes = requests.map(req => ({
          scheme: req.wifiScheme,
          status: req.status ?? 'Pending',
          requestId: req.wifiSchemeRequestId ?? 0,
          requestDate: req.requestDate instanceof Date 
            ? req.requestDate.toISOString() 
            : (req.requestDate ?? new Date().toISOString()),
          comments: req.comments ?? '',
          proof: req.proof ?? ''
        }));        
        this.filteredSchemes = [...this.appliedSchemes];
        console.log('Matched Applied Schemes:', this.appliedSchemes);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.filteredSchemes = this.appliedSchemes.filter(item =>
      item.scheme.schemeName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  

  writeReview(wifiSchemeId: number): void {
    this.router.navigate(['/user/feedback', wifiSchemeId]);
  }

  showMore(item: any): void {
    this.selectedRequest = item;
    this.loadProof(item.proof);
  }

  closeModal(): void {
    if (this.proofUrl) {
      URL.revokeObjectURL(this.proofUrl.toString());
    }
    this.selectedRequest = null;
    this.proofUrl = null;
  }

  loadProof(base64: string): void {
    if (!base64) {
      this.proofUrl = null;
      return;
    }

    try {
      // Assume base64 is already stripped of data URL prefix (if any)
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);

      // Determine MIME type (simplified; adjust based on server data)
      let mimeType = 'application/pdf'; // Default to PDF
      if (base64.startsWith('/9j/')) {
        mimeType = 'image/jpeg';
      } else if (base64.startsWith('iVBORw0KGgo')) {
        mimeType = 'image/png';
      }

      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      this.proofUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } catch (error) {
      console.error('Invalid Base64 string:', error);
      this.proofUrl = null;
    }
  }
  showDeleteConfirm = false;
requestToDelete: number | null = null;


cancelDelete(): void {
  this.showDeleteConfirm = false;
  this.requestToDelete = null;
}
promptDelete(requestId: number, wifiSchemeId: number): void {
  this.requestToDelete = requestId;
  this.showDeleteConfirm = true;
}
confirmDelete(): void {
  if (this.requestToDelete !== null) {
    this.requestService.deleteWiFiSchemeRequest(this.requestToDelete).subscribe(() => {
      this.appliedSchemes = this.appliedSchemes.filter(item => item.requestId !== this.requestToDelete);
      this.filteredSchemes = this.filteredSchemes.filter(item => item.requestId !== this.requestToDelete);
      this.showDeleteConfirm = false;
      this.requestToDelete = null;
      if (this.selectedRequest?.requestId === this.requestToDelete) {
        this.closeModal();
      }
    });
  }
}


}
