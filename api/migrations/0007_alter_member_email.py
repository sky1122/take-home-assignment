# Generated by Django 4.1.3 on 2022-11-12 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_member_last_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='email',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
