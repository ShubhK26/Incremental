import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { User } from "../../educonnect/models/User";

export class AuthService {

  constructor(private http: HttpClient) {}

  login(user: Partial<User>): Observable<{ [key: string]: string }> {
    return new Observable();
  }

  getToken() : string {
    return '';
  }

  getRole() : string {
    return '';
  }

  getUsers(): Observable<User[]> {
    return new Observable();
  }

  createUser(user: User): Observable<User> {
    return new Observable();
  }
}
