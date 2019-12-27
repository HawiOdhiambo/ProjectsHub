 import React from 'react';
import FetchSummary from "./FetchSummary.js";//get the homepageSummary
class FetchFilterSummary extends React.Component{

	render(){

	  const fetchSummaryCountryUrl="http://localhost/projects_hub/proj_hub/public/summary_charts/summary_homeCountryPage.php";
      const fetchSummaryUnitUrl="http://localhost/projects_hub/proj_hub/public/summary_charts/summary_unitName.php";
      const fetchSummaryOngoingClosedUrl="http://localhost/projects_hub/proj_hub/public/summary_charts/summary_ongoingClosedValue.php";
	  const fetchSummaryDonorUrl="http://localhost/projects_hub/proj_hub/public/summary_charts/summary_donorName.php";
	  const fetchSummaryProjectTitleUrl="http://localhost/projects_hub/proj_hub/public/summary_charts/summary_projectTitle.php";
		
	
		
		return(		<div>{
	    						(this.props.projectTitle!=="")?(

	    							<div className="row mt-3">
										<div className="col-md-12">
											<FetchSummary  fetchSummaryUrl={fetchSummaryProjectTitleUrl} countryName={this.props.countryName} 
										unitName={this.props.unitName}   projectTitle={this.props.projectTitle} ongoingClosedValue={this.props.ongoingClosedValue} 
										donorName={this.props.donorName} />
										</div>
										
									</div>


	    						):
	    						(this.props.projectTitle==="")?(
	    							(this.props.donorName!=="")?(
			    							<div className="row mt-3">
												<div className="col-md-12">
													<FetchSummary  fetchSummaryUrl={fetchSummaryDonorUrl}  countryName={this.props.countryName} 
														unitName={this.props.unitName}   projectTitle={this.props.projectTitle} ongoingClosedValue={this.props.ongoingClosedValue} 
														donorName={this.props.donorName}/>
												</div>
												
											</div>
										):
			    						(this.props.donorName==="")?(
			    							(this.props.ongoingClosedValue!=="")?(
					    							<div className="row mt-3">
														<div className="col-md-12">
															<FetchSummary  fetchSummaryUrl={fetchSummaryOngoingClosedUrl}  countryName={this.props.countryName} 
																unitName={this.props.unitName}   projectTitle={this.props.projectTitle} ongoingClosedValue={this.props.ongoingClosedValue} 
																donorName={this.props.donorName}/>
														</div>
														
													</div>
					    						):
					    						(this.props.ongoingClosedValue==="")?(

						    						(this.props.unitName!=='')?(
						    							<div className="row mt-3">
															<div className="col-md-12">
																<FetchSummary  fetchSummaryUrl={fetchSummaryUnitUrl}  countryName={this.props.countryName} 
																unitName={this.props.unitName}   projectTitle={this.props.projectTitle} ongoingClosedValue={this.props.ongoingClosedValue} 
																donorName={this.props.donorName} />
															</div>
															
														</div>

						    							):(this.props.unitName==='')?(
																
															(this.props.countryName!=='')?(
																	<div className="row mt-3">
																		<div className="col-md-12">
																			<FetchSummary  fetchSummaryUrl={fetchSummaryCountryUrl} countryName={this.props.countryName}/>
																		</div>
																		
																	</div>
																	
								    							):false//this.props.countryName
						    							):false//this.props.unitName


					    							):false//this.props.ongoingClosedValue    				
					    						):false //this.props.donorName


	    						):false //this.props.projectTitle


	    						
	    									
	    						
	    					}
	    					</div>
	    					)			
}
}

export default FetchFilterSummary
