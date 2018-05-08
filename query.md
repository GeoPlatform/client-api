# Queries

The `ItemService.search()` method accepts both generic JS objects, containing
parameter name and value combinations, and `Query` objects. The `Query` class
provides methods for quickly building search criteria based upon the GeoPlatform object model.

## Creating a Query
You can instantiate `Query` directly or use `QueryFactory` to get a new `Query` instance.

### Client-side

```javascript
//using global variable
let queryA = new GeoPlatformClient.Query();
queryA.setQ("testing");

let queryB = GeoPlatformClient.QueryFactory();
queryB.setQ("testing");
```

### Server-side

```javascript
//using require
const GeoPlatformClient = require('geoplatform.client')
const Query = GeoPlatformClient.Query
const QueryFactory = GeoPlatformClient.QueryFactory

let queryA = new Query();
queryA.setQ("testing");

let queryB = QueryFactory();
queryB.setQ("testing");
```


## Fluent Queries

`Query` exposes both getter/setter methods for each supported query parameter as well
as a fluent version of the setter which returns "this", allowing you to chain
method calls.

```javascript
//Both of these are equivalent
let queryA = new GeoPlatformClient.Query();
queryA.setTypes( 'Layer' );
queryA.setEndDate( new Date().getTime() );

let queryB = new GeoPlatformClient.Query()
    .types( 'Layer' )
    .ends( new Date().getTime() );
```


## Query Parameters
You can get a list of the predefined query parameters supported by the
`Query` object using the `QueryParameters` object:

### Client-side
```javascript
const PARAMS = GeoPlatformClient.QueryParameters;
```

### Server-side
```javascript
const PARAMS = require('geoplatform.client').QueryParameters
```



## Free text search

The `setQ()`, `getQ()`, `q()` methods allow setting/getting the "q" parameter which
maps to free text search in the GeoPlatform API.  This is equivalent to searching
labels, descriptions, keywords, and any other textual field that supports being searched
via free text.

Values with spaces are treated as multiple, OR'ed constraints. To search for a specific
phrase, wrap the value with double quotes.

```javascript
let query = new GeoPlatformClient.Query().q('"This is a phrase"');
```

## Date Parameters
Date values should be passed to `Query` methods as their millisecond representation.

```javascript
let queryB = new GeoPlatformClient.Query().ends( new Date().getTime() );
```

## Requesting specific result properties
By default, search result items contain only a limited set of properties:

- id - unique identifier of an Item
- uri - unique resource identifier (URI) of an Item
- type - the type of Item
- label
- description
- createdBy - GeoPlatform username of author
- created - Creation date
- modified - Last modified date
- publishers - Publishing Organizations
- themes - GeoPlatform themes associated

To request a different set of fields, specify them using `Query.setFields()` or
`Query.fields()`. To get the current set of fields, use `Query.getFields()`.  Use
the `QueryFields` object to reference fields when manipulating the fields to request
in a Query.

_Note:_ You must specify the property name to use. For example, to also request
the geographic extent for each item in the search results, do the following:

```javascript
let query = new GeoPlatformClient.Query();
let fields = query.getFields();
fields.push(GeoPlatformClient.QueryFields.EXTENT);
query.setFields(fields);
```


## Request faceted information
Search results contain facet information specifying how certain values appear
within the entire repository of data.  Use the `QueryFacets` object's set of
facets to request specific ones with a query.

```javascript
const Facets = GeoPlatformClient.QueryFacets; //or require('geoplatform.client').QueryFacets;
query.facets([Facets.TYPES, Facets.THEMES]);
```

To omit facet information, use `Query.setFacets(false)`.


By default, the following facets are requested with each search:

- QueryFacet.TYPES - GeoPlatform CBO Item types
- QueryFacets.THEMES - GeoPlatform Concepts associated as themes
- QueryFacets.PUBLISHERS - GeoPlatform Organizations associated as publishing agencies
- QueryFacets.SERVICE_TYPES - GeoPlatform Service specification association (only applies to type "regp:Service" items)
- QueryFacets.SCHEMES - GeoPlatform Concept Schemes associated (only applies to type "skos:Concept" items)
- QueryFacets.VISIBILITY - visible status of Items
- QueryFacets.CREATED_BY - authors of Items

See [QueryFacets](src/shared/query.js) for a larger list of available facets.


## Sorting results

The `Query.setSort()` and `Query.sort()` methods allows you to set both the property
and direction of sorting to use. To specifically set either, use the `Query.setSortField()`
and `Query.setSortOrder()` methods.

```javascript
let query = new Query();
query.sort('modified', 'desc');
query.sort('modified,desc');    //same as above line
```

The list of supported default sort options can be retrieved using `Query.getSortOptions()`.

## Paging Results

Use `Query.setPage()` and `Query.setPageSize()` to modify the paging parameters issued
with queries.  Pages start at 0 and the default page size is 10.


## Clearing Query values

To reset a Query instance, use `Query.clear()`.


## KG Queries

When using a [KGService](src/services/kg.js), you should use an instance of
[KGQuery](src/shared/kg-query.js).  `KGQuery` provides a shorter list of parameter
methods as listed below:

- q / setQ / getQ - same as the equivalent `Query` methods
- classifiers / setClassifiers  / getClassifiers - specifies the type of concepts to search
- types / setTypes / getTypes - specifies the Item type(s) to constrain concepts by
