import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ComputerStorageService } from 'src/app/services/computer-storage.service';
import { Computer } from 'src/app/shared/models/computer';
import { ComputerModel } from 'src/app/shared/models/computer.model';
import Swal from 'sweetalert2';
import ObjectID  from 'bson-objectid'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SweetAlert2Module ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  public form: FormGroup | null = null;
  computers: Computer[] = [];
  id: string | null = null;
  private readonly PATTERN_ONLY_LETTERS = '^[a-zA-Z ]+$'
  private readonly PATTERN_ONLY_ALPHA = '^[a-zA-Z0-9 ]+$'
  private readonly PATTERN_ONLY_NUMBERS = '^[0-9 ]+$'


  constructor(
    private _formBuilder: FormBuilder,
    private _computerStorageService: ComputerStorageService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _toastr:ToastrService

  ) {

    let params: any = this._activatedRoute.snapshot.params;
    this.id = params.id ?? null
    if(this.id){
      this._getComputer()
    }else{
      this._initForm(new ComputerModel({}))
    }
  }


  private _initForm(computer:Computer){

    this.form = this._formBuilder.group({
      name: [computer.name, [Validators.required, Validators.pattern(this.PATTERN_ONLY_LETTERS)]],
      description: [computer.description, [Validators.required, Validators.minLength(15), Validators.maxLength(255), Validators.pattern(this.PATTERN_ONLY_ALPHA)]],
      hardDriveCapacity: [computer.hardDriveCapacity, [Validators.required, Validators.pattern(this.PATTERN_ONLY_NUMBERS)]],
      ram: [computer.ram, [Validators.required, Validators.pattern(this.PATTERN_ONLY_NUMBERS)]],
      operatingSystem: [computer.operatingSystem, [Validators.required, Validators.pattern(this.PATTERN_ONLY_LETTERS)]],
      model: [computer.model, [Validators.required, Validators.pattern(this.PATTERN_ONLY_ALPHA)]]
    });
  }

  private _getComputer(){
    const computer = this._computerStorageService.getComputersById(this.id!)
    if(computer){
      this._initForm(computer)
      return
    }

    Swal.fire({
      title:'Computadora no encontrada',
      icon:'error'
    }).then((result) =>{
      this._router.navigate(['/routes/computadoras'])
    })
  }

  public onSubmit() {

    if (this.form?.valid) {
      const computerData: ComputerModel = new ComputerModel({id:ObjectID().toHexString(), ...this.form.value});  // Crear un modelo de computadora con los datos del formulario
      if (this.id !== null) {
        this._computerStorageService.updateComputer(this.id, computerData).subscribe(response => {
          console.log(response.message);
          //this._notifierService.show({type:'success', message:'Computadora actualizada exitosamente'})
          this._toastr.success('Computadora actualizada exitosamente');
          this._router.navigate(['/routes/computadoras'])
        });
      } else {
        // Guardar nueva computadora
        this._computerStorageService.saveComputer(computerData).subscribe(response => {
          console.log(response.message);
          this._toastr.success('Computadora guardada exitosamente');
          this._router.navigate(['/routes/computadoras'])
          //this._notifierService.show({type:'success', message:'Computadora guardada exitosamente'})
        });
      }
    }
  }  

  public onReset() {
    this.form?.reset()
  }

  public onCancelar(): void {
    Swal.fire(
      {
        title: '¿Está seguro de que desea cancelar los cambios realizados?',
        text: "los cambios no seran guardados",
        icon: "question",
        showCancelButton:true,
        confirmButtonText:'Aceptar',
        cancelButtonText:'Cancelar'
      }
    ).then((result:any) =>{
      if(result.isConfirmed){
        this._router.navigate(['/routes'])
      }
       
    })
  }
}