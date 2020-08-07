import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../product.service';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { Product } from '../product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  errorMessage = '';

  product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  pageTitle$ = this.product$
    .pipe(
      map((p: Product) => p ? `Product Detail for: ${p.productName}` : null)
    );

  productSuppliers$ = this.productService.selectedProductSuppliers$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(private productService: ProductService) { }

}
