import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  selectedScheme: WifiScheme | null = null;
  filterCategory: string = 'All';

  constructor(private readonly feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((data: Feedback[]) => {
      this.feedbacks = data;
    });
  }

  viewUserProfile(feedback: Feedback) {
    this.selectedFeedback = feedback;
  }

  closeUserProfile() {
    this.selectedFeedback = null;
  }

  viewSchemeInfo(scheme: WifiScheme) {
    this.selectedScheme = scheme;
  }

  closeSchemeInfo() {
    this.selectedScheme = null;
  }

  getFilteredFeedbacks(): Feedback[] {
    if (this.filterCategory.toLowerCase() === 'all') return this.feedbacks;
    return this.feedbacks.filter(
      fb => fb.category.toLowerCase() === this.filterCategory.toLowerCase()
    );
  }
  

}
