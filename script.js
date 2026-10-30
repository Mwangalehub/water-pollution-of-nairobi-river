const pressureContent = {
	waste: {
		index: "01 / A VISIBLE PRESSURE",
		title: "Waste travels.",
		description: "When collection is missed or disposal is informal, litter can wash from streets and open spaces into drainage channels, then into nearby streams.",
		image: "panel-image-waste",
		label: "CITY · STREAM · RIVER",
		path: ["STREET", "DRAIN", "RIVER"]
	},
	sewage: {
		index: "02 / A HIDDEN PRESSURE",
		title: "Wastewater needs a route.",
		description: "Where sewer connections or treatment capacity are insufficient, untreated or inadequately treated wastewater may reach waterways and affect water quality.",
		image: "panel-image-sewage",
		label: "HOMES · TREATMENT · STREAM",
		path: ["HOMES", "SEWER", "RIVER"]
	},
	runoff: {
		index: "03 / A RAIN-DRIVEN PRESSURE",
		title: "Rain carries more than water.",
		description: "As rain moves over roads and built-up areas, it can pick up sediment, oil, litter, and other pollutants before flowing into drains and streams.",
		image: "panel-image-runoff",
		label: "RAIN · STREETS · STREAM",
		path: ["RAINFALL", "STREET", "RIVER"]
	},
	industry: {
		index: "04 / A MANAGED PRESSURE",
		title: "Discharge must be controlled.",
		description: "Industrial processes can produce wastewater. Proper handling, treatment, and compliance checks help prevent harmful substances from reaching waterways.",
		image: "panel-image-industry",
		label: "INDUSTRY · TREATMENT · RIVER",
		path: ["PROCESS", "TREATMENT", "RIVER"]
	}
};

const impactContent = {
	people: {
		number: "01",
		heading: "Everyday wellbeing",
		description: "People live, work, and move alongside the river. Cleaner waterways support safer surroundings and healthier neighbourhoods, especially for communities closest to the banks.",
		symbol: "↗"
	},
	nature: {
		number: "02",
		heading: "Room for life",
		description: "Streams and riverbanks form habitat for plants, insects, birds, and other wildlife. Pollution and damaged banks can put these connected ecosystems under pressure.",
		symbol: "✳"
	},
	city: {
		number: "03",
		heading: "A more resilient city",
		description: "Healthy waterways help the city manage rainfall and protect green corridors. Keeping waste out of drains can also reduce blockages and help water move where it should.",
		symbol: "⌁"
	}
};

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
	const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
	siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => {
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "Open navigation");
		siteNav.classList.remove("is-open");
	});
});

const pressureTabs = [...document.querySelectorAll(".pressure-tab")];
const pressurePanel = document.querySelector(".pressure-panel");

function selectPressure(tab, moveFocus = false) {
	const data = pressureContent[tab.dataset.pressure];
	pressureTabs.forEach((item) => {
		const active = item === tab;
		item.classList.toggle("is-active", active);
		item.setAttribute("aria-selected", String(active));
		item.tabIndex = active ? 0 : -1;
	});
	pressurePanel.setAttribute("aria-labelledby", tab.id);
	document.querySelector("#pressure-index").textContent = data.index;
	document.querySelector("#pressure-name").textContent = data.title;
	document.querySelector("#pressure-description").textContent = data.description;
	const image = document.querySelector(".panel-image");
	image.className = `panel-image ${data.image}`;
	image.querySelector(".image-label").textContent = data.label;
	document.querySelector(".pathway").innerHTML = data.path.map((part, index) => `${index ? '<span aria-hidden="true">→</span>' : ""}<span>${part}</span>`).join("");
	pressurePanel.style.animation = "none";
	requestAnimationFrame(() => { pressurePanel.style.animation = ""; });
	if (moveFocus) tab.focus();
}

pressureTabs.forEach((tab, index) => {
	tab.addEventListener("click", () => selectPressure(tab));
	tab.addEventListener("keydown", (event) => {
		if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
		event.preventDefault();
		let nextIndex = index;
		if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % pressureTabs.length;
		if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + pressureTabs.length) % pressureTabs.length;
		if (event.key === "Home") nextIndex = 0;
		if (event.key === "End") nextIndex = pressureTabs.length - 1;
		selectPressure(pressureTabs[nextIndex], true);
	});
});

