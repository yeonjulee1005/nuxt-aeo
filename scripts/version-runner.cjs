#!/usr/bin/env node

const { spawn } = require('node:child_process')
const path = require('node:path')

// Get command line arguments
const versionType = process.argv[2]

if (!versionType || !['major', 'minor', 'patch', 'clear'].includes(versionType)) {
  console.error('Usage: node version-runner.js [major|minor|patch|clear]')
  process.exit(1)
}

// Function to run fallback script in CommonJS version
function runFallbackScript() {
  const cjsScript = path.join(__dirname, 'version-manager.cjs')

  const cjsProcess = spawn('node', [cjsScript, versionType], {
    stdio: 'inherit',
    cwd: process.cwd(),
  })

  cjsProcess.on('error', () => {
    console.error('❌ 모든 버전 관리 스크립트 실행에 실패했습니다.')
    console.error('💡 해결방법: npm install을 실행하여 package-lock.json 파일을 생성하세요.')
    process.exit(1)
  })

  cjsProcess.on('exit', (cjsCode) => {
    process.exit(cjsCode)
  })
}

// Detect environment and run appropriate script
function runVersionManager() {
  const esmScript = path.join(__dirname, 'version-manager.js')

  console.log('🔍 Running version management script...')

  // Try ESM version first
  const esmProcess = spawn('node', [esmScript, versionType], {
    stdio: 'inherit',
    cwd: process.cwd(),
  })

  esmProcess.on('error', () => {
    console.log('⚠️  ESM 버전 실행 실패, CommonJS 버전으로 시도합니다...')
    runFallbackScript()
  })

  esmProcess.on('exit', (code) => {
    if (code !== 0) {
      console.log('⚠️  ESM 버전 실행 실패, CommonJS 버전으로 시도합니다...')
      runFallbackScript()
    }
    else {
      process.exit(code)
    }
  })
}

runVersionManager()
