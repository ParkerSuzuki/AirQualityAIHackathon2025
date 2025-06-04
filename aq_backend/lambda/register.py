import json, os, boto3, uuid
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['USER_TABLE'])

def handler(event, context):
    body = json.loads(event['body'])
    user_id = str(uuid.uuid4())
    table.put_item(Item={
        'userId': user_id,
        'zip': body['zip'],
        'ageGroup': body['ageGroup'],
        'asthma': body['asthma'],
        'outdoorHours': body['outdoorHours'],
        'alertChannel': body['alertChannel'],
        'phone': body.get('phone'),
        'email': body.get('email')
    })
    return {"statusCode": 200, "body": json.dumps({"userId": user_id})}
