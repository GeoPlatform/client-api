


import BaseModel from './base';
import { ItemProperties, PropertiesFor } from './properties';



function parseDateLong(date) {
    let result = null;
    if(date) {
        if(typeof(date) === 'number') {
            //formatted as milliseconds (hopefully)
            result = date;

        } else if(typeof(date.getTime) !== 'undefined') {
            //date obj
            result = date.getTime();
        }
    }
    return result;
}

function isNullUnDef(arg) {
    return arg === null || isUnDef(arg);
}
function isUnDef(arg) {
    return typeof(arg) === 'undefined';
}



/**
 * Item
 * base class for GeoPlatform objects
 */
class ItemModel extends BaseModel {

    constructor(data) {
        super();

        if(data) {

            // console.log(' ');
            // console.log('-------------------------------');
            // console.log('Item() - initializing using ' + JSON.stringify(data));

            for(let p in ItemProperties) {
                let property = ItemProperties[p];
                let key = property.key;
                let value = data[key];
                if(value !== null && value !== undefined) {
                    this.set(property, value);
                }
            }
            // console.log('-------------------------------');
            // console.log(' ');
        }

        this.default(ItemProperties.KEYWORDS, []);
        this.default(ItemProperties.IDENTIFIERS, []);
        this.default(ItemProperties.ALTERNATE_TITLES, []);
        this.default(ItemProperties.THEMES, []);
        this.default(ItemProperties.CONTACTS, []);
        this.default(ItemProperties.PUBLISHERS, []);
        this.default(ItemProperties.CONTRIBUTORS, []);
        this.default(ItemProperties.RESOURCE_TYPES, []);
        this.default(ItemProperties.USED_BY, []);
        this.default(ItemProperties.ACCESS_RIGHTS, []);
        this.default(ItemProperties.RELATED_RESOURCES, []);
    }

    getId() { return this.get(ItemProperties.ID); }
    getType() { return this.get(ItemProperties.TYPE); }
    getCreated() { return this.get(ItemProperties.CREATED); }
    getModified() { return this.get(ItemProperties.MODIFIED); }
    getLastModifiedBy() { return this.get(ItemProperties.LAST_MODIFIED_BY); }

    //-----------------------------------------------------------

    uri(value) {  this.setUri(value);  return this; }
    getUri() { return this.get(ItemProperties.URI); }
    setUri(value) { this.set(ItemProperties.URI, value); }

    //-----------------------------------------------------------

    identifiers(value) { this.setIdentifiers(value); return this; }
    getIdentifiers() { return this.get(ItemProperties.IDENTIFIERS); }
    setIdentifiers(value) { this.set(ItemProperties.IDENTIFIERS, value); }
    addIdentifier(value) { this.addTo(ItemProperties.IDENTIFIERS, value); }
    removeIdentifier(value) { this.removeFrom(ItemProperties.IDENTIFIERS, value); }

    //-----------------------------------------------------------

    alternateTitles(value) { this.setAlternateTitles(value); return this; }
    getAlternateTitles() { return this.get(ItemProperties.ALTERNATE_TITLES); }
    setAlternateTitles(value) { this.set(ItemProperties.ALTERNATE_TITLES, value); }
    addAlternateTitle(value) { this.addTo(ItemProperties.ALTERNATE_TITLES, value); }
    removeAlternateTitle(value) { this.removeFrom(ItemProperties.ALTERNATE_TITLES, value); }

    //-----------------------------------------------------------

    createdBy(value) { this.setCreatedBy(value); return this; }
    getCreatedBy() { return this.get(ItemProperties.CREATED_BY); }
    setCreatedBy(value) { this.set(ItemProperties.CREATED_BY, value); }

    //-----------------------------------------------------------

    label(value) { this.setLabel(value); return this; }
    getLabel() { return this.get(ItemProperties.LABEL); }
    setLabel(value) { this.set(ItemProperties.LABEL, value); }

    //-----------------------------------------------------------

    description(value) { this.setDescription(value); return this; }
    getDescription() { return this.get(ItemProperties.DESCRIPTION); }
    setDescription(value) { this.set(ItemProperties.DESCRIPTION, value); }

    //-----------------------------------------------------------

    keywords(value) { this.setKeywords(value); return this; }
    getKeywords() { return this.get(ItemProperties.KEYWORDS); }
    setKeywords(value) { this.set(ItemProperties.KEYWORDS, value); }

    //-----------------------------------------------------------

    landingPage(value) { this.setLandingPage(value); return this; }
    getLandingPage() { return this.get(ItemProperties.LANDING_PAGE); }
    setLandingPage(value) { this.set(ItemProperties.LANDING_PAGE, value); }

