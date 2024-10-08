import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandFileRoutingModule } from './cand-file-routing.module';
import { CandFileComponent } from './cand-file/cand-file.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
@NgModule({
  declarations: [CandFileComponent],
  imports: [
    CommonModule,
    CandFileRoutingModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
  ],
})
export class CandFileModule {}
