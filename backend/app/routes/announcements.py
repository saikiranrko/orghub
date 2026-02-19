from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from database import get_db
from app.models.models import Announcement

router = APIRouter()

@router.get("/")
def get_announcements(db: Session = Depends(get_db)):
    return db.query(Announcement).order_by(Announcement.is_pinned.desc(), Announcement.created_at.desc()).all()

@router.post("/")
def create_announcement(title: str, content: str, is_pinned: bool = False, author_id: int = 1, db: Session = Depends(get_db)):
    ann = Announcement(title=title, content=content, is_pinned=is_pinned, author_id=author_id)
    db.add(ann)
    db.commit()
    db.refresh(ann)
    return ann

@router.delete("/{ann_id}")
def delete_announcement(ann_id: int, db: Session = Depends(get_db)):
    ann = db.query(Announcement).filter(Announcement.id == ann_id).first()
    if not ann:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(ann)
    db.commit()
    return {"message": "Deleted"}
