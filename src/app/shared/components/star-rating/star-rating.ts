import { Component, Input } from "@angular/core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { RatingInfo } from "../../models/rating-info";

@Component({
  standalone: false,
  selector: "aa-star-rating",
  templateUrl: "star-rating.component.html",
  styleUrl: "./star-rating.css",
})
export class StarRatingComponent {
  @Input()
  isReviewVisible: boolean = false;
  @Input()
  rating: RatingInfo | null | undefined = null;
  faStar = faStar;
}
