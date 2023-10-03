# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

DEFAULT_MAX_LENGTH = 255


class AssociationUsers(models.Model):
    association_user_id = models.AutoField(primary_key=True)
    association = models.ForeignKey(
        "Associations", models.DO_NOTHING, blank=True, null=True
    )
    association_user_designation = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    association_user_first_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    association_user_last_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    association_user_preferred_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    association_user_email = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    association_user_phone_number_region = models.IntegerField(blank=True, null=True)
    association_user_phone_number = models.IntegerField(blank=True, null=True)
    association_user_role = models.IntegerField(
        blank=True, null=True, db_comment="Is there a need for RBAC?"
    )
    created_at = models.DateTimeField(blank=True, null=True, auto_now_add=True)

    class Meta:
        db_table = "association_users"


class Associations(models.Model):
    association_id = models.AutoField(primary_key=True)
    name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    url_homepage = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    main_focus = models.TextField(blank=True, null=True)
    logo_url = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "associations"


class CadidatesSkill(models.Model):
    candidate_skill_id = models.AutoField(primary_key=True)
    skill = models.ForeignKey("Skills", models.DO_NOTHING)
    skill_proficiency = models.ForeignKey("SkillsProficiency", models.DO_NOTHING)
    candidate = models.ForeignKey("Candidates", models.DO_NOTHING)

    class Meta:
        db_table = "cadidates_skill"


class Candidates(models.Model):
    candidate_id = models.AutoField(primary_key=True)
    designation = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, db_comment="Herr, dr, etc"
    )
    first_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    last_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    preferred_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    values = models.TextField(
        blank=True,
        null=True,
        db_comment="Values is what is important to me, what I would like to see in the company I work for",
    )
    desired_job = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    street_address = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    house_number = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    postal_code = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    phone_number_region = models.IntegerField(blank=True, null=True)
    phone_number = models.IntegerField(blank=True, null=True)
    email_adress = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    birth_date = models.DateField(blank=True, null=True)
    linkedin_address = models.TextField(blank=True, null=True)
    work_permit = models.ForeignKey(
        "WorkPermits", models.DO_NOTHING, blank=True, null=True
    )
    notice_period_days = models.IntegerField(blank=True, null=True)
    earliest_start_date = models.DateField(blank=True, null=True)
    preferred_work_model = models.ForeignKey(
        "WorkModels", models.DO_NOTHING, blank=True, null=True
    )
    employed = models.BooleanField(blank=True, null=True)
    motivation = models.TextField(blank=True, null=True)
    country = models.ForeignKey("Countries", models.DO_NOTHING, blank=True, null=True)
    preferred_work_percent = models.IntegerField(blank=True, null=True)
    yearly_salary_expectation_chf = models.IntegerField(
        db_column="yearly_salary_expectation_CHF", blank=True, null=True
    )  # Field name made lowercase.
    invited_by = models.ForeignKey(
        Associations,
        models.DO_NOTHING,
        db_column="invited_by",
        db_comment="association id",
    )
    status = models.ForeignKey(
        "Status",
        models.DO_NOTHING,
        blank=True,
        null=True,
        db_comment="looking for a job, open to oferings, etc",
    )
    avatart_url = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    accepted_privacy = models.BooleanField(blank=True, null=True)
    skip_tutorial = models.BooleanField(blank=True, null=True)
    last_update = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "candidates"


class CandidatesAssociations(models.Model):
    candidate_association_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)
    association = models.ForeignKey(Associations, models.DO_NOTHING)
    assiciation_comment = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "candidates_associations"


class CandidatesFiles(models.Model):
    file_id = models.AutoField(primary_key=True)
    file_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    description = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "candidates_files"


class CandidatesLanguage(models.Model):
    candidate_language_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)
    language = models.ForeignKey("Languages", models.DO_NOTHING)
    language_proficiency = models.ForeignKey(
        "LanguagesProficiency", models.DO_NOTHING, blank=True, null=True
    )

    class Meta:
        db_table = "candidates_language"


