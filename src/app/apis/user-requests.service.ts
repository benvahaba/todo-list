import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../core/services/app-settings.service';
import { HttpClient } from '@angular/common/http';
import { Address } from '../types/address/address';
import { User } from '../types/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserRequestsService {
  constructor(private http: HttpClient) {}

  public signUp(
    name: string,
    userName: string,
    address: Address,
    email: string
  ): Observable<User> {
    const user = { name, userName, address, email };
    return this.http.post<any>(
      `${AppSettingsService._API_ENDPOINT}/users`,
      user
    );
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${AppSettingsService._API_ENDPOINT}/users`);
  }
}
