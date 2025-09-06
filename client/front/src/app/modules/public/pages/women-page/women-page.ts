import { Component } from '@angular/core';
import { ProductInterface } from '../../../../shared/models/product.interface';
import { ProductService } from '../../../../core/services/productService/product.service';
import { CommonModule } from '@angular/common';
import { ProductPage } from "../product-page/product-page";

@Component({
  selector: 'app-women-page',
  imports: [CommonModule, ProductPage],
  templateUrl: './women-page.html',
  styleUrl: './women-page.css'
})
export class WomenPage {
  products: ProductInterface[] = [];
  isLoading: boolean = true; // To show a loading spinner or message
  error: string | null = null; // To show an error message

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (data) => {
        // In a real app, you'd filter for women's products here or on the backend
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.error = 'Could not load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
