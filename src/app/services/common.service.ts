import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private BaseUrl = "http://localhost:9091/api/";
  constructor(private http: HttpClient) { }


  saveSlot(data){
    return this.http.post<any>(this.BaseUrl + 'saveSlot', data);
  }

  searchSlot(data){
    return this.http.post<any>(this.BaseUrl + 'searchSlot', data);
  }

  bookAppointment(data){
    return this.http.post<any>(this.BaseUrl + 'bookAppointment', data);
  }

  getAllSlots(){
    return this.http.get<any>(this.BaseUrl + 'getAllAppointments');
  }
}
