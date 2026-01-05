#!/usr/bin/env python3
"""
Backend API Testing for FLORENS POLYCLINIC
Tests all backend endpoints for functionality and validation
"""

import requests
import json
import sys
from datetime import datetime, timedelta
import uuid

# Backend URL from frontend/.env
BACKEND_URL = "https://medcareflorens.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.created_appointment_id = None
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_create_appointment_valid(self):
        """Test creating a valid appointment"""
        test_name = "Create Valid Appointment"
        
        # Use realistic test data
        appointment_data = {
            "fullName": "Maria Rodriguez",
            "phone": "(555) 987-6543",
            "email": "maria.rodriguez@email.com",
            "service": "General Medicine",
            "date": "2025-01-20",
            "time": "2:30 PM"
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/appointments",
                json=appointment_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 201:
                data = response.json()
                self.created_appointment_id = data.get("id")
                self.log_test(test_name, True, "Appointment created successfully", {
                    "appointment_id": self.created_appointment_id,
                    "status": data.get("status"),
                    "created_at": data.get("createdAt")
                })
            else:
                self.log_test(test_name, False, f"Expected 201, got {response.status_code}", {
                    "response": response.text
                })
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
    
    def test_create_appointment_invalid_email(self):
        """Test creating appointment with invalid email"""
        test_name = "Create Appointment - Invalid Email"
        
        appointment_data = {
            "fullName": "John Smith",
            "phone": "(555) 123-4567",
            "email": "invalid-email",  # Invalid email format
            "service": "Cardiology",
            "date": "2025-01-21",
            "time": "10:00 AM"
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/appointments",
                json=appointment_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error expected
                self.log_test(test_name, True, "Validation correctly rejected invalid email")
            else:
                self.log_test(test_name, False, f"Expected 422 validation error, got {response.status_code}", {
                    "response": response.text
                })
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
    
    def test_create_appointment_missing_fields(self):
        """Test creating appointment with missing required fields"""
        test_name = "Create Appointment - Missing Fields"
        
        appointment_data = {
            "fullName": "Jane Doe",
            # Missing phone, email, service, date, time
        }
        
        try:
            response = requests.post(
                f"{BACKEND_URL}/appointments",
                json=appointment_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error expected
                self.log_test(test_name, True, "Validation correctly rejected missing fields")
            else:
                self.log_test(test_name, False, f"Expected 422 validation error, got {response.status_code}", {
                    "response": response.text
                })
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
    
    def test_get_appointments(self):
        """Test fetching all appointments"""
        test_name = "Get All Appointments"
        
        try:
            response = requests.get(
                f"{BACKEND_URL}/appointments",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if our created appointment is in the list
                    found_appointment = False
                    if self.created_appointment_id:
                        found_appointment = any(apt.get("id") == self.created_appointment_id for apt in data)
                    
                    self.log_test(test_name, True, f"Retrieved {len(data)} appointments", {
                        "count": len(data),
                        "created_appointment_found": found_appointment
                    })
                else:
                    self.log_test(test_name, False, "Response is not a list", {
                        "response_type": type(data).__name__
                    })
            else:
                self.log_test(test_name, False, f"Expected 200, got {response.status_code}", {
                    "response": response.text
                })
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
    
    def test_get_services(self):
        """Test fetching all services"""
        test_name = "Get Services"
        
        try:
            response = requests.get(
                f"{BACKEND_URL}/services",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    # Check if services have required fields
                    first_service = data[0]
                    required_fields = ["id", "name", "description", "icon"]
                    has_all_fields = all(field in first_service for field in required_fields)
                    
                    self.log_test(test_name, True, f"Retrieved {len(data)} services", {
                        "count": len(data),
                        "has_required_fields": has_all_fields,
                        "sample_service": first_service.get("name")
                    })
                else:
                    self.log_test(test_name, False, "No services returned or invalid format")
            else:
                self.log_test(test_name, False, f"Expected 200, got {response.status_code}", {
                    "response": response.text
                })
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
    
    def test_get_doctors(self):
        """Test fetching all doctors"""
        test_name = "Get Doctors"
        
        try:
            response = requests.get(
                f"{BACKEND_URL}/doctors",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    # Check if doctors have required fields
                    first_doctor = data[0]
                    required_fields = ["id", "name", "specialty", "experience", "image"]
                    has_all_fields = all(field in first_doctor for field in required_fields)
                    
                    self.log_test(test_name, True, f"Retrieved {len(data)} doctors", {
                        "count": len(data),
                        "has_required_fields": has_all_fields,
                        "sample_doctor": first_doctor.get("name")
                    })
                else:
                    self.log_test(test_name, False, "No doctors returned or invalid format")
            else:
                self.log_test(test_name, False, f"Expected 200, got {response.status_code}", {
                    "response": response.text
                })
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
    
    def test_get_testimonials(self):
        """Test fetching all testimonials"""
        test_name = "Get Testimonials"
        
        try:
            response = requests.get(
                f"{BACKEND_URL}/testimonials",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    # Check if testimonials have required fields
                    first_testimonial = data[0]
                    required_fields = ["id", "name", "text", "rating"]
                    has_all_fields = all(field in first_testimonial for field in required_fields)
                    
                    self.log_test(test_name, True, f"Retrieved {len(data)} testimonials", {
                        "count": len(data),
                        "has_required_fields": has_all_fields,
                        "sample_testimonial": first_testimonial.get("name")
                    })
                else:
                    self.log_test(test_name, False, "No testimonials returned or invalid format")
            else:
                self.log_test(test_name, False, f"Expected 200, got {response.status_code}", {
                    "response": response.text
                })
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Request failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("FLORENS POLYCLINIC BACKEND API TESTING")
        print("=" * 60)
        print(f"Testing backend at: {BACKEND_URL}")
        print()
        
        # Test in order of priority (high first)
        self.test_create_appointment_valid()
        self.test_create_appointment_invalid_email()
        self.test_create_appointment_missing_fields()
        self.test_get_appointments()
        self.test_get_services()
        self.test_get_doctors()
        self.test_get_testimonials()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if total - passed > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['message']}")
        
        return passed == total

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)