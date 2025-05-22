 
if ('fetch' in window && 'DOMParser' in window) {
  document.addEventListener('submit', addPlaylist)

  async function addPlaylist(event) {
    const form = event.target

    if (!form.hasAttribute('data-enhanced')) return

    const responseDOM = await fetchDOM()
    updateDom(responseDOM)

    // Functions in the scope of the addPlaylist function: fetchDOM and updateDOM
    // ... so they can use the **event** en **form** variables from teh addPlaylist scope
    // This could be optimized later by making these functions more generic
    // ... so they could be used in other places as well 
    async function fetchDOM(){
      form.classList.add("load-state")

      let formData = new FormData(form)

      if (event.submitter) formData.append(event.submitter.name, event.submitter.value)

      const response = await fetch(form.action, {
        method: form.method,
        body: new URLSearchParams(new FormData(form))
      })

      const responseText = await response.text()

      const parser = new DOMParser()
      const responseDOM = parser.parseFromString(responseText, 'text/html')

      form.classList.remove("load-state")

      //responseDOM is returned so it can be used by the updateDOM
      return responseDOM
    }

    function updateDom(responseDOM){
      // dom update
      const newState = responseDOM.querySelector('[data-enhanced="' + form.getAttribute('data-enhanced') + '"]')
      const newPlaylist = responseDOM.querySelector('#playlists li:last-of-type')

      form.classList.remove("load-state")
      newState.classList.add('succes-state')
    
      let playlists = document.querySelector("#playlists")
      playlists.insertAdjacentElement("beforeend", newPlaylist)
      form.outerHTML = newState.outerHTML
    } 

    // defensive coding; only preventing HTML default behaviour if all JavaScript is working!
    event.preventDefault()
  }
}