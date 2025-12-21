# Nuxt AEO 모듈 발행 가이드

이 문서는 `nuxt-aeo` 모듈을 npm에 발행하고 Nuxt 모듈 생태계에 등록하는 방법을 안내합니다.

## 사전 준비

### 1. npm 로그인 확인

먼저 npm에 로그인되어 있는지 확인하세요:

```bash
npm whoami
```

로그인되어 있지 않다면:

```bash
npm login
```

### 2. npm 캐시 권한 문제 해결 (필요한 경우)

npm 캐시 권한 문제가 발생하는 경우 다음 명령어를 실행하세요:

```bash
sudo chown -R $(whoami) ~/.npm
```

### 3. Git 저장소 확인

Git 저장소가 설정되어 있고 원격 저장소가 연결되어 있는지 확인하세요:

```bash
git remote -v
```

원격 저장소가 없다면:

```bash
git remote add origin https://github.com/yeonjulee1005/nuxt-aeo.git
```

## npm 발행 단계

### 1. 빌드 확인

모듈이 제대로 빌드되는지 확인:

```bash
bun prepack
```

### 2. 테스트 실행

모든 테스트가 통과하는지 확인:

```bash
bun test
bun test:types
bun lint
```

### 3. 버전 업데이트

새 버전을 발행하기 전에 버전을 업데이트하세요:

- 패치 버전 (1.0.5 → 1.0.6): `bun version:patch`
- 마이너 버전 (1.0.5 → 1.1.0): `bun version:minor`
- 메이저 버전 (1.0.5 → 2.0.0): `bun version:major`

또는 `package.json`에서 직접 버전을 수정할 수 있습니다.

### 4. 발행 방법

#### 방법 1: release 스크립트 사용 (권장)

자동으로 린트, 테스트, 빌드, 변경 로그 생성, 발행, Git 푸시를 수행합니다:

```bash
bun release
```

#### 방법 2: 수동 발행

```bash
# 1. 빌드
bun prepack

# 2. 발행
npm publish

# 3. Git 태그 생성 및 푸시 (선택사항)
git tag v1.0.6
git push origin v1.0.6
```

### 5. 발행 확인

npm에서 패키지가 제대로 발행되었는지 확인:

```bash
npm view nuxt-aeo
```

또는 웹 브라우저에서 확인:
https://www.npmjs.com/package/nuxt-aeo

## 패키지 업데이트 방법

이미 발행된 패키지를 업데이트하는 방법입니다.

### 1. 버전 업데이트

새 버전으로 업데이트:

```bash
# 패치 버전 업데이트 (1.0.5 → 1.0.6)
bun version:patch

# 마이너 버전 업데이트 (1.0.5 → 1.1.0)
bun version:minor

# 메이저 버전 업데이트 (1.0.5 → 2.0.0)
bun version:major
```

또는 `package.json`에서 직접 버전을 수정할 수 있습니다.

### 2. 업데이트 발행

#### 방법 1: release 스크립트 사용 (권장)

```bash
bun release
```

이 명령어는 다음을 자동으로 수행합니다:
- 린트 검사
- 테스트 실행
- 빌드
- CHANGELOG 생성
- npm 발행
- Git 태그 생성 및 푸시

#### 방법 2: 수동 업데이트 발행

```bash
# 1. 빌드
bun prepack

# 2. 업데이트 발행
npm publish

# 3. Git 태그 생성 및 푸시
git tag v1.0.6
git push origin v1.0.6
```

### 3. 업데이트 확인

업데이트가 제대로 발행되었는지 확인:

```bash
# 최신 버전 확인
npm view nuxt-aeo version

# 전체 정보 확인
npm view nuxt-aeo

# 특정 버전 확인
npm view nuxt-aeo@1.0.6
```

### 4. 사용자에게 알리기

업데이트가 완료되면:
- CHANGELOG.md에 변경 사항이 자동으로 추가됩니다
- GitHub Releases에 태그가 생성됩니다
- npm 패키지 페이지에 새 버전이 표시됩니다

