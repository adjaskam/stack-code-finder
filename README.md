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
<h3 align="center">stack-code-finder</h3>

  <p align="center">
   Automated scrapper built with Stackoverflow API.<br />Search code fragments by given phrase in Stackoverflow - consider only code snippets in selected threads.  
    <br />
    ·
    <a href="https://github.com/adjaskam/stack-code-finder/issues">Report Bug</a>
    ·
    <a href="https://github.com/adjaskam/stack-code-finder/issues">Request Feature</a>
  </p>
</div>

<div align="center">

| <img width="664" alt="Zrzut ekranu 2022-03-20 o 16 43 09" src="https://user-images.githubusercontent.com/43110487/159170505-f8ac4bfa-c3b4-4296-9a4a-7f753c32a71e.png">| 
|:--:| 
| *The example of a code snippet* |
</div>

<!-- ABOUT THE PROJECT -->
## About The Project


![image](https://user-images.githubusercontent.com/43110487/162948296-e239fb88-f307-40cc-bf8e-018a0fb989f4.png)

### Built With

* [node.js](https://nextjs.org/)
* [express](https://reactjs.org/)
* [React.js](https://reactjs.org/)
* [react-redux](https://reactjs.org/)
* [redux-thunk](https://reactjs.org/)
* [cheerio](https://vuejs.org/)
* [puppeteer](https://angular.io/)
* [Bootstrap](https://reactjs.org/)
* [mongodb](https://reactjs.org/)
* [docker](https://reactjs.org/)

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
You can find more information on getting the `STACK_API_KEY` by following https://api.stackexchange.com/docs/authentication.  
**Important note** - https://api.stackexchange.com/docs/throttle


### Installation

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
* POST `/api/codefragments` -
start a job for given `tag` (includes web scrapping procedure). The application supports the creation of duplicate extracted fragments by comparing values of MD5 hash and handling user-specific documents (that means owning the fragment by multiple users - prevent creating duplicates).

#### Body of the example request: 
```json
{
   "tag": "Java",
   "searchPhrase": "int",
   "amount": 2,
   "scraperType": "cheerio"
}
```
#### Response: 
```json
{
   "items": [
      {
         "_id": "6237430ad0ac68254e073113",
         "questionId": "71547666",
         "tag": "Java",
         "searchPhrase": "int",
         "codeFragment": "import java.util.Scanner;\nimport java.time.LocalDateTime;\nimport java.time.format.DateTimeFormatter; \n\nclass Main {\n  public static void main(String[] args) {\n    Scanner myObj = new Scanner(System.in);\n\n    System.out.println(\"Enter your Name, Student ID and Salary: \\n\");\n\n",
         "hashMessage": "ce855c81eb26302839af575b7a238796",
         "createdAt": "2022-03-20T15:06:50.872Z",
         "updatedAt": "2022-03-20T15:06:50.872Z",
         "__v": 0
      },
      {
         "_id": "6237430ad0ac68254e073115",
         "questionId": "71547666",
         "tag": "Java",
         "searchPhrase": "int",
         "codeFragment": "if(50<=salary) {    \n    if(70<=salary) {\n         System.out.printIn(\"E\");\n         }\n    else {\n         System.out.println(\"C\");\n         }\n}\n",
         "hashMessage": "2296273c33507991656cca6462008795",
         "createdAt": "2022-03-20T15:06:50.887Z",
         "updatedAt": "2022-03-20T15:06:50.887Z",
         "__v": 0
      }
   ],
   "amount": 2
}
```

* GET `/api/codefragments/my` - get all obtained code fragments per user
* GET `/api/codefragments` - get all obtained code fragments
* DELETE `/api/codefragments`- delete all code fragments

Authentication is needed to handle user-specific documents and is based on JWT standard.
No confirmation needed while registering. Email has to be unique. All forms available in the application are being validated.
* POST `/api/register` - register new user
* POST `/api/login`- service login

## TODO
* [X] Handle user-specific documents - create authentication & owning the documents by the specific user
* [X] Work on performance - added `cheerio` as the main scraper
* [ ] Adjust searching for `searchPhrase` in the obtained content to be more precise (currently, the base of the search process is check if fragment includes given `searchPhrase`)
* [ ] Work on refresh tokens