class CanditatesInitiatives(models.Model):
    canditates_initiatives_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)
    initiative = models.ForeignKey("Initiatives", models.DO_NOTHING)
    approved = models.BooleanField(blank=True, null=True)
    requested = models.BooleanField(blank=True, null=True)

    class Meta:
        db_table = "canditates_initiatives"


class Companies(models.Model):
    company_id = models.AutoField(primary_key=True)
    values = models.TextField(
        blank=True, null=True, db_comment="Values is what is important to the company"
    )
    main_contact_first_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    main_contact_last_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    main_contact_email = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    main_contact_region_code = models.IntegerField(blank=True, null=True)
    main_contact_phone_number = models.IntegerField(blank=True, null=True)
    linkedin_url = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    logo_url = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    invited_by = models.ForeignKey(
        Associations,
        models.DO_NOTHING,
        db_column="invited_by",
        db_comment="association id",
    )
    accepted_privacy = models.BooleanField(blank=True, null=True)
    skip_tutorial = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "companies"


class CompanyUsers(models.Model):
    company_user_id = models.AutoField(primary_key=True)
    subsidiary = models.ForeignKey(
        "Subsidiaries", models.DO_NOTHING, blank=True, null=True
    )
    company_user_designation = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    company_user_first_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    company_user_last_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    company_preferred_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    company_user_email = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    company_user_phone_number_region = models.IntegerField(blank=True, null=True)
    company_user_phone_number = models.IntegerField(blank=True, null=True)
    avatart_url = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    company_user_role = models.IntegerField(
        blank=True, null=True, db_comment="Is there a need for RBAC?"
    )
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "company_users"


class CongnitiveTests(models.Model):
    congnitive_test_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)

    class Meta:
        db_table = "congnitive_tests"
        db_table_comment = "Placeholder"


class Countries(models.Model):
    contry_id = models.AutoField(primary_key=True)
    country_name_in_english = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    country_name_in_native_language = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    country_it_code = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )

    class Meta:
        db_table = "countries"


class Initiatives(models.Model):
    initiative_id = models.AutoField(primary_key=True)
    association = models.ForeignKey(Associations, models.DO_NOTHING)
    name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    description = models.TextField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    initiative_url = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )

    class Meta:
        db_table = "initiatives"


class Invitation(models.Model):
    invitation_id = models.AutoField(primary_key=True)
    association = models.ForeignKey(
        Associations,
        models.DO_NOTHING,
        db_comment="Association that created the invite",
        related_name="invitations",
    )
    validation_string = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
        db_comment="String that validates if the invitation is valid",
    )
    company_invite = models.BooleanField(
        blank=True, null=True, db_comment='If it"s not a company, then it"s a candidate'
    )
    invitation_created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "invitation"


class Jobs(models.Model):
    job_id = models.AutoField(primary_key=True)
    company_id = models.IntegerField()
    job_description = models.TextField()
    open = models.BooleanField()
    role_id = models.IntegerField()
    subsidiary = models.ForeignKey("Subsidiaries", models.DO_NOTHING)
    last_day_to_apply = models.DateField(blank=True, null=True)
    closed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "jobs"


class Languages(models.Model):
    language_id = models.AutoField(primary_key=True)
    language_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )

    class Meta:
        db_table = "languages"


class LanguagesProficiency(models.Model):
    language_proficiency_id = models.AutoField(primary_key=True)
    language_proficiency_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )

    class Meta:
        db_table = "languages_proficiency"


class PageCounts(models.Model):
    page_count_id = models.AutoField(primary_key=True)
    page_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    date = models.DateField()
    views = models.IntegerField()

    class Meta:
        db_table = "page_counts"
        db_table_comment = "Stores the daily page counts statistics"


class PersonalityTests(models.Model):
    personality_test_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)

    class Meta:
        db_table = "personality_tests"
        db_table_comment = "Placeholder"


