export type Web3eventMapdata = {
    id: number,
    created_at: string,
    updated_at: string,
    deleted_at: null|string,
    source_id: string,
    type: number,
    is_top: number,
    topics: number[],
    topics_name: string[],
    categories: string[],
    categories_name: string[],
    start_time: string,
    end_time: string,
    place: number,
    register_type: 1,
    locale: string,
    image: string,
    title: string,
    source_url: string,
    organizer: string,
    organizer_head: string,
    organizer_status: number,
    description: string,
    timezone: string,
    pay: number,
    city: string,
    city_name: string,
    ticket: string,
    lat: number,
    lon: number,
    is_hot: number,
    published: number,
    is_visible: number,
    user_id: number,
    addr: string,
    collect_num: number,
    like_num: number,
    click_num: number,
    is_collect: number,
    is_like: number,
    rate: number,
    code: string,
    event_url: string,
    format: number,
    exposure: number,
    important: number,
    regist_to_see_address: number,
    host_id_list: null|string|string[],
    host_name_list: null|string|string[],
    speaker_id_list: null|string|string[],
    speaker_name_list: null|string|string[],
    capacity: number,
    is_place: number,
    hosts: null|string|string[],
    speakers: null|string|string[],
    organizers: null|string|string[],
    host_list: null|string|string[],
    speaker_list: null|string|string[],
    organizer_list: null|string|string[],
    user_name: string,
    source_type: number,
    is_ai_upload: number
};

export type Web3eventMapGeodata = {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
};

export type GeoJSONFeature = {
    type: 'Feature';
    properties: { [key: string]: any };
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
}
