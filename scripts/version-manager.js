#!/usr/bin/env node

import fs from 'node:fs'
import path, { dirname } from 'node:path'
import readline from 'node:readline'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// Replace __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageJsonPath = path.join(__dirname, '../package.json')
const packageLockPath = path.join(__dirname, '../package-lock.json')

// Check if required files exist
if (!fs.existsSync(packageJsonPath)) {
  throw new Error('❌ package.json file not found.')
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

// Use package-lock.json if it exists, ignore if not
let packageLock = null
if (fs.existsSync(packageLockPath)) {
  packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'))
  console.log('📦 package-lock.json 파일을 찾았습니다. 함께 업데이트합니다.')
}
else {
  console.log('⚠️  package-lock.json 파일이 없습니다. package.json만 업데이트합니다.')
}

const currentVersion = packageJson.version
const versionType = process.argv[2]

if (
  !versionType
  || !['major', 'minor', 'patch', 'clear'].includes(versionType)
) {
  console.error('사용법: node version-manager.js [major|minor|patch|clear]')
  console.error('예시: npm run version:major')
  console.error('      npm run version:clear')
  process.exit(1)
}

const parseHeadVersion = (version) => {
  const parts = version.split('.')
  if (parts.length !== 3) {
    // Convert initial version to headVersion if it's in semver format
    return {
      major: 1,
      minor: 0,
      patch: 1,
    }
  }

  return {
    major: Number.parseInt(parts[0]),
    minor: Number.parseInt(parts[1]),
    patch: Number.parseInt(parts[2]),
  }
}

const incrementVersion = (current, type) => {
  const parsed = parseHeadVersion(current)

  switch (type) {
    case 'clear':
      return {
        major: 1,
        minor: 0,
        patch: 1,
      }
    case 'major':
      // Reset minor and patch when major increases
      return {
        major: parsed.major + 1,
        minor: 0,
        patch: 1,
      }
    case 'minor':
      // Reset patch when minor increases
      return {
        major: parsed.major,
        minor: parsed.minor + 1,
        patch: 1,
      }
    case 'patch':
      // Increment patch
      return {
        major: parsed.major,
        minor: parsed.minor,
        patch: parsed.patch + 1,
      }
    default:
      throw new Error('지원하지 않는 버전 타입입니다.')
  }
}

const formatHeadVersion = (versionObj) => {
  return `${versionObj.major}.${versionObj.minor}.${versionObj.patch}`
}

const main = async () => {
  try {
    // Confirmation message for clear
    if (versionType === 'clear') {
      console.log(`⚠️  Attempting to reset current version ${currentVersion}.`)
      console.log('This operation cannot be undone.')

      // Get synchronous input in Node.js
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      const answer = await new Promise((resolve) => {
        rl.question('계속하시겠습니까? (y/N): ', resolve)
      })

      rl.close()

      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        console.log('버전 초기화가 취소되었습니다.')
        process.exit(0)
      }
    }

    const newVersionObj = incrementVersion(currentVersion, versionType)
    const newVersion = formatHeadVersion(newVersionObj)

    console.log(`현재 버전: ${currentVersion}`)
    console.log(`새 버전: ${newVersion}`)
    console.log(`버전 타입: ${versionType}`)

    // Update package.json
    packageJson.version = newVersion
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n',
    )

    // Update package-lock.json (only if it exists)
    if (packageLock) {
      packageLock.version = newVersion
      if (packageLock.packages && packageLock.packages['']) {
        packageLock.packages[''].version = newVersion
      }
      fs.writeFileSync(
        packageLockPath,
        JSON.stringify(packageLock, null, 2) + '\n',
      )
      console.log('✅ package.json과 package-lock.json이 성공적으로 업데이트되었습니다.')
    }
    else {
      console.log('✅ package.json이 성공적으로 업데이트되었습니다.')
    }

    // Create Git commit (optional)
    try {
      if (packageLock) {
        execSync(`git add package.json package-lock.json`)
      }
      else {
        execSync(`git add package.json`)
      }
      execSync(`git commit -m "chore: bump version to ${newVersion}"`)
      execSync(`git tag v${newVersion}`)
      console.log(`✅ Git 커밋과 태그(v${newVersion})가 생성되었습니다.`)
    }
    catch (gitError) {
      console.log(
        '⚠️  Git 커밋/태그 생성 중 오류가 발생했습니다:',
        gitError.message,
      )
      console.log('수동으로 커밋해주세요.')
    }
  }
  catch (error) {
    console.error('❌ 버전 업데이트 중 오류가 발생했습니다:', error.message)
    process.exit(1)
  }
}

// Execute main function
main()
