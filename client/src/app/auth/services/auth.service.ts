import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { User } from "../../educonnect/models/User";
import { UserRegistrationDTO } from "../../educonnect/models/UserRegistrationDTO";
import { environment } from "../../../../src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl: string;
  httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient) {
    this.loginUrl = environment.apiUrl
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(user: Partial<User>): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(`${this.loginUrl}/auth/login`, user, this.httpOptions)
      .pipe(
        map(response => {
          console.log(response);
          if (response["token"]) {
            localStorage.setItem('token', response["token"]);
            localStorage.setItem('role', response["roles"]);
            console.log(localStorage.getItem("role"));
                    console.log("+++");
                                        console.log(localStorage.getItem("token"));
            localStorage.setItem('userId', response["userId"]);
            if (response["studentId"]) {
              localStorage.setItem('studentId', response["studentId"]);
            }
            if (response["teacherId"]) {
              localStorage.setItem('teacherId', response["teacherId"]);
            }
          }
          return response;
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
 
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('studentId');
    localStorage.removeItem('teacherId');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.loginUrl}/auth/all`, this.httpOptions);
  }

  createUser(user: UserRegistrationDTO): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/auth/register`, user, this.httpOptions);
  }
}
