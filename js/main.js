/**
 * WH's Web Gallery - Main JavaScript
 * 핀터레스트 스타일 갤러리 애플리케이션
 * @version 2.0.0
 */

// ==========================================
// Constants & Configuration
// ==========================================
const GALLERY_CONFIG = {
	container: '.gallery',
	itemSelector: '.gallery-item',
	columnWidth: '.gallery-item',
	transitionDuration: '0.5s',
	percentPosition: true,
	masonry: {
		columnWidth: '.gallery-item'
	}
};

const FILTER_CONFIG = {
	navSelector: '.filter-nav ul li',
	activeClass: 'on',
	defaultFilter: '*'
};

// ==========================================
// Gallery Manager Class
// ==========================================
class GalleryManager {
	constructor(config) {
		this.config = config;
		this.grid = null;
		this.filterButtons = null;
		this.currentFilter = FILTER_CONFIG.defaultFilter;
		this.isInitialized = false;
	}

	/**
	 * 갤러리 초기화
	 */
	init() {
		try {
			this.initIsotope();
			this.initFilterButtons();
			this.initImageLoading();
			this.isInitialized = true;
			console.log('✅ Gallery initialized successfully');
		} catch (error) {
			console.error('❌ Gallery initialization failed:', error);
			this.handleError(error);
		}
	}

	/**
	 * Isotope 그리드 초기화
	 */
	initIsotope() {
		const container = document.querySelector(GALLERY_CONFIG.container);
		
		if (!container) {
			throw new Error(`Container not found: ${GALLERY_CONFIG.container}`);
		}

		// Isotope 인스턴스 생성
		this.grid = new Isotope(container, {
			itemSelector: GALLERY_CONFIG.itemSelector,
			layoutMode: 'masonry',
			masonry: {
				columnWidth: GALLERY_CONFIG.columnWidth
			},
			transitionDuration: GALLERY_CONFIG.transitionDuration,
			percentPosition: GALLERY_CONFIG.percentPosition,
			// 초기 레이아웃 방지 (이미지 로드 후 수동 실행)
			initLayout: false
		});

		// 이미지 로드 완료 후 레이아웃 적용
		this.waitForImages().then(() => {
			this.grid.layout();
		});
	}

	/**
	 * 모든 이미지 로드 대기
	 * @returns {Promise}
	 */
	waitForImages() {
		return new Promise((resolve) => {
			const images = document.querySelectorAll(`${GALLERY_CONFIG.itemSelector} img`);
			let loadedCount = 0;
			const totalImages = images.length;

			if (totalImages === 0) {
				resolve();
				return;
			}

			const checkAllLoaded = () => {
				loadedCount++;
				if (loadedCount === totalImages) {
					resolve();
				}
			};

			images.forEach((img) => {
				if (img.complete) {
					checkAllLoaded();
				} else {
					img.addEventListener('load', checkAllLoaded);
					img.addEventListener('error', checkAllLoaded);
				}
			});
		});
	}

