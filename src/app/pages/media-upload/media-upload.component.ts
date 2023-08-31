import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.css']
})
export class MediaUploadComponent implements OnInit {
  active = 1;
  result: string = '';
  myForm:FormGroup;

  //this is your original recipe name which you had passed from previous page

  constructor(private fb: FormBuilder){}

  
  ngOnInit() {
   
  }


  save(event: any): void {
    var selectedFiles = event.target.files;
    for (var i = 0; i < selectedFiles.length; i++) {
      this.result += selectedFiles[i].name +`  <i class="fa fa-times"></i>`;
      this.result += '<br>----------------------------<br>';
    }
  }
}
