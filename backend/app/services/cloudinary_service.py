from __future__ import annotations

from functools import lru_cache
from io import BytesIO
from typing import Any

import cloudinary
import cloudinary.uploader

from app.core.config import settings


@lru_cache
def configure_cloudinary() -> None:
    if not settings.CLOUDINARY_CLOUD_NAME or not settings.CLOUDINARY_API_KEY or not settings.CLOUDINARY_API_SECRET:
        raise RuntimeError(
            "Cloudinary credentials are not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in the environment."
        )
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,
    )


async def upload_image(file_bytes: bytes, filename: str) -> dict[str, Any]:
    configure_cloudinary()
    result = cloudinary.uploader.upload(
        BytesIO(file_bytes),
        folder=settings.CLOUDINARY_FOLDER,
        resource_type="auto",
        use_filename=True,
        unique_filename=True,
        overwrite=False,
    )
    return {
        "secure_url": result["secure_url"],
        "public_id": result["public_id"],
    }


async def delete_image(public_id: str, resource_type: str = "image") -> None:
    configure_cloudinary()
    cloudinary.uploader.destroy(public_id, resource_type=resource_type, invalidate=True)
