## EBS
Block-based storage for your instance.
Placed in an Availability Zone and replicated so they are protected from failure from a sigle component.

### SSD
#### General purpuse SSD (GP2)
3 IOPS per GB (IOPS is input/output operations per second)

#### Provisioned IOPS SSD

### Magnetic storage HDD (ST1)

#### Optimized High Throughput
Used for big sequential data. Can't boot from optimized drive.

#### Cold HDD (SC1)
Lowest cost
File Server
No boot

#### Magnetic Standard
Bootable

## AMIs
Snapshots of virtual machines

CloudWatch detailed monitoring makes it check health every 60 seconds

### Tags
Help you track costs, tag everything you can!!!

System status check: Verify instance is reachable - checking hypervisor is up.
Instance status check: verify software and network configuration


______
## Security Groups
Security groups are virtual firewalls. First line of defense against hackers.
Security group changes apply IMMEDIATELY!

### Inbound & Outbound
When you add an inbound rule, an outbound rule that corresponds to it is automatically added.

All inbound traffic is blocked by default.
All outbound traffic is allowed automatically by default.
You can have any number of instances in a security groups, and any number of security groups attached to an instance.

You cannot blacklist specific IPs through security groups, only whitelist. You have to use Network Access Controllers.

Security groups are STATEFUL. Any security group that you list in a security group can communicate with that security group. You can associate multiple SGs with an instance.

To add a security group: Actions > Networking > Change Security Groups


### Upgrading EBS Volume Types
`lsblk` shows volumes attached to instance`mkfs -t ext4 /dev/xvdd` - create filesystem
`mount /dev/xvdd /dmower` mount
`umount /dev/xvdd` unmount volume

Detach volume if it's not mounted
Force detach if it's mounted, but be careful!!!!

If you want to see if there's data on a volume before you mount, run:
`file -s {volume}` will show if there are files or not.

You can create a snapshot and attach the new snapshot to an instance.

To upgrade:
Create a snapshot
Create a volume from a snapshot
Re-attach volume to EC2

EBS volumes can be changed on fly except magnetic standard!!!
Best practice: Stop the instance, create a snapshot, create avolume, remount!
*If you do change on the fly, you have to wait 6 hours before making another change*

You can't scale a volume down, only UP!
You can't mount an EBS volume to two instances, only ONE!

You can change volume types by taking a snapshot and create another volume.
Volumes must be in the same availability zone as EC2 instances.
No magic way to change availability zones, you have to take a snapshot and create the volume in a new availability zone.

### EFS (Elastic File System)
- Supports NFSv4
- Only pay for storage you use
- Can support thousands of concurrent NVS conenctions
- Data stored in multiple AZ's at once
- Block-based storage, not object-based storage.

## Instance Metadata
_Remember for the exam!_
`curl http://129.254.169.254/latest/meta-data/{info}`
The command will return a bunch of options if you just hit the `/meta-data` endpoint.

# Exam Tips
### ELB (Elastic Load Balancer)
Applicaiton load balancer is layer 4
*TIP* ELB's cost you money! Don't forget about them and delete them if you're not using them.
- You never get an IPv4 address for an ELB, you only get DNS.
- Using Route53 you point a DNS to your load balancer.

### Know difference between pricing models:
- on demand
- spot
- reserved
- dedicated hosts

### Remember pricing with spot instances compute time.

### What happens when you delete an ec2 instance?
Volume is terminated by default


### EBS
Remember drive types and and specs.

- SSD, General Puropse - GP2 - (Up to 10,000 IOPS)
- SSD, Provisioned IOPS - I01 - (More than 10,000 IOPS)
- HDD, Throughput Optimized - ST1 - frequently accessed workloads
- HDD, Cold - SC1 - Less frequently accessed data.
- HDD, Magnetic - Standard - cheap, infrequently accessed storage

- You cannot mount 1 EBS volume to multiple EC2 instances. Instead use EFS.


### EC2 Instance types
DRMCGIFTPX
D2 - Dense storage
R4 - Memory optimized (Memory intensive)
M4 - General Purpose
C4 - COmpute optimized (CPU intensive apps / databases)
G2 - Graphics Intensive
I2 - High Speed Storage
F1 - Field Programmable Gate Array (Hardware accelleration)
T2 - Lowest Cost, General Purpose
P2 - Graphics / General Purpose GPY (Bitcoun)
X1 - Memory Optimized

- ONE subnet to One avalability zone

### Know what default options come with CloudWatch

### SDKs
#### Know available SDKs:
- Android, iOS, Javascript
- Java
- .Net
- Node.js
- PHP
- Python
- Ruby
- Go
- C++

_Default Region: US-EAST-1_

_Read the EC2 FAQ before taking the exam_
### Know differences between: 
- On Demand
- Spot ( If you terminate the instance, you always pay for the hour, if AWS terminates it, you get the hour for free. )
- Reserved
- Dedicated Hosts

### Labs
- Termination protection is turned off by default
- On an EBS-backed instance, the default action is for the root EBS volume to be deleted when the instance is terminated. You can turn this off.
- Root volumes cannot be encrypted by default, you need a third-party tool (additional volumes can be encrypted)
- Volumes exist on EBS, Snapshots exist on S3
- Snapshots are incremental, only things that have changed are moved to S3 (first one takes time, the rest are fast)
- Snapshots of encrypted volumes are encrypted automatically
- Can share snapshots, but only if they are unencrypted
- Snapshots can be shared with other AWS accounts or can be made public
- Instance store volumes are ephemeral storage
- Instance store volumes cannot be stopped
- You have to stop EBS volumes to take a snapshot

- AMIs are regional but you can copy them

- CloudWatch standard monitoring = 5 minute default. Detailed monitoring is 1 minute.
- CloudWatch is performance, CloudTrail is auditing.


#### Roles
- Roles are easier to manage than access keys
- Roles can be assigned to an EC2 instance AFTER it has been provisioned using CLI and AWS console.
- You can add policy documents to a role live.
- Roles are universal.

#### Instance Metadata
- Used to get metadata about an instance
- `curl http://129.254.169.254/latest/meta-data/{info}`

#### EFS Features
- Pay only for storage you use
- Scale up to petabytes
- Can support thousands of connections
- Data stored across multiple AZ's with in a region
- Read after write consistency

#### Lambda

