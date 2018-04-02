

import ItemModel from './item';
import ItemTypes from '../shared/types';
import ItemProperties from './properties';


const ADDRESS_STREET  = 'street';
const ADDRESS_CITY    = 'city';
const ADDRESS_STATE   = 'state';
const ADDRESS_ZIP     = 'zip';
const ADDRESS_COUNTRY = 'country';


class ContactModel extends ItemModel {

    constructor(data) {
        super(data);
        this.set(ItemProperties.TYPE, ItemTypes.CONTACT);
    }

    //-----------------------------------------------------------

    fullName(value) { this.setFullName(value); return this; }
    getFullName() { return this.get(ItemProperties.FULL_NAME); }
    setFullName(value) { this.set(ItemProperties.FULL_NAME, value); }

    //-----------------------------------------------------------

    orgName(value) { this.setOrgName(value); return this; }
    getOrgName() { return this.get(ItemProperties.ORGANIZATION_NAME); }
    setOrgName(value) { this.set(ItemProperties.ORGANIZATION_NAME, value); }

    //-----------------------------------------------------------

    position(value) { this.setPosition(value); return this; }
    getPosition() { return this.get(ItemProperties.POSITION_TITLE); }
    setPosition(value) { this.set(ItemProperties.POSITION_TITLE, value); }

    //-----------------------------------------------------------

    email(value) { this.setEmail(value); return this; }
    getEmail() { return this.get(ItemProperties.EMAIL); }
    setEmail(value) { this.set(ItemProperties.EMAIL, value); }

    //-----------------------------------------------------------

    phone(value) { this.setPhone(value); return this; }
    getPhone() { return this.get(ItemProperties.TELEPHONE); }
    setPhone(value) { this.set(ItemProperties.TELEPHONE, value); }

    //-----------------------------------------------------------

    address(value) { this.setAddress(value); return this; }
    getAddress() { return this.get(ItemProperties.ADDRESS); }
    setAddress(value) { this.set(ItemProperties.ADDRESS, value); }

    //-----------------------------------------------------------

    street(value) { this.setStreet(value); return this; }
    getStreet() {
        let address = this.getAddress();
        return address ? address[ADDRESS_STREET] : null;
    }
    setStreet(value) {
        let address = this.getAddress() || {};
        address[ADDRESS_STREET] = value;
        this.setAddress(address);
    }

    //-----------------------------------------------------------

    city(value) { this.setCity(value); return this; }
    getCity() {
        let address = this.getAddress();
        return address ? address[ADDRESS_CITY] : null;
    }
    setCity(value) {
        let address = this.getAddress() || {};
        address[ADDRESS_CITY] = value;
        this.setAddress(address);
    }

    //-----------------------------------------------------------

    state(value) { this.setState(value); return this; }
    getState() {
        let address = this.getAddress();
        return address ? address[ADDRESS_STATE] : null;
    }
    setState(value) {
        let address = this.getAddress() || {};
        address[ADDRESS_STATE] = value;
        this.setAddress(address);
    }

    //-----------------------------------------------------------

    zipCode(value) { this.setZipCode(value); return this; }
    getZipCode() {
        let address = this.getAddress();
        return address ? address[ADDRESS_ZIP] : null;
    }
    setZipCode(value) {
        let address = this.getAddress() || {};
        address[ADDRESS_ZIP] = value;
        this.setAddress(address);
    }

    //-----------------------------------------------------------

    country(value) { this.setCountry(value); return this; }
    getCountry() {
        let address = this.getAddress();
        return address ? address[ADDRESS_COUNTRY] : null;
    }
    setCountry(value) {
        let address = this.getAddress() || {};
        address[ADDRESS_COUNTRY] = value;
        this.setAddress(address);
    }

    //-----------------------------------------------------------

}

export default ContactModel;
