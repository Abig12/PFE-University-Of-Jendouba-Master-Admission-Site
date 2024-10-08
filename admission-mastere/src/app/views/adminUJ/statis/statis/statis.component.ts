import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AgenteesService } from 'src/app/services/agentees.service';
import { StaticService } from 'src/app/services/static.service';
@Component({
  selector: 'app-statis',
  templateUrl: './statis.component.html',
  styleUrls: ['./statis.component.css'],
})
export class StatisComponent {
  nbag: any = [];
  nbms: any = [];
  nbca: any = [];
  nbet: any = [];
  chartArray: any = [];
  idmas: any = [];
  nb: any = [];
  nomidArray: any = [];
  constructor(private ss: StaticService) {
    this.ss.agentsnb().subscribe((data) => {
      this.nbag = data;
    });
    this.ss.masnb().subscribe((data) => {
      this.nbms = data;
    });
    this.ss.candnb().subscribe((data) => {
      this.nbca = data;
    });
    this.ss.etabnb().subscribe((data) => {
      this.nbet = data;
    });
    this.ss.chartuj().subscribe((data) => {
      this.chartArray = data;
      if (this.chartArray != null) {
        this.idmas = this.chartArray.map((obj: any) => obj.etab_id);
        this.nb = this.chartArray.map((obj: any) => obj.nb);

        this.randerchart(this.idmas, this.nb);
      }
    });
    this.ss.etabidnom().subscribe((data) => {
      this.nomidArray = data;
    });
  }

  randerchart(lb: any, da: any) {
    // Create a new chart instance with the configuration
    Chart.register(...registerables);
    const myChart = new Chart('agenteesChart', {
      type: 'bar',
      data: {
        labels: lb,
        datasets: [
          {
            label: 'Nombre de masters pour chaque établissements',
            data: da,

            borderWidth: 3,
            borderColor: 'rgb(92, 184, 92)',
            backgroundColor: ['rgba(92, 184, 92, 0.2)'],
          },
        ],
      },
    });
  }
}
