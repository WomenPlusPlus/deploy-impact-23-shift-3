from django.db import models
from api.auth_models import AuthUsers
import os
from urllib import parse as parse_url

DEFAULT_MAX_LENGTH = 255


class AssociationUsers(models.Model):
    association_user_id = models.AutoField(primary_key=True)
    supabase_authenticaiton_uuid = models.UUIDField()
    association = models.ForeignKey(
        "Associations", models.DO_NOTHING, blank=True, null=True
    )
    designation = models.CharField(blank=True, null=True)
    first_name = models.CharField(blank=True, null=True)
    last_name = models.CharField(blank=True, null=True)
    preferred_name = models.CharField(blank=True, null=True)
    email_adress = models.CharField(blank=True, null=True)
    phone_number_region = models.IntegerField(blank=True, null=True)
    phone_number = models.IntegerField(blank=True, null=True)
    role_inside_association = models.IntegerField(
        blank=True, null=True, db_comment="Is there a need for RBAC?"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "association_users"


class Associations(models.Model):
    association_id = models.AutoField(primary_key=True)
    supabase_authenticaiton_uuid = models.UUIDField()
    name = models.CharField(max_length=DEFAULT_MAX_LENGTH)
    url_homepage = models.CharField(max_length=DEFAULT_MAX_LENGTH)
    main_focus = models.TextField(blank=True, null=True)
    logo_url = models.CharField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "associations"


class Candidates(models.Model):
    candidate_id = models.AutoField(primary_key=True)
    supabase_authenticaiton_uuid = models.UUIDField()
    first_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)
    last_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)
    preferred_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    values_text = models.TextField(
        blank=True,
        null=True,
        db_comment="Values is what is important to me, what I would like to see in the company I work for",
    )
    related_experience = models.TextField(blank=True, null=True)
    preferred_work_model = models.ForeignKey(
        "WorkModels", models.DO_NOTHING, blank=True, null=True
    )
    desired_job = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    personality_description = models.TextField(blank=True, null=True)
    street_address = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    house_number = models.CharField(max_length=20, blank=True, null=True)
    postal_code = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    country = models.ForeignKey("Countries", models.DO_NOTHING, blank=True, null=True)
    phone_number_region = models.IntegerField(blank=True, null=True)
    phone_number = models.IntegerField(blank=True, null=True)
    email_adress = models.CharField(max_length=DEFAULT_MAX_LENGTH)
    birth_date = models.DateField(blank=True, null=True)
    work_permit = models.ForeignKey(
        "WorkPermits", models.DO_NOTHING, blank=True, null=True
    )
    notice_period_months = models.IntegerField(blank=True, null=True)
    status = models.ForeignKey(
        "Status",
        models.DO_NOTHING,
        blank=True,
        null=True,
        db_comment="looking for a job, open to oferings, etc",
    )
    file_cv = models.FileField(upload_to="cvs/", blank=True, null=True)
    preferred_work_id = models.IntegerField(blank=True, null=True)
    invited_by = models.ForeignKey(
        Associations,
        models.DO_NOTHING,
        db_column="invited_by",
        db_comment="association id",
        blank=True,
        null=True,
    )
    accepted_privacy = models.BooleanField(blank=True, null=True)
    skip_tutorial = models.BooleanField(default=False, blank=True, null=True)
    last_update = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.candidate_id} - {self.first_name} {self.last_name}"

    class Meta:
        db_table = "candidates"


class CandidatesAssociations(models.Model):
    candidate_association_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)
    association = models.ForeignKey(Associations, models.DO_NOTHING)
    assiciation_comment = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "candidates_associations"


class CanditatesInitiatives(models.Model):
    canditates_initiatives_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.DO_NOTHING)
    initiative = models.ForeignKey("Initiatives", models.DO_NOTHING)
    approved = models.BooleanField(blank=True, null=True)
    requested = models.BooleanField(blank=True, null=True)

    class Meta:
        db_table = "canditates_initiatives"


class Invitation(models.Model):
    invitation_id = models.AutoField(primary_key=True)
    association = models.ForeignKey(
        Associations,
        models.DO_NOTHING,
        db_comment="Association that created the invite",
    )
    validation_string = models.CharField(
        db_comment="String that validates if the invitation is valid"
    )
    company_invite = models.BooleanField(
        blank=True, null=True, db_comment='If it"s not a company, then it"s a candidate'
    )
    invitation_created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "invitation"


