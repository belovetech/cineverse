# Distributed Movie Ticketing System

The Distributed Movie Ticketing System is a distributed application that allows users to browse and book movie tickets. It is divided into several microservices to handle specific functionalities.

![DESIGN](/images/movie-ticketing-system-design.jpeg)

#### The system consists of the following services:

1. **Authentication Service**: Responsible for user authentication, signup, signin, password management, and user session management.

2. **Movie Service**: Handles movie-related functionalities, including movie listing, movie details retrieval, and movie search.

3. **Ticket Service**: Manages ticket booking and reservation, seat selection, and ticket cancellation.

4. **Notification Service**: Provides notification capabilities, such as sending booking confirmations and updates to users via email or SMS.

### Features

- **Authentication Service:**

  - **User Signup:** Customers can create new accounts by providing their personal details.
  - **User Signin:** Registered customers can sign in to access their accounts.
  - **Password Management:** Customers can reset and update their passwords securely.
  - **User Session Management:** Maintains user sessions and ensures secure access to protected resources.

- **Movie Service:**

  - **Movie Listing:** Displays a list of available movies, including details such as title, genre, duration, and rating.
  - **Movie Details:** Provides detailed information about a specific movie, including cast, synopsis, and showtimes.
  - **Movie Search:** Allows users to search for movies based on various criteria, such as title, genre, or release year.

- **Ticket Service:**

  - **Ticket Booking:** Enables users to book movie tickets, select seats, and make payments.
  - **Ticket Cancellation:** Allows users to cancel their booked tickets and initiate refunds if applicable.
  - **Seat Availability:** Provides real-time information about seat availability for a particular movie and showtime.

- **Notification Service:**

  - **Booking Confirmation:** Sends booking confirmations to users via email or SMS.
  - **Update Notifications:** Sends updates, such as changes in showtime or seat availability, to users.

### Getting Started

To get started with the Distributed Movie Ticketing System, follow the instructions provided in the respective README files for each service:

- Authentication Service: [Readme](https://github.com/belovetech/movie-ticketing-system/tree/main/auth_service)
- Movie Service: [Readme](https://github.com/belovetech/movie-ticketing-system/tree/main/movie_service)
- Ticket Service: [Readme](https://github.com/belovetech/movie-ticketing-system/tree/main/ticket_service)
- Notification Service: [Readme](https://github.com/belovetech/movie-ticketing-system/tree/main/notification_service)
  Each service has its own set of dependencies and instructions for installation and configuration.

### Technologies Used

- Typescript
- Node.js
- Express.js
- MongoDB (Mongoose)
- PostgreSQL (Sequelizer)
- RabbitMQ (Message Queue)
- JSON Web Tokens (JWT)
- bcrypt.js
- SMTP and SMS providers (for the Notification Service)

## Installation

1. clone the repo
2. run `pnpm install`
3. Use nx to run other operations

### Running task with Nx

Nx is used for smooth running of operations across the entire monorepo. These commands should be run from the root of the cineverse.

```bash
npx nx <target> <project/service>

# build shared library
npx nx build @cineverse/libs

# start movie service
npx nx dev movie-service

# run in parallel across all services
npx nx run-many --target=build --all

# run specific service
npx nx run-many --target=build --projects=auth-service,movie-service

# project graph visualization
npx nx graph
```

### ERD

![ERD](/images/movie-ticketing-system-ERD.jpg)

### Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.

### Contact

For any inquiries or questions, please contact the project team at [email](belovetech@gmail.com)
