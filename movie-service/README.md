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

   ```JSON
         {
      "metadata": {
         "total_items": 6,
         "item_per_page": 5,
         "total_page": 2,
         "previous_page": null,
         "current_page": 1,
         "next_page": 2
      },
      "data": [
         {
            "movieId": "acb5808e-030d-482d-8280-cb0ae60d7d37",
            "title": "Extraction 4",
            "genre": "Action",
            "description": "After a series of deaths in a small provincial town.",
            "duration": "120m",
            "photo": "default.jpg",
            "createdAt": "2023-08-01T10:23:39.992Z",
            "links": []
         },
         {
            "movieId": "968bd57c-b05a-4351-b9be-947fbe114797",
            "title": "Extraction 3",
            "genre": "Action",
            "description": "After a series of deaths in a small provincial town.",
            "duration": "120m",
            "photo": "default.jpg",
            "createdAt": "2023-08-01T10:23:30.727Z",
            "links": []
         },
         {
            "movieId": "fc896773-25b1-4a1d-9ef3-eed50408edff",
            "title": "Extraction 2",
            "genre": "Action",
            "description": "After a series of deaths in a small provincial town.",
            "duration": "120m",
            "photo": "default.jpg",
            "createdAt": "2023-08-01T10:23:23.633Z",
            "links": []
         },
         {
            "movieId": "ecc9f0df-4c94-46ff-870c-a49ec5717425",
            "title": "Extraction 1",
            "genre": "Action",
            "description": "After a series of deaths in a small provincial town.",
            "duration": "120m",
            "photo": "default.jpg",
            "createdAt": "2023-08-01T10:23:12.918Z",
            "links": []
         },
         {
            "movieId": "d9fdabe7-48be-4525-b193-74e9adc66ea9",
            "title": "The murderer",
            "genre": "comedy",
            "description": "comedy movies",
            "duration": "50m",
            "photo": "default.jpg",
            "createdAt": "2023-07-29T12:10:16.952Z",
            "links": []
         }
      ]
      }
   ```

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
