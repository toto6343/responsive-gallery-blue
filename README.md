# 🌊 WH's Web Gallery - Responsive Photo Gallery

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

핀터레스트(Pinterest) 스타일의 반응형 수중 사진 갤러리 웹사이트입니다. Isotope.js를 활용한 동적 필터링과 Masonry 레이아웃을 제공합니다.

![Gallery Preview](https://github.com/user-attachments/assets/146fc7aa-6414-4e68-97ce-82128e34d235)

## ✨ 주요 기능

### 🎯 핵심 기능

- **동적 필터링**: ALL / ODD / EVEN 카테고리별 실시간 필터링
- **Masonry 레이아웃**: 핀터레스트 스타일의 유동적인 그리드 시스템
- **반응형 디자인**: 모바일부터 대형 데스크톱까지 완벽 지원
- **부드러운 애니메이션**: CSS3 트랜지션과 호버 효과
- **이미지 Lazy Loading**: 성능 최적화를 위한 지연 로딩

### 🎨 디자인 특징

- **그라데이션 배경**: 보라색에서 파란색으로 이어지는 모던한 헤더
- **카드 기반 UI**: 깔끔한 화이트 카드 디자인
- **호버 효과**: 이미지 확대 및 카드 리프트 애니메이션
- **타이포그래피**: Orbitron 폰트를 활용한 미래지향적 느낌

### ♿ 접근성

- **WCAG 2.1 준수**: 웹 접근성 가이드라인 준수
- **키보드 네비게이션**: 전체 기능 키보드 접근 가능
- **ARIA 레이블**: 스크린 리더 완벽 지원
- **시맨틱 HTML**: 의미있는 마크업 구조

## 🚀 빠른 시작

### 필수 요구사항

- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 로컬 서버 환경 (선택사항)

### 설치 방법

1. **저장소 클론**

```bash
git clone https://github.com/toto6343/responsive-gallery-blue.git
cd responsive-gallery-blue
```

2. **파일 구조 확인**

```
responsive-gallery-blue-master/
┣ 📂css/
┃ ┗ 📜style.css
┣ 📂img/
┃ ┣ 📜p1.jpg ~ p20.jpg
┃ ┗ ...
┣ 📂js/
┃ ┣ 📜main.js
┃ ┣ 📜isotope.pkgd.min.js
┃ ┗ 📜ie.js
┣ 📜index.html
┣ 📜favicon.ico
┗ 📜README.md
```

3. **실행하기**

- **방법 1**: `index.html` 파일을 브라우저로 직접 열기
- **방법 2**: 로컬 서버 사용

  ```bash
  # Python 3
  python -m http.server 8000

  # Node.js (http-server)
  npx http-server
  ```

4. **브라우저에서 확인**

```
http://localhost:8000
```

## 📁 프로젝트 구조

```
responsive-gallery-blue-master/
│
├── index.html              # 메인 HTML 파일
├── favicon.ico             # 파비콘
├── README.md               # 프로젝트 문서
│
├── css/
│   └── style.css           # 메인 스타일시트
│                           # - CSS Variables (Design Tokens)
│                           # - 반응형 미디어 쿼리
│                           # - 애니메이션 & 트랜지션
│                           # - 접근성 스타일
│
├── js/
│   ├── main.js             # 메인 JavaScript (갤러리 로직)
│   │                       # - GalleryManager 클래스
│   │                       # - 필터링 기능
│   │                       # - 이벤트 핸들링
│   ├── isotope.pkgd.min.js # Isotope 라이브러리 (v3.0.6)
│   └── ie.js               # IE 11 폴리필 (선택사항)
│
└── img/
    ├── p1.jpg ~ p20.jpg    # 갤러리 이미지 (20개)
    └── ...                 # 수중 사진 컬렉션
```

## 🎨 커스터마이징

### 색상 변경

`css/style.css` 파일의 CSS Variables를 수정하세요:

```css
:root {
  /* 메인 컬러 */
  --color-primary: #4b0082; /* 보라색 */
  --color-secondary: #1e90ff; /* 파란색 */
  --color-accent: #ffd700; /* 골드 */

  /* 텍스트 컬러 */
  --color-text-dark: #444;
  --color-text-light: #777;
}
```

### 이미지 추가

1. `img/` 폴더에 이미지 추가
2. `index.html`에 새로운 article 블록 추가:

```html
<article class="gallery-item odd" data-category="odd">
  <div class="item-wrapper">
    <img src="img/your-image.jpg" alt="이미지 설명" loading="lazy" />
    <h2>제목</h2>
    <p>설명</p>
  </div>
</article>
```

### 필터 카테고리 추가

1. `index.html`의 필터 네비게이션에 버튼 추가:

```html
<li>
  <a href=".new-category" data-filter=".new-category">NEW</a>
</li>
```

2. 이미지 아이템에 클래스 추가:

```html
<article class="gallery-item new-category"></article>
```

## 📱 반응형 브레이크포인트

| 디바이스      | 해상도          | 컬럼 수 | 헤더 레이아웃    |
| ------------- | --------------- | ------- | ---------------- |
| 대형 데스크톱 | 1600px+         | 5개     | 사이드바 (400px) |
| 데스크톱      | 1200px - 1599px | 4개     | 사이드바 (350px) |
| 태블릿        | 900px - 1199px  | 4개     | 상단 바 (80px)   |
| 소형 태블릿   | 680px - 899px   | 3개     | 상단 바          |
| 모바일 가로   | 540px - 679px   | 2개     | 상단 바          |
| 모바일 세로   | ~ 539px         | 1개     | 상단 바 (간소화) |

## 🛠️ 기술 스택

### 프론트엔드

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, Animations, Variables
- **JavaScript ES6+**: 클래스, Promise, Arrow Functions

### 라이브러리 & 플러그인

- **[Isotope.js](https://isotope.metafizzy.co/)** v3.0.6 - 필터링 & 레이아웃
- **[Font Awesome](https://fontawesome.com/)** - 아이콘
- **[Google Fonts](https://fonts.google.com/)** - Orbitron 폰트

### 개발 도구

- Git & GitHub
- VS Code
- Chrome DevTools

## 🌐 브라우저 지원

| 브라우저 | 지원 버전        |
| -------- | ---------------- |
| Chrome   | 최신 2개 버전 ✅ |
| Firefox  | 최신 2개 버전 ✅ |
| Safari   | 최신 2개 버전 ✅ |
| Edge     | 최신 2개 버전 ✅ |
| IE 11    | 제한적 지원 ⚠️   |

> **참고**: IE 11을 위해 `js/ie.js` 폴리필을 포함했습니다.

## 📊 성능 최적화

### 구현된 최적화

- ✅ **이미지 Lazy Loading**: `loading="lazy"` 속성
- ✅ **CSS 애니메이션**: GPU 가속 활용
- ✅ **Debounced Resize**: 리사이즈 이벤트 최적화
- ✅ **minified 라이브러리**: Isotope 압축 버전 사용
- ✅ **Font Display Swap**: 폰트 로딩 최적화

### 성능 지표 (Lighthouse)

- **Performance**: 95+ 🟢
- **Accessibility**: 100 🟢
- **Best Practices**: 95+ 🟢
- **SEO**: 100 🟢

## 🔒 라이선스

이 프로젝트는 **MIT 라이선스** 하에 배포됩니다.

```
MIT License

Copyright (c) 2024 WH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🤝 기여하기

프로젝트에 기여하고 싶으신가요? 환영합니다! 🎉

1. 이 저장소를 Fork 하세요
2. 새로운 브랜치를 만드세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 열어주세요

### 기여 가이드라인

- 코드 스타일 가이드 준수
- 명확한 커밋 메시지 작성
- 테스트 코드 추가 (해당시)
- 문서 업데이트

## 📞 문의 및 지원

### 버그 리포트

GitHub Issues를 통해 버그를 신고해주세요:
[Issues 페이지](https://github.com/toto6343/responsive-gallery-blue/issues)

### 질문 및 토론

- **Email**: yongbum0202@naver.com
- **Discussions**: [GitHub Discussions](https://github.com/toto6343/responsive-gallery-blue/discussions)

## 🎓 학습 자료

프로젝트를 이해하는데 도움이 되는 자료들:

- [Isotope Documentation](https://isotope.metafizzy.co/)
- [MDN Web Docs - CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [MDN Web Docs - Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)

## 📸 스크린샷

### 데스크톱 뷰

![Desktop View](https://github.com/user-attachments/assets/146fc7aa-6414-4e68-97ce-82128e34d235)

### 태블릿 뷰

![Tablet View](https://github.com/user-attachments/assets/437e547e-6257-4f5e-a9cf-42c327dc4f9e)

### 모바일 뷰

![Mobile View](https://github.com/user-attachments/assets/f5c67cac-2c81-4e3d-ab70-af08e1351e03)

## 🔄 버전 히스토리

### v2.0.0 (2024-12-09)

- 🎨 완전히 새로운 UI/UX 디자인
- ♿ 접근성 대폭 개선 (WCAG 2.1)
- 🚀 성능 최적화 (Lazy Loading, Debouncing)
- 📱 반응형 디자인 강화
- 🔧 코드 리팩토링 (클래스 기반 구조)

### v1.0.0 (2024-01-01)

- 🎉 초기 릴리즈
- ✨ 기본 갤러리 기능
- 🎯 필터링 시스템
- 📱 반응형 레이아웃

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들의 도움을 받았습니다:

- [Isotope](https://isotope.metafizzy.co/) by Metafizzy
- [Font Awesome](https://fontawesome.com/) by Fonticons
- [Google Fonts](https://fonts.google.com/) by Google

## 📝 TODO

- [ ] 다크 모드 지원
- [ ] 이미지 라이트박스 기능
- [ ] 무한 스크롤 구현
- [ ] PWA 지원
- [ ] 다국어 지원 (i18n)
- [ ] 검색 기능 추가
- [ ] 이미지 업로드 기능

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요! ⭐**

Made with ❤️ by [WH](https://github.com/toto6343)

[📧 이메일](yongbum0202@naver.com)

</div>
