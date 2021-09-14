function slots(){
    // const slotImage = [':)', ':(', ':D', '>(' ,':|' ,'O_o', '<3', 'funs1zHowdy']
    const slotImage = ['funs1zMoomoo', 'funs1zHype', 'funs1zLove','funs1zHowdy', 'funs1zRage']
    const slotOne = slotImage[Math.floor(Math.random() * slotImage.length)]
    const slotTwo = slotImage[Math.floor(Math.random() * slotImage.length)]
    const slotThree = slotImage[Math.floor(Math.random() * slotImage.length)]

    return [slotOne, slotTwo, slotThree]
}
exports.slots = slots