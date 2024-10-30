document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('filterForm');
    const searchResults = document.getElementById('searchResults');
    const resultsTitle = document.getElementById('resultsTitle');

   
    const destinations = [
        // 수도권
        {
            name: '서울 북촌한옥마을',
            region: '수도권',
            description: '전통 한옥과 현대 문화가 공존하는 문화거리',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '가족', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: ['전통한옥', '문화체험', '한복체험'],
            activities: ['한옥구경', '전통문화체험', '카페투어']
        },
        {
            name: '남산서울타워',
            region: '수도권',
            description: '서울의 상징적인 랜드마크이자 전망대',
            price: '저가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '친구', '가족'],
                duration: ['당일']
            },
            highlights: ['야경', '전망대', '데이트코스'],
            activities: ['전망관람', '데이트', '사진촬영']
        },
        {
            name: '경복궁',
            region: '수도권',
            description: '조선왕조의 법궁이자 서울의 대표적인 고궁',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '친구', '연인'],
                duration: ['당일']
            },
            highlights: ['고궁투어', '수문장교대식', '역사탐방'],
            activities: ['궁궐관람', '한복체험', '역사학습']
        },
        {
            name: '인사동',
            region: '수도권',
            description: '전통문화와 예술의 거리',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['친구', '연인'],
                duration: ['당일']
            },
            highlights: ['전통문화', '갤러리', '공방'],
            activities: ['전통찻집', '기념품구매', '골동품구경']
        },
        {
            name: '홍대거리',
            region: '수도권',
            description: '젊은이들의 문화와 예술의 중심지',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['친구', '연인'],
                duration: ['당일', '1박2일']
            },
            highlights: ['거리공연', '카페', '쇼핑'],
            activities: ['버스킹관람', '카페투어', '클럽문화']
        },
        {
            name: '에버랜드',
            region: '수도권',
            description: '국내 최대 규모의 테마파크',
            price: '고가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '가족', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: ['놀이기구', '동물원', '계절축제'],
            activities: ['어트랙션', '사파리월드', '퍼레이드']
        },
        {
            name: '한강공원',
            region: '수도권',
            description: '도심 속 휴식처이자 레저 공간',
            price: '저가',
            recommend: {
                season: ['봄', '여름', '가을'],
                companion: ['친구', '연인', '가족'],
                duration: ['당일']
            },
            highlights: ['자전거도로', '피크닉', '야경'],
            activities: ['자전거타기', '피크닉', '산책']
        },
        {
            name: '롯데월드',
            region: '수도권',
            description: '실내외 복합 테마파크',
            price: '고가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '가족', '친구'],
                duration: ['당일']
            },
            highlights: ['실내놀이기구', '민속박물관', '아이스링크'],
            activities: ['어트랙션', '쇼핑', '스케이팅']
        },
        {
            name: '수원화성',
            region: '수도권',
            description: '유네스코 세계문화유산으로 지정된 조선시대 성곽',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: ['성곽투어', '야간개장', '전통문화'],
            activities: ['성곽순례', '문화체험', '역사탐방']
        },
        {
            name: '가평 아침고요수목원',
            region: '수도권',
            description: '아름다운 정원과 식물을 감상할 수 있는 수목원',
            price: '중가',
            recommend: {
                season: ['봄', '여름'],
                companion: ['연인', '가족'],
                duration: ['당일']
            },
            highlights: ['테마정원', '산책로', '포토존'],
            activities: ['정원관람', '사진촬영', '산책']
        },
        {
            name: '광명동굴',
            region: '수도권',
            description: '폐광을 활용한 문화예술공간',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['친구', '가족'],
                duration: ['당일']
            },
            highlights: ['동굴체험', '미디어아트', '와인동굴'],
            activities: ['동굴탐험', '전시관람', '와인시음']
        },
        {
            name: '인천 차이나타운',
            region: '수도권',
            description: '중국문화와 음식을 즐길 수 있는 거리',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['친구', '가족'],
                duration: ['당일']
            },
            highlights: ['중화요리', '골목투어', '기념품'],
            activities: ['맛집투어', '문화체험', '쇼핑']
        },
        {
            name: '파주 프로방스',
            region: '수도권',
            description: '프랑스풍 문화마을과 아기자기한 상점들이 모인 테마파크',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '친구'],
                duration: ['당일']
            },
            highlights: ['프랑스풍 건물', '아트샵', '포토존'],
            activities: ['사진촬영', '카페투어', '쇼핑']
        },
        {
            name: '포천 아트밸리',
            region: '수도권',
            description: '폐채석장을 문화예술공간으로 재탄생시킨 명소',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '연인'],
                duration: ['당일']
            },
            highlights: ['모노레일', '천주호', '조각공원'],
            activities: ['산책', '전시관람', '야경감상']
        },
        // ... 이어서 더 많은 수도권 여행지

        // 강원도
        {
            name: '강릉 경포대',
            region: '강원도',
            description: '아름다운 해변과 호수가 어우러진 관광명소',
            price: '중가',
            recommend: {
                season: ['여름', '가을'],
                companion: ['연인', '가족'],
                duration: ['1박2일', '2박3일']
            },
            highlights: ['경포해변', '경포호', '오죽헌'],
            activities: ['해수욕', '일출감상', '자전거투어'],
            nearby: ['강릉커피거리', '정동진', '주문진']
        },
        {
            name: '속초 설악산',
            region: '강원도',
            description: '웅장한 산세와 단풍이 아름다운 국립공원',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['친구', '가족'],
                duration: ['1박2일', '2박3일']
            },
            highlights: ['울산바위', '권금성', '비룡폭포'],
            activities: ['등산', '케이블카', '단풍구경'],
            nearby: ['속초중앙시장', '영금정', '설악워터피아']
        },
        {
            name: '춘천 남이섬',
            region: '강원도',
            description: '아름다운 자연과 문화예술이 어우러진 섬',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: ['메타세콰이어길', '문화공연', '자전거투어'],
            activities: ['산책', '자전거타기', '캠핑'],
            nearby: ['김유정문학촌', '춘천명동', '애니메이션박물관']
        },
        {
            name: '평창 알펜시아',
            region: '강원도',
            description: '동계스포츠의 중심지',
            price: '고가',
            recommend: {
                season: ['겨울'],
                companion: ['친구', '가족'],
                duration: ['1박2일', '2박3일']
            },
            highlights: ['스키장', '올림픽시설', '트레킹코스'],
            activities: ['스키', '스노보드', '골프'],
            nearby: ['대관령양떼목장', '월정사', '오대산']
        },
        {
            name: '정동진',
            region: '강원도',
            description: '한국 최고의 일출 명소',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '친구'],
                duration: ['1박2일']
            },
            highlights: ['해돋이', '모래시계공원', '철길'],
            activities: ['일출감상', '해변산책', '사진촬영'],
            nearby: ['정동진시간박물관', '썬크루즈리조트', '강릉아트센터']
        },
        {
            name: '양양 서피비치',
            region: '강원도',
            description: '국내 최고의 서핑 명소',
            price: '중가',
            recommend: {
                season: ['여름'],
                companion: ['친구', '연인'],
                duration: ['1박2일', '2박3일']
            },
            highlights: ['서핑스팟', '비치카페', '캠핑장'],
            activities: ['서핑', '비치요가', '캠핑'],
            nearby: ['낙산사', '양양시장', '하조대']
        },
        {
            name: '원주 치악산',
            region: '강원도',
            description: '수려한 계곡과 단풍이 아름다운 산',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['친구', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: ['구룡사', '계곡', '단풍길'],
            activities: ['등산', '계곡놀이', '산책'],
            nearby: ['원주한지테마파크', '원주중앙시장', '소금산출렁다리']
        },
        {
            name: '강릉 안목해변',
            region: '강원도',
            description: '커피거리로 유명한 해변',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '친구'],
                duration: ['1박2일']
            },
            highlights: ['커피거리', '해변', '일출'],
            activities: ['카페투어', '해변산책', '일출감상'],
            nearby: ['강릉중앙시장', '경포대', '테라로사커피']
        },
        {
            name: '홍천 대명비발디파크',
            region: '강원도',
            description: '사계절 종합 휴양지',
            price: '고가',
            recommend: {
                season: ['사계절'],
                companion: ['가족', '연인'],
                duration: ['1박2일', '2박3일']
            },
            highlights: ['스키장', '워터파크', '골프장'],
            activities: ['스키', '수영', '골프'],
            nearby: ['홍천강', '수타사', '팔봉산']
        },
        {
            name: '삼척 해양레일바이크',
            region: '강원도',
            description: '바다를 따라 달리는 레일바이크',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: ['해안선 코스', '터널구간', '포토존'],
            activities: ['레일바이크', '사진촬영', '해변산책'],
            nearby: ['삼척해수욕장', '죽서루', '환선굴']
        },
        {
            name: '인제 내린천',
            region: '강원도',
            description: '투명한 물빛으로 유명한 래프팅 명소',
            price: '중가',
            recommend: {
                season: ['여름'],
                companion: ['친구', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: ['래프팅', '계곡', '캠핑장'],
            activities: ['래프팅', '물놀이', '캠핑'],
            nearby: ['원대리 자작나무숲', '방동약수', '용늪'],
            food: ['민물매운탕', '산채비빔밥', '송어회']
        },
        {
            name: '평창 대관령 삼양목장',
            region: '강원도',
            description: '한국 최대 규모의 목장으로 드라마 촬영지로도 유명',
            price: '중가',
            recommend: {
                season: ['봄', '여름'],
                companion: ['연인', '가족'],
                duration: ['당일']
            },
            highlights: ['초원', '양떼', '전망대'],
            activities: ['양떼체험', '트래킹', '사진촬영'],
            nearby: ['대관령양떼목장', '알펜시아', '허브나라'],
            food: ['양고기', '감자전', '막걸리']
        },
        // 충청도
        {
            name: '대전 엑스포과학공원',
            region: '충청도',
            description: '과학기술과 자연이 어우러진 대형 테마파크',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '친구'],
                duration: ['당일']
            },
            highlights: ['한빛탑', '사이언스홀', '엑스포기념관'],
            activities: ['과학체험', '공원산책', '전시관람'],
            nearby: ['대전시립미술관', '한밭수목원', '대전예술의전당']
        },
        {
            name: '부여 궁남지',
            region: '충청도',
            description: '백제의 역사와 문화를 느낄 수 있는 유적지',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: ['연꽃단지', '포룡정', '야경'],
            activities: ['역사탐방', '산책', '야경감상'],
            nearby: ['부소산성', '정림사지', '궁남지']
        },
        {
            name: '태안 안면도',
            region: '충청도',
            description: '꽃과 바다가 아름다운 서해안의 보석',
            price: '중가',
            recommend: {
                season: ['봄', '여름'],
                companion: ['가족', '연인'],
                duration: ['1박2일', '2박3일']
            },
            highlights: ['꽃지해수욕장', '안면도자연휴양림', '천리포수목원'],
            activities: ['해수욕', '꽃구경', '캠핑'],
            nearby: ['만리포해수욕장', '태안해안국립공원', '안면도휴양림']
        },
        {
            name: '단양 도담삼봉',
            region: '충청도',
            description: '절경으로 유명한 국가명승',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['가족', '연인'],
                duration: ['1박2일']
            },
            highlights: ['석문', '도담삼봉', '유람선'],
            activities: ['유람선탑승', '사진촬영', '트레킹'],
            nearby: ['단양강잔도', '만천하스카이워크', '온달동굴']
        },
        {
            name: '천안 독립기념관',
            region: '충청도',
            description: '한국의 독립운동 역사를 배울 수 있는 교육명소',
            price: '저가',
            recommend: {
                season: ['사계절'],
                companion: ['가족', '친구'],
                duration: ['당일']
            },
            highlights: ['전시관', '독립운동사', '교육프로그램'],
            activities: ['역사학습', '전시관람', '야외산책'],
            nearby: ['천안삼거리공원', '천안종합터미널', '천안아산역']
        },
        {
            name: '보령 대천해수욕장',
            region: '충청도',
            description: '머드축제로 유명한 서해안 최대 해수욕장',
            price: '중가',
            recommend: {
                season: ['여름'],
                companion: ['친구', '가족'],
                duration: ['1박2일', '2박3일']
            },
            highlights: ['머드축제', '해수욕장', '조개잡이'],
            activities: ['해수욕', '머드체험', '일몰감상'],
            nearby: ['무창포해수욕장', '대천항', '오서산']
        },
        {
            name: '공주 공산성',
            region: '충청도',
            description: '백제 문화유산을 간직한 세계문화유산',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '친구'],
                duration: ['당일']
            },
            highlights: ['성벽', '백제문화', '금강조망'],
            activities: ['문화유산탐방', '성곽걷기', '역사체험'],
            nearby: ['국립공주박물관', '무령왕릉', '공주한옥마을']
        },
        {
            name: '청주 상당산성',
            region: '충청도',
            description: '청주의 대표적인 역사유적지',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['친구', '가족'],
                duration: ['당일']
            },
            highlights: ['성곽', '전망대', '단풍길'],
            activities: ['등산', '역사탐방', '전망감상'],
            nearby: ['청주고인쇄박물관', '청주동물원', '상당공원']
        },
        {
            name: '아산 외암민속마을',
            region: '충청도',
            description: '전통가옥이 잘 보존된 민속마을',
            price: '저가',
            recommend: {
                season: ['사계절'],
                companion: ['가족', '친구'],
                duration: ['당일']
            },
            highlights: ['전통가옥', '민속체험', '돌담길'],
            activities: ['전통문화체험', '한복체험', '전통음식체험'],
            nearby: ['현충사', '온양민속박물관', '아산스파비스']
        },
        {
            name: '제천 청풍문화재단지',
            region: '충청도',
            description: '청풍호반의 아름다운 전통문화공간',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '연인'],
                duration: ['1박2일']
            },
            highlights: ['청풍호', '문화재', '전통가옥'],
            activities: ['문화재관람', '호수산책', '유람선탑승'],
            nearby: ['청풍랜드', '제천한방엑스포공원', '비봉산']
        },
        {
            name: '논산 딸기밸리',
            region: '충청도',
            description: '딸기 테마파크와 체험농장이 결합된 관광단지',
            price: '중가',
            recommend: {
                season: ['겨울', '봄'],
                companion: ['가족', '연인'],
                duration: ['당일']
            },
            highlights: ['딸기체험', '딸기박물관', '카페'],
            activities: ['딸기따기', '잼만들기', '디저트체험'],
            nearby: ['탑정호', '관촉사', '백제군사박물관'],
            food: ['딸기디저트', '딸기화채', '논산청국장']
        },
        {
            name: '서천 국립생태원',
            region: '충청도',
            description: '세계 각국의 다양한 생태계를 체험할 수 있는 생태공원',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['가족', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: ['생태관', '습지생태원', '세계정원'],
            activities: ['생태체험', '전시관람', '정원산책'],
            nearby: ['한산모시관', '춘장대해수욕장', '금강하구둑'],
            food: ['서천김', '꽃게', '주꾸미']
        },
        // 전라도        
        {
            name: '전주 한옥마을',
            region: '전라도',
            description: '전통문화와 맛있는 음식이 어우러진 한국 대표 관광지',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '가족', '친구'],
                duration: ['1박2일', '2박3일']
            },
            highlights: ['한옥체험', '전주비빔밥', '경기전'],
            activities: [
                '한복체험',
                '한식체험',
                '문화체험',
                '공방체험',
                '전통찻집'
            ],
            nearby: [
                '오목대',
                '전동성당',
                '남부시장'
            ],
            food: [
                '전주비빔밥',
                '한정식',
                '콩나물국밥',
                '객리단길 맛집'
            ]
        },
        {
            name: '여수 엑스포해양공원',
            region: '전라도',
            description: '아름다운 밤바다와 현대적 시설이 어우러진 해양관광도시',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '가족'],
                duration: ['1박2일', '2박3일']
            },
            highlights: [
                '해상케이블카',
                '여수밤바다',
                '빅오쇼'
            ],
            activities: [
                '야경투어',
                '케이블카 탑승',
                '크루즈 체험',
                '해산물 먹방'
            ],
            nearby: [
                '오동도',
                '돌산공원',
                '여수해상케이블카'
            ],
            food: [
                '장어구이',
                '갓김치',
                '서대회',
                '게장백반'
            ]
        },
        {
            name: '담양 죽녹원',
            region: '전라도',
            description: '울창한 대나무 숲이 매력적인 생태관광지',
            price: '저가',
            recommend: {
                season: ['봄', '여름', '가을'],
                companion: ['연인', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '대나무숲길',
                '관방제림',
                '메타세콰이어길'
            ],
            activities: [
                '대나무숲산책',
                '사진촬영',
                '전통체험'
            ],
            nearby: [
                '메타세쿼이아길',
                '소쇄원',
                '한국대나무박물관'
            ],
            food: [
                '대통밥',
                '죽순요리',
                '떡갈비'
            ]
        },
        {
            name: '순천만국가정원',
            region: '전라도',
            description: '세계적인 정원과 습지로 유명한 생태관광지',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '연인', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '순천만습지',
                '국가정원',
                '스카이큐브'
            ],
            activities: [
                '정원관람',
                '습지탐방',
                '생태체험',
                '사진촬영'
            ],
            nearby: [
                '낙안읍성',
                '순천드라마촬영장',
                '순천만습지'
            ],
            food: [
                '짱뚱어탕',
                '꼬막정식',
                '순천만갈대밥상'
            ]
        },
        {
            name: '광주 양림동',
            region: '전라도',
            description: '근대문화유산과 예술이 공존하는 문화거리',
            price: '저가',
            recommend: {
                season: ['사계절'],
                companion: ['친구', '연인'],
                duration: ['당일']
            },
            highlights: [
                '근대건축물',
                '카페거리',
                '펭귄마을'
            ],
            activities: [
                '역사탐방',
                '카페투어',
                '문화체험'
            ],
            nearby: [
                '국립아시아문화전당',
                '충장로',
                '광주예술의거리'
            ],
            food: [
                '상추튀김',
                '송정리떡갈비',
                '무등산보리밥'
            ]
        },
        {
            name: '남원 광한루원',
            region: '전라도',
            description: '춘향전의 배경이 된 전통정원',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '광한루',
                '춘향테마파크',
                '오작교'
            ],
            activities: [
                '정원산책',
                '전통문화체험',
                '춘향전 관련 체험'
            ],
            nearby: [
                '지리산',
                '남원항교',
                '춘향묘'
            ],
            food: [
                '추어탕',
                '한정식',
                '산채비빔밥'
            ]
        },
        {
            name: '목포 근대역사관',
            region: '전라도',
            description: '개항기 근대문화유산이 잘 보존된 역사문화공간',
            price: '저가',
            recommend: {
                season: ['사계절'],
                companion: ['친구', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '근대역사관',
                '목포진',
                '노적봉'
            ],
            activities: [
                '근대건축물 탐방',
                '역사문화체험',
                '항구견학'
            ],
            nearby: [
                '유달산',
                '삼학도',
                '목포해상케이블카'
            ],
            food: [
                '홍어삼합',
                '민어회',
                '세발낙지'
            ]
        },
        {
            name: '완도 청산도',
            region: '전라도',
            description: '한국의 대표적인 슬로시티, 느림의 미학',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '가족'],
                duration: ['1박2일', '2박3일']
            },
            highlights: [
                '슬로길',
                '서편제길',
                '범바위'
            ],
            activities: [
                '느림보우체국',
                '구들장논 탐방',
                '해변산책'
            ],
            nearby: [
                '청산도 버스투어',
                '완도타워',
                '장보고기념관'
            ],
            food: [
                '전복요리',
                '해조류요리',
                '고구마피자'
            ]
        },
        {
            name: '구례 산수유마을',
            region: '전라도',
            description: '봄이면 노란 산수유꽃으로 뒤덮이는 아름다운 마을',
            price: '저가',
            recommend: {
                season: ['봄'],
                companion: ['연인', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: ['산수유꽃길', '대봉감', '지리산 풍경'],
            activities: ['꽃구경', '시골체험', '트레킹'],
            nearby: ['화엄사', '지리산', '섬진강'],
            food: ['산수유차', '산채비빔밥', '감식빵']
        },
        {
            name: '해남 땅끝마을',
            region: '전라도',
            description: '한반도 최남단에 위치한 아름다운 해안마을',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '가족'],
                duration: ['1박2일']
            },
            highlights: ['땅끝전망대', '땅끝조각공원', '송호해수욕장'],
            activities: ['일몰감상', '해안드라이브', '조각공원관람'],
            nearby: ['두륜산케이블카', '대흥사', '우수영'],
            food: ['전복회', '꼬막정식', '갈치조림']
        },
        // 경상도
        {
            name: '경주 불국사',
            region: '경상도',
            description: '신라 불교문화의 정수를 보여주는 세계문화유산',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['가족', '친구', '연인'],
                duration: ['1박2일', '2박3일']
            },
            highlights: [
                '다보탑',
                '석가탑',
                '청운교·백운교'
            ],
            activities: [
                '문화해설 투어',
                '사찰체험',
                '야경관람'
            ],
            nearby: [
                '석굴암',
                '불국사 박물관',
                '태종무열왕릉'
            ],
            food: [
                '경주황남빵',
                '경주밥'
            ],
            festivals: {
                '경주 벚꽃축제': '4월',
                '신라문화제': '10월'
            }
        },
        {
            name: '통영 동피랑마을',
            region: '경상도',
            description: '알록달록한 벽화와 바다가 어우러진 문화예술마을',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '벽화거리',
                '전망대',
                '동피랑계단'
            ],
            activities: [
                '벽화구경',
                '사진촬영',
                '해산물맛집투어'
            ],
            nearby: [
                '중앙시장',
                '케이블카',
                '루지'
            ],
            food: [
                '통영굴',
                '충무김밥',
                '멍게'
            ],
            festivals: {
                '통영한산대첩축제': '8월',
                '통영트리엔날레': '계절별'
            }
        },
        {
            name: '안동 하회마을',
            region: '경상도',
            description: '전통 양반문화가 살아있는 한국의 대표적 민속마을',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '외국인 친구'],
                duration: ['1박2일']
            },
            highlights: [
                '만송정 십이폭포',
                '하회별신굿탈놀이',
                '북촌종택'
            ],
            activities: [
                '한복체험',
                '전통문화체험',
                '마을탐방'
            ],
            nearby: [
                '병산서원',
                '안동민속촌',
                '월영교'
            ],
            food: [
                '안동찜닭',
                '안동간고등어',
                '헛제사밥'
            ],
            festivals: {
                '안동국제탈춤페스티벌': '9-10월',
                '안동민속축제': '10월'
            }
        },
        {
            name: '거제 바람의 언덕',
            region: '경상도',
            description: '아름다운 해안절경을 자랑하는 인생사진 스폿',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '풍차',
                '해안절경',
                '포토존'
            ],
            activities: [
                '사진촬영',
                '카페투어',
                '드라이브'
            ],
            nearby: [
                '외도',
                '거제대교',
                '포로수용소유적공원'
            ],
            food: [
                '거제멍게',
                '대구탕',
                '해산물'
            ],
            festivals: {
                '거제섬꽃축제': '4월',
                '거제시조선해양축제': '7-8월'
            }
        },
        {
            name: '부산 해운대',
            region: '경상도',
            description: '대한민국 대표 해수욕장이자 관광명소',
            price: '중가',
            recommend: {
                season: ['여름', '겨울'],
                companion: ['친구', '연인', '가족'],
                duration: ['1박2일', '2박3일']
            },
            highlights: [
                '해운대해수욕장',
                '동백섬',
                '마린시티'
            ],
            activities: [
                '해수욕',
                '야경투어',
                '맛집투어'
            ],
            nearby: [
                '센텀시티',
                '광안리',
                'BEXCO'
            ],
            food: [
                '해운대밀면',
                '씨앗호떡',
                '해산물'
            ],
            festivals: {
                '부산국제영화제': '10월',
                '부산불꽃축제': '10월',
                '해운대모래축제': '여름'
            }
        },
        {
            name: '포항 호미곶',
            region: '경상도',
            description: '한반도 최동단 일출 명소',
            price: '중가',
            recommend: {
                season: ['겨울', '여름'],
                companion: ['가족', '연인'],
                duration: ['1박2일']
            },
            highlights: [
                '상생의손',
                '일출광장',
                '등대박물관'
            ],
            activities: [
                '일출감상',
                '해산물맛집',
                '포토스팟'
            ],
            nearby: [
                '구룡포일본인가옥거리',
                '영일대해수욕장',
                '포항운하'
            ],
            food: [
                '과메기',
                '물회',
                '대게'
            ],
            festivals: {
                '호미곶한민족해맞이축전': '12월 31일-1월 1일',
                '포항국제불빛축제': '7월'
            }
        },
        {
            name: '경주 동궁과 월지(안압지)',
            region: '경상도',
            description: '신라 왕궁의 정원으로 야경이 아름다운 명소',
            price: '저가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '가족', '친구'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '야경',
                '연못',
                '건축미'
            ],
            activities: [
                '야경감상',
                '역사탐방',
                '산책'
            ],
            nearby: [
                '첨성대',
                '대릉원',
                '경주국립박물관'
            ],
            food: [
                '쌈밥',
                '황남빵',
                '경주빵'
            ],
            specialNote: '야간개장 시간 확인 필요'
        },
        {
            name: '울산 대왕암공원',
            region: '경상도',
            description: '동해안의 절경과 등대가 어우러진 해안공원',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '연인'],
                duration: ['당일']
            },
            highlights: [
                '등대',
                '해안산책로',
                '일출'
            ],
            activities: [
                '트레킹',
                '사진촬영',
                '피크닉'
            ],
            nearby: [
                '일산해수욕장',
                '장생포고래박물관',
                '태화강국가정원'
            ],
            food: [
                '장어구이',
                '언양불고기',
                '해산물'
            ],
            festivals: {
                '울산고래축제': '5월',
                '울산옹기축제': '10월'
            }
        },
        {
            name: '김천 직지사',
            region: '경상도',
            description: '천년 고찰의 역사와 자연이 어우러진 사찰',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['가족', '친구'],
                duration: ['당일']
            },
            highlights: [
                '대웅전',
                '비로전',
                '산책로'
            ],
            activities: [
                '사찰탐방',
                '등산',
                '산책'
            ],
            nearby: [
                '수도산',
                '김천부항댐',
                '황악산'
            ],
            food: [
                '김천한우',
                '김천자두',
                '직지사사찰음식'
            ],
            festivals: {
                '김천포도축제': '8월',
                '김천자두축제': '7월'
            }
        },
        {
            name: '창원 진해군항제',
            region: '경상도',
            description: '봄철 벚꽃 명소이자 해군도시의 상징',
            price: '저가',
            recommend: {
                season: ['봄'],
                companion: ['연인', '친구', '가족'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '벚꽃길',
                '해군사관학교',
                '진해내수면'
            ],
            activities: [
                '벚꽃구경',
                '군항투어',
                '야경감상'
            ],
            nearby: [
                '로망스다리',
                '진해해양공원',
                '제황산공원'
            ],
            food: [
                '해물파전',
                '충무김밥',
                '해산물'
            ],
            festivals: {
                '진해군항제': '4월',
                '진해불빛축제': '겨울'
            }
        },
        {
            name: '영덕 블루로드',
            region: '경상도',
            description: '동해안의 절경을 따라 이어지는 해안 산책로',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['연인', '친구'],
                duration: ['1박2일']
            },
            highlights: ['해안절경', '대게거리', '삼사해상공원'],
            activities: ['트레킹', '해산물먹방', '일출감상'],
            nearby: ['강구항', '축산항', '영덕대게거리'],
            food: ['대게', '물회', '광어회']
        },
        {
            name: '남해 독일마을',
            region: '경상도',
            description: '독일식 주택과 문화를 체험할 수 있는 이국적인 마을',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['연인', '가족'],
                duration: ['1박2일']
            },
            highlights: ['독일식주택', '전망대', '독일문화체험'],
            activities: ['이국적인 분위기', '맥주체험', '사진촬영'],
            nearby: ['보리암', '미조항', '상주은모래비치'],
            food: ['독일소시지', '맥주', '해산물']
        },
        
        {
            name: '성산일출봉',
            region: '제주도',
            description: '유네스코 세계자연유산으로 지정된 제주의 대표 명소',
            price: '중가',
            recommend: {
                season: ['사계절'],
                companion: ['가족', '연인', '친구'],
                duration: ['2박3일', '3박4일']
            },
            highlights: [
                '일출봉 정상',
                '성산해변',
                '우도 전망'
            ],
            activities: [
                '일출감상',
                '트레킹',
                '사진촬영',
                '주상절리 관람'
            ],
            nearby: [
                '우도',
                '섭지코지',
                '아쿠아플라넷'
            ],
            food: [
                '성산일출봉 오징어',
                '해녀밥상',
                '고등어회'
            ],
            traffic: {
                'bus': '제주공항에서 동부권 버스 이용',
                'car': '렌터카 추천',
                'tour': '동부권 투어 코스 포함'
            },
            bestTime: {
                'sunrise': '매일 일출 1시간 전',
                'avoid': '우천시, 안개 많은 날'
            }
        },
        {
            name: '한라산 국립공원',
            region: '제주도',
            description: '제주도의 상징이자 대한민국 최고봉',
            price: '저가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['친구', '연인'],
                duration: ['당일', '1박2일']
            },
            highlights: [
                '백록담',
                '영실기암',
                '어리목계곡'
            ],
            activities: [
                '등산',
                '자연관찰',
                '단풍구경',
                '눈꽃감상'
            ],
            nearby: [
                '절물자연휴양림',
                '산굼부리',
                '돈내코'
            ],
            food: [
                '고사리정식',
                '취나물밥',
                '더덕구이'
            ],
            traffic: {
                'bus': '등산로별 셔틀버스 운영',
                'car': '주차장 완비',
                'notice': '정상부 기상 상황 확인 필수'
            },
            courses: {
                '성판악코스': '9.6km, 4시간 30분',
                '관음사코스': '8.7km, 5시간',
                '영실코스': '5.8km, 3시간'
            }
        },
        {
            name: '함덕해수욕장',
            region: '제주도',
            description: '에메랄드빛 바다와 하얀 모래가 매력적인 해변',
            price: '저가',
            recommend: {
                season: ['여름'],
                companion: ['가족', '연인', '친구'],
                duration: ['반일', '당일']
            },
            highlights: [
                '에메랄드 해변',
                '서우봉',
                '일출'
            ],
            activities: [
                '해수욕',
                '수상레저',
                '산책',
                '카페투어'
            ],
            nearby: [
                '비자림',
                '만장굴',
                '김녕해수욕장'
            ],
            food: [
                '흑돼지구이',
                '해산물',
                '전복죽'
            ],
            facilities: {
                'parking': '넓은 주차장',
                'shower': '샤워장, 탈의실 완비',
                'cafe': '해변 카페 다수'
            }
        },
        {
            name: '카멜리아힐',
            region: '제주도',
            description: '동양 최대 동백꽃 군락지이자 사계절 정원',
            price: '중가',
            recommend: {
                season: ['겨울', '봄'],
                companion: ['연인', '가족'],
                duration: ['반일']
            },
            highlights: [
                '동백숲',
                '포토존',
                '유리온실'
            ],
            activities: [
                '정원산책',
                '사진촬영',
                '꽃구경'
            ],
            nearby: [
                '오설록티뮤지엄',
                '제주항공우주박물관',
                '환상숲'
            ],
            food: {
                '카페': '동백꽃차, 디저트',
                '주변맛집': '흑돼지, 해물탕'
            },
            seasonalInfo: {
                '동백개화': '12월~3월',
                '장미': '4월~5월',
                '수국': '6월~7월'
            }
        },
        {
            name: '우도',
            region: '제주도',
            description: '소가 누워있는 형상의 아름다운 부속섬',
            price: '중가',
            recommend: {
                season: ['봄', '가을'],
                companion: ['친구', '연인', '가족'],
                duration: ['당일']
            },
            highlights: [
                '우도봉',
                '검멀레해변',
                '하고수동해수욕장'
            ],
            activities: [
                '자전거투어',
                '스쿠터투어',
                '트레킹',
                '해수욕'
            ],
            nearby: [
                '성산일출봉',
                '종달리해변',
                '광치기해변'
            ],
            food: [
                '우도땅콤',
                '소라과자',
                '문어부르기'
            ],
            traffic: {
                'ferry': '성산포항에서 출발',
                'time': '15분 소요',
                'notice': '기상조건 확인 필수'
            }
        },
        {
            name: '월정리해변',
            region: '제주도',
            description: '제주 카페의 성지이자 아름다운 해변',
            price: '중가',
            recommend: {
                season: ['여름', '가을'],
                companion: ['연인', '친구'],
                duration: ['반일', '당일']
            },
            highlights: [
                '화이트 해변',
                '감성카페',
                '수상레저'
            ],
            activities: [
                '카페투어',
                '해수욕',
                '서핑',
                '일출감상'
            ],
            nearby: [
                '김녕해수욕장',
                '세화해변',
                '제주해녀박물관'
            ],
            food: [
                '흑돼지구이',
                '해산물',
                '카페디저트'
            ],
            bestSpot: {
                'photo': '월정리 해변 커브길',
                'sunrise': '해변 동쪽',
                'cafe': '해변가 카페거리'
            }
        }
    ];
    
    // 각 여행지의 특별 이벤트나 축제 정보
    const jeollaFestivals = {
        '전주': {
            '전주비빔밥축제': '10월',
            '전주한지문화축제': '5월',
            '전주국제영화제': '4-5월'
        },
        '여수': {
            '여수거북선축제': '5월',
            '여수밤바다불꽃축제': '여름시즌',
            '여수국제버스킹페스티벌': '9월'
        },
        '담양': {
            '담양대나무축제': '5월',
            '달빛내린천 월광축제': '8월'
        },
        '순천': {
            '순천만갈대축제': '10-11월',
            '순천만국가정원 봄꽃축제': '3-4월'
        }
    };

    

    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(filterForm);
        const filters = Object.fromEntries(formData.entries());
        
        const filteredDestinations = destinations.filter(dest => {
            for (let [key, value] of Object.entries(filters)) {
                if (!value) continue;
                
                switch(key) {
                    case 'region':
                        if (dest.region !== value) return false;
                        break;
                    case 'priceRange':
                        if (dest.price !== value) return false;
                        break;
                    case 'season':
                        if (!dest.recommend.season.includes(value)) return false;
                        break;
                    case 'companionType':
                        if (!dest.recommend.companion.includes(value)) return false;
                        break;
                    case 'duration':
                        if (!dest.recommend.duration.includes(value)) return false;
                        break;
                }
            }
            return true;
        });

        displayResults(filteredDestinations, filters);
    });

    function displayResults(destinations, filters) {
        const activeFilters = Object.entries(filters)
            .filter(([_, value]) => value)
            .map(([key, value]) => {
                switch(key) {
                    case 'ageGroup': return `${value}`;
                    case 'companionType': return `${value}와 함께하는`;
                    case 'season': return `${value}`;
                    case 'region': return `${value}`;
                    default: return '';
                }
            })
            .filter(text => text)
            .join(' ');

        resultsTitle.textContent = activeFilters 
            ? `${activeFilters} 추천 여행지 (${destinations.length}곳)`
            : '추천 여행지';

        searchResults.innerHTML = destinations.map(dest => `
            <div class="destination-card">
                <div class="destination-content">
                    <h3 class="destination-title">${dest.name}</h3>
                    <p class="destination-details">${dest.description}</p>
                    <div class="destination-meta">
                        <span class="tag price-tag">${dest.price}</span>
                        ${dest.recommend.season.map(s => 
                            `<span class="tag season-tag">${s}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        if (destinations.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <p>선택하신 조건에 맞는 여행지가 없습니다.</p>
                </div>
            `;
        }
    }

    // 초기 결과 표시
    displayResults(destinations, {});
});