class SearchAlert(models.Model):
    search_alert_id = models.AutoField(primary_key=True)
    search_alert_parameters = models.TextField()  # This field type is a guess.
    company = models.ForeignKey(Companies, models.DO_NOTHING)

    class Meta:
        db_table = "search_alert"
        db_table_comment = "Placeholder"


class SelectedCandidates(models.Model):
    selection_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)
    job = models.ForeignKey(Jobs, models.DO_NOTHING, blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = "selected_candidates"


class Skills(models.Model):
    skill_id = models.AutoField(primary_key=True)
    skill_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )

    class Meta:
        db_table = "skills"


class SkillsProficiency(models.Model):
    skill_proficiency_id = models.AutoField(primary_key=True)
    proficiency_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )

    class Meta:
        db_table = "skills_proficiency"


class Status(models.Model):
    status_id = models.AutoField(primary_key=True)
    status_descrption = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )

    class Meta:
        db_table = "status"


class Subsidiaries(models.Model):
    subsidiary_id = models.AutoField(primary_key=True)
    subsidiary_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    company = models.ForeignKey(Companies, models.DO_NOTHING)
    street_address = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    house_number = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )
    postal_code = models.IntegerField()
    city = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )

    class Meta:
        db_table = "subsidiaries"


class WorkModels(models.Model):
    preferred_work_model_id = models.AutoField(primary_key=True)
    preferred_work_model_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )

    class Meta:
        db_table = "work_models"


class WorkPermits(models.Model):
    work_permit_id = models.AutoField(primary_key=True)
    type_work_permit = models.CharField(
        max_length=DEFAULT_MAX_LENGTH,
    )

    class Meta:
        db_table = "work_permits"


class AuthUsers(models.Model):
    instance_id = models.UUIDField(blank=True, null=True)
    id = models.UUIDField(primary_key=True)
    aud = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(unique=True, max_length=255, blank=True, null=True)
    encrypted_password = models.CharField(max_length=255, blank=True, null=True)
    email_confirmed_at = models.DateTimeField(blank=True, null=True)
    invited_at = models.DateTimeField(blank=True, null=True)
    confirmation_token = models.CharField(
        unique=True, max_length=255, blank=True, null=True
    )
    confirmation_sent_at = models.DateTimeField(blank=True, null=True)
    recovery_token = models.CharField(
        unique=True, max_length=255, blank=True, null=True
    )
    recovery_sent_at = models.DateTimeField(blank=True, null=True)
    email_change_token_new = models.CharField(
        unique=True, max_length=255, blank=True, null=True
    )
    email_change = models.CharField(max_length=255, blank=True, null=True)
    email_change_sent_at = models.DateTimeField(blank=True, null=True)
    last_sign_in_at = models.DateTimeField(blank=True, null=True)
    raw_app_meta_data = models.JSONField(blank=True, null=True)
    raw_user_meta_data = models.JSONField(blank=True, null=True)
    is_super_admin = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    phone = models.TextField(unique=True, blank=True, null=True)
    phone_confirmed_at = models.DateTimeField(blank=True, null=True)
    phone_change = models.TextField(blank=True, null=True)
    phone_change_token = models.CharField(max_length=255, blank=True, null=True)
    phone_change_sent_at = models.DateTimeField(blank=True, null=True)
    confirmed_at = models.DateTimeField(blank=True, null=True)
    email_change_token_current = models.CharField(
        unique=True, max_length=255, blank=True, null=True
    )
    email_change_confirm_status = models.SmallIntegerField(blank=True, null=True)
    banned_until = models.DateTimeField(blank=True, null=True)
    reauthentication_token = models.CharField(
        unique=True, max_length=255, blank=True, null=True
    )
    reauthentication_sent_at = models.DateTimeField(blank=True, null=True)
    is_sso_user = models.BooleanField(
        db_comment="Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails."
    )
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"auth"."users"'
        db_table_comment = "Auth: Stores user login data within a secure schema."
