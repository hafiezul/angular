import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { Vehicle } from '../vehicles/vehicle-validator';
import { VehiclesService } from '../vehicles/vehicles.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private VehiclesService: VehiclesService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  vehicle: Vehicle | undefined;

  vehicleForm = this.fb.group({
    // VehicleID: ['', Validators.required],
    VehicleMake: ['', Validators.required],
    VehicleBrand: ['', Validators.required],
    VehicleYear: [0, Validators.required],
  });

  ngOnInit(): void {
    this.getVehicle();
  }

  ngOnDestroy(): void {
    this.vehicle = undefined;
  }

  getVehicle(): void {
    const id = Number(this.route.snapshot.paramMap.get('VehicleID'));

    this.VehiclesService.getVehicle(id).subscribe((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.vehicle = data.data;

        this.vehicleForm.patchValue({
          // VehicleID: this.vehicle?.VehicleID,
          VehicleMake: this.vehicle?.VehicleMake,
          VehicleBrand: this.vehicle?.VehicleBrand,
          VehicleYear: this.vehicle?.VehicleYear,
        });

        console.log(this.vehicle);
      } else {
        console.log('Error: ' + status);
      }
    });
  }

  onSubmit(): void {
    const data = {
      VehicleID: this.vehicle?.VehicleID,
      UserID: this.vehicle?.UserID,
      VehicleMake: this.vehicleForm.value.VehicleMake,
      VehicleBrand: this.vehicleForm.value.VehicleBrand,
      VehicleYear: this.vehicleForm.value.VehicleYear,
    };

    this.VehiclesService.putVehicle(data).subscribe((data: any) => {
      const status = data.status;
      if (status === 200) {
        this.vehicle = data.data;

        // TODO: add success message
      } else {
        console.log('Error: ' + status);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
