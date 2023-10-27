# Generated by Django 4.2.5 on 2023-10-20 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_rename_company_id_companies_id_companies_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobs',
            old_name='skills',
            new_name='hard_skills',
        ),
        migrations.AddField(
            model_name='jobs',
            name='languages',
            field=models.TextField(default=['']),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobs',
            name='soft_skills',
            field=models.TextField(default=['']),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='jobs',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]