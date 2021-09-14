function createPlayer(playerName) {
    let player = {
        name: playerName,
        hand: new Array()
    }
    return player
}

exports.createPlayer = createPlayer