import { Component,  OnInit,   ViewChild} from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from "angular-datatables";
//import { Subject } from "rxjs";
import 'datatables.net';
import { AppService } from 'src/app/app.service';
declare let $: any;

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit {
 
 @ViewChild(DataTableDirective)
 datatableElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
  vmsList: any = [];
 // dtTrigger: Subject<any> = new Subject<any>();
 
  salesData: ChartData<'pie'> = {
    labels: ['Enable','Disable',],
    datasets: [
      { data: [30,70],
        backgroundColor: [
          'rgba(81, 200, 28, 1)',
          'rgba(144, 156, 139, 1)',
     ] },
      
    ]
    };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Device Status',

      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 10,
         //  padding: 50
        }
     },
    },
   
  };

  // horizontar Bar
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y',
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
       min:0  ,
       max:20     
      },
      y: {
        min: 0,
        max:40  
      }
    },
    plugins: {
      legend: {
        display: false,
      },
             
    }
  };

 public barChartType: ChartType = 'bar';
 
  public mediaData: ChartData<'bar'> = {
     labels: ["Peding", "Rejected", "Aproved"],
     datasets: [
      { data: [12,19,13],
        backgroundColor: [
          'rgba(153, 102, 255, 1)',
        'rgba(247, 33, 79, 1)',
        'rgba(81, 200, 28, 1)',
     ] ,
     barThickness: 25,
     maxBarThickness: 40,
     barPercentage: 0.50,
       
    },
      
    ]
    };


    public PlaylistData: ChartData<'bar'> = {
      labels: ["Peding", "Rejected", "Aproved"],
      datasets: [
       { data: [12,19,13],
         backgroundColor: [
           'rgba(153, 102, 255, 1)',
         'rgba(247, 33, 79, 1)',
         'rgba(81, 200, 28, 1)',
      ] ,
      barThickness: 25,
      maxBarThickness: 40,
      barPercentage: 0.50,
        
     },
       
     ]
     };

// Top Ads 
public AdsOptions: ChartConfiguration['options'] = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: {
    x: {
     min:0  ,
     max:25     
    },
    y: {
      min: 0,
      max:25  
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    
  },
};

     public AdsData: ChartData<'bar'> = {
      labels: ["Pepsi", "Coke", "Patanjali", "Government"],
      datasets: [
       { data: [12,19,13,24],
         backgroundColor: [
           'rgba(153, 102, 255, 1)',
         'rgba(247, 33, 79, 1)',
         'rgba(81, 200, 28, 1)',
         'rgba(255, 159, 64, 1)',
      ] ,
      barThickness: 35,
      maxBarThickness: 40,
      barPercentage: 0.50,
        
     },
       
     ]
   
  } ;
    

  constructor(private httpClient: HttpClient, private appService: AppService){}
  ngOnInit(){

 

 this.appService.setTitle('Bye Component');

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      lengthMenu:[ [8, 10, 25, 50, -1], [8, 10, 25, 50, "All"] ],
      processing: true
      
    };
    this.httpClient.get("assets/data/vmsData.json").subscribe(data =>{
      console.log(data);
      this.vmsList = data;
     // this.dtTrigger.next(true);
    });
  //   const dataUrl =
  //   "assets/data/vmsData.json";

  // this.http.get(dataUrl).subscribe(response => {
  //   this.vmsList = response.data;
  //  this.dtTrigger.next(true);
  // });
   
   /*  $('#vmsTable').DataTable({
      //  "lengthMenu": [ [8, 10, 25, 50, -1], [8, 10, 25, 50, "All"] ],
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
            this.nextButtonClickEvent();
          });
      }
    }); */

    // let table = $('#vmsTable').DataTable({
    //   drawCallback: () => {
    //     $('.paginate_button.next').on('click', () => {
    //         this.nextButtonClickEvent();
    //       });
    //   }
    // });

  }
  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }
  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log('Button in the row clicked.');
  }

  wholeRowClick(): void {
    console.log('Whole row clicked.');
  }

  nextButtonClickEvent(): void {
    //do next particular records like  101 - 200 rows.
    //we are calling to api

    console.log('next clicked')
  }
  previousButtonClickEvent(): void {
    //do previous particular the records like  0 - 100 rows.
    //we are calling to API
  }

}
