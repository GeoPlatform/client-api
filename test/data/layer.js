
const API = require('../../dist/js/geoplatform.client');
const Types = API.ItemTypes;

module.exports = {
    "_modified": 1512096186725,
    "id": "8a6a6b50a28465a4484aa806aa52568c",
    "type": Types.LAYER,
    "uri": "http://www.geoplatform.gov/id/layer/62e0cf47b99c5fffc1a1d3db3b79c977",
    "label": "Seismic Water Bottom Anomalies",
    "title": "Seismic Water Bottom Anomalies",
    "description": "230,000 sq km of seismic data interpretation mapping over 32,000 seafloor seismic amplitude anomalies in the Gulf of Mexico using 3-D time-migrated seismic surveys. This mapping program means to understand the distribution of natural hydrocarbon seeps and the related benthic fauna, and to characterize other seafloor features related to the geological framework of the seafloor. These areas show anomalously high or low amplitude response over the background response. Four classes of water bottom anomalies interpreted to be caused by hydrocarbon seepage include High-Positive, Low-Positive/Negative, Pockmarks and Water-Column Gas Plumes. Six classes of water bottom anomalies that are non-seep related include Cretaceous, Cretaceous Talus, Fan, Salt, Slump, and Channels. \n\nPlease visit http://www.boem.gov/Seismic-Water-Bottom-Anomalies-Map-Gallery/ for more information on these anomaly types.",
    "statistics": {
        "timestamp": 1504864840095,
        "online": true,
        "compliant": true,
        "days_online": 2,
        "days_in_service": 12,
        "percent_uptime": 67,
        "percent_uptime_7": 41,
        "speed": 2.48,
        "score": 98.07,
        "average_speed": 1.34,
        "average_speed_7": 0.75,
        "reliability": 25,
        "trend_7": -74
    },
    "layerName": "24",
    "layerType": "RasterLayer",
    "supportedFormats": [
        "PNG24",
        "JPG",
        "PNG32",
        "PS",
        "BMP",
        "GIF",
        "SVG",
        "PNG",
        "SVGZ",
        "TIFF",
        "PDF",
        "DIB",
        "EMF"
    ],
    "legend": {
        "title": "Seismic Water Bottom Anomalies",
        "description": "Seismic Water Bottom Anomalies",
        "items": [
            {
                "label": "Cretaceous Anomalies",
                "description": "Cretaceous Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADlJREFUOI1jYaAyYKGdgfn//1Ns2kRGRhZ0AbINgzqIhl4eNXDUwFEDRw3EaSAlZSK06GNBF6AUAAAD3wnk+pgDRgAAAABJRU5ErkJggg==",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Cretaceous Anomalies"
                ]
            },
            {
                "label": "Cretaceous Talus Anomalies",
                "description": "Cretaceous Talus Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADtJREFUOI1jYaAyYKGZgSUP/v+n1LAeBUZGFnQBcg2DOYh2Xh41cNTAUQNHDcRpICVlIqzoY0EXoBQAAFthDP8/7+hVAAAAAElFTkSuQmCC",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Cretaceous Talus Anomalies"
                ]
            },
            {
                "label": "Fan Anomalies",
                "description": "Fan Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHBJREFUOI3dlFEKwDAIQzPwFL3/2bxG9xUobharLYPlS4Q+TSgKNkuOAVXRq7DWcIltZGFcKGRZFZ3DvJoKAcdHXu0C36au6AGc2UkBLdjCf5zhNiAVyW0pw0hu32eYsT39Nhnb5+4hULuJ3FRso6obCbZDQO30R7sAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Fan Anomalies"
                ]
            },
            {
                "label": "Salt Anomalies",
                "description": "Salt Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAL5JREFUOI3VlLENwjAURO+QSxqo0jIBbID8lUEYiDFSUmSCRNmAihUQQzhHAZYSRBAJBonXnf7X07nwd0iMAwBVlVLIaEaXQtSlJ6QZp0i6L/xuw58J1TQZ2nZJ709JhAghl5QD2KURjqAnVFVtaHaMua3r4jbQimQWM6V9d+9Vw3M3EDgAgMgtpXXMj3uDQppdetn78t58LmkxMyuHREMNP+YtIc0KAEUy4Rj+7KcM3sUQ4jxNwzE4YPodfMYVKmxEzgqLEyQAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Salt Anomalies"
                ]
            },
            {
                "label": "Slump Anomalies",
                "description": "Slump Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHZJREFUOI1jYaAyYKGZgSvyGf5TaljERAZGFnQBmOHY2Pj4MAdheJkcw5D1oxhIqWEYBpJrGHL44/UyKXysYUiuYQS9TK5hWL1MrktxGjg8wxCvl8kxjOisR6xhOL1MqWEYBpJrGM4wRC8T8fHR5WAWsKALUAoAwSrHv4kHE1gAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Slump Anomalies"
                ]
            },
            {
                "label": "Channel Anomalies",
                "description": "Channel Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADZJREFUOI1jYaAyYKGlgf+pYB4jugsZKTDsPwMDjb08auCogaMGjhqI00BKykRGdAMpKQvhAABd0QNSDPGCHwAAAABJRU5ErkJggg==",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Channel Anomalies"
                ]
            },
            {
                "label": "Seep-Related EK60 Gas Plume Anomalies",
                "description": "Seep-Related EK60 Gas Plume Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAG5JREFUOI3dlFEKACEIRA28nqedA7ZfQtgapsXCzpcIPZ0hZDosvgYE0KswEWlsG1mYLhSyDKDrMK9WhYDjI692gW9TdzQBV3ZSQAu28B9neAyoiuS2lWEkt+8zzNhefpuM7Xv3kKh2E3VTto2qHmXGZYkviYzXAAAAAElFTkSuQmCC",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related EK60 Gas Plume Anomalies"
                ]
            },
            {
                "label": "Seep-Related EM302 Gas Plume Anomalies",
                "description": "Seep-Related EM302 Gas Plume Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAENJREFUOI1jYaAyYGFgYGDYvHnzf2oY5uvry8hCDYOQAYqBvr6+jOQYguxD2rpw1MBRA0cNHB4GUqNcpI0LyS0HsQEAZtwMUYo9d9gAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related EM302 Gas Plume Anomalies"
                ]
            },
            {
                "label": "Seep-Related Confirmed Coral Anomalies",
                "description": "Seep-Related Confirmed Coral Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAENJREFUOI1jYaAyYGFgYGD4z3D0PzUMY2SwZmShhkHIAMVARgZrRnIMQfYhbV04auCogaMGDg8DqVEu0saF5JaD2AAA2rYJUaG8+c4AAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Confirmed Coral Anomalies"
                ]
            },
            {
                "label": "Seep-Related Confirmed Hydrate Anomalies",
                "description": "Seep-Related Confirmed Hydrate Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAENJREFUOI1jYaAyYGFgYGA4e/bsf2oYZmxszMhCDYOQAYqBxsbGjOQYguxD2rpw1MBRA0cNHB4GUqNcpI0LyS0HsQEAmqgMURvsLyoAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Confirmed Hydrate Anomalies"
                ]
            },
            {
                "label": "Seep-Related Confirmed Organism Anomalies",
                "description": "Seep-Related Confirmed Organism Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAENJREFUOI1jYaAyYGFgYGBYwcDwnxqGRTAwMLJQwyBkgGJgBAMDIzmGIPuQti4cNXDUwFEDh4eB1CgXaeNCcstBbAAAzWoGUYXpdBQAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Confirmed Organism Anomalies"
                ]
            },
            {
                "label": "Seep-Related Confirmed Carbonate Anomalies",
                "description": "Seep-Related Confirmed Carbonate Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAEFJREFUOI1jYaAyYGFgYGBgOPr/P1VMs2ZkZKGKQUgA1UBrRkayTEHyIY1dOGrgqIGjBg4PA6lQLtLIheSWg1gAANe2CVFr82P2AAAAAElFTkSuQmCC",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Confirmed Carbonate Anomalies"
                ]
            },
            {
                "label": "Seep-Related Confirmed Buried Carbonate Anomalies",
                "description": "Seep-Related Confirmed Buried Carbonate Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAEFJREFUOI1jYaAyYGFgYGBgaF3xnyqmVUcwslDFICSAamB1BCNZpiD5kMYuHDVw1MBRA4eHgVQoF2nkQnLLQSwAAHNwCVG6ibfmAAAAAElFTkSuQmCC",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Confirmed Buried Carbonate Anomalies"
                ]
            },
            {
                "label": "Seep-Related Mud Volcano Anomalies",
                "description": "Seep-Related Mud Volcano Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADtJREFUOI1jYaAyYKGZgb7PGP5TathmKQZGFnQBcg2DOYh2Xh41cNTAUQNHDcRpICVlIqzoY0EXoBQAAAtECh/OdEtnAAAAAElFTkSuQmCC",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Mud Volcano Anomalies"
                ]
            },
            {
                "label": "Seep-Related Confirmed Mud Volcano Anomalies",
                "description": "Seep-Related Confirmed Mud Volcano Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAENJREFUOI1jYaAyYGFgYGDwfcbwnxqGbZZiYGShhkHIAMXAzVIMjOQYguxD2rpw1MBRA0cNHB4GUqNcpI0LyS0HsQEAfWwJUS0pj/AAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Confirmed Mud Volcano Anomalies"
                ]
            },
            {
                "label": "Seep-Related Negative Anomalies",
                "description": "Seep-Related Negative Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADtJREFUOI1jYaAyYKGZgeYrGP5TatjJCAZGFnQBcg2DOYh2Xh41cNTAUQNHDcRpICVlIqzoY0EXoBQAAAxWCnOcdghKAAAAAElFTkSuQmCC",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Negative Anomalies"
                ]
            },
            {
                "label": "Seep-Related Negative Confirmed Oil Anomalies",
                "description": "Seep-Related Negative Confirmed Oil Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAENJREFUOI1jYaAyYGFgYGAwX8HwnxqGnYxgYGShhkHIAMXAkxEMjOQYguxD2rpw1MBRA0cNHB4GUqNcpI0LyS0HsQEARaQJUdrtZBoAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Negative Confirmed Oil Anomalies"
                ]
            },
            {
                "label": "Seep-Related Negative Possible Oil Anomalies",
                "description": "Seep-Related Negative Possible Oil Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAH1JREFUOI21k9ENgDAIRDFhp67iiF3FqepXjRGhd6D8tYHXoxwqH4f+BmxdRhV27LLp8yIqaF2GlzMFKVowH1zlGIVVqBlKFfo65QrUtU0WGvqQgULADBTaFAQKK2Sh1C7TxkYUUMZG26KMXYWmN8XLM38Ynb24Qy8g4jEkTr14c/l1iX9QAAAAAElFTkSuQmCC",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Negative Possible Oil Anomalies"
                ]
            },
            {
                "label": "Seep-Related Positive Anomalies",
                "description": "Seep-Related Positive Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADpJREFUOI1jYaAyYKGZgf8ZGP5TahgjAwMjC7oAuYbBHEQ7L48aOGrgqIGjBuI0kJIyEVb0saALUAoAtHoGU/jZDVYAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Positive Anomalies"
                ]
            },
            {
                "label": "Seep-Related Positive Confirmed Oil Anomalies",
                "description": "Seep-Related Positive Confirmed Oil Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAEBJREFUOI3t1DEKADAMQtEv5P5XTtcUOgWzlHiAhy4G5gRAQjowgcIB1VygQB2kLpxtuOCCC/4BOn5xpmH3B185Bz8GUZJ4V1sAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Positive Confirmed Oil Anomalies"
                ]
            },
            {
                "label": "Seep-Related Positive Possible Oil Anomalies",
                "description": "Seep-Related Positive Possible Oil Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHZJREFUOI21k1EOgDAIQ7uE+18Zv2aMCLag/G2BtzKK4eOw34AO+BS2gGX3i6rAAc9ytiBjC/aDbzlB4RQahjKFPk55Ak1t04WWPlSgFLADpTaFgdIKVai0y7KxGQWSsdm2JGNPoe1NyfLCH1bnLK7QE8h4jIkD/LQ+ea5/ZmIAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Positive Possible Oil Anomalies"
                ]
            },
            {
                "label": "Seep-Related Flow Anomalies",
                "description": "Seep-Related Flow Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAG1JREFUOI3dlFEKACEIRA28b2fpxO6PRdgapkXQfInQ0xlChM3Cc8BMFKaVlFA23DBeyGY5E7VhWs2yAftHWq0Cf6auaARO7PiAEizhD2e4DVhlyW0pQ0tu9zN02J5/G4ftg/cQIHYTeVOUjag+ZzRKOq2XPeYAAAAASUVORK5CYII=",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Flow Anomalies"
                ]
            },
            {
                "label": "Seep-Related Pockmark Anomalies",
                "description": "Seep-Related Pockmark Anomalies",
                "url": "https://gis.boem.gov/arcgis/rest/services/BOEM_BSEE/MMC_Layers/MapServer/legend?f=json",
                "contentData": "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAADtJREFUOI1jYaAyYKGZgSsZnv2n1LBwBilGFnQBcg2DOYh2Xh41cNTAUQNHDcRpICVlIqzoY0EXoBQAAAa6CcMfEBblAAAAAElFTkSuQmCC",
                "mediaType": "image/png",
                "width": 20,
                "height": 20,
                "values": [
                    "Seep-Related Pockmark Anomalies"
                ]
            }
        ]
    },
    "created": 1503459983648,
    "modified": 1504871234295,
    "createdBy": "jimbob",
    "keywords": [
        "oceans",
        "Boundaries"
    ],
    "themes": [
        {
            "_modified": 1521332084370,
            "id": "2eb2ba8d5bada949ce52a404b36d9f70",
            "uri": "http://www.geoplatform.gov/metadata-codelists/iso-19115-topics/oceans",
            "type": "skos:Concept",
            "label": "oceans",
            "prefLabel": "oceans",
            "description": "features and characteristics of salt water bodies (excluding inland waters). Examples: tides, tidal waves, coastal information, reefs",
            "created": 1489119417314,
            "modified": 1521332073319,
            "resourceTypes": [
                "Theme"
            ],
            "scheme": {
                "id": "cd430b38231819b3ba676336ac53c2fb",
                "uri": "http://www.geoplatform.gov/metadata-codelists/iso-19115-topics",
                "type": "skos:ConceptScheme",
                "label": "ISO themes Scheme",
                "title": "ISO themes Scheme",
                "description": "ISO Themes Scheme",
                "_modified": 1521332084329,
                "created": 1489119417124,
                "modified": 1521332073165
            }
        },
        {
            "_modified": 1521332086293,
            "id": "0e4d76bc3eb36b8a2816c59055cb19c8",
            "uri": "http://www.geoplatform.gov/metadata-codelists/iso-19115-topics/Boundaries",
            "type": "skos:Concept",
            "label": "Boundaries",
            "prefLabel": "Boundaries",
            "description": "Legal land descriptions. Examples: political and administrative boundaries",
            "created": 1489119417169,
            "modified": 1521332073198,
            "resourceTypes": [
                "Theme"
            ],
            "scheme": {
                "id": "cd430b38231819b3ba676336ac53c2fb",
                "uri": "http://www.geoplatform.gov/metadata-codelists/iso-19115-topics",
                "type": "skos:ConceptScheme",
                "label": "ISO themes Scheme",
                "title": "ISO themes Scheme",
                "description": "ISO Themes Scheme",
                "_modified": 1521332084329,
                "created": 1489119417124,
                "modified": 1521332073165
            }
        }
    ],
    "publishers": [
        {
            "_modified": 1514514221756,
            "id": "31b889ae006b69d9d7ce3a49ad8e26d2",
            "uri": "http://www.geoplatform.gov/id/organization/11563d3d9c72318805a7c31454af54c4",
            "type": "org:Organization",
            "label": "MarineCadastre.gov",
            "name": "MarineCadastre.gov",
            "created": 1503459981125,
            "modified": 1503459981125,
            "resourceTypes": [
                "foaf:Agent",
                "org:Organization"
            ]
        }
    ],
    "services": [
        {
            "_score": 1,
            "_modified": "2018-04-03T12:01:43.374+0000",
            "id": "c86411432b6dead001549b1157136c5d",
            "type": "regp:Service",
            "uri": "http://www.geoplatform.gov/id/service/10eb4c74f490792898107a280f40d843",
            "label": "Intermodal Terminal Facilities",
            "title": "Intermodal Terminal Facilities",
            "description": "serviceDescription: The Intermodal Transit Facilities (IPCD) dataset is as of June 8, 2017, and is part of the U.S. Department of Transportation (USDOT)/Bureau of Transportation Statistics's (BTS's) National Transportation Atlas Database (NTAD). The IPCD data covers the following types of passenger transportation terminals: •Scheduled Airline Service Airports.•Intercity bus stations (includes stations served by regular scheduled intercity bus service such as Greyhound and Trailways, code sharing buses such as \"Amtrak Thruway\" feeder buses, supplemental buses that provide additional frequencies along rail routes, and airport bus services from locations that are outside of the airport Metropolitan Area.•Intercity and transit ferry terminals.•Light rail transit stations.•Heavy rail transit stations.•Passenger rail stations on the national rail network serving both commuter rail and intercity rail services.\n",
            "statistics": {
                "timestamp": "2018-04-03T12:00:45.020+0000",
                "online": false,
                "compliant": true,
                "days_online": 0,
                "days_in_service": 0,
                "percent_uptime": 0,
                "percent_uptime_7": 0,
                "speed": -99.99,
                "score": -99.99,
                "average_speed": 0,
                "average_speed_7": 0,
                "reliability": 0,
                "trend_7": 0
            },
            "created": "2017-12-01T05:44:39.521+0000",
            "modified": "2017-12-01T05:44:42.463+0000",
            "createdBy": "jimbob",
            "keywords": [
                "Bus",
                "Atlas",
                "Intermodal",
                "Railroad",
                "Aviation",
                "Transportation",
                "United",
                "IPCD",
                "Transit",
                "NTAD",
                "Station",
                "Ferry",
                "States",
                "Rail",
                "National",
                "Airport",
                "Connectivity",
                "Passenger",
                "Facility",
                "US"
            ],
            "identifiers": [
                "agol:a316a953272a4faf8ae74b426c88d543",
                "ngp:c162a61e-9326-467a-8584-8e0098709968"
            ],
            "publishers": [
                {
                    "_modified": "2017-12-29T02:24:34.081+0000",
                    "id": "4f932ba026a2a7f9973fd8ec21bdf520",
                    "uri": "http://www.geoplatform.gov/id/organization/bbedcdcb4f97823766678c7e889fc72e",
                    "type": "org:Organization",
                    "label": "Credit the Assistant Secretary for Research and Technology/Bureau of Transportation Statistics (BTS) National Transportation Atlas Database (NTAD).",
                    "name": "Credit the Assistant Secretary for Research and Technology/Bureau of Transportation Statistics (BTS) National Transportation Atlas Database (NTAD).",
                    "created": "2017-12-01T05:44:39.551+0000",
                    "modified": "2017-12-01T05:44:39.551+0000",
                    "resourceTypes": [
                        "foaf:Agent",
                        "org:Organization"
                    ]
                }
            ],
            "contacts": [
                {
                    "_modified": "2017-12-29T02:24:34.065+0000",
                    "id": "90f98da360a8511d119d738cfb8be40f",
                    "uri": "http://www.geoplatform.gov/id/vcard/90f98da360a8511d119d738cfb8be40f",
                    "type": "vcard:VCard",
                    "label": "jrayer_geoplatform",
                    "created": "2017-12-01T05:44:39.521+0000",
                    "modified": "2017-12-01T05:44:39.521+0000",
                    "fullName": "jrayer_geoplatform"
                }
            ],
            "extent": {
                "minx": -176.64603000041927,
                "maxx": -66.9850400002959,
                "miny": 19.842804411700747,
                "maxy": 71.40197327937746
            },
            "href": "https://maps.bts.dot.gov/services/rest/services/NTAD/Intermodal_Transit_Facilities_IPCD/MapServer/",
            "serviceType": {
                "id": "48980c5bad0c8d4666b393874eb5279a",
                "uri": "http://www.geoplatform.gov/spec/esri-feature-rest",
                "type": "dct:Standard",
                "title": "Esri REST Feature Service",
                "description": "Esri ArcGIS Feature Server REST API",
                "label": "Esri REST Feature Service",
                "resourceType": [
                    "ServiceType"
                ],
                "_created": "2017-03-10T04:16:56.875+0000",
                "modified": "2018-03-18T00:14:32.975+0000",
                "_modified": "2018-03-18T00:14:46.001+0000"
            }
        }
    ],
    "extent": {
        "minx": -96.78317222639511,
        "maxx": -81.74993804094804,
        "miny": 24.00035477415717,
        "maxy": 29.292356810584753
    },
    "minScale": 0,
    "maxScale": 0
}
