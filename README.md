# Full stack Assignment

Interpret the requirements as if you would receive it from a product manager. So ask when something needs to be cleared up.

If you have any questions, feel free to e-mail Mujib (mujib@fixico.nl).

## Functional requirements

One of our partners would like to integrate with us using an API, so they can create a Damage Report for their customers automatically. The partner can provide the description, the coordinates (latitude, longitude), name, email (person), and multiple photos.

A Damage Report is a report which a customer can make to inform Fixico that there is a damage.

### Reviewing a Damage Report

The product manager mentioned that we need a dashboard so that Fixico employees can review the incoming Damage Reports.

#### Approval

When a Damage Report has been approved, it needs to be automatically allocated to all Repair Shops in the area (25 KM).

The customer must receive an email stating that their Damage Report has been approved to the Repair Shops. The customer wants to see an overview of all Repair Shops it has been assigned too.

#### Rejection

When a Damage Report needs to be rejected, a reason must be provided.

The customer must receive an email stating that their Damage Report has been rejected, the reason must also be provided in the template.

### Structural

The dashboard should have multiple overviews, where there will be Damage Reports in each state (approved and rejected).

Show the relevant information for each state, the list of Repair Shops assigned to a Damage Report for when a Damage Report is approved, and the rejection reason for when a Damage Report is rejected.

### Data

We know that there are Damage Reports and Repair Shops. Figure out the relationship between them when allocating Damage Reports to Repair Shops in the area.

The Repair Shops have a name, email and a set of coordinates. Create a set of test data which you add when seeding the database. Make sure you have enough Repair Shops with different coordinates with different distances from the Damage Report location.

## Non-functional requirements

-   Use Laravel, PHP, and Javascript/Typescript to complete the assignment.
-   Use Tailwind CSS for the style of the dashboard
-   Use Vue or React for the frontend. (optional: InertiaJS)
-   Use queuing where appropriate
-   Apply design patterns and engineering principles. However, do not over-engineer.
-   Do no re-invent the wheel. Use packages where it makes sense.
-   Don't add authentication. We do not need to see that you can install Breeze / Jetstream or any other starter pack. Focus on the functional requirements.

## Bonus

-   Apply code style, syntax or other static analysis tools.

### Bonus points

-   Atomic Designed Components
-   Typescript
-   Enforce PSR-2 coding styles
    -   Create a composer command to be able to repeatedly execute the check and fix.

## Git

Clone the repository to a directory on your PC and start working from there.

Ensure that you keep working in this repository. Do **not** create a repository of your own.

When you start working, create a new branch and give it a sensible name.

Use clear commit messages and don't worry about having many commits where you change things around often. It's important for us to see your progress next to the final solution.

Feel free to provide any other relevant information.

### Handing in the assignment

Create a pull request when you are finished, so we can review your code.

Add information about your decisions you made in the PR. Show us that you have thought about the decisions you made (for example, why did you pick a certain package — what was your review process?)

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

