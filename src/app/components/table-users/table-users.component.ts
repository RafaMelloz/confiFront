import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePen, lucideTrash, lucideX } from '@ng-icons/lucide';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'table-users',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css'],
  viewProviders: [provideIcons({ lucidePen, lucideTrash, lucideX })], 
})
export class TableUsersComponent {
  users: any[] = [];
  isModalOpen = false;
  editingUser: any = null;

  // Injeta o serviço diretamente
  private userService = inject(UserService);

  constructor() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data.data;
        console.log('Usuários:', data); 
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  openModal(user?: any) {
    this.editingUser = user ? { ...user } : { id: null, nome: '', sobrenome: '', email: '', nascimento: '', escolaridade: '' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingUser = null;
  }

  saveUser() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const today = new Date();


    if (!this.editingUser.name || !this.editingUser.lastName || !this.editingUser.email || !this.editingUser.birthdate || !this.editingUser.schooling) {
      alert('Preencha todos os campos!');
      return;
    }

    if (!emailRegex.test(this.editingUser.email)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }
    const birthdate = new Date(this.editingUser.birthdate); // Converte para objeto Date
    if (birthdate > today) {
      alert('A data de nascimento não pode ser maior que hoje!');
      return;
    }


    if (this.editingUser.id) {
      this.userService.updateUser(this.editingUser).subscribe(
        () => {
          this.fetchUsers();
          this.closeModal();
        },
        (error) => {
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    } else {
      this.userService.createUser(this.editingUser).subscribe(
        () => {
          this.fetchUsers();
          this.closeModal();
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.fetchUsers();
      },
      (error) => {
        console.error('Erro ao deletar usuário:', error);
      }
    );
  }
}
