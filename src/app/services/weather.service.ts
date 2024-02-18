import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http:HttpClient) { }

  baseUrl="http://api.weatherapi.com/v1/current.json?key=f98e7052279b43bd83553507241702&q=Hyderabad&aqi=no";


  getWeather(){
    return this._http.get(`${this.baseUrl}`);
  }
}
