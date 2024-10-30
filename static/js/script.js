const destinations = [
    {name: "제주도", description: "아름다운 해변과 자연 경관, 독특한 문화"},
    {name: "서울", description: "현대적인 도시 생활과 역사적 명소"},
    {name: "부산", description: "해변과 해산물, 활기찬 도시 분위기"},
    {name: "경주", description: "역사적인 유적지와 전통 문화"},
    {name: "강원도", description: "산과 호수, 겨울 스포츠"},
    {name: "전주", description: "전통 한옥마을과 맛있는 음식"}
];

const roulette = document.getElementById('roulette');
const spinButton = document.getElementById('spin');
const result = document.getElementById('result');

function getRecommendations() {
    var gender = document.getElementById('gender').value;
    var group = document.getElementById('group').value;
    var age = document.getElementById('age').value;
    var recommendationsDiv = document.getElementById('recommendations');
    
    if (!gender || !group || !age) {
        recommendationsDiv.innerHTML = '<div class="alert alert-warning" role="alert">모든 항목을 선택해주세요.</div>';
        return;
    }
    
    console.log("선택된 옵션:", {gender, group, age});
    
    recommendationsDiv.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    
    setTimeout(() => {
        var recommendation = "";
        if (age === "20s" && group === "friends") {
            recommendation = "부산 - 해운대와 광안리 해변에서 즐거운 시간을 보내세요!";
        } else if (age === "30s" && group === "couple") {
            recommendation = "제주도 - 아름다운 자연과 로맨틱한 분위기를 즐겨보세요.";
        } else if (age === "40s" && group === "family") {
            recommendation = "경주 - 역사적인 유적지와 가족 friendly한 관광지가 많습니다.";
        } else {
            recommendation = "서울 - 다양한 즐길 거리가 있는 대도시입니다.";
        }
        recommendationsDiv.innerHTML = '<div class="alert alert-success" role="alert"><strong>추천 여행지:</strong> ' + recommendation + '</div>';
    }, 1000);
}

function createRoulette() {
    const angleStep = 360 / destinations.length;
    destinations.forEach((dest, index) => {
        const item = document.createElement('div');
        item.className = 'roulette-item';
        item.style.transform = `rotate(${index * angleStep}deg) skew(${90 - angleStep}deg)`;
        item.style.backgroundColor = `hsl(${index * 60}, 70%, 50%)`;
        
        const text = document.createElement('span');
        text.textContent = dest.name;
        text.style.transform = `skew(${angleStep - 90}deg) rotate(${angleStep / 2}deg)`;
        
        item.appendChild(text);
        roulette.appendChild(item);
    });
}

createRoulette();

spinButton.addEventListener('click', () => {
    const minRotations = 10; // 최소 10바퀴
    const angleStep = 360 / destinations.length;
    const randomDestinationIndex = Math.floor(Math.random() * destinations.length);
    const extraRotation = randomDestinationIndex * angleStep;
    const totalRotation = (minRotations * 360) + extraRotation;
    
    roulette.style.transform = `rotate(${totalRotation}deg)`;
    
    result.textContent = '룰렛이 돌아가는 중...';
    
    setTimeout(() => {
        // 결과값을 왼쪽으로 한 칸 이동
        const winnerIndex = (randomDestinationIndex -1  + destinations.length) % destinations.length;
        const winner = destinations[winnerIndex];
        result.innerHTML = `<h2>${winner.name}</h2><p>${winner.description}</p>`;
    }, 10000); // 10초 후 결과 표시
});

