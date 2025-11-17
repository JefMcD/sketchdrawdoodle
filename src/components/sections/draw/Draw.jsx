
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
	setPracticePayload,
	setIsDrawing,
	setActiveSection
}){
	const server = userData.server;
	const csrfToken = checkCookie();
	const getCategories = server+"get_category_options/";

	// State Variables
	const [isDrillActive, setIsDrillActive] = useState(false);
	const [isLoading, setIsLoading]         = useState(true);
	const [activeTab, setActiveTab]         = useState("pic-tab");
	const [categories, setCategories]       = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [practiceTime, setPracticeTime]   = useState([]);
	const [practiceMusic, setPracticeMusic] = useState([]);
	const [formData, setFormData]           = useState({
		categoryChoice:{id: null, name:""}, // eg 2, "animals"
		subcategoryChoices:[], // array of {id, name}
		practiceChoice:{},
		musicChoice:{}
	});
	const [formError, setFormError] = useState("");


	async function handleFormSubmission(e){
		e.stopPropagation();
		e.preventDefault();

		// prepare Json Payload for POST
		const payload = {
			category_id: formData.categoryChoice.id,
			subcategory_ids: formData.subcategoryChoices.map((choice)=>(choice.id)),
			practice_choice: null,
			music_choice: null
		};

		const startDrawing = `${server}start_drawing/`
		//const startDrawing = `${server}get_fake_api/`
		const response = await fetch(startDrawing,{
			method: "POST",
			credentials: "include",
			headers: {
				"X-CSRFToken": csrfToken,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		})
		
		const data = await response.json()

		if(!response.ok){
			setFormError(data.error);
			return;
		}

		// load image_list
		const message = data.message;
		const total_hits = data.total_hits;
		const image_list = data.image_list; // array of objects 

		// load practice drill
		const practice_settings = data.practice_settings; // Obj containing two objs and one array [{time_dicr}, {mode_dict}, [drill_list]]

		// bundle response data together and set state
		const newPracticePayload = {
			practiceSettings:practice_settings,
			image_list: image_list,
		}

		setPracticePayload(newPracticePayload); // points to entirely new object so new reference = rerender in SketchDrawDoodle

		// const timeObj  = practiceSettings.time_dict;    // Obj {"duration": total_practice_time, "description":"30 minute warmup drill"}
		// const modeObj  = practiceSettings.mode_dict;    // Obj {"name":"warmup", "description":"warmup sketching"}
		// const drillArr = practiceSettings.drill_list;   // Array of Objs order_by("step_order") [{"num_pics":8, "step_order":1, "display_time":30}, {"num_pics": 5, "step_order": 2, "display_time": 60}, ...]

		setIsDrawing(true)

	}

/*
	fetch category data for default pictures part of the form

	Note: The browser caches GET requests.
	This is normally a good and useful thing in a live production env
	but
	in development I need to prevent automatica caching
*/
	useEffect(()=>{
		async function getCategoryData(){
			const response = await fetch(`${getCategories}?t=${Date.now}`,{ // timestamp url to ensure always unique
				method: "GET",
				// cache: "no-store" // tells the browser not to store the result at all. Options include "default", "reload", "no-store", "force-cache"
			});
			const data = await response.json();
			if (response.ok){
				
				// process data
				setIsLoading(false);
				setCategories(data.category_payload); // No spread here. The entire state object now references a new object so no mutation and React is Happy

			}else{
				//error
				setError(data["error"]);
			}
		};
		try{
			getCategoryData();
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
			props: {formData, setFormData, categories, subcategories, setSubcategories, setFormError}
		},
		{id: "time-section",  component: TimeSection,  props: {formData, setFormData, practiceTime, setActiveSection}},
		{id: "music-section", component: MusicSection, props: {formData, setFormData, practiceMusic}}
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
        <h1 className="fs7">Get Drawing</h1>
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
			<div className="practice-setup-box">
						<div className="form-wrapper">
								<form onSubmit={handleFormSubmission} className="standard-form practice-setup-form">
										{isLoading ? (
											<Spinner />
										) :(
											<>
											<ActiveFormComponent {...componentProps}/>
											<SplatSubmit />
											</>
										)}
								</form>
								{formError && <FormError message={formError} setFormError={setFormError} />} 
						</div> {/*form-wrapper */}

		    </div> {/* end practice-setup-box */}

				{/* <HorizontalAds /> */}

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



