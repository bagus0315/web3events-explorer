"use client"
import React, { useEffect, useState } from 'react';
import mapboxgl, { GeoJSONSource, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Web3eventMapdata, Web3eventMapGeodata, GeoJSONFeature } from '../components/web3eventMapType';
import { MapPinIcon, ClockIcon } from 'lucide-react';

type Props = {
    web3eventMap:Web3eventMapdata[], 
};

const  MapView: React.FC<Props> = ({web3eventMap}) => {
    mapboxgl.accessToken = "pk.eyJ1IjoidXJ0cmFkZSIsImEiOiJjbHJobHc5aDMwMGpyMmxzMWFoeWd2dzAxIn0.T4vKAOyvnvIrT2bkN-Uisw";

    const [ pageIsMounted, setPageIsMounted ] = useState(false);
    const [ map, setMap ] = useState<mapboxgl.Map>();

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
        
        // map.on("load", function () {
        //     addDataLayer(map);
        // })
        initializeMap(map);
        setMap(map);
        return () => {
            map.remove();
        }
    },[]);
    
    useEffect(() => {
        if (pageIsMounted && map && web3eventMap) {

            const data = convertPreDataToGeoJSON(web3eventMap);

            map.on('load', () => {
                addDataLayer(map, data);
            })
        }
    },[pageIsMounted, setMap, map, web3eventMap]);
    
    return (
        <div className="px-6 pt-16 mx-auto max-w-[100rem] lg:px-8 md:pt-20 lg:pt-24 h-screen">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        web3event
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

const addDataLayer = (map: mapboxgl.Map, data: Web3eventMapGeodata) => {
    map.addSource('web3events', {
        'type': 'geojson',
        'data': data,
        'cluster': true,
        'clusterRadius': 50
    });
    map.addLayer({
        'id': 'clusters',
        'type': 'circle',
        'source': 'web3events',
        'filter': ['has', 'point_count'],
        'paint': {
            'circle-color':'#5c1b92',
            'circle-radius':12
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
            'text-size': 14,        
        },
        'paint': {
            'text-color': '#ffff00',
        }
    });

    map.addLayer({
        'id': 'unclustered-point',
        'type': 'circle',
        'source': 'web3events',
        'filter': ['!', ['has', 'point_count']],
        'paint': {
            'circle-color': '#ed60e7',
            'circle-radius': 6,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'            
        }
    });
};

const initializeMap = ( map: mapboxgl.Map ) => {

    map.on('click','clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point,{
            layers:['clusters']
        });
        
        const clusterId = features[0].properties?.cluster_id;
        const point_count = features[0].properties?.point_count;
        const coordinates = e.lngLat;
        const source = map.getSource('web3events') as GeoJSONSource;
        source.getClusterLeaves(clusterId, point_count, 0, (error, events) => {
            if (error) {
                console.error('Error fetching cluster leaves:', error);
                return;
            }
            const clusteredWeb3events = events as GeoJSONFeature[];
            
            let popupHTML = '<div class="popup-container">';
            let count = 0;
            clusteredWeb3events.forEach(event => {
                count = count + 1;
                popupHTML += 
                `<div class="event-content">
                    <div class="event-title">
                        <a href="/explore/${event.properties.id}">${count}. ${event.properties.title}</a>
                    </div>
                    <div class="event-detail">
                        <div class="event-time">
                            <div class="event-clock"></div>
                        <p>${event.properties.start_time}</p>
                        </div>
                        <div class="event-place">
                            <div class="event-location"></div>
                            <p>${event.properties.address}</p>
                        </div>
                    </div>
                </div>`;
            });
            popupHTML += '</div>';
    
            const popup = new mapboxgl.Popup({
                closeButton: false,
                className: 'custom-popup',
            })
            .setLngLat(coordinates)
            .setHTML(popupHTML)
            .addTo(map);

        });

        map.easeTo({
            center: coordinates
        });
    });
        
    map.on('click', 'unclustered-point', (e) => {
        const features = map.queryRenderedFeatures(e.point,{
            layers:['unclustered-point']
        });
        
        const coordinates = e.lngLat;
        const web3eventProperty = features[0]?.properties as GeoJSONFeature["properties"];

        const popupHTML = 
        `<div class="popup-container">
            <div class="event-content">
                <div class="event-title">
                    <a href="/explore/${web3eventProperty.id}">${web3eventProperty.title}</a>
                </div>
                <div class="event-detail">
                    <div class="event-time">
                        <div class="event-clock"></div>
                        <p>${web3eventProperty.start_time}</p>
                    </div>
                    <div class="event-place">
                        <div class="event-location"></div>
                        <p>${web3eventProperty.address}</p>
                    </div>
                </div>
            </div>
        </div>`;

        const popup = new mapboxgl.Popup({
            closeButton: false,
            className: 'custom-popup',
        })
        .setLngLat(coordinates)
        .setHTML(popupHTML)
        .addTo(map);

        map.easeTo({
            center: coordinates
        });
    })

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });  

    map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
    }); 
}


function convertPreDataToGeoJSON(web3eventMap: Web3eventMapdata[]): Web3eventMapGeodata {
    const features: GeoJSONFeature[] = web3eventMap.map(event => ({
        type: 'Feature',
        properties: {
            id: event.id,
            title: event.title,
            start_time: event.start_time,
            end_time: event.end_time,
            topics: event.topics_name,
            organizer: event.organizer,
            address: event.addr
        },
        geometry: {
            type: 'Point',
            coordinates: [event.lon, event.lat]
        }
    }));

    return {
        type: 'FeatureCollection',
        features
    };
}

