# My React App

이 프로젝트는 게시글 작성 및 조회 기능을 제공하는 React 애플리케이션입니다. 사용자는 게시글을 작성하고, 작성된 게시글을 조회할 수 있습니다.

## 프로젝트 구조

```
my-react-app
├── src
│   ├── components
│   │   ├── BoardWrite.tsx  // 게시글 작성 컴포넌트
│   │   └── BoardView.tsx   // 게시글 조회 컴포넌트
│   ├── App.tsx             // 메인 애플리케이션 컴포넌트
│   └── index.tsx           // 애플리케이션 진입점
├── package.json            // npm 설정 파일
├── tsconfig.json           // TypeScript 설정 파일
└── README.md               // 프로젝트 문서
```

## 설치 및 실행

1. 이 저장소를 클론합니다.
   ```
   git clone <repository-url>
   ```

2. 프로젝트 디렉토리로 이동합니다.
   ```
   cd my-react-app
   ```

3. 의존성을 설치합니다.
   ```
   npm install
   ```

4. 애플리케이션을 실행합니다.
   ```
   npm start
   ```

## 기능

- **게시글 작성**: 사용자는 제목과 내용을 입력하여 게시글을 작성할 수 있습니다.
- **게시글 조회**: 작성된 게시글을 서버에서 가져와 목록 형식으로 표시합니다.

## 기술 스택

- React
- TypeScript
- Fetch API

## 기여

기여를 원하시는 분은 이 저장소를 포크한 후, 변경 사항을 커밋하고 풀 리퀘스트를 제출해 주세요.