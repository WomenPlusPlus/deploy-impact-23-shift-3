# Generated by Django 4.2.5 on 2023-10-27 05:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0032_candidates_aboutme_embedded_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="candidates",
            old_name="aboutme_embedded",
            new_name="aboutme_experinece_embedded",
        ),
        migrations.RemoveField(
            model_name="candidates",
            name="experience_abedded",
        ),
        migrations.AlterField(
            model_name="candidates",
            name="email",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="candidates",
            name="last_country",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.DO_NOTHING,
                to="api.countries",
            ),
        ),
        migrations.AlterField(
            model_name="candidates",
            name="soft_skills",
            field=models.TextField(blank=True, null=True),
        ),
    ]