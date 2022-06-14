import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user/:UserID', component: UserDetailsComponent },
  { path: 'vehicle/:VehicleID', component: VehicleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
