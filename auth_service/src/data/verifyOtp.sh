curl -X POST localhost:8000/v1/auth/verify -H "Content-Type: application/json" -d @verify.otp.json | jq
