# Generated by Django 4.2.5 on 2023-10-12 14:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_rename_association_user_designation_associationusers_designation_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='associationusers',
            old_name='email',
            new_name='email_adress',
        ),
        migrations.RenameField(
            model_name='companies',
            old_name='main_contact_email',
            new_name='email_adress',
        ),
    ]
