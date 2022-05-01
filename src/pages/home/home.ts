import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GESTURE_PRIORITY_TOGGLE } from 'ionic-angular/umd/gestures/gesture-controller';
import {Geolocation} from '@ionic-native/geolocation';

declare var google:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private map: any;
  private lat: number;
  private lng: number;
  public hideMap: boolean;
  public items: string[] = [];

  @ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController,private geolocation:Geolocation) {
    this.hideMap = false;
  }
  
  public ngOnInit(){
    //get current location via latitude and longitude.
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.showMap();
   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }

  public loadDefaultRecommendations(){
    this.items = [];
    this.items.push("Tomato");
    this.items.push("Cucumber");
    this.items.push("Pepper");
    this.items.push("Onion");
    this.items.push("Spinach");
    this.items.push("Coriander");
  }

  public showMap(){
    //get location on google maps based on latitude and longitude
    const location = new google.maps.LatLng(this.lat, this.lng);

    //define options for google maps.
    const options = {
      center: location,
      zoom:8,
      streetViewControl: false,
      mapTypeControl: false
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, this.map);
  }

  public addMarker(position, map) {
    return new google.maps.Marker({position, map});
  }

  public recommendationClick(){
   this.hideMap = true;
   this.loadDefaultRecommendations();
   //for some reason map is not getting visible after hidden, so doing it this way.
   this.mapRef.nativeElement.style.display = "none";
  }

  public dismiss(){
    this.hideMap = false;
    //for some reason map is not getting visible after hidden, so doing it this way.
    this.mapRef.nativeElement.style.display = "block";
    
  }
}
