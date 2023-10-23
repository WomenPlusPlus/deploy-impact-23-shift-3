# Generated by Django 4.2.5 on 2023-10-10 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_resfreshtoken'),
    ]

    operations = [
        migrations.CreateModel(
            name='RefreshTokens',
            fields=[
                ('instance_id', models.UUIDField(blank=True, null=True)),
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('token', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('user_id', models.CharField(blank=True, max_length=255, null=True)),
                ('revoked', models.BooleanField(blank=True, null=True)),
                ('created_at', models.DateTimeField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('parent', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': '"auth"."refresh_token"',
                'db_table_comment': 'Auth: Store of tokens used to refresh JWT tokens once they expire.',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='ResfreshToken',
        ),
    ]