document.addEventListener('DOMContentLoaded', function() {
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spinButton');
    const resultDisplay = document.getElementById('result');

    const destinations = [
        { name: '수도권', color: '#FF6B6B' },
        { name: '강원도', color: '#4ECDC4' },
        { name: '충청도', color: '#45B7D1' },
        { name: '전라도', color: '#96CEB4' },
        { name: '경상도', color: '#FFEEAD' },
        { name: '제주도', color: '#D4A5A5' }
    ];

    let currentRotation = 0;
    let isSpinning = false;

    function createRoulette() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "-100 -100 200 200");
        svg.style.width = "100%";
        svg.style.height = "100%";

        const totalSlices = destinations.length;
        const anglePerSlice = 360 / totalSlices;
        
        destinations.forEach((dest, index) => {
            const startAngle = index * anglePerSlice - 90; // -90 to start from top
            const endAngle = (index + 1) * anglePerSlice - 90;
            
            // Convert angles to radians
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            
            // Calculate coordinates
            const x1 = Math.cos(startRad) * 100;
            const y1 = Math.sin(startRad) * 100;
            const x2 = Math.cos(endRad) * 100;
            const y2 = Math.sin(endRad) * 100;
            
            // Create slice path
            const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
            
            // Draw the slice
            const d = `
                M 0 0
                L ${x1} ${y1}
                A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}
                Z
            `;
            
            slice.setAttribute("d", d);
            slice.setAttribute("fill", dest.color);
            slice.setAttribute("stroke", "white");
            slice.setAttribute("stroke-width", "1");
            
            // Add text
            const textAngle = startAngle + (anglePerSlice / 2);
            const textRad = (textAngle * Math.PI) / 180;
            const textX = Math.cos(textRad) * 60; // Position text at 60% radius
            const textY = Math.sin(textRad) * 60;
            
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", textX);
            text.setAttribute("y", textY);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", "white");
            text.setAttribute("font-size", "12");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("transform", `rotate(${textAngle + 90} ${textX} ${textY})`);
            text.textContent = dest.name;
            
            svg.appendChild(slice);
            svg.appendChild(text);
        });

        // Add center circle
        const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        centerCircle.setAttribute("cx", "0");
        centerCircle.setAttribute("cy", "0");
        centerCircle.setAttribute("r", "15");
        centerCircle.setAttribute("fill", "white");
        centerCircle.setAttribute("stroke", "#ddd");
        centerCircle.setAttribute("stroke-width", "2");
        
        svg.appendChild(centerCircle);
        roulette.innerHTML = '';
        roulette.appendChild(svg);
    }

    function spinRoulette() {
        if (isSpinning) return;
        
        isSpinning = true;
        spinButton.disabled = true;
        resultDisplay.classList.remove('show');

        const spins = 5;
        const baseRotation = 360 * spins;
        const randomRotation = Math.floor(Math.random() * 360);
        const totalRotation = baseRotation + randomRotation;

        currentRotation += totalRotation;
        roulette.style.transform = `rotate(${currentRotation}deg)`;

        setTimeout(() => {
            const sectionAngle = 360 / destinations.length;
            const normalizedRotation = currentRotation % 360;
            const sectionIndex = Math.floor((360 - (normalizedRotation % 360)) / sectionAngle);
            const selectedDestination = destinations[sectionIndex % destinations.length];

            displayResult(selectedDestination);
            isSpinning = false;
            spinButton.disabled = false;
        }, 5000);
    }

    function displayResult(destination) {
        resultDisplay.innerHTML = `
            <div class="result-title"> 선택된 여행지</div>
            <div class="result-description">
                <span class="result-highlight">${destination.name}</span>로 출발
            </div>
        `;
        resultDisplay.classList.add('show');
    }

    spinButton.addEventListener('click', spinRoulette);
    createRoulette();
});