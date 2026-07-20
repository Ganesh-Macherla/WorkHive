import sqlite3

conn = sqlite3.connect("instance/workhive.db")

cursor = conn.cursor()

cursor.execute(
    "DROP TABLE IF EXISTS _alembic_tmp_activity"
)

conn.commit()

conn.close()

print("Temporary table deleted successfully!")