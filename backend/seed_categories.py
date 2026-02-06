import os
import django
import sys

# Add the project root to the python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "job_board.settings")
django.setup()

from jobs.models import Category

DEFAULT_CATEGORIES = [
    'Engineering',
    'Design',
    'Product',
    'Marketing',
    'Sales',
    'Customer Support',
    'Data Science',
    'Finance',
    'HR',
    'Operations'
]

def seed_categories():
    print("Seeding categories...")
    count = 0
    for name in DEFAULT_CATEGORIES:
        category, created = Category.objects.get_or_create(name=name)
        if created:
            print(f"Created category: {name}")
            count += 1
        else:
            print(f"Category already exists: {name}")
    print(f"Seeding complete. Created {count} new categories.")

if __name__ == "__main__":
    seed_categories()
