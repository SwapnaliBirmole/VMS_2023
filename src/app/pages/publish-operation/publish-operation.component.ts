import { AfterViewInit, Component,  EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

  import { FormsModule,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
  import { IDropdownSettings } from 'ng-multiselect-dropdown';
  import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
  import { SelectionModel } from '@angular/cdk/collections';
  import Stepper from 'bs-stepper'
  import * as $ from 'jquery';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */

@Component({
  selector: 'app-publish-operation',
  templateUrl: './publish-operation.component.html',
  styleUrls: ['./publish-operation.component.css']
})

export class PublishOperationComponent implements OnInit, AfterViewInit {
  active = 1;
  submitted = false;
  isCompleted=false;
 
  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  form:FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
//   selectedItems:Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  zones:Array<any> = [];
  vms:Array<any> = [];
  url:any;
  clicked = false;
  undoClicked = false;
  selectedItems: any[];
  savedItems : any[];
  select_all = false;
  data: any[] = [
    {
          "playListId": "PL001",
          "serialNo": "1",
          "description": "Playlist 1 _6 to 10",
          "listId": 35
    },
    {
          "playListId": "PL002",
          "serialNo": "2",
          "description": "8 minutes playlist",
          "listId": 26
    },
  ];
  // appendedHtml: string = '<div><b>this appended html</b></div>';
  
  private stepper: Stepper;
  constructor(private httpClient: HttpClient,
   private fb: FormBuilder
  ) { }
 
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
   
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu:[ [5, 10, 25, 50, -1], [5, 10, 25, 50, "All"] ],
      processing: true,
      dom: 'fltip',
      // buttons: [
      //   {
      //     text: '<i class="icon-cross"></i> Clear Media',
      //     className:'btn btn-danger btn-rounded text-dark mr-3',
      //     attr:  {
      //       title: 'Clear Media',
      //       id: 'clearMedia',
      //         },
      //     action: function (e, dt, node, config) {
            
      //   }
      // }
      // ],
      drawCallback: () => {
        // $('#clearMedia').on('click', () => {
        //  this.saveSelectedItem();
        //   });
      }
   
    }


    this.zones = [
      { item_id: 1, item_text: 'North' },
      { item_id: 2, item_text: 'Vadodara' },
      { item_id: 3, item_text: 'Muzaffarnagar' },
      { item_id: 4, item_text: 'Bhagalpur' },
      { item_id: 5, item_text: 'Gandhinagar' },
    ];
     this.vms = [
      { item_id: 1, item_text: 'VMS015-Virandhavan' },
      { item_id: 2, item_text: 'VMS016-Panigate' },
      { item_id: 3, item_text: 'VMS017-Soma Talav' },
      { item_id: 4, item_text: 'VMS018-Trasali' },
      { item_id: 5, item_text: 'VMS019-Susen' },
    ];
    // this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: this.ShowFilter,
      
    };
    // this.form = this.fb.group({
    // //	city: [this.selectedItems],
    // zones:this.zones,
    // vms:this.vms,
    // file: new FormControl('', [Validators.required]),
    // });
  
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    
     // console.log(this.user);
}

onSelectAll(e: any): void { 
  for (let i = 0; i < this.data.length; i++) {
    const item = this.data[i];
    item.is_selected = e;
  }
}
removeSelectedRows() {
  this.data.forEach(item => {
   let index: number = this.data.findIndex(d => d === item);
   console.log(this.data.findIndex(d => d === item));
   this.data.splice(index,1);

 });
 this.selection = new SelectionModel<Element>(true, []);
}

public saveSelectedItem() {
 
  this.selectedItems =[];
  for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].is_selected) {
        this.selectedItems.push(this.data[i]);
      }
  }
   
  this.data = this.data.filter( ( el ) => !this.selectedItems.includes( el ) );
  console.log(this.selectedItems);
  console.log(this.data);
}
  
  ngAfterViewInit() {
   
    
  }

  next() {
    this.stepper.next();
    var lastEle = $( ".step.active" ).prev();
    lastEle.addClass('completed');
  }
  prev() {
    this.stepper.previous();
    var lastEle = $( ".step.active" );
    lastEle.removeClass('completed');
  }
  

  onItemSelect(item: any) {
	console.log('onItemSelect', item);
}
// onSelectAll(items: any) {
// 	console.log('onSelectAll', items);
// }
toogleShowFilter() {
	this.ShowFilter = !this.ShowFilter;
	this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
	if (this.limitSelection) {
		this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
	} else {
		this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
	}
}
onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  onSubmit(): void {
  
  }
  onReset(): void {
    this.submitted = false;
   
    this.form.reset();
   
  }

 


  
}
