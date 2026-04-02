import { inject, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FacetInfo } from "../models/facet-info";
import { enviroment } from "src/enviroments/enviroment";
import { HttpParams } from "@angular/common/http";
import { convertToParamMap, ParamMap } from "@angular/router";
import { MapFacetHelper } from "./mapper-helper";

@Injectable({
  providedIn: "root",
})
export class FacetHelper {
  private mapperService: MapFacetHelper = inject(MapFacetHelper);

  getFacetHttpParams(queryMap: ParamMap): HttpParams {
    let params = new HttpParams();

    Object.values(enviroment.mapper).forEach((value) => {
      if (queryMap.has(value)) {
        params = params.append(value, queryMap.get(value) ?? "");
      }
    });
    return params;
  }

  getFacetList(queryMap: ParamMap): FacetInfo[] {
    const facetList: FacetInfo[] = [];
    Object.values(enviroment.mapper).forEach((value) => {
      if (queryMap.has(value)) {
        facetList.push(
          new FacetInfo(
            this.mapperService.getFacetName(value) ?? "",
            queryMap.get(value) ?? "",
          ),
        );
      }
    });
    return facetList;
  }

  mapFormToUrlParams(formGroup: FormGroup): ParamMap {
    let facets = this.mapFormToFacets(formGroup);
    return convertToParamMap(this.mapFacetsToUrlParams(facets));
  }

  mapFormToKeyValue(formGroup: FormGroup): { [key: string]: string } {
    let facets = this.mapFormToFacets(formGroup);
    return this.mapFacetsToUrlParams(facets);
  }

  private mapFormToFacets(formGroup: FormGroup): FacetInfo[] {
    return Object.keys(formGroup.controls).flatMap((key) => {
      let control = formGroup.get(key);
      if (control?.value != null) {
        let facetInfo = new FacetInfo(key, control.value);
        return facetInfo;
      }
      return [];
    });
  }

  private mapFacetsToUrlParams(facets: FacetInfo[]): { [key: string]: string } {
    const urlSearchParams: { [key: string]: string } = {};
    facets.flatMap((facet) => {
      if (this.mapperService.isValidFacetName(facet.code)) {
        let value = facet.value;
        if (this.mapperService.isFacetValueDefault(facet.code)) {
          if (facet.value) {
            urlSearchParams[this.mapperService.getParam(facet.code) ?? ""] =
              enviroment.mapperPredefinedValue[facet.code];
          }
        } else {
          urlSearchParams[this.mapperService.getParam(facet.code) ?? ""] =
            value;
        }
      }
    });
    return urlSearchParams;
  }
}
