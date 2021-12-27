import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PhoneBook, PhoneBookContactInsert } from './phone-book.class';

@Injectable({
  providedIn: 'root'
})
export class PhoneBookService {

  constructor(
    private http:HttpClient
  ) { }

  // baseURL = "http://localhost:9090";
  baseURL = "https://limitless-fjord-71421.herokuapp.com";

  // findAllContacts
  public findAllContacts():Observable<PhoneBook[]>{
    return this.http.get<PhoneBook[]>(`${this.baseURL}/contacts`);
  }

  //createContact
  public createContact(contact : PhoneBook):Observable<any>{
    // const headers = {'Content-Type' : 'application/json', 'responseType' : 'text'};
    return this.http.post(`${this.baseURL}/save`,contact,{responseType : 'text'});
  }

  //findContactById
  public findContactById(id : number): Observable<PhoneBook>{
    return this.http.get<PhoneBook>(`${this.baseURL}/edit/${id}`);
  }

  //deleteContactById >> softdelete
  public deleteContactById(id : number): Observable<PhoneBook[]>{
    return this.http.delete<PhoneBook[]>(`${this.baseURL}/sdelete/${id}`);
  }
}
