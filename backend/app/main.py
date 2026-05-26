from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.analytics import router as analytics_router
from app.api.routes.auth import router as auth_router
from app.api.routes.receipts import router as receipts_router
from app.core.database import Base, engine
from app.models import receipt, user  # noqa: F401

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Receipt Vault API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(receipts_router)
app.include_router(analytics_router)


@app.get("/health")
async def health():
    return {"success": True, "status": "ok"}
