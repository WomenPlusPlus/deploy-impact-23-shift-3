# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuditLogEntries(models.Model):
    instance_id = models.UUIDField(blank=True, null=True)
    id = models.UUIDField(primary_key=True)
    payload = models.TextField(blank=True, null=True)  # This field type is a guess.
    created_at = models.DateTimeField(blank=True, null=True)
    ip_address = models.CharField(max_length=64)

    class Meta:
        managed = False
        db_table = "audit_log_entries"
        db_table_comment = "Auth: Audit trail for user actions."


class FlowState(models.Model):
    id = models.UUIDField(primary_key=True)
    user_id = models.UUIDField(blank=True, null=True)
    auth_code = models.TextField()
    code_challenge_method = models.TextField()  # This field type is a guess.
    code_challenge = models.TextField()
    provider_type = models.TextField()
    provider_access_token = models.TextField(blank=True, null=True)
    provider_refresh_token = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    authentication_method = models.TextField()

    class Meta:
        managed = False
        db_table = "flow_state"
        db_table_comment = "stores metadata for pkce logins"


class Identities(models.Model):
    id = models.TextField()
    user = models.ForeignKey("Users", models.DO_NOTHING)
    identity_data = models.JSONField()
    provider = models.TextField(
        primary_key=True
    )  # The composite primary key (provider, id) found, that is not supported. The first column is selected.
    last_sign_in_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    email = models.TextField(
        blank=True,
        null=True,
        db_comment="Auth: Email is a generated column that references the optional email property in the identity_data",
    )

    class Meta:
        managed = False
        db_table = "identities"
        unique_together = (("provider", "id"),)
        db_table_comment = "Auth: Stores identities associated to a user."


class Instances(models.Model):
    id = models.UUIDField(primary_key=True)
    uuid = models.UUIDField(blank=True, null=True)
    raw_base_config = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "instances"
        db_table_comment = "Auth: Manages users across multiple sites."


class MfaAmrClaims(models.Model):
    session = models.ForeignKey("Sessions", models.DO_NOTHING)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    authentication_method = models.TextField()
    id = models.UUIDField(primary_key=True)

    class Meta:
        managed = False
        db_table = "mfa_amr_claims"
        unique_together = (("session", "authentication_method"),)
        db_table_comment = "auth: stores authenticator method reference claims for multi factor authentication"


class MfaChallenges(models.Model):
    id = models.UUIDField(primary_key=True)
    factor = models.ForeignKey("MfaFactors", models.DO_NOTHING)
    created_at = models.DateTimeField()
    verified_at = models.DateTimeField(blank=True, null=True)
    ip_address = models.GenericIPAddressField()

    class Meta:
        managed = False
        db_table = "mfa_challenges"
        db_table_comment = "auth: stores metadata about challenge requests made"


class MfaFactors(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey("Users", models.DO_NOTHING)
    friendly_name = models.TextField(blank=True, null=True)
    factor_type = models.TextField()  # This field type is a guess.
    status = models.TextField()  # This field type is a guess.
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    secret = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "mfa_factors"
        unique_together = (("friendly_name", "user"),)
        db_table_comment = "auth: stores metadata about factors"


class RefreshTokens(models.Model):
    instance_id = models.UUIDField(blank=True, null=True)
    id = models.BigAutoField(primary_key=True)
    token = models.CharField(unique=True, max_length=255, blank=True, null=True)
    user_id = models.CharField(max_length=255, blank=True, null=True)
    revoked = models.BooleanField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    parent = models.CharField(max_length=255, blank=True, null=True)
    session = models.ForeignKey("Sessions", models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "refresh_tokens"
        db_table_comment = (
            "Auth: Store of tokens used to refresh JWT tokens once they expire."
        )


class SamlProviders(models.Model):
    id = models.UUIDField(primary_key=True)
    sso_provider = models.ForeignKey("SsoProviders", models.DO_NOTHING)
    entity_id = models.TextField(unique=True)
    metadata_xml = models.TextField()
    metadata_url = models.TextField(blank=True, null=True)
    attribute_mapping = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "saml_providers"
        db_table_comment = "Auth: Manages SAML Identity Provider connections."


class SamlRelayStates(models.Model):
    id = models.UUIDField(primary_key=True)
    sso_provider = models.ForeignKey("SsoProviders", models.DO_NOTHING)
    request_id = models.TextField()
    for_email = models.TextField(blank=True, null=True)
    redirect_to = models.TextField(blank=True, null=True)
    from_ip_address = models.GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "saml_relay_states"
        db_table_comment = "Auth: Contains SAML Relay State information for each Service Provider initiated login."


class SchemaMigrations(models.Model):
    version = models.CharField(primary_key=True, max_length=255)

    class Meta:
        managed = False
        db_table = "schema_migrations"
        db_table_comment = "Auth: Manages updates to the auth system."


class Sessions(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey("Users", models.DO_NOTHING)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    factor_id = models.UUIDField(blank=True, null=True)
    aal = models.TextField(blank=True, null=True)  # This field type is a guess.
    not_after = models.DateTimeField(
        blank=True,
        null=True,
        db_comment="Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.",
    )

    class Meta:
        managed = False
        db_table = "sessions"
        db_table_comment = "Auth: Stores session data associated to a user."


class SsoDomains(models.Model):
    id = models.UUIDField(primary_key=True)
    sso_provider = models.ForeignKey("SsoProviders", models.DO_NOTHING)
    domain = models.TextField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "sso_domains"
        db_table_comment = "Auth: Manages SSO email address domain mapping to an SSO Identity Provider."


class SsoProviders(models.Model):
    id = models.UUIDField(primary_key=True)
    resource_id = models.TextField(
        blank=True,
        null=True,
        db_comment="Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.",
    )
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "sso_providers"
        db_table_comment = "Auth: Manages SSO identity provider information; see saml_providers for SAML."