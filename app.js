/**
 * Resume Web Application Script
 */

// Project Database for Modals
const projectsData = {
    "1": {
        title: "Petmily (반려동물 매칭 및 케어 서비스)",
        subtitle: "반려인과 전문 펫시터를 1:1 매칭하고 실시간 돌봄 공유 플랫폼",
        period: "2024.01 - 2024.03 (3인 팀 프로젝트)",
        gradient: "linear-gradient(135deg, #6366f1, #a855f7)",
        iconClass: "fa-solid fa-paw",
        tags: ["FastAPI", "React", "WebSocket", "PostgreSQL", "Docker"],
        description: "반려인과 검증된 펫시터를 연결해 주고 실시간으로 반려동물 돌봄 상황을 체크 및 일지 공유를 지원하는 종합 펫케어 서비스입니다.",
        achievements: [
            "FastAPI의 비동기 라우터 연산을 통해 매칭 트랜잭션 동시성 처리를 극대화하고 서버 응답 시간을 15% 단축했습니다.",
            "WebSocket 및 Redis Pub/Sub을 설계하여 반려인과 펫시터 간 실시간 1:1 채팅 서비스와 매칭 진행 상황 라이브 알림을 구현했습니다.",
            "OAuth2 및 JWT 토큰 기반 회원 보안 인증 체계를 고도화하고 안전한 소셜 로그인 모듈을 완성했습니다.",
            "돌봄 일지 작성 시 첨부하는 대용량 이미지 파일들을 비동기 스레드를 활용해 AWS S3 저장소에 병렬 업로드하여 화면 정지 현상을 해결했습니다."
        ],
        githubLink: "https://github.com/seoha-dev/petmily",
        demoLink: "#"
    },
    "2": {
        title: "CodeArena (실시간 알고리즘 대결 플랫폼)",
        subtitle: "Docker와 Celery를 활용한 실시간 채점 및 랭킹 경쟁 서비스",
        period: "2023.10 - 2023.12 (개인 프로젝트)",
        gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
        iconClass: "fa-solid fa-code",
        tags: ["Python", "Celery", "Docker", "RabbitMQ", "Django"],
        description: "웹 브라우저 상에서 사용자들이 프로그래밍 문제를 실시간 대결 형식으로 풀이하고, 소스코드 채점 대기열을 병렬 처리하는 플랫폼입니다.",
        achievements: [
            "제출된 악성 소스코드가 메인 서버 인프라에 악영향을 주지 않도록 Docker SDK를 활용해 일회성 격리 컨테이너(Sandbox) 기반의 안전한 채점 시스템을 개발했습니다.",
            "비동기 분산 작업 큐인 Celery와 RabbitMQ 브로커를 도입하여 피크타임 시 몰려드는 동시 제출 채점 요청 대기 문제를 해결했습니다.",
            "채점의 중간 진행 상태(컴파일, 테스트케이스 수행 중, 메모리 초과 등)를 Server-Sent Events(SSE) 프로토콜을 사용해 사용자의 프론트엔드로 끊김 없이 시각화했습니다.",
            "Redis 캐싱 구조를 적용해 실시간 랭킹 시스템의 정렬 오버헤드를 기존 SQL 쿼리 방식 대비 80% 줄였습니다."
        ],
        githubLink: "https://github.com/seoha-dev/codearena",
        demoLink: "#"
    },
    "3": {
        title: "SmartCart (AI 기반 이커머스 추천 시스템)",
        subtitle: "협업 필터링 알고리즘 모델링 및 대용량 캐싱 API 설계",
        period: "2023.08 - 2023.09 (2인 팀 프로젝트)",
        gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
        iconClass: "fa-solid fa-cart-shopping",
        tags: ["Django", "Redis", "Recommendation", "MySQL", "Scikit-learn"],
        description: "사용자가 웹 쇼핑몰 내에서 보이는 최근 조회 이력 및 위시리스트 추가, 구매 전환 행동 데이터를 수집 및 분석하여 고도화된 선호 상품을 자동으로 맞춤형 노출해 주는 시스템입니다.",
        achievements: [
            "Scikit-learn 라이브러리의 코사인 유사도를 적용한 협업 필터링(Collaborative Filtering) 알고리즘 모델을 직접 백엔드 모듈로 통합 설계했습니다.",
            "매 방문 시 발생하는 연산 지연 문제를 해결하기 위해 배치를 활용하여 가중치를 주기적 백그라운드로 미리 계산하고, 결괏값을 Redis key-value 구조에 캐싱해 API 렌더링 지연 속도를 40% 단축했습니다.",
            "로그 정형화 유틸리티를 개발하여 상품 상세 뷰잉, 구매, 장바구니 데이터를 세분화하여 축적하는 분석 파이프라인을 구축했습니다.",
            "이력서에 어울리는 완성도를 높이기 위해 Admin용 매출 통계 및 추천 성과 대시보드 기능을 차트(Chart.js) 형태로 제공했습니다."
        ],
        githubLink: "https://github.com/seoha-dev/smartcart",
        demoLink: "#"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileMenu();
    initScrollReveal();
    initProjectFilters();
    initProjectModals();
    initContactForm();
    initActiveNavOnScroll();
});

