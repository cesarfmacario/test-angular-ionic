import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from 'src/app/users/list/users-list.component';
import { UsersFormComponent } from 'src/app/users/form/users-form.component';

const routes: Routes = [
  { path: "users", component: UsersListComponent },
  { path: "users/new", component: UsersFormComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
