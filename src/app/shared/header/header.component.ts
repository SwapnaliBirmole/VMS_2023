import * as $ from 'jquery';
import { Component,OnInit, Input  } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { User } from 'src/app/_models';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {
  user?: User | null;
  @Input() title: string = '';
  
   
  ngOnInit() {
        
    var body=$("body");
    $('[data-toggle="minimize"]').on("click", function() {
      if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
        body.toggleClass('sidebar-hidden');
      } else {
        body.toggleClass('sidebar-icon-only');
      }
    });

    $('[data-toggle="offcanvas"]').on("click", function() {
      $('.sidebar-offcanvas').toggleClass('active')
    });
  }
 
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
}

logout() {
    this.accountService.logout();
}


}


