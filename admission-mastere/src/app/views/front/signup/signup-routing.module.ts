import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: SignupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
