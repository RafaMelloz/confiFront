import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', // Standalone, injetado globalmente.
})
export class UserService {
    private apiUrl = 'https://localhost:7179/api/User'; // Substitua pela sua URL.

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/ToListUsers`);
    }

    createUser(user: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/CreateUser`, user);
    }

    updateUser(user: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/EditUser`, user);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/RemoveUser?idUser=${id}`);
    }
}
