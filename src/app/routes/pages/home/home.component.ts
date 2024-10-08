import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, take, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule,FormsModule,  LoadingComponent,],
  standalone:true
})
export class HomeComponent  {
  
  public searchText = '';
  private searchTerm$: Subject<string> = new Subject<string>();
  private destroy$: Subject<boolean> = new Subject<boolean>();
   constructor(
    private _router:Router
   ){

   }

   public onComenzar() : void {
    this._router.navigate(['/routes/computadoras'])
   }

}
