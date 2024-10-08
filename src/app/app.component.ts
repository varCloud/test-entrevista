import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'test-apex';
}
