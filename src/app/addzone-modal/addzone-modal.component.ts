import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Ol from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import  TileLayer from 'ol/layer/Tile';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Draw';
import { Type } from 'ol/geom/Geometry';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import TileSource from 'ol/source/Tile';
import GeoJSON from 'ol/format/GeoJSON';
import FeatureFormat from 'ol/format/Feature';
import { format } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-addzone-modal',
  templateUrl: './addzone-modal.component.html',
  styleUrls: ['./addzone-modal.component.css']
})


export class AddzoneModalComponent implements OnInit {
  public map!: Map;
  public place: any;
  submitted = false;
  active:boolean = false;
  geom:any = [];
  // ol:Ol;
  myType = GeoJSON;
  format:any;
  lat: number = 22.29985;
  long: number = 73.19555; // Vadodara Coordinates
  value:string = 'polygon';
  draw:any = null;
  snap:any = null;
  writer:any;
  ol:any;
  feat:any;
  // vectorSource: VectorSource = new VectorSource();  
  raster: TileLayer<any> = new TileLayer({
    source: new OSM(),
  }); 
  source = new VectorSource({wrapX: false});
  vector = new VectorLayer({
    source: this.source,
    style: {
      'fill-color': 'rgba(255, 255, 255, 0.3)',
      'stroke-color': '#ff5f3b',
      'stroke-width': 3,
    },
    
  });
  

 
  constructor(private formBuilder: FormBuilder) {}
 
  form: FormGroup = new FormGroup({
    zonename: new FormControl(''),
    description: new FormControl(''),
  })
 
  ngOnInit(): void {
   this.form = this.formBuilder.group(
      {
        zonename: ['', Validators.required],
        description: ['', Validators.required],
       
      });

    const place = [this.lat, this.long];
    this.map = new Map({
      
    layers: [this.raster, this.vector],
    target: 'map',
    view: new View({ 
     // center: [72.877426, 19.076090],
      center: place,
      zoom: 4, maxZoom: 16, 
     
    }),
  })

   
 }
 get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}
 addInteraction() {
  let value:Type = "Polygon";
  
    this.draw = new Draw({
      source: this.source,
      type: value,
      freehand:true,
      stopClick: true,
      style: {
        'stroke-color': 'rgba(255, 255, 100, 0.5)',
        'stroke-width': 1.5,
        'fill-color': 'rgba(255, 255, 100, 0.05)',
        'circle-radius': 6,
        'circle-fill-color': 'rgba(255, 255, 100, 0.5)',
      },
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({source: this.source,type: value,});
    this.map.addInteraction(this.snap);
    
    
  }

  removeInteraction(){
   this.map.removeInteraction(this.draw);
   this.map.removeInteraction(this.snap);
  }

  resetMap(){
  this.submitted = false;
  this.source.clear();
  
  this.form.reset();
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if(this.form.invalid) {
      alert('Please fill all the required fields to add new VMS');
      return;
    } if (!this.draw) {
      alert('Please draw the shape to add new VMS');
      return;
    } else {
      console.log(this.form.value);
    }
  
    const ol= this.ol;
   
   // console.log("Vector features",this.vector.getSource().getFeatures());
     var json = new GeoJSON().writeFeatures(this.vector.getSource().getFeatures(), { 

      dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'

    });

    function download(content, fileName, contentType) {

      var a = document.createElement("a");
      
      var file = new Blob([JSON.stringify(content)], { type: 'application/geojson' });
     // var file = new Blob([content], {type: contentType});
     a.href = URL.createObjectURL(file);
      a.href = URL.createObjectURL(file);
     a.download = fileName;
     a.click();

     console.log(json)
    

  }
  const zoneFileName = this.f['zonename'].value;
  const fileName = `${zoneFileName}_Zone`
  const exportType = 'application/geojson'

  download(json, fileName, exportType);
    
     alert('Saved Successfully...!!');
     


  }

  
}



