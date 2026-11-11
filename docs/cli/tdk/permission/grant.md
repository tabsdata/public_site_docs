# tdk permission grant

> Grant a permission to a user

Source: https://docs.tabsdata.com/cli/tdk/permission/grant

Grant a permission to a user

```bash
tdk permission grant \
  --format table \
  --user admin \
  --permission read \
  --proj quickstart \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--user, -u` | string | Required | User to grant the permission to. |
| `--permission` | string | Required | Permission to grant. Valid values are view\_project, develop\_project, manage\_project, create\_projects, manage\_system. The project-scoped permissions (view\_project, develop\_project, manage\_project) require --proj; the system-scoped ones (create\_projects, manage\_system) must not carry --proj. |
| `--proj, -P` | string | Optional | Project the permission applies to. Required for project-scoped permissions, forbidden for system-scoped ones. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
