# Generated by Django 4.2.5 on 2023-10-26 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_remove_skills_skill_new_col'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidates',
            name='aboutme_experinece_embedded',
            field=models.TextField(blank=True, null=True),
        ),
    ]
