import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  successPopup = false;
  wifiSchemeId: number = 0;
  userId: number = 0;
  error = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly feedbackService: FeedbackService
  ) {
    this.feedbackForm = this.fb.group({
      category: ['', Validators.required],
      feedbackText: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    const loginDTO = localStorage.getItem('loginDTO');
    if (loginDTO) {
      const parsedDTO = JSON.parse(loginDTO);
      this.userId = parsedDTO.userId ?? 0;
    } else {
      this.error = 'Please log in to submit feedback.';
      this.router.navigate(['/login']);
      return;
    }

    this.route.params.subscribe(params => {
      this.wifiSchemeId = +params['wifiSchemeId'];
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedbackData: Feedback = {
        userId: this.userId,
        wifiSchemeId: this.wifiSchemeId,
        category: this.feedbackForm.value.category,
        feedbackText: this.feedbackForm.value.feedbackText,
        date: new Date()
      };

      this.feedbackService.sendFeedback(this.userId, this.wifiSchemeId, feedbackData).subscribe({
        next: () => {
          this.successPopup = true;
        },
        error: (err) => {
          console.error('Feedback submission error:', err);
          this.error = err?.error?.message ?? 'Something went wrong!';
        }
      });
    } else {
      this.feedbackForm.markAllAsTouched();
    }
  }

  closePopup(): void {
    this.successPopup = false;
    this.feedbackForm.reset();
    this.router.navigate(['/user/feedbacks']);
  }
 
}
