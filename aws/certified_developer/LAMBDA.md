## AWS LAMBDA

Lambda events can trigger other lambda events.

Each invocation of a Lambda function is a distinct invocation of that function. It scales automatically.

### Benefits
- No servers
- Continuous instantaneous scaling
- Super super super cheap!

#### Scaling up vs scaling out:
Scaling up is adding resources (RAM, etc)
Scaling out is adding instances


## Exam Tips
### What can trigger a lambda function?
Each request to a Lambda function invokes a new function.

Lambda is priced based on request
.20 per 1 million requests after the first 1 million

Billed on duration (how long between code begins executing to termination?)

_Function has a 5 minute execution limit_

- Know what services are serverless
- Know that lambda functions can trigger functions (1 event to N functions)
- Architectures can be extremely complicated, use X-Ray service
- Lambda can do things globally (move s3 buckets to other s3 buckets)
- Know your triggers


