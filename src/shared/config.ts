
var Config : { [key:string] : any } = {

    ualUrl: 'https://ual.geoplatform.gov',
    //appId: '...',

    configure: function(options : any) {
        Object.assign(this, options);
    }
};

export default Config;