    //-----------------------------------------------------------

    status(value) { this.setStatus(value); return this; }
    getStatus() { return this.get(ItemProperties.STATUS); }
    setStatus(value) { this.set(ItemProperties.STATUS, value); }

    //-----------------------------------------------------------

    visibility(value) { this.setVisibility(value); return this; }
    getVisibility() { return this.get(ItemProperties.VISIBILITY); }
    setVisibility(value) { this.set(ItemProperties.VISIBILITY, value===true); }

    //-----------------------------------------------------------

    purpose(value) { this.setPurpose(value); return this; }
    getPurpose() { return this.get(ItemProperties.PURPOSE); }
    setPurpose(value) { this.set(ItemProperties.PURPOSE, value===true); }

    //-----------------------------------------------------------

    themes(value) { this.setThemes(value); return this; }
    getThemes() { return this.get(ItemProperties.THEMES); }
    setThemes(value) { this.set(ItemProperties.THEMES, value); }
    addTheme(value) { this.addTo(ItemProperties.THEMES, value); }
    removeTheme(value) { this.removeFrom(ItemProperties.THEMES, value); }

    //-----------------------------------------------------------

    publishers(value) { this.setPublishers(value); return this; }
    getPublishers() { return this.get(ItemProperties.PUBLISHERS); }
    setPublishers(value) { this.set(ItemProperties.PUBLISHERS, value); }
    addPublisher(value) { this.addTo(ItemProperties.PUBLISHERS, value); }
    removePublisher(value) { this.removeFrom(ItemProperties.PUBLISHERS, value); }

    //-----------------------------------------------------------

    contacts(value) { this.setContacts(value); return this; }
    getContacts() { return this.get(ItemProperties.CONTACTS); }
    setContacts(value) { this.set(ItemProperties.CONTACTS, value); }
    addContact(value) { this.addTo(ItemProperties.CONTACTS, value); }
    removeContact(value) { this.removeFrom(ItemProperties.CONTACTS, value); }

    //-----------------------------------------------------------

    contributors(value) { this.setContributors(value); return this; }
    getContributors() { return this.get(ItemProperties.CONTRIBUTORS); }
    setContributors(value) { this.set(ItemProperties.CONTRIBUTORS, value); }
    addContributor(value) { this.addTo(ItemProperties.CONTRIBUTORS, value); }
    removeContributor(value) { this.removeFrom(ItemProperties.CONTRIBUTORS, value); }

    //-----------------------------------------------------------

    resourceTypes(value) { this.setResourceTypes(value); return this; }
    getResourceTypes() { return this.get(ItemProperties.RESOURCE_TYPES); }
    setResourceTypes(value) { this.set(ItemProperties.RESOURCE_TYPES, value); }
    addResourceType(value) { this.addTo(ItemProperties.RESOURCE_TYPES, value); }
    removeResourceType(value) { this.removeFrom(ItemProperties.RESOURCE_TYPES, value); }

    //-----------------------------------------------------------

    distributions(value) { this.setDistributions(value); return this; }
    getDistributions() { return this.get(ItemProperties.DISTRIBUTIONS); }
    setDistributions(value) { this.set(ItemProperties.DISTRIBUTIONS, value); }
    addDistribution(value) { this.addTo(ItemProperties.DISTRIBUTIONS, value); }
    removeDistribution(value) { this.removeFrom(ItemProperties.DISTRIBUTIONS, value); }

    //-----------------------------------------------------------

    classifiers(value) { this.setClassifiers(value); return this; }
    getClassifiers() { return this.get(ItemProperties.CLASSIFIERS); }
    setClassifiers(value) {
        if(!value || typeof(value) !== 'object') {
            this.set(ItemProperties.CLASSIFIERS, {});
        } else {
            this.set(ItemProperties.CLASSIFIERS, value);
        }
    }

    //-----------------------------------------------------------

    usedBy(value) { this.setUsedBy(value); return this; }
    getUsedBy() { return this.get(ItemProperties.USED_BY); }
    setUsedBy(value) { this.set(ItemProperties.USED_BY, value); }
    addUsedBy(value) { this.addTo(ItemProperties.USED_BY, value); }
    removeUsedBy(value) { this.removeFrom(ItemProperties.USED_BY, value); }

    //-----------------------------------------------------------

    accessRights(value) { this.setAccessRights(value); return this; }
    getAccessRights() { return this.get(ItemProperties.ACCESS_RIGHTS); }
    setAccessRights(value) { this.set(ItemProperties.ACCESS_RIGHTS, value); }
    addAccessRight(value) { this.addTo(ItemProperties.ACCESS_RIGHTS, value); }
    removeAccessRight(value) { this.removeFrom(ItemProperties.ACCESS_RIGHTS, value); }

