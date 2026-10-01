import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { CartService } from "./cart-service";
import { CartServiceAdapter } from "./cart-service-adapter";
import { CartInfo } from "src/app/shared/models/cart-info";

describe("CartService", () => {
  let service: CartService;
  let adapterSpy: jasmine.SpyObj<CartServiceAdapter>;
  const sessionCartCookie = "sessionCart";

  const clearCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  const buildCart = (overrides: Partial<CartInfo> = {}): CartInfo => ({
    id: "1",
    userId: "user-1",
    products: [],
    ...overrides,
  });

  beforeEach(() => {
    clearCookie(sessionCartCookie);

    adapterSpy = jasmine.createSpyObj<CartServiceAdapter>(
      "CartServiceAdapter",
      ["getCart", "updateCart"],
    );
    adapterSpy.getCart.and.returnValue(of(buildCart()));
    adapterSpy.updateCart.and.returnValue(of({}));

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: CartServiceAdapter, useValue: adapterSpy },
      ],
    });

    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    clearCookie(sessionCartCookie);
  });

  describe("getCurrentCartId", () => {
    it("initializes sessionCart in cookies when missing", () => {
      expect(document.cookie).not.toContain(`${sessionCartCookie}=`);

      const cartId = service.getCurrentCartId();

      expect(cartId).toBe("1");
      expect(document.cookie).toContain(`${sessionCartCookie}=1`);
    });

    it("returns the existing sessionCart value without overwriting it", () => {
      document.cookie = `${sessionCartCookie}=42; path=/`;

      const cartId = service.getCurrentCartId();

      expect(cartId).toBe("42");
      expect(document.cookie).toContain(`${sessionCartCookie}=42`);
    });
  });

  describe("loadCart", () => {
    it("fetches the cart for the current cart id and publishes it", () => {
      const cart = buildCart({ id: "42", products: [] });
      adapterSpy.getCart.and.returnValue(of(cart));
      document.cookie = `${sessionCartCookie}=42; path=/`;

      service.loadCart();

      expect(adapterSpy.getCart).toHaveBeenCalledWith("42");
      service.getCurrentCart().subscribe((current) => {
        expect(current).toEqual(cart);
      });
    });
  });

  describe("removeProductFromCart", () => {
    it("removes the matching product and persists the update", () => {
      const cart = buildCart({
        products: [
          { id: 1, title: "First", price: 10, count: 2 },
          { id: 2, title: "Second", price: 20, count: 1 },
        ],
      });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.removeProductFromCart(1);

      expect(adapterSpy.updateCart).toHaveBeenCalled();
      const updatedCart = adapterSpy.updateCart.calls.mostRecent()
        .args[0] as CartInfo;
      expect(updatedCart.products).toEqual([
        { id: 2, title: "Second", price: 20, count: 1 },
      ]);
    });
  });

  describe("addProduct", () => {
    it("adds a new entry when the product is not already in the cart", () => {
      const cart = buildCart({ products: [] });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.addProduct(5, 2, "New product", 15);

      expect(adapterSpy.updateCart).toHaveBeenCalled();
      const updatedCart = adapterSpy.updateCart.calls.mostRecent()
        .args[0] as CartInfo;
      expect(updatedCart.products).toEqual([
        { id: 5, title: "New product", price: 15, count: 2 },
      ]);
    });

    it("increments the count of an existing entry", () => {
      const cart = buildCart({
        products: [{ id: 5, title: "Existing", price: 15, count: 2 }],
      });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.addProduct(5, 3);

      const updatedCart = adapterSpy.updateCart.calls.mostRecent()
        .args[0] as CartInfo;
      expect(updatedCart.products).toEqual([
        { id: 5, title: "Existing", price: 15, count: 5 },
      ]);
    });

    it("leaves the entry's count unchanged when the update would drop it to zero or below", () => {
      const cart = buildCart({
        products: [{ id: 5, title: "Existing", price: 15, count: 2 }],
      });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.addProduct(5, -2);

      const updatedCart = adapterSpy.updateCart.calls.mostRecent()
        .args[0] as CartInfo;
      expect(updatedCart.products).toEqual([
        { id: 5, title: "Existing", price: 15, count: 2 },
      ]);
    });

    it("drops an entry whose count is already zero or below before the update", () => {
      const cart = buildCart({
        products: [{ id: 5, title: "Existing", price: 15, count: 0 }],
      });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.addProduct(5, 0);

      const updatedCart = adapterSpy.updateCart.calls.mostRecent()
        .args[0] as CartInfo;
      expect(updatedCart.products).toEqual([]);
    });
  });

  describe("getProductCount", () => {
    it("returns the count for an existing product", () => {
      const cart = buildCart({
        products: [{ id: 7, title: "Item", price: 5, count: 4 }],
      });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.getProductCount(7).subscribe((count) => {
        expect(count).toBe(4);
      });
    });

    it("returns 0 when the product is not in the cart", () => {
      const cart = buildCart({ products: [] });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.getProductCount(99).subscribe((count) => {
        expect(count).toBe(0);
      });
    });
  });

  describe("getCartEntryForProduct", () => {
    it("finds the matching cart entry", () => {
      const entry = { id: 3, title: "Match", price: 9, count: 1 };
      const cart = buildCart({ products: [entry] });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.getCartEntryForProduct(3).subscribe((result) => {
        expect(result).toEqual(entry);
      });
    });

    it("returns undefined when there is no matching entry", () => {
      const cart = buildCart({ products: [] });
      adapterSpy.getCart.and.returnValue(of(cart));
      service.loadCart();

      service.getCartEntryForProduct(3).subscribe((result) => {
        expect(result).toBeUndefined();
      });
    });
  });
});
