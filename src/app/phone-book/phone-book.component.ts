import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneBook, PhoneBookContactInsert } from './phone-book.class';
import { PhoneBookService } from './phone-book.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css']
})
export class PhoneBookComponent implements OnInit {

  phoneBookInsert !: FormGroup;
  contacts !: PhoneBook[];
  homeURL="/viewContacts";

  constructor(
    private iform : FormBuilder,
    private service : PhoneBookService,
    private modalService : NgbModal,
    private router : Router
  ) { }

  // form binding
  ngOnInit(): void {
    this.phoneBookInsert = this.iform.group({
      'contactId' : new FormControl(''),  //for editContact we have to set contactId back
      'contactName' : new FormControl('',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(20)])),
      'contactEmail' : new FormControl('',Validators.email),
      'phoneNumber' : new FormControl('',Validators.required),
      'createdDate' : new FormControl('') //for editContact we have to set createdDate back
    });

    //to get all the contacts when the component is loaded >> ngOnInit
    this.retrieveAllContacts();
  }

  //retrieveAllContacts
  public retrieveAllContacts(){
    this.service.findAllContacts()
                .subscribe(c => {this.contacts=c;});
    // console.log(this.contacts);
  }

  //addContact
  modalTitle : string = "";
  public saveMsg : any;  //todo saveMsg
  public addContact(formVal : FormGroup){
    /*
    let contactName = formVal.get('contactName')?.value;
    let contactEmail = formVal.get('contactEmail')?.value;
    let phoneNumber = formVal.get('phoneNumber')?.value;
    let contact : PhoneBook = new PhoneBook(0,contactName,contactEmail,phoneNumber,'Y','','');
    */
    this.service.createContact(formVal.value).subscribe(data => {this.saveMsg=data;
        //to reload the viewContacts after adding the contact
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation='reload';
        this.router.navigate([currentUrl]);
      }
    );


    // alert(saveMsg);
  }

  // editContact
  contact !: PhoneBook;
  public editContact(id: number,content : TemplateRef<any>){
    this.service.findContactById(id).subscribe(data => {
                                                          // console.log(data);
                                                          this.contact = data;
                                                          this.contact.contactId=id;
                                                          this.phoneBookInsert.patchValue(this.contact);
                                                          // console.log(this.phoneBookInsert);
                                                          this.open(content);
                                                       });

  }

  //deleteContact
  delConfMsg : string = '';
  delConfRes = '';
  public deleteContact(id : number, deleteModal : TemplateRef<any>){
    // console.log(id);
    this.openDel(deleteModal, id);
    this.delConfMsg = "Are You Sure, you want to delete contact with contact ID : "+id;

  }

  //NgbModel code ----------------
  closeResult = '';
  open(content: any){
    this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'})
        .result
        .then( result => {this.closeResult= `Closed with ${result}`;
      }, (reason) => {this.closeResult = `Dismissed ${this.getDismissedReason(reason)}`;});
  }

  private getDismissedReason(reason :any):string{
    if(reason == ModalDismissReasons.ESC){
      return 'by Pressing ESC';
    }else if(reason == ModalDismissReasons.BACKDROP_CLICK){
      return 'by Clicking a BackDrop';
    }else{
      return `with ${reason}`;
    }
  }
//NgbModel code ----------------

// deleteModal --------------------------------
openDel(deleteModal: any, id : number){
  this.modalService.open(deleteModal,{ariaLabelledBy:'modal-basic-title'})
      .result
      .then( result => {
                          this.delConfRes = result;
                          if(result == 'Delete click'){
                            this.service.deleteContactById(id).subscribe(data => {
                            this.contacts = data;
                              let currentUrl = this.router.url;
                              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                              this.router.onSameUrlNavigation='reload';
                              this.router.navigate([currentUrl]);
                          });
                          }
                       },
             (reason) => {this.delConfRes = `Dismissed ${this.getDismissedReason(reason)}`;},
          );
}
// deleteModal --------------------------------

//--------last EOP----------
}


