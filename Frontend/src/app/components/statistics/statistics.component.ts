import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { Statistic } from '../../models/statistic';
import { AgCharts } from 'ag-charts-angular';

@Component({
  selector: 'app-statistics',
  imports: [AgCharts],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) {}

  chartOptionsList: any;

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (res) => {
        const groupedStatistics: { [key: string]: Statistic[] } = {};

        res.forEach((item) => {
          if (!groupedStatistics[item.machineId]) {
            groupedStatistics[item.machineId] = [];
          }
          groupedStatistics[item.machineId].push(item);
        });

        var sortedStatistics = Object.values(groupedStatistics).map((stats) =>
          stats.sort((a, b) => a.training_month.localeCompare(b.training_month))
        );

        this.chartOptionsList = sortedStatistics.map((stats) => ({
          machine: stats[0].machine_name,
          data: {
            data: stats.map((item) => ({
              Month: item.training_month,
              KG: item.avg_weight,
            })),
            series: [{ type: 'bar', xKey: 'Month', yKey: 'KG' }],
          },
        }));
      },
      error: console.log,
    });
  }
}
