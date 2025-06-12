from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ADMINISTRADOR = 'ADMINISTRADOR'
    CLIENTE = 'CLIENTE'
    EMPLEADO = 'EMPLEADO'
    
    ROLES = [
        (ADMINISTRADOR, 'Administrador'),
        (CLIENTE, 'Cliente'),
        (EMPLEADO, 'Empleado')
    ]
    
    role = models.CharField(
        max_length=15,
        choices=ROLES,
        default=CLIENTE,
        verbose_name='Rol'
    )
    
    phone_number = models.CharField(
        unique=False,
        blank=False,
        null=False,
        validators=[
            RegexValidator(
                regex=r'^(3|6)\d{9}$',
                message='No es un número de teléfono válido',
                code='invalid_phonenumber'
            )
        ],
        verbose_name='Número teléfono'
    )
    
    dni = models.CharField(
        unique=True,
        blank=False,
        null=False,
        validators=[
            RegexValidator(
                regex=r'^\d{7,10}$',
                message='No es un número de documento válido',
                code='invalid_dni'
            )
        ],
        verbose_name='Cédula ciudadania'
    )
    
    prioridad = models.BooleanField(
        default=False,
        verbose_name='¿Condición especial?'
    )

    password = models.CharField(
    max_length=128,
    blank=True,
    null=True,  # This allows NULL in the database
    verbose_name='Contraseña'
)
    username = models.CharField(
        max_length=150,
        unique=True,
        blank=True,
        null=True,  # This allows NULL in the database
        verbose_name='Nombre de usuario'
    )
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'dni', 'phone_number', 'role']
    
    class Meta:
        db_table = 'usuario'
        verbose_name = 'usuario'
        verbose_name_plural = 'usuarios'
        ordering = ['id']

    def __str__(self):
        return self.username or self.dni
    
    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.first_name = self.first_name.upper()
        self.last_name = self.last_name.upper()
        self.email = self.email.lower()
        # Enforce username and password for ADMINISTRADOR and EMPLEADO
        if self.role in [self.ADMINISTRADOR, self.EMPLEADO]:
            if not self.username:
                raise ValueError("El nombre de usuario es obligatorio para ADMINISTRADOR y EMPLEADO.")
            if not self.password:
                raise ValueError("La contraseña es obligatoria para ADMINISTRADOR y EMPLEADO.")
        # For CLIENTE, allow username and password to be None
        elif self.role == self.CLIENTE:
            self.username = None
            self.password = None
        super(User, self).save(force_insert, force_update, using, update_fields)