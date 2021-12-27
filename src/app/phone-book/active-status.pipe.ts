import { Pipe, PipeTransform } from '@angular/core';
import { PhoneBook } from './phone-book.class';

@Pipe({
  name: 'activeStatus'
})
export class ActiveStatusPipe implements PipeTransform {

  transform(contacts : PhoneBook[]): PhoneBook[] {
    if(contacts){
      return contacts.filter(ct => {
                             return ct.activeSw=='Y';
                            });
    }
    return contacts;
  }

}
