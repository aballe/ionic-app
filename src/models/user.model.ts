export class User {
  constructor(
    public username:    string = '',
    public email:       string = '',
    public password:    string = '',
    public description: string = '',
    public photo:       string = '../../assets/imgs/avatar.svg',
    public age:         number = 0,
    public name:        string = '',
    public lastname:    string = '',
    public sexe:        string = '',
    public token:       string = ''
  ) {}
}