	/**
	 * 이미지 Lazy Loading 구현
	 */
	initImageLoading() {
		if ('loading' in HTMLImageElement.prototype) {
			// 브라우저가 native lazy loading 지원
			return;
		}

		// IntersectionObserver를 사용한 폴리필
		const imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src || img.src;
					img.classList.add('loaded');
					observer.unobserve(img);
				}
			});
		});

		const images = document.querySelectorAll(`${GALLERY_CONFIG.itemSelector} img`);
		images.forEach(img => imageObserver.observe(img));
	}

	/**
	 * 필터 버튼 초기화
	 */
	initFilterButtons() {
		this.filterButtons = document.querySelectorAll(FILTER_CONFIG.navSelector);

		if (this.filterButtons.length === 0) {
			console.warn('⚠️ No filter buttons found');
			return;
		}

		// 각 버튼에 이벤트 리스너 추가
		this.filterButtons.forEach((button) => {
			button.addEventListener('click', (e) => this.handleFilterClick(e));
			
			// 키보드 접근성 개선
			button.addEventListener('keypress', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					this.handleFilterClick(e);
				}
			});
		});
	}

	/**
	 * 필터 버튼 클릭 핸들러
	 * @param {Event} e - 클릭 이벤트
	 */
	handleFilterClick(e) {
		e.preventDefault();

		const button = e.currentTarget;
		const link = button.querySelector('a');
		
		if (!link) return;

		// data-filter 속성 또는 href에서 필터 값 가져오기
		const filterValue = link.dataset.filter || link.getAttribute('href');

		// 같은 필터 클릭 시 무시
		if (filterValue === this.currentFilter) {
			return;
		}

		// 필터 적용
		this.applyFilter(filterValue);

		// 활성 버튼 업데이트
		this.updateActiveButton(button);

		// 현재 필터 저장
		this.currentFilter = filterValue;

		// 분석 추적 (선택사항)
		this.trackFilterChange(filterValue);
	}

	/**
	 * 필터 적용
	 * @param {string} filterValue - 필터 선택자
	 */
	applyFilter(filterValue) {
		if (!this.grid) {
			console.error('❌ Grid not initialized');
			return;
		}

		try {
			this.grid.arrange({
				filter: filterValue
			});

			// 접근성: 스크린 리더에 필터 변경 알림
			this.announceFilterChange(filterValue);

		} catch (error) {
			console.error('❌ Filter application failed:', error);
		}
	}

	/**
	 * 활성 버튼 업데이트
	 * @param {HTMLElement} activeButton - 활성화할 버튼
	 */
	updateActiveButton(activeButton) {
		// 모든 버튼에서 활성 클래스 제거
		this.filterButtons.forEach((button) => {
			button.classList.remove(FILTER_CONFIG.activeClass);
			button.querySelector('a')?.setAttribute('aria-pressed', 'false');
		});

		// 클릭한 버튼에 활성 클래스 추가
		activeButton.classList.add(FILTER_CONFIG.activeClass);
		activeButton.querySelector('a')?.setAttribute('aria-pressed', 'true');
	}

	/**
	 * 필터 변경 알림 (접근성)
	 * @param {string} filterValue - 필터 값
	 */
	announceFilterChange(filterValue) {
		const filterName = this.getFilterName(filterValue);
		const message = `${filterName} 필터가 적용되었습니다.`;

		// ARIA live region에 메시지 추가
		let announcement = document.getElementById('filter-announcement');
		if (!announcement) {
			announcement = document.createElement('div');
			announcement.id = 'filter-announcement';
			announcement.className = 'sr-only';
			announcement.setAttribute('role', 'status');
			announcement.setAttribute('aria-live', 'polite');
			document.body.appendChild(announcement);
		}

		announcement.textContent = message;

		// 메시지 제거 (다음 알림을 위해)
		setTimeout(() => {
			announcement.textContent = '';
		}, 1000);
	}

	/**
	 * 필터 이름 가져오기
	 * @param {string} filterValue - 필터 값
	 * @returns {string}
	 */
	getFilterName(filterValue) {
		const filterMap = {
			'*': '전체',
			'.odd': '홀수',
			'.even': '짝수'
		};
		return filterMap[filterValue] || filterValue;
	}

	/**
	 * 필터 변경 추적 (분석용)
	 * @param {string} filterValue - 필터 값
	 */
	trackFilterChange(filterValue) {
		// Google Analytics, Mixpanel 등의 분석 도구와 통합 가능
		if (typeof gtag !== 'undefined') {
			gtag('event', 'filter_change', {
				'event_category': 'gallery',
				'event_label': filterValue
			});
		}
	}

	/**
	 * 갤러리 새로고침
	 */
	refresh() {
		if (this.grid) {
			this.grid.layout();
		}
	}

	/**
	 * 갤러리 리사이즈 (debounced)
	 */
	handleResize = this.debounce(() => {
		this.refresh();
	}, 250);

	/**
	 * Debounce 유틸리티 함수
	 * @param {Function} func - 실행할 함수
	 * @param {number} wait - 대기 시간 (ms)
	 * @returns {Function}
	 */
	debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	/**
	 * 에러 핸들링
	 * @param {Error} error - 에러 객체
	 */
	handleError(error) {
		// 사용자에게 친화적인 에러 메시지 표시
		const errorContainer = document.createElement('div');
		errorContainer.className = 'gallery-error';
		errorContainer.textContent = '갤러리를 로드하는 중 오류가 발생했습니다. 페이지를 새로고침해주세요.';
		errorContainer.style.cssText = `
			padding: 20px;
			margin: 20px;
			background: #fee;
			border: 1px solid #fcc;
			border-radius: 5px;
			color: #c00;
			text-align: center;
		`;
		
		const mainElement = document.querySelector('main');
		if (mainElement) {
			mainElement.insertBefore(errorContainer, mainElement.firstChild);
		}
	}

	/**
	 * 갤러리 파괴 (메모리 정리)
	 */
	destroy() {
		if (this.grid) {
			this.grid.destroy();
			this.grid = null;
		}

		if (this.filterButtons) {
			this.filterButtons.forEach((button) => {
				button.removeEventListener('click', this.handleFilterClick);
			});
		}

		window.removeEventListener('resize', this.handleResize);

		this.isInitialized = false;
		console.log('🗑️ Gallery destroyed');
	}
}

// ==========================================
// Application Initialization
// ==========================================

/**
 * DOM 로드 완료 후 갤러리 초기화
 */
const initializeGallery = () => {
	// GalleryManager 인스턴스 생성
	const gallery = new GalleryManager(GALLERY_CONFIG);

	// 갤러리 초기화
	gallery.init();

	// 윈도우 리사이즈 이벤트 처리
	window.addEventListener('resize', gallery.handleResize);

	// 전역 객체에 gallery 인스턴스 저장 (디버깅 및 외부 접근용)
	window.galleryInstance = gallery;

	// 페이지 언로드 시 정리
	window.addEventListener('beforeunload', () => {
		gallery.destroy();
	});
};

// ==========================================
// Event Listeners
// ==========================================

// DOM이 완전히 로드된 후 실행
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
	// DOMContentLoaded가 이미 발생한 경우 즉시 실행
	initializeGallery();
}

// 페이지 전환 시 (SPA 환경)
window.addEventListener('pageshow', (event) => {
	// bfcache에서 복원된 경우 갤러리 새로고침
	if (event.persisted && window.galleryInstance) {
		window.galleryInstance.refresh();
	}
});

// ==========================================
// Export (ES6 모듈 환경)
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { GalleryManager, GALLERY_CONFIG, FILTER_CONFIG };
}