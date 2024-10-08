import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SignupRoutingModule, FormsModule],
})
export class SignupModule {}
