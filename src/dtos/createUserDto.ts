export class CreateUserDto {
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  isAdmin: boolean = false;

  constructor({
    userName,
    email,
    firstName,
    lastName,
    password,
    isAdmin = false,
  }: {
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    isAdmin?: boolean;
  }) {
    this.userName = userName;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  // Read-only computed property
  get fullName(): string {
    return `${this.firstName ?? ""} ${this.lastName ?? ""}`.trim();
  }
}
