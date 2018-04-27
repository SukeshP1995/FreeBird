from google.appengine.ext import db


class FinalBiddb(db.Model):
    username = db.StringProperty(required=True)
    post_id = db.StringProperty(required=True)
    bid_value = db.IntegerProperty(required=True)
    bid_date = db.DateTimeProperty(auto_now_add=True)

    @classmethod
    def add_bid(cls, username, post_id, amount):
        f = FinalBiddb(username=username, post_id=post_id, bid_value=amount)
        f.put()

    @classmethod
    def by_username(cls, username):
        return FinalBiddb.all().filter(username=username)

    @classmethod
    def by_id(cls, uid):
        FinalBiddb.get_by_id(uid)