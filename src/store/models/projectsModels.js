import { action, thunk } from 'easy-peasy';

import { projectsApi } from "../../data";


const projectModels = {
    items : [],

    addAll: action((state,payload) => {
        state.items = [...payload];
    }),

    fetchData : thunk( async( actions ) => {
        const projects = await projectsApi.getProjectsByCountry();
        actions.addAll(projects)
    })

};

export default projectModelst