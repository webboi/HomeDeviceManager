import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DeviceDetailService } from './Services/DeviceDetailsService';
import { Device } from './Model/device';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Home_device_manager';

  devices: Device[]=[];

  deviceName: string | undefined;
  deviceType: string | undefined;
  deviceExpDate: string | undefined;

  message :string| undefined;

  constructor(private deviceService: DeviceDetailService ) { }

  ngOnInit(): void {
  this.getDevices();
  }
  
  createDevice(){
    if(this.deviceName && this.deviceExpDate && this.deviceType){
      const params: Device = {
        deviceId: 0,
        deviceName: this.deviceName,
        type: this.deviceType,
        expirationDate: this.deviceExpDate,
        isOn: false
      }
      this.deviceService.addDevice(params).subscribe(() => {
        this.getDevices();
        this.message = 'Device created successfully';
        this.deviceExpDate = '';
        this.deviceName = '';
        this.deviceType = '';
      })
    }else{
      this.message = 'All fields are required';
    }
   
  }

  getDevices(){
    this.deviceService.getDevices().subscribe(devices => {
      this.devices = devices;
    });
  }


  toggleDevice(device: Device){
    const params:Device = {...device, isOn:!device.isOn};
    this.deviceService.editDevice(params).subscribe(()=>{
      this.getDevices();
    })
  }

}

