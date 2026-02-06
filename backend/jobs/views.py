from rest_framework import viewsets, permissions, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job, Category, Application
from .serializers import JobSerializer, CategorySerializer, ApplicationSerializer
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model

User = get_user_model()

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated and request.user.role == 'admin'

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-posted_at')
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'type', 'experienceLevel', 'location', 'is_active']
    search_fields = ['title', 'description', 'company', 'location']
    ordering_fields = ['posted_at', 'salary_min']

    def perform_create(self, serializer):
        if self.request.user.role != 'admin':
             if not self.request.user.is_staff and self.request.user.role != 'admin':
                 raise PermissionDenied("Only admins can post jobs.")
        serializer.save(posted_by=self.request.user)

    def perform_update(self, serializer):
        if self.request.user.role != 'admin' and serializer.instance.posted_by != self.request.user:
            raise PermissionDenied("You can only edit your own jobs.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user.role != 'admin' and instance.posted_by != self.request.user:
            raise PermissionDenied("You can only delete your own jobs.")
        instance.delete()

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Application.objects.all()
        # Users see their own applications
        return Application.objects.filter(applicant=user)

    def perform_create(self, serializer):
        # Users apply for themselves
        serializer.save(applicant=self.request.user)

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'admin':
             raise PermissionDenied("Only admins can view dashboard stats.")
        
        job_count = Job.objects.count()
        application_count = Application.objects.count()
        user_count = User.objects.count()
        
        # Simple conversion rate calculation (e.g., avg applications per job)
        conversion_rate = 0
        if job_count > 0:
            conversion_rate = (application_count / job_count) * 100
        
        return Response({
            "jobs": job_count,
            "applications": application_count,
            "users": user_count,
            "conversionRate": round(conversion_rate, 1)
        })