## Nuxt 모듈 생태계 등록

npm에 발행이 완료되면 Nuxt 공식 모듈 디렉토리에 등록할 수 있습니다.

### 옵션 1: 모듈 리스트에 등록 (간단한 등록)

[nuxt/modules](https://github.com/nuxt/modules) 저장소에 이슈를 생성하여 모듈을 리스트에 등록할 수 있습니다.

### 옵션 2: nuxt-modules 조직에 합류 (권장)

`nuxt-modules` 조직에 합류하면 다음과 같은 이점이 있습니다:
- 다른 유지보수자들의 도움을 받을 수 있음
- `@nuxtjs/` 스코프로 이름 변경 가능 (예: `@nuxtjs/aeo`)
- 문서를 위한 서브도메인 제공 (예: `aeo.nuxtjs.org`)
- 더 많은 사용자에게 노출

#### nuxt-modules 합류 절차

1. **이슈 템플릿 준비**

  프로젝트 루트에 `NUXT_MODULES_ISSUE.md` 파일이 생성되어 있습니다. 이 파일의 내용을 복사하여 이슈에 붙여넣기

2. **이슈 생성**
  
  [nuxt/modules](https://github.com/nuxt/modules) 저장소에 이슈를 생성하세요:

  1. https://github.com/nuxt/modules 로 이동
  2. "Issues" 탭 클릭
  3. "New Issue" 클릭
  4. `NUXT_MODULES_ISSUE.md` 파일의 내용을 복사하여 이슈에 붙여넣기

3. **Nuxt 팀 검토 대기**
  
  Nuxt 팀이 모듈을 검토하고 피드백을 제공할 수 있습니다. 적절히 응답하세요.

4. **저장소 이전**

  승인되면 저장소를 `nuxt-modules` 조직으로 이전하고, 필요시 패키지 이름을 `@nuxtjs/aeo`로 변경할 수 있습니다.

5. **완료** 
  합류가 완료되면 모듈이 [nuxt.com/modules](https://nuxt.com/modules)에 등록되고, `@nuxtjs/` 스코프로 사용할 수 있게 됩니다.

#### 참고 자료

- [Nuxt 공식 문서: Join nuxt-modules](https://nuxt.com/docs/4.x/guide/modules/ecosystem#join-nuxt-modules)

## 추가 참고사항

### 패키지 이름 규칙

- Nuxt 모듈은 `nuxt-` 접두사를 사용하는 것이 권장됩니다
- 현재 패키지 이름: `nuxt-aeo` ✅

### 버전 관리

- [Semantic Versioning](https://semver.org/)을 따르세요
- 주요 변경사항은 메이저 버전 업데이트
- 새로운 기능 추가는 마이너 버전 업데이트
- 버그 수정은 패치 버전 업데이트

### CHANGELOG

`npm run release`를 사용하면 자동으로 CHANGELOG.md가 생성됩니다. 
수동으로 작성하려면 `changelogen`을 사용하세요:

```bash
npx changelogen --release
```

## 문제 해결

### npm publish 실패 시

1. **401 Unauthorized**: npm 로그인이 필요합니다. `npm login` 실행
2. **403 Forbidden**: 패키지 이름이 이미 사용 중이거나 권한이 없습니다
3. **EPERM 오류**: npm 캐시 권한 문제. `sudo chown -R $(whoami) ~/.npm` 실행

### Git 태그 문제

태그가 이미 존재하는 경우:

```bash
# 로컬 태그 삭제
git tag -d v1.0.6

# 원격 태그 삭제
git push origin :refs/tags/v1.0.6
```

## 참고 링크

- [npm 문서](https://docs.npmjs.com/)
- [Nuxt 모듈 개발 가이드](https://nuxt.com/docs/4.x/guide/going-further/modules)
- [Nuxt Modules 저장소](https://github.com/nuxt/modules)
- [Semantic Versioning](https://semver.org/)
