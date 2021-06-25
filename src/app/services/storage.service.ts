import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  public TOKEN_KEY = 'token';
  public CURRENT_USER = 'user';
  public User_mail = 'usermail';
  private currentUserSubject: BehaviorSubject<User>;

  constructor() {
  }

  getToken(): any {
    return JSON.parse(<string>localStorage.getItem(this.TOKEN_KEY));
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getCurrentUser(): User {
    return JSON.parse(<string>localStorage.getItem(this.CURRENT_USER));
  }

  getUserMail() {
    return JSON.parse(<string>localStorage.getItem(this.User_mail));
  }

  removeStorage() {
    window.localStorage.clear();
  }

}
