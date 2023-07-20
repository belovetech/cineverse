curl -X POST localhost:8000/v1/auth/otp -H "Content-Type: application/json" -d '{"email": "james@gmail.com"}' -vvv | jq
