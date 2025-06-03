import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", pathMatch: "full",  redirectTo: ""},
    { 
        path: "", 
        loadChildren: () => 
          import("./modules/layout/layout.module").then(m => m.LayoutModule)
      }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
