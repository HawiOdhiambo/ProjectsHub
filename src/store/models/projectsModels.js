import { action, thunk } from 'easy-peasy';

import { projectsApi } from "../../data";


const projectModels = {
    markers: [],

    addAllMarkers: action((state, payload) => {
        state.markers = [...payload];
    }),

    fetchMarkers: thunk(async (actions) => {
        const markers = await projectsApi.getProjectsByCountry();
        actions.addAll(markers)
    })

};

export default projectModels;