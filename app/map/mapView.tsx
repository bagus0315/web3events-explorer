"use client"
import React, { useEffect, useState } from 'react';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Web3eventMapdata, 
    Web3eventMapGeodata, 
    GeoJSONFeature 
} from '../components/web3eventMapType';
import { AutoComplete, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type Props = {
    web3eventMap:Web3eventMapdata[], 
};

const  MapView: React.FC<Props> = ({web3eventMap}) => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    
    const [ pageIsMounted, setPageIsMounted ] = useState(false);
    const [ map, setMap ] = useState<mapboxgl.Map>();
    const [popup, setPopup] = useState<mapboxgl.Popup>();

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
    
    const web3eventListClickHandle = (event: Web3eventMapdata) => {
        if (!map) return;
    
        const coordinates: [number,number] = [event.lon, event.lat];
        map.flyTo({
            center: coordinates,
            zoom: 12, // Adjust the zoom level as needed
        });
    
        // Open a popup at the clicked event's position
        const popupContent = `<div class="popup-container">
            <div class="event-content">
                <div class="event-title">
                    <a href="/explore/${event?.id}">${event?.title}</a>
                </div>
                <div class="event-detail">
                    <div class="event-time">
                        <div class="event-clock"></div>
                        <p>${event?.start_time}</p>
                    </div>
                    <div class="event-place">
                        <div class="event-location"></div>
                        <p>${event?.addr}</p>
                    </div>
                </div>
            </div>
        </div>`;
        const newPopup = new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent);

        if (popup) popup.remove(); // Remove any existing popups
        newPopup.addTo(map);
        setPopup(newPopup);
    }

    return (
        <div className="px-6 mx-auto max-w-[100rem] lg:px-8 pt-[70px] h-screen">
            <div className="max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                    CommuneAI
                </h2>
                <p className="mt-4 text-zinc-400">
                    This is description about web3events for peopel who love blockchain.
                </p>
            </div>
            <div className="w-full h-px mt-4 bg-zinc-800" />
            <div className="w-full flex">
                    <SideBar web3eventMap={web3eventMap} onTitleClick={web3eventListClickHandle}/>
                <div id="web3eventMap" className="w-full h-[80vh]">
                </div>
            </div>
        </div>
    )

};

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

    map.addLayer({
        'id': 'event-description',
        'type': 'symbol',
        'source': 'web3events',
        'filter': ['!', ['has', 'point_count']],
        'layout': {
            'text-field': ['get', 'title'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14,
            'text-offset': [0.5, 0],
            'text-anchor': 'top-left'     
        },
        'paint': {
            'text-color': '#ffff00',
        }
    });
};

const initializeMap = ( map: mapboxgl.Map ) => {

    map.on('click','clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point,{
            layers:['clusters']
        });
        
        const clusterId = features[0]?.properties?.cluster_id;
        const point_count = features[0]?.properties?.point_count;
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
                        <a href="/explore/${event?.properties?.id}">${count}. ${event?.properties?.title}</a>
                    </div>
                    <div class="event-detail">
                        <div class="event-time">
                            <div class="event-clock"></div>
                        <p>${event?.properties?.start_time}</p>
                        </div>
                        <div class="event-place">
                            <div class="event-location"></div>
                            <p>${event?.properties?.address}</p>
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
                    <a href="/explore/${web3eventProperty?.id}">${web3eventProperty?.title}</a>
                </div>
                <div class="event-detail">
                    <div class="event-time">
                        <div class="event-clock"></div>
                        <p>${web3eventProperty?.start_time}</p>
                    </div>
                    <div class="event-place">
                        <div class="event-location"></div>
                        <p>${web3eventProperty?.address}</p>
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

const SideBar:React.FC<{ web3eventMap: Web3eventMapdata[]; onTitleClick: (event: Web3eventMapdata) => void }> = ({
    web3eventMap,
    onTitleClick,
}) => {  

    const [ filterEvent, setFilterEvent ] = useState<Web3eventMapdata[]>(web3eventMap);
    const options = web3eventMap.map((event) => ({ 
        value: event.title,
        event: event
    }));
    
    return (
        <div className="w-[450px] h-[80vh] bg-black py-2 ">
            <div className="h-[80px] px-2 py-2 flex justify-center items-center">
                <AutoComplete
                    popupClassName="certain-category-search-dropdown"
                    popupMatchSelectWidth={500}
                    style={{ width: 250 }}
                    options={options}
                    size="large"
                    filterOption={(inputValue, option) =>
                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={(value,option) => {
                        // setFilterEvent([option.event]);
                        onTitleClick(option.event);
                    }}
                    // onDeselect={() => {
                    //     setFilterEvent(web3eventMap)
                    // }}
                >
                    <Input.Search size="large" placeholder="search event title"/>
                </AutoComplete>
            </div>
            <div className="w-full h-[calc(80vh-96px)] px-2 overflow-y-auto scroll grid gap-2">
                {filterEvent.map((event, key) => (
                    <div key={key} onClick={() => onTitleClick(event)} className="w-full rounded-lg border border-zinc-800 px-3 py-2">
                        <div className="text-zinc-200 font-semibold text-lg">{event?.title}</div>
                        <div className="text-[#11bb1c] text-sm">{event?.start_time},{web3eventMap[0]?.end_time}</div>
                        <div className="text-zinc-400 text-sm">By {event?.organizer}</div>
                    </div>
                ))}
            </div>
        </div>
    )
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

