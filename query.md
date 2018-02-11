# Queries

The 'search' method of `ItemService` implementations accepts both generic
JS objects, containing parameter name and value combinations, and GeoPlatform.Query objects.
`Query` provides methods for quickly building search criteria based upon the GeoPlatform object model.

## Creating a Query
You can instantiate `Query` directly or use `QueryFactory` to get a new `Query` instance.

### Client-side

```javascript
let queryA = new GeoPlatform.Query();
queryA.setQ("testing");

let queryB = GeoPlatform.QueryFactory();
queryB.setQ("testing");
```

### Server-side

```javascript
const GPAPI = require('geoplatform.client')
const Query = GPAPI.Query
const QueryFactory = GPAPI.QueryFactory

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
let queryA = new GeoPlatform.Query();
queryA.setTypes( 'Layer' );
queryA.setEndDate( new Date().getTime() );

let queryB = new GeoPlatform.Query()
    .types( 'Layer' )
    .ends( new Date().getTime() );
```


## Query Parameters
You can get a list of the predefined query parameters supported by the
`Query` object using the `QueryParameters` object:

### Client-side
```javascript
const PARAMS = GeoPlatform.QueryParameters;
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
let query = new GeoPlatform.Query().q('"This is a phrase"');
```

## Date Parameters
Date values should be passed to `Query` methods as their millisecond representation.

```javascript
let queryB = new GeoPlatform.Query().ends( new Date().getTime() );
```

## Requesting specific result properties
By default, search result items contain only a limited set of properties:

- ID (`id`) - included automatically
- URI (`uri`) - included automatically
- Type (`type`) - included automatically
- Label (`label`) - included automatically
- Description (`description`)
- Created by (`createdBy`)
- Creation date (`created`)
- Last modified date (`modified`)
- Publishing Organizations (`publishers`)
- Themes (`themes`)

To request a different set of fields, specify them using `Query.setFields()` or
`Query.fields()`. To get the current set of fields, use `Query.getFields()`.

_Note:_ You must specify the property name to use. For example, to also request
the geographic extent for each item in the search results, do the following:

```javascript
let query = new GeoPlatform.Query();
let fields = query.getFields();
fields.push('extent'); //'extent' is the property to use in this case
query.setFields(fields);
```


## Request faceted information
Search results contain facet information specifying how certain values appear
within the entire repository of data.  By default, the following facets are
requested with each search:

- Types (`types`)
- Themes (`themes`)
- Publishers (`publishers`)
- Service Types (`serviceTypes`) - only applies to type "regp:Service" items
- Concept Schemes (`schemes`) - only applies to type "skos:Concept" items
- Visibility (`visibility`)
- Created By (`createdBy`)

To omit facet information, use `Query.setFacets(false)`.  To request a different
set of facets, do the following:

```javascript
let query = new GeoPlatform.Query();
let facets = query.getFacets();
facets.push('layerType'); //Layer.layerType facet info requested
query.setFacets(facets);
```

## Sorting results

The `Query.setSort()` and `Query.sort()` methods allows you to set both the property
and direction of sorting to use. To specifically set either, use the `Query.setSortField()`
and `Query.setSortOrder()` methods.

The list of supported default sort options can be retrieved using `Query.getSortOptions()`.

## Paging Results

Use `Query.setPage()` and `Query.setPageSize()` to modify the paging parameters issued
with queries.  Pages start at 0 and the default page size is 10.


## Clearing Query values

To reset a Query instance, use `Query.clear()`.
