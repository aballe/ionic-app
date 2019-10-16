export class User {
  public email: string;
  public age: number = 0;
  public name: string;
  public lastname: string;
  constructor(
    public user: string = '',
    public password: string = '',
    public token: string = ''
  ) {}
}
