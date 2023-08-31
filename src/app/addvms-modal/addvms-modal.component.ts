import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
declare let $: any;

@Component({
  selector: 'app-addvms-modal',
  templateUrl: './addvms-modal.component.html',
  styleUrls: ['./addvms-modal.component.css']
})
export class AddvmsModalComponent implements OnInit {
  public map!: Map;
  submitted = false;
  active:boolean = false;
  vmsOn:boolean = false;
  showMap:boolean =true;
  brightness=0;
  range:any;
  tooltip:any;
  setValue:any;
  newPosition:any;
  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  // Zone names
 // Zone:any = ['North', 'Vododara', 'Bhagalpur', 'Gandhinagar'];
  Zone:any = [{ id: 1, name: "North"  },
  { id: 2, name: "Vododara" },
  { id: 3, name: "Bhagalpur" },
  { id: 4, name: "Gandhinagar" }];
  ipaddress: any;
  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal,) {}
  
  form: FormGroup = new FormGroup({
    vmsid: new FormControl(''),
    serialno: new FormControl(''),
    description: new FormControl(''),
    zonename: new FormControl(''),
    installationdate: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    //acceptTerms: new FormControl(false),
    ipaddress: new FormControl(''),
  });
 
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        vmsid: ['', Validators.required],
        serialno: ['',Validators.required],
        description: ['',Validators.required],
        zonename: ['',Validators.required],
        installationdate: ['',Validators.required],
        latitude: ['',Validators.required],
        longitude: ['',Validators.required],
        width: ['',Validators.required],
        height: ['',Validators.required],
        ipaddress: ['',
          Validators.required,
          Validators.pattern("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
        ],
        
      }
    );
   
    this.form.get('installationdate').patchValue(this.formatDate(new Date()));
    this.form.addControl('ipaddress', this.ipaddress);

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }), new VectorLayer({
          source: new VectorSource({
            url: './north.geojson',//if geojson is in same directory
            format: new GeoJSON()
          })
        })
      ],
      target: 'map',
      view: new View({ 
        center: [0, 0],
        zoom: 2,maxZoom: 18, 
      }),
    });

    $(document).ready(() => {
      this.range = document.getElementById("range"),
      this.tooltip = document.getElementById("tooltip"),
      this.setValue = () => {
        const newValue = Number(
            ((this.range.value - this.range.min) * 100) / (this.range.max - this.range.min)
          ),
          newPosition = 16 - newValue * 0.32;
        this.tooltip.innerHTML = `<span>${this.range.value}</span>`;
       this.brightness = this.range.value;
        this.tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
        document.documentElement.style.setProperty(
          "--range-progress",
          `calc(${newValue}% + (${newPosition}px))`
        );
      };
    document.addEventListener("DOMContentLoaded", this.setValue);
    this.range.addEventListener("input", this.setValue);
    }); 
    
    
   
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


 // Choose city using select dropdown
 changeZone(e) {
  this.form.get('zonename').setValue(e.target.value, {
    onlySelf: true
  })
}


private formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}


  onSubmit(): void {
    this.submitted = true;
    if(this.form.invalid) {
      alert('Please fill all the required fields to add new VMS')
      return;
    } else {
      console.log(this.form.value)
    }

    // if (this.form.invalid) {
    //   alert('Please fill all the required fields to create a super hero!')
    //   return;
    // }

    // console.log(JSON.stringify(this.form.value, null, 2));
    this.passBack();
  }

  onReset(): void {
    this.submitted = false;
    this.brightness =0;
    this.tooltip.style.setProperty('left', '0');
    this.tooltip.innerHTML =  `<span>0</span>`;
    document.documentElement.style.setProperty(
      "--range-progress",
      '0'
    );
    this.form.reset();
   
  }

  passBack() {
    this.passEntry.emit(this.user);
    this.activeModal.close(this.user);
  }
  showMapView() {
    if (this.f['zonename'].valid) {
    this.showMap = !this.showMap;
      } else {
      alert('Please Select Zone Name');
    }
  }
  showForm() {
    this.showMap = true;
  }
 
}
