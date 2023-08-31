import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashbaordComponent } from './pages/dashbaord/dashbaord.component';
import { MapviewComponent } from './pages/mapview/mapview.component';
import { ZonemanagementComponent } from './pages/zonemanagement/zonemanagement.component';
import { VmsmanagementComponent } from './pages/vmsmanagement/vmsmanagement.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import {DataTablesModule} from 'angular-datatables';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerModule, NgbModule, NgbNavModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter, PublishModalComponent } from './publish-modal/publish-modal.component';
import { AddvmsModalComponent } from './addvms-modal/addvms-modal.component';
import { AddzoneModalComponent } from './addzone-modal/addzone-modal.component';
import { AlertComponent } from './_components';
import { ErrorInterceptor, JwtInterceptor, fakeBackendProvider } from './_helpers';
import { ListviewComponent } from './pages/listview/listview.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MediaClearanceComponent } from './pages/media-clearance/media-clearance.component';
import { MediaUploadComponent } from './pages/media-upload/media-upload.component';
import { MedialistComponent } from './pages/medialist/medialist.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { PlaylistCreationModalComponent } from './playlist-creation-modal/playlist-creation-modal.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    DashbaordComponent,
    ZonemanagementComponent,
    VmsmanagementComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent, 
    MapviewComponent, PublishModalComponent, AddvmsModalComponent, AddzoneModalComponent, 
    AlertComponent, ListviewComponent, MediaClearanceComponent, MediaUploadComponent, MedialistComponent, PlaylistComponent, PlaylistCreationModalComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    DataTablesModule,
    NgbModule,
    NgbDatepickerModule,
    NgbNavModule,
    NgbTimepickerModule,
    AngularDraggableModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter,},
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider,AppService,
    	],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
