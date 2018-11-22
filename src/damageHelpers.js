/*
By convention, the function receives three params
1) creature to deal damage to
2) dmg to be dealt
3) whole state
*/

export const powerDmg = (creature, amount, state) => {
  creature.power -= amount
  console.log('Power' + amount)
}

export const agiDmg = (creature, amount, state) => {
  creature.agi -= amount
  console.log('Agi' + amount)
}

export const intDmg = (creature, amount, state) => {
  creature.int -= amount
  console.log('Int' + amount)
}