const impactTabs = [...document.querySelectorAll(".impact-tab")];
const impactPanel = document.querySelector(".impact-panel");

function selectImpact(tab, moveFocus = false) {
	const data = impactContent[tab.dataset.impact];
	impactTabs.forEach((item) => {
		const active = item === tab;
		item.classList.toggle("is-active", active);
		item.setAttribute("aria-selected", String(active));
		item.tabIndex = active ? 0 : -1;
	});
	impactPanel.setAttribute("aria-labelledby", tab.id);
	document.querySelector("#impact-number").textContent = data.number;
	document.querySelector("#impact-heading").textContent = data.heading;
	document.querySelector("#impact-description").textContent = data.description;
	document.querySelector("#impact-symbol").textContent = data.symbol;
	impactPanel.style.animation = "none";
	requestAnimationFrame(() => { impactPanel.style.animation = ""; });
	if (moveFocus) tab.focus();
}

impactTabs.forEach((tab, index) => {
	tab.addEventListener("click", () => selectImpact(tab));
	tab.addEventListener("keydown", (event) => {
		if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
		event.preventDefault();
		let nextIndex = index;
		if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % impactTabs.length;
		if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + impactTabs.length) % impactTabs.length;
		if (event.key === "Home") nextIndex = 0;
		if (event.key === "End") nextIndex = impactTabs.length - 1;
		selectImpact(impactTabs[nextIndex], true);
	});
});

const pledgeForm = document.querySelector("#pledge-form");
const pledgeSelect = document.querySelector("#pledge-select");
const pledgeStatus = document.querySelector("#pledge-status");
const pledgeButtonLabel = document.querySelector("#pledge-button-label");

try {
	const savedPledge = localStorage.getItem("nairobi-river-pledge");
	if (savedPledge && [...pledgeSelect.options].some((option) => option.value === savedPledge)) {
		pledgeSelect.value = savedPledge;
		pledgeStatus.textContent = "Your pledge is saved on this device.";
		pledgeButtonLabel.textContent = "Update my pledge";
	}
} catch {
	pledgeStatus.textContent = "Choose an action and save it as your pledge.";
}

pledgeForm.addEventListener("submit", (event) => {
	event.preventDefault();
	try {
		localStorage.setItem("nairobi-river-pledge", pledgeSelect.value);
		pledgeStatus.textContent = "Pledge saved. Thanks for taking a first step.";
		pledgeButtonLabel.textContent = "Update my pledge";
	} catch {
		pledgeStatus.textContent = "Your browser could not save this pledge, but your choice still matters.";
	}
});