class Initiatives(models.Model):
    initiative_id = models.AutoField(primary_key=True)
    association = models.ForeignKey(Associations, models.DO_NOTHING)
    name = models.CharField(max_length=DEFAULT_MAX_LENGTH)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    initiative_url = models.CharField(blank=True, null=True)

    class Meta:
        db_table = "initiatives"


class Companies(models.Model):
    company_id = models.AutoField(primary_key=True)
    supabase_authenticaiton_uuid = models.UUIDField()
    values = models.TextField(
        blank=True, null=True, db_comment="Values is what is important to the company"
    )
    main_contact_first_name = models.CharField()
    main_contact_last_name = models.CharField()
    email_adress = models.CharField()
    main_contact_region_code = models.IntegerField(blank=True, null=True)
    main_contact_phone_number = models.IntegerField(blank=True, null=True)
    linkedin_url = models.CharField(blank=True, null=True)
    logo_url = models.CharField(blank=True, null=True)
    invited_by = models.ForeignKey(
        Associations,
        models.DO_NOTHING,
        db_column="invited_by",
        db_comment="association id",
        blank=True,
        null=True,
    )
    accepted_privacy = models.BooleanField(blank=True, null=True)
    skip_tutorial = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "companies"


class CompanyUsers(models.Model):
    company_user_id = models.AutoField(primary_key=True)
    supabase_authenticaiton_uuid = models.UUIDField()
    subsidiary = models.ForeignKey(
        "Subsidiaries", models.DO_NOTHING, blank=True, null=True
    )
    designation = models.CharField(blank=True, null=True)
    first_name = models.CharField(blank=True, null=True)
    last_name = models.CharField(blank=True, null=True)
    preferred_name = models.CharField(blank=True, null=True)
    email_adress = models.CharField(blank=True, null=True)
    hone_number_region = models.IntegerField(blank=True, null=True)
    hone_number = models.IntegerField(blank=True, null=True)
    avatart_url = models.CharField(blank=True, null=True)
    role_inside_company = models.IntegerField(
        blank=True, null=True, db_comment="Is there a need for RBAC?"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "company_users"


class Jobs(models.Model):
    job_id = models.AutoField(primary_key=True)
    company_id = models.IntegerField()
    job_description = models.TextField()
    open = models.BooleanField()
    role_id = models.IntegerField()
    subsidiary = models.ForeignKey("Subsidiaries", models.DO_NOTHING)
    last_day_to_apply = models.DateField(blank=True, null=True)
    closed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "jobs"


class SearchAlert(models.Model):
    search_alert_id = models.AutoField(primary_key=True)
    search_alert_parameters = models.TextField()  # This field type is a guess.
    company = models.ForeignKey(Companies, models.DO_NOTHING)

    class Meta:
        db_table = "search_alert"
        db_table_comment = "Placeholder"


class Subsidiaries(models.Model):
    subsidiary_id = models.AutoField(primary_key=True)
    subsidiary_name = models.CharField()
    company = models.ForeignKey(Companies, models.DO_NOTHING)
    street_address = models.CharField()
    house_number = models.CharField()
    postal_code = models.IntegerField()
    city = models.CharField()

    class Meta:
        db_table = "subsidiaries"


class SelectedCandidates(models.Model):
    selection_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.CASCADE)
    job = models.ForeignKey(Jobs, models.DO_NOTHING, blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "selected_candidates"


class CadidatesSkills(models.Model):
    candidate_skill_id = models.AutoField(primary_key=True)
    skill = models.ForeignKey("Skills", models.CASCADE)
    candidate = models.ForeignKey("Candidates", models.CASCADE)

    class Meta:
        db_table = "cadidates_skills"


class CadidatesSoftSkills(models.Model):
    candidate_soft_skill_id = models.AutoField(primary_key=True)
    soft_skill = models.ForeignKey("SoftSkills", models.CASCADE)
    candidate = models.ForeignKey("Candidates", models.CASCADE)

    class Meta:
        db_table = "cadidates_soft_skills"


class CandidatesDocuments(models.Model):
    def allocate_to_candidate_folder(instance, filename):
        path = "candidates_documents/"
        format = "/".join([str(instance.candidate.candidate_id), filename])
        return os.path.join(path, format)

    @property
    def file_name(self):
        file_name = os.path.basename(self.file.name)
        return parse_url.unquote(file_name)

    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to=allocate_to_candidate_folder)
    description = models.CharField(max_length=DEFAULT_MAX_LENGTH, blank=True, null=True)
    candidate = models.ForeignKey(Candidates, models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "candidates_documents"


class CandidatesLanguage(models.Model):
    candidate_language_id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(Candidates, models.CASCADE)
    language = models.ForeignKey("Languages", models.DO_NOTHING)
    language_proficiency = models.ForeignKey(
        "LanguagesProficiency", models.DO_NOTHING, blank=True, null=True
    )

    class Meta:
        db_table = "candidates_language"


class Cantons(models.Model):
    canton_id = models.AutoField(primary_key=True)
    canton_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "cantons"


class Countries(models.Model):
    contry_id = models.AutoField(primary_key=True)
    country_name_in_english = models.CharField(max_length=DEFAULT_MAX_LENGTH)
    country_name_in_native_language = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )
    country_it_code = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )

    class Meta:
        db_table = "countries"


