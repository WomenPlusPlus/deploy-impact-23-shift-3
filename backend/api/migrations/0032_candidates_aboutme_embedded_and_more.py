# Generated by Django 4.2.5 on 2023-10-25 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_rename_main_contact_first_name_companies_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidates',
            name='aboutme_embedded',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='candidates',
            name='experience_abedded',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='jobs',
            name='description_embedded',
            field=models.TextField(blank=True, null=True),
        ),
    ]