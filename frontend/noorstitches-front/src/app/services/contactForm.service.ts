import { inject, Injectable } from '@angular/core';
import { ContactForm } from '../interfaces/contactForm.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ContactFormService {

    apiUrl: string = `${environment.apiUrl}/api/contacto`;
    http = inject(HttpClient);
    router = inject(Router);

  
 enviarContactForm(contactForm: ContactForm): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/enviar`, contactForm);
}

}