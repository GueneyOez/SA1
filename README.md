#Project Jodel README

##Project Objectives

Develop a simple web-based Jodel application.
Share thoughts, hints, and observations via posts.
Connect with people nearby.
Comment and vote on comments.

##Features

Login using Google, Facebook, Keycloak, or a local username and password.
Read all posts within a 10 km radius of your current location that have been posted or commented on recently.
Display the newest posts or comments first.
Comment and vote on comments (one vote up or down per person per comment).

##Technologies

Database: PostgreSQL
Backend: Java 17 and Spring Boot
Frontend: ReactJS
Containerization and Authentication: Docker and Keycloak

##Rationale Behind Using These Technologies

PostgreSQL is a widely used open-source database known for its robustness and reliability.
Java offers a comprehensive library set and state-of-the-art software architecture capabilities.
Spring Boot integrates the best libraries into a single framework, supports native code compilation for efficient memory usage, and ensures fast startup times, which are crucial for microservices architecture.
ReactJS is a modern JavaScript framework by Facebook, preferred over alternatives like Google's Angular due to its state-based architecture and performance benefits.

##Deployability Considerations

Ensure the application can run on a server, not just localhost:8080.
Avoid using absolute URLs in your code, such as https://localhost:8080/xxx/yyy; use relative URLs instead, like /xxx/yyy.
Make the base URL configurable via command line parameters or environment variables.
Make the database user and password configurable via command line parameters or environment variables.

##Outline of the Development Process

Create a UML class diagram for the database entities.
Write the entity classes (the model) in Java.
Use Spring Boot to create the database schema and populate it with test data.
Develop the ORM classes to access the database entities.
Develop the resource classes for the server-side REST interface.
Develop the client-side ReactJS code for the login screen.
Develop the rest of the client-side functionality, screen by screen.

Software Architectures - Project Jodel 
© 2024 University of Applied Sciences Esslingen
Prof. Dr. Jörg Friedrich
