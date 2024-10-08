import { Computer } from "./computer";


export class ComputerModel implements Computer {
    id:string = ''
    name: string ='';
    description: string = '';
    hardDriveCapacity: number = 0;
    ram: number = 0;
    operatingSystem: string = '';
    model: string = '';
  
    constructor(data :  any) {
      this.id = data.id ?? this.id
      this.name = data?.name ?? this.name;
      this.description = data?.description ?? this.description;
      this.hardDriveCapacity = data?.hardDriveCapacity ?? this.hardDriveCapacity;
      this.ram = data?.ram ?? this.ram;
      this.operatingSystem = data?.operatingSystem ?? this.operatingSystem;
      this.model = data?.model ?? this.model;
    }
  
    // Example method to display the computer details
    getFullDescription(): string {
      return `${this.name} (${this.model}), OS: ${this.operatingSystem}, RAM: ${this.ram}GB, Disk: ${this.hardDriveCapacity}GB`;
    }
  }
  