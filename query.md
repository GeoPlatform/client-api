# Queries

The `ItemService.search()` method accepts both generic JS objects, containing
parameter name and value combinations, and `Query` objects. The `Query` class
provides methods for quickly building search criteria based upon the GeoPlatform object model.

## Creating a Query
You can instantiate `Query` directly or use `QueryFactory` to get a new `Query` instance.

```javascript
//using ES6 imports
import { Query, QueryFactory } from 'geoplatform.client';

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
let queryA = new Query();
queryA.setTypes( 'Layer' );
queryA.setEndDate( new Date().getTime() );

let queryB = new Query()
    .types( 'Layer' )
    .ends( new Date().getTime() );
```


## Query Parameters
You can get a list of the predefined query parameters supported by the
`Query` object using the `QueryParameters` object:

```javascript
import { Query, QueryParameters } from 'geoplatform.client';
let query = new Query();
query.setParameter(QueryParameters.TYPES, "Layer");
```

## Free text search

The `setQ()`, `getQ()`, `q()` methods allow setting/getting the "q" parameter which
maps to free text search in the GeoPlatform API.  This is equivalent to searching
labels, descriptions, keywords, and any other textual field that supports being searched
via free text.

Values with spaces are treated as multiple, OR'ed constraints. To search for a specific
phrase, wrap the value with double quotes.

```javascript
let query = new Query().q('"This is a phrase"');
```

## Date Parameters
Date values should be passed to `Query` methods as their millisecond representation.

```javascript
let queryB = new Query().ends( new Date().getTime() );
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
import { Query, QueryFields } from 'geoplatform.client';
let query = new Query();
//add a desired field to the default set requested
query.addField(QueryFields.EXTENT);
let fields = query.getFields();
```


## Request faceted information
Search results contain facet information specifying how certain values appear
within the entire repository of data.  Use the `QueryFacets` object's set of
facets to request specific ones with a query.

```javascript
import { Query, QueryFacets } from 'geoplatform.client';
//only request these 2 facets
query.facets([QueryFacets.TYPES, QueryFacets.THEMES]);
//add another facet to the list
query.addFacet(QueryFacets.PUBLISHERS);
let facets = query.getFacets();
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

To reset a Query instance, use `Query.clear()`.  Resetting a query will clear out
constraints applied using the query's interface.

## Default Queries

Initial constraints can be passed into the `Query` constructor.  

```javascript
let query = new Query({
    QueryParameters.Q : 'testing',
    QueryParameters.TYPES : 'Layer'
})
```

In addition, the default set of constraints can be predefined using the
`defaults` property of the constructor argument. The following example specifies
the same initial constraints plus also defining a third constraint using GP authorship
which will always be applied unless overridden using `Query.setCreatedBy()`.  

```javascript
let query = new Query({
    QueryParameters.Q : 'testing',
    QueryParameters.TYPES : 'Layer',
    defaults: {
        QueryParameters.CREATED_BY : "joe_user"
    }
})
```

__Note:__ Default constraints will remain applied when queries are reset using
`Query.clear()`.


## KG Queries

When using a [KGService](src/services/kg.js), you should use an instance of
[KGQuery](src/shared/kg-query.js).  `KGQuery` provides a shorter list of parameter
methods as listed below:

- q / setQ / getQ - same as the equivalent `Query` methods
- classifiers / setClassifiers  / getClassifiers - specifies the type of concepts to search
- types / setTypes / getTypes - specifies the Item type(s) to constrain concepts by
