# FLORENS POLYCLINIC - API Contracts

## Overview
Backend API for managing appointments at Florens Polyclinic.

## Mock Data Location
`/app/frontend/src/data/mock.js` contains:
- `services` - List of medical services
- `doctors` - List of doctors
- `benefits` - Why choose us benefits
- `testimonials` - Patient reviews
- `contactInfo` - Clinic contact information
- `navLinks` - Navigation links

## API Endpoints

### 1. Appointments

#### POST /api/appointments
Create a new appointment request.

**Request Body:**
```json
{
  "fullName": "string (required)",
  "phone": "string (required)",
  "email": "string (required)",
  "service": "string (required)",
  "date": "string (required, YYYY-MM-DD)",
  "time": "string (required)"
}
```

**Response (201):**
```json
{
  "id": "string",
  "fullName": "string",
  "phone": "string",
  "email": "string",
  "service": "string",
  "date": "string",
  "time": "string",
  "status": "pending",
  "createdAt": "datetime"
}
```

#### GET /api/appointments
Get all appointments (admin).

**Response (200):**
```json
[
  {
    "id": "string",
    "fullName": "string",
    "phone": "string",
    "email": "string",
    "service": "string",
    "date": "string",
    "time": "string",
    "status": "pending|confirmed|cancelled",
    "createdAt": "datetime"
  }
]
```

### 2. Services (Static)

#### GET /api/services
Get all available services.

**Response (200):**
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "icon": "string"
  }
]
```

### 3. Doctors (Static)

#### GET /api/doctors
Get all doctors.

**Response (200):**
```json
[
  {
    "id": "number",
    "name": "string",
    "specialty": "string",
    "experience": "string",
    "image": "string"
  }
]
```

### 4. Testimonials (Static)

#### GET /api/testimonials
Get patient testimonials.

**Response (200):**
```json
[
  {
    "id": "number",
    "name": "string",
    "text": "string",
    "rating": "number"
  }
]
```

## Frontend Integration

### AppointmentSection.jsx
- Replace mock form submission with API call to POST /api/appointments
- Show success/error toast using sonner
- Form validation before submission

## Database Collections

### appointments
```
{
  _id: ObjectId,
  fullName: String,
  phone: String,
  email: String,
  service: String,
  date: String,
  time: String,
  status: String (enum: pending, confirmed, cancelled),
  createdAt: DateTime
}
```
