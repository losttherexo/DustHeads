#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api, bcrypt
from models import DustHead, Record, Copy, Comment

# Views go here!
class Home(Resource):
    def get(self):
        return 'Welcome to the land where vinyl reigns supreme. All hail the dustheads!'
    
class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']        
        email = data['email']
        password = data['password']

        dh_exists = DustHead.query.filter(DustHead.username == username).first() is not None

        if dh_exists:
            response = make_response({"error": "User already exists"}, 409)
            return response

        new_dh = DustHead(
            username = username,
            email = email,
            _password_hash = password
        )

        new_dh.password_hash = password

        try:
            db.session.add(new_dh)
            db.session.commit()
            session['dh_id'] = new_dh.id
            response = make_response(new_dh.to_dict(), 201)
            return response
        except ValueError:
            db.session.rollback()
            response = make_response({'error': '400: Validation error.'}, 400)
            return response
        
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        dh = DustHead.query.filter(DustHead.username == username).first()

        if dh:
            if dh.authenticate(password):
                session['dh_id'] = dh.id
                response = make_response(dh.to_dict(), 200)
                return response
            
        response = make_response({'error': '401: Not Authorized'}, 401)
        return response
    
class Logout(Resource):
    def delete(self):
        if session.get('dh_id'):
            session['dh_id'] = None
            response = make_response({'message' : '204: No Content'}, 204)
            return response
        
class CheckSession(Resource):
    def get(self):
        dh_id = session['dh_id']
        if dh_id:
            dh = DustHead.query.filter(DustHead.id == dh_id).first()
            response = make_response(dh.to_dict(), 200)
            return response
        else:
            response = make_response({'message': '401: Not Authorized'}, 401)
            return response
        
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
            response = make_response({'error': '400: Validation error.'}, 400)
            return response
            
        response = make_response(new_dh.to_dict(), 201)
        return response
    
class DustHeadsByID(Resource):
    def get(self, id):
        dh = DustHead.query.filter_by(id=id).first()
        if dh == None:
            return make_response({'error': '404: DustHead not found'}, 404)
        
        response = make_response(dh.to_dict(), 200)
        return response
    
    def patch(self, id):
        dh = DustHead.query.filter_by(id=id).first()
        if dh == None:
            return make_response({'error': '404: DustHead not found'}, 404)

        data = request.get_json()
        for key in data.keys():
            setattr(dh, key, data[key])
        db.session.add(dh)
        db.session.commit()
        return make_response(dh.to_dict(), 200)
    
    def delete(self, id):
        dh = DustHead.query.filter_by(id=id).first()
        if dh == None:
            return make_response({'error': '404: DustHead not found'}, 404)
        db.session.delete(dh)
        db.session.commit()
        return make_response('DustHead has been deleted!', 204)
    
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

class RecordsByID(Resource):
    def get(self, id):
        record = Record.query.filter_by(id=id).first()
        if record == None:
            return make_response({'error': '404: Record not found'}, 404)
        response = make_response(record.to_dict(), 200)
        return response
    
    def patch(self, id):
        record = Record.query.filter_by(id=id).first()
        if record == None:
            return make_response({'error': '404: Record not found'}, 404)

        data = request.get_json()
        for key in data.keys():
            setattr(record, key, data[key])
        db.session.add(record)
        db.session.commit()
        return make_response(record.to_dict(), 200)
    
    def delete(self, id):
        record = Record.query.filter_by(id=id).first()
        if record == None:
            return make_response({'error': '404: Record not found'}, 404)
        db.session.delete(record)
        db.session.commit()
        return make_response('DustHead has been deleted!', 204)
    
class Copies(Resource):
    def get(self):
        copies = [c.to_dict() for c in Copy.query.all()]

        response = make_response(copies, 200)
        return response
    
class CopiesByID(Resource):
    def get(self, id):
        copy = Copy.query.filter_by(id=id).first()
        if copy == None:
            return make_response({'error': '404: Record not found'}, 404)
        response = make_response(copy.to_dict(), 200)
        return response
    
    def patch(self, id):
        copy = Copy.query.filter_by(id=id).first()
        if copy == None:
            return make_response({'error': '404: Record not found'}, 404)

        data = request.get_json()
        for key in data.keys():
            setattr(copy, key, data[key])
        db.session.add(copy)
        db.session.commit()
        return make_response(copy.to_dict(), 200)
    
    def delete(self, id):
        copy = Copy.query.filter_by(id=id).first()
        if copy == None:
            return make_response({'error': '404: Record not found'}, 404)
        db.session.delete(copy)
        db.session.commit()
        return make_response('DustHead has been deleted!', 204)
    
class Comments(Resource):
    def get(self):
        comments = [c.to_dict() for c in Comment.query.all()]

        response = make_response(comments, 200)
        return response
    
class CommentsByID(Resource):
    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if comment == None:
            return make_response({'error': '404: Record not found'}, 404)
        response = make_response(comment.to_dict(), 200)
        return response
    
    def patch(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if comment == None:
            return make_response({'error': '404: Record not found'}, 404)

        data = request.get_json()
        for key in data.keys():
            setattr(comment, key, data[key])
        db.session.add(comment)
        db.session.commit()
        return make_response(comment.to_dict(), 200)
    
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if comment == None:
            return make_response({'error': '404: Record not found'}, 404)
        db.session.delete(comment)
        db.session.commit()
        return make_response('DustHead has been deleted!', 204)

api.add_resource(Home, '/')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(DustHeads, '/dustheads')
api.add_resource(DustHeadsByID, '/dustheads/<int:id>')
api.add_resource(Records, '/records')
api.add_resource(RecordsByID, '/records/<int:id>')
api.add_resource(Copies, '/copies')
api.add_resource(CopiesByID, '/copies/<int:id>')
api.add_resource(Comments, '/comments')
api.add_resource(CommentsByID, '/comments/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)