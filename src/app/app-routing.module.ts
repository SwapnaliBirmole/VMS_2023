import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './pages/dashbaord/dashbaord.component';
import { MapviewComponent } from './pages/mapview/mapview.component';
import { VmsmanagementComponent } from './pages/vmsmanagement/vmsmanagement.component';
import { ZonemanagementComponent } from './pages/zonemanagement/zonemanagement.component';
import { AuthGuard } from './_helpers';
import { ListviewComponent } from './pages/listview/listview.component';
import { MediaClearanceComponent } from './pages/media-clearance/media-clearance.component';
import { MediaUploadComponent } from './pages/media-upload/media-upload.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { MediaAuditComponent } from './pages/media-audit/media-audit.component';
import { PublishOperationComponent } from './pages/publish-operation/publish-operation.component';
import { MediaStatusComponent } from './pages/media-status/media-status.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [

  { path: '', component: DashbaordComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  { path: 'dashboard', component:DashbaordComponent, data:{title :'Dashboard'}, canActivate: [AuthGuard] },
  { path: 'mapview', component:MapviewComponent,data:{title :'Map View'}, canActivate: [AuthGuard] },
  { path: 'vms-management', component:VmsmanagementComponent,data:{title :'VMS Management'},canActivate: [AuthGuard] },
  { path: 'zone-management', component:ZonemanagementComponent,data:{title :'Zone Management'},canActivate: [AuthGuard] },
  { path: 'listview', component: ListviewComponent},
  { path: 'media-clearance', component: MediaClearanceComponent},
  { path: 'media-upload', component: MediaUploadComponent},
  { path: 'playlist-creation', component: PlaylistComponent},
  { path: 'media-audit', component: MediaAuditComponent},
  { path: 'publish-operation', component: PublishOperationComponent},
  { path: 'media-status', component: MediaStatusComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
