#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import DustHead, Record, Copy, Comment

# Views go here!
class Home(Resource):
    def get(self):
        return 'Welcome to the land where vinyl reigns supreme. All hail the dustheads!'
    
class DustHeads(Resource):
    def get(self):
        dustheads = [dh.to_dict() for dh in DustHead.query.all()]

        response = make_response(dustheads, 200)
        return response

    def post(self):
        data = request.get_json()
        new_dh = DustHead(
            username = data['username'],
            first_name = data['first_name'],
            last_name = data['last_name']
        )
        try:
            db.session.add(new_dh)
            db.session.commit()
        except ValueError:
            db.session.rollback()
            return make_response({'error': '400: Validation error.'}, 400)
            
        response = make_response(new_dh.to_dict(), 201)
        return response
    
class Records(Resource):
    def get(self):
        records = [r.to_dict() for r in Record.query.all()]

        response = make_response(records, 200)
        return response
    
    def post(self):
        data = request.get_json()
        new_record = Record(
            title = data['title'],
            genre = data['genre'],
            artist = data['artist'],
            year = data['year'],
            image = data['image']
        )
        try:
            db.session.add(new_record)
            db.session.commit()
        except ValueError:
            db.session.rollback()
            return make_response({'error': '400: Validation error.'}, 400)
            
        response = make_response(new_record.to_dict(), 201)
        return response
    
class Copies(Resource):
    def get(self):
        copies = [c.to_dict() for c in Copy.query.all()]

        response = make_response(copies, 200)
        return response
    
class Comments(Resource):
    def get(self):
        comments = [c.to_dict() for c in Comment.query.all()]

        response = make_response(comments, 200)
        return response

api.add_resource(Home, '/')
api.add_resource(DustHeads, '/dustheads')
api.add_resource(Records, '/records')
api.add_resource(Copies, '/copies')
api.add_resource(Comments, '/comments')

if __name__ == '__main__':
    app.run(port=5555, debug=True)