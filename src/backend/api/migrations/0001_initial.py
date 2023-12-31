# Generated by Django 4.2.5 on 2023-10-28 20:17

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AuthUsers',
            fields=[
                ('instance_id', models.UUIDField(blank=True, null=True)),
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('aud', models.CharField(blank=True, max_length=255, null=True)),
                ('role', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('encrypted_password', models.CharField(blank=True, max_length=255, null=True)),
                ('email_confirmed_at', models.DateTimeField(blank=True, null=True)),
                ('invited_at', models.DateTimeField(blank=True, null=True)),
                ('confirmation_token', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('confirmation_sent_at', models.DateTimeField(blank=True, null=True)),
                ('recovery_token', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('recovery_sent_at', models.DateTimeField(blank=True, null=True)),
                ('email_change_token_new', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('email_change', models.CharField(blank=True, max_length=255, null=True)),
                ('email_change_sent_at', models.DateTimeField(blank=True, null=True)),
                ('last_sign_in_at', models.DateTimeField(blank=True, null=True)),
                ('raw_app_meta_data', models.JSONField(blank=True, null=True)),
                ('raw_user_meta_data', models.JSONField(blank=True, null=True)),
                ('is_super_admin', models.BooleanField(blank=True, null=True)),
                ('created_at', models.DateTimeField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('phone', models.TextField(blank=True, null=True, unique=True)),
                ('phone_confirmed_at', models.DateTimeField(blank=True, null=True)),
                ('phone_change', models.TextField(blank=True, null=True)),
                ('phone_change_token', models.CharField(blank=True, max_length=255, null=True)),
                ('phone_change_sent_at', models.DateTimeField(blank=True, null=True)),
                ('confirmed_at', models.DateTimeField(blank=True, null=True)),
                ('email_change_token_current', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('email_change_confirm_status', models.SmallIntegerField(blank=True, null=True)),
                ('banned_until', models.DateTimeField(blank=True, null=True)),
                ('reauthentication_token', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('reauthentication_sent_at', models.DateTimeField(blank=True, null=True)),
                ('is_sso_user', models.BooleanField(db_comment='Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': '"auth"."users"',
                'db_table_comment': 'Auth: Stores user login data within a secure schema.',
                'managed': False,
            },
        ),
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
                ('session_id', models.UUIDField()),
            ],
            options={
                'db_table': '"auth"."refresh_tokens"',
                'db_table_comment': 'Auth: Store of tokens used to refresh JWT tokens once they expire.',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Associations',
            fields=[
                ('association_id', models.AutoField(primary_key=True, serialize=False)),
                ('supabase_authenticaiton_uuid', models.UUIDField()),
                ('name', models.CharField(max_length=255)),
                ('url_homepage', models.CharField(max_length=255)),
                ('main_focus', models.TextField(blank=True, null=True)),
                ('logo_url', models.CharField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('first_name', models.CharField(blank=True, null=True)),
                ('last_name', models.CharField(blank=True, null=True)),
                ('preferred_name', models.CharField(blank=True, null=True)),
            ],
            options={
                'db_table': 'associations',
            },
        ),
        migrations.CreateModel(
            name='AvailableCompanyDomains',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('domain', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Candidates',
            fields=[
                ('candidate_id', models.AutoField(primary_key=True, serialize=False)),
                ('supabase_authenticaiton_uuid', models.UUIDField(blank=True, null=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('preferred_name', models.CharField(blank=True, max_length=255, null=True)),
                ('about_me', models.TextField(blank=True, null=True)),
                ('industry', models.CharField(blank=True, max_length=255, null=True)),
                ('experience', models.TextField(blank=True, null=True)),
                ('github', models.CharField(blank=True, max_length=255, null=True)),
                ('linkedin', models.CharField(blank=True, max_length=255, null=True)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('education', models.CharField(blank=True, max_length=255, null=True)),
                ('location_city', models.CharField(blank=True, max_length=255, null=True)),
                ('hard_skills', models.TextField(blank=True, null=True)),
                ('languages', models.CharField(blank=True, max_length=255, null=True)),
                ('soft_skills', models.TextField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, max_length=255, null=True)),
                ('ethnicity', models.IntegerField(blank=True, null=True)),
                ('aboutme_experinece_embedded', models.TextField(blank=True, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('notice_period_months', models.IntegerField(blank=True, null=True)),
                ('accepted_privacy', models.BooleanField(blank=True, default=True, null=True)),
                ('skip_tutorial', models.BooleanField(blank=True, default=False, null=True)),
                ('last_update', models.DateTimeField(auto_now=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'candidates',
            },
        ),
        migrations.CreateModel(
            name='Cantons',
            fields=[
                ('canton_id', models.AutoField(primary_key=True, serialize=False)),
                ('canton_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'cantons',
            },
        ),
        migrations.CreateModel(
            name='Companies',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('supabase_authenticaiton_uuid', models.UUIDField(blank=True, null=True)),
                ('values', models.TextField(blank=True, db_comment='Values is what is important to the company', null=True)),
                ('first_name', models.CharField(blank=True, null=True)),
                ('last_name', models.CharField(blank=True, null=True)),
                ('preferred_name', models.CharField(blank=True, null=True)),
                ('email_adress', models.CharField(blank=True, null=True)),
                ('main_contact_region_code', models.IntegerField(blank=True, null=True)),
                ('main_contact_phone_number', models.IntegerField(blank=True, null=True)),
                ('linkedin_url', models.CharField(blank=True, null=True)),
                ('logo_url', models.CharField(blank=True, null=True)),
                ('accepted_privacy', models.BooleanField(blank=True, null=True)),
                ('skip_tutorial', models.BooleanField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('invited_by', models.ForeignKey(blank=True, db_column='invited_by', db_comment='association id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.associations')),
            ],
            options={
                'db_table': 'companies',
            },
        ),
        migrations.CreateModel(
            name='Countries',
            fields=[
                ('contry_id', models.AutoField(primary_key=True, serialize=False)),
                ('country_name_in_english', models.CharField(max_length=255)),
                ('country_name_in_native_language', models.CharField(blank=True, max_length=255, null=True)),
                ('country_it_code', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'countries',
            },
        ),
        migrations.CreateModel(
            name='Jobs',
            fields=[
                ('job_id', models.AutoField(primary_key=True, serialize=False)),
                ('job_title', models.CharField(blank=True, max_length=255, null=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('industry', models.CharField(blank=True, max_length=255, null=True)),
                ('raw_description', models.TextField(blank=True, null=True)),
                ('values', models.TextField(blank=True, null=True)),
                ('website', models.CharField(blank=True, max_length=255, null=True)),
                ('job_description', models.TextField(blank=True, null=True)),
                ('soft_skills', models.TextField(blank=True, null=True)),
                ('hard_skills', models.TextField(blank=True, null=True)),
                ('languages', models.TextField(blank=True, null=True)),
                ('open', models.BooleanField(blank=True, default=True, null=True)),
                ('description_embedded', models.TextField(blank=True, null=True)),
                ('last_day_to_apply', models.DateField(blank=True, null=True)),
                ('closed_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.companies')),
            ],
            options={
                'db_table': 'jobs',
            },
        ),
        migrations.CreateModel(
            name='Languages',
            fields=[
                ('language_id', models.AutoField(primary_key=True, serialize=False)),
                ('language_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'languages',
            },
        ),
        migrations.CreateModel(
            name='LanguagesProficiency',
            fields=[
                ('language_proficiency_id', models.AutoField(primary_key=True, serialize=False)),
                ('language_proficiency_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'languages_proficiency',
            },
        ),
        migrations.CreateModel(
            name='ListValues',
            fields=[
                ('list_values_id', models.AutoField(primary_key=True, serialize=False)),
                ('list_values_name', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'list_values',
            },
        ),
        migrations.CreateModel(
            name='PageCounts',
            fields=[
                ('page_count_id', models.AutoField(primary_key=True, serialize=False)),
                ('page_name', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('views', models.IntegerField()),
            ],
            options={
                'db_table': 'page_counts',
                'db_table_comment': 'Stores the daily page counts statistics',
            },
        ),
        migrations.CreateModel(
            name='Personalities',
            fields=[
                ('personality_id', models.AutoField(primary_key=True, serialize=False)),
                ('personality_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'personalities',
            },
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.ImageField(upload_to='avatars')),
            ],
        ),
        migrations.CreateModel(
            name='Skills',
            fields=[
                ('skill_id', models.AutoField(primary_key=True, serialize=False)),
                ('skill_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'skills',
            },
        ),
        migrations.CreateModel(
            name='SoftSkills',
            fields=[
                ('soft_skill_id', models.AutoField(primary_key=True, serialize=False)),
                ('soft_skill_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'soft_skills',
            },
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('status_id', models.AutoField(primary_key=True, serialize=False)),
                ('status_descrption', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'status',
            },
        ),
        migrations.CreateModel(
            name='SupabaseIdToUserIds',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('supabase_authenticaiton_uuid', models.UUIDField()),
                ('user_id', models.IntegerField(blank=True, null=True)),
                ('role', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='WorkModels',
            fields=[
                ('preferred_work_model_id', models.AutoField(primary_key=True, serialize=False)),
                ('preferred_work_model_name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'work_models',
            },
        ),
        migrations.CreateModel(
            name='WorkPermits',
            fields=[
                ('work_permit_id', models.AutoField(primary_key=True, serialize=False)),
                ('type_work_permit', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'work_permits',
            },
        ),
        migrations.CreateModel(
            name='ValuesCandidates',
            fields=[
                ('list_values_id', models.AutoField(primary_key=True, serialize=False)),
                ('cadidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.candidates')),
                ('list_values_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.listvalues')),
            ],
            options={
                'db_table': 'values_candidates',
            },
        ),
        migrations.CreateModel(
            name='Subsidiaries',
            fields=[
                ('subsidiary_id', models.AutoField(primary_key=True, serialize=False)),
                ('subsidiary_name', models.CharField()),
                ('street_address', models.CharField()),
                ('house_number', models.CharField()),
                ('postal_code', models.IntegerField()),
                ('city', models.CharField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.companies')),
            ],
            options={
                'db_table': 'subsidiaries',
            },
        ),
        migrations.CreateModel(
            name='SelectedCandidates',
            fields=[
                ('selection_id', models.AutoField(primary_key=True, serialize=False)),
                ('comments', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.candidates')),
                ('job', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.jobs')),
            ],
            options={
                'db_table': 'selected_candidates',
            },
        ),
        migrations.CreateModel(
            name='SearchAlert',
            fields=[
                ('search_alert_id', models.AutoField(primary_key=True, serialize=False)),
                ('search_alert_parameters', models.TextField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.companies')),
            ],
            options={
                'db_table': 'search_alert',
                'db_table_comment': 'Placeholder',
            },
        ),
        migrations.CreateModel(
            name='PersonalityCandidates',
            fields=[
                ('personality_candidates_id', models.AutoField(primary_key=True, serialize=False)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.candidates')),
                ('personality', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.personalities')),
            ],
            options={
                'db_table': 'personality_candidates',
            },
        ),
        migrations.AddField(
            model_name='jobs',
            name='hard_skill_test_matching',
            field=models.ManyToManyField(to='api.skills'),
        ),
        migrations.AddField(
            model_name='jobs',
            name='location_country',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.countries'),
        ),
        migrations.AddField(
            model_name='jobs',
            name='soft_skill_test_matching',
            field=models.ManyToManyField(to='api.softskills'),
        ),
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('invitation_id', models.AutoField(primary_key=True, serialize=False)),
                ('validation_string', models.CharField(db_comment='String that validates if the invitation is valid')),
                ('company_invite', models.BooleanField(blank=True, db_comment='If it"s not a company, then it"s a candidate', null=True)),
                ('invitation_created_at', models.DateTimeField(auto_now_add=True)),
                ('association', models.ForeignKey(db_comment='Association that created the invite', on_delete=django.db.models.deletion.DO_NOTHING, to='api.associations')),
            ],
            options={
                'db_table': 'invitation',
            },
        ),
        migrations.CreateModel(
            name='Initiatives',
            fields=[
                ('initiative_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('date', models.DateField(blank=True, null=True)),
                ('initiative_url', models.CharField(blank=True, null=True)),
                ('association', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.associations')),
            ],
            options={
                'db_table': 'initiatives',
            },
        ),
        migrations.CreateModel(
            name='DesiredWorkLocationCandidate',
            fields=[
                ('desired_work_location_candidate_id', models.AutoField(primary_key=True, serialize=False)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.candidates')),
                ('canton', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.cantons')),
            ],
            options={
                'db_table': 'desired_work_location_candidate',
            },
        ),
        migrations.CreateModel(
            name='CompanyUsers',
            fields=[
                ('company_user_id', models.AutoField(primary_key=True, serialize=False)),
                ('supabase_authenticaiton_uuid', models.UUIDField()),
                ('designation', models.CharField(blank=True, null=True)),
                ('first_name', models.CharField(blank=True, null=True)),
                ('last_name', models.CharField(blank=True, null=True)),
                ('preferred_name', models.CharField(blank=True, null=True)),
                ('email_adress', models.CharField(blank=True, null=True)),
                ('hone_number_region', models.IntegerField(blank=True, null=True)),
                ('hone_number', models.IntegerField(blank=True, null=True)),
                ('avatart_url', models.CharField(blank=True, null=True)),
                ('role_inside_company', models.IntegerField(blank=True, db_comment='Is there a need for RBAC?', null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('subsidiary', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.subsidiaries')),
            ],
            options={
                'db_table': 'company_users',
            },
        ),
        migrations.CreateModel(
            name='CanditatesInitiatives',
            fields=[
                ('canditates_initiatives_id', models.AutoField(primary_key=True, serialize=False)),
                ('approved', models.BooleanField(blank=True, null=True)),
                ('requested', models.BooleanField(blank=True, null=True)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.candidates')),
                ('initiative', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.initiatives')),
            ],
            options={
                'db_table': 'canditates_initiatives',
            },
        ),
        migrations.CreateModel(
            name='CandidatesLanguage',
            fields=[
                ('candidate_language_id', models.AutoField(primary_key=True, serialize=False)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.candidates')),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.languages')),
                ('language_proficiency', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.languagesproficiency')),
            ],
            options={
                'db_table': 'candidates_language',
            },
        ),
        migrations.CreateModel(
            name='CandidatesDocuments',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file', models.FileField(upload_to=api.models.CandidatesDocuments.allocate_to_candidate_folder)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('candidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.candidates')),
            ],
            options={
                'db_table': 'candidates_documents',
            },
        ),
        migrations.CreateModel(
            name='CandidatesAssociations',
            fields=[
                ('candidate_association_id', models.AutoField(primary_key=True, serialize=False)),
                ('assiciation_comment', models.TextField(blank=True, null=True)),
                ('association', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.associations')),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.candidates')),
            ],
            options={
                'db_table': 'candidates_associations',
            },
        ),
        migrations.AddField(
            model_name='candidates',
            name='hard_skill_test_matching',
            field=models.ManyToManyField(to='api.skills'),
        ),
        migrations.AddField(
            model_name='candidates',
            name='invited_by',
            field=models.ForeignKey(blank=True, db_column='invited_by', db_comment='association id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.associations'),
        ),
        migrations.AddField(
            model_name='candidates',
            name='last_country',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.countries'),
        ),
        migrations.AddField(
            model_name='candidates',
            name='soft_skill_test_matching',
            field=models.ManyToManyField(to='api.softskills'),
        ),
        migrations.AddField(
            model_name='candidates',
            name='work_permission_CH',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.workpermits'),
        ),
        migrations.CreateModel(
            name='CadidatesSoftSkills',
            fields=[
                ('candidate_soft_skill_id', models.AutoField(primary_key=True, serialize=False)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.candidates')),
                ('soft_skill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.softskills')),
            ],
            options={
                'db_table': 'cadidates_soft_skills',
            },
        ),
        migrations.CreateModel(
            name='CadidatesSkills',
            fields=[
                ('candidate_skill_id', models.AutoField(primary_key=True, serialize=False)),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.candidates')),
                ('skill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.skills')),
            ],
            options={
                'db_table': 'cadidates_skills',
            },
        ),
        migrations.CreateModel(
            name='AssociationUsers',
            fields=[
                ('association_user_id', models.AutoField(primary_key=True, serialize=False)),
                ('supabase_authenticaiton_uuid', models.UUIDField()),
                ('designation', models.CharField(blank=True, null=True)),
                ('first_name', models.CharField(blank=True, null=True)),
                ('last_name', models.CharField(blank=True, null=True)),
                ('preferred_name', models.CharField(blank=True, null=True)),
                ('email_adress', models.CharField(blank=True, null=True)),
                ('phone_number_region', models.IntegerField(blank=True, null=True)),
                ('phone_number', models.IntegerField(blank=True, null=True)),
                ('role_inside_association', models.IntegerField(blank=True, db_comment='Is there a need for RBAC?', null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('association', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.associations')),
            ],
            options={
                'db_table': 'association_users',
            },
        ),
    ]
