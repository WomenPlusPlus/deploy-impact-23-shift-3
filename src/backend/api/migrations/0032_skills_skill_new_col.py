# Generated by Django 4.2.5 on 2023-10-25 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_rename_main_contact_first_name_companies_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='skills',
            name='skill_new_col',
            field=models.CharField(default='some string', max_length=255),
            preserve_default=False,
        ),
    ]