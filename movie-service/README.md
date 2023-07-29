# Movie service

The Movie Service is a fundamental part of the Movie Ticketing System, responsible for managing movie-related data, theaters, showtimes, and seat bookings. It facilitates users to access information about movies, theaters, showtimes, and book seats for movie screenings.

## Features

- Movie Information: Retrieve detailed information about movies available in the system.
- Theater Details: Access information about theaters where movies are screened.
- Showtime Schedule: Retrieve a list of available showtimes for different movies and theaters.
- Seat Booking: Allow customers to book seats for movie screenings.
- Seamless Integration: Designed to integrate seamlessly with other services of the Movie Ticketing System.

## Installation

1. Clone the repository: `git clone`[link](https://github.com/belovetech/cineverse/tree/main/movie_service)
2. Install dependencies: `yarn install`
3. Set up the environment variables: Create a `.env` file in the root directory and define the following variables:

```
PORT=3000
DEV_DB_NAME=['database name']
DEV_DB_USERNAME=['database username']
DEV_DB_PASSWORD=['database password']

REDIS_HOST=localhost
REDIS_PORT=6379
```

4. Start the server: `yarn run dev`
5. The application will be accessible at `http://localhost:3000`.

### Technologies Used

- TypeScript
- Node.js
- Express.js
- Sequelize
- PostgreSQL

### API Endpoints

1. **Movies**

   - `GET /movies`: Retrieve a list of all movies.
   - `GET /movies/:id`: Get detailed information about a specific movie.

2. **Theaters**

   - `GET /theaters`: Retrieve a list of all theaters.
   - `GET /theaters/:id`: Get detailed information about a specific theater.

3. **Showtimes**

   - `GET /showtimes`: Retrieve a list of all available showtimes for all movies and theaters.
   - `GET /showtimes/:id`: Get detailed information about a specific showtime.

4. **Seats**
   - `GET /seats/:showtimeId`: Retrieve a list of available seats for a specific showtime.
   - `POST /seats/book`: Book a seat for a showtime.

### Contact

For any inquiries or questions, please contact the project team at [belovetech@gmail.com](mailto:belovetech@gmail.com). We value your feedback and would be happy to hear from you!
