import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { UsersListComponent } from 'src/app/users/list/users-list.component';
import { ApiService } from 'src/app/services/api.service';
import { UsersFormComponent } from 'src/app/users/form/users-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UsersFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
