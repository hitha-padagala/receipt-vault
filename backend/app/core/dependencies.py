from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User

def get_current_user(db: Session = Depends(get_db)) -> User:
    demo_email = "demo@receiptvault.local"
    user = db.query(User).filter(User.email == demo_email).first()
    if user is None:
        user = User(email=demo_email, hashed_password="demo")
        db.add(user)
        db.commit()
        db.refresh(user)
    return user
