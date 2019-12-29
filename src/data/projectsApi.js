export const getProjectsByCountry = async(country) => {
    const url = "http://localhost/projects_hub/proj_hub/public/get_markers_home.php";
    return await fetch(url)
        .then()
        .catch(error => { throw new Error(error)});
}