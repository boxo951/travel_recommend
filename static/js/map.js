const regionInfo = {
    "gyeonggi": {
        name: "경기도",
        description: "대한민국의 수도권 중심지역",
        attractions: ["수원화성", "에버랜드", "한국민속촌"],
        bestSeason: "봄, 가을",
        famousFood: ["부대찌개", "순대", "보쌈"]
    },
    "gangwon": {
        name: "강원도",
        description: "아름다운 산과 바다가 있는 관광지",
        attractions: ["설악산", "강릉 경포대", "춘천 남이섬"],
        bestSeason: "사계절",
        famousFood: ["감자떡", "춘천닭갈비", "강릉커피"]
    },
    // ... (나머지 지역 정보는 동일)
};

document.addEventListener('DOMContentLoaded', function() {
    const regions = document.querySelectorAll('.region');
    const infoPopup = document.getElementById('infoPopup');

    regions.forEach(region => {
        region.addEventListener('mouseenter', showInfo);
        region.addEventListener('mouseleave', hideInfo);
    });

    function showInfo(e) {
        const regionId = e.target.id;
        const info = regionInfo[regionId];
        if (!info) return;

        infoPopup.innerHTML = `
            <h3>${info.name}</h3>
            <p>${info.description}</p>
            <div class="attractions">
                <div class="attractions-title">주요 관광지</div>
                <div class="attractions-list">
                    ${info.attractions.map(attr => 
                        `<span class="attraction-item">${attr}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="season-info">
                <strong>추천 계절:</strong> ${info.bestSeason}
            </div>
            <div class="food-list">
                ${info.famousFood.map(food => 
                    `<span class="food-item">${food}</span>`
                ).join('')}
            </div>
        `;

        // 팝업 위치 조정
        const rect = e.target.getBoundingClientRect();
        const container = document.querySelector('.map-container').getBoundingClientRect();
        
        let left = rect.right + 10;
        let top = rect.top;

        // 화면 오른쪽 경계를 넘어가는 경우
        if (left + 300 > container.right) {
            left = rect.left - 310;
        }

        // 화면 아래 경계를 넘어가는 경우
        if (top + 400 > container.bottom) {
            top = container.bottom - 400;
        }

        infoPopup.style.left = `${left}px`;
        infoPopup.style.top = `${top}px`;
        infoPopup.style.display = 'block';
    }

    function hideInfo() {
        infoPopup.style.display = 'none';
    }
});