/* ==========================================================================
   Theme Logic (Light/Dark Mode Toggle)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        updateThemeIcon("light");
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        updateThemeIcon("dark");
    }
    
    // Toggle Click Event
    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.classList.replace("dark-theme", "light-theme");
            localStorage.setItem("theme", "light");
            updateThemeIcon("light");
        } else {
            body.classList.replace("light-theme", "dark-theme");
            localStorage.setItem("theme", "dark");
            updateThemeIcon("dark");
        }
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector("#theme-toggle i");
    if (!icon) return;
    if (theme === "light") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
}

/* ==========================================================================
   Mobile Navigation Drawer Logic
   ========================================================================== */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileDrawer = document.querySelector(".mobile-drawer");
    const mobileMenuClose = document.querySelector(".mobile-menu-close");
    const drawerLinks = document.querySelectorAll(".drawer-link");
    
    const openDrawer = () => {
        mobileDrawer.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevent scrolling when open
    };
    
    const closeDrawer = () => {
        mobileDrawer.classList.remove("open");
        document.body.style.overflow = ""; // Re-enable scrolling
    };
    
    mobileMenuToggle.addEventListener("click", openDrawer);
    mobileMenuClose.addEventListener("click", closeDrawer);
    
    drawerLinks.forEach(link => {
        link.addEventListener("click", closeDrawer);
    });
}

/* ==========================================================================
   Scroll Reveal & Skill Progress Bar Trigger
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("active");
                
                // If it is the skills section, animate the progress bars
                if (el.id === "skills") {
                    animateSkills(el);
                }
            }
        });
    };
    
    // Check initial load elements
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
}

function animateSkills(skillsSection) {
    const skillProgressBars = skillsSection.querySelectorAll(".skill-progress");
    skillProgressBars.forEach(bar => {
        const percent = bar.style.getPropertyValue("--percent") || "0%";
        bar.style.width = percent;
    });
}

/* ==========================================================================
   Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons and add to clicked one
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "block";
                    // Brief delay to trigger fade animation CSS
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    // Hide display after transition completes
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

/* ==========================================================================
   Project Details Modal Logic
   ========================================================================== */
function initProjectModals() {
    const projectCards = document.querySelectorAll(".project-card");
    const modal = document.getElementById("project-modal");
    const modalClose = document.querySelector(".modal-close");
    const modalBodyContent = document.getElementById("modal-body-content");
    
    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;
        
        // Inject content to Modal body
        modalBodyContent.innerHTML = `
            <div class="modal-header">
                <h2>${data.title}</h2>
                <p class="modal-subtitle text-secondary" style="margin-bottom: 0.5rem; font-weight: 500;">${data.subtitle}</p>
                <p class="modal-period text-muted" style="font-size: 0.85rem; margin-bottom: 1rem;"><i class="fa-solid fa-calendar-days"></i> ${data.period}</p>
                <div class="modal-tags">
                    ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="modal-visual-placeholder" style="background: ${data.gradient}">
                <i class="${data.iconClass}"></i>
            </div>
            <div class="modal-body">
                <section>
                    <h4>프로젝트 개요</h4>
                    <p>${data.description}</p>
                </section>
                <section>
                    <h4>주요 성과 및 구현 기능</h4>
                    <ul>
                        ${data.achievements.map(ach => `<li>${ach}</li>`).join('')}
                    </ul>
                </section>
            </div>
            <div class="modal-footer">
                <a href="${data.githubLink}" target="_blank" rel="noopener" class="modal-btn modal-btn-primary">
                    <i class="fa-brands fa-github"></i> GitHub 소스코드
                </a>
                ${data.demoLink !== "#" ? `
                <a href="${data.demoLink}" target="_blank" rel="noopener" class="modal-btn">
                    <i class="fa-solid fa-rocket"></i> 라이브 데모
                </a>` : ''}
            </div>
        `;
        
        modal.classList.add("open");
        document.body.style.overflow = "hidden"; // Disable scroll
    };
    
    const closeModal = () => {
        modal.classList.remove("open");
        document.body.style.overflow = ""; // Enable scroll
    };
    
    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-id");
            openModal(projectId);
        });
    });
    
    modalClose.addEventListener("click", closeModal);
    
    // Close modal when clicking dark overlay background
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });
}

/* ==========================================================================
   Contact Form Submission Simulation
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formSuccessMessage = document.getElementById("form-success-message");
    
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Dynamic loading effect on submit button
        const submitBtn = contactForm.querySelector(".submit-btn");
        const submitText = submitBtn.querySelector("span");
        const submitIcon = submitBtn.querySelector("i");
        
        submitText.textContent = "발송 중...";
        submitIcon.className = "fa-solid fa-spinner fa-spin";
        submitBtn.style.pointerEvents = "none";
        submitBtn.style.opacity = "0.8";
        
        // Simulating API network call delay (1.5 seconds)
        setTimeout(() => {
            contactForm.classList.add("hidden");
            formSuccessMessage.classList.remove("hidden");
            formSuccessMessage.style.opacity = "0";
            
            setTimeout(() => {
                formSuccessMessage.style.transition = "opacity 0.5s ease";
                formSuccessMessage.style.opacity = "1";
            }, 50);
        }, 1500);
    });
}

/* ==========================================================================
   Active Navigation Link state on Scroll
   ========================================================================== */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Highlight a bit before the section enters 1/3 of the viewport
            if (window.scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}
