import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ProductType } from '../../types/product.type';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-products',
  imports: [NgFor, SlicePipe, CurrencyPipe, RouterLink, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  productsArray: ProductType[] = [];

  public productsTitle: string;

  private _subj: Subscription | null = null;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private searchService: SearchService
  ) {
    this.productsTitle = '';
  }

  ngOnInit(): void {
    this._subj = this.searchService.searchValue$.subscribe((search: string) => {
      this.loading = true;
      this.productsService
        .getProducts(search)
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (data) => {
            this.productsArray = data;
            let tempArray = this.productsArray.find((item) => {
              return item.title.toLowerCase().includes(search.toLowerCase());
            });
            if (search === '') {
              this.productsTitle = 'Наши чайные коллекции';
            } else if (
              tempArray?.title.toLowerCase().includes(search.toLowerCase())
            ) {
              this.productsTitle = 'Результаты поиска по запросу: ' + search;
            } else {
              this.productsTitle =
                'По запросу: ' + search + '. Ничего не найдено!';
            }
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          },
        });
    });
  }

  ngOnDestroy(): void {
    this._subj?.unsubscribe();
  }
}
