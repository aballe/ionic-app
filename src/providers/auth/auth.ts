import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";
import { BehaviorSubject } from "rxjs";

import { User } from '../../models/user.model';

const TOKEN_KEY = 'auth-token';

@Injectable()
export class AuthProvider {
  private headers            = new HttpHeaders({'Content-Type':'application/json'});
  public authenticationState = new BehaviorSubject(false);
  private token              = new BehaviorSubject(null);
  public userList            = new BehaviorSubject<any>([]);

  constructor(
    private http:     HttpClient,
    private storage:  Storage,
    private plt:      Platform
  ) {
    this.plt.ready().then(
      () => {
        this.checkToken();
      }
    );
  }

  findAllUsers() {
    return this.http.get<User[]>("./api/users");
  }

  findOneUser(user: string, password: string) {
    var email    = "";
    var username = "";
    if (user.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+/g) != null) {
      email = user;
    } else {
      username = user;
    }
    return this.http.post<User>("./api/login", new User(username, email, password), { headers: this.headers });
  }

  findOneUserConnected() {
    return this.http.get<User>("./api/user/" + this.token.value, { headers: this.headers });
  }

  createOneUser(username: string, email: string, password: string) {
    return this.http.post<User>("./api/register", new User(username, email, password, null, null, null, null, this.generateToken()), { headers: this.headers });
  }

  updateOneUserConnected(user: User) {
    return this.http.post<any>("./api/user/edit", user, { headers: this.headers });
  }

  checkToken() {
    this.storage.ready().then(() => {
      this.storage.get(TOKEN_KEY).then((res) => {
        if (res) {
          this.authenticationState.next(true);
        } else {
          this.authenticationState.next(false);
        }
      });
    });
  }

  setToken(token: string) {
    this.token.next(token);
  }

  login(token: string = null) {
    this.storage.ready().then(() => {
      return this.storage.set(TOKEN_KEY, token).then(
        () => {
          this.authenticationState.next(true);
          this.setToken(token);
        }
      );
    });
  }

  logout() {
    this.storage.ready().then(() => {
      return this.storage.remove(TOKEN_KEY).then(
        () => {
          this.authenticationState.next(false);
        }
      );
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  generateToken () {
    var arr = new Uint8Array((40) / 2);
    window.crypto.getRandomValues(arr);

    return Array.from(arr, this.dec2hex).join('');
  }

  dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }

  emitUsers() {
    this.findAllUsers().subscribe(
      (values) => {
        this.userList.next(values);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
