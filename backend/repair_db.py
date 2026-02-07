import os
import django
import sys
from django.db import connection

# Add the project root to the python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "job_board.settings")
django.setup()

def repair_db():
    print("Checking database schema for missing columns...")
    
    # Columns to check in jobs_job table
    # (column_name, data_type, default_clause)
    columns_to_check = [
        ('requirements', 'text', "DEFAULT ''"),
        ('currency', 'varchar(10)', "DEFAULT 'USD'"),
        ('salary_min', 'integer', "NULL"),
        ('salary_max', 'integer', "NULL"),
        ('experienceLevel', 'varchar(20)', "DEFAULT 'entry'"),
    ]
    
    with connection.cursor() as cursor:
        # Get existing columns
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'jobs_job';
        """)
        existing_columns = [row[0] for row in cursor.fetchall()]
        print(f"Existing columns in jobs_job: {existing_columns}")
        
        for col_name, data_type, default_clause in columns_to_check:
            # Check mixed case column names carefully. 
            # In Postgres information_schema, unquoted columns are lowercase.
            # But if created with quotes, they preserve case.
            # We'll check case-insensitively first, then assume specific handling.
            
            # Simple check: is the column name in the list (case insensitive match for safety)
            is_present = any(c.lower() == col_name.lower() for c in existing_columns)
            
            if not is_present:
                print(f"Column '{col_name}' is MISSING. Adding it...")
                try:
                    # Use double quotes for column name to preserve case if needed (like experienceLevel)
                    # But for now, let's use the field name as is.
                    # Note: Django usually creates 'experienceLevel' as 'experienceLevel' if not db_column set? 
                    # Actually, standard django converts camelCase to snake_case? 
                    # Let's check the model definition again.
                    # experienceLevel = models.CharField(...) -> Django uses 'experienceLevel' as column name?
                    # No, Django uses the field name as the column name by default.
                    
                    alter_query = f'ALTER TABLE jobs_job ADD COLUMN "{col_name}" {data_type} {default_clause};'
                    print(f"Executing: {alter_query}")
                    cursor.execute(alter_query)
                    print(f"Successfully added column '{col_name}'.")
                except Exception as e:
                    print(f"Error adding column '{col_name}': {e}")
            else:
                print(f"Column '{col_name}' exists.")

    print("Database schema check complete.")

if __name__ == "__main__":
    repair_db()
