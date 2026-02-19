from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from app.routes import auth, users, departments, announcements

Base.metadata.create_all(bind=engine)

app = FastAPI(title="OrgHub API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(departments.router, prefix="/api/departments", tags=["Departments"])
app.include_router(announcements.router, prefix="/api/announcements", tags=["Announcements"])

@app.get("/")
def root():
    return {"status": "OrgHub API running"}
