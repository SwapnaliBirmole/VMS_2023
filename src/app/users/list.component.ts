import { Component,    Input,    OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { AddEditComponent } from './add-edit.component';
import { User } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare let $: any;

@Component({ templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  id?: string;
  form!: FormGroup;
  title!: string;
  loading = false;
  user:any;
    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;
    dtElement: DataTableDirective;
    
     //dtOptions: DataTables.Settings = {};
     dtOptions: any = {};
     allVmsList: any = [];
     clickStatus: string = " ";
     nativeElement: any;
     drawCallback:any;

    users?: any[];
   
    constructor(
      private accountService: AccountService, 
      private httpClient: HttpClient, 
      public modalService: NgbModal,
      private formBuilder: FormBuilder,
    
     ) {}

    ngOnInit() {

        this.dtOptions = {
            pagingType: 'full_numbers',
           // pageLength: 8,
            lengthMenu:[ [8, 10, 25, 50, -1], [8, 10, 25, 50, "All"] ],
            processing: true,
            dom: 'Bfltip',
            columnDefs: [{ orderable: false, targets: [3] }],
            buttons: [
              {
                text: '<i class="icon-plus"></i> Add New User',
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
},


        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
          
            this.id = this.user.id;
            // form with validation rules
this.form = this.formBuilder.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  username: ['', Validators.required],
  // password only required in add mode
  password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]]
});

              
}

    deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }

    // edit(i:any, user:any){
      
    //   this.isedit=true;
    //   this.userform.id= user.id;
    //   this.userform.setValue({
    //     name:user.name,
    //     email:user.email,
    //     phone:user.phone,
    //     website:user.website
    //   })
    // }

    openModal() {
   
        const modalRef = this.modalService.open(AddEditComponent,  { windowClass: 'rounded-7', size: 'lg' },);
        modalRef.componentInstance.title = 'Add New User';
        modalRef.result.then((result) => {
          if (result) {
          console.log(result);

          }
        });
        // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        //   console.log(receivedEntry);
        // })
        }

        openModal2(id:string) {
                 // edit mode
                 const user = this.users.find(x => x.id === id); 
                  
      // this.id = this.users.find(x => x.id === id);
      // const user = this.id;
         console.log(user.id);
          //const modalRef = this.modalService.open(AddEditComponent);
          const modalRef = this.modalService.open(AddEditComponent,{ windowClass: 'rounded-7', size: 'lg' });
         // routerLink="edit/{{user.id}}" 
         modalRef.componentInstance.title = 'Edit User';
          modalRef.componentInstance.user = user;
         // modalRef.componentInstance.id = id;
         // modalRef.componentInstance.data= user;
         //this.id = modalRef.componentInstance.user['id'];
          if (this.id) {
            // edit mode
           this.title = 'Edit User';
           this.loading = true;    
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                   
                   
                   });
                   
                 
         }
         
        
          modalRef.result.then((result) => {
            if (result) {
             console.log(result.id);
           
            }
           
          });
          modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
            console.log(receivedEntry);
          })
        }

        ngOnDestroy() {
          this.modalService.dismissAll(AddEditComponent);
      
        }
        
}