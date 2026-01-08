# Nuxt AEO Module Publishing Guide

This document guides you through publishing the `nuxt-aeo` module to npm and registering it in the Nuxt module ecosystem.

## Prerequisites

### 1. Check npm Login

First, verify that you are logged in to npm:

```bash
npm whoami
```

If not logged in:

```bash
npm login
```

### 2. Resolve npm Cache Permission Issues (if needed)

If you encounter npm cache permission issues, run the following command:

```bash
sudo chown -R $(whoami) ~/.npm
```

### 3. Verify Git Repository

Check that the Git repository is set up and connected to a remote repository:

```bash
git remote -v
```

If there's no remote repository:

```bash
git remote add origin https://github.com/yeonjulee1005/nuxt-aeo.git
```

## npm Publishing Steps

### 1. Verify Build

Verify that the module builds correctly:

```bash
bun prepack
```

### 2. Run Tests

Verify that all tests pass:

```bash
bun test
bun test:types
bun lint
```

### 3. Update Version

Update the version before publishing a new version:

- Patch version (1.0.5 → 1.0.6): `bun version:patch`
- Minor version (1.0.5 → 1.1.0): `bun version:minor`
- Major version (1.0.5 → 2.0.0): `bun version:major`

Alternatively, you can directly modify the version in `package.json`.

### 4. Publishing Methods

#### Method 1: Using release script (Recommended)

Automatically performs linting, testing, building, changelog generation, publishing, and Git push:

```bash
bun release
```

#### Method 2: Manual Publishing

```bash
# 1. Build
bun prepack

# 2. Publish
npm publish

# 3. Create and push Git tag (optional)
git tag v1.0.6
git push origin v1.0.6
```

### 5. Verify Publication

Verify that the package was published correctly on npm:

```bash
npm view nuxt-aeo
```

Or check in a web browser:
https://www.npmjs.com/package/nuxt-aeo

## Package Update Methods

This section covers how to update an already published package.

### 1. Update Version

Update to a new version:

```bash
# Update patch version (1.0.5 → 1.0.6)
bun version:patch

# Update minor version (1.0.5 → 1.1.0)
bun version:minor

# Update major version (1.0.5 → 2.0.0)
bun version:major
```

Alternatively, you can directly modify the version in `package.json`.

### 2. Publish Update

#### Method 1: Using release script (Recommended)

```bash
bun release
```

This command automatically performs:
- Lint checks
- Test execution
- Build
- CHANGELOG generation
- npm publishing
- Git tag creation and push

#### Method 2: Manual Update Publishing

```bash
# 1. Build
bun prepack

# 2. Publish update
npm publish

# 3. Create and push Git tag
git tag v1.0.6
git push origin v1.0.6
```

### 3. Verify Update

Verify that the update was published correctly:

```bash
# Check latest version
npm view nuxt-aeo version

# Check full information
npm view nuxt-aeo

# Check specific version
npm view nuxt-aeo@1.0.6
```

### 4. Notify Users

Once the update is complete:
- Changes will be automatically added to CHANGELOG.md
- A tag will be created in GitHub Releases
- The new version will appear on the npm package page

## Nuxt Module Ecosystem Registration

Once publishing to npm is complete, you can register in the official Nuxt module directory.

### Option 1: Register in Module List (Simple Registration)

You can register your module in the list by creating an issue in the [nuxt/modules](https://github.com/nuxt/modules) repository.

### Option 2: Join nuxt-modules Organization (Recommended)

Joining the `nuxt-modules` organization provides the following benefits:
- Receive help from other maintainers
- Can rename to `@nuxtjs/` scope (e.g., `@nuxtjs/aeo`)
- Subdomain provided for documentation (e.g., `aeo.nuxtjs.org`)
- More exposure to users

#### nuxt-modules Joining Procedure

1. **Prepare Issue Template**

  A `NUXT_MODULES_ISSUE.md` file is created in the project root. Copy the contents of this file and paste it into the issue.

2. **Create Issue**
  
  Create an issue in the [nuxt/modules](https://github.com/nuxt/modules) repository:

  1. Go to https://github.com/nuxt/modules
  2. Click the "Issues" tab
  3. Click "New Issue"
  4. Copy the contents of the `NUXT_MODULES_ISSUE.md` file and paste it into the issue

3. **Wait for Nuxt Team Review**
  
  The Nuxt team will review the module and may provide feedback. Respond appropriately.

4. **Repository Transfer**

  Once approved, the repository can be transferred to the `nuxt-modules` organization, and the package name can be changed to `@nuxtjs/aeo` if needed.

5. **Completion**
  Once the join is complete, the module will be registered at [nuxt.com/modules](https://nuxt.com/modules) and can be used with the `@nuxtjs/` scope.

#### Reference Materials

- [Nuxt Official Documentation: Join nuxt-modules](https://nuxt.com/docs/4.x/guide/modules/ecosystem#join-nuxt-modules)

## Additional Notes

### Package Naming Rules

- Nuxt modules are recommended to use the `nuxt-` prefix
- Current package name: `nuxt-aeo` ✅

### Version Management

- Follow [Semantic Versioning](https://semver.org/)
- Major changes require major version update
- New features require minor version update
- Bug fixes require patch version update

### CHANGELOG

Using `npm run release` will automatically generate CHANGELOG.md.
To write manually, use `changelogen`:

```bash
npx changelogen --release
```

## Troubleshooting

### When npm publish Fails

1. **401 Unauthorized**: npm login required. Run `npm login`
2. **403 Forbidden**: Package name is already in use or you don't have permission
3. **EPERM Error**: npm cache permission issue. Run `sudo chown -R $(whoami) ~/.npm`

### Git Tag Issues

If a tag already exists:

```bash
# Delete local tag
git tag -d v1.0.6

# Delete remote tag
git push origin :refs/tags/v1.0.6
```

## Reference Links

- [npm Documentation](https://docs.npmjs.com/)
- [Nuxt Module Development Guide](https://nuxt.com/docs/4.x/guide/going-further/modules)
- [Nuxt Modules Repository](https://github.com/nuxt/modules)
- [Semantic Versioning](https://semver.org/)
