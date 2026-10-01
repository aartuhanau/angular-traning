import {
  DOCUMENT,
  inject,
  Injectable,
  PLATFORM_ID,
  REQUEST,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private request = inject(REQUEST, { optional: true });

  private getCookies(): string {
    return this.isBrowser
      ? this.document.cookie
      : (this.request?.headers.get("cookie") ?? "");
  }

  get(name: string): string | null {
    for (const part of this.getCookies().split(";")) {
      const [key, ...rest] = part.trim().split("=");
      if (key === name) {
        return decodeURIComponent(rest.join("="));
      }
    }

    return null;
  }

  set(name: string, value: string, days = 7): void {
    if (!this.isBrowser) {
      return;
    }

    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    this.document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  }

  delete(name: string): void {
    if (!this.isBrowser) {
      return;
    }

    this.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  }
}
