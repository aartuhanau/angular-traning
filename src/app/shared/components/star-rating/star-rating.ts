import { Component, Input } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { RatingInfo } from "../../models/rating-info";

@Component({
  selector: "star-rating",
  imports: [FontAwesomeModule],
  templateUrl: "star-rating.component.html",
  styleUrl: "./star-rating.css",
})
export class StarRating {
  @Input()
  isReviewVisible: boolean = false;
  @Input()
  rating: RatingInfo | null = null;
  faStar = faStar;
}
