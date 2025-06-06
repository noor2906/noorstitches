import { ContactForm } from './../../interfaces/contactForm.interface';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormUtils } from '../../utils/form.utils';
import { CommonModule } from '@angular/common';
import { ContactFormService } from '../../services/contactForm.service';
import { AlertsService } from '../../services/alert.service';

@Component({
  selector: 'app-contact-page',
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {
  fb = inject(FormBuilder);
  contactFormService = inject(ContactFormService);
  formUtils = FormUtils;
  alertService = inject(AlertsService);

  contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(FormUtils.nombrePattern)]],
      email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
      asunto: ['', [Validators.required, Validators.pattern(FormUtils.textoLargoPattern)]],
      motivo: ['', [Validators.required, Validators.pattern(FormUtils.textoLargoPattern)]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      aceptaPolitica: [false, Validators.requiredTrue]
  });

  enviarEmail() {
     if (this.contactForm.invalid) {
      // Marca los campos como tocados para mostrar los errores de validación
      this.contactForm.markAllAsTouched();
      console.log('Form is invalid:', this.contactForm.errors);
      return;
    }

    const { nombre, email, asunto, motivo, mensaje } = this.contactForm.value;

    const contactForm: ContactForm = {
      nombre: nombre!.trim(),
      email: email!.trim(),
      asunto: asunto!.trim(),
      motivo: motivo!.trim(),
      mensaje: mensaje!.trim(),
      aceptaPolitica: true
    };

    // Send the form data
    this.contactFormService.enviarContactForm(contactForm). subscribe({
      next: (response) => {
        console.log('Email sent successfully:', response);
        this.alertService.success('Noorstitches', '¡Email enviado correctamente!');
        // Reset the form after successful submission
        this.contactForm.reset();
      } ,
      error: (error) => { 
        console.error('Error sending email:', error);
        // Handle the error, e.g., show a notification to the user
      }
    })
  }
}
