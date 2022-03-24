# stack-code-finder
Automated scrapper using Stackoverflow API based on https://api.stackexchange.com/docs & puppeteer.  
Search data from Stackoverflow, considering **only code snippets** in selected threads.  

| <img width="664" alt="Zrzut ekranu 2022-03-20 o 16 43 09" src="https://user-images.githubusercontent.com/43110487/159170505-f8ac4bfa-c3b4-4296-9a4a-7f753c32a71e.png">| 
|:--:| 
| *The example of a code snippet* |

## Core libraries
* [puppeteer](https://github.com/puppeteer/puppeteer) v13.5.0

## Entry setup
* Set all following environmental variables
```javascript
MONGO_DB_USER=root
MONGO_DB_PASSWORD=example
MONGO_DB_NAME=appdb
MONGO_DB_PORT=27017
MONGO_DB_SERVICE_NAME=mongodb

CODE_FRAGMENTS_FETCH_LIMIT=10
```
* Run by invoking `docker-compose up`

## Endpoints
* POST `/api/codefragments` -
start a job for given `tag` (includes web scrapping procedure). The application supports the creation of duplicate extracted fragments by comparing values of MD5 hash. 

#### Body of the example request: 
```json
{
   "tag": "Java",
   "searchPhrase": "int",
   "amount": 2
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
* GET `/api/codefragments` - get all obtained code fragments
* GET `/api/codefragments/:searchPhrase` - get all obtained code fragments by given `searchPhrase`
* DELETE `/api/codefragments`- delete all code fragments

## TODO
* [ ] Adjust searching for `searchPhrase` in the obtained content to be more precise (currently, the base of the search process is check if fragment includes given `searchPhrase`)
* [ ] Handle user-specific documents
* [ ] Work on performance
