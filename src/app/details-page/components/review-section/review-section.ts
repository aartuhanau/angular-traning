import { Component, inject, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ReviewInfo } from "src/app/shared/models/review-info";
import { ReviewService } from "src/app/shared/services/review-service";

@Component({
  selector: "aa-review-section",
  standalone: false,
  templateUrl: "review-section.component.html",
  styleUrl: "./review-section.css",
})
export class ReviewSectionComponent {
  @Input({ required: true })
  productId!: string;
  reviews$!: Observable<ReviewInfo[]>;
  reviewService = inject(ReviewService);

  ngOnInit(): void {
    this.reviews$ = this.reviewService.getReviews(this.productId);
  }
}
