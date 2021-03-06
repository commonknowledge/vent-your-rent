# Generated by Django 2.2.7 on 2019-11-25 08:34

from django.db import migrations, models
import vent_your_rent.api.models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20191122_1739'),
    ]

    operations = [
        migrations.CreateModel(
            name='Signup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('postcode', models.CharField(max_length=12)),
                ('email', models.EmailField(max_length=12)),
                ('can_contact', models.BooleanField(blank=True, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='vent',
            name='first_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='vent',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=vent_your_rent.api.models.generate_upload_destination_path),
        ),
    ]