class DesiredWorkLocationCandidate(models.Model):
    desired_work_location_candidate_id = models.AutoField(primary_key=True)
    canton = models.ForeignKey(Cantons, models.DO_NOTHING)
    candidate = models.ForeignKey(Candidates, models.CASCADE)

    class Meta:
        db_table = "desired_work_location_candidate"


class Languages(models.Model):
    language_id = models.AutoField(primary_key=True)
    language_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "languages"


class LanguagesProficiency(models.Model):
    language_proficiency_id = models.AutoField(primary_key=True)
    language_proficiency_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "languages_proficiency"


class ListValues(models.Model):
    list_values_id = models.AutoField(primary_key=True)
    list_values_name = models.CharField(
        max_length=DEFAULT_MAX_LENGTH, blank=True, null=True
    )

    class Meta:
        db_table = "list_values"


class PageCounts(models.Model):
    page_count_id = models.AutoField(primary_key=True)
    page_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)
    date = models.DateField()
    views = models.IntegerField()

    class Meta:
        db_table = "page_counts"
        db_table_comment = "Stores the daily page counts statistics"


class Personalities(models.Model):
    personality_id = models.AutoField(primary_key=True)
    personality_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "personalities"


class PersonalityCandidates(models.Model):
    personality_candidates_id = models.AutoField(primary_key=True)
    personality = models.ForeignKey(Personalities, models.DO_NOTHING)
    candidate = models.ForeignKey(Candidates, models.CASCADE)

    class Meta:
        db_table = "personality_candidates"


class Skills(models.Model):
    skill_id = models.AutoField(primary_key=True)
    skill_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "skills"


class SoftSkills(models.Model):
    soft_skill_id = models.AutoField(primary_key=True)
    soft_skill_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "soft_skills"


class Status(models.Model):
    status_id = models.AutoField(primary_key=True)
    status_descrption = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "status"


class ValuesCandidates(models.Model):
    list_values_id = models.AutoField(primary_key=True)
    list_values_name = models.ForeignKey(ListValues, models.CASCADE)
    cadidate = models.ForeignKey(Candidates, models.CASCADE)

    class Meta:
        db_table = "values_candidates"


class WorkModels(models.Model):
    preferred_work_model_id = models.AutoField(primary_key=True)
    preferred_work_model_name = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "work_models"


class WorkPermits(models.Model):
    work_permit_id = models.AutoField(primary_key=True)
    type_work_permit = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    class Meta:
        db_table = "work_permits


class SupabaseIdToUserIds(models.Model):
    supabase_authenticaiton_uuid = models.UUIDField()
    user_id = models.IntegerField(blank=True, null=True)
    role = models.CharField(max_length=DEFAULT_MAX_LENGTH)


class AvailableCompanyDomains(models.Model):
    domain = models.CharField(max_length=DEFAULT_MAX_LENGTH)

    def __str__(self) -> str:
        return self.domain
