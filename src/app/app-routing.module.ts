import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneBookComponent } from './phone-book/phone-book.component';

const routes: Routes = [
  {
    path : "viewContacts",
    component : PhoneBookComponent
  },
  {
    path : "addContact",
    component : PhoneBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
