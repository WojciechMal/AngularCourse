import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { ToastrService, Toastr } from './common/toastr.service';
//import { TOASTER_TOKEN, Toastr } from './common/toastr.service';
import { 
  JQ_TOKEN, 
  TOASTER_TOKEN, Toastr,
  CollapsibleWellComponent,
  SimpleModalComponent ,
  ModalTriggerDirective
} from './common/index';
//import { TOASTR_TOKEN as TOASTER_TOKEN2 } from './common/toastr2.service';
import { Error404Component } from './errors/404.component';

import{
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  CreateEventComponent,
  EventDetailsComponent,
  //EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  LocationValidator,
  UpvoteComponent,
  EventResolver,
  VoterService
} from './events/index'
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './router';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//declare let toastr: Toastr;
//let toastr: Toastr = window['toastr' as any];
const toastr = window['toastr' as any];
const jQuery = window['$' as any];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    Error404Component,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    LocationValidator,
    UpvoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    EventService, 
    {
      provide: TOASTER_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    //ToastrService, 
    //EventRouteActivator,
    EventResolver,
    EventListResolver,
    VoterService,
    AuthService,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState
    }  
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?')
  }
  return true
}