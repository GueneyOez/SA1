# Project Jodel

## Project Objectives
- Develop a simple web-based Jodel application
- Share thoughts, hints, and observations via posts
- Connect with people nearby
- Comment and vote on comments

## Features
- User Authentication
  - Login using Google, Facebook, Keycloak, or a local username and password.
- Post Viewing
  - Read all posts within a 10 km radius of your current location that have been posted or commented on recently.
- Content Sorting
  - Display the newest posts or comments first.
- Interaction
  - Comment and vote on comments (one vote up or down per person per comment).

## Technologies Used
- Database: PostgreSQL
- Backend: Java 17 and Spring Boot
- Frontend: ReactJS
- Containerization and Authentication: Docker and Keycloak

## Rationale Behind Using These Technologies
1. PostgreSQL: Widely used open-source database known for robustness and reliability.
2. Java: Offers a comprehensive library set and state-of-the-art software architecture capabilities.
3. Spring Boot: Integrates the best libraries into a single framework, supports native code compilation for efficient memory usage, and ensures fast startup times, which are crucial for microservices architecture.
4. ReactJS: Modern JavaScript framework by Facebook, preferred over alternatives like Google's Angular due to its state-based architecture and performance benefits.

## Deployability Considerations
1. Ensure the application can run on a server, not just `localhost:8080`.
2. Avoid using absolute URLs in your code, such as `https://localhost:8080/xxx/yyy`; use relative URLs instead, like `/xxx/yyy`.
3. Make the base URL configurable via command line parameters or environment variables.
4. Make the database user and password configurable via command line parameters or environment variables.

## Outline of the Development Process
1. Create a UML class diagram for the database entities.
2. Write the entity classes (the model) in Java.
3. Use Spring Boot to create the database schema and populate it with test data.
4. Develop the ORM classes to access the database entities.
5. Develop the resource classes for the server-side REST interface.
6. Develop the client-side ReactJS code for the login screen.
7. Develop the rest of the client-side functionality, screen by screen.

---
**Software Architectures - Project Jodel 
© 2024 University of Applied Sciences Esslingen  
Prof. Dr. Jörg Friedrich
