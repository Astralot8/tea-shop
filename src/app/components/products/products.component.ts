import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ProductType } from '../../types/product.type';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-products',
  imports: [NgFor, SlicePipe, CurrencyPipe, RouterLink, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  loading: boolean = false;
  productsArray: ProductType[] = [];

  public productsTitle: string;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {
    this.productsTitle = '';
  }

  ngOnInit(): void {
    this.loading = true;

    this.productsTitle = 'Наши чайные коллекции';
    this.productsService
      .getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.productsArray = data;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        },
      });
    this.searchService.searchSubject.subscribe((search: string) => {
      if (search === '') {
        this.loading = true;
        this.productsTitle = 'Наши чайные коллекции';
        this.productsService
          .getProducts()
          .pipe(
            tap(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (data) => {
              this.productsArray = data;
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            },
          });
        
      } else if (search !== '') {
        this.loading = true;
        let tempArray = this.productsArray.find(item => {return item.title.toLowerCase().includes(search.toLowerCase())});
        if(tempArray?.title.toLowerCase().includes(search.toLowerCase())){
          this.productsTitle = 'Результаты поиска по запросу: ' + search;
        } else {
          this.productsTitle =
              'По запросу: ' + search + '. Ничего не найдено!';
        }
        
        this.productsService
          .getProductsWithSearch(search)
          .pipe(
            tap(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (data) => {
              this.productsArray = data;
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']);
            },
          });

       
      }
    });
  }
}
