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
        (EMPLEADO, 'EMPLEADO')
    ]
    
    role = models.CharField(
        max_length=15,
        choices=ROLES,
        default=CLIENTE,
        verbose_name='Rol'
    )
    
    phone_number = models.PositiveBigIntegerField(
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
    
    dni = models.PositiveBigIntegerField(
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
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'dni', 'phone_number', 'role']
    
    class Meta:
        db_table = 'usuario'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['id']
    
    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.first_name = self.first_name.upper()
        self.last_name = self.last_name.upper()
        self.email = self.email.lower()
        super(User, self).save(force_insert, force_update, using, update_fields)
