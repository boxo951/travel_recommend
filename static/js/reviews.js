// static/js/reviews.js
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const ratingStars = document.querySelectorAll('.star');
    
    // 별점 시스템 초기화
    initRatingSystem();
    
    // 초기 리뷰 로드
    loadReviews();
    
    // 필터 이벤트 리스너
    document.getElementById('filterDestination').addEventListener('change', loadReviews);
    document.getElementById('filterRating').addEventListener('change', loadReviews);
    document.getElementById('filterSort').addEventListener('change', loadReviews);

    // 리뷰 폼 제출 처리
    reviewForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(reviewForm);
        const reviewData = {
            destination: formData.get('destination'),
            rating: parseInt(formData.get('rating')),
            review_text: formData.get('review_text'),
            weather: formData.get('weather'),
            visit_date: formData.get('visit_date'),
            travel_with: formData.get('travel_with'),
            cost: parseInt(formData.get('cost'))
        };

        if (!validateReviewData(reviewData)) {
            return;
        }

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                reviewForm.reset();
                resetRating();
                await loadReviews();
                showNotification('리뷰가 성공적으로 등록되었습니다!', 'success');
            } else {
                throw new Error('리뷰 등록에 실패했습니다.');
            }
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });

    // 별점 시스템 초기화 함수
    function initRatingSystem() {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                document.getElementById('rating').value = rating;
                updateStars(rating);
            });

            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                updateStars(rating, true);
            });
        });

        document.getElementById('ratingStars').addEventListener('mouseout', function() {
            const currentRating = document.getElementById('rating').value;
            updateStars(currentRating);
        });
    }

    // 별점 표시 업데이트 함수
    function updateStars(rating, isHover = false) {
        ratingStars.forEach(star => {
            const starRating = star.dataset.rating;
            if (starRating <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // 별점 리셋 함수
    function resetRating() {
        document.getElementById('rating').value = '';
        updateStars(0);
    }

    // 리뷰 데이터 유효성 검사
    function validateReviewData(data) {
        if (!data.destination) {
            showNotification('여행지를 선택해주세요.', 'error');
            return false;
        }
        if (!data.rating) {
            showNotification('별점을 선택해주세요.', 'error');
            return false;
        }
        if (!data.review_text.trim()) {
            showNotification('리뷰 내용을 입력해주세요.', 'error');
            return false;
        }
        return true;
    }

    // 리뷰 목록 로드 함수
    async function loadReviews() {
        try {
            const response = await fetch('/api/reviews');
            const reviews = await response.json();
            
            let filteredReviews = filterReviews(reviews);
            displayReviews(filteredReviews);
        } catch (error) {
            showNotification('리뷰를 불러오는데 실패했습니다.', 'error');
        }
    }

    // 리뷰 필터링 함수
    function filterReviews(reviews) {
        const destinationFilter = document.getElementById('filterDestination').value;
        const ratingFilter = parseInt(document.getElementById('filterRating').value);
        const sortType = document.getElementById('filterSort').value;

        let filtered = [...reviews];

        if (destinationFilter) {
            filtered = filtered.filter(review => 
                review.destination.includes(destinationFilter)
            );
        }

        if (ratingFilter) {
            filtered = filtered.filter(review => 
                review.rating >= ratingFilter
            );
        }

        switch (sortType) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'recommended':
                filtered.sort((a, b) => (b.recommend || 0) - (a.recommend || 0));
                break;
        }

        return filtered;
    }

    // 리뷰 표시 함수
    function displayReviews(reviews) {
        if (reviews.length === 0) {
            reviewsList.innerHTML = `
                <div class="no-reviews">
                    <p>아직 등록된 리뷰가 없습니다.</p>
                </div>
            `;
            return;
        }
    
        reviewsList.innerHTML = reviews.map(review => `
            <div class="review-card" data-review-id="${review.id}">
                <div class="review-header">
                    <h3 class="destination">${review.destination}</h3>
                    <div class="rating">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                    </div>
                </div>
                <div class="review-meta">
                    ${review.visit_date ? `<span class="visit-date">📅 ${formatDate(review.visit_date)}</span>` : ''}
                    ${review.weather ? `<span class="weather">🌤 ${review.weather}</span>` : ''}
                    ${review.travel_with ? `<span class="travel-with">👥 ${review.travel_with}</span>` : ''}
                    ${review.cost ? `<span class="cost">💰 ${formatCost(review.cost)}</span>` : ''}
                </div>
                <p class="review-text">${review.review_text}</p>
                <div class="review-footer">
                    <span class="created-at">작성일: ${formatDate(review.created_at)}</span>
                    <button class="delete-button" onclick="deleteReview(${review.id})">삭제</button>
                </div>
            </div>
        `).join('');
    }
    

    // 리뷰 삭제 함수
    document.body.insertAdjacentHTML('beforeend', `
        <div id="confirmModal" class="modal">
            <div class="modal-content">
                <h3>리뷰 삭제</h3>
                <p>정말로 이 리뷰를 삭제하시겠습니까?</p>
                <div class="modal-buttons">
                    <button class="cancel-button">취소</button>
                    <button class="confirm-button">삭제</button>
                </div>
            </div>
        </div>
    `);
    
    // 삭제 함수 수정
    window.deleteReview = async function(reviewId) {
        const modal = document.getElementById('confirmModal');
        const confirmBtn = modal.querySelector('.confirm-button');
        const cancelBtn = modal.querySelector('.cancel-button');
    
        // 모달 표시
        modal.classList.add('show');
    
        // 버튼 클릭 이벤트 처리를 Promise로 래핑
        const userChoice = new Promise((resolve) => {
            // 확인 버튼 클릭
            const handleConfirm = () => {
                modal.classList.remove('show');
                cleanup();
                resolve(true);
            };
    
            // 취소 버튼 클릭
            const handleCancel = () => {
                modal.classList.remove('show');
                cleanup();
                resolve(false);
            };
    
            // 이벤트 리스너 정리 함수
            const cleanup = () => {
                confirmBtn.removeEventListener('click', handleConfirm);
                cancelBtn.removeEventListener('click', handleCancel);
                modal.removeEventListener('click', handleOutsideClick);
            };
    
            // 모달 외부 클릭 처리
            const handleOutsideClick = (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    cleanup();
                    resolve(false);
                }
            };
    
            confirmBtn.addEventListener('click', handleConfirm);
            cancelBtn.addEventListener('click', handleCancel);
            modal.addEventListener('click', handleOutsideClick);
        });
    
        // 사용자 선택 처리
        const shouldDelete = await userChoice;
        if (!shouldDelete) return;
    
        try {
            const response = await fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                await loadReviews();
                showNotification('리뷰가 성공적으로 삭제되었습니다!', 'success');
            } else {
                showNotification('리뷰 삭제에 실패했습니다.', 'error');
            }
        } catch (error) {
            showNotification(error.message, 'error');
        }
    };
    // 유틸리티 함수들
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatCost(cost) {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW'
        }).format(cost);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});