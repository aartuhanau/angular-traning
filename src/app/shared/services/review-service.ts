import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReviewInfo } from "../models/review-info";
import { RequestBuilderService } from "./request-builder-service";
import { backendConfig } from "../endpoints";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  private http: HttpClient = inject(HttpClient);
  private requestBuilder: RequestBuilderService = inject(RequestBuilderService);

  getReviews(productId: string): Observable<ReviewInfo[]> {
    let url = this.requestBuilder.getTargetUrl(
      backendConfig.backendUrls.getReviews,
    );
    return this.http.get<ReviewInfo[]>(url, {
      params: { productId: productId },
    });
  }
}
