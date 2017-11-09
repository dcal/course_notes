# Global Infrastructure
## Regions
A place in the world where AWS resources exist.
A region consists of 2 or more availiability zones.
Not all regions have all services.

## Availability Zones
Data center/warehouses. Close to each other but not dependent on each other.

## Edge Location
CDN (endpoints for cloud front)
A way to cache large media objects in the cloud. Video files, pictures, etc. closer to the requester.

# Network and Content Delivery
## VPC - Virtual datacenter (Virtual Private Cloud)
Can have multiple VPC per region. (Need to know how to build a VPC from memory.)

# Route 53
Amazon's DNS service

# Storage
##S3
Object-based storage, files, etc. Dropbox was one of the first places to use S3.

## Glacier
Long-term file archiving.

## EFS
Elastic File Service
File-based storage you can share.

## Storage Gateway
Connecting S3 to on-prem datacenter.


# Databases
##RDS
Relational Database Service

## DynamoDB
NoSQL database

## Redshift
Data warehousing, for running data analytical queries against production data

## Elasticache
Cache your data in the cloud - take load off production database

# Migration
## Snowball
Move terrabytes of data into the cloud - it's an appliance

## DMS
Migrate on-prem databases to cloud, or databases from AWS cloud to other regions or Redshift. Zero downtime. DMS handles conversion processes between database.

## SMS
Server migration services - targets VMWare virtual machines

# Analytics
## Athena
Turns flat files into searchable databases. *CHECK THIS OUT*

## EMR
Big data proessing and analytics (Hadoop)

## Cloud Search
Fully managed search service

## Elastic Search
Search capabilities within website

## Kinesis
Streaming and analyzing real-time data. IoT, Financial, social media streams, etc.

## Data pipeline
Allows you to move data from one place to another.

# Security and Identity
## IAM (Identity and Access Management)
Fundamental component of AWS, how you sign in and authenticate, groups, permissions, etc.

## Certificate Manager

## Inspector

## Directory Service
Connect Active Directory to AWS *Check this out*

## WAF
Web-application firewall. Protection at the application layer.

## Artifact
Compliance Certification Documentation

# Management Tools
## Cloud Watch
Monitor performance of AWS environment (Ec2 disc utilization, RAM utilization, etc.)

## Cloud Formation
Turning infrastructure into coden (like Terraform)

## Service Catalog

## OpsWorks

## Trusted Advisor
Automated recommendation about cloud environment

# Application Services
## Step Functions
Visualizing what is going on inside application...

## Simple Workflow Service (SWF)
Coordinating automated tasks and human-led tasks (Could this be something we use to coordiante human interaction points?)

## API Gateway
Routing

## App Stream
Stream desktop applications to your users.

## Elastic Transcoder
Changes video format to suit all different devices.

# Developer Tools
## Code Commit
AWS' github

## Code build
Compile code in different environments

## Code deploy
Deploy code to EC2 instances

# Mobile Services
## Mobile hub

## Cognito
SSO services

# KNOW FOR EX
