import { withProps } from 'recompose'

const withStatProps = withProps(({ fighters, creatures }) => {
  const fightersPower = fighters.reduce((acc, f) => acc + f.power + f.bonusPower, 0)
  const fightersAgi = fighters.reduce((acc, f) => acc + f.agi + f.bonusAgi, 0)
  const fightersInt = fighters.reduce((acc, f) => acc + f.int + f.bonusInt, 0)

  const creaturesPower = creatures.reduce((acc, f) => acc + f.power, 0)
  const creaturesAgi = creatures.reduce((acc, f) => acc + f.agi, 0)
  const creaturesInt = creatures.reduce((acc, f) => acc + f.int, 0)

  return {
    fightersPower,
    fightersAgi,
    fightersInt,
    creaturesPower,
    creaturesAgi,
    creaturesInt,
    sumPower: fightersPower + creaturesPower,
    sumAgi: fightersAgi + creaturesAgi,
    sumInt: fightersInt + creaturesInt,
  }
})

export default withStatProps
