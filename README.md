steps to get userDetails

1. run the server using node index.js
2. create a user using this api
   


curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "ABC",
  "email": "abc@gmail.com",
  "password": "abcpass"

}'



3. insert a userDetails details document using this api 
   pass userId of above user in this api 
   
   curl --location 'http://localhost:3000/user/userDetails/insert' \
--header 'Content-Type: application/json' \
--data '{
  "user": "userID",
  "address": "city2 state3",
  "mobileNo": 9999999999
}'


4. use this api to fetch userDetails

   curl --location 'http://localhost:3000/user/userDetails'


database -> auth-rest
  
