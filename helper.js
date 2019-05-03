// This is a list of helper functions to be make complicated or repetitve tasks a bit easier

/*!
 * Add a new item to an object
 * 2019 Luke Davies, MIT License
 * @param  {Object} obj   The original object
 * @param  {String} key   The key for the item to add
 * @param  {Any}    value The value for the new key to add
 * @param  {Number} index The position in the object to add the new key/value pair [optional]
 * @return {Object}       An immutable clone of the original object, with the new key/value pair added
 */
var addToObject = function(obj, key, value, index) {
	// Create a temp object and index variable
	var temp = {}
	var i = 0

	// Loop through the original object
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			// If the indexes match, add the new item
			if (i === index && key && value) {
				temp[key] = value
			}

			// Add the current item in the loop to the temp obj
			temp[prop] = obj[prop]

			// Increase the count
			i++
		}
	}

	// If no index, add to the end
	if (!index && key && value) {
		temp[key] = value
	}

	return temp
}

/*!
 * Serialize all form data into an array
 * (c) 2019 Luke Davies, MIT License
 * @param  {Node}   form The form to serialize
 * @return {String}      The serialized form data
 */
var serializeArray = function(form) {
	// Setup our serialized data
	var serialized = []

	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {
		var field = form.elements[i]

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (
			!field.name ||
			field.disabled ||
			field.type === "file" ||
			field.type === "reset" ||
			field.type === "submit" ||
			field.type === "button"
		)
			continue

		// If a multi-select, get all selections
		if (field.type === "select-multiple") {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue
				serialized.push({
					name: field.name,
					value: field.options[n].value
				})
			}
		}

		// Convert field data to a query string
		else if ((field.type !== "checkbox" && field.type !== "radio") || field.checked) {
			serialized.push({
				name: field.name,
				value: field.value
			})
		}
	}

	return serialized
}

/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2019 Luke Davies, MIT License
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function(str) {
	var temp = document.createElement("div")
	temp.textContent = str
	return temp.innerHTML
}

/*!
 * Create an identical clone of an array or object
 * (c) 2019 Luke Davies, MIT License
 * @param  {Array|Object} obj The array or object to copy
 * @return {Array|Object}     The clone of the array or object
 */
var copy = function(obj) {
	return JSON.parse(JSON.stringify(obj))
}

/*!
 * Apply a CSS animation to an element
 * (c) 2019 Luke Davies, MIT License
 * @param  {Node}    elem      The element to animate
 * @param  {String}  animation The type of animation to apply
 * @param  {Boolean} hide      If true, apply the [hidden] attribute after the animation is done
 */
var animate = function(elem, animation, hide) {
	// If there's no element or animation, do nothing
	if (!elem || !animation) return

	// Remove the [hidden] attribute
	elem.removeAttribute("hidden")

	// Apply the animation
	elem.classList.add(animation)

	// Detect when the animation ends
	elem.addEventListener(
		"animationend",
		function endAnimation(event) {
			// Remove the animation class
			elem.classList.remove(animation)

			// If the element should be hidden, hide it
			if (hide) {
				elem.setAttribute("hidden", "true")
			}

			// Remove this event listener
			elem.removeEventListener("animationend", endAnimation, false)
		},
		false
	)
}

/*!
 * Check if two arrays are equal
 * (c) 2019 Luke Davies, MIT License
 * @param  {Array}   arr1 The first array
 * @param  {Array}   arr2 The second array
 * @return {Boolean}      If true, both arrays are equal
 */
var arraysMatch = function(arr1, arr2) {
	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false
	}

	// Otherwise, return true
	return true
}
