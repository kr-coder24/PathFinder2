from dataclasses import dataclass, field
import datetime

# user dataclass to store the attributes (columns from the users table) of the user 
@dataclass
class User:
    id: str = ""
    name: str = ""
    reputation: int = 0
    created_at: datetime.datetime = field(default_factory=datetime.datetime.now) # if this not used, then all the insert operations will 
    # have datetime of when this class was loaded into the memory

@dataclass 
class Location:
    location_id: str = ""
    images_dir: str = ""
    text_descr: str = ""
    surface_damage: float = 0
    traffic_safety_risk: float = 0
    ride_discomfort: float = 0
    waterlogging: float = 0
    urgency_for_repair: float = 0
    overall_score: float = 0
    posted_by: str = ""
    created_at: datetime.datetime = field(default_factory=datetime.datetime.now)
