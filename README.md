### Prerequisites

- **Node.js** ( v11.15+ )
- **Nodemon** `npm i nodemon -g`

### How to install

1. First, clone the repository and in the terminal navigate to the folder
2. Install project dependencies with `npm i`
3. Make a copy of the **.env.example** with the name **.env**, add connection information to your database, a key for JWT ( any string ) and server port ( example: 3000 )
4. Run the server with `npm start`
5. The service endpoint will be available at http://127.0.0.1:3000 or http://localhost:3000

### Routes
```
POST /auth

POST /user

PUT /user/email

PUT /user/nickname

PUT /user/password

PUT /user/phone
```
> <a href="https://github.com/jonathansilva/api/blob/master/data">Postman Collection and SQL</a>
