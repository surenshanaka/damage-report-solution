## Installation

#### Backend

1. Clone the project
2. Go to the project root directory
3. Run `composer install`
4. Create database and run the `php artisan migrate` and `php artisan db:seed` commands
5. Copy `.env.example` into `.env` file and adjust parameters
6. Run `php artisan serve` to start the project at http://localhost:8000

#### Frontend

1. Navigate to `frontend` folder using terminal
2. Run `npm install` to install react project dependencies
3. Copy frontend/.env.example into frontend/.env and specify API URL
4. Start frontend by running `npm run dev`
5. Open http://localhost:5173

## Unit Testing
1. Navigate to the project root directory
2. Run `vendor/bin/phpunit`

## API Documentation
1. Go to the project root directory
2. Run `php artisan serve` to start the project
3. Open the api documentation http://127.0.0.1:8000/api/documentation 

