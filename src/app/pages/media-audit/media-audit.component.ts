import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MediaDetailsComponent } from '../media-details/media-details.component';
declare let $: any;

@Component({
  selector: 'app-media-audit',
  templateUrl: './media-audit.component.html',
  styleUrls: ['./media-audit.component.css']
})
export class MediaAuditComponent {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
   constructor(
    private httpClient: HttpClient,public modalService: NgbModal
  ) { }
 
 
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      lengthMenu:[ [8, 10, 25, 50, -1], [8, 10, 25, 50, "All"] ],
      processing: true,
      dom: 'flBtip',
      buttons: [
        {
          text: '<i class="icon-clock"></i> Pending',
          className:'btn btn-primary btn-rounded text-dark ml-2',
          attr:  {
            title: 'Add VMS',
            id: 'pendingMedia',
              },
              action: function(e, dt, node, config){
                dt.column(6).search("Pending").draw();
            }
       },
       {
        text: '<i class="icon-circle-check"></i> Approved',
        className:'btn btn-success btn-rounded text-dark ml-2',
        attr:  {
          title: 'Add VMS',
          id: 'approvedMedia',
          value:'Approved',
            },
            action: function(e, dt, node, config){
              dt.column(6).search("Approved").draw();
          }
      },
      {
        text: '<i class="icon-circle-cross"></i> Reject',
        className:'btn btn-danger btn-rounded text-dark ml-2',
        attr:  {
          title: 'Add VMS',
          id: 'rejectedMedia',
            },
            action: function(e, dt, node, config){
              dt.column(6).search("Reject").draw();
              }
        }
      ],
      drawCallback: () => {
        // $('#ViewMediaList').on('click', () => {
        //   this.openModal();
        //   });
        }
      }
 }




 openModal() {
   
  const modalRef = this.modalService.open(MediaDetailsComponent,  { windowClass: 'rounded-7', size: 'lg' });
  
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
  this.modalService.dismissAll(MediaDetailsComponent);

}

}