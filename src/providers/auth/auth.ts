import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";
import { BehaviorSubject } from "rxjs";

import { User } from '../../models/user.model';

const TOKEN_KEY = 'auth-token';

@Injectable()
export class AuthProvider {
  private headers             = new HttpHeaders({'Content-Type':'application/json'});
  public authenticationState  = new BehaviorSubject(false);
  private token               = new BehaviorSubject(null);

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

  findOneUser(user: string, password: string) {
    return this.http.post<User>("./api/login", new User(user, password), { headers: this.headers });
  }

  findOneUserConnected() {
    return this.http.get<User>("./api/user/" + this.token.value, { headers: this.headers });
  }

  createOneUser(user: string, password: string) {
    return this.http.post<User>("./api/register", new User(user, password, this.generateToken()), { headers: this.headers });
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
}
