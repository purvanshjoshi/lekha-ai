from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, JSON
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class MSME(Base):
    __tablename__ = "msmes"
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    gstin = Column(String, unique=True, index=True)
    email = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    vendors = relationship("Vendor", back_populates="msme")
    invoices = relationship("Invoice", back_populates="msme")

class Vendor(Base):
    __tablename__ = "vendors"
    id = Column(Integer, primary_key=True)
    msme_id = Column(Integer, ForeignKey("msmes.id"))
    name = Column(String)
    gstin = Column(String, index=True)
    reliability_score = Column(Float, default=100.0)
    risk_tag = Column(String) # Green, Amber, Red
    filing_history = Column(JSON) # 12-month pattern
    
    msme = relationship("MSME", back_populates="vendors")
    invoices = relationship("Invoice", back_populates="vendor")

class Invoice(Base):
    __tablename__ = "invoices"
    id = Column(Integer, primary_key=True)
    msme_id = Column(Integer, ForeignKey("msmes.id"))
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    
    invoice_number = Column(String, index=True)
    date = Column(DateTime)
    taxable_value = Column(Float)
    igst = Column(Float, default=0.0)
    cgst = Column(Float, default=0.0)
    sgst = Column(Float, default=0.0)
    total_tax = Column(Float)
    
    source = Column(String) # "GSTR-2A" or "PurchaseRegister"
    status = Column(String) # "Matched", "Missing_In_2A", "Mismatch_Amount", "Timing_Mismatch"
    recon_id = Column(String, index=True) # Logic to group matched pairs
    
    reasoning_trace = Column(String) # XAI - Why was this matched/flagged?
    
    msme = relationship("MSME", back_populates="invoices")
    vendor = relationship("Vendor", back_populates="invoices")

class AuditTrail(Base):
    __tablename__ = "audit_trails"
    id = Column(Integer, primary_key=True)
    msme_id = Column(Integer, ForeignKey("msmes.id"))
    action_type = Column(String) # "Matched", "Notice_Drafted", "Notice_Sent"
    details = Column(JSON)
    timestamp = Column(DateTime, default=datetime.utcnow)
