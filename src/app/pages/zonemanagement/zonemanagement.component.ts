import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
declare let $: any;
@Component({
  selector: 'app-zonemanagement',
  templateUrl: './zonemanagement.component.html',
  styleUrls: ['./zonemanagement.component.css']
})
export class ZonemanagementComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  addZone:boolean = false;
  zoneList:boolean =true;
 
constructor(private httpClient: HttpClient){}
  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      lengthMenu:[ [8, 10, 25, 50, -1], [8, 10, 25, 50, "All"] ],
      processing: true,
      dom: 'Bfltip',
      buttons: [
        {
          text: '<i class="icon-plus"></i> Add New Zone',
          className:'btn btn-success btn-rounded text-dark mr-3',
          attr:  {
            title: 'Add VMS',
            id: 'addZone',
              },
          action: function (e, dt, node, config) {
            // render: (display: boolean, type: any, full: any) => {
            //   this.display = false;
            //    // this.openModal();
            //    this.display = !this.display;
             
            
            // }
            // this.display = true;
        }
      }
      ],
      drawCallback: () => {
        $('#addZone').on('click', () => {
          this.toggle();
          });
      }
   
      
    };
    // this.httpClient.get("assets/data/vmsData.json").subscribe(data =>{
    //   console.log(data);
    //   this.allVmsList = data;
    //  // this.dtTrigger.next(true);
    // });


    
     
  }
  toggle() {
    this.addZone = !this.addZone;

    // Change the name of the button.
    if(this.addZone = true)  
      this.zoneList = false;
    else
      this.zoneList = true;
  }



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
