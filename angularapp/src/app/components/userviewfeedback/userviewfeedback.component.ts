import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  userId: number = 0;
  error = '';
  selectedwifiScheme:any=null;
  showDeleteConfirm = false;
  feedbackToDelete: number | null = null;
  constructor(
    private readonly feedbackService:FeedbackService,
    private readonly wifiSchemeService:WifiSchemeService) {}

  ngOnInit(): void {
    const loginDTO = localStorage.getItem('loginDTO');
    if (loginDTO) {
      const parsedDTO = JSON.parse(loginDTO);
      this.userId = parsedDTO.userId ?? 0;
    }

    this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe({
      next: (data) => {
        console.log('Feedback List:', data); // 👈 Add this
        this.feedbackList = data;
      },
      error: (err) => {
        console.error('Error fetching feedbacks:', err);
        this.error = 'Unable to load feedbacks.';
      }
    });
    
  }

  viewSchemeInfo(wifiSchemeId: number) {
    console.log('Fetching scheme info for ID:', wifiSchemeId); // Debug
    
    if (!wifiSchemeId) {
      this.error = 'Invalid scheme ID.';
      return;
    }
  
    this.wifiSchemeService.getWiFiSchemeById(wifiSchemeId).subscribe({
      next: (data) => {
        this.selectedwifiScheme = data;
      },
      error: (err) => {
        console.error('Error fetching scheme info:', err);
        this.error = 'Failed to load scheme info.';
      }
    });
  }
  

  

promptDelete(feedbackId: number): void {
  this.feedbackToDelete = feedbackId;
  this.showDeleteConfirm = true;
}

confirmDelete(): void {
  if (this.feedbackToDelete !== null) {
    this.feedbackService.deleteFeedback(this.feedbackToDelete).subscribe({
      next: () => {
        this.feedbackList = this.feedbackList.filter(f => f.feedbackId !== this.feedbackToDelete);
        this.showDeleteConfirm = false;
        this.feedbackToDelete = null;
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.error = 'Failed to delete feedback.';
        this.showDeleteConfirm = false;
        this.feedbackToDelete = null;
      }
    });
  }
}

cancelDelete(): void {
  this.showDeleteConfirm = false;
  this.feedbackToDelete = null;
}

  closeModal(): void {
    this.selectedwifiScheme= null;
  }
}

