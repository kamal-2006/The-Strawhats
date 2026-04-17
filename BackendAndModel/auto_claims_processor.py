# ================================
# AUTOMATIC CLAIMS PROCESSOR
# Automatically validates, approves, and stores claims in MongoDB (optional)
# Falls back to in-memory storage if MongoDB unavailable
# ================================

try:
    from pymongo import MongoClient
    from pymongo.errors import ConnectionFailure
    HAS_PYMONGO = True
except ImportError:
    HAS_PYMONGO = False
    print("⚠️  PyMongo not installed - running in memory mode without MongoDB persistence")

from datetime import datetime
import pandas as pd
import json
import uuid
from typing import Dict, List, Optional, Tuple

# ================================
# MONGODB CONNECTION
# ================================

class AutoClaimsProcessor:
    """
    Handles automatic claims processing with MongoDB storage.
    """
    
    def __init__(
        self, 
        mongo_uri: str = "mongodb://localhost:27017",
        db_name: str = "gigshield",
        auto_approve: bool = True
    ):
        """
        Initialize the auto claims processor.
        
        Args:
            mongo_uri: MongoDB connection string
            db_name: Database name
            auto_approve: Whether to auto-approve eligible claims
        """
        self.mongo_uri = mongo_uri
        self.db_name = db_name
        self.auto_approve = auto_approve
        self.client = None
        self.db = None
        self.connect()
    
    def connect(self) -> bool:
        """Connect to MongoDB."""
        try:
            if not HAS_PYMONGO:
                print("⚠️  PyMongo not available - MongoDB disabled")
                self.db = None
                return False
            
            self.client = MongoClient(self.mongo_uri, serverSelectionTimeoutMS=5000)
            self.client.admin.command('ping')
            self.db = self.client[self.db_name]
            self._create_collections()
            print("✅ MongoDB connected successfully")
            return True
        except Exception as e:
            print(f"[WARNING] MongoDB not available: {str(e)}")
            print("[INFO] Running in memory mode (no data persistence)")
            self.db = None
            return False
    
    def _create_collections(self):
        """Create required MongoDB collections if they don't exist."""
        if self.db is None:
            return
        
        # Create collections with indexes
        collections = {
            'claims': [
                'claim_id',
                'worker_id',
                'status',
                'created_at',
                'approved_at'
            ],
            'approvals': [
                'approval_id',
                'claim_id',
                'worker_id',
                'created_at'
            ],
            'processing_logs': [
                'log_id',
                'claim_id',
                'created_at'
            ]
        }
        
        for collection_name, indexes in collections.items():
            if collection_name not in self.db.list_collection_names():
                self.db.create_collection(collection_name)
                # Create indexes
                for index in indexes:
                    self.db[collection_name].create_index(index)
    
    def validate_claim_data(self, claim_data: Dict) -> Tuple[bool, str]:
        """
        Validate claim data for completeness and correctness.
        
        Args:
            claim_data: Dictionary containing claim information
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        required_fields = {
            'worker_id': str,
            'platform': str,
            'city': str,
            'weekly_avg_earnings': (int, float),
            'disruption_type': str,
            'disruption_intensity': str,
            'income_loss_percentage': (int, float),
        }
        
        for field, expected_type in required_fields.items():
            if field not in claim_data:
                return False, f"Missing required field: {field}"
            
            if not isinstance(claim_data[field], expected_type):
                return False, f"Invalid type for {field}: expected {expected_type}"
        
        # Validate value ranges
        if not (0 <= claim_data['income_loss_percentage'] <= 100):
            return False, "income_loss_percentage must be between 0 and 100"
        
        if claim_data['weekly_avg_earnings'] < 0:
            return False, "weekly_avg_earnings must be positive"
        
        return True, "Valid"
    
    def create_claim(
        self,
        claim_data: Dict,
        auto_validate: bool = True
    ) -> Optional[Dict]:
        """
        Create a new claim record (auto-populated from provided data).
        
        Args:
            claim_data: Dictionary containing claim information
            auto_validate: Whether to validate data automatically
            
        Returns:
            Created claim document or None if validation fails
        """
        # Validate data
        if auto_validate:
            is_valid, error_msg = self.validate_claim_data(claim_data)
            if not is_valid:
                print(f"[ERROR] Validation failed for claim: {error_msg}")
                return None
        
        # Create claim record
        claim_record = {
            'claim_id': str(uuid.uuid4()),
            'worker_id': claim_data.get('worker_id'),
            'worker_name': claim_data.get('worker_name', 'N/A'),
            'platform': claim_data.get('platform'),
            'city': claim_data.get('city'),
            'delivery_type': claim_data.get('delivery_type', 'N/A'),
            'age_group': claim_data.get('age_group', 'N/A'),
            'experience_months': claim_data.get('experience_months', 0),
            'weekly_avg_earnings': claim_data.get('weekly_avg_earnings'),
            'subscription_status': claim_data.get('subscription_status', 'active'),
            'risk_score': claim_data.get('risk_score', 50),
            'disruption_type': claim_data.get('disruption_type'),
            'disruption_intensity': claim_data.get('disruption_intensity'),
            'income_loss_percentage': claim_data.get('income_loss_percentage'),
            'weather_condition': claim_data.get('weather_condition', 'Unknown'),
            'pollution_index': claim_data.get('pollution_index', 'Normal'),
            'gps_accuracy_percent': claim_data.get('gps_accuracy_percent', 95),
            'zone_safety_score': claim_data.get('zone_safety_score', 70),
            'claim_fraud_indicator': claim_data.get('claim_fraud_indicator', False),
            'days_worked_weekly': claim_data.get('days_worked_weekly', 6),
            'avg_delivery_distance_km': claim_data.get('avg_delivery_distance_km', 3),
            'customer_rating': claim_data.get('customer_rating', 4.5),
            'status': 'created',
            'validation_status': 'passed' if auto_validate else 'pending',
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat(),
            'processed_at': None,
            'approved_at': None
        }
        
        # Store in MongoDB if connected
        if self.db is not None:
            try:
                result = self.db.claims.insert_one(claim_record)
                claim_record['_id'] = str(result.inserted_id)
            except Exception as e:
                print(f"[WARNING] MongoDB insert error: {str(e)}")
        
        return claim_record
    
    def validate_disruption(self, claim_data: Dict) -> Tuple[float, Dict]:
        """
        Validate disruption eligibility (Stage 1).
        Called from Flask API with model predictions.
        
        Args:
            claim_data: Claim dictionary with disruption detection result
            
        Returns:
            Tuple of (eligibility_score, validation_details)
        """
        disruption_type = claim_data.get('disruption_type', '').lower()
        intensity = claim_data.get('disruption_intensity', 'low').lower()
        zone_safety = claim_data.get('zone_safety_score', 70)
        
        # Default eligibility score
        eligible_score = 0.0
        
        # Disruption type mapping
        disruption_weights = {
            'heavy rain': 0.95,
            'flooding': 0.98,
            'extreme heat': 0.85,
            'severe cold': 0.80,
            'dust storm': 0.75,
            'fog': 0.70,
            'hail': 0.80,
            'landslide': 0.90,
            'fire': 0.85,
        }
        
        # Intensity multipliers
        intensity_multipliers = {
            'low': 0.6,
            'medium': 0.85,
            'high': 1.0,
            'severe': 1.1
        }
        
        # Calculate eligibility
        base_score = disruption_weights.get(disruption_type, 0.3)
        intensity_mult = intensity_multipliers.get(intensity, 0.7)
        
        # Apply zone safety discount (safer areas = lower eligibility)
        safety_factor = 1.0 if zone_safety < 75 else 0.85
        
        eligible_score = min(1.0, base_score * intensity_mult * safety_factor)
        
        details = {
            'disruption_type': disruption_type,
            'intensity': intensity,
            'base_score': base_score,
            'intensity_multiplier': intensity_mult,
            'safety_factor': safety_factor,
            'final_score': eligible_score,
            'eligible': eligible_score >= 0.6,
            'reason': f"Disruption: {disruption_type}, Intensity: {intensity}"
        }
        
        return eligible_score, details
    
    def calculate_payout(self, claim_data: Dict) -> Tuple[float, Dict]:
        """
        Calculate automatic payout (Stage 2).
        Called from Flask API with model predictions.
        
        Args:
            claim_data: Claim dictionary with payout data
            
        Returns:
            Tuple of (payout_amount, calculation_details)
        """
        earnings = float(claim_data.get('weekly_avg_earnings', 0))
        income_loss = float(claim_data.get('income_loss_percentage', 0)) / 100
        days_worked = float(claim_data.get('days_worked_weekly', 6))
        experience = float(claim_data.get('experience_months', 0))
        rating = float(claim_data.get('customer_rating', 4.0))
        fraud_flag = bool(claim_data.get('claim_fraud_indicator', False))
        risk_score = float(claim_data.get('risk_score', 50))
        
        # Base calculation
        daily_rate = earnings / 7
        base_payout = daily_rate * income_loss * days_worked
        
        # Adjustments
        adjustments = {
            'experience_bonus': 1.0,
            'rating_factor': 1.0,
            'fraud_penalty': 1.0,
            'risk_factor': 1.0
        }
        
        # Experience bonus: more experience = higher payout
        if experience >= 36:
            adjustments['experience_bonus'] = 1.15  # +15%
        elif experience >= 24:
            adjustments['experience_bonus'] = 1.10  # +10%
        elif experience >= 12:
            adjustments['experience_bonus'] = 1.05  # +5%
        
        # Rating factor: higher rating = higher payout
        if rating >= 4.8:
            adjustments['rating_factor'] = 1.10
        elif rating >= 4.5:
            adjustments['rating_factor'] = 1.05
        elif rating < 3.5:
            adjustments['rating_factor'] = 0.90
        
        # Fraud penalty
        if fraud_flag:
            adjustments['fraud_penalty'] = 0.5  # 50% reduction
        
        # Risk factor: higher risk = lower payout
        if risk_score < 45:
            adjustments['risk_factor'] = 0.95
        elif risk_score > 70:
            adjustments['risk_factor'] = 1.05
        
        # Calculate final payout
        final_payout = base_payout
        for adjustment in adjustments.values():
            final_payout *= adjustment
        
        # Cap at maximum
        max_payout = earnings * 0.5  # Max 50% of weekly earnings
        final_payout = min(final_payout, max_payout)
        
        # Round to 2 decimals
        final_payout = round(final_payout, 2)
        
        details = {
            'daily_rate': round(daily_rate, 2),
            'income_loss_percentage': claim_data.get('income_loss_percentage', 0),
            'base_payout': round(base_payout, 2),
            'experience_bonus': adjustments['experience_bonus'],
            'rating_factor': adjustments['rating_factor'],
            'fraud_penalty': adjustments['fraud_penalty'],
            'risk_factor': adjustments['risk_factor'],
            'final_payout': final_payout,
            'max_payout': round(max_payout, 2),
            'calculation': {
                'step1': 'daily_rate × income_loss % × days_worked = base_payout',
                'step2': 'base_payout × adjustments = final_payout',
                'step3': f'min(final_payout, {round(max_payout, 2)}) = {final_payout}'
            }
        }
        
        return final_payout, details
    
    def auto_approve_claim(
        self,
        claim_data: Dict,
        disruption_score: float,
        payout_amount: float,
        approval_threshold: float = 0.6
    ) -> Dict:
        """
        Automatically approve or reject claim based on criteria.
        
        Args:
            claim_data: Claim dictionary
            disruption_score: Eligibility score from Stage 1
            payout_amount: Calculated payout from Stage 2
            approval_threshold: Minimum disruption score for approval
            
        Returns:
            Approval decision dictionary
        """
        # Approval rules
        is_approved = (
            disruption_score >= approval_threshold and
            payout_amount > 0 and
            not claim_data.get('claim_fraud_indicator', False)
        )
        
        approval_reason = ""
        if disruption_score < approval_threshold:
            approval_reason += f"Disruption score {disruption_score:.2f} < {approval_threshold}. "
        if payout_amount <= 0:
            approval_reason += "Payout amount is zero or negative. "
        if claim_data.get('claim_fraud_indicator', False):
            approval_reason += "Fraud indicator present. "
        
        if not approval_reason:
            approval_reason = f"Automatic approval: disruption score {disruption_score:.2f}, payout ₹{payout_amount:.2f}"
        
        approval = {
            'approval_id': str(uuid.uuid4()),
            'claim_id': claim_data.get('claim_id'),
            'worker_id': claim_data.get('worker_id'),
            'approved': is_approved,
            'disruption_score': disruption_score,
            'payout_approved': payout_amount if is_approved else 0,
            'approval_reason': approval_reason,
            'approval_type': 'automatic',
            'created_at': datetime.utcnow().isoformat(),
            'timestamp': datetime.utcnow()
        }
        
        # Store in MongoDB if connected
        if self.db is not None:
            try:
                self.db.approvals.insert_one(approval)
            except Exception as e:
                print(f"[WARNING] MongoDB approval storage error: {str(e)}")
        
        return approval
    
    def process_batch_claims(
        self,
        claims_list: List[Dict],
        disruption_scores: List[float],
        payout_amounts: List[float]
    ) -> Dict:
        """
        Process multiple claims automatically.
        
        Args:
            claims_list: List of claim dictionaries
            disruption_scores: List of disruption eligibility scores
            payout_amounts: List of calculated payout amounts
            
        Returns:
            Processing summary dictionary
        """
        results = {
            'total_claims': len(claims_list),
            'processed_claims': 0,
            'approved_claims': 0,
            'rejected_claims': 0,
            'total_payout': 0.0,
            'claims': [],
            'summary': {},
            'processing_timestamp': datetime.utcnow().isoformat()
        }
        
        for i, claim_data in enumerate(claims_list):
            try:
                disruption_score = disruption_scores[i] if i < len(disruption_scores) else 0.5
                payout_amount = payout_amounts[i] if i < len(payout_amounts) else 0
                
                # Auto approve
                approval = self.auto_approve_claim(
                    claim_data,
                    disruption_score,
                    payout_amount
                )
                
                claim_result = {
                    'claim_id': claim_data.get('claim_id'),
                    'worker_id': claim_data.get('worker_id'),
                    'approved': approval['approved'],
                    'payout_approved': approval['payout_approved'],
                    'reason': approval['approval_reason']
                }
                
                results['claims'].append(claim_result)
                results['processed_claims'] += 1
                
                if approval['approved']:
                    results['approved_claims'] += 1
                    results['total_payout'] += approval['payout_approved']
                else:
                    results['rejected_claims'] += 1
                    
            except Exception as e:
                print(f"Error processing claim {i}: {e}")
                continue
        
        # Calculate summary statistics
        if results['processed_claims'] > 0:
            results['summary'] = {
                'approval_rate': f"{(results['approved_claims'] / results['processed_claims'] * 100):.1f}%",
                'average_payout': round(results['total_payout'] / (results['approved_claims'] or 1), 2),
                'total_approved': results['approved_claims'],
                'total_rejected': results['rejected_claims'],
                'total_payout': round(results['total_payout'], 2)
            }
        
        # Store batch log in MongoDB
        if self.db is not None:
            try:
                log_entry = {
                    'log_id': str(uuid.uuid4()),
                    'batch_size': len(claims_list),
                    'approved': results['approved_claims'],
                    'rejected': results['rejected_claims'],
                    'total_payout': results['total_payout'],
                    'created_at': datetime.utcnow()
                }
                self.db.processing_logs.insert_one(log_entry)
            except Exception as e:
                print(f"[WARNING] MongoDB log storage error: {str(e)}")
        
        return results
    
    def get_processing_stats(self) -> Dict:
        """Get processing statistics from MongoDB."""
        if self.db is None:
            return {'status': 'MongoDB not connected'}
        
        try:
            stats = {
                'total_claims': self.db.claims.count_documents({}),
                'total_approvals': self.db.approvals.count_documents({}),
                'total_logs': self.db.processing_logs.count_documents({}),
                'approved_count': self.db.approvals.count_documents({'approved': True}),
                'rejected_count': self.db.approvals.count_documents({'approved': False}),
            }
            
            # Calculate average payout
            approvals = list(
                self.db.approvals.find(
                    {'approved': True},
                    {'payout_approved': 1}
                )
            )
            
            if approvals:
                avg_payout = sum(a['payout_approved'] for a in approvals) / len(approvals)
                stats['average_approved_payout'] = round(avg_payout, 2)
                stats['total_payout'] = round(sum(a['payout_approved'] for a in approvals), 2)
            
            return stats
            
        except Exception as e:
            return {'error': str(e)}


# ================================
# SINGLETON INSTANCE
# ================================

_processor_instance = None

def get_processor() -> AutoClaimsProcessor:
    """Get or create the processor singleton."""
    global _processor_instance
    if _processor_instance is None:
        _processor_instance = AutoClaimsProcessor()
    return _processor_instance
