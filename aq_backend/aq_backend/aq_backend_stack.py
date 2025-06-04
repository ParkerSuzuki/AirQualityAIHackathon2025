from aws_cdk import (
    # Duration,
    Stack,
    # aws_sqs as sqs,
    aws_lambda as _lambda,
    Duration,
)
from aws_cdk.aws_apigatewayv2_alpha import (        # “alpha” until GA
    HttpApi,
    CorsPreflightOptions,
    CorsHttpMethod,
    HttpMethod,
)
from aws_cdk.aws_apigatewayv2_integrations_alpha import (  # <— NOTE!
    HttpLambdaIntegration,
)
from constructs import Construct

class AqBackendStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # 1️⃣  Create (or import) an HTTP API Gateway
        rest_api = HttpApi(
            self,
            "AqiApi",
            cors_preflight=CorsPreflightOptions(
                allow_methods=[CorsHttpMethod.ANY],
                allow_origins=["*"],
            ),
        )

        # 2️⃣  Define the Lambda handler
        register_fn = _lambda.Function(
            self,
            "RegisterFn",
            runtime=_lambda.Runtime.PYTHON_3_12,
            handler="register.handler",          # file = register.py  func = handler
            code=_lambda.Code.from_asset("lambda"),  # folder with your .py file
            timeout=Duration.seconds(10),
        )

        # 3️⃣  Glue them together with an *integration* object
        register_integration = HttpLambdaIntegration(
            "RegisterIntegration",
            handler=register_fn,
        )

        # 4️⃣  Expose the /register POST route
        rest_api.add_routes(
            path="/register",
            methods=[HttpMethod.POST],
            integration=register_integration,
        )