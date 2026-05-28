from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    DATABASE_URL: str = "postgresql+psycopg://receipt_user:receipt123@localhost:5432/receipt_vault"
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    SECRET_KEY: str = "change-me-in-local-dev"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALGORITHM: str = "HS256"
    CLOUDINARY_FOLDER: str = "receipt-vault/receipts"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
