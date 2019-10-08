import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/contacts')
      .subscribe((data: Contact[]) => this.contacts = data);
  }
}
