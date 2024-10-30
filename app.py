from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

# 데이터베이스 초기화
def init_db():
    with sqlite3.connect('database.db') as conn:
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                destination TEXT NOT NULL,
                rating INTEGER NOT NULL,
                review_text TEXT NOT NULL,
                weather TEXT,
                visit_date DATE,
                travel_with TEXT,
                recommend BOOLEAN,
                photo_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                cost INTEGER,
                visit_season TEXT
            )
        ''')
        conn.commit()

# 앱 시작 시 DB 초기화
@app.before_first_request
def setup():
    init_db()

# 기본 라우트
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/map')
def map_page():
    return render_template('map.html')

@app.route('/roulette')
def roulette_page():
    return render_template('roulette.html')

@app.route('/reviews')
def reviews_page():
    return render_template('reviews.html')

# 리뷰 API 엔드포인트들
@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        with sqlite3.connect('database.db') as conn:
            conn.row_factory = sqlite3.Row  # 컬럼명으로 접근 가능하게 설정
            c = conn.cursor()
            c.execute('SELECT * FROM reviews ORDER BY created_at DESC')
            
            reviews = []
            for row in c.fetchall():
                review = dict(row)
                # SQLite는 boolean을 제대로 처리하지 못하므로 변환
                review['recommend'] = bool(review['recommend'])
                reviews.append(review)
                
            return jsonify(reviews)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reviews', methods=['POST'])
def add_review():
    try:
        data = request.json
        with sqlite3.connect('database.db') as conn:
            c = conn.cursor()
            c.execute('''
                INSERT INTO reviews (
                    destination, rating, review_text, weather, 
                    visit_date, travel_with, recommend,
                    photo_url, cost, visit_season
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                data['destination'],
                data['rating'],
                data['review_text'],
                data.get('weather'),
                data.get('visit_date'),
                data.get('travel_with'),
                data.get('recommend', True),
                data.get('photo_url'),
                data.get('cost'),
                data.get('visit_season')
            ))
            conn.commit()
            return jsonify({'success': True, 'id': c.lastrowid})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 리뷰 삭제 API 추가
@app.route('/api/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    try:
        with sqlite3.connect('database.db') as conn:
            c = conn.cursor()
            # 먼저 리뷰가 존재하는지 확인
            c.execute('SELECT id FROM reviews WHERE id = ?', (review_id,))
            if not c.fetchone():
                return jsonify({'error': 'Review not found'}), 404
            
            # 리뷰 삭제
            c.execute('DELETE FROM reviews WHERE id = ?', (review_id,))
            conn.commit()
            return jsonify({'message': 'Review deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 리뷰 수정 API 추가
@app.route('/api/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    try:
        data = request.json
        with sqlite3.connect('database.db') as conn:
            c = conn.cursor()
            # 먼저 리뷰가 존재하는지 확인
            c.execute('SELECT id FROM reviews WHERE id = ?', (review_id,))
            if not c.fetchone():
                return jsonify({'error': 'Review not found'}), 404
            
            # 리뷰 업데이트
            c.execute('''
                UPDATE reviews SET
                    destination = ?,
                    rating = ?,
                    review_text = ?,
                    weather = ?,
                    visit_date = ?,
                    travel_with = ?,
                    recommend = ?,
                    photo_url = ?,
                    cost = ?,
                    visit_season = ?
                WHERE id = ?
            ''', (
                data['destination'],
                data['rating'],
                data['review_text'],
                data.get('weather'),
                data.get('visit_date'),
                data.get('travel_with'),
                data.get('recommend', True),
                data.get('photo_url'),
                data.get('cost'),
                data.get('visit_season'),
                review_id
            ))
            conn.commit()
            return jsonify({'message': 'Review updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 단일 리뷰 조회 API 추가
@app.route('/api/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    try:
        with sqlite3.connect('database.db') as conn:
            conn.row_factory = sqlite3.Row
            c = conn.cursor()
            c.execute('SELECT * FROM reviews WHERE id = ?', (review_id,))
            review = c.fetchone()
            
            if review is None:
                return jsonify({'error': 'Review not found'}), 404
                
            review_dict = dict(review)
            review_dict['recommend'] = bool(review_dict['recommend'])
            return jsonify(review_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 에러 핸들러
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)