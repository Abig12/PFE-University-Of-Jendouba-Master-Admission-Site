import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { EtabService } from 'src/app/services/etab.service';

@Component({
  selector: 'app-add-agents',
  templateUrl: './add-agents.component.html',
  styleUrls: ['./add-agents.component.css'],
})
export class AddAgentsComponent {
  dataArray: any = [];
  messageaddSucc = '';
  messageerr = '';
  constructor(
    private es: EtabService,
    private route: Router,
    private as: AgentService
  ) {
    this.es.getetab().subscribe((data) => (this.dataArray = data));
  }

  addagent(a: any) {
    let data = a.value;
    this.as.addagent(data).subscribe(
      (data) => {
        this.messageaddSucc = 'Agent ajoutée avec succès';
        setTimeout(() => {
          location.reload();
        }, 600);
      },
      (error) => {
        this.messageerr = '';
        if (error.status === 402) {
          this.messageerr = 'Email déjà utilisé. ';
        }
        if (error.status === 401) {
          this.messageerr = 'Passeport/cin déjà utilisé. ';
        }
        if (error.status === 400) {
          this.messageerr = error.error.error;
        } // Handle the error here
      }
    );
  }
}
