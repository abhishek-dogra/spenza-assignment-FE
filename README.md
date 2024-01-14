# Webhook Admin

### Starting the frontend
Make sure you have Node.js version 18.17.0 installed on your system. 
You can easily switch to this version using nvm (Node Version Manager). 
Open your terminal and run:

```bash
nvm use v18.17.0
```

After setting the Node.js version, you can start the server using the following commands:

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Architecture and Design Choices

### Backend

Backend of the application is implemented using **NestJS**, a highly scalable and modular Node framework. Leveraging its robust feature set, including built-in validation pipelines, guards, middlewares, and parsing pipes, ensures the development of a secure and error-resistant system.

- Validation and transformation pipelines are uniformly applied across request body Data Transfer Objects (DTOs), enhancing type safety and minimizing the occurrence of undesired errors.
- Token guards are employed to verify the authenticity of requests through valid JSON Web Tokens (JWTs), enhancing the overall security posture of the application.

The utilization of **NestJS's event emitter** facilitates asynchronous management of webhook process requests, incorporating a listener to monitor and handle failed process retries. 

The integration of the crypto library ensures the secure signing of API keys with a designated secret key, specifically designed for the processing of webhooks.

**TypeORM** serves as the chosen database management solution, providing a seamless interface for handling database operations. Its features include an easy-to-use Object-Relational Mapping (ORM) system, facilitating the interaction with the database using TypeScript or JavaScript.

For JWT signing, the **NestJS JWT service** is employed, seamlessly integrating with the overall architecture. This service derives the necessary secret key from the configuration service, ensuring a centralized and secure approach to token management.

In addressing password security, the application employs **bcrypt for hash generation**. This cryptographic hashing algorithm adds a layer of protection to user passwords, contributing to overall system resilience against unauthorized access attempts.

### Database

#### User Table
```
id: UUID for scalability and uniqueness.
email: Unique email for integrity.
password: Securely hashed password.
name: User's name.
```
#### Webhook Table
```
id: Big serial for scalability.
name: Unique webhook name.
```

#### Webhook Usage Log Table
```
id: UUID for scalability.
user_webhook_id: Foreign key to link with the webhook_user table.
timestamp: Time of log creation.
data: JSONB for diverse data types.
source_url: Source URL associated with the log.
retries: Number of processing retries.
```

#### Webhook User Table
```
id: UUID for scalability.
user_id: Foreign key linking to the user table.
webhook_id: Foreign key linking to the webhook table.
active: Flag indicating subscription status.
source_url: Source URL associated with the webhook.
retry_count: Count of processing retries.
created_at: Timestamp for row creation.
updated_at: Timestamp for row modification.
```

The relational database schema is created to manage user information, webhooks, and usage logs effectively. 
Utilization of UUIDs ensures scalability and uniqueness, while unique constraints, timestamps, and JSONB data types contribute to system integrity and functionality. 
The structure caters to data integrity (unique constraints), and scalability (UUIDs and big serial) considerations.

### Frontend

For the frontend development, Next.js was chosen as the primary framework, leveraging its built-in capabilities on top of React. This choice was made due to Next.js being developer-friendly and offering seamless routing and state management out of the box. The framework's architecture facilitates a smooth development experience, providing a solid foundation for building dynamic and responsive user interfaces.

In terms of styling, Tailwind CSS was used. Its utility-first approach allowed to easily compose complex designs by applying small, single-purpose utility classes directly in the HTML. This approach not only streamlines the styling process but also promotes consistency and maintainability throughout the codebase.
