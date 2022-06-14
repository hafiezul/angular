import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { User } from './user-validator';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private UsersService: UsersService, private fb: FormBuilder) {}

  users: User[] = [];
  mode: string = 'add';
  page: number = 1;
  totalPages: number = 1;

  userForm = this.fb.group({
    Mailadresse: ['', Validators.required],
    Password: ['', Validators.required],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    RoleID: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getUsers(this.page);
  }

  getUsers(page: number): void {
    this.UsersService.getUsers(this.page).subscribe((data: any) => {
      this.totalPages = data.totalPages;
      this.users = data.data;
    });
  }

  onSubmit() {
    // POST user
    this.UsersService.postUser(this.userForm.value).subscribe((data) => {
      // get status code
      const status = data.status;

      if (status === 200) {
        this.getUsers(this.page);
        // reset form
        this.userForm.reset();
      } else {
        console.log('Error: ' + status);
      }
    });
  }

  onDelete(user: User) {
    let confirm = window.confirm(
      `Are you sure you want to delete ${user.FirstName} ${user.LastName}?\nRemoving this user will also remove all the associated data\nThis action cannot be undone.`
    );

    if (confirm) {
      this.UsersService.deleteUser(user.UserID).subscribe((data: any) => {
        // get status code
        const status = data.status;

        if (status === 200) {
          this.getUsers(this.page);

          alert('User deleted');
        } else {
          console.log('Error: ' + status);
        }
      });
    }
  }

  previousPage() {
    this.page--;
    this.getUsers(this.page);
  }

  nextPage() {
    this.page++;
    this.getUsers(this.page);
  }
}
