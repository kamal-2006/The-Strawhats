# ================================
# PARAMETRIC INSURANCE MODEL TRAINING
# Two-Stage Pipeline: Disruption Detection + Claim Amount Calculation
# ================================

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score, classification_report, confusion_matrix
import pickle
import json

print("=" * 80)
print("PARAMETRIC INSURANCE MODEL TRAINING")
print("=" * 80)

# ================================
# 1. LOAD DATA
# ================================
print("\n[STEP 1] Loading dataset...")
data = pd.read_csv('gig_workers_dataset_5000.csv')
print(f"Dataset shape: {data.shape}")
print(f"Columns: {list(data.columns)}")

# ================================
# 2. CREATE DISRUPTION ELIGIBILITY LABEL
# ================================
print("\n[STEP 2] Creating disruption eligibility labels...")

# A claim is "eligible" if disruption_type is not null and has known impact
ELIGIBLE_DISRUPTION_TYPES = [
    'Extreme Conditions', 'Flooding', 'Heat Wave', 'Extreme Heat', 
    'Extreme Heat Wave', 'Zone Lockdown', 'Extreme Rain', 'Flash Flood', 
    'Heavy Pollution', 'Pollution Spike', 'Street Closure', 'Heavy Rain',
    'Curfew Lockdown', 'App Crash', 'Internet Outage', 'Strike'
]

data['is_eligible'] = data['disruption_type'].isin(ELIGIBLE_DISRUPTION_TYPES).astype(int)

print(f"Eligible claims: {data['is_eligible'].sum()} / {len(data)}")

# ================================
# 3. DATA PREPROCESSING
# ================================
print("\n[STEP 3] Data preprocessing...")

# Create a copy for modeling
data_model = data.copy()

# Drop unnecessary columns that won't be available at prediction time
data_model = data_model.drop(columns=[
    'worker_id', 'worker_name', 'approval_date', 'payout_date',
    'claim_status', 'claim_approved_amount'  # These are outcomes, not inputs
])

# Handle missing values
data_model = data_model.fillna({
    'disruption_date': data_model['disruption_date'].mode()[0] if not data_model['disruption_date'].isna().all() else '2026-01-01',
    'pollution_index': 'Low',
    'weather_condition': 'Cloudy'
})

# ================================
# 4. FEATURE ENGINEERING FOR DISRUPTION DETECTION MODEL
# ================================
print("\n[STEP 4] Feature engineering...")

# Select features for disruption detection model
disruption_features = [
    'disruption_type', 'disruption_intensity', 
    'weather_condition', 'pollution_index',
    'platform', 'city', 'delivery_type', 
    'zone_safety_score', 'gps_accuracy_percent'
]

claim_features = [
    'income_loss_percentage', 'days_worked_weekly', 
    'avg_delivery_distance_km', 'customer_rating',
    'weekly_avg_earnings', 'experience_months', 'age_group',
    'claim_fraud_indicator'
]

# Prepare X and y for disruption model
X_disruption = data_model[disruption_features].copy()
y_disruption = data_model['is_eligible'].copy()

# Prepare X and y for claim amount model (only eligible claims)
eligible_data = data_model[data_model['is_eligible'] == 1].copy()
X_claim = eligible_data[claim_features].copy()
y_claim = eligible_data['claim_amount'].copy()

print(f"Disruption model - X shape: {X_disruption.shape}, y shape: {y_disruption.shape}")
print(f"Claim model - X shape: {X_claim.shape}, y shape: {y_claim.shape}")

# ================================
# 5. ENCODE CATEGORICAL VARIABLES
# ================================
print("\n[STEP 5] Encoding categorical variables...")

# Encoders for disruption model
label_encoders_disruption = {}
categorical_cols_disruption = X_disruption.select_dtypes(include=['object']).columns

for col in categorical_cols_disruption:
    le = LabelEncoder()
    X_disruption[col] = le.fit_transform(X_disruption[col].astype(str))
    label_encoders_disruption[col] = le

# Encoders for claim model
label_encoders_claim = {}
categorical_cols_claim = X_claim.select_dtypes(include=['object']).columns

for col in categorical_cols_claim:
    le = LabelEncoder()
    X_claim[col] = le.fit_transform(X_claim[col].astype(str))
    label_encoders_claim[col] = le

print(f"Disruption model encoders: {len(label_encoders_disruption)}")
print(f"Claim model encoders: {len(label_encoders_claim)}")

# ================================
# 6. TRAIN TEST SPLIT
# ================================
print("\n[STEP 6] Train-test split...")

X_train_disrupt, X_test_disrupt, y_train_disrupt, y_test_disrupt = train_test_split(
    X_disruption, y_disruption, test_size=0.2, random_state=42, stratify=y_disruption
)

