import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ProductType } from '../../types/product.type';
import { ProductsService } from '../../services/products.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink, NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  product: ProductType;
  loading: boolean = false;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }

  }
  
  ngOnInit(): void {
    this.loading = true
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['id']) {
        this.productsService.getProduct(+params['id']).pipe(tap(()=> {
          this.loading = false
        })).subscribe({
          next: (data)=>{
            this.product = data
          },
          error: (error)=> {
            this.router.navigate(['/'])
          }
        });
      }
    });
  }
}
