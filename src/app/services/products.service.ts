import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from '../types/product.type';
import { OrderType } from '../types/order.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  [x: string]: any;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  getProductsWithSearch(param: string){
    return this.http.get<ProductType[]>(`https://testologia.ru/tea?search=${param}`);
  }

  createOrder(data: OrderType){
    return this.http.post<{success: number, message?: string}>(`https://testologia.ru/order-tea`, data);
  }
}
