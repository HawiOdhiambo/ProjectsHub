
			
export const unitColor=function(unitStr, svgCanvas){
	
			const definitions=svgCanvas.append("defs") //create the definitions for the linear gradients
			//define the colors for CCPU CPEDU
			const CCPU_CPEDU=definitions.append("linearGradient")
							.attr("id", "ccpucpedudef")
							.attr("x1", "0%")
							.attr("x2", "100%")
							.attr("y1", "0%")
							.attr("y2", "0%");

				//add the color for CCPU
					CCPU_CPEDU.append("stop")
						.attr("offset", "50%")
						.style("stop-color", "#a3d09b")

				//add the color for CPEDU
					CCPU_CPEDU.append("stop")
							.attr("offset", "50%")
							.style("stop-color", "#F29C6B") 


			//define the colors for CCPU RMPU
			const CCPU_RMPU=definitions.append("linearGradient")
								.attr("id", "ccpurmpudef")
								.attr("x1", "0%")
								.attr("x2", "100%")
								.attr("y1", "0%")
								.attr("y2", "0%");

					//add the color for CCPU
						CCPU_RMPU.append("stop")
							.attr("offset", "50%")
							.style("stop-color", "#a3d09b")

					//add the color for RMPU
						CCPU_RMPU.append("stop")
								.attr("offset", "50%")
								.style("stop-color", "#BA91A7")

			//define the colors for CCPU RMPU
			const CPEDU_RMPU=definitions.append("linearGradient")
								.attr("id", "cpedurmpudef")
								.attr("x1", "0%")
								.attr("x2", "100%")
								.attr("y1", "0%")
								.attr("y2", "0%");

					//add the color for CPEDU
						CPEDU_RMPU.append("stop")
							.attr("offset", "50%")
							.style("stop-color", "#F29C6B")

					//add the color for RMPU
						CPEDU_RMPU.append("stop")
								.attr("offset", "50%")
								.style("stop-color", "#BA91A7")

					//define the colors for CCPU_CPEDU_RMPU
			const CCPU_CPEDU_RMPU=definitions.append("linearGradient")
								.attr("id", "ccpuccpedurmpudef")
								.attr("x1", "0%")
								.attr("x2", "100%")
								.attr("y1", "0%")
								.attr("y2", "0%");

					//add the color for CCPU
						CCPU_CPEDU_RMPU.append("stop")
							.attr("offset", "0%")
							.style("stop-color", "#a3d09b");

						CCPU_CPEDU_RMPU.append("stop")
							.attr("offset", "33.3%")
							.style("stop-color", "#a3d09b");
					
					//add the color for CPEDU
						CCPU_CPEDU_RMPU.append("stop")
								.attr("offset", "33.3%")
								.style("stop-color", "#F29C6B");

						CCPU_CPEDU_RMPU.append("stop")
								.attr("offset", "66.6%")
								.style("stop-color", "#F29C6B");
							//add the color for RMPU
						CCPU_CPEDU_RMPU.append("stop")
								.attr("offset", "66.6%")
								.style("stop-color", "#BA91A7");

						CCPU_CPEDU_RMPU.append("stop")
								.attr("offset", "100%")
								.style("stop-color", "#BA91A7");
					

	

				if(unitStr==='CCPU'){

					return 	'#a3d09b';
				}
				if(unitStr==='CCPUCPEDU'){
				

					return 'url(#ccpucpedudef)';
				}
				if(unitStr==='CCPUCPEDURMPU'){
					return 'url(#ccpuccpedurmpudef)';
				}
				if(unitStr==='CPEDU'){
					return '#F29C6B';

				}
				if(unitStr==='CPEDURMPU'){
					return 'url(#cpedurmpudef)';
				}
				if(unitStr==='RMPU'){
					return '#BA91A7'
				}
				if(unitStr==='CCPURMPU'){;
					return 'url(#ccpurmpudef)';
				}

			}