    //-----------------------------------------------------------

    related(value) { this.setRelatedResources(value); return this; }
    getRelatedResources() { return this.get(ItemProperties.RELATED_RESOURCES); }
    setRelatedResources(value) { this.set(ItemProperties.RELATED_RESOURCES, value); }
    addRelatedResource(value) { this.addTo(ItemProperties.RELATED_RESOURCES, value); }
    removeRelatedResource(value) { this.removeFrom(ItemProperties.RELATED_RESOURCES, value); }

    //-----------------------------------------------------------

    extent(value) { this.setExtent(value); return this; }
    getExtent() { return this.get(ItemProperties.GEOGRAPHIC_EXTENT); }
    setExtent(value) {
        if(typeof(value) === 'string') {
            //bbox string (minx, miny, maxx, maxy)
            let str = value.split(',');
            value = {
                minx: str[0].trim()*1,
                miny: str[1].trim()*1,
                maxx: str[2].trim()*1,
                maxy: str[3].trim()*1
            };
        } else if(value && value.length && value[0].length) {
            //nested arrays (geojson)
            value = {
                minx: value[0][1]*1, miny: value[0][0]*1,
                maxx: value[1][1]*1, maxy: value[1][0]*1
            };
        } else if(value &&
            !isNullUnDef(value.minx) && !isNullUnDef(value.miny) &&
            !isNullUnDef(value.maxx) && !isNullUnDef(value.maxy)) {
            //already in correct format

        } else {
            console.log("ItemModel.setExtent() - invalid argument");
            return;
        }
        this.set(ItemProperties.GEOGRAPHIC_EXTENT, value);
    }
    intersects(arg) {
        if(isNullUnDef(arg)) return false;
        let extent = this.getExtent();
        if(isNullUnDef(extent) ||
            isNullUnDef(extent.minx) || isNullUnDef(extent.miny) ||
            isNullUnDef(extent.maxx) || isNullUnDef(extent.maxy))
            return false;

        if( !isNullUnDef(arg.minx) || !isNullUnDef(arg.miny) ||
            !isNullUnDef(arg.maxx) || !isNullUnDef(arg.maxy)) {
            //default format (object)
            return !(arg.minx > extent.maxx || arg.miny > extent.maxy ||
                     arg.maxx < extent.minx || arg.maxy < extent.miny);

        } else if(!isUnDef(arg.push) && arg.length >= 2 &&
            arg[0] && !isUnDef(arg[0].push) && arg[0].length >= 2) {
            //nested arrays (geojson)
            return !(arg[0][1] > extent.maxx || arg[0][0] > extent.maxy ||
                     arg[1][1] < extent.minx || arg[1][0] < extent.miny);
        }
        return false;
    }

    //-----------------------------------------------------------

    temporal(value) { this.setTemporalExtent(value); return this; }
    getTemporalExtent() { return this.get(ItemProperties.TEMPORAL_EXTENT); }
    setTemporalExtent(value) {
        let val = { startDate: null, endDate: null };
        if(value && typeof(value) === 'object') {
            val.startDate = parseDateLong(value.startDate);
            val.endDate = parseDateLong(value.endDate);
        } else {
            console.log("ItemModel.setTemporalExtent() - invalid argument");
            return;
        }
        this.set(ItemProperties.TEMPORAL_EXTENT, val);
    }
    isAfter(date) {
        if(!date || isUnDef(date.getTime)) return false;
        let temporal = this.getTemporalExtent();
        if(isNullUnDef(temporal) || isNullUnDef(temporal.startDate)) return false;
        return temporal.startDate < date.getTime();
    }
    isBefore(date) {
        if(!date || isUnDef(date.getTime)) return false;
        let temporal = this.getTemporalExtent();
        if(isNullUnDef(temporal) || isNullUnDef(temporal.endDate)) return false;
        return temporal.endDate > date.getTime();
    }


    //-----------------------------------------------------------


    // statistics(value) { this.setStatistics(value); return this; }
    getStatistics() { return this.get(ItemProperties.STATISTICS); }
    // setStatistics(value) { this.set(ItemProperties.STATISTICS, value); }


    //-----------------------------------------------------------


    /**
     * @return {boolean} true if the required fields are provided
     */
    isValid() {
        return this.getType() && this.getLabel();
    }

    //-----------------------------------------------------------


    toJson() {
        let result = {};
        let props = PropertiesFor(this.getType()) || [];
        for(let i=0; i<props.length; ++i) {
            let property = props[i];
            let value = this.get(property);
            this.propertyToJson(property, value, result);
        }
        return result;
    }

}

export default ItemModel;
