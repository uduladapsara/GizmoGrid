# GizmoGrid UI Notes

This document captures the UI wireframes, layout grid, and page structure to align frontend implementation and design reviews.

## Desktop Layout Grid
- Frame: 1440px
- Grid: 12 columns
- Margin: 80px
- Gutter: 20px

## Wireframes

### Home Page
```
----------------------------------------------------
| LOGO | Search Bar ............. | Cart | Profile |
----------------------------------------------------

| HERO BANNER (Large Image Placeholder)            |
| ------------------------------------------------ |
| "Best Deals on Electronics & Fashion"           |
| [ Shop Now Button ]                              |
----------------------------------------------------

| CATEGORY SECTION                                 |
| [Electronics] [Fashion] [Beauty] [Home]         |
----------------------------------------------------

| FEATURED PRODUCTS GRID                           |
| [Card] [Card] [Card] [Card]                     |
| Image  Image  Image  Image                      |
| Name   Name   Name   Name                       |
| Price  Price  Price  Price                      |
| [Add]  [Add]  [Add]  [Add]                      |
----------------------------------------------------

| FLASH SALE SECTION                               |
| [Big Product Banner]                            |
----------------------------------------------------

| FOOTER                                           |
| Links | Contact | Social Media                  |
----------------------------------------------------
```

### Product Listing Page
```
----------------------------------------------------
| LOGO | Search Bar | Cart | Profile              |
----------------------------------------------------

| FILTER SIDEBAR | PRODUCT GRID                    |
| --------------  | ------------------------------ |
| Category        | [Card] [Card] [Card]          |
| Price Range     | [Card] [Card] [Card]          |
| Rating          | [Card] [Card] [Card]          |
| Brand           | [Card] [Card] [Card]          |
|                 |                                |
----------------------------------------------------
```

### Product Details Page
```
----------------------------------------------------
| LOGO | Search Bar | Cart | Profile              |
----------------------------------------------------

| IMAGE GALLERY       | PRODUCT INFO              |
| [Main Image]        | Product Name              |
| [Thumb][Thumb]      | Price                     |
| [Thumb][Thumb]      | Rating ⭐⭐⭐⭐             |
|                     | Description               |
|                     | Stock: Available          |
|                     | [ ADD TO CART ]          |
|                     | [ BUY NOW ]              |
----------------------------------------------------

| REVIEWS SECTION                                 |
| User 1: ⭐⭐⭐⭐                                  |
| Comment text...                                 |
----------------------------------------------------
```

### Cart Page
```
----------------------------------------------------
| LOGO | Cart                                     |
----------------------------------------------------

| PRODUCT LIST                                     |
| ------------------------------------------------ |
| [IMG] Product Name   Qty [- 2 +]   Price        |
| [IMG] Product Name   Qty [- 1 +]   Price        |
| ------------------------------------------------ |
|                                                  |
| TOTAL: $XXX                                     |
| [ PROCEED TO CHECKOUT ]                         |
----------------------------------------------------
```

### Checkout Page
```
----------------------------------------------------
| Checkout                                        |
----------------------------------------------------

| SHIPPING ADDRESS                                |
| Name                                            |
| Address                                         |
| Phone                                           |
----------------------------------------------------

| PAYMENT METHOD                                  |
| ( ) Card                                        |
| ( ) PayPal                                      |
| ( ) Cash on Delivery                            |
----------------------------------------------------

| ORDER SUMMARY                                   |
| Product list                                   |
| Total Price                                    |
----------------------------------------------------

| [ PLACE ORDER ]                                 |
----------------------------------------------------
```

### User Dashboard
```
----------------------------------------------------
| SIDEBAR         | MAIN CONTENT                  |
|-----------------|------------------------------|
| Profile         | Welcome User                 |
| Orders          | Recent Orders Table          |
| Wishlist        |                              |
| Cart            |                              |
| Settings        |                              |
----------------------------------------------------
```

### Seller Dashboard
```
----------------------------------------------------
| SIDEBAR         | MAIN CONTENT                  |
|-----------------|------------------------------|
| Dashboard       | Sales Cards                  |
| Add Product     | Products Table               |
| Manage Products | Orders List                  |
| Orders          | Revenue Chart                |
----------------------------------------------------

| ADD PRODUCT FORM                                 |
| Name                                            |
| Price                                           |
| Image Upload                                    |
| Category                                        |
| Stock                                           |
| [ SUBMIT ]                                      |
----------------------------------------------------
```

### Admin Dashboard
```
----------------------------------------------------
| SIDEBAR         | MAIN CONTENT                  |
|-----------------|------------------------------|
| Dashboard       | Stats Cards                  |
| Users           | Users Table                  |
| Sellers         | Sellers Table                |
| Products        | Products Approval Table      |
| Reports         | Charts (Sales / Users)       |
----------------------------------------------------
```

### Auth Pages
```
----------------------------------------------------
| LOGIN FORM                                      |
----------------------------------------------------
| Email:    [____________]                        |
| Password: [____________]                        |
----------------------------------------------------
| [ LOGIN BUTTON ]                                |
| Forgot Password                                 |
----------------------------------------------------

----------------------------------------------------
| REGISTER FORM                                   |
----------------------------------------------------
| Name                                           |
| Email                                          |
| Password                                       |
| Role (User / Seller)                           |
----------------------------------------------------
| [ REGISTER ]                                   |
----------------------------------------------------
```

## Design System Notes
- Shapes: Use rectangles for cards, navbar, and panels.
- Typography: Clear hierarchy for headings and body text.
- Components: Button, input field, product card, sidebar item.
