import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastr:ToastrService) {
    // Inicializar el formulario reactivo
    this.contactForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;

    // Si el formulario es inválido, detener el envío
    if (this.contactForm.invalid) {
      return;
    }

    // Aquí puedes realizar la lógica del envío de datos
    this._toastr.success('Formulario enviado exitosamente.');
    console.log(this.contactForm.value);
    this.submitted = false;
    this.contactForm.reset()
    this.contactForm.markAsPending()
    this.contactForm.updateValueAndValidity()
  }

  get formControls() {
    return this.contactForm.controls;
  }
}