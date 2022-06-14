import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { User } from '../users/user-validator';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private UsersService: UsersService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  user: User | undefined;

  userForm = this.fb.group({
    Mailadresse: ['', Validators.required],
    Password: ['', Validators.required],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    // RoleID: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.user = undefined;
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('UserID'));

    this.UsersService.getUser(id).subscribe((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.user = data.data;

        this.userForm.patchValue({
          Mailadresse: this.user?.Mailadresse,
          Password: this.user?.Password,
          FirstName: this.user?.FirstName,
          LastName: this.user?.LastName,
          // RoleID: this.user?.RoleID,
        });
      } else {
        console.log('Error: ' + status);
      }
    });
  }

  onSubmit() {
    // PUT user
    const data = {
      UserID: this.user?.UserID,
      Mailadresse: this.userForm.value.Mailadresse,
      Password: this.userForm.value.Password,
      FirstName: this.userForm.value.FirstName,
      LastName: this.userForm.value.LastName,
      //   RoleID: this.userForm.value.RoleID,
    };

    this.UsersService.putUser(data).subscribe((data) => {
      // get status code
      const status = data.status;
      if (status === 200) {
        // return to previous page and add success message
        this.goBack();
      } else {
        console.log('Error: ' + status);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
