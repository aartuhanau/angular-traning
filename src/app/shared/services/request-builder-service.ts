import { Injectable } from "@angular/core";
import { enviroment } from "src/enviroments/enviroment";

@Injectable({
  providedIn: "root",
})
export class RequestBuilderService {
  getTargetUrl(relativeUrl: string): string {
    return enviroment.apiUrl + relativeUrl;
  }
}
