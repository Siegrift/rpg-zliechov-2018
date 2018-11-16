import { withProps } from 'recompose'

const withStatProps = withProps(({ fighters, creatures }) => {
  const fightersPower = fighters.reduce((acc, f) => acc + parseInt(f.power, 10), 0)
  const fightersAgi = fighters.reduce((acc, f) => acc + parseInt(f.agi, 10), 0)
  const fightersInt = fighters.reduce((acc, f) => acc + parseInt(f.int, 10), 0)

  const creaturesPower = creatures.reduce((acc, f) => acc + parseInt(f.power, 10), 0)
  const creaturesAgi = creatures.reduce((acc, f) => acc + parseInt(f.agi, 10), 0)
  const creaturesInt = creatures.reduce((acc, f) => acc + parseInt(f.int, 10), 0)

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
