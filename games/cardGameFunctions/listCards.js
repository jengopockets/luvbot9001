function listCards(cardArray) {
    let cards = new String()
    let weight = 0
    for(i of cardArray){
        // console.log(`${i.Value}`);
        cards += `[${i.Value}] `
        weight += i.Weight
    } 
    // console.log("hand",cards);
    return {Cards: cards, Weight: weight}
    
}

exports.listCards = listCards