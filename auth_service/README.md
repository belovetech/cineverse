# Auth Service

The authentication service is a crucial component of the Movie Ticketing System, responsible for managing user authentication, password management, and customer statistics. It provides secure access to the system for customers and offers additional administrative functionalities.

## Features

- User Signup: Customers can create new accounts by providing their personal details.
- User Signin: Registered customers can sign in to access their accounts.
- Forgot Password: Customers can request a password reset link if they forget their password.
- Update Password: Customers can update their existing password for enhanced security.
- OTP Generation and Validation: One-time passwords are generated and validated for secure authentication.
- Customer Statistics: Administrators can retrieve statistics on the total number of registered customers.
- Administration Functionalities: Admin users have access to additional administrative tasks for system management.

## Installation

1. Clone the repository: git clone [link](https://github.com/belovetech/movie-ticketing-system/tree/main/auth_service)
2. Install dependencies: npm install
3. Set up the environment variables: Create a .env file based on the provided environment variable in the config directory and update the values accordingly.
4. Start the server: npm start
5. Click [here](http://localhost:8000/v1/docs) for interactive swagger UI

### Technologies Used

- Typescript
- Node.js
- Express.js
- MongoDB

### Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.

### Contact

For any inquiries or questions, please contact the project team at [email](belovetech@gmail.com)
