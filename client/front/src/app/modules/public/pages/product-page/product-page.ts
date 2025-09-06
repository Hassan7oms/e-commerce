import { Component } from '@angular/core';
import { ProductInterface as IProduct, IProductVariant } from '../../../../shared/models/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/productService/product.service';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage {
    product: IProduct | null = null;
  isLoading = true;
  error: string | null = null;

  // State for variant selection
  uniqueColors: string[] = [];
  availableSizes: string[] = [];
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  selectedVariant: IProductVariant | null = null;

  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    // private cartService: CartService,
    // private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadProduct(slug);
      } else {
        // Handle case where slug is missing, maybe redirect
        this.error = "Product not found.";
        this.isLoading = false;
      }
    });
  }

  loadProduct(slug: string): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getProductBySlug(slug).subscribe({
      next: (data) => {
        this.product = data;
        this.initializeVariants();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Failed to load product details. Please try again.";
        this.isLoading = false;
      }
    });
  }

  initializeVariants(): void {
    if (!this.product || this.product.variant.length === 0) return;

    // Get a unique list of colors
    this.uniqueColors = [...new Set(this.product.variant.map(v => v.color).filter(Boolean) as string[])];
    
    // Auto-select the first color if it exists
    if (this.uniqueColors.length > 0) {
      this.selectColor(this.uniqueColors[0]);
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;

    // Find all available sizes for the selected color
    this.availableSizes = this.product!.variant
      .filter(v => v.color === color && v.size)
      .map(v => v.size as string);

    // Auto-select the first available size
    if (this.availableSizes.length > 0) {
      this.selectSize(this.availableSizes[0]);
    } else {
      // If no sizes for this color, clear size selection
      this.selectedSize = null;
      this.selectedVariant = null;
    }
  }

  selectSize(size: string): void {
    this.selectedSize = size;
    // Find the exact variant that matches the selected color AND size
    this.selectedVariant = this.product!.variant.find(
      v => v.color === this.selectedColor && v.size === this.selectedSize
    ) || null;
    // Reset quantity when selection changes
    this.quantity = 1;
  }

  isSizeOutOfStock(size: string): boolean {
    const variant = this.product?.variant.find(v => v.color === this.selectedColor && v.size === size);
    return variant ? variant.QTyavailable <= 0 : true;
  }

  incrementQuantity(): void {
    const maxQty = this.selectedVariant?.QTyavailable || 1;
    if (this.quantity < maxQty) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.selectedVariant || this.quantity <= 0) {
        alert("Please select a valid product option.");
        return;
    }
    console.log(`Adding to cart: ${this.product?.title}, Variant: ${this.selectedVariant._id}, Quantity: ${this.quantity}`);
    // this.cartService.addItem(this.product!._id, this.quantity, this.selectedVariant._id).subscribe(...)
  }
}