const quizQuestions = [
	{
		question: "Which route can carry litter from a street to a river?",
		options: ["Street → rooftop → cloud", "Street → storm drain → stream", "Street → hilltop → forest"],
		answer: 1,
		explanation: "Rain can wash street litter into storm drains, which may flow into nearby streams."
	},
	{
		question: "What is urban runoff?",
		options: ["Rainwater flowing over built surfaces", "Water stored in household tanks", "Water evaporating from a river"],
		answer: 0,
		explanation: "Runoff flows over surfaces like roads and rooftops, picking up material along the way."
	},
	{
		question: "Why is wastewater treated before it is released?",
		options: ["To make it evaporate faster", "To remove or reduce contaminants", "To add more sediment"],
		answer: 1,
		explanation: "Treatment reduces contaminants and helps protect people and aquatic environments."
	},
	{
		question: "What can happen when untreated sewage enters a waterway?",
		options: ["It can introduce pathogens and excess nutrients", "It makes the water safe to drink", "It prevents all algae from growing"],
		answer: 0,
		explanation: "Untreated sewage can carry disease-causing organisms and nutrients that disrupt aquatic ecosystems."
	},
	{
		question: "What should a storm drain carry?",
		options: ["Rainwater, not dumped rubbish or chemicals", "Household rubbish", "Leftover paint and oil"],
		answer: 0,
		explanation: "Storm drains are for rainfall. Dumped waste can travel from drains into streams and rivers."
	},
	{
		question: "What does the word watershed describe?",
		options: ["A dam wall", "An area of land that drains to a shared waterway", "A machine that cleans riverbanks"],
		answer: 1,
		explanation: "A watershed includes the land where rain and streams flow toward a common outlet."
	},
	{
		question: "Which is an example of a point source of pollution?",
		options: ["Pollutants washed off many roads", "A discharge from a single pipe", "Dust carried across a wide area"],
		answer: 1,
		explanation: "A point source comes from an identifiable location, such as a pipe or channel."
	},
	{
		question: "Which is an example of nonpoint-source pollution?",
		options: ["Runoff carrying pollutants from many streets", "A leak from one named outlet", "A sample collected at one monitoring station"],
		answer: 0,
		explanation: "Nonpoint pollution comes from diffuse sources across an area rather than one identifiable outlet."
	},
	{
		question: "What might rain pick up as it flows over roads?",
		options: ["Only clean drinking water", "Litter, oil, and sediment", "Nothing at all"],
		answer: 1,
		explanation: "Runoff can carry litter, oil, sediment, and other pollutants from roads into drains."
	},
	{
		question: "How can vegetation along a riverbank help?",
		options: ["It can help stabilize soil and provide habitat", "It directs rubbish into the water", "It stops all rain from reaching the river"],
		answer: 0,
		explanation: "Riverbank plants can help hold soil in place, filter some runoff, and provide habitat."
	},
	{
		question: "Why can excess sediment be harmful in a stream?",
		options: ["It can cloud water and cover aquatic habitat", "It turns salt water into fresh water", "It removes every pollutant"],
		answer: 0,
		explanation: "Too much sediment can make water cloudy and smother habitats used by aquatic organisms."
	},
	{
		question: "Why is plastic litter a concern in waterways?",
		options: ["It always dissolves harmlessly", "It can persist and harm wildlife", "It improves water quality"],
		answer: 1,
		explanation: "Plastic can persist in the environment and may injure or be eaten by wildlife."
	},
	{
		question: "What is one purpose of water-quality monitoring?",
		options: ["To track conditions and spot changes", "To add pollutants to a river", "To replace all wastewater treatment"],
		answer: 0,
		explanation: "Monitoring helps people understand water conditions and identify changes that may need attention."
	},
	{
		question: "Which everyday action can help keep litter out of drains?",
		options: ["Leave rubbish beside a stream", "Use a bin and secure waste", "Sweep litter into the gutter"],
		answer: 1,
		explanation: "Putting waste in a suitable bin helps prevent it from being washed into drains and streams."
	},
	{
		question: "What should happen to industrial wastewater before discharge?",
		options: ["It should be managed and treated to meet applicable requirements", "It should be sent straight to a stream", "It should be mixed with litter"],
		answer: 0,
		explanation: "Proper handling, treatment, and compliance checks help reduce risks from industrial wastewater."
	},
	{
		question: "Why does keeping riverbanks clean matter?",
		options: ["Waste on banks can be washed into the water", "It makes rainfall stop", "It prevents streams from flowing"],
		answer: 0,
		explanation: "Rain and wind can carry waste from riverbanks into the waterway."
	},
	{
		question: "Why can actions upstream affect people downstream?",
		options: ["Waterways carry water through connected places", "Rivers flow uphill", "Pollution disappears at every bridge"],
		answer: 0,
		explanation: "Streams connect places, so pollution entering upstream can move with the water downstream."
	},
	{
		question: "What does biodiversity mean?",
		options: ["The variety of life in an area", "The depth of a river", "The amount of rain in one day"],
		answer: 0,
		explanation: "Biodiversity is the variety of living organisms in an area or ecosystem."
	},
	{
		question: "What is a responsible way to respond to illegal dumping?",
		options: ["Dump more waste beside it", "Report it through official local channels", "Push the waste into a drain"],
		answer: 1,
		explanation: "Use official local reporting channels so the concern can be assessed by the responsible authorities."
	},
	{
		question: "How can a community clean-up help a river?",
		options: ["By removing waste before it reaches the water", "By moving rubbish from one bank to another", "By replacing wastewater treatment"],
		answer: 0,
		explanation: "Clean-ups can remove litter from riverbanks and raise awareness, alongside broader waste and wastewater solutions."
	}
];

const quizCount = document.querySelector("#quiz-count");
const quizProgress = document.querySelector(".quiz-progress");
const quizProgressFill = document.querySelector("#quiz-progress-fill");
const quizQuestion = document.querySelector("#quiz-question");
const quizOptions = document.querySelector("#quiz-options");
const quizFeedback = document.querySelector("#quiz-feedback");
const quizNext = document.querySelector("#quiz-next");
const quizRestart = document.querySelector("#quiz-restart");
const quizResult = document.querySelector("#quiz-result");
let currentQuestion = 0;
let quizScore = 0;
let questionAnswered = false;

