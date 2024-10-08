import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ComputerStorageService } from 'src/app/services/computer-storage.service';
import { Computer } from 'src/app/shared/models/computer';
import { ComputerModel } from 'src/app/shared/models/computer.model';
import {MatTableModule} from '@angular/material/table';
import Swal from 'sweetalert2';
import { take } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-computadoras',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule,MatMenuModule,MatIcon,FormsModule,SweetAlert2Module,MatTableModule],
  templateUrl: './computadoras.component.html',
  styleUrl: './computadoras.component.scss'
})



export class ComputadorasComponent implements OnInit {
  computers: Computer[] = [];
  public readonly displayedColumns = [    
    'id',
    'name',
    'description',
    'hardDriveCapacity',
    'ram',
    'operatingSystem',
    'model',
    'menu'
  ]

  constructor(
    private _computerStorageService: ComputerStorageService,
    private _router:Router,
    private _toastr:ToastrService
  ) {
  }

  ngOnInit(): void {
    this._getComputers()
    
  }

  private _getComputers() : void {
    this._computerStorageService.getComputers().pipe(take(1)).subscribe((data: Computer[]) =>{
      this.computers = data
      console.log(this.computers)
    })
  }

  public onEditar(item:Computer) : void {
    this._router.navigateByUrl(`routes/edit/${item.id}`)
  }

  public onEliminar(item:Computer): void {
    console.log(item)
    Swal.fire(
      {
        title: `¿Está seguro de que desea eliminar la computadora ${item.name}`,
        icon: "question",
        showCancelButton:true,
        confirmButtonText:'Aceptar',
        cancelButtonText:'Cancelar'
      }
    ).then((result:any) =>{
      if(result.isConfirmed)
        this._computerStorageService.deleteComputer(item.id!)
        this._getComputers()
        this._toastr.success('Computadora eliminada exitosamente');
    })
  }
}