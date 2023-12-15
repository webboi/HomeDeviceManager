import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../Model/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetailService {
  private apiUrl = 'https://localhost:7122/api/DeviceDetails';

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }

  addDevice(device: Device) {
    return this.http.post(this.apiUrl, device);
  }

  editDevice(device: Device){
    return this.http.put(`${this.apiUrl}/${device.deviceId}` , device);
  }
}
