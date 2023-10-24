# Generated by Django 4.2.5 on 2023-10-10 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_refreshtokens_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='associations',
            name='supabase_authenticaiton_uuid',
            field=models.UUIDField(default='18b7fa5b-12b5-4405-adae-418618d4a3e6'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='associationusers',
            name='supabase_authenticaiton_uuid',
            field=models.UUIDField(default='18b7fa5b-12b5-4405-adae-418618d4a3e6'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='companies',
            name='supabase_authenticaiton_uuid',
            field=models.UUIDField(default='18b7fa5b-12b5-4405-adae-418618d4a3e6'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='companyusers',
            name='supabase_authenticaiton_uuid',
            field=models.UUIDField(default='18b7fa5b-12b5-4405-adae-418618d4a3e6'),
            preserve_default=False,
        ),
    ]