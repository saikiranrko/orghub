from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from database import get_db
from app.models.models import Department

router = APIRouter()

@router.get("/")
def get_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()

@router.post("/")
def create_department(name: str, description: str = "", db: Session = Depends(get_db)):
    if db.query(Department).filter(Department.name == name).first():
        raise HTTPException(status_code=400, detail="Department already exists")
    dept = Department(name=name, description=description)
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return dept

@router.delete("/{dept_id}")
def delete_department(dept_id: int, db: Session = Depends(get_db)):
    dept = db.query(Department).filter(Department.id == dept_id).first()
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
    db.delete(dept)
    db.commit()
    return {"message": "Deleted"}
