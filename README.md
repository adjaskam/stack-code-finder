<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<h1 align="center">stack-code-finder</h1>

  <p align="center">
   Automated scraper built on top of Stack Exchange API.<br />Search code fragments by given phrase in Stack Overflow - consider only code snippets in selected threads.  
    <br />
    <a href="https://github.com/adjaskam/stack-code-finder/issues">Report Bug</a>
  </p>
</div>

<div align="center">

| <img width="664" alt="Zrzut ekranu 2022-03-20 o 16 43 09" src="https://user-images.githubusercontent.com/43110487/159170505-f8ac4bfa-c3b4-4296-9a4a-7f753c32a71e.png">| 
|:--:| 
| *The example of a code snippet* |
</div>

<!-- ABOUT THE PROJECT -->
## About the project


![image](https://user-images.githubusercontent.com/43110487/162948296-e239fb88-f307-40cc-bf8e-018a0fb989f4.png)

### Built With

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [React Redux](https://react-redux.js.org/)
* [Redux Thunk](https://github.com/reduxjs/redux-thunk)
* [Mongoose](https://mongoosejs.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Docker](https://www.docker.com/) 
* Scraping with:
  * [Cheerio](https://cheerio.js.org/)
  * [Puppeteer](https://pptr.dev/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Set all following environmental variables, e.g.:
```shell
HOST=0.0.0.0
PORT=3000

MONGO_DB_USER=root
MONGO_DB_PASSWORD=example
MONGO_DB_NAME=appdb
MONGO_DB_PORT=27017
MONGO_DB_SERVICE_NAME=mongodb

CODE_FRAGMENTS_FETCH_LIMIT=10
JWT_TOKEN_SECRET=access_token_secret
STACK_API_KEY=stack_api_key
```
You can find more information on getting the `STACK_API_KEY` by following &#8594; https://api.stackexchange.com/docs/authentication.

Important note &#8594; https://api.stackexchange.com/docs/throttle


### Dev installation

1. Clone the repo
   ```sh
   git clone https://github.com/adjaskam/stack-code-finder.git
   ```
2. Install NPM packages for the client
   ```sh
   cd client
   npm i
    ```
3. Start the project with `concurrently` (invoke from the root directory)
   ```sh
   npm run dev:fullstack
    ```
**Note**: The backend part of this project is based on Dockerfile and the development process is placed within the container.


## Endpoints
* POST `/api/codefragments` - start a job for given `tag` (includes scraping procedure). The application supports:
  * Preventing creation of duplicates extracted fragments (comparing values of MD5 hash from code fragment factors).
  * Handling user-specific documents - that means owning the single code fragment by multiple users.
  * Web scraping optionally with Puppeteer or Cheerio.

#### Body of the example request: 
```json
{
   "tag": "Java",
   "searchPhrase": "int",
   "amount": 1,
   "scraperType": "cheerio"
}
```
#### Response: 
```json
{
   "items":[
      {
         "questionId": "71860220",
         "tag": "Java",
         "searchPhrase": "int",
         "codeFragment": "public class TekuciRacun implements IRacun{\n private String vlasnik;\n private int isplate;\n private int kredit;\nthis.stanje = stanje;\n    }\n    \n    \n    \n}\n",
         "hashMessage": "2de6aac5afba3f6f44aa7f9e91cb9d8d",
         "usersOwn": [
            "example3@example.com"
         ],
         "_id": "625712efea1e61ff34001739",
         "createdAt": "2022-04-13T18:14:07.563Z",
         "updatedAt": "2022-04-13T18:14:07.563Z",
         "__v": 0
      }
   ],
   "amount": 1,
   "executionTime": 960
}
```

* GET `/api/codefragments/my` - get all obtained code fragments per user

* DELETE `/api/codefragments/:hashMessage`- delete code fragment by MD5 hash
  * Available for authenticated user.
  * Soft delete is being proceeded until the last user owns the specific code fragment.
  * `usersOwn` array of given code fragment is empty? -> hard delete item.

Authentication is needed to handle user-specific documents and is based on JWT standard.
No confirmation needed while registering. Email has to be unique. All forms available in the application are being validated.
* POST `/api/register` - register new user
* POST `/api/login`- service login

## TODO
* [X] Handle user-specific documents - create authentication & owning the documents by the specific user
* [X] Work on performance - added `cheerio` as the main scraper
* [ ] Adjust searching for `searchPhrase` in the obtained content to be more precise (currently, the base of the search process is check if fragment includes given `searchPhrase`)
* [ ] Work on refresh tokens
