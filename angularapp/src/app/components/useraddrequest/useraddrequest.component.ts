import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const today = new Date();
  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today ? null : { pastDate: true };
}

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {
  requestForm!: FormGroup;
  success = false;
  error = '';
  fileError = '';
  proofBase64 = '';
  successPopup = false;
  userId: number = 0;
  wifiSchemeId: number = 0;
  scheme: any = null; // To store scheme details (optional)
  imagePreview: string | null = null;
  constructor(
    private readonly fb: FormBuilder,
    private readonly requestService: WifiSchemeRequestService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const loginDTO = localStorage.getItem('loginDTO');
    if (loginDTO) {
      const parsedDTO = JSON.parse(loginDTO);
      this.userId = parsedDTO.userId ?? 0;
      console.log(this.userId);
    } else {
      this.error = 'Please log in to submit a request.';
      this.router.navigate(['/login']);
      return;
    }
  
    // Get wifiSchemeId from route params and then initialize the form
    this.route.params.subscribe(params => {
      this.wifiSchemeId = +params['wifiSchemeId'] ;
      console.log('wifiSchemeId:', this.wifiSchemeId);
  
      // ✅ Initialize the form only after wifiSchemeId is available
      this.requestForm = this.fb.group({
        streetName: ['', Validators.required],
        landmark: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        preferredSetupDate: ['', [Validators.required, futureDateValidator]],
        timeSlot: ['', Validators.required],
        comments: [''],
        proof: ['', Validators.required],
        userId: [this.userId, Validators.required],
        wifiSchemeId: [this.wifiSchemeId, Validators.required],
        requestDate: [new Date(), Validators.required],
        status: ['Pending']
      });
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.fileError = 'No file selected.';
      return;
    }

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
        if (!validTypes.includes(file.type)) {
      this.fileError = 'Invalid file type. Please upload a PDF, DOC, DOCX, or JPG file.';
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      this.fileError = 'File size exceeds 5MB limit.';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = file.type.startsWith('image/') ? reader.result as string : null;
      this.proofBase64 = (reader.result as string).split(',')[1];
      this.requestForm.patchValue({ proof: this.proofBase64 });
      this.fileError = '';
    };
    reader.onerror = () => {
      this.fileError = 'Failed to read file.';
    };
    reader.readAsDataURL(file);
  }

 

  submitRequest(): void {
    if (this.requestForm.valid && !this.fileError) {
      const requestData = this.requestForm.value;
      console.log('Submitting request:', requestData); // Debug

      this.requestService
        .addWiFiSchemeRequest(this.userId, this.wifiSchemeId, requestData)
        .subscribe({
          next: () => {
            this.success = true;
            this.successPopup = true;
            this.error = '';
          },
          error: (err) => {
            console.error('API Error:', err); // Detailed error logging
            this.error = err?.error?.message ?? 'Something went wrong!';
            this.success = false;
          }
        });
    } else {
      this.error = 'Please fill all required fields correctly.';
      this.success = false;
      console.log('Form invalid:', this.requestForm.errors); // Debug
    }
  }

  closePopup(): void {
    this.successPopup = false;
    this.router.navigate(['/user/applied-requests']);
  }

  redirectToScheme(): void {
    this.router.navigate(['/user/wifi-schemes']);
  }
}