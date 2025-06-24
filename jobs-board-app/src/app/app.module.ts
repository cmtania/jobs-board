import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpinnerState } from "./modules/state-management/states/spinner.state";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { NgxsModule } from "@ngxs/store";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxsModule.forRoot([SpinnerState], {
      developmentMode: !environment.production
    })
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }