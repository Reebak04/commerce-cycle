# commerce-cycle
## Marketplace Application

This is a full-stack marketplace application built with **React**, **Spring Boot**, and **MySQL**. The application allows businesses to manage their products, which users can view and purchase. It supports functionalities like product listing, adding new products, and user authentication.

## Features

- **User Authentication**: Implemented JWT-based authentication to allow secure login and product management.
- **Product Management**: Businesses can add, edit, and delete products in their marketplace.
- **Product Listings**: Users can browse products, view details, and search for products by category.
- **Pagination & Sorting**: Products are displayed with pagination and sorting options.
- **Image Upload**: Support for image upload in the product listing.

## Tech Stack

- **Frontend**:
  - React (JSX)
  - React Router
  - JWT Authentication

- **Backend**:
  - Spring Boot
  - Java (JPA, Spring Security)
  - MySQL Database

## Getting Started

### Prerequisites

To run this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) (for the frontend)
- [MySQL](https://www.mysql.com/) (for the database)
- [Java](https://openjdk.java.net/) (for the backend)
- [Maven](https://maven.apache.org/) (for building the Spring Boot application)

### Frontend Setup

#### 1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/marketplace-app.git
   cd marketplace-app
   ```
#### 2. Install the frontend dependencies:
```bash
   npm install
```
#### 3. Start the React development server:
```bash
   npm start
```
The app will be available at http://localhost:3000.

### Backend Setup

#### 1.Clone the backend repository (if it's in a separate repo) or navigate to the backend folder:
```bash
cd backend
```
#### 2.Set up your MySQL database:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/marketplace
spring.datasource.username=root
spring.datasource.password=yourpassword
```
#### 3.Build and run the Spring Boot application:
```bash
mvn spring-boot:run
```
The backend will be available at http://localhost:8080.
### JWT Authentication
Login: Users can log in using the provided credentials. A JWT token will be generated upon successful login.

Authorization: JWT tokens are sent in the Authorization header for secure API access.
### Database Schema
The database consists of the following tables:

products: Stores product details (name, description, quantity, price, etc.).

businesses: Stores business details that are associated with products.
### Contributing
Feel free to fork the repository and submit pull requests. All contributions are welcome!

### Issues
If you find any bugs or have suggestions, please open an issue on the GitHub repository.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

