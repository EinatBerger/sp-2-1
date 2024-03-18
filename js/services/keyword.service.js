var gIsAllKeywords = false
var gKeywordSearchCountMap={}
var gKeywordSearchCountMap = {
    'funny': 8,
    'happy': 12,
    'angry': 3,
    'surprised': 2,
    'cute': 12,
    'laughing': 10,
    'famous': 16,
    'movies': 10,
    'actors': 11,
    'politicians': 4,
    'men': 14,
    'women': 2,
    'kids': 5,
    'baby': 2,
    'animals': 4,
    'dogs': 3,
    'cats': 1,
    'kiss': 2,
    'cartoon': 1
}

var gTop5Keywords = []

function top5Keywords() {
    let obj = gKeywordSearchCountMap
    // Get an array of the keys:
    let keys = Object.keys(obj)
    // Then sort by using the keys to lookup the values in the original object:
    let sortKeywords = keys.sort((a, b) => obj[b] - obj[a])
    gTop5Keywords = (sortKeywords.slice(0, 5))
}

function updateKeywordsCount(keyword) {
    gKeywordSearchCountMap[keyword]++
    
}



