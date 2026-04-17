"""
Test Script for GigShield Parametric Insurance API
Tests all endpoints with realistic examples
"""

import requests
import json
from datetime import datetime

# API Base URL
BASE_URL = "https://integrated-thiruselvan-gigshield.hf.space"

def print_section(title):
    """Print a formatted section header"""
    print("\n" + "="*80)
    print(f"  {title}")
    print("="*80 + "\n")

def print_response(response, title="Response"):
    """Pretty print API response"""
    print(f"\n{title}:")
    print(json.dumps(response.json(), indent=2))
    print(f"Status Code: {response.status_code}")

# ================================
# TEST DATA - REALISTIC SCENARIOS
# ================================

# Scenario 1: Heavy Rain in Bangalore - Worker eligible
test_disruption_eligible = {
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "weather_condition": "Rainy",
    "pollution_index": "Low",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
    "zone_safety_score": 68,
    "gps_accuracy_percent": 99.1
}

# Scenario 2: Pollution Spike in Delhi - Worker might be eligible
test_disruption_pollution = {
    "disruption_type": "Pollution Spike",
    "disruption_intensity": "Very High",
    "weather_condition": "Very Hazy",
    "pollution_index": "Very High",
    "platform": "Swiggy",
    "city": "Delhi",
    "delivery_type": "Food Delivery",
    "zone_safety_score": 52,
    "gps_accuracy_percent": 97.8
}

# Scenario 3: Clear weather - Worker likely not eligible
test_disruption_normal = {
    "disruption_type": "Regular Day",
    "disruption_intensity": "Low",
    "weather_condition": "Clear",
    "pollution_index": "Low",
    "platform": "Zepto",
    "city": "Mumbai",
    "delivery_type": "Quick Commerce",
    "zone_safety_score": 75,
    "gps_accuracy_percent": 99.5
}

# Claim amount calculation data (from eligible disruption)
test_claim_eligible = {
    "eligible": True,
    "income_loss_percentage": 35,
    "days_worked_weekly": 5,
    "avg_delivery_distance_km": 3.2,
    "customer_rating": 4.7,
    "weekly_avg_earnings": 8500,
    "experience_months": 24,
    "age_group": "25-35",
    "claim_fraud_indicator": False
}

# Claim amount calculation data (not eligible)
test_claim_not_eligible = {
    "eligible": False,
    "income_loss_percentage": 0,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 4.1,
    "customer_rating": 4.5,
    "weekly_avg_earnings": 9200,
    "experience_months": 36,
    "age_group": "35-45",
    "claim_fraud_indicator": False
}

# Complete end-to-end claim processing
test_complete_claim_approved = {
    "worker_id": "W0001_RAJESH",
    "disruption_type": "Heavy Rain",
    "disruption_intensity": "High",
    "weather_condition": "Rainy",
    "pollution_index": "Low",
    "platform": "Zomato",
    "city": "Bangalore",
    "delivery_type": "Food Delivery",
    "zone_safety_score": 68,
    "gps_accuracy_percent": 99.1,
    "income_loss_percentage": 40,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 3.5,
    "customer_rating": 4.8,
    "weekly_avg_earnings": 9500,
    "experience_months": 28,
    "age_group": "25-35",
    "claim_fraud_indicator": False
}

test_complete_claim_rejected = {
    "worker_id": "W0002_PRIYA",
    "disruption_type": "Clear Day",
    "disruption_intensity": "Low",
    "weather_condition": "Clear",
    "pollution_index": "Low",
    "platform": "Swiggy",
    "city": "Pune",
    "delivery_type": "Food Delivery",
    "zone_safety_score": 78,
    "gps_accuracy_percent": 99.3,
    "income_loss_percentage": 0,
    "days_worked_weekly": 6,
    "avg_delivery_distance_km": 2.8,
    "customer_rating": 4.9,
    "weekly_avg_earnings": 10200,
    "experience_months": 42,
    "age_group": "35-45",
    "claim_fraud_indicator": False
}

# Multiple workers for batch processing
test_batch_claims = {
    "workers": [
        {
            **test_complete_claim_approved,
            "worker_id": "W0001_RAJESH"
        },
        {
            **test_complete_claim_rejected,
            "worker_id": "W0002_PRIYA"
        },
        {
            "worker_id": "W0003_AMIT",
            "disruption_type": "Flooding",
            "disruption_intensity": "High",
            "weather_condition": "Rainy",
            "pollution_index": "Low",
            "platform": "Amazon",
            "city": "Chennai",
            "delivery_type": "Package Delivery",
            "zone_safety_score": 55,
            "gps_accuracy_percent": 98.7,
            "income_loss_percentage": 50,
            "days_worked_weekly": 5,
            "avg_delivery_distance_km": 4.5,
            "customer_rating": 4.6,
            "weekly_avg_earnings": 11000,
            "experience_months": 18,
            "age_group": "20-25",
            "claim_fraud_indicator": False
        }
    ]
}

# ================================
# TEST FUNCTIONS
# ================================

