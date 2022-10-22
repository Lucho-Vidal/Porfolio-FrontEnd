import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-logo-ap',
  templateUrl: './logo-ap.component.html',
  styleUrls: ['./logo-ap.component.css']
})
export class LogoApComponent implements OnInit {
  nombreUsuario = '';
  isLogged = false;
  constructor(private router:Router,private tokenService:TokenService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.nombreUsuario = this.tokenService.getUserName();
  }
  onlogOut(){
    this.tokenService.logOut();
  }

  login(){
    this.router.navigate(['/login'])
  }

}
