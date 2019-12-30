export const getProjectsByCountry = async(country) => {
    const url = "http://localhost/projects_hub/proj_hub/public/get_markers_home.php";
    const countryName = `?&countryName=${country}`;
    return await fetch(url + countryName)
        .then(response => response.json())
        .then(results => {
            console.log(results);
            return [];
        })
        .catch(error => { throw new Error(error)});
}