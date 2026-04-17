import csv
import random
from datetime import datetime, timedelta
import json

# Set random seed for reproducibility
random.seed(42)

# Constants
PLATFORMS = ['Zomato']
DELIVERY_TYPES = ['Food Delivery']
AGE_GROUPS = ['20-25', '25-35', '35-45', '45-55']
DISRUPTION_TYPES = [
    'Extreme Rain', 'Heavy Rain', 'Heavy Downpour', 'Severe Waterlogging', 'Flooding', 'Flooding Event', 'Flash Flood',
    'Extreme Heat', 'Extreme Heat Wave', 'Heat Wave',
    'Heavy Pollution', 'Severe Pollution', 'Pollution Crisis', 'Pollution Spike', 'Pollution Event',
    'Curfew Alert', 'Curfew Lockdown', 'Curfew Enforcement',
    'Street Closure', 'Street Strike', 'Market Closure', 'Market Strike', 'Local Strike',
    'Zone Lockdown', 'App Crash', 'App Downtime', 'App Issue',
    'Heavy Traffic Jam', 'Extreme Conditions', 'Severe Weather'
]
STATUSES = ['approved', 'rejected', 'pending', 'appealed']
WEATHER_CONDITIONS = ['Rainy', 'Clear', 'Hazy', 'Very Hot', 'Very Hazy', 'Cloudy', 'Stormy']
POLLUTION_INDEX = ['Low', 'Medium', 'High', 'Very High', 'Severe']
CITIES = ['Mumbai', 'Bangalore', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata']
VEHICLE_TYPES = ['Two-wheeler', 'Three-wheeler', 'Bicycle']

def generate_worker_name():
    """Generate random Indian names"""
    first_names = ['Rajesh', 'Priya', 'Amit', 'Neha', 'Vikram', 'Ananya', 'Sandeep', 'Divya', 'Rohan', 'Kavya',
                   'Arjun', 'Sakshi', 'Manoj', 'Isha', 'Vishal', 'Riya', 'Harsh', 'Pooja', 'Nikhil', 'Anjali',
                   'Karthik', 'Ritika', 'Sanjay', 'Deepika', 'Rahul', 'Nikita', 'Aditya', 'Sneha', 'Vinod', 'Priyanka',
                   'Manish', 'Anita', 'Rohan', 'Kavya', 'Naveen', 'Divya', 'Sanjay', 'Isha', 'Arjun', 'Richa']
    last_names = ['Kumar', 'Singh', 'Patel', 'Verma', 'Sharma', 'Rao', 'Das', 'Gupta', 'Nair', 'Desai']
    return f"{random.choice(first_names)} {random.choice(last_names)}"

def generate_dataset(num_records):
    """Generate 5000 worker records"""
    records = []
    base_date = datetime(2026, 3, 1)
    
    for i in range(1, num_records + 1):
        worker_id = f"W{i:04d}"
        worker_name = generate_worker_name()
        platform = random.choice(PLATFORMS)
        city = random.choice(CITIES)
        delivery_type = random.choice(DELIVERY_TYPES)
        age_group = random.choice(AGE_GROUPS)
        experience_months = random.randint(6, 60)
        weekly_avg_earnings = random.randint(4500, 12000)
        subscription_status = random.choice(['active', 'inactive', 'suspended'])
        risk_score = random.randint(30, 60)
        disruption_type = random.choice(DISRUPTION_TYPES)
        disruption_date = (base_date + timedelta(days=random.randint(0, 45))).strftime('%Y-%m-%d')
        disruption_intensity = random.choice(['Low', 'Medium', 'High', 'Very High'])
        
        # Calculate income loss percentage
        if disruption_intensity == 'Low':
            income_loss_percentage = random.randint(8, 15)
        elif disruption_intensity == 'Medium':
            income_loss_percentage = random.randint(15, 25)
        elif disruption_intensity == 'High':
            income_loss_percentage = random.randint(25, 40)
        else:  # Very High
            income_loss_percentage = random.randint(40, 50)
        
        claim_amount = round(weekly_avg_earnings * income_loss_percentage / 100, 2)
        claim_status = random.choice(['approved', 'approved', 'approved', 'rejected', 'pending'])  # Weighted towards approved
        
        if claim_status == 'approved':
            claim_approved_amount = claim_amount
            approval_date = (datetime.strptime(disruption_date, '%Y-%m-%d') + timedelta(days=1)).strftime('%Y-%m-%d')
            payout_date = (datetime.strptime(approval_date, '%Y-%m-%d') + timedelta(days=1)).strftime('%Y-%m-%d')
        else:
            claim_approved_amount = 0
            approval_date = (datetime.strptime(disruption_date, '%Y-%m-%d') + timedelta(days=2)).strftime('%Y-%m-%d')
            payout_date = ''
        
        days_worked_weekly = random.randint(3, 7)
        avg_delivery_distance_km = round(random.uniform(1.5, 5.0), 1)
        vehicle_type = random.choice(VEHICLE_TYPES)
        zone_id = f"Z{random.randint(1, 100):03d}"
        weather_condition = random.choice(WEATHER_CONDITIONS)
        pollution_index = random.choice(POLLUTION_INDEX)
        gps_accuracy_percent = round(random.uniform(97.0, 99.9), 1)
        
        # Fraud detection - mostly false, but some true
        claim_fraud_indicator = random.choice([False] * 95 + [True] * 5)  # 5% suspicious
        
        customer_rating = round(random.uniform(4.0, 5.0), 1)
        total_claims = random.randint(0, 5)
        premium_weekly = random.randint(100, 200)
        zone_safety_score = random.randint(50, 80)
        
        records.append({
            'worker_id': worker_id,
            'worker_name': worker_name,
            'platform': platform,
            'city': city,
            'delivery_type': delivery_type,
            'age_group': age_group,
            'experience_months': experience_months,
            'weekly_avg_earnings': weekly_avg_earnings,
            'subscription_status': subscription_status,
            'risk_score': risk_score,
            'disruption_type': disruption_type,
            'disruption_date': disruption_date,
            'disruption_intensity': disruption_intensity,
            'income_loss_percentage': income_loss_percentage,
            'claim_amount': claim_amount,
            'claim_status': claim_status,
            'claim_approved_amount': claim_approved_amount,
            'days_worked_weekly': days_worked_weekly,
            'avg_delivery_distance_km': avg_delivery_distance_km,
            'vehicle_type': vehicle_type,
            'zone_id': zone_id,
            'weather_condition': weather_condition,
            'pollution_index': pollution_index,
            'gps_accuracy_percent': gps_accuracy_percent,
            'claim_fraud_indicator': str(claim_fraud_indicator).lower(),
            'approval_date': approval_date,
            'payout_date': payout_date,
            'customer_rating': customer_rating,
            'total_claims': total_claims,
            'premium_weekly': premium_weekly,
            'zone_safety_score': zone_safety_score
        })
    
    return records

# Generate 5000 records
print("Generating 5000 worker records...")
dataset = generate_dataset(5000)

# Write to CSV
output_file = 'gig_workers_dataset_5000.csv'
fieldnames = [
    'worker_id', 'worker_name', 'platform', 'city', 'delivery_type', 'age_group',
    'experience_months', 'weekly_avg_earnings', 'subscription_status', 'risk_score',
    'disruption_type', 'disruption_date', 'disruption_intensity', 'income_loss_percentage',
    'claim_amount', 'claim_status', 'claim_approved_amount', 'days_worked_weekly',
    'avg_delivery_distance_km', 'vehicle_type', 'zone_id', 'weather_condition',
    'pollution_index', 'gps_accuracy_percent', 'claim_fraud_indicator', 'approval_date',
    'payout_date', 'customer_rating', 'total_claims', 'premium_weekly', 'zone_safety_score'
]

with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(dataset)

print(f"✓ Dataset created successfully: {output_file}")
print(f"✓ Total records: {len(dataset)}")
print(f"\nDataset summary:")
print(f"- Worker IDs: W0001 to W{len(dataset):04d}")
print(f"- Date range: 2026-03-01 to 2026-04-15")
print(f"- Platforms: {', '.join(set([r['platform'] for r in dataset]))}")
print(f"- Cities: {', '.join(set([r['city'] for r in dataset]))}")
