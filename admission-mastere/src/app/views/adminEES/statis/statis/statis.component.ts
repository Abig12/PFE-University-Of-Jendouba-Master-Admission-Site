import { Component } from '@angular/core';
import { AgenteesService } from 'src/app/services/agentees.service';
import { StaticService } from 'src/app/services/static.service';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-statis',
  templateUrl: './statis.component.html',
  styleUrls: ['./statis.component.css'],
})
export class StatisComponent {
  masArray: any = [];
  nbag: any = [];
  nbms: any = [];
  nbca: any = [];
  nbad: any = [];
  chartArray: any = [];
  idmas: any = [];
  nb: any = [];
  nomidArray: any = [];
  constructor(private ees: AgenteesService, private ss: StaticService) {
    this.ees.getetab().subscribe((data) => {
      this.masArray = data;
      this.ss.getagentnb(this.masArray[0].etablissement).subscribe((data) => {
        this.nbag = data;
      });
      this.ss.getmasnb(this.masArray[0].etablissement).subscribe((data) => {
        this.nbms = data;
      });
      this.ss.getcandnb(this.masArray[0].etablissement).subscribe((data) => {
        this.nbca = data;
      });
      this.ss.getadmisnb(this.masArray[0].etablissement).subscribe((data) => {
        this.nbad = data;
      });
      this.ss.getchat(this.masArray[0].etablissement).subscribe((data) => {
        this.chartArray = data;
        if (this.chartArray != null) {
          this.idmas = this.chartArray.map((obj: any) => obj.cm_id);
          this.nb = this.chartArray.map((obj: any) => obj.nb);

          this.randerchart(this.idmas, this.nb);
        }
      });
      this.ss.getmasidnom(this.masArray[0].etablissement).subscribe((data) => {
        this.nomidArray = data;
      });
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
            label: 'nombre de candidatures pour chaque mastére',
            data: da,

            borderWidth: 3,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          },
        ],
      },
    });
  }
}
