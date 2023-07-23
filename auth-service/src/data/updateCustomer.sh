curl -X PATCH localhost:8000/v1/customers/58be0dd2d6a24b3f8bdc339928683724 -H "Content-Type: application/json" -d '{"password":"Mike", "email": "mike@email.com"}' | jq
