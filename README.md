# Backend Setup

## Features Implemented
- Implemented a REST API using Node.js
- Used Express framework to handle routing and middleware

### 1. GET '/users'
Returns a list of users stored in an online database (MongoDB Atlas recommended).

### 2. POST '/login'
Authenticates a user using a username and password.

### 3. Integration with PokeAPI
Used PokeAPI (https://pokeapi.co/docs/v2) to fetch information about Pokémon.

### 4. POST '/users/favorites'
Allows a user to add a Pokémon to their list of favorites.

### 5. GET '/users/favorites/{iduser}'
Returns the list of favorite Pokémon for a user.

### 6. Additional REST API Methods
Implemented additional REST API methods for '/users/favorites'.

## Running the Project

### Prerequisites
- Node.js installed
- MongoDB Atlas account for the database

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd <project-directory>
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Server

1. Start the server:
    ```sh
    npm run dev
    ```
2. The server will run on `http://localhost:3000`.
