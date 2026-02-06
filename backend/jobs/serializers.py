from rest_framework import serializers
from .models import Job, Category, Application
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('posted_by', 'posted_at', 'updated_at')

class ApplicationSerializer(serializers.ModelSerializer):
    applicant = UserSerializer(read_only=True)
    job_details = JobSerializer(source='job', read_only=True)
    job_id = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(), source='job', write_only=True
    )

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('applicant', 'applied_at', 'job')

    def validate(self, data):
        # Prevent double application
        request = self.context.get('request')
        if request and request.method == 'POST':
            job = data.get('job')
            user = request.user
            if Application.objects.filter(job=job, applicant=user).exists():
                raise serializers.ValidationError("You have already applied for this job.")
        return data
