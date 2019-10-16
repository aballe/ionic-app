export class User {
  public email: string;
  constructor(
    public user: string = '',
    public password: string = '',
    public token: string = ''
  ) {}
}
