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
      console.error('Invalid userId');
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
      console.log('Error updating user:', error);
      alert('An error occurred while updating the user.');
    });
  }
  
  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.getUsers();
        alert('User deleted successfully!');
      }, error => {
        console.log('Error deleting user:', error);
        alert('An error occurred while deleting the user.');
      });
    }
  }
}
