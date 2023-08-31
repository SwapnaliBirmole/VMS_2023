import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal,NgbCalendar,
	NgbDateAdapter,
	NgbDateParserFormatter,
	NgbDatepickerModule,
	NgbDateStruct, 
	NgbTimepickerConfig, 
	NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
  import { FormsModule,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
  import { IDropdownSettings } from 'ng-multiselect-dropdown';
  


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
  selector: 'app-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.css'],

})
export class PublishModalComponent implements OnInit {
  active = 1;
  model2: string;
  model3: string;
  time: NgbTimeStruct = { hour: 24, minute: 0, second: 0 };
  time2: NgbTimeStruct = { hour: 24, minute: 0, second: 0 };
  seconds = true;
  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  myForm:FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
//   selectedItems:Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  zones:Array<any> = [];
  vms:Array<any> = [];
  url:any;
  constructor(
    public activeModal: NgbActiveModal,private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, config: NgbTimepickerConfig, private fb: FormBuilder
  ) { config.seconds = true;config.spinners = false; }
 
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
	this.myForm = this.fb.group({
	//	city: [this.selectedItems],
	zones:this.zones,
	vms:this.vms,
	file: new FormControl('', [Validators.required]),
	});
	
    console.log(this.user);
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
}
