export class UserInfo {
  id?: string;
  email: string;
  password: string;
  repeatPassword?: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
