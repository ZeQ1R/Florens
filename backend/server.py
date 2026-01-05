from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Florens Polyclinic API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Enums
class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"


# Models
class AppointmentCreate(BaseModel):
    fullName: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=5, max_length=20)
    email: EmailStr
    service: str = Field(..., min_length=2)
    date: str = Field(..., description="Preferred date in YYYY-MM-DD format")
    time: str = Field(..., description="Preferred time slot")


class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    fullName: str
    phone: str
    email: str
    service: str
    date: str
    time: str
    status: AppointmentStatus = AppointmentStatus.PENDING
    createdAt: datetime = Field(default_factory=datetime.utcnow)


class Service(BaseModel):
    id: int
    name: str
    description: str
    icon: str


class Doctor(BaseModel):
    id: int
    name: str
    specialty: str
    experience: str
    image: str


class Testimonial(BaseModel):
    id: int
    name: str
    text: str
    rating: int


# Static Data
SERVICES = [
    Service(
        id=1,
        name="General Medicine",
        description="Comprehensive primary care for all ages, from routine checkups to managing chronic conditions.",
        icon="Stethoscope"
    ),
    Service(
        id=2,
        name="Pediatrics",
        description="Specialized care for infants, children, and adolescents with a gentle, family-centered approach.",
        icon="Baby"
    ),
    Service(
        id=3,
        name="Gynecology",
        description="Complete women's health services including preventive care, diagnostics, and treatment.",
        icon="Heart"
    ),
    Service(
        id=4,
        name="Cardiology",
        description="Expert heart care with advanced diagnostics and personalized treatment plans.",
        icon="HeartPulse"
    ),
    Service(
        id=5,
        name="Dermatology",
        description="Skin health solutions from medical dermatology to cosmetic treatments.",
        icon="Sparkles"
    ),
    Service(
        id=6,
        name="Laboratory & Diagnostics",
        description="State-of-the-art diagnostic testing with quick, accurate results.",
        icon="Microscope"
    ),
]

DOCTORS = [
    Doctor(
        id=1,
        name="Dr. Sarah Mitchell",
        specialty="General Medicine",
        experience="15 years",
        image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
    ),
    Doctor(
        id=2,
        name="Dr. James Anderson",
        specialty="Cardiology",
        experience="20 years",
        image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
    ),
    Doctor(
        id=3,
        name="Dr. Emily Chen",
        specialty="Pediatrics",
        experience="12 years",
        image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
    ),
    Doctor(
        id=4,
        name="Dr. Michael Torres",
        specialty="Dermatology",
        experience="10 years",
        image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face"
    ),
]

TESTIMONIALS = [
    Testimonial(
        id=1,
        name="Rebecca Johnson",
        text="The doctors at Florens are incredibly caring and professional. My family has been coming here for years and we wouldn't go anywhere else.",
        rating=5
    ),
    Testimonial(
        id=2,
        name="David Martinez",
        text="Exceptional cardiac care! Dr. Anderson took the time to explain everything and made me feel confident about my treatment plan.",
        rating=5
    ),
    Testimonial(
        id=3,
        name="Lisa Thompson",
        text="Clean, modern facility with friendly staff. The online booking system is so convenient. Highly recommend!",
        rating=5
    ),
]


# Routes
@api_router.get("/")
async def root():
    return {"message": "Florens Polyclinic API"}


# Appointments
@api_router.post("/appointments", response_model=Appointment, status_code=201)
async def create_appointment(appointment_data: AppointmentCreate):
    """Create a new appointment request"""
    try:
        appointment = Appointment(**appointment_data.model_dump())
        appointment_dict = appointment.model_dump()
        appointment_dict['createdAt'] = appointment.createdAt
        
        await db.appointments.insert_one(appointment_dict)
        logger.info(f"Appointment created: {appointment.id}")
        return appointment
    except Exception as e:
        logger.error(f"Error creating appointment: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create appointment")


@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    """Get all appointments"""
    try:
        appointments = await db.appointments.find().sort("createdAt", -1).to_list(1000)
        return [Appointment(**apt) for apt in appointments]
    except Exception as e:
        logger.error(f"Error fetching appointments: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch appointments")


@api_router.get("/appointments/{appointment_id}", response_model=Appointment)
async def get_appointment(appointment_id: str):
    """Get a specific appointment by ID"""
    appointment = await db.appointments.find_one({"id": appointment_id})
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return Appointment(**appointment)


@api_router.patch("/appointments/{appointment_id}/status")
async def update_appointment_status(appointment_id: str, status: AppointmentStatus):
    """Update appointment status"""
    result = await db.appointments.update_one(
        {"id": appointment_id},
        {"$set": {"status": status.value}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Status updated successfully"}


# Services
@api_router.get("/services", response_model=List[Service])
async def get_services():
    """Get all available services"""
    return SERVICES


# Doctors
@api_router.get("/doctors", response_model=List[Doctor])
async def get_doctors():
    """Get all doctors"""
    return DOCTORS


# Testimonials
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get patient testimonials"""
    return TESTIMONIALS


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
