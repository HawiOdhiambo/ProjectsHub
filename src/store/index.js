import { createStore, action } from 'easy-peasy';

/*export const store= createStore({
    filters: {
        projects: [],
        countryNameParam: '',
        projectNameParam:'',
        unitNameParam:'',
        ongoingClosedValueParam: true,
        donorNameParam:''
    }

});*/



const filterProjectPageModel= {
    displayFilterProjectPage:false,
    

    changeFilterProjectPageValue:action((state) => {
        state.displayFilterProjectPage= !state.displayFilterProjectPage;
      })

}
const filterCountryProjectPageModel= {
    displayFilterCountryProjectPage:false,
    

    changeFilterCountryProjectPageValue:action((state) => {
        state.displayFilterCountryProjectPage= !state.displayFilterCountryProjectPage;
      })

}
export const store= createStore({filterProjectPageModel, filterCountryProjectPageModel});
