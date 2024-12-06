import { Component } from '@angular/core';
import { TableUsersComponent } from '../../components/table-users/table-users.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [TableUsersComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomePage {
}