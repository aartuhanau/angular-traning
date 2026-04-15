import { Injectable } from "@angular/core";
import { enviroment } from "src/enviroments/enviroment";

@Injectable({
  providedIn: "root",
})
export class MapFacetHelper {
  getFacetName(queryParam: string): string | null {
    if (this.isValidParam(queryParam)) {
      return enviroment.mapperReverse[queryParam];
    }
    return null;
  }

  getParam(facetName: string): string | null {
    if (this.isValidFacetName(facetName)) {
      return enviroment.mapper[facetName];
    }
    return null;
  }

  isFacetValueDefault(
    key: string,
  ): key is keyof typeof enviroment.mapperPredefinedValue {
    return key in enviroment.mapperPredefinedValue;
  }

  isValidFacetName(key: string): key is keyof typeof enviroment.mapper {
    return key in enviroment.mapper;
  }

  isValidParam(param: string): param is keyof typeof enviroment.mapperReverse {
    return param in enviroment.mapperReverse;
  }
}
