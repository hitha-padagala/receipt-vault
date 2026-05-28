"""add cloudinary public id to receipts

Revision ID: 0002_add_cloudinary_public_id
Revises: 0001_initial
Create Date: 2026-05-27
"""

from alembic import op
import sqlalchemy as sa

revision = "0002_add_cloudinary_public_id"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "receipts",
        sa.Column("cloudinary_public_id", sa.String(length=500), nullable=True),
    )
    op.execute(
        sa.text(
            "UPDATE receipts SET cloudinary_public_id = image_url WHERE cloudinary_public_id IS NULL"
        )
    )
    op.alter_column("receipts", "cloudinary_public_id", nullable=False)


def downgrade() -> None:
    op.drop_column("receipts", "cloudinary_public_id")
