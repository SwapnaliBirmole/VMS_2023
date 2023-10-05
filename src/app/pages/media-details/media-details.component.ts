import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css']
})
export class MediaDetailsComponent implements OnInit {

  imageSrc = '';
  messageText = '';
  imageList = [ {src:'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=350', name: 'image-1'}, {src:'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350', name: 'image-2'}, 
  {src:'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350', name: 'image-3'}]

  @Input() public user;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor( public activeModal: NgbActiveModal,) {}
  ngOnInit(): void {
  
  }
onClick(viewImage) {
   this.imageSrc = viewImage.src;
    //this.messageText = viewImage.name;
  }
passBack() {
  this.passEntry.emit(this.user);
  this.activeModal.close(this.user);
}
}