function renderQuizQuestion() {
	const item = quizQuestions[currentQuestion];
	questionAnswered = false;
	quizCount.textContent = `${String(currentQuestion + 1).padStart(2, "0")} / ${quizQuestions.length}`;
	quizProgress.setAttribute("aria-valuenow", String(currentQuestion));
	quizProgressFill.style.width = `${(currentQuestion / quizQuestions.length) * 100}%`;
	quizQuestion.textContent = item.question;
	quizOptions.replaceChildren();
	quizFeedback.textContent = "Select an answer to check.";
	quizFeedback.classList.remove("success", "error");
	quizResult.hidden = true;
	quizNext.hidden = true;
	quizRestart.hidden = true;
	quizOptions.hidden = false;
	quizQuestion.hidden = false;
	item.options.forEach((answer, index) => {
		const option = document.createElement("button");
		option.type = "button";
		option.className = "quiz-option";
		option.textContent = answer;
		option.addEventListener("click", () => checkQuizAnswer(index));
		quizOptions.append(option);
	});
}

function checkQuizAnswer(selectedIndex) {
	if (questionAnswered) return;
	questionAnswered = true;
	const item = quizQuestions[currentQuestion];
	const correct = selectedIndex === item.answer;
	const options = [...quizOptions.querySelectorAll(".quiz-option")];
	options.forEach((option, index) => {
		option.disabled = true;
		if (index === item.answer) option.classList.add("correct");
	});
	if (!correct) options[selectedIndex].classList.add("incorrect");
	if (correct) quizScore += 1;
	quizFeedback.textContent = `${correct ? "Correct." : "Not quite."} ${item.explanation}`;
	quizFeedback.classList.toggle("success", correct);
	quizFeedback.classList.toggle("error", !correct);
	quizNext.textContent = currentQuestion === quizQuestions.length - 1 ? "See your score →" : "Next question →";
	quizNext.hidden = false;
}

quizNext.addEventListener("click", () => {
	currentQuestion += 1;
	if (currentQuestion < quizQuestions.length) {
		renderQuizQuestion();
		return;
	}
	quizCount.textContent = "COMPLETE";
	quizProgress.setAttribute("aria-valuenow", String(quizQuestions.length));
	quizProgressFill.style.width = "100%";
	quizQuestion.hidden = true;
	quizOptions.hidden = true;
	quizFeedback.textContent = "You completed all 20 questions.";
	quizFeedback.classList.remove("success", "error");
	quizResult.textContent = `Your score: ${quizScore} out of ${quizQuestions.length}. ${quizScore === quizQuestions.length ? "Excellent work!" : "Thanks for learning about the river."}`;
	quizResult.hidden = false;
	quizNext.hidden = true;
	quizRestart.hidden = false;
});

quizRestart.addEventListener("click", () => {
	currentQuestion = 0;
	quizScore = 0;
	renderQuizQuestion();
});

renderQuizQuestion();

const projectLikeButton = document.querySelector("#project-like");
const projectLikeCount = document.querySelector("#like-count");
const projectLikeLabel = document.querySelector("#like-label");
const projectLikeHeart = document.querySelector("#like-heart");

function setProjectLiked(liked) {
	projectLikeButton.setAttribute("aria-pressed", String(liked));
	projectLikeButton.setAttribute("aria-label", `Like my project. ${liked ? 1 : 0} ${liked ? "like" : "likes"}`);
	projectLikeCount.textContent = liked ? "1" : "0";
	projectLikeLabel.textContent = liked ? "Liked" : "Like my project";
	projectLikeHeart.textContent = liked ? "♥" : "♡";
	projectLikeButton.classList.toggle("is-liked", liked);
}

try {
	setProjectLiked(localStorage.getItem("nairobi-river-project-liked") === "true");
} catch {
	setProjectLiked(false);
}

projectLikeButton.addEventListener("click", () => {
	const liked = projectLikeButton.getAttribute("aria-pressed") !== "true";
	setProjectLiked(liked);
	try {
		localStorage.setItem("nairobi-river-project-liked", String(liked));
	} catch {
		return;
	}
});
