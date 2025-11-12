const shootFirework = (id) => {
  // Get target div for the firework
  const target = document.getElementById(id)
  // Create the firework div
  const div = document.createElement("div")
  div.className = "firework"
  // Insert the firework, delete afterwards
  target.appendChild(div)
  setTimeout(() => {
    div.remove()
  }, 2000);

}

export default shootFirework