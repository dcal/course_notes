#CloudFront
A CDN, content delivery network. Puts data at various end nodes so people can pull the data from a node closer to them.
These are called *edge locations*. There are 50(ish) currently

####Edge locations
Separate from an availability zone or region.

####Origin
Origin of the original files the CDN will distribute.
You can have multiple origins for a cloudfront distribution.

####Distribution
The name given the CDN which consists of a collection of Edge locations

If an edge location does not have a file cached, it pulls it from S3, then caches it for a given TTL. Default TTL is 24 hours (in seconds).

CloudFront can stream or send static content. Works with other services. Works with non-AWS origin servers.

##KNOW:
- What is an edge location?
- What is an origin?
- What is a distribution?
-- What is a web distribution (used for websited)
-- What is RTMP (media streaming distribution)
- You can write to edge locations and it will be sent to origin
- Objects cached for TTL for object
- You can clear cached objects but will be charged.
-- If you want to send new content to override cached content...
- You can also use it to post files to an edge location.

## Restrict Viewer Access
Use signed URL's or Signed cookies...you can only view the video using the URL that is private.

## Options
Geo Restriction: You can create whitelists or blacklists of countries that you will allow to view your content.
Invalidations: Stop content from being cached at certain edge locations BUT IT DOES COST MONEY.



