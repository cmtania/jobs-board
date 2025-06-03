import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpinnerState } from "./modules/state-management/states/spinner.state";
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { NgxsModule } from "@ngxs/store";


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
    ReactiveFormsModule,
    NgxsModule.forRoot([SpinnerState], { developmentMode: /** !environment.production */ false })

  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }