import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router } from '@angular/router';
import { User } from './_models';
import { AccountService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title: string = '';
  user?: User | null;
  constructor(private route: Router, private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe(x => this.user = x);
  }
 

  setHeader() {
    //let path = this.route.url.split('/')[1];
    let path = this.route.url.toUpperCase().split('/')[1];
   // this.title = decodeURIComponent(path).replace(/\s/g, '-'); 
    this.title = decodeURIComponent(path).replace('-',' '); 
   // console.log(this.title.replace(/\s/g, '-'));
    
  }
  
  ngOnInit() {
   // this.route.url.replace(/\s/g, '-');

  $(function() {
    var body = $('body');
    var contentWrapper = $('.content-wrapper');
    var scroller = $('.container-scroller');
    var footer = $('.footer');
    
    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

    //Horizontal menu in mobile
    $('[data-toggle="horizontal-menu-toggle"]').on("click", function() {
      $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
    });
    // Horizontal menu navigation in mobile menu on click
    var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
    navItemClicked.on("click", function(event) {
      if(window.matchMedia('(max-width: 991px)').matches) {
        if(!($(this).hasClass('show-submenu'))) {
          navItemClicked.removeClass('show-submenu');
        }
        $(this).toggleClass('show-submenu');
      }        
    })

    // $(window).scroll(function() {
    //   if(window.matchMedia('(min-width: 992px)').matches) {
    //     var header = $('.horizontal-menu');
    //     if ($(window).scrollTop() >= 70) {
    //       $(header).addClass('fixed-on-scroll');
    //     } else {
    //       $(header).removeClass('fixed-on-scroll');
    //     }
    //   }
    // });
  });
}
}
