# Generated by Django 3.2.22 on 2024-01-11 19:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0003_ordereditems_orders'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='amount',
        ),
        migrations.RemoveField(
            model_name='orders',
            name='is_paid',
        ),
        migrations.RemoveField(
            model_name='orders',
            name='order_id',
        ),
        migrations.RemoveField(
            model_name='orders',
            name='payment_id',
        ),
        migrations.RemoveField(
            model_name='orders',
            name='payment_signature',
        ),
    ]