import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SearchState {
  private _search = signal("");
  readonly search = this._search.asReadonly();
  updateValue(input: string) {
    this._search.set(input);
  }
}
