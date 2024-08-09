# Flight Path Tracker API

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `node app.js` to start the server on port 8080.

## API Endpoint
- **POST /calculate**

### Request Body
```json
{
  "flights": [["SFO", "EWR"], ["ATL", "EWR"]]
}
```
### Response Body
```json
["SFO", "EWR"], ["ATL", "EWR"]
```

## Testing with REST Client in Visual Studio Code

### Prerequisites
- Make sure you have the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed in Visual Studio Code.

### Using `requests.http`
- Instead of using Postman or cURL, you can test the API directly within Visual Studio Code using the REST Client extension. A file named `requests.http` has been created to simplify testing.

### Test Cases
- The `requests.http` file includes several test cases

### How to Run the Tests
1. Open the `requests.http` file in Visual Studio Code.
2. Click on the `Send Request` button above each test case to execute the request.
3. The response will be displayed in the Visual Studio Code interface.

## Additional Notes
- If you encounter port conflicts, modify the `PORT` environment variable to change the port on which the server is running.
- The server should be running while testing the API requests with the REST Client.
