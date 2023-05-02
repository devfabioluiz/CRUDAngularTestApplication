import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = {} as User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(userId: number | undefined) {
    if (userId) {
      this.router.navigate(['/users/edit', userId]);
    } else {
      console.error('Id de usuário inválida');
    }
  }

  cancelEdit() {
    this.selectedUser = {} as User;
  }

  saveUser() {
    this.userService.updateUser(this.selectedUser).subscribe(() => {
      alert('User updated successfully!');
      this.selectedUser = {} as User;
      this.getUsers();
    }, error => {
      alert('Houve um erro ao atualizar este usuário.');
    });
  }
  
  deleteUser(userId: number) {
    if (confirm('tem certeza que deseja deletar este usuário?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.getUsers();
        alert('User deletado com sucesso!');
      }, error => {
        alert('Houve um erro ao deletar este usuário.');
      });
    }
  }
}
