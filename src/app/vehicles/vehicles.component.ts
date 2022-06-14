import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Vehicle } from './vehicle-validator';
import { VehiclesService } from './vehicles.service';

import { User } from '../users/user-validator';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private VehiclesService: VehiclesService,
    private UsersService: UsersService,
    private fb: FormBuilder
  ) {}

  vehicles: Vehicle[] = [];
  @Input('user') user: User | undefined;
  page: number = 1;
  totalPages: number = 1;
  userId: number = Number(this.route.snapshot.paramMap.get('UserID'));

  vehicleForm = this.fb.group({
    VehicleMake: ['', Validators.required],
    VehicleBrand: ['', Validators.required],
    VehicleYear: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getVehicles(this.userId, this.page);
  }

  ngOnChanges() {
    this.getVehicles(this.userId, this.page);
  }

  getVehicles(id: number, page: number) {
    this.VehiclesService.getVehiclesByUser(id, page).subscribe((data: any) => {
      this.vehicles = data.data;
      this.totalPages = data.totalPages;
    });
  }

  onSubmit() {
    // POST vehicle
    const data = {
      UserID: this.userId,
      VehicleMake: this.vehicleForm.value.VehicleMake,
      VehicleBrand: this.vehicleForm.value.VehicleBrand,
      VehicleYear: this.vehicleForm.value.VehicleYear,
    };

    this.VehiclesService.postVehicle(data).subscribe((data: any) => {
      // get status code
      const status = data.status;
      if (status === 200) {
        // this.vehicles.push(data.data);
        this.getVehicles(this.userId, this.page);

        // reset form
        this.vehicleForm.reset();
      }
    });
  }

  previousPage() {
    this.page--;
    this.getVehicles(this.userId, this.page);
  }

  nextPage() {
    this.page++;
    this.getVehicles(this.userId, this.page);
  }

  onDelete(vehicle: Vehicle) {
    let confirm = window.confirm(
      `Are you sure you want to delete ${vehicle.VehicleMake} ${vehicle.VehicleBrand}?\nRemoving this vehicle will also remove all the associated data\nThis action cannot be undone.`
    );

    if (confirm) {
      this.VehiclesService.deleteVehicle(vehicle.VehicleID).subscribe(
        (data: any) => {
          const status = data.status;
          if (status === 200) {
            this.getVehicles(this.userId, this.page);
            alert('Vehicle deleted');
          }
        }
      );
    }
  }
}
