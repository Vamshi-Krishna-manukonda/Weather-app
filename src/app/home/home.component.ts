import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Weather: any = [];
  siteLanguage = 'English';
  weatherUpadte: any = [];
  stringData : string = 'Weather simply refers to the condition of air on the earth at a given place and time'
  // It is a continuous, data-intensive, multidimensional, dynamic and chaotic process.
  // These properties make weather forecasting is a formidable challenge.
  // Forecasting is the process of estimation in unknown situations from the historical data.
  // Weather forecasts are often made by collecting quantitative data about the current state of the atmosphere and
  // using scientific understanding of atmospheric processes to project how the atmosphere will evolve in future.
  // Weather forecasting entails predicting how the present state of the atmosphere will change. Present weather
  // conditions are obtained by ground observations, observations from ships, observation from aircraft, radio
  // sounds, doppler radar and satellites. This information is sent to meteorological centers where the data are
  // collected, analyzed and
  // made into a variety of charts, maps and graphs. Modern high-speed computers transfer the many thousands of
  // observations onto surface and upper-air maps.
  // Accurate weather forecast models are important to third world countries, where the entire agriculture depends
  // upon weather [CZ97]. It is thus a major concern to identify any trends for weather parameters to deviate from
  // its periodicity, which would disrupt the economy of the country. This fear has been aggravated due to threat by
  // the global warming and green house effect. The impact of extreme weather phenomena on society is growing more
  // and more costly, causing infrastructure damage, injury and the loss of life.'
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
  ];
  dataSource!: MatTableDataSource<any>
  displayedColumns:string[]=['name','region','country','lat','lon','tz_id','localtime'];
  constructor(private weathr: WeatherService,private route:Router,public translate:TranslateService) { 
    translate.addLangs(['en','de','es','fr']);
    translate.setDefaultLang('en');
  }
  switchLang(lang:string){
this.translate.use(lang);
  }

  // changeSiteLanguage(localeCode: string): void {
  //   const selectedLanguage = this.languageList
  //     .find((language) => language.code === localeCode)
  //     ?.label.toString();
  //   if (selectedLanguage) {
  //     this.siteLanguage = selectedLanguage;
  //     this.translate.use(localeCode);
  //   }
  //   const currentLanguage = this.translate.currentLang;
  //   console.log('currentLanguage', currentLanguage);
  // }
  // refresh(){
  //   this.ngOnChanges();
  // }
  ngOnChanges(): void{
    this.weathr.getWeather().pipe().subscribe((res: any) => {
      console.log(res);
      this.Weather.push(res);
      console.log(this.Weather);

      this.Weather.map((elemet: any) => {
        this.weatherUpadte.push(elemet.location);
        console.log(this.weatherUpadte);
      });
    })
  }

  ngOnInit(): void {
    this.ngOnChanges()
  }
  logout(){
    debugger
    localStorage.removeItem("UserLogin");
    this.route.navigate(["/login"]);
  }

}