def test_health_check():
    """Test 1: Health check endpoint"""
    print_section("TEST 1: Health Check")
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        print_response(response, "Health Check Response")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_disruption_detection():
    """Test 2: Disruption detection - Multiple scenarios"""
    print_section("TEST 2: Disruption Detection (3 Scenarios)")
    
    scenarios = [
        ("Scenario 2A: Heavy Rain (Eligible)", test_disruption_eligible),
        ("Scenario 2B: Pollution Spike (Possible)", test_disruption_pollution),
        ("Scenario 2C: Clear Weather (Not Eligible)", test_disruption_normal)
    ]
    
    results = []
    for title, data in scenarios:
        try:
            print(f"\n{title}")
            response = requests.post(
                f"{BASE_URL}/detect-disruption",
                json=data
            )
            print_response(response, "Detection Result")
            results.append(response.status_code == 200)
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            results.append(False)
    
    return all(results)

def test_claim_calculation():
    """Test 3: Claim amount calculation"""
    print_section("TEST 3: Claim Amount Calculation (Eligible vs Not Eligible)")
    
    scenarios = [
        ("Scenario 3A: Eligible for Payout", test_claim_eligible),
        ("Scenario 3B: Not Eligible", test_claim_not_eligible)
    ]
    
    results = []
    for title, data in scenarios:
        try:
            print(f"\n{title}")
            response = requests.post(
                f"{BASE_URL}/calculate-claim",
                json=data
            )
            print_response(response, "Claim Calculation Result")
            results.append(response.status_code == 200)
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            results.append(False)
    
    return all(results)

def test_complete_pipeline():
    """Test 4: Complete claim processing pipeline"""
    print_section("TEST 4: Complete Claim Processing Pipeline (Stage 1 + 2)")
    
    scenarios = [
        ("Scenario 4A: Claim APPROVED (Rain + High Loss)", test_complete_claim_approved),
        ("Scenario 4B: Claim REJECTED (No Disruption)", test_complete_claim_rejected)
    ]
    
    results = []
    for title, data in scenarios:
        try:
            print(f"\n{title}")
            response = requests.post(
                f"{BASE_URL}/process-claim",
                json=data
            )
            print_response(response, "Pipeline Result")
            
            # Verify response structure
            resp_json = response.json()
            has_required_fields = all(key in resp_json for key in ['worker_id', 'claim_eligible', 'disruption_result', 'claim_result'])
            results.append(response.status_code == 200 and has_required_fields)
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            results.append(False)
    
    return all(results)

def test_batch_processing():
    """Test 5: Batch claim processing"""
    print_section("TEST 5: Batch Claim Processing (3 Workers)")
    
    try:
        response = requests.post(
            f"{BASE_URL}/process-claims-batch",
            json=test_batch_claims
        )
        print_response(response, "Batch Processing Result")
        
        resp_json = response.json()
        return (response.status_code == 200 and 
                resp_json.get('total_processed') == 3)
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_model_info():
    """Test 6: Model information endpoint"""
    print_section("TEST 6: Model Information")
    
    try:
        response = requests.get(f"{BASE_URL}/model-info")
        print_response(response, "Model Information")
        
        resp_json = response.json()
        has_models = ('models' in resp_json and 
                     'disruption_detection' in resp_json['models'] and
                     'claim_calculator' in resp_json['models'])
        return response.status_code == 200 and has_models
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_error_handling():
    """Test 7: Error handling scenarios"""
    print_section("TEST 7: Error Handling")
    
    results = []
    
    # Missing required fields
    print("\nScenario 7A: Missing Required Fields")
    try:
        response = requests.post(
            f"{BASE_URL}/detect-disruption",
            json={"disruption_type": "Rain"}  # Missing other required fields
        )
        print_response(response, "Error Response")
        results.append(response.status_code in [400, 500])
    except Exception as e:
        print(f"Error (expected): {str(e)}")
        results.append(True)
    
    # No input data
    print("\nScenario 7B: No Input Data")
    try:
        response = requests.post(
            f"{BASE_URL}/process-claim",
            json={}
        )
        print_response(response, "Error Response")
        results.append(response.status_code in [400, 500])
    except Exception as e:
        print(f"Error (expected): {str(e)}")
        results.append(True)
    
    return all(results)

# ================================
# MAIN TEST RUNNER
# ================================

def run_all_tests():
    """Run all tests and provide summary"""
    print("\n" + "="*80)
    print("  GIGSHIELD PARAMETRIC INSURANCE API - TEST SUITE")
    print("="*80)
    
    tests = [
        ("Health Check", test_health_check),
        ("Disruption Detection", test_disruption_detection),
        ("Claim Calculation", test_claim_calculation),
        ("Complete Pipeline", test_complete_pipeline),
        ("Batch Processing", test_batch_processing),
        ("Model Information", test_model_info),
        ("Error Handling", test_error_handling)
    ]
    
    results = {}
    for test_name, test_func in tests:
        try:
            results[test_name] = test_func()
        except Exception as e:
            print(f"\n❌ Test '{test_name}' failed with error: {str(e)}")
            results[test_name] = False
    
    # Print summary
    print_section("TEST SUMMARY")
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{status:12} | {test_name}")
    
    total = len(results)
    passed = sum(1 for r in results.values() if r)
    
    print(f"\n{'─'*80}")
    print(f"Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! API is working correctly.")
    else:
        print(f"⚠️  {total - passed} test(s) failed. Please check logs above.")
    
    print("="*80 + "\n")

if __name__ == "__main__":
    print("\nNote: Make sure the Flask server is running on https://integrated-thiruselvan-gigshield.hf.space")
    print("Start the server with: python app.py")
    input("\nPress Enter to start tests...")
    
    run_all_tests()
