import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private activeUserIdSubject = new BehaviorSubject<string>(null);
  public activeUserIdObservble = this.activeUserIdSubject.asObservable();

  constructor() { }

  changeActiveUserId(change:string)
  {
    console.log("changei",change)
    this.activeUserIdSubject.next(change) ;
  }

}
