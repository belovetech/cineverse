# Cineverse Ticket Service

Welcome to the Cineverse Ticket Service! This service is responsible for handling movie ticket bookings, payments, and ticket generation for our cineverse movie system.

## Getting Started

To get started with the Ticket Service, follow these steps:

### Prerequisites

- Node.js installed on your system
- PostgresSQL database set up

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/belovetech/cineverse.git
   cd ticket-service
   ```

2. Install dependencies:

   ```shell
   npm install

   or

   pnpm install
   ```

3. Configure environment variables:
   Create a `.env` file in the project root and add the following:

   ```shell
    PORT=3000
    DEV_DB_NAME=['database name']
    DEV_DB_USERNAME=['database username']
    DEV_DB_PASSWORD=['database password']

    REDIS_HOST=localhost
    REDIS_PORT=6379

    AUTH_SERVICE_URL
    - start auth service:  npm run dev

    MOVIE_SERVICE_URL
    - start auth service:  npm run dev
   ```

4. Start the service:
   ```shell
   from the root of the workspace run
   npx nx run-many --target=dev --all
   ```

The Ticket, Auth and Movie Service should now be up and running on the specified port.

## API Endpoints

### 1. User Authentication

- **POST /api/auth**
  - Authenticate a user before booking a ticket.
  - Request Body: `{ "username": "user123", "password": "password123" }`
  - Response: User authentication token

### 2. Booking a Ticket

- **POST /api/bookings**
  - Create a new booking.
  - Request Body: `{ "userId": "user123", "movieId": "movie123", "showtimeId": "showtime456", "seatNumbers": ["A1", "A2"], "paymentMethod": "credit_card" }`
  - Response: Booking confirmation

### 3. Payment Processing

- **POST /api/payments**
  - Process a payment for a booking.
  - Request Body: `{ "bookingId": "booking123", "amount": 25.00, "paymentMethod": "credit_card" }`
  - Response: Payment confirmation

### 4. Ticket Generation

- **GET /api/tickets/:bookingId**
  - Retrieve tickets associated with a booking.
  - Response: List of tickets

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
