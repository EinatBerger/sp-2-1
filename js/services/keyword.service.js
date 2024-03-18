var gKeywordSearchCountMap = { 
    'funny':8,
    'happy':12,
    'angry':3,
    'surprised':2,
    'cute':12,
    'laughing':10,
    'famous':16,
    'movies':10,
    'actors':11,
    'politicians':4,
    'men':14,
    'women':2,
    'kids':5,
    'baby':2,
    'animals':4,
    'dogs':3,
    'cats':1,
    'kiss':2,
    'cartoon':1     }


    function renderKeyword() {
        var keywords = Object.keys(gKeywordSearchCountMap)
        // Rendering keywords for datalist
       const strHTMLs = keywords.map(keyword => 
           `<option>${keyword}</option>`)
   
       const elSearchKeywordsList = document.querySelector('.search-keywords-list')
       elSearchKeywordsList.list.innerHTML= strHTMLs.join('')
   
       // Rendering keywords for container
       const strHTMLs2 = keywords.map(keyword => 
           `<button onclick="onSetFilterBy('${keyword}')">${keyword}</button>`)
       
       const elKeywordsContainer = document.querySelector('.keywords-container')
       elKeywordsContainer.innerHTML= strHTMLs2.join('')
   
    }