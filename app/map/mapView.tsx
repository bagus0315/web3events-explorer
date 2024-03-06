"use client"
import React, { useEffect, useState } from 'react';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import data from './data.json';
// import cluster from 'cluster';
// import { Web3eventMapGeodata } from '../components/web3eventMapType';

const  MapView = () => {
    const [ pageIsMounted, setPageIsMounted ] = useState(false);
    mapboxgl.accessToken = "pk.eyJ1IjoidXJ0cmFkZSIsImEiOiJjbHJobHc5aDMwMGpyMmxzMWFoeWd2dzAxIn0.T4vKAOyvnvIrT2bkN-Uisw";
    
    useEffect(() => {

        setPageIsMounted(true);
        const map = new mapboxgl.Map({
            container: 'web3eventMap',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [-103.5917, 40.6699],
            zoom: 1,
            attributionControl: false,
        });
    
        map.addControl(
            new mapboxgl.NavigationControl({showCompass:false})
        );
        
        map.on("load", function () {
            addDataLayer(map);
        })
        // initializeMap(map);
        // setMap(map);
        return () => {
            map.remove();
        }
    },[]);
    
    // useEffect(() => {
    //     if (pageIsMounted && Map) {
    //         Map.on('load', () => {
    //             addDataLayer(Map, data);
    //         })
    //     }
    // },[pageIsMounted, setMap, Map]);
    
    return (
        <div className="px-6 pt-16 mx-auto max-w-[100rem] lg:px-8 md:pt-20 lg:pt-24 h-screen">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        Commune AI 
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        This is description about web3events for peopel who love blockchain.
                    </p>
                </div>
                <div className="w-full h-px mt-4 bg-zinc-800" />
            <div id="web3eventMap" className="w-full h-[75vh]">
            </div>
        </div>
    )

}

export default MapView;

const addDataLayer = (map: mapboxgl.Map) => {
    map.addSource('web3events', {
        'type': 'geojson',//geojson,video,image,canvas
        'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson', // data 
        'cluster': true,
        'clusterRadius': 50
    });
    map.addLayer({
        'id': 'clusters',
        'type': 'circle',
        'source': 'web3events',
        'filter': ['has', 'point_count'],
        'paint': {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        'id': 'cluster-count',
        'type': 'symbol',
        'source': 'web3events',
        'filter': ['has', 'point_count'],
        'layout': {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12           
        }
    });

    map.addLayer({
        'id': 'unclustered-point',
        'type': 'circle',
        'source': 'web3events',
        'filter': ['!', ['has', 'point_count']],
        'paint': {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'            
        }
    });
};

// const initializeMap = ( map: mapboxgl.Map ) => {
//     map.on('click','clusters', (e) => {
//         const features = map.queryRenderedFeatures(e.point, {
//             layers: ['clusters']
//         });
//         const clusterId = features[0]?.properties?.cluster_id;
//         const source = map.getSource('web3events');
//         if (source && source.type == "geojson") {
//             const geoJSONSource = source as GeoJSONSource;
//             geoJSONSource.getClusterExpansionZoom(
//                 clusterId,
//                 ( error:Error, zoom:number ) => {
//                     if (error) return;
    
//                     map.easeTo({
//                         center: features[0]?.geometry?.coordinates,
//                         zoom:zoom
//                     });
//                 }
//             );
//         }
//     });

//     map.on('click', 'unclustered-point', (e) => {
//         const coordinates = e.features[0].geometry.coordinates.slice();
//         const mag = e.features[0].properties.mag;
//         const tsunami =
//             e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(
//                 `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
//             )
//             .addTo(map);
//     });

//     map.on('mouseenter', 'clusters', () => {
//         map.getCanvas().style.cursor = 'pointer';
//     });
//     map.on('mouseleave', 'clusters', () => {
//         map.getCanvas().style.cursor = '';
//     });  
// }

