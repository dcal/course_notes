# Databases
## Types
SQL Server
Oracle
MySQL Server
PostgreSQL
Aurora
MariaDB

_READ FAQs_

## Non-Relational DBs
Collection is basically a table
Document is basically a row
KVP are values in the row (column & cell)


## Data Warehousing
Used for business intelligence.

### OTLP vs OTAP
Online Transaction Processing, Online Analytics Processing
Transaction processing is a basic query for data.

Analytics processing is running complex analysys on large number of records. Uses a different type of architecture from a DB and infrastructure perspective.

## Elasticache
Improves performance of web application but allowing you to retrieve information quickly from in-memory storage.
Supports Memcached and Redis

## DMS
Database Migration Services
Allows you to migrate production DB to AWS automatically.

## DynamoDB
NoSQL DB.
- Stored on SSD
- Stored in 3 geographically distinct data centers

### Data consistency models
- Eventual Consistent Reads
Consistency within a second
- Strongly consistent reads
Returns a result that reflects all writes that received a successful response prior to the read.

### Structure
Tables ( Collection of data )
Items ( Rows in the table )
Attributes ( Values in a row )

### Pricing
Provisioned throughput capacity
- Charged a fraction of a cent per hour per 10 units

Calculate how many writes and reads you need per second.
Write capacity Unit is 1 Write per Second

### Primary keys
Single attribute key
Also called a partition key.
Puts key into internal hash function, output of the hash function determines the partition (physical location where data is stored)
### Composite keys
Partition key and a Sort key
Dynamo uses the partition key in a hash function that determines the location. Two items in this case can have the same partition key but must have a differet sort key. All items with the same partition key are stored together by sort order value (such as timestamp).

### Indexes
####Local secondary index:
Same partition key, different sort key.
Can only be added at database table creation.

####Global
Has different partition key and differnt sort key.
Can be created at table creation of later

### Dynamo DB Streams
*24 hours storage of changes*
If item is added to table, stream captures an image of the item, including all attributes.
If an item is updated, captures before and after
If an item is deleted, captures before and deletion

Once captured in streams, it can trigger a lambda function that can then add to a replica table or do something else with it.

### Query vs Scan
_Query_ finds items using only primary key attribute values. You must provide a partition attribute name and a distrinct value to search for. You can p=optionally provide a sort key attribute name and value and use a comparison operator to refine the search results.

By default, a query returns all of hte data attributes for items with the specified primarykeys; however you can use the ProjectionExpression parameter so that the query only returns some of hte attributes rather than all of them.

Query results are always sorted by the sort key if you have one. Ascending by default, by numeric order, (or alphabetical order). ScanIndexForward parameter changes the order of results from ascending to descending.

_Scan_ operation examines every item in the table. By default a scan returns all of the data attrbutes for ever item; however, you can use the Projection Expression parameter so that the scan only returns some of the attributes rather than all of them.

Scan gets slower as table gets larger. Can max out the provision throughput in a single operation.

### Provisioned Throughput Calculations
#### Unit of Read provisioned thorughput
Rounded up to increments of 4KB
Eventually COnsistend Reads consist of 2 reads per second
Strongly consistent is 1 read per second

#### Unit of Write provisioned throughput
All writes are 1KB
All writes consist of 1 write per second

*QUESTION*
You have an applicaiton that requres t read 10 items of 1KB pers exond using eventual consistenxcy What should you set read thorughput to?
(Size of Read rounded up to nearest 4KB chunk / 4KB ) X N items = read thorughput  (/2 if eventually consistent)

- First calculate how many read units per item we need
1 KB rounded to nearest 4KB increment = 4
4KB / 4KB = 1 read unit per item
1x10 read items = 10
Using eventual consistency we get 10/2=5
5 units of read throughput

400 HTTP status provisioned input exceeced exception if you overstep provisioned throughput capacity.
