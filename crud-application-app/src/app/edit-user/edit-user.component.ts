import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const id = parseInt(userId, 10);
      this.userService.getUser(id).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error: any) => {
          console.error('Error retrieving user:', error);
        }
      );
    }
  }
  

  saveUser() {
    this.userService.updateUser(this.user).subscribe(() => {
      alert('User updated successfully!');
      this.goBack();
    }, error => {
      console.error('Error updating user:', error);
      alert('An error occurred while updating the user.');
    });
  }

  cancelEdit() {
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
