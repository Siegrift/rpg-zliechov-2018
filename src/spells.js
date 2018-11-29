import * as helpers from './helpers'
import {
  CHOOSE,
  RACES,
  LAST_HERO_INDEX,
  SUMMONS,
  ATTRIBUTES,
  UNIT_TYPES,
  FIRST_SUMMON_INDEX,
} from './constants'
import { createDefaultFighter } from './store/initialState'

/*
There are 2 categories of spells (fighter and creature). Both are represented as
array of structurally the same objects. The structure looks as this

{
  image: require(<<path_to_image>>),
  title: <<string>>,
  onInvoke: ({
    fighter: <<selected fighter>>,
    creature: <<selected creature>>,
    state: <<whole state>>
    attribute: <<index of chosen attribute (if any)>>
    chosen <<chosen object (from CHOOSE in ./constants)>>
    index: <<index of chosen spell/item>>
  }) => {
    ...
  },
  isEnabled: ({
    fighter: <<selected fighter>>,
    creature: <<selected creature>>,
    state: <<whole state>>
  }) => {
    ...
  },
  passive: <<bool>>,
  doesApply: (
    affected: <<who is affected by aura>>
    source: <<whose aura it is>>
    state: <<whole state>>
  )
  applyAura: (
    affected: <<who is affected by aura>>
    source: <<whose aura it is>>
    state: <<whole state>>
  )
}

Required fields of this object are only 'image' and 'title'. Leaving out
onInvoke means no action, and isEnabled means the spell is always available and
passive defaults to false.

To add a new spell, just add an item to the following array and code the logic
of the spell.
*/

