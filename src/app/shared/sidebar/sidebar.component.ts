import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  user: User | null;
  openSidebar: boolean = true;
  isMenuOpen: boolean = false;
  isCollapsed: boolean = false;
  element: any;
  
  menuSidebar = [
    {
      link_name: "My View",
      link: "/dashboard",
      icon: "icon-layout menu-icon",
      id:"myview",
      sub_menu: [
        {
          link_name: "Dashboard",
          link: "/dashboard",
        }, {
          link_name: "Map view",
          link: "/mapview",
        }
      ]
    },
    {
      link_name: "Administration",
      link: "/zone-management",
      icon: "icon-book menu-icon",
      id:"admin",
      sub_menu: [
        {
          link_name: "Zone Management",
          link: "/zone-management",
        }, {
          link_name: "Screen Management",
          link: "/vms-management",
        },
        {
          link_name: "Media Clearance",
          link: "/media-clearence",
        },
      ]
    },
    {
      link_name: "User Management",
      link: "/users",
      icon: "icon-head menu-icon",
      id:"admin",
      sub_menu: [
        {
          link_name: "Users",
          link: "/users",
        }, {
          link_name: "Roles",
          link: "/roles",
        },
      ]
    },
    {
      link_name: "Media",
      link: "/media-upload",
      icon: "icon-video menu-icon",
      id:"admin",
      sub_menu: [
        {
          link_name: "Media Upload",
          link: "/media-upload",
        }, {
          link_name: "Playlist Creation",
          link: "/playlist-creation",
        },
      ]
    },
    {
      link_name: "Audit",
      link: "/media-audit",
      icon: "icon-help menu-icon",
      id:"admin",
      sub_menu: [
        {
          link_name: "Media Audit",
          link: "/media-audit",
        }, {
          link_name: "Playlist Audit",
          link: "/playlist-audit",
        },
      ]
    },
    {
      link_name: "Reports",
      link: "/playlistreport",
      icon: "icon-file menu-icon",
      id:"admin",
      sub_menu: [
        {
          link_name: "Playlist Reports",
          link: "/playlistreport",
        }, {
          link_name: "Operational Reports",
          link: "/operationalreport",
        },
      ]
    }
    
  ]
  





  ngOnInit() {
   
    var body=$("body");
    var sidebar = $('.sidebar');
       
     //Add active class to nav-link based on url dynamically
    //Active class can be hard coded directly in html file also as required
    jQuery(function() {
    function addActiveClass(element:any) {
      if (current === "") {
        //for root url
        if (element.attr('href').indexOf("dashboard") !== -1) {
            element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
          }
        }
      } else {
        //for other url
        // if (element.attr('href').indexOf(current) !== -1) {
        //   element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
          }
          if (element.parents('.submenu-item').length) {
              element.addClass('active');
          }
        }
     // }
    }

    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.nav li a', sidebar).each(function() {
      var $this = $(this);
      addActiveClass($this);
    })
    $('.nav-link').on('click', function(){
      let $div = $(this).next('div').toggleClass('show');
     $('div').not($div).removeClass('show');
     $(this).attr('aria-expanded','true');
     $('.nav-link').not(this).attr('aria-expanded','false');
     return false; // prevent
    });
    $('.horizontal-menu .nav li a').each(function() {
      var $this = $(this);
      addActiveClass($this);
    })

    //Close other submenu in sidebar on opening any

    sidebar.on('show.bs.collapse', '.collapse', function() {
      sidebar.find('.collapse.show').removeClass('show');
    });

    
    //Change sidebar and content-wrapper height
    applyStyles();

    function applyStyles() {
      //Applying perfect scrollbar
      if (!body.hasClass("rtl")) {
        if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
          const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
        }
        if ($('.chats').length) {
          const chatsScroll = new PerfectScrollbar('.chats');
        }
        if (body.hasClass("sidebar-fixed")) {
          if($('#sidebar').length) {
            var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');
          }
        }
      }
    }

   });
  }

   toggleMenu() {
     this.isMenuOpen = !this.isMenuOpen;
     
   }
   
  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.add("hover-open");
  }
  hideSubmenu(itemEl: HTMLElement) {
    itemEl.classList.remove("hover-open");
  
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

   constructor(private accountService: AccountService) {
      this.user = this.accountService.userValue;
  }

}

