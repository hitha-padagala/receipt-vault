from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field


class ReceiptBase(BaseModel):
    merchant: str
    amount: float = Field(gt=0)
    category: str
    purchase_date: date
    warranty_expiry: Optional[date] = None
    ocr_text: Optional[str] = None


class ReceiptCreate(ReceiptBase):
    image_url: str


class ReceiptUpdate(BaseModel):
    merchant: str
    amount: float = Field(gt=0)
    category: str
    purchase_date: date
    warranty_expiry: Optional[date] = None
    ocr_text: Optional[str] = None


class ReceiptRead(ReceiptBase):
    id: int
    user_id: int
    image_url: str
    cloudinary_public_id: str
    created_at: datetime

    class Config:
        from_attributes = True


class ReceiptListResponse(BaseModel):
    success: bool = True
    data: list[ReceiptRead]