X_train_claim, X_test_claim, y_train_claim, y_test_claim = train_test_split(
    X_claim, y_claim, test_size=0.2, random_state=42
)

print(f"Disruption - Train: {X_train_disrupt.shape}, Test: {X_test_disrupt.shape}")
print(f"Claim - Train: {X_train_claim.shape}, Test: {X_test_claim.shape}")

# ================================
# 7. TRAIN DISRUPTION DETECTION MODEL
# ================================
print("\n[STEP 7] Training disruption detection model (Classification)...")

disruption_model = RandomForestClassifier(
    n_estimators=150,
    max_depth=20,
    min_samples_split=5,
    random_state=42,
    n_jobs=-1
)

disruption_model.fit(X_train_disrupt, y_train_disrupt)

# Evaluate disruption model
y_pred_disrupt = disruption_model.predict(X_test_disrupt)
y_pred_proba_disrupt = disruption_model.predict_proba(X_test_disrupt)

print("\n--- Disruption Detection Model Performance ---")
print(classification_report(y_test_disrupt, y_pred_disrupt, 
                            target_names=['Not Eligible', 'Eligible']))

# ================================
# 8. TRAIN CLAIM AMOUNT MODEL
# ================================
print("\n[STEP 8] Training claim amount calculator model (Regression)...")

claim_model = RandomForestRegressor(
    n_estimators=150,
    max_depth=20,
    min_samples_split=5,
    random_state=42,
    n_jobs=-1
)

claim_model.fit(X_train_claim, y_train_claim)

# Evaluate claim model
y_pred_claim = claim_model.predict(X_test_claim)

mae_claim = mean_absolute_error(y_test_claim, y_pred_claim)
r2_claim = r2_score(y_test_claim, y_pred_claim)

print("\n--- Claim Amount Calculator Model Performance ---")
print(f"Mean Absolute Error: ₹{mae_claim:.2f}")
print(f"R² Score: {r2_claim:.4f}")

# ================================
# 9. FEATURE IMPORTANCE
# ================================
print("\n[STEP 9] Feature importance analysis...")

disruption_importance = pd.DataFrame({
    'feature': disruption_features,
    'importance': disruption_model.feature_importances_
}).sort_values('importance', ascending=False)

claim_importance = pd.DataFrame({
    'feature': claim_features,
    'importance': claim_model.feature_importances_
}).sort_values('importance', ascending=False)

print("\n--- Top Features: Disruption Detection ---")
print(disruption_importance.head(10))

print("\n--- Top Features: Claim Amount Calculator ---")
print(claim_importance.head(10))

# ================================
# 10. SAVE MODELS & ENCODERS
# ================================
print("\n[STEP 10] Saving models and encoders...")

with open('disruption_detection_model.pkl', 'wb') as f:
    pickle.dump(disruption_model, f)
print("✓ Disruption detection model saved")

with open('claim_amount_model.pkl', 'wb') as f:
    pickle.dump(claim_model, f)
print("✓ Claim amount model saved")

with open('label_encoders_disruption.pkl', 'wb') as f:
    pickle.dump(label_encoders_disruption, f)
print("✓ Disruption encoders saved")

with open('label_encoders_claim.pkl', 'wb') as f:
    pickle.dump(label_encoders_claim, f)
print("✓ Claim encoders saved")

# Save feature names for inference
with open('model_features.json', 'w') as f:
    json.dump({
        'disruption_features': disruption_features,
        'claim_features': claim_features,
        'disruption_categorical': list(categorical_cols_disruption),
        'claim_categorical': list(categorical_cols_claim)
    }, f, indent=2)
print("✓ Feature mapping saved")

# Save performance metrics
metrics = {
    'disruption_model': {
        'accuracy': (y_pred_disrupt == y_test_disrupt).mean(),
        'eligible_precision': float(disruption_model.predict_proba(X_test_disrupt)[y_pred_disrupt == 1, 1].mean()),
    },
    'claim_model': {
        'mae': float(mae_claim),
        'r2_score': float(r2_claim),
        'training_samples': len(X_train_claim)
    }
}

with open('model_metrics.json', 'w') as f:
    json.dump(metrics, f, indent=2)
print("✓ Metrics saved")

print("\n" + "=" * 80)
print("✅ PARAMETRIC INSURANCE MODELS TRAINED SUCCESSFULLY")
print("=" * 80)
print("\nGenerated files:")
print("  - disruption_detection_model.pkl")
print("  - claim_amount_model.pkl")
print("  - label_encoders_disruption.pkl")
print("  - label_encoders_claim.pkl")
print("  - model_features.json")
print("  - model_metrics.json")
