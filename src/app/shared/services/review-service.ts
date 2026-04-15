import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReviewInfo } from "../models/review-info";
import { RequestBuilderHelper } from "../helpers/request-builder-helper";
import { backendConfig } from "../endpoints";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  private http: HttpClient = inject(HttpClient);
  private requestBuilder: RequestBuilderHelper = inject(RequestBuilderHelper);

  getReviews(productId: string): Observable<ReviewInfo[]> {
    let url = this.requestBuilder.getTargetUrl(
      backendConfig.backendUrls.getReviews,
    );
    return this.http.get<ReviewInfo[]>(url, {
      params: { productId: productId },
    });
  }
}
