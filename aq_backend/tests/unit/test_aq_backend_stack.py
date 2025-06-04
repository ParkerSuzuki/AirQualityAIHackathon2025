import aws_cdk as core
import aws_cdk.assertions as assertions

from aq_backend.aq_backend_stack import AqBackendStack

# example tests. To run these tests, uncomment this file along with the example
# resource in aq_backend/aq_backend_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = AqBackendStack(app, "aq-backend")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
