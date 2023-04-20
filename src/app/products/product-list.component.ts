import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  
  
  pageTitle: string = 'Product List'
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage = false;
  imageText = 'Show Image'
  filteredProducts: IProduct[] = [];
  products: IProduct[]=[];
  errorMessage = '';
  sub!: Subscription;
  constructor(private productService: ProductService){

  }
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    
    // this.listFilter = 'cart'
    // console.log("In OnInit");
  }



  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string){
    console.log("value Set ::" +value)
    this._listFilter=value;
    this.filteredProducts = this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase().includes(filterBy));
    
  }

  onRatingClicked(message: string): void {
      this.pageTitle ='Product LIst: ' +message
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}