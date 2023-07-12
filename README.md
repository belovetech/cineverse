# Distributed Movie Ticketing System

The Distributed Movie Ticketing System is a distributed application that allows users to browse and book movie tickets. It is divided into several microservices to handle specific functionalities.

![DESIGN](movie-ticketing-system-design.jpeg)

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

### ERD

![ERD](movie-ticketing-system-ERD.jpg)

### Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.

### Contact

For any inquiries or questions, please contact the project team at [email](belovetech@gmail.com)
