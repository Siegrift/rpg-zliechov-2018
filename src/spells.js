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
import { items } from './items'
import { createDefaultFighter, createDefaultCreature } from './store/initialState'
import { cloneDeep } from 'lodash'

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
        const levels = [null, 0.5, 1, 1.5]
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
    title: 'Dvojník',
    onInvoke: ({ creature, state }) => {
      const bodyDouble = createDefaultCreature({
        name: creature.name,
        power: creature.power,
        agi: creature.agi,
        int: creature.int,
        imageIndex: creature.imageIndex,
      })
      state.creatures.push(bodyDouble)
    },
    desc:
      'Príšera vytvorí svojho klona, ktorý má rovnaké atribúty ako ona.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Ilúzia',
    onInvoke: ({ creature, state }) => {
      const illusion = createDefaultCreature({
        name: 'Ilúzia ' + creature.name,
        power: Math.ceil(creature.power / 2),
        agi: Math.ceil(creature.agi / 2),
        int: Math.ceil(creature.int / 2),
        imageIndex: creature.imageIndex,
      })
      state.creatures.push(illusion)
    },
    desc: 'Príšera vytvorí ilúziu s polovičnými atribútmi.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Kritický úder',
    onInvoke: ({ creature, state }) => {
      let minLevel = 12
      for (const f of state.fighters) {
        if (f.race <= LAST_HERO_INDEX && f.level < minLevel) {
          minLevel = f.level
        }
      }
      let weakestHeroes = []
      for (let i = 0; i < state.fighters.length; i++) {
        if (state.fighters[i].race <= LAST_HERO_INDEX && state.fighters[i].level === minLevel) {
          weakestHeroes.push(i)
        }
      }
      helpers.removeFighter(state.fighters[weakestHeroes[Math.floor(Math.random() * weakestHeroes.length)]], state)
    },
    desc: 'Príšera udelí hrdinom kritický úder, ktorým zabije najslabšieho z nich.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Uhrančivý pohľad',
    onInvoke: ({ creature, state }) => {
      let minInt = 1000000000
      for (const f of state.fighters) {
        if (f.race <= LAST_HERO_INDEX && f.int + f.bonusInt < minInt) {
          minInt = f.int + f.bonusInt
        }
      }
      let weakestHeroes = []
      for (let i = 0; i < state.fighters.length; i++) {
        if (state.fighters[i].race <= LAST_HERO_INDEX && state.fighters[i].int + state.fighters[i].bonusInt === minInt) {
          weakestHeroes.push(i)
        }
      }
      const pickedHero = weakestHeroes[Math.floor(Math.random() * weakestHeroes.length)]
      const convertedHero = createDefaultCreature({
        name: state.fighters[pickedHero].name,
        power: state.fighters[pickedHero].power,
        agi: state.fighters[pickedHero].agi,
        int: state.fighters[pickedHero].int,
        imageIndex: 42,
      })
      helpers.removeFighter(state.fighters[pickedHero], state)
    },
    desc: 'Príšera očaruje hrdinovi s najmenšou inteligenciou, tento hrdina sa pridá na jej stranu.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Umlčanie',
    onInvoke: ({ creature, state }) => {
      const pickedHero = Math.floor(Math.random() * state.fighters.length)
      for (let i = 1; i < state.fighters[pickedHero].spellCasted.length; i++) {
        state.fighters[pickedHero].spellCasted[i] = true
      }
    },
    desc: 'Náhodne vybraný hrdina je umčaný a počas súboja nemôže hrať žiadne kúzla.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Polymorph',
    onInvoke: ({ creature, state }) => {
      const pickedHero = Math.floor(Math.random() * state.fighters.length)
      state.fighters[pickedHero].power = Math.ceil(state.fighters[pickedHero].power / 2)
      state.fighters[pickedHero].agi = Math.ceil(state.fighters[pickedHero].agi / 2)
      state.fighters[pickedHero].int = Math.ceil(state.fighters[pickedHero].int / 2)
      for (let i = 0; i < state.fighters[pickedHero].itemCasted.length; i++) {
        state.fighters[pickedHero].itemCasted[i] = true
      }
    },
    desc: 'Náhodne vybraný hrdina sa zmení na ovcu. Jeho atribúty sa znížia na polovicu a nemôže používať predmety.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Výtok many',
    onInvoke: ({ creature, state }) => {
      for (const f of state.fighters) {
        console.log(f.manaPool)
        f.manaPool -= Math.min(f.manaPool, Math.ceil(f.manaPool / 3))
        console.log(f.manaPool)
      }
    },
    desc: 'Každý hrdina stratí tretinu svojej many.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Mačacie zlato',
    onInvoke: ({}) => {},
    desc: 'Za výhru v súboji dostanete o jeden predmet menej.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Mŕtvolné ticho',
    onInvoke: ({ state }) => {
      for (const f of state.fighters) {
        for (let i = 1; i < f.spellCasted.length; i++) {
          f.spellCasted[i] = true
        }
        for (let i = 0; i < f.itemCasted.length; i++) {
          f.itemCasted[i] = true
        }
      }
    },
    desc: 'Na bojisku zavládlo neprirodzené ticho. Nemôžete čarovať a používať predmety.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Korózia',
    onInvoke: ({ state }) => {
      for (const f of state.fighters) {
        for (let i = 0; i < f.itemCasted.length; i++) {
          f.itemCasted[i] = true
        }
      }
    },
    desc: 'Nemôžete používať predmety.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Gumenné ruky',
    onInvoke: ({ state }) => {
      for (const f of state.fighters) {
        f.power = 1
      }
    },
    desc: 'Všetkým hrdinom sa základná sila zníži na 1.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Drevené ruky',
    onInvoke: ({ state }) => {
      for (const f of state.fighters) {
        f.agi = 1
      }
    },
    desc: 'Všetkým hrdinom sa základná obratnosť zníži na 1.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Oblbnutie',
    onInvoke: ({ state }) => {
      for (const f of state.fighters) {
        f.int = 1
      }
    },
    desc: 'Všetkým hrdinom sa základná inteligencia zníži na 1.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Padajúci balvan',
    onInvoke: ({ state }) => {
      for (const f of state.fighters) {
        f.power -= 5
      }
    },
    desc: 'Všetkým hrdinom sa základná inteligencia zníži na 1.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Susanno',
    onInvoke: ({ creature }) => {
      creature.power += 200
      creature.agi += 100
    },
    desc: 'Príšera je obalená do čierneho nepreniknuteľného brnenia. Získava 200 sily a 100 obratnosti.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Cthaeh',
    onInvoke: ({}) => {},
    desc: 'Povedzte vedúdemu, že príšera má tento modifikátor.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Dementorov bozk',
    onInvoke: ({ state }) => {
      for (const f of state.fighters) {
        f.agi = Math.ceil(f.agi / 2)
      }
      state.fighters[Math.floor(Math.random() * state.fighters.length)].manaPool = 0
    },
    desc: 'Obrovská zima zníži obratnosť všetkých hrdinov na polovicu. Náhodne vybraný hrdina je pobozkaný dementorom a stráca všetku manu.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Dračia koža',
    onInvoke: ({ creature }) => {
      creature.draciaKoza = true
    },
    desc: 'Všetky útoky na príšeru sú redukované na polovicu.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Zúrivosť',
    onInvoke: ({ creature }) => {
      creature.power += Math.ceil(creature.power / 2)
      creature.agi += Math.ceil(creature.agi / 2)
      creature.int += Math.ceil(creature.int / 2)
    },
    desc: 'Všetky atribúty príšery sú 1.5 násobne väčšie.',
  },
  {
    image: require('./assets/creatureSpells/sacrifice.jpg'),
    title: 'Neviditeľnosť',
    onInvoke: ({ creature, state }) => {
      let invisibility = true
      for (const f of state.fighters) {
        for (let i = 0; i < f.itemIndexes.length; i++) {
          if (items[f.itemIndexes[i]].revealsInvis) {
            invisibility = false
          }
        }
      }
      if (invisibility) {
        creature.invisible = true
      }
    },
    desc: 'Príšera je neviditeľná. Pokiaľ nemáte Prášok zviditeľnenia alebo Kryštálové oko, vaše útoky sú bez efektu.',
  },
]
