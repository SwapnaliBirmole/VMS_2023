import { HttpClient } from '@angular/common/http';
import { Component,    OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { AddvmsModalComponent } from 'src/app/addvms-modal/addvms-modal.component';

declare let $: any;

@Component({
  selector: 'app-vmsmanagement',
  templateUrl: './vmsmanagement.component.html',
  styleUrls: ['./vmsmanagement.component.css']
})
export class VmsmanagementComponent implements OnInit {
  @ViewChild(DataTableDirective)
 datatableElement: DataTableDirective;
 dtElement: DataTableDirective;
 
  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  allVmsList: any = [];
  clickStatus: string = " ";
  nativeElement: any;
  drawCallback:any;
  
 
   
constructor(private httpClient: HttpClient, public modalService: NgbModal){}
// constructor(
//   public modalService: NgbModal
// ) { }
  ngOnInit(): void {
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      lengthMenu:[ [8, 10, 25, 50, -1], [8, 10, 25, 50, "All"] ],
      processing: true,
      dom: 'Bfltip',
      buttons: [
        {
          text: '<i class="icon-plus"></i> Add New VMS',
          className:'btn btn-success btn-rounded text-dark mr-3',
          attr:  {
            title: 'Add VMS',
            id: 'addVms',
              },
          action: function (e, dt, node, config) {
          // this.openModal();
      //      drawCallback: () => {
      //   $('#addVms').on('click', () => {
      //     this.openModal();
      //     });
      // }
        }
      }
      ],
      drawCallback: () => {
        $('#addVms').on('click', () => {
          this.openModal();
          });
      }
    //   buttons: [
    //    // 'copy', 'excel', 'pdf'
    // ]
    /* initComplete: function () {
      var adBtn:any = $('#addVms');
      $(adBtn).attr('onclick','openModal()');
    } */
    };
    // this.httpClient.get("assets/data/vmsData.json").subscribe(data =>{
    //   console.log(data);
    //   this.allVmsList = data;
    //  // this.dtTrigger.next(true);
    // });
     
  }
 /*  addElement() {
   var d1 = this.elementRef.nativeElement.querySelector('#vmsList_wrapper .dataTables_length');
  d1.insertAdjacentHTML('beforeBegin', '<button class="dt-button btn btn-success btn-rounded text-dark mr-3"><i class="icon-plus"></i> Add New VMS 2</button>');
    // const p: HTMLParagraphElement = this.renderer.createElement('span');
    // p.innerHTML = "<button type='button'>New</button>";
    // this.renderer.appendChild(this.div.nativeElement, p);
  } */
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
  openModal() {
   
    const modalRef = this.modalService.open(AddvmsModalComponent,  { windowClass: 'rounded-7', size: 'xl' });
    
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
   
  
    
  }
 
  ngOnDestroy() {
    this.modalService.dismissAll(AddvmsModalComponent);

  }
  
 
 
}

 







