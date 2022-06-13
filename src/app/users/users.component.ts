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

  editUser(user: User) {
    // if mode already is edit, create an alert to alert user that previous edit is not saved
    if (this.mode == 'edit') {
      let confirm = window.confirm(
        `You have unsaved changes for ${user.Mailadresse}. Are you sure you want to leave?`
      );

      if (confirm == false) {
        return;
      }
    }

    // set mode to edit
    this.mode = 'edit';

    this.userForm.patchValue({
      Mailadresse: user.Mailadresse,
      Password: user.Password,
      FirstName: user.FirstName,
      LastName: user.LastName,
      // RoleID: user.RoleID,
    });
  }

  updateUser() {
    // PUT user
    // this.UsersService.putUser(this.userForm.value).subscribe((data) => {
    //   // get status code
    //   const status = data.status;
    //   if (status === 200) {
    //     this.getUsers(this.page);
    //     // reset form
    //     this.userForm.reset();
    //   } else {
    //     console.log('Error: ' + status);
    //   }
    // });
  }

  cancelUpdate() {
    this.mode = 'add';

    // reset form
    this.userForm.reset();
  }

  deleteUser(user: User) {}

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

  viewVehicles(user: User) {}

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getUsers(this.page);
    }
  }

  nextPage() {
    this.page++;
    this.getUsers(this.page);
  }

  setPage(page: number) {
    this.page = page;
    this.getUsers(this.page);
  }
}
