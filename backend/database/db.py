# postgres database libraries in python
from psycopg2 import pool 
from psycopg2.extras import RealDictCursor

# for environment variable 'DB_PASSWORD'
import os

# data models 
from models import User, Location

# for specifying List return type in functions
from typing import List

DB_HOST = "localhost"
DB_NAME = "pathfinder_db"
DB_USER = "postgres"
DB_PASSWORD = os.environ['DB_PASSWORD'] # set your environment variable in cmd using 'set DB_PASSWORD=passwd123' before running it

# defining the connection pool (its just like the thread pool)
conn_pool = pool.SimpleConnectionPool(
    1, 20,
    host=DB_HOST,
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)

def createUser(user: User):
    try:
        conn = conn_pool.getconn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("INSERT INTO users (id, name, reputation, created_at) VALUES (%s, %s, %s, %s);",
                    (user.id, user.name, user.reputation, user.created_at))
        conn.commit()
        # conn_pool.putconn(conn)
    except Exception as e:
        print("Error: ", e)    
    finally:
        if cur: 
            cur.close()
        if conn:
            conn_pool.putconn(conn)

# function to get a user from the database from its id
def getUser(id: str) -> User:
    # user dataclass where we store all the attributes (columns from the table 'users') of the user
    user: User = User()

    try:
        conn = conn_pool.getconn()
        cur = conn.cursor(cursor_factory=RealDictCursor) # RealDictCursor is just to get the results from the db in python dictionary
        cur.execute("SELECT * FROM users WHERE id = %s;",
                    (id,))
        rows = cur.fetchall() # only single row will be fetched 

        for row in rows:
            user.id = row['id']
            user.name = row['name']
            user.reputation = row['reputation']
            user.created_at = row['created_at']
    except Exception as e: # in case any error occurs
        print("Error: ", e)    
    finally:
        # if everything goes fine, return the 'user'
        return user
    
def getUsers() -> List[User]:
    users: List[User] = []
    try:
        conn = conn_pool.getconn()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("SELECT * FROM users;")
        rows = cur.fetchall()

        for row in rows:
            user = User(id=row['id'],
                        name=row['name'],
                        reputation=row['reputation'],
                        created_at=row['created_at'])
            
            users.append(user)
    except Exception as e:
        print("Error: ", e)
    finally:
        if cur:
            cur.close()
        if conn:
            conn_pool.putconn(conn)
        return users
    
def putLocation(location: Location):
    try:
        id = location.location_id

        conn = conn_pool.getconn()
        cur = conn.cursor()

        cur.execute("SELECT * FROM location WHERE id = %s;", (id,))
        rows = cur.fetchall()
        if len(rows) == 0:
            try:
                cur.execute("INSERT INTO location (id) VALUES (%s);", (location.location_id,))

                conn.commit()

                cur.execute("""INSERT INTO posts (posted_by, location_id, images_dir, text_descr, surface_damage,
                traffic_safety_risk, ride_discomfort, waterlogging, urgency_for_repair, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);""", 
                (location.posted_by, location.location_id, location.images_dir, location.text_descr, location.surface_damage,
                location.traffic_safety_risk, location.ride_discomfort, location.waterlogging, location.urgency_for_repair, location.created_at))

                conn.commit()

                cur.execute("""UPDATE location_scores SET surface_damage = surface_damage + %s,
                traffic_safety_risk = traffic_safety_risk + %s, ride_discomfort = ride_discomfort + %s, waterlogging = waterlogging + %s
                urgency_for_repair = urgency_for_repair + %s, posts=posts+1 WHERE id = %s;""", (location.surface_damage, location.traffic_safety_risk,
                                                                                location.ride_discomfort, location.waterlogging, 
                                                                                location.urgency_for_repair, location.location_id))
                
                conn.commit()

                cur.execute("UPDATE location SET posts = posts + 1 WHERE id = %s;", (location.location_id,))
                conn.commit()

            except Exception as e:
                print("Error: ", e)

        else:
            try:
                cur.execute("""INSERT INTO posts (posted_by, location_id, images_dir, text_descr, surface_damage
                traffic_safety_risk, ride_discomfort, waterlogging, urgency_for_repair, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);""", 
                (location.posted_by, location.location_id, location.images_dir, location.text_descr, location.surface_damage,
                location.traffic_safety_risk, location.ride_discomfort, location.waterlogging, location.urgency_for_repair, location.created_at))

                conn.commit()

                cur.execute("""UPDATE location_scores SET surface_damage = surface_damage + %s,
                traffic_safety_risk = traffic_safety_risk + %s, ride_discomfort = ride_discomfort + %s, waterlogging = waterlogging + %s
                urgency_for_repair = urgency_for_repair + %s, posts = posts+1 WHERE id = %s;""", (location.surface_damage, location.traffic_safety_risk,
                                                                                location.ride_discomfort, location.waterlogging, 
                                                                                location.urgency_for_repair, location.location_id))
                
                conn.commit()
                cur.execute("UPDATE location SET posts = posts + 1 WHERE id = %s;", (location.location_id,))

                conn.commit()
            except Exception as e:
                print("Error: ", e)

    except Exception as e:
        print("Error: ", e)

    finally:
        if cur:
            cur.close()
        if conn:
            conn_pool.putconn(conn)

def getLocation(id: str) -> Location:
    
    try:
        conn = conn_pool.getconn()
        cur = conn.cursor()

        cur.execute("SELECT * FROM location_scores WHERE id = %s;", (id,))
        rows = cur.fetchall()

        if len(rows) != 0:
            row = rows[0]

            n = row['posts']

            location = Location(location_id=row['location_id'], surface_damage=row['surface_damage']/n, traffic_safety_risk=
                                row['traffic_safety_risk']/n, ride_discomfort=row['ride_discomfort']/n, waterlogging=row['waterlogging']/n,
                                urgency_for_repair=row['urgency_for_repair']/n)
            
    except Exception as e:
        print("Error: ", e)

    finally:
        if cur:
            cur.close()

        if conn:
            conn_pool.putconn(conn)
        
        return location
