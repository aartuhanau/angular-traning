import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ReviewInfo } from "src/app/shared/models/review-info";
import { ReviewService } from "src/app/shared/services/review-service";
import { StarRating } from "src/app/shared/components/star-rating/star-rating";

@Component({
  selector: "review-section",
  imports: [AsyncPipe, StarRating, NgOptimizedImage],
  templateUrl: "review-section.component.html",
  styleUrl: "./review-section.css",
})
export class ReviewSection {
  @Input({ required: true })
  productId!: string;
  reviews$!: Observable<ReviewInfo[]>;
  reviewService = inject(ReviewService);

  ngOnInit(): void {
    this.reviews$ = this.reviewService.getReviews(this.productId);
  }
}
