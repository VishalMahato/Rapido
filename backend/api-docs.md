
# 🛠️ Backend API Documentation

---

## 📌 `/users/register` Endpoint

### **Description**
Registers a new user by creating a user account with the provided information.

### **HTTP Method**
`POST`

### **Endpoint**
`/users/register`

### **Request Body**
```json
{
  "firstName": "Rohan",
  "lastName": "Raj",
  "userName": "rohan_raj",
  "email": "rohan@example.com",
  "password": "Rohan@123",
  "contactNumber": "9876543210"
}
```

### **Example Response**
```json
{
  "message": "User registered successfully."
}
```

---

## 🔐 `/users/login` Endpoint

### **Description**
Authenticates a user using email or username and password. Returns a JWT token in a cookie.

### **HTTP Method**
`POST`

### **Endpoint**
`/users/login`

### **Request Body**
```json
{
  "email": "rohan@example.com",
  "password": "Rohan@123"
}
```

### **Example Response**
```json
{
  "message": "Login Successful"
}
```

> Token is returned as an **HTTP-only cookie** named `token`.

---

## 👤 `/users/profile` Endpoint

### **Description**
Retrieves the profile info of the authenticated user.

### **HTTP Method**
`GET`

### **Authentication**
Requires JWT token via cookie or `Authorization` header.

### **Example Response**
```json
{
  "user": {
    "name": {
      "firstName": "Rohan",
      "lastName": "Raj"
    },
    "userName": "rohan_raj",
    "email": "rohan@example.com",
    "role": "User"
  }
}
```

---

## 🧢 `/users/register-captain` Endpoint

### **Description**
Registers a brand-new user as a **Captain**, including personal and vehicle details.

### **HTTP Method**
`POST`

### **Request Body**
```json
{
  "firstName": "Rohan",
  "lastName": "Raj",
  "userName": "rohan_captain",
  "email": "captain.rohan@example.com",
  "password": "Captain@123",
  "contactNumber": "9876543210",
  "vehicleNumber": "KA01 AB 1234",
  "licenceNumber": "KA01 20210001234",
  "vehicleType": "Bike",
  "vehicleCapicity": "2"
}
```

### **Example Response**
```json
{
  "message": "User registered successfully."
}
```

---

## 🆙 `/users/become-captain` Endpoint

### **Description**
Promotes an existing user to **Captain** role with vehicle details.

### **HTTP Method**
`POST`

### **Authentication**
Requires JWT token via cookie or `Authorization` header.

### **Request Body**
```json
{
  "vehicleNumber": "KA02 AB 5678",
  "licenceNumber": "KA02 20190004567",
  "vehicleType": "Auto",
  "vehicleCapacity": 3,
  "vehicleImageUrl": "https://example.com/vehicle.png"
}
```

### **Example Response**
```json
{
  "message": "Successfully registered as a captain."
}
```
