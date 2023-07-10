curl -X PATCH localhost:8000/v1/customers/3fca602980ba4968b4c899d419959d82 -H "Content-Type: application/json" -d '{"firstName":"Mike", "lastName": "Smith", "email": "mike@email.com"}' | jq
