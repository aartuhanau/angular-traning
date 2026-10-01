import { TestBed } from "@angular/core/testing";
import { SearchPipe } from "./search-pipe";
import { SearchState } from "../models/search-state";
import { ProductInfo } from "../models/product-info";

describe("SearchPipe", () => {
  let pipe: SearchPipe;
  let searchState: SearchState;

  const buildProduct = (id: number, title: string): ProductInfo => ({
    id,
    title,
    price: 10,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPipe],
    });

    pipe = TestBed.inject(SearchPipe);
    searchState = TestBed.inject(SearchState);
  });

  it("returns null when the input value is null", () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it("returns every product when the search term is empty", () => {
    const products = [buildProduct(1, "Chair"), buildProduct(2, "Table")];

    expect(pipe.transform(products)).toEqual(products);
  });

  it("returns only products whose title contains the search term", () => {
    const chair = buildProduct(1, "Chair");
    const table = buildProduct(2, "Table");
    searchState.updateValue("Cha");

    expect(pipe.transform([chair, table])).toEqual([chair]);
  });


  it("is case-sensitive, matching the current implementation", () => {
    const product = buildProduct(1, "Chair");
    searchState.updateValue("chair");

    expect(pipe.transform([product])).toEqual([]);
  });

  it("returns an empty array when no titles match the search term", () => {
    const products = [buildProduct(1, "Chair"), buildProduct(2, "Table")];
    searchState.updateValue("Sofa");

    expect(pipe.transform(products)).toEqual([]);
  });
});
