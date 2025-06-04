import os, boto3, json
from decimal import Decimal
dynamo  = boto3.resource('dynamodb')
sns     = boto3.client('sns')
ses     = boto3.client('sesv2')
table   = dynamo.Table(os.environ['USER_TABLE'])

from risk_score import personal_risk_score

def handler(event, context):
    # 1) Pull latest forecast from SageMaker or NAQFC bucket
    aqi_by_zip = get_today_forecast()  # your helper
    # 2) Scan users (fine for hackathon; switch to partiQL if large)
    for item in table.scan()['Items']:
        risk = personal_risk_score(aqi_by_zip[item['zip']], item)
        if risk >= 3:  # your “High” threshold
            msg = f"Air quality is {aqi_by_zip[item['zip']]} (High) today. Consider indoor plans."
            if 'SMS' in item['alertChannel'] and item.get('phone'):
                sns.publish(PhoneNumber=item['phone'], Message=msg)
            if 'EMAIL' in item['alertChannel'] and item.get('email'):
                ses.send_email(
                    FromEmailAddress=os.environ['SENDER'],
                    Destination={'ToAddresses':[item['email']]},
                    Content={'Simple':{'Subject':{'Data':'Air-Quality Alert'},
                                       'Body':{'Text':{'Data':msg}}}})
