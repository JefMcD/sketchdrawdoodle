
/*
	This component is the heart of the App
	This is where a user configures their SketchDrawDoodle Practice Sessions
	All the required data for a practice session is gathered here
	and submitted to the Server for processing

*/
// Do the horizontal Netflix scroller for Category selection  on Desktop
// Maybe Vertical stacked accordion on Mobile

	
import {useState, useEffect} from "react"

import HorizontalAds from "@components/HorizontalAds";
// Import Horizontal Tab
import HTab  from "@draw/tabs/HTab";

// Import Tab images
import alfieCamera from "@images/draw/camera.webp"
import alfieMusic from "@images/draw/music.webp"
import alfieTime   from "@images/draw/time.webp"

// Import form sections
import Spinner      from "@components/Spinner";
import PicsSection  from "@forms/draw/PicsSection";
import TimeSection  from "@forms/draw/TimeSection";
import MusicSection from "@forms/draw/MusicSection";
import FormError    from "@forms/FormError";

// import fancy pulsing inksplat submit button
import SplatSubmit  from "@forms/draw/SplatSubmit";

// import modules
import {checkCookie} from "@modules/manageApi.js";

export default function Draw({
	userData,
	setIsDrawing,
	setPracticePayload,
	formData,
	setFormData,
}){
	const server = userData.server;
	const csrfToken = checkCookie();

	// State Variables
	const [isLoading, setIsLoading]         = useState(true);
	const [activeTab, setActiveTab]         = useState("pic-tab"); // PicTab, TimeTab, HelpTab, MusicTab
	const [categories, setCategories]       = useState([]); // Available Categories list returned by Server
	/*
	categories === [
		{id: 1, name="people", description:"hoomans doin stuff", icon: "/static/doodle_app/images/.../man.jpg"}
		...
	]
	*/
	const [subcategories, setSubcategories] = useState([]);
	
	const [drillList, setDrillList]         = useState([]);
	/*
		drillList === [
			{
				id: 104,
				mode: "sketch",
				description: "30 minute Warmup",
				duration_secs: 1800,
				is_pro: false,
				steps: [
					{
						'num_pics': 8, 
						'step_order': 0, 
						'display_time': 30
					}, 
					{
						'num_pics': 6, 
						'step_order': 1, 
						'display_time': 60
					}, 
					{
						'num_pics': 5, 
						'step_order': 2, 
						'display_time': 120
					}, 
					{
						'num_pics': 2, 
						'step_order': 3, 
						'display_time': 300
					}
				]
			},
			{... next drill ...}.
			etc
		]
	*/
	

	const [formError, setFormError] = useState("");

	async function handleFormSubmission(e){
		e.stopPropagation();
		e.preventDefault();

		// prepare Json Payload for POST
		const payload = {
			category_id: formData.categoryChoice.id,
			subcategory_ids: formData.subcategoryChoices.map((choice)=>(choice.id)),
			drill_choice: formData.drillChoice.id,
			music_choice: null
		};

		setIsLoading(true)
		const startQueryEngine = `${server}start_query_engine/`
		//const startQueryEngine = `${server}get_fake_api/`
		const response = await fetch(startQueryEngine,{
			method: "POST",
			credentials: "include",
			headers: {
				"X-CSRFToken": csrfToken,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload),
			cache: "no-store"
		})
		
		const data = await response.json();

		if(!response.ok){
			setIsLoading(false)
			setFormError(data.error);
			return;
		}

		// load image_list
		const message = data.message;
		const total_hits = data.total_hits;
		const image_list = data.image_list; // array of objects 
		for (let i of image_list){
			console.log(`webFormatURL = ${i.webFormatURL}`)
		}

		// load practice drill
		//const practice_settings = data.practice_settings; // Obj containing two objs and one array [{time_dicr}, {mode_dict}, [drill_list]]

		// bundle response data together and set state
		const newPracticePayload = {
			//practiceSettings:practice_settings,
			image_list: image_list,
		}
		/*
		practice_settings = {
			drill_dict: {'duration': 1800, 'description': '30 minute Sketching'}
			step_list: [{'num_pics': 8, 'step_order': 0, 'display_time': 30}, {'num_pics': 6, 'step_order': 1, 'display_time': 60}, {'num_pics': 5, 'step_order': 2, 'display_time': 120}, {'num_pics': 2, 'step_order': 3, 'display_time': 300}]
		}

		*/

		setPracticePayload(newPracticePayload); // points to entirely new object so new reference = rerender in SketchDrawDoodle

		// const timeObj  = practiceSettings.time_dict;    // Obj {"duration": total_practice_time, "description":"30 minute warmup drill"}
		// const modeObj  = practiceSettings.mode_dict;    // Obj {"name":"warmup", "description":"warmup sketching"}
		// const drillArr = practiceSettings.drill_list;   // Array of Objs order_by("step_order") [{"num_pics":8, "step_order":1, "display_time":30}, {"num_pics": 5, "step_order": 2, "display_time": 60}, ...]

		setIsLoading(false)
		setIsDrawing(true)

	}

/*
	fetch category data for pictures part of the form

	Note: The browser caches GET requests.
	This is normally a good and useful thing in a live production env
	but
	in development I need to prevent automatica caching
*/
	useEffect(()=>{
		const get_category_and_drill_data = server+"get_category_and_drill_data/";
		async function getCategoryAndDrillData(){
			const response = await fetch(`${get_category_and_drill_data}?t=${Date.now}`,{ // timestamp url to ensure always unique
				method: "GET",
				cache: "no-store" // tells the browser not to store the result at all. Options include "default", "reload", "no-store", "force-cache"
			});
			const data = await response.json();
			if (response.ok){
				
				// process data
				setIsLoading(false);
				setCategories(data.category_payload); // No spread here. The entire state object now references a new object so no mutation and React is Happy
				setDrillList(data.drill_payload)
			}else{
				//error
				setError(data["error"]);
			}
		};
		try{
			getCategoryAndDrillData();
		}catch (err){
			setError(err);
		};
	},[]); // No dependencies, call once on component mount


	// tabId corrosponds to setActiveTab and used to set the activeTab. Also used as a unique key for map function
	const tabsArray = [
		{tabId: "pic-tab", 	tab: HTab, image: alfieCamera, label: "Pics",  formSection: "pics-section"},
		{tabId: "time-tab", tab: HTab, image: alfieTime,   label: "Time",  formSection: "time-section"},
		//{tabId: "music-tab",tab: HTab, image: alfieMusic,  label: "Music", formSection: "music-section"}
	];


	// The form components and their props
	const formSectionsArray = [
		{	id: "pics-section",  component: PicsSection,  
			props: {userData, formData, setFormData, categories, subcategories, setSubcategories, setFormError}
		},
		{id: "time-section",  component: TimeSection,  
			props: {formData, setFormData, drillList, setFormError}},
		{id: "music-section", component: MusicSection, props: {formData, setFormData}}
	]

	// Get the active tab
	const activeTabData = tabsArray.find( (tab) => (tab.tabId === activeTab));

	// Get Active Form Section
	const activeFormSectionData = formSectionsArray.find( (formSection) => (formSection.id === activeTabData.formSection));
	const ActiveFormComponent = activeFormSectionData.component;
	const componentProps = activeFormSectionData.props;

	return(
		<>
		<div className="main-panel">

      {/* HEADER / TITLE */}
      <div className="zine-title">
        <h1 className="fs5">Get Drawing</h1>
      </div>

			<div className = "horizontal-tabs-box">
				{
					// render all the tab components listed in tabsArray
					tabsArray.map((tabObj)=>(
						<tabObj.tab 
							  key={tabObj.tabId}
							  tabId={tabObj.tabId}
  							label={tabObj.label}
  							tabImage={tabObj.image}
  							activeTab={activeTab}
  							setActiveTab={setActiveTab}
						/>
					))
				}
			</div>
			
			{/*the section to be rendered when a tab is active or unmounted when inactive */}

			<div className="drill-form-flex-container">
					<form onSubmit={handleFormSubmission} className="drill-setup-form">
							{isLoading ? (
								<Spinner />
							) :(
								<>
								<ActiveFormComponent {...componentProps}/>{/*PicsSection(CategoryPicker and SubcategoryPicker) or TimeSection) */}
								</>
							)}
							<div className="drill-summary-box">
								{/* SECTION: DRILL SUMMARY */}
								<div className="drill-footer">
										<div className="drill-list fs3">
											<p>Category: <span className="emphasis fs5">{formData.categoryChoice.id ? formData.categoryChoice.name : "Random"}</span></p>
											<p>Subcategory: <span className="emphasis fs5">{formData.subcategoryChoices.length > 0 ? `${formData.subcategoryChoices.length} selected` : "Random"}</span> </p>
											<p>Time:<span className="emphasis fs5"> {formData.drillChoice.description}</span></p>	
										</div>
										<div className="drill-inksplat-box"><SplatSubmit /></div>
									
									</div>
							</div> {/* end drill-summary-box */}
					</form>
					{formError && <FormError formError={formError} setFormError={setFormError} />} 
			</div> {/*end drill-form-flex-container */}

				<HorizontalAds />

		</div> {/* end man-panel */}
		</>
	)
}


/*
Note on using the spread operator for props

const componentProps = {
  formData,
  setFormData,
  categories,
  subcategories
}

<ActiveComponent {...componentProps} />

React expands it like this;

<ActiveComponent 
  formData={formData} 
  setFormData={setFormData} 
  categories={categories} 
  subcategories={subcategories} 
/>


BUT 
----
you cant just write the prop on its own ie without the spread

<ActiveComponent formData setFormData />

get interpreted as;

<ActiveComponent formData={true} setFormData={true} />






*/



