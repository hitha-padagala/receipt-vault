from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.receipt import Receipt
from app.models.user import User

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/summary")
async def summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total_receipts = db.query(func.count(Receipt.id)).filter(Receipt.user_id == current_user.id).scalar() or 0
    total_spending = db.query(func.coalesce(func.sum(Receipt.amount), 0)).filter(Receipt.user_id == current_user.id).scalar() or 0
    return {"success": True, "total_receipts": total_receipts, "total_spending": float(total_spending)}
