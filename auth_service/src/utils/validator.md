### Validator Class

=============================

## example:

payload = {
"firstName": "James",
"lastName": "Kenedy",
"email": "jamesk@gmail.com",
"password": "Password!",
"passwordConfirm": "Password!"
}

export interface ICustomer {
firstName: string;
lastName: string;
email: string;
password: string;
passwordConfirm: string;
}

validator = Validator<ICustomer>new Validator(req.body)<ICustomer>
validator.validate({firstName: string, age: number, email: email })

================================
Types = [number, string, email, phone]

check for types:

- number:
  - must be a valid number between 0-9
  - must not contain any string character
- string:
  - must be greater three
  - must be type string
- email:
  - must be string
  - must conform with email regex
- phone:
  - number[0] must be among [7, 8, 9]
  - the remain numbe must be > 99_999_999 <= 999_999_999

1. specify the type of properties
