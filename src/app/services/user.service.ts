import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    birthDate: Date;
    schooling: string;
}

@Injectable({
    providedIn: 'root', // Standalone, injetado globalmente.
})

export class UserService {
    private apiUrl = 'https://localhost:7179/api/User'; // Substitua pela sua URL.

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/ToListUsers`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/CreateUser`, user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/EditUser`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/RemoveUser?idUser=${id}`);
    }
}
