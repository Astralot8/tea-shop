import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product', component: ProductComponent},
    {path: 'order', component: OrderComponent},
];
