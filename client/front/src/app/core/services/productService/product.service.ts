import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../envirmonets/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient){}
  private url = environment.apiURL +'/product'

  addproduct()



  
}
