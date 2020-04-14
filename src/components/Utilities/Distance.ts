// export default function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
//     let R = 6371; // km (change this constant to get miles)
//     let dLat = (lat2 - lat1) * Math.PI / 180;
//     let dLon = (lon2 - lon1) * Math.PI / 180;
//     let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     let c = 2 * Math.asin(Math.sqrt(a));
//     let d = R * c;
//     if (d > 1) return Math.round(d) + " km";
//     else if (d <= 1) return Math.round(d * 1000) + " m";
//     return d;
// }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export default function distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        let radlat1: number = Math.PI * lat1 / 180;
        let radlat2: number = Math.PI * lat2 / 180;
        let theta: number = lon1 - lon2;
        let radtheta: number = Math.PI * theta / 180;
        let dist: number = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") {
            dist = dist * 1.609344
        }
        if (unit === "N") {
            dist = dist * 0.8684
        }

        let strNum: string = dist.toFixed(2);
        let strDistance: string = '';
        switch (unit) {
            case "K":
                strDistance = `${strNum} km`;
                break;
            case "N":
                strDistance = `${strNum} nautical miles`;
                break;
            default:
                strDistance = `${strNum} miles`;
        }
        return strDistance;
    }
}