from google.appengine.ext import db


class Tempdb(db.Model):
    username = db.StringProperty(required=True)
    post_title = db.StringProperty(required=True)
    post_details = db.StringProperty(required=True)
    min_bid = db.IntegerProperty(required=True)
    max_bid = db.IntegerProperty(required=True)
    status = db.StringProperty(default="null")
    startTime = db.DateTimeProperty(required=True)
    endTime = db.DateTimeProperty(required=True)
    Freelancer = db.StringProperty(default="null")


class FinalPostdb(db.Model):
    username = db.StringProperty(required=True)
    post_title = db.StringProperty(required=True)
    post_details = db.StringProperty(required=True)
    post_date = db.DateTimeProperty(auto_now_add=True)
    min_bid = db.IntegerProperty(required=True)
    max_bid = db.IntegerProperty(required=True)
    status = db.StringProperty(default="null")
    start_date = db.DateProperty(required=True)
    end_date = db.DateProperty(auto_now_add=True)
    Freelancer = db.StringProperty(default="null")

    @classmethod
    def add_post(cls, username, post_title, post_details, min_bid, max_bid, start_date, end_date):
        f = FinalPostdb(username=username, post_title=post_title, post_details=post_details, min_bid=int(min_bid),
                        max_bid=int(max_bid), start_date=start_date, end_date=end_date)
        print 'giojoa'
        f.put()

    @classmethod
    def by_username(cls, username):
        return FinalPostdb.all().filter(username=username)

    @classmethod
    def by_id(cls, uid):
        FinalPostdb.get_by_id(uid)