export const fighterSpells = [
  // mage
  [
    {
      image: require('./assets/spells/uder_mag.jpg'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/mag_ohniva_gula.jpg'),
      title: 'Ohnivá guľa',
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 1
        const levels = [null, 4, 8, 12]
        const manaCost = [null, 1, 3, 6]
        const multicast = fighterSpells[fighter.race][4].generateMulticast(fighter)
        let ocista = 0
        if (creature.buffs.ocista !== undefined) {
          ocista = creature.buffs.ocista
        }
        for (let i = 0; i < multicast; i++) {
          helpers.agiDmg(creature, levels[fighter.spellLevels[spellID]] + ocista, state)
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 1
        const manaCost = [null, 1, 3, 6]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/mag_ocista.jpg'),
      title: 'Očista',
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 2
        const levelsDmg = [null, 2, 5, 8]
        const levelsPow = [null, 4, 10, 16]
        const levelsBuff = [null, 2, 4, 6]
        const manaCost = [null, 2, 5, 9]
        const multicast = fighterSpells[fighter.race][4].generateMulticast(fighter)
        for (let i = 0; i < multicast; i++) {
          helpers.agiDmg(creature, levelsDmg[fighter.spellLevels[spellID]], state)
          creature.power += levelsPow[fighter.spellLevels[spellID]]
          if (creature.buffs.ocista === undefined) creature.buffs.ocista = 0
          creature.buffs.ocista += levelsBuff[fighter.spellLevels[spellID]]
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 2
        const manaCost = [null, 2, 5, 9]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/mag_tornado.jpg'),
      title: 'Tornádo',
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 3
        const levels = [null, 1, 3, 5]
        const manaCost = [null, 2, 4, 7]
        const multicast = fighterSpells[fighter.race][4].generateMulticast(fighter)
        let ocista = 0
        if (creature.buffs.ocista !== undefined) ocista = creature.buffs.ocista
        for (let i = 0; i < multicast; i++) {
          helpers.powerDmg(creature, levels[fighter.spellLevels[spellID]], state)
          helpers.agiDmg(creature, levels[fighter.spellLevels[spellID]] + ocista, state)
          helpers.intDmg(creature, levels[fighter.spellLevels[spellID]], state)
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 3
        const manaCost = [null, 2, 4, 7]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/mag_multicast3.jpg'),
      title: 'Multicast',
      passive: true,
      generateMulticast: (fighter) => {
        const spellID = 4
        if (fighter.spellLevels[spellID] === 0) return 1
        const randomValue = Math.random()
        if (randomValue < 1 / 6) return 3
        if (randomValue < 1 / 3) return 2
        return 1
      },
      isEnabled: ({ fighter }) => {
        const spellID = 4
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
    },
  ],
  // hunter
  [
    {
      image: require('./assets/spells/uder_lovec.jpg'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/lovec_vyvolaj_medveda.jpg'),
      title: 'Zvierací spoločník',
      chooseAttribute: [true, true, false],
      onInvoke: ({ fighter, state, attribute }) => {
        const spellID = 1
        const manaCost = [null, 1, 1, 1]
        const levels = [null, 2, 4, 6]
        const pet = createDefaultFighter({
          race: RACES.HUNTERS_PET,
          imageIndex: SUMMONS.DIREWOLF,
          nick: 'Medveď',
          power: Math.ceil(fighter.power / 2),
          agi: Math.ceil(fighter.agi / 2),
          spellLevels: [1, fighter.spellLevels[3]],
          spellCasted: [false, false],
        })
        if (attribute === ATTRIBUTES.POWER) {
          pet.power += levels[fighter.spellLevels[spellID]]
        } else if (attribute === ATTRIBUTES.AGILITY) {
          pet.agi += levels[fighter.spellLevels[spellID]]
        }
        pet.owner = fighter.id
        helpers.addFighter(pet, state)
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 1
        const manaCost = [null, 1, 1, 1]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/lovec_symbioza.jpg'),
      title: 'Symbióza',
      onInvoke: ({ fighter, state }) => {
        const spellID = 2
        const manaCost = [null, 1, 2, 3]
        const levels = [null, 1, 2, 3]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
        let pet
        for (const f of state.fighters) {
          if (f.owner && f.owner === fighter.id) {
            pet = f
          }
        }
        const symbiont = createDefaultFighter({
          race: RACES.SYMBIONT,
          spellLevels: [1, fighter.spellLevels[3], fighter.spellLevels[4]],
          spellCasted: [fighter.spellCasted[0], false, fighter.spellCasted[4]],
          imageIndex: SUMMONS.SYMBIONT,
          nick: fighter.nick,
          level: fighter.level,
          power: fighter.power + pet.power,
          agi: fighter.agi + pet.agi,
          int: fighter.int + pet.int,
          manaPool: fighter.manaPool,
          itemIndexes: fighter.itemIndexes,
          itemLevels: fighter.itemLevels,
          itemCasted: fighter.itemCasted,
          buffs: fighter.buffs,
        })
        symbiont.bonusPower += levels[fighter.spellLevels[spellID]]
        symbiont.bonusAgi += levels[fighter.spellLevels[spellID]]
        symbiont.bonusInt += levels[fighter.spellLevels[spellID]]
        helpers.addFighter(symbiont, state)
        helpers.removeFighter(pet, state)
        helpers.removeFighter(fighter, state)
      },
      isEnabled: ({ fighter, state }) => {
        const spellID = 2
        const manaCost = [null, 1, 2, 3]
        let summonedPet = false
        for (const f of state.fighters) {
          if (f.owner === fighter.id) {
            summonedPet = true
          }
        }
        if (!summonedPet) {
          return false
        }
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/lovec_kriticky_uder.jpg'),
      title: 'Kritický úder',
      passive: true,
      isEnabled: ({ fighter }) => {
        const spellID = 3
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
      combatModifier: (fighter, attributes) => {
        const spellID = 3
        const levels = [null, 0.25, 0.33, 0.5]
        const randomValue = Math.random()
        if (randomValue < levels[fighter.spellLevels[spellID]]) {
          attributes.agi += fighter.agi
        }
        return attributes
      },
    },
    {
      image: require('./assets/spells/lovec_presna_muska2.png'),
      title: 'Presná muška',
      chooseAttribute: [true, true, true],
      onInvoke: ({ fighter, creature, attribute }) => {
        const spellID = 4
        const manaCost = [null, 5]
        const levels = [null, 30]
        if (attribute === ATTRIBUTES.POWER) {
          helpers.powerDmg(creature, levels[fighter.spellLevels[spellID]])
        } else if (attribute === ATTRIBUTES.AGILITY) {
          helpers.agiDmg(creature, levels[fighter.spellLevels[spellID]])
        } else if (attribute === ATTRIBUTES.INTELLIGENCE) {
          helpers.intDmg(creature, levels[fighter.spellLevels[spellID]])
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 4
        const manaCost = [null, 5]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
  ],
  // priest
  [
    {
      image: require('./assets/spells/uder_knaz.jpg'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/knaz_ladove_objatie.jpg'),
      title: 'Ľadové objatie',
      chooseAlly: CHOOSE.OTHER_HERO,
      onInvoke: ({ fighter, chosen }) => {
        const spellID = 1
        const manaCost = [null, 1, 4, 7]
        const levels = [null, 2, 6, 10]
        if (chosen.buffs.objatie === undefined || !chosen.buffs.objatie) {
          chosen.power += levels[fighter.spellLevels[spellID]]
          chosen.agi = 0
          chosen.bonusAgi = 0
          chosen.buffs.objatie = true
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 1
        const manaCost = [null, 1, 4, 7]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/knaz_ciel5.jpg'),
      title: 'Svätý cieľ',
      chooseAlly: CHOOSE.OTHER_UNIT,
      onInvoke: ({ fighter, chosen }) => {
        const spellID = 2
        const manaCost = [null, 1, 3, 6]
        const levels = [null, 1.5, 2, 2.5]
        chosen.buffs.svatyCiel = levels[fighter.spellLevels[spellID]]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 2
        const manaCost = [null, 1, 3, 6]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/knaz_pozehnanie2.jpg'),
      title: 'Aura požehnania',
      passive: true,
      isEnabled: ({ fighter }) => {
        const spellID = 3
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
      doesApply: (affected) => {
        if (affected.type === UNIT_TYPES.FIGHTER && affected.race >= FIRST_SUMMON_INDEX) {
          return true
        }
        return false
      },
      applyAura: (affected, source) => {
        const spellID = 3
        const levels = [null, 1, 3, 5]
        affected.bonusPower += levels[source.spellLevels[spellID]]
        affected.bonusAgi += levels[source.spellLevels[spellID]]
        if (affected.buffs[source.id] === undefined) {
          affected.buffs[source.id] = []
        }
        affected.buffs[source.id].push(spellID)
      },
      detachAura: (affected, source) => {
        const spellID = 3
        const levels = [null, 1, 3, 5]
        affected.bonusPower -= levels[source.spellLevels[spellID]]
        affected.bonusAgi -= levels[source.spellLevels[spellID]]
      },
    },
    {
      image: require('./assets/spells/knaz_strazny_anjel2.jpg'),
      title: 'Strážny anjel',
      onInvoke: ({ fighter, state }) => {
        const spellID = 4
        const manaCost = [null, 10]
        const angel = createDefaultFighter({
          race: RACES.GUARDIAN_ANGEL,
          imageIndex: SUMMONS.ANGEL,
          spellLevels: [1, fighter.spellLevels[3]],
          spellCasted: [false, false],
          nick: 'Strážny anjel',
          power: fighter.power,
          agi: fighter.power,
          int: fighter.int,
        })
        helpers.addFighter(angel, state)
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
        helpers.removeFighter(fighter, state)
      },
      isEnabled: ({ fighter }) => {
        const manaCost = [null, 10]
        const spellID = 4
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
  ],
  // warlock
  [
    {
      image: require('./assets/spells/uder_warlock.jpg'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/cernoknaznik_zombie.jpg'),
      title: 'Vyvolaj zombie',
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 1
        const manaCost = [null, 1, 4, 8]
        const levels = [null, 4, 8, 12]
        const f = createDefaultFighter({
          nick: 'Zombie',
          race: RACES.UNIT_WITHOUT_SPELLS,
          imageIndex: SUMMONS.ZOMBIE,
          power: levels[fighter.spellLevels[spellID]],
        })
        helpers.addFighter(f, state)
        fighter.manaPool -= fighterSpells[fighter.race][3].manaDiscount(
          fighter,
          manaCost[fighter.spellLevels[spellID]]
        )
      },
      isEnabled: ({ fighter }) => {
        const manaCost = [null, 1, 4, 8]
        const spellID = 1
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/cernoknaznik_demon.jpg'),
      title: 'Vyvolaj démona',
      onInvoke: ({ fighter, monster, state }) => {
        const spellID = 2
        const manaCost = [null, 1, 7, 12]
        const levelsInt = [null, 1, 3, 5]
        const levelsAgi = [null, 3, 6, 9]
        const f = createDefaultFighter({
          nick: 'Démon',
          race: RACES.UNIT_WITHOUT_SPELLS,
          imageIndex: SUMMONS.DEMON,
          int: levelsInt[fighter.spellLevels[spellID]],
          agi: levelsAgi[fighter.spellLevels[spellID]],
        })
        helpers.addFighter(f, state)
        fighter.manaPool -= fighterSpells[fighter.race][3].manaDiscount(
          fighter,
          manaCost[fighter.spellLevels[spellID]]
        )
      },
      isEnabled: ({ fighter }) => {
        const manaCost = [null, 1, 7, 12]
        const spellID = 2
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/cernoknaznik_obeta.jpg'),
      title: 'Krvavá obeta',
      passive: true,
      manaDiscount: (fighter, manaCost) => {
        const spellID = 3
        const levels = [null, 0.25, 0.5, 0.75]
        if (fighter.spellLevels[spellID] === 0) {
          return manaCost
        }
        const randomValue = Math.random()
        if (randomValue < levels[fighter.spellLevels[spellID]]) {
          return Math.floor(manaCost / 2)
        }
        return manaCost
      },
      isEnabled: ({ fighter }) => {
        const spellID = 3
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
    },
    {
      image: require('./assets/spells/cernoknaznik_archimond.jpg'),
      title: 'Vyvolaj Archimonda',
      chooseAlly: CHOOSE.UNIT,
      onInvoke: ({ fighter, state, chosen }) => {
        const spellID = 4
        const manaCost = [null, 16]
        const attributes = 20
        helpers.removeFighter(chosen, state)
        //state.fighters.splice(state.fighters.indexOf(chosen), 1)
        const f = createDefaultFighter({
          nick: 'Archimond',
          race: RACES.ARCHIMOND,
          imageIndex: SUMMONS.ARCHIMOND,
          spellLevels: [1, 1],
          power: attributes,
          int: attributes,
          agi: attributes,
        })
        helpers.addFighter(f, state)
        fighter.manaPool -= fighterSpells[fighter.race][3].manaDiscount(
          fighter,
          manaCost[fighter.spellLevels[spellID]]
        )
      },
      isEnabled: ({ fighter }) => {
        const manaCost = [null, 16]
        const spellID = 4
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
  ],
  // warrior
  [
    {
      image: require('./assets/spells/uder_bojovnik.jpg'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/bojovnik_vzrusenie_z_boja3.jpg'),
      title: 'Vzrušenie z boja',
      onInvoke: ({ fighter }) => {
        const levels = [null, 2, 2.5, 3]
        const manaCost = [null, 1, 1, 1]
        const spellID = 1
        fighter.power *= levels[fighter.spellLevels[spellID]]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const manaCost = [null, 1, 1, 1]
        const spellID = 1
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/bojovnik_posilnenie.jpg'),
      title: 'Posilnenie',
      onInvoke: ({ fighter }) => {
        const levels = [null, 3, 6, 9]
        const manaCost = [null, 1, 1, 2]
        const spellID = 2
        if (
          fighter.spellLevels[spellID] === 0 ||
          fighter.manaPool < manaCost[fighter.spellLevels[spellID]]
        ) {
          return
        }
        fighter.power += levels[fighter.spellLevels[spellID]]
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const manaCost = [null, 1, 1, 2]
        const spellID = 2
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
    {
      image: require('./assets/spells/bojovnik_sebavedomie.jpg'),
      title: 'Zdravé sebavedomie',
      passive: true,
      isEnabled: ({ fighter }) => {
        const spellID = 3
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
      doesApply: (affected) => {
        if (affected.type === UNIT_TYPES.FIGHTER && affected.race <= LAST_HERO_INDEX) {
          return true
        }
        return false
      },
      applyAura: (affected, source) => {
        const spellID = 3
        const levels = [null, 1.5, 3, 5]
        source.bonusPower += levels[source[fighterSpells[affected.race][spellID]]]
        if (affected.buffs[source.id] === undefined) {
          affected.buffs[source.id] = []
        }
        affected.buffs[source.id].push(spellID)
      },
      detachAura: (affected, source) => {
        const spellID = 3
        const levels = [null, 1.5, 3, 5]
        source.bonusPower -= levels[source[fighterSpells[affected.race][spellID]]]
      },
    },
    {
      image: require('./assets/spells/bojovnik_pokrik.jpg'),
      title: 'Bojový pokrik',
      onInvoke: ({ fighter, creature, state }) => {
        const spellID = 4
        const manaCost = [null, 5]
        const levels = [null, 4]
        for (const f of state.fighters) {
          f.bonusPower += levels[fighter.spellLevels[spellID]]
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 4
        const manaCost = [null, 5]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
  ],
  // symbiont
  [
    {
      image: require('./assets/spells/uder_symbiont.png'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/lovec_kriticky_uder.jpg'),
      title: 'Kritický úder',
      passive: true,
      isEnabled: ({ fighter }) => {
        const spellID = 1
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
      combatModifier: (fighter, attributes) => {
        const spellID = 1
        const levels = [null, 0.33, 0.5, 0.75]
        const randomValue = Math.random()
        if (randomValue < levels[fighter.spellLevels[spellID]]) {
          attributes.agi += fighter.agi
        }
        return attributes
      },
    },
    {
      image: require('./assets/spells/lovec_presna_muska2.png'),
      title: 'Presná muška',
      chooseAttribute: [true, true, true],
      onInvoke: ({ fighter, creature, attribute }) => {
        const spellID = 2
        const manaCost = [null, 5]
        const levels = [null, 30]
        if (attribute === ATTRIBUTES.POWER) {
          helpers.powerDmg(creature, levels[fighter.spellLevels[spellID]])
        } else if (attribute === ATTRIBUTES.AGILITY) {
          helpers.agiDmg(creature, levels[fighter.spellLevels[spellID]])
        } else if (attribute === ATTRIBUTES.INTELLIGENCE) {
          helpers.intDmg(creature, levels[fighter.spellLevels[spellID]])
        }
        fighter.manaPool -= manaCost[fighter.spellLevels[spellID]]
      },
      isEnabled: ({ fighter }) => {
        const spellID = 2
        const manaCost = [null, 5]
        return helpers.levelAndManaCostEnabled(fighter, spellID, manaCost)
      },
    },
  ],
  // summon without spells
  [
    {
      image: require('./assets/spells/uder_generic.png'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
  ],
  // Archimond
  [
    {
      image: require('./assets/spells/uder_archimond.jpg'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/plague.jpg'),
      title: 'Morová nákaza',
      passive: true,
      isEnabled: ({ fighter }) => {
        const spellID = 1
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
      doesApply: (affected) => {
        return true
      },
      applyAura: (affected, source) => {
        const spellID = 1
        const auraStrength = 1
        affected.power -= auraStrength
        affected.agi -= auraStrength
        affected.int -= auraStrength
        if (affected.buffs[source.id] === undefined) {
          affected.buffs[source.id] = []
        }
        affected.buffs[source.id].push(spellID)
      },
      detachAura: (affected, source) => {
        const auraStrength = 1
        affected.power += auraStrength
        affected.agi += auraStrength
        affected.int += auraStrength
      },
    },
  ],
  // hunter's pet
  [
    {
      image: require('./assets/spells/uder_hunters_pet.png'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/critical_strike.jpg'),
      title: 'Kritický úder',
      passive: true,
      isEnabled: ({ fighter }) => {
        const spellID = 1
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
      combatModifier: (fighter, attributes) => {
        const spellID = 1
        const levels = [null, 0.25, 0.33, 0.5]
        const randomValue = Math.random()
        if (randomValue < levels[fighter.spellLevels[spellID]]) {
          attributes.agi += fighter.agi
        }
        return attributes
      },
    },
  ],
  // guardian angel
  [
    {
      image: require('./assets/spells/angel_stike.jpg'),
      title: 'Úder',
      onInvoke: ({ fighter, creature, state }) => {
        helpers.dealCombatDamage(fighter, creature, state)
      },
    },
    {
      image: require('./assets/spells/divine_aura.jpg'),
      title: 'Božia aura požehnania',
      passive: true,
      isEnabled: ({ fighter }) => {
        const spellID = 1
        if (fighter.spellLevels[spellID] === 0) {
          return false
        }
        return true
      },
      doesApply: (affected) => {
        if (affected.type === UNIT_TYPES.FIGHTER) {
          return true
        }
        return false
      },
      applyAura: (affected, source) => {
        const spellID = 1
        const levels = [null, 1, 3, 5]
        affected.bonusPower += levels[source.spellLevels[spellID]]
        affected.bonusAgi += levels[source.spellLevels[spellID]]
        affected.bonusInt += levels[source.spellLevels[spellID]]
        if (affected.buffs[source.id] === undefined) {
          affected.buffs[source.id] = []
        }
        affected.buffs[source.id].push(spellID)
      },
      detachAura: (affected, source) => {
        const spellID = 3
        const levels = [null, 1, 3, 5]
        affected.bonusPower -= levels[source.spellLevels[spellID]]
        affected.bonusAgi -= levels[source.spellLevels[spellID]]
        affected.bonusInt -= levels[source.spellLevels[spellID]]
      },
    },
  ],
]

export const creatureSpells = [
  {
    image: require('./assets/creatureSpells/fireSword.png'),
    title: 'Fire strike',
    onInvoke: ({ fighter }) => {
      fighter.power -= 10
    },
    desc:
      'Fire strike has hit bla bla and this caused and immerse pain to bla bla so this resulte in this buff...',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Sacrifice',
    onInvoke: ({ fighter }) => {
      fighter.power -= 10
    },
    desc: 'Lorem ipsum dolor sit amet',
  },
]
