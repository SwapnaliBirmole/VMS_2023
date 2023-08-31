import { AfterViewInit, Component, ElementRef, EventEmitter, Injectable, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NgbActiveModal,NgbCalendar,
	NgbDateAdapter,
	NgbDateParserFormatter,
	NgbDatepickerModule,
	NgbDateStruct, 
	NgbTimepickerConfig, 
	NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
  import { FormsModule,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
  import { IDropdownSettings } from 'ng-multiselect-dropdown';
  import Stepper from 'bs-stepper'
  import * as $ from 'jquery';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '-';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
	}
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}

@Component({
  selector: 'app-playlist-creation-modal',
  templateUrl: './playlist-creation-modal.component.html',
  styleUrls: ['./playlist-creation-modal.component.css']
})
export class PlaylistCreationModalComponent implements OnInit, AfterViewInit {
  active = 1;
  submitted = false;
  isCompleted=false;
  model2: string;
  model3: string;
  time: NgbTimeStruct = { hour: 24, minute: 0, second: 0 };
  time2: NgbTimeStruct = { hour: 24, minute: 0, second: 0 };
  seconds = true;
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
  // appendedHtml: string = '<div><b>this appended html</b></div>';
  @ViewChild('resizeDragDiv') div: ElementRef<HTMLDivElement>;
  @ViewChild('resizeDragDiv2') div2: ElementRef<HTMLDivElement>;
 
  private stepper: Stepper;
  constructor(
    public activeModal: NgbActiveModal,private ngbCalendar: NgbCalendar,private renderer: Renderer2, private dateAdapter: NgbDateAdapter<string>, config: NgbTimepickerConfig, private fb: FormBuilder
  ) { config.seconds = true; config.spinners = false; }
 
 
  ngOnInit() {
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

  ngAfterViewInit() {
    
   // console.log(this.div);
  //  this.renderer.addClass(this.div.nativeElement, 'resize');
    
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
  passBack() {
    this.passEntry.emit(this.user);
    this.activeModal.close(this.user);
  }

  onItemSelect(item: any) {
	console.log('onItemSelect', item);
}
onSelectAll(items: any) {
	console.log('onSelectAll', items);
}
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
   // this.submitted = true;
    /* if(this.form.invalid) {
      alert('Please fill all the required fields to add new VMS')
      return;
    } else {
      console.log(this.form.value)
    } */

    // if (this.form.invalid) {
    //   alert('Please fill all the required fields to create a super hero!')
    //   return;
    // }

    // console.log(JSON.stringify(this.form.value, null, 2));
   // this.passBack();
  }
  onReset(): void {
    this.submitted = false;
    // this.brightness =0;
    // this.tooltip.style.setProperty('left', '0');
    // this.tooltip.innerHTML =  `<span>0</span>`;
    // document.documentElement.style.setProperty(
    //   "--range-progress",
    //   '0'
    // );
    this.form.reset();
   
  }

  appendBlock()  {
    var rDiv = $('.blockDiv').html();
    var parentDiv = $('.blockDiv');
//var nDiv = this.div;
    var nDiv = $(rDiv).css({"width": "50px", "height": "50px", "top":"0", "left":"0"});
   
    
    parentDiv.prepend(nDiv);
    // this.renderer.addClass(this.div2.nativeElement, 'resize');
    // this.renderer.addClass(this.div.nativeElement, 'resize'); 
   // console.log(this.div);
  }
  undoBlock()  {
       $(".blockDiv :last-child").remove();
       this.clicked = false;
   
  }


  
}
