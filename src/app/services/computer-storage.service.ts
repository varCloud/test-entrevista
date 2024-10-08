import { Injectable } from '@angular/core';
import { ComputerModel } from '../shared/models/computer.model';
import { Observable, of } from 'rxjs';
import { Computer } from '../shared/models/computer';

@Injectable({
  providedIn: 'root'
})
export class ComputerStorageService {

  private storageKey = 'computers';

  constructor() { }

  saveComputer(computer: ComputerModel): Observable<any> {
    const computers = this.getStoredComputers();
    computers.push(computer);
    localStorage.setItem(this.storageKey, JSON.stringify(computers));
    return of({ success: true, message: 'Computer saved successfully!' });
  }

  getComputers(): Observable<Computer[]> {
    const computers = this.getStoredComputers();
    return of(computers);
  }

  getComputersById(id:string): Computer {
    const computer = this.getStoredComputers().find((c) => c.id == id);
    return computer!
  }

  updateComputer(id: string, updatedComputer: ComputerModel): Observable<any> {
    const computersIndex = this.getStoredComputers().findIndex((c) => c.id == id);
    if (computersIndex != -1) {
      const computers = this.getStoredComputers()
      computers[computersIndex] = updatedComputer;
      localStorage.setItem(this.storageKey, JSON.stringify(computers));
      return of({ success: true, message: 'Computer updated successfully!' });
    }
    return of({ success: false, message: 'Computer not found!' });
  }

  deleteComputer(id: string): Observable<any> {
    const computers = this.getStoredComputers().filter((c) => c.id  !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(computers));
    return of({ success: true, message: 'Computer deleted successfully!' });
  }

  private getStoredComputers(): Computer[] {
    const storedComputers = localStorage.getItem(this.storageKey);
    return storedComputers ? JSON.parse(storedComputers) : [];
  }
}