from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile


def ensure_upload_dir(upload_dir: str) -> Path:
    path = Path(upload_dir)
    path.mkdir(parents=True, exist_ok=True)
    return path


async def save_upload_file(file: UploadFile, upload_dir: str) -> str:
    folder = ensure_upload_dir(upload_dir)
    suffix = Path(file.filename or "").suffix.lower()
    unique_name = f"{uuid4().hex}{suffix}"
    destination = folder / unique_name
    content = await file.read()
    destination.write_bytes(content)
    return f"/uploads/{unique_name}"


def delete_uploaded_file(image_url: str, upload_dir: str) -> None:
    if not image_url:
        return

    filename = Path(image_url).name
    if not filename:
        return

    file_path = Path(upload_dir) / filename
    if file_path.exists():
        file_path.unlink()


def allowed_upload(filename: str) -> bool:
    return Path(filename).suffix.lower() in {".jpg", ".jpeg", ".png", ".pdf"}
