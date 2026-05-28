from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from datetime import date
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.receipt import Receipt
from app.models.user import User
from app.schemas.receipt import ReceiptRead, ReceiptUpdate
from app.services.cloudinary_service import delete_image, upload_image
from app.services.receipt_service import allowed_upload

router = APIRouter(prefix="/receipts", tags=["receipts"])


@router.post("", response_model=ReceiptRead)
async def create_receipt(
    merchant: str = Form(...),
    amount: float = Form(...),
    category: str = Form(...),
    purchase_date: date = Form(...),
    warranty_expiry: date | None = Form(None),
    ocr_text: str | None = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not allowed_upload(file.filename or ""):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported file type")

    file_bytes = await file.read()
    upload_result = await upload_image(file_bytes, file.filename or "receipt")
    receipt = Receipt(
        user_id=current_user.id,
        merchant=merchant,
        amount=amount,
        category=category,
        purchase_date=purchase_date,
        warranty_expiry=warranty_expiry or None,
        image_url=upload_result["secure_url"],
        cloudinary_public_id=upload_result["public_id"],
        ocr_text=ocr_text,
    )
    db.add(receipt)
    db.commit()
    db.refresh(receipt)
    return receipt


@router.get("", response_model=list[ReceiptRead])
async def list_receipts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Receipt).filter(Receipt.user_id == current_user.id).order_by(Receipt.created_at.desc()).all()


@router.get("/{receipt_id}", response_model=ReceiptRead)
async def get_receipt(
    receipt_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    receipt = db.query(Receipt).filter(Receipt.id == receipt_id, Receipt.user_id == current_user.id).first()
    if not receipt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receipt not found")
    return receipt


@router.delete("/{receipt_id}")
async def delete_receipt(
    receipt_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    receipt = db.query(Receipt).filter(Receipt.id == receipt_id, Receipt.user_id == current_user.id).first()
    if not receipt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receipt not found")
    await delete_image(receipt.cloudinary_public_id)
    db.delete(receipt)
    db.commit()
    return {"success": True}


@router.put("/{receipt_id}", response_model=ReceiptRead)
async def update_receipt(
    receipt_id: int,
    payload: ReceiptUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    receipt = db.query(Receipt).filter(Receipt.id == receipt_id, Receipt.user_id == current_user.id).first()
    if not receipt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Receipt not found")

    receipt.merchant = payload.merchant
    receipt.amount = payload.amount
    receipt.category = payload.category
    receipt.purchase_date = payload.purchase_date
    receipt.warranty_expiry = payload.warranty_expiry
    receipt.ocr_text = payload.ocr_text
    db.commit()
    db.refresh(receipt)
    return receipt
