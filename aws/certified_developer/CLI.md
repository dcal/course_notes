#AWS-CLI
The AWS Linux AMIs have the AWS CLI installed already.
`aws configure` will configure your dotfiles for you.

DON'T STORE CREDENTIALS IN CODE!!!!

Credentials aren't secure. Most secure way to do it is using roles.

## Using Roles
Assigning roles to an EC2 instance of the Amazon Linux AMI allows you to have CLI access based on roles, without putting keys there.
You can still configure .aws credentials and only put the default region if you want. Still secure.


## Commands you need to know
### Describe provisioned instances
`aws ec2 describe-instances`

### Describe images
`aws ec2 describe-images`

### Launch instances (don't confuse with start-instances)
`aws ec2 run-instance ...`
Keypair name and security group must exist.

### Terminate instances
`aws ec2 terminate-instances {instance-id} (--dry-run)`

### Create a new role
`aws ec2`


## Bash Scripting
When creating an EC2 instance, in Advanced Details > User data, you can add bash scripts that will execute when the instance provisions. This includes aws commands, if you are provisioning an Amazon Linux AMI
