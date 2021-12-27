//for contacts view
export class PhoneBook{
  constructor(
    public contactId : number,
    public contactName : string,
    public contactEmail : string,
    public phoneNumber : number,
    public activeSw : string,
    public createdDate : string,
    public updatedDate : string
  ){}
}

export class PhoneBookContactInsert{
  constructor(
    public contactId : number,
    contactName : string,
    contactEmail : string,
    phoneNumber : number,
    public createdDate : string
  ){}
}
