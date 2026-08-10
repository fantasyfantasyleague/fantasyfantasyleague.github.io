// ============================================================
// FEATURE FLAGS
// ============================================================
const ALLOW_NEW_GAME = true;
const ALLOW_LOCAL_PLAY = false;
const ALLOW_CONSOLE_COMMANDS = false;
const USE_NEW_COMBAT = true; // true = Mordheim-style hit/wound rolls, false = classic opposed roll

// ============================================================
// CONSTANTS
// ============================================================
const PLAYER_COLORS = ['#2600ff', '#FF2222', '#00CC44', '#ff27db'];
const PLAYER_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
const NPC_PLAYER_ID = -1;
const BEAST_COLOR = '#9932CC';

//WEAPON CONSTANTS
const MELEE_1H_WEAPON_TYPES = ['1h_sword', 'dagger', '1h_axe', '1h_mace', '1h_polearm', 'club', 'fist'];
const MELEE_2H_WEAPON_TYPES = ['2h_sword', '2h_axe', '2h_mace', '2h_polearm', 'staff'];
const ALL_MELEE_WEAPON_TYPES = MELEE_1H_WEAPON_TYPES.concat(MELEE_2H_WEAPON_TYPES);
const RANGED_WEAPON_TYPES = ['bow','thrown','firearm'];
const ALL_PHYSICAL_WEAPON_TYPES = ALL_MELEE_WEAPON_TYPES.concat(RANGED_WEAPON_TYPES);
const MAGIC_WEAPON_TYPES = ['magical_staff','wand','tome', 'staff']; // incl melee staves here since they fit magic characters

//ARMOR CONSTANTS
const CLOTH_ARMOR_TYPES = ['cloth'];
const LEATHER_ARMOR_TYPES = ['cloth','leather'];
const MAIL_ARMOR_TYPES = ['cloth','leather','mail'];
const PLATE_ARMOR_TYPES = ['cloth','leather','mail','plate'];

//passive constants:
const REFLECT_CHANCE = .35; // Chance for reflect passive to trigger (0.35 = 35%)

const FACTIONS = {
  goblins: {
    name: 'Goblins', prefix: 'Goblin',
    chars: { worker: 'g', warrior: 'ǧ', mage: 'ġ', elite: 'Ǥ', hero: 'G' },
    unitOverrides: {
      worker:  { 
        hp: 3, movement: 4, attack: 1, defense: 0, str: 0, agi: 4, con: 0, int: 2,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES } 
      },
      warrior: {
        hp: 6, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 0,
        startingEquipment: { mainhand: 'poisoned_dagger' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(RANGED_WEAPON_TYPES).concat(['shield']), armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Hexer',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Assassin', hp: 11, movement: 6, attack: 3, defense: 1, str: 2, agi: 4, con: 0, int: 1,
        passives: ['piercing'],
        cost: { wood: 4, stone: 2, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'shadow_dagger' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES, armor: PLATE_ARMOR_TYPES }
      },
    },
    heroes: {
      goblin_shadowblade: {
        name: 'Shadowblade', char: 'G',
        hp: 11, movement: 6, attack: 3, defense: 2, str: 2, agi: 4, con: 0, int: 1,
        passives: ['slippery'],
        startingEquipment: { mainhand: 'poisoned_dagger', offhand: 'buckler' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(['shield']).concat(RANGED_WEAPON_TYPES), armor: MAIL_ARMOR_TYPES },
        ability: { id: 'shadowstep', name: 'Shadowstep', desc: 'Teleport to an enemy within 10 tiles and strike with a guaranteed critical hit. 3 turn CD.' },
        description: 'A masterful rogue who slips past any defense.'
      },
      goblin_hexweaver: {
        name: 'Hexweaver', char: 'Ğ',
        hp: 8, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 4,
        passives: ['hexweaver_curse'],
        startingEquipment: { mainhand: 'fire_wand' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES },
        ability: { id: 'hex_curse', name: 'Hex', desc: 'Hex an enemy within 3 tiles: 1 dmg/turn for 5 turns. +1 dmg for each other DoT on the target (Poison, Burning, Bleeding). 2 turn CD.' },
        description: 'A cunning hexcaster who weakens foes from afar.'
      },
      goblin_ratking: {
        name: 'Ratking', char: 'Ĝ',
        hp: 18, movement: 5, attack: 2, defense: 2, str: 2, agi: 3, con: 0, int: 0,
        passives: ['pestilence'],
        startingEquipment: { mainhand: 'poisoned_dagger', offhand: 'buckler' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'summon_swarm', name: 'Summon Swarm', desc: 'Deal 2 damage to all adjacent enemies and poison survivors for 2 turns' },
        description: 'Lord of vermin. Surrounds foes with biting swarms.'
      }
    },
    forgeBonusItems: []
  },
  humans: {
    name: 'Humans', prefix: 'Human',
    chars: { worker: 'p', warrior: '♟', mage: 'ĥ', elite: '⚜', hero: '♚' },
    unitOverrides: {
      worker: {
        hp: 5, movement: 3, attack: 1, defense: 0, str: 1, agi: 1, con: 0, int: 2,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 9, movement: 4, attack: 2, defense: 2, str: 2, agi: 1, con: 0, int: 0,
        startingEquipment: { mainhand: 'short_sword', offhand: 'wooden_shield' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: MAIL_ARMOR_TYPES }
      },
      mage: {
        name: 'Mage',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Knight', hp: 13, movement: 5, attack: 3, defense: 3, str: 3, agi: 2, con: 0, int: 0,
        passives: ['momentum'],
        cost: { wood: 5, stone: 3, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'spear', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES }
      },
    },
    heroes: {
      human_wizard: {
        name: 'Wizard', char: '♆',
        hp: 13, movement: 5, attack: 2, defense: 1, str: 1, agi: 1, con: 0, int: 4,
        passives: ['mirrored'],
        startingEquipment: { body: 'simple_robe', mainhand: 'fire_wand' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES },
        ability: { id: 'mirror_image', name: 'Mirror Image', desc: 'Summon a mirror copy of yourself on an adjacent empty tile. The copy has 1 HP.' },
        description: 'A master of illusion. His mirror image echoes his magic.'
      },
      human_paladin: {
        name: 'Paladin', char: '♔',
        hp: 19, movement: 4, attack: 3, defense: 4, str: 3, agi: 1, con: 0, int: 1,
        passives: ['holy_wrath'],
        startingEquipment: { mainhand: 'mace', offhand: 'wooden_shield' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'consecrate', name: 'Consecrate', desc: 'Deal 1 damage and Weaken all enemies within 1 tile. Lasts 3 turns.' },
        description: 'A holy warrior who consecrates the ground beneath his foes.'
      },
      human_ranger: {
        name: 'Ranger', char: '♞',
        hp: 12, movement: 6, attack: 3, defense: 2, str: 2, agi: 4, con: 0, int: 1,
        passives: ['relentless_assault'],
        startingEquipment: { body: 'leather_vest', mainhand: 'longbow', offhand: '_two_handed_' },
        proficiencies: { weapons: RANGED_WEAPON_TYPES.concat(MELEE_1H_WEAPON_TYPES), armor: MAIL_ARMOR_TYPES },
        ability: { id: 'aimed_shot', name: 'Aimed Shot', desc: 'Fire a carefully aimed arrow at a target within range. Guaranteed to hit (skips hit roll), but damage is rolled normally against defense.' },
        description: 'A peerless archer. Never misses the mark.'
      }
    },
    forgeBonusItems: []
  },
  elves: {
    name: 'Elves', prefix: 'Elf',
    chars: { worker: 'e', warrior: '➶', mage: 'ë', elite: '☘', hero: '✦' },
    unitOverrides: {
      worker: {
        hp: 3, movement: 3, attack: 1, defense: 0, str: 0, agi: 3, con: 0, int: 3,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 7, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 1,
        startingEquipment: { mainhand: 'longbow', offhand: '_two_handed_' },
        proficiencies: { weapons: RANGED_WEAPON_TYPES.concat(MELEE_1H_WEAPON_TYPES), armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Spellweaver',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Druid', hp: 11, movement: 5, attack: 2, defense: 2, str: 1, agi: 3, con: 0, int: 3,
        passives: ['regeneration'],
        cost: { wood: 3, stone: 2, gold: 1, water: 0 },
        startingEquipment: { mainhand: 'wooden_stick' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']).concat(MAGIC_WEAPON_TYPES), armor: MAIL_ARMOR_TYPES }
      },
    },
    heroes: {
      elf_windwalker: {
        name: 'Windwalker', char: '✦',
        hp: 13, movement: 6, attack: 3, defense: 2, str: 2, agi: 4, con: 0, int: 2,
        passives: ['windworks'],
        startingEquipment: { body: 'leather_vest', mainhand: 'elven_greatbow', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES, armor: MAIL_ARMOR_TYPES },
        ability: { id: 'elf_leap', name: 'Leap', desc: 'Jump over a 1-thick obstacle to land on the other side' },
        description: 'Graceful and elusive. Dances across the battlefield.'
      },
      elf_duskweaver: {
        name: 'Duskweaver', char: '✧',
        hp: 10, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 3,
        passives: ['dark_purpose'],
        startingEquipment: { body: 'simple_robe', mainhand: 'gnarled_staff', offhand: '_two_handed_' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES },
        ability: { id: 'arcane_blast', name: 'Arcane Blast', desc: 'Hurl arcane energy at a target within 3 tiles. Deals 4 damage and inflicts Burning. Hit chance scales with INT (9% per point, max 80%).' },
        description: 'A sorceress whose magic grows deadlier with knowledge.'
      },
      elf_sentinel: {
        name: 'Sentinel', char: '✯',
        hp: 16, movement: 5, attack: 3, defense: 3, str: 2, agi: 3, con: 0, int: 1,
        passives: ['double_strike'],
        startingEquipment: { body: 'leather_vest', mainhand: 'short_sword', offhand: 'parrying_dagger' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES, armor: MAIL_ARMOR_TYPES },
        ability: { id: 'blade_dance', name: 'Blade Dance', desc: 'Attack all adjacent enemies simultaneously (one roll each)' },
        description: 'A whirling storm of steel. Strikes all who stand near.'
      }
    },
    forgeBonusItems: []
  },
  orcs: {
    name: 'Orcs', prefix: 'Orc',
    chars: { worker: 'o', warrior: 'ø', mage: 'ó', elite: 'Ø', hero: '☠' },
    unitOverrides: {
      worker: {
        hp: 6, movement: 2, attack: 2, defense: 0, str: 2, agi: 0, con: 0, int: 1,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 12, movement: 3, attack: 3, defense: 2, str: 3, agi: 0, con: 0, int: 0,
        startingEquipment: { mainhand: 'hand_axe' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: MAIL_ARMOR_TYPES }
      },
      mage: {
        name: 'Warlock',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Berserker', hp: 13, movement: 3, attack: 4, defense: 1, str: 4, agi: 1, con: 0, int: 0,
        passives: ['executioner'],
        cost: { wood: 5, stone: 3, gold: 3, water: 0 },
        startingEquipment: { mainhand: 'broad_sword', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES, armor: PLATE_ARMOR_TYPES }
      },
    },
    heroes: {
      orc_warchief: {
        name: 'Warchief', char: '⛓︎',
        hp: 18, movement: 4, attack: 4, defense: 3, str: 4, agi: 1, con: 0, int: 0,
        passives: ['sanguine_feast'],
        startingEquipment: { mainhand: 'broad_sword', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'bloodrend', name: 'Bloodrend', desc: 'Deal 5 damage to an adjacent bleeding enemy (no normal attack damage)' },
        description: 'Feeds on the blood of his foes. Grows stronger as enemies bleed.'
      },
      orc_bloodrager: {
        name: 'Bloodrager', char: '⚔',
        hp: 18, movement: 3, attack: 5, defense: 2, str: 5, agi: 0, con: 0, int: 0,
        passives: ['bloodlust'],
        startingEquipment: { legs: 'iron_greaves', mainhand: 'broad_sword', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'blood_frenzy', name: 'Blood Frenzy', desc: 'Gain +4 ATK this turn; if you kill an enemy, heal to full HP and cooldown resets (3 turn CD only if no kill)' },
        description: 'Unstoppable when enraged. Heals through slaughter.'
      },
      orc_shaman: {
        name: 'Beastmaster', char: '☣',
        hp: 16, movement: 4, attack: 3, defense: 2, str: 2, agi: 1, con: 0, int: 3,
        passives: ['pack_guardian'],
        startingEquipment: { mainhand: 'staff_of_wisdom', body: 'simple_robe', offhand: '_two_handed_' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES.concat(ALL_PHYSICAL_WEAPON_TYPES), armor: LEATHER_ARMOR_TYPES },
        ability: { id: 'tame_beast', name: 'Tame Beast', desc: 'Tame an adjacent Foul Beast, Warg, or Hydra, converting it to your team. Only one tamed creature at a time.' },
        description: 'Whispers to wild creatures, bending them to his will.'
      }
    },
    forgeBonusItems: []
  },
  dwarves: {
    name: 'Dwarves', prefix: 'Dwarf',
    chars: { worker: 'd', warrior: '⚒', mage: 'ď', elite: 'ᛟ', hero: '⛏' },
    unitOverrides: {
      worker: {
        hp: 7, movement: 2, attack: 1, defense: 0, str: 1, agi: 0, con: 0, int: 2,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 12, movement: 3, attack: 2, defense: 3, str: 2, agi: 0, con: 0, int: 0,
        startingEquipment: { mainhand: 'mace', offhand: 'buckler' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(['shield']), armor: MAIL_ARMOR_TYPES }
      },
      mage: {
        name: 'Runecaster',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Runeguard', hp: 13, movement: 3, attack: 2, defense: 4, str: 2, agi: 0, con: 0, int: 1,
        passives: ['bulwark'],
        cost: { wood: 5, stone: 4, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'mace', offhand: 'buckler' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']).concat(MAGIC_WEAPON_TYPES), armor: PLATE_ARMOR_TYPES }
      },
    },
    heroes: {
      dwarf_forgemaster: {
        name: 'Forgemaster', char: '⛏',
        hp: 19, movement: 3, attack: 3, defense: 4, str: 3, agi: 0, con: 0, int: 1,
        passives: ['resource_gathering'],
        startingEquipment: { feet: 'leather_boots', legs: 'iron_greaves', mainhand: 'war_pick' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'dwarf_muster', name: 'Muster', desc: 'New units can spawn near the hero instead of home base this turn' },
        description: 'Master of the forge. Rallies workers wherever he stands.'
      },
      dwarf_ironclad: {
        name: 'Ironclad', char: '🛡︎',
        hp: 19, movement: 3, attack: 2, defense: 5, str: 2, agi: 0, con: 0, int: 0,
        passives: ['spongey'],
        startingEquipment: { mainhand: 'mace', offhand: 'iron_shield' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'shield_bash', name: 'Shield Bash', desc: 'Slam an adjacent enemy with your shield. Deals DEF damage, pushes them 2 tiles, and stuns for 1 turn' },
        description: 'An immovable bulwark. Nothing gets past Thora.'
      },
      dwarf_runesmith: {
        name: 'Runesmith', char: '⚗',
        hp: 17, movement: 3, attack: 2, defense: 3, str: 2, agi: 0, con: 0, int: 3,
        passives: ['lucky_rune'],
        startingEquipment: { mainhand: 'enchanted_scepter', offhand: 'healing_totem' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']).concat(MAGIC_WEAPON_TYPES), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'rune_of_shatter', name: 'Rune of Shatter', desc: 'Shatter the armor of all adjacent enemies: -4 DEF for 2 turns' },
        description: 'Inscribes runes that crack armor asunder.'
      }
    },
    forgeBonusItems: []
  },
  skeletons: {
    name: 'Skeletons', prefix: 'Skeleton',
    chars: { worker: 's', warrior: 'ş', mage: 'š', elite: '☬', hero: '💀' },
    unitOverrides: {
      worker: {
        hp: 2, movement: 3, attack: 1, defense: 0, str: 0, agi: 2, con: 0, int: 2,
        cost: { wood: 2, stone: 0, gold: 0, water: 0 },
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 6, movement: 4, attack: 3, defense: 1, str: 2, agi: 2, con: 0, int: 0,
        cost: { wood: 1, stone: 1, gold: 0, water: 0 },
        startingEquipment: { mainhand: 'short_sword', offhand: 'buckler' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: MAIL_ARMOR_TYPES }
      },
      mage: {
        name: 'Gravecaller',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Revenant', hp: 11, movement: 4, attack: 3, defense: 2, str: 3, agi: 1, con: 0, int: 1,
        passives: ['retaliate'],
        cost: { wood: 4, stone: 3, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'broad_sword', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES }
      },
    },
    heroes: {
      skeleton_bonelord: {
        name: 'Bonelord', char: '☠',
        hp: 14, movement: 4, attack: 3, defense: 2, str: 2, agi: 2, con: 0, int: 2,
        passives: ['bone_collector'],
        startingEquipment: { body: 'simple_robe', mainhand: 'enchanted_scepter' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES.concat(['shield']).concat(MELEE_1H_WEAPON_TYPES).concat(MELEE_2H_WEAPON_TYPES), armor: LEATHER_ARMOR_TYPES },
        ability: { id: 'raise_dead', name: 'Raise Dead', desc: 'Summon a free Shambling Corpse on an adjacent empty tile. 2 turn CD.' },
        description: 'Raises the fallen to swell the undead ranks.'
      },
      skeleton_lich: {
        name: 'Lich', char: '♝',
        hp: 11, movement: 4, attack: 2, defense: 1, str: 1, agi: 2, con: 0, int: 5,
        passives: ['magic_resistance', 'hungering_soul'],
        startingEquipment: { mainhand: 'staff_of_wisdom', body: 'simple_robe', offhand: '_two_handed_' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES.concat(['shield']), armor: CLOTH_ARMOR_TYPES },
        ability: { id: 'soul_siphon', name: 'Soul Siphon', desc: 'Drain 4 HP from a target within 3 tiles, healing self for the amount drained' },
        description: 'Drains the living to sustain her undying form.'
      },
      skeleton_deathknight: {
        name: 'Death Knight', char: '☖',
        hp: 16, movement: 4, attack: 4, defense: 3, str: 3, agi: 1, con: 0, int: 1,
        passives: ['shamble_on'],
        startingEquipment: { head: 'iron_helm', mainhand: 'broad_sword', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'bone_explosion', name: 'Bone Explosion', desc: 'Sacrifice an adjacent allied unit to deal 5 damage to all enemies within 2 tiles' },
        description: 'Detonates the fallen. Every skeleton is a weapon.'
      }
    },
    forgeBonusItems: []
  },
  trolls: {
    name: 'Trolls', prefix: 'Troll',
    chars: { worker: 'ŧ', warrior: 'Ŧ', mage: 'ť', elite: '₮', hero: '🧌' },
    unitOverrides: {
      worker: {
        hp: 8, movement: 2, attack: 2, defense: 0, str: 2, agi: 0, con: 0, int: 0,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 15, movement: 2, attack: 3, defense: 2, str: 3, agi: 0, con: 0, int: 0,
        startingEquipment: { mainhand: 'hand_axe' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES, armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Witch Doctor',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Brute', hp: 15, movement: 2, attack: 4, defense: 3, str: 4, agi: 0, con: 0, int: 0,
        passives: ['extended_reach'],
        cost: { wood: 5, stone: 4, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'warhammer', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES, armor: MAIL_ARMOR_TYPES }
      },
    },
    heroes: {
      troll_warlord: {
        name: 'Warlord', char: '☰',
        hp: 27, movement: 4, attack: 2, defense: 3, str: 4, agi: 0, con: 0, int: 0,
        passives: ['hunger'],
        startingEquipment: { mainhand: 'hand_axe'},
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'devour', name: 'Devour', desc: 'Eat an adjacent enemy below 25% HP or an adjacent ally, instantly killing them and healing for their remaining HP' },
        description: 'A ravenous beast. Swallows his foes whole.'
      },
      troll_berserker: {
        name: 'Berserker', char: '☱',
        hp: 24, movement: 3, attack: 1, defense: 2, str: 5, agi: 1, con: 0, int: 0,
        passives: ['dual_grip'],
        startingEquipment: { mainhand: 'broad_sword', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: LEATHER_ARMOR_TYPES },
        ability: { id: 'troll_rampage', name: 'Rampage', desc: 'Charge up to 3 tiles in a straight line, dealing 4 damage to the first enemy hit and pushing them 1 tile' },
        description: 'A freight train of rage. Everything in his path is flattened.'
      },
      troll_shaman: {
        name: 'Shaman', char: '☷',
        hp: 19, movement: 3, attack: 3, defense: 3, str: 2, agi: 0, con: 0, int: 3,
        passives: ['trollblood_aura'],
        startingEquipment: { mainhand: 'staff_of_wisdom', offhand: '_two_handed_' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES.concat(RANGED_WEAPON_TYPES).concat(['shield']), armor: MAIL_ARMOR_TYPES },
        ability: { id: 'seizing_totem', name: 'Seizing Totem', desc: 'Place a totem on an adjacent tile (15 HP). Enemies within 2 tiles cannot leave; enemies outside cannot enter. Use Retrieve Totem to pick it up.' },
        description: 'Blesses allies with the regenerative power of trollkind.'
      }
    },
    forgeBonusItems: []
  },
  bards: {
    name: 'Bard Guild', prefix: 'Bard',
    chars: { worker: '♩', warrior: '♫', mage: '♪', elite: '♬', hero: '🎵' },
    unitOverrides: {
      worker: {
        hp: 3, movement: 3, attack: 1, defense: 0, str: 0, agi: 2, con: 0, int: 3,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 6, movement: 4, attack: 1, defense: 1, str: 0, agi: 2, con: 0, int: 2,
        startingEquipment: { mainhand: 'shortbow', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['instrument']), armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Songweaver',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Virtuoso', hp: 11, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 3,
        passives: ['bardic_wisdom'],
        cost: { wood: 3, stone: 2, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'throwing_knives', offhand: 'main_gauche' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['instrument']), armor: MAIL_ARMOR_TYPES }
      },
    },
    heroes: {
      bard_maestro: {
        name: 'Maestro', char: '𝄞',
        hp: 11, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 4,
        passives: ['bardic_inspiration'],
        startingEquipment: { mainhand: 'lute', body: 'chain_mail', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['instrument']), armor: MAIL_ARMOR_TYPES },
        ability: { id: 'mimic', name: 'Sight Read', desc: 'Stand adjacent to any unit (ally or enemy) and copy their last used ability. Hold it until you use it.' },
        description: 'Echoes any melody he hears — and plays it back better.'
      },
      bard_drummer: {
        name: 'Drummer', char: '⯗',
        hp: 14, movement: 4, attack: 2, defense: 2, str: 2, agi: 2, con: 0, int: 2,
        passives: ['bardic_dance'],
        startingEquipment: { body: 'leather_vest', mainhand: 'harp', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['instrument']).concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'cadence_of_haste', name: 'Cadence of Haste', desc: 'Grant an adjacent ally an immediate bonus action — they can move and attack again this turn' },
        description: 'His rhythm grants allies a second wind.'
      },
      bard_siren: {
        name: 'Siren', char: '☊',
        hp: 9, movement: 5, attack: 1, defense: 1, str: 0, agi: 4, con: 0, int: 5,
        passives: ['enchanting_song'],
        startingEquipment: { mainhand: 'wand_of_draining', body: 'simple_robe' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES.concat(['instrument']).concat(RANGED_WEAPON_TYPES), armor: CLOTH_ARMOR_TYPES },
        ability: { id: 'lullaby', name: 'Lullaby', desc: 'Beguile all adjacent enemies for 2 turns — they can move but cannot attack, retaliate, or use abilities' },
        description: 'Her voice lulls foes into a helpless slumber.'
      }
    },
    forgeBonusItems: []
  },
  kobolds: {
    name: 'Kobolds', prefix: 'Kobold',
    chars: { worker: 'k', warrior: 'ḱ', mage: 'ḳ', elite: 'ǩ', hero: '🐉' },
    unitOverrides: {
      worker: {
        hp: 3, movement: 4, attack: 1, defense: 0, str: 0, agi: 3, con: 0, int: 3,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 5, movement: 4, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 1,
        startingEquipment: { mainhand: 'poisoned_dagger', offhand: 'buckler' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Scalecaster',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Sapper', hp: 11, movement: 5, attack: 3, defense: 1, str: 2, agi: 4, con: 0, int: 1,
        passives: ['climbing'],
        cost: { wood: 3, stone: 2, gold: 2, water: 0 },
        startingEquipment: { body: 'leather_vest', mainhand: 'poisoned_dagger', offhand: 'buckler' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: MAIL_ARMOR_TYPES },
      },
    },
    heroes: {
      kobold_saboteur: {
        name: 'Saboteur', char: '⥀',
        hp: 11, movement: 5, attack: 3, defense: 1, str: 2, agi: 4, con: 0, int: 1,
        passives: ['demolitionist'],
        startingEquipment: { mainhand: 'poisoned_dagger', offhand: 'buckler' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: MAIL_ARMOR_TYPES },
        ability: { id: 'tunnel_a', name: 'Tunnel Entrance A', desc: 'Dig a tunnel entrance on an adjacent empty tile. Use Tunnel Entrance B to create the exit. Kobold units can travel between A and B instantly.' },
        ability2: { id: 'tunnel_b', name: 'Tunnel Entrance B', desc: 'Dig a second tunnel entrance on an empty tile within 5 tiles. Kobold units can travel between A and B instantly.' },
        description: 'A sneaky sapper. Tunnels behind enemy lines and blows up their buildings.'
      },
      kobold_tinker: {
        name: 'Tinker', char: '⚙',
        hp: 9, movement: 5, attack: 1, defense: 1, str: 0, agi: 3, con: 0, int: 4,
        passives: ['resource_gathering'],
        startingEquipment: { accessory: 'lucky_charm' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(MAGIC_WEAPON_TYPES).concat(['shield']), armor: LEATHER_ARMOR_TYPES },
        ability: { id: 'scavenge', name: 'Scavenge', desc: 'Find a random item from the loot table and add it to inventory' },
        description: 'Finds treasure where others see only trash.'
      },
      kobold_trapmaster: {
        name: 'Trapmaster', char: '⟰',
        hp: 10, movement: 5, attack: 2, defense: 1, str: 1, agi: 4, con: 0, int: 2,
        passives: [],
        startingEquipment: { mainhand: 'throwing_knives', accessory: 'cloak_pin_of_shadows' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'booby_trap', name: 'Booby Trap', desc: 'Place a hidden trap on an adjacent empty tile. Enemies stepping on it take 5 damage and are Ensnared for 2 turns' },
        ability2: { id: 'camouflage', name: 'Camouflage', desc: 'Disguise yourself as a tree. If you stay still for 2 turns, gain Deadly Focus (guaranteed crit). Moving or attacking breaks camouflage.' },
        description: 'Every step could be your last around Snapjaw.'
      }
    },
    forgeBonusItems: []
  },
  nomads: {
    name: 'Nomads', prefix: 'Nomad',
    chars: { worker: 'n', warrior: 'ñ', mage: 'ń', elite: 'Ñ', hero: '🏇' },
    unitOverrides: {
      worker: {
        hp: 4, movement: 4, attack: 1, defense: 0, str: 0, agi: 3, con: 0, int: 2,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 8, movement: 5, attack: 2, defense: 1, str: 1, agi: 2, con: 0, int: 0,
        startingEquipment: { mainhand: 'scimitar', offhand: 'buckler' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(RANGED_WEAPON_TYPES), armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Sand Mystic',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Horseman', hp: 12, movement: 6, attack: 4, defense: 2, str: 2, agi: 3, con: 0, int: 0,
        passives: ['sundering_blows'],
        cost: { wood: 4, stone: 3, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'spear', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(RANGED_WEAPON_TYPES).concat(['shield']), armor: MAIL_ARMOR_TYPES }
      },
    },
    heroes: {
      nomad_steppe_lord: {
        name: 'Steppe Lord', char: '✹',
        hp: 15, movement: 6, attack: 4, defense: 3, str: 3, agi: 3, con: 1, int: 0,
        passives: ['unstoppable_force'],
        startingEquipment: { mainhand: 'scimitar', offhand: 'buckler' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES },
        ability: { id: 'forge_barrel', name: 'Craft Explosive Barrel', desc: 'Generate an Explosive Barrel in your inventory. Use the barrel to place it on an adjacent tile. It explodes when attacked, dealing 8 damage in a 2-tile radius.' },
        description: 'A warlord of the open plains. Crafts explosive barrels to devastate foes.'
      },
      nomad_bandit_king: {
        name: 'Bandit King', char: '🗡',
        hp: 13, movement: 5, attack: 3, defense: 2, str: 2, agi: 4, con: 0, int: 1,
        passives: ['potent_formula'],
        startingEquipment: { mainhand: 'poisoned_dagger', offhand: 'parrying_dagger' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(RANGED_WEAPON_TYPES), armor: LEATHER_ARMOR_TYPES },
        ability: { id: 'poisonous_shiv', name: 'Poisonous Shiv', desc: 'Instantly inflict 5 stacks of Poison on an adjacent enemy' },
        description: 'A ruthless brigand lord. One strike from his venom-laced blade seals your fate.'
      },
      nomad_seer: {
        name: 'Seer', char: '👁',
        hp: 10, movement: 5, attack: 1, defense: 1, str: 0, agi: 2, con: 1, int: 4,
        passives: ['foresight'],
        startingEquipment: { mainhand: 'staff_of_wisdom', body: 'simple_robe', offhand: '_two_handed_' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES.concat(['shield']), armor: CLOTH_ARMOR_TYPES },
        ability: { id: 'rescue', name: 'Rescue', desc: 'Teleport to any ally on the map and heal them for 10 HP' },
        description: 'A mystic who sees through space itself. No ally is ever truly alone.'
      }
    },
    forgeBonusItems: []
  },
  trade_guild: {
    name: 'Trade Guild', prefix: 'Guild',
    chars: { worker: 't', warrior: '₸', mage: 'ţ', elite: '₲', hero: '💰' },
    unitOverrides: {
      worker: {
        hp: 4, movement: 3, attack: 1, defense: 0, str: 0, agi: 2, con: 0, int: 3,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 8, movement: 4, attack: 2, defense: 2, str: 1, agi: 2, con: 0, int: 1,
        startingEquipment: { mainhand: 'short_sword', offhand: 'buckler' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(['bow','thrown','shield']), armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Arcanist',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Hired Guard', hp: 12, movement: 4, attack: 3, defense: 3, str: 2, agi: 2, con: 0, int: 1,
        passives: ['overwatch'],
        cost: { wood: 3, stone: 2, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'shortbow', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: LEATHER_ARMOR_TYPES }
      },
    },
    heroes: {
      guild_magnate: {
        name: 'Bejeweled Magnate', char: '◈',
        hp: 12, movement: 4, attack: 1, defense: 1, str: 0, agi: 2, con: 1, int: 3,
        passives: ['midas_touch', 'multi_action'],
        startingEquipment: { accessory: 'lucky_charm' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(RANGED_WEAPON_TYPES).concat(['shield']).concat(MAGIC_WEAPON_TYPES), armor: [] },
        extraSlots: { offhand: 1, accessory: 4 },
        blockedSlots: ['head', 'body', 'legs', 'feet', 'hands'],
        description: 'Dripping in jewels and trinkets. No ability, but 5 accessory slots and 2 offhand slots. Cannot wear armor.'
      },
      guild_appraiser: {
        name: 'Resident Appraiser', char: '⌕',
        hp: 11, movement: 4, attack: 2, defense: 2, str: 1, agi: 2, con: 0, int: 4,
        passives: ['perfect_insight'],
        startingEquipment: { mainhand: 'enchanted_scepter', body: 'simple_robe' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES.concat(MELEE_1H_WEAPON_TYPES), armor: CLOTH_ARMOR_TYPES },
        ability: { id: 'appraise_destroy', name: 'Absorb Item', desc: 'Destroy an equipped or inventory item to permanently absorb all of its passives.' },
        description: 'Sees the true value in everything — and consumes it.'
      },
      guild_bounty_hunter: {
        name: 'Bounty Hunter', char: '◎',
        hp: 14, movement: 5, attack: 3, defense: 2, str: 2, agi: 3, con: 0, int: 1,
        passives: ['piercing'],
        startingEquipment: { mainhand: 'crossbow', offhand: '_two_handed_', accessory: 'scouts_compass' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES, armor: PLATE_ARMOR_TYPES },
        ability: { id: 'bounty_mark', name: 'Bounty Mark', desc: 'Mark any visible enemy on the map for death. Marked targets take +3 damage from all sources and grant 3 gold to the killer.' },
        description: 'No one escapes his mark. Every kill fills the coffers.'
      }
    },
    forgeBonusItems: []
  },
  ogres: {
    name: 'Ogres', prefix: 'Ogre',
    chars: { worker: 'o', warrior: 'ö', mage: 'ô', elite: 'Ö', hero: '👹' },
    unitOverrides: {
      worker: {
        hp: 5, movement: 3, attack: 2, defense: 0, str: 2, agi: 0, con: 1, int: 0,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 10, movement: 3, attack: 4, defense: 2, str: 3, agi: 0, con: 0, int: 0,
        startingEquipment: { mainhand: 'war_pick', body: 'chain_mail' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield']), armor: MAIL_ARMOR_TYPES }
      },
      mage: {
        name: 'Shockcaller',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Ruffian', hp: 15, movement: 3, attack: 4, defense: 3, str: 4, agi: 0, con: 0, int: 0,
        passives: ['sweeping_strikes'],
        cost: { wood: 6, stone: 4, gold: 3, water: 0 },
        startingEquipment: { mainhand: 'hand_axe' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: PLATE_ARMOR_TYPES }
      }
    },
    heroes: {
      ogre_big_hoss: {
        name: 'Big Hoss', char: '⊠',
        hp: 22, movement: 4, attack: 5, defense: 5, str: 5, agi: 0, con: 0, int: 0,
        passives: ['lumbering_oaf'],
        startingEquipment: { mainhand: 'crude_axe', offhand: '_two_handed_' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES, armor: PLATE_ARMOR_TYPES },
        ability: { id: 'ogre_throw', name: 'Hurl', desc: 'Grab an adjacent unit (enemy or ally) and throw them up to 4 tiles away. Thrown enemies take 4 damage on landing; thrown allies land safely. If a thrown unit lands on an enemy, both take 3 damage.' },
        description: 'A mountain of muscle. Picks up friends and foes alike and hurls them across the battlefield.'
      },
      ogre_magi: {
        name: 'Magi', char: '⊛',
        hp: 16, movement: 4, attack: 3, defense: 2, str: 2, agi: 0, con: 0, int: 4,
        passives: ['static_conduit'],
        extraSlots: { head: 1 },
        startingEquipment: { mainhand: 'staff_of_wisdom', offhand: '_two_handed_', body: 'simple_robe' },
        proficiencies: { weapons: MAGIC_WEAPON_TYPES.concat(MELEE_1H_WEAPON_TYPES).concat(['shield']), armor: LEATHER_ARMOR_TYPES },
        ability: { id: 'static_discharge', name: 'Static Discharge', desc: 'Consume all Static Charges and deal magic damage equal to the number of charges to a target within 3 tiles. Charges are gained whenever an enemy takes damage within 3 spaces of you.' },
        description: 'A rare two-headed ogre with an affinity for raw arcane energy. Absorbs ambient pain and channels it as lightning.'
      }
    },
    forgeBonusItems: []
  },
  merfolk: {
    name: 'Merfolk', prefix: 'Merfolk',
    chars: { worker: 'm', warrior: 'ṃ', mage: 'ḿ', elite: 'Ṁ', hero: 'M' },
    unitOverrides: {
      worker: {
        hp: 4, movement: 4, attack: 1, defense: 0, str: 0, agi: 3, con: 0, int: 2,
        passives: ['resource_gathering', 'swimming'],
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 8, movement: 5, attack: 2, defense: 1, str: 1, agi: 2, con: 0, int: 0,
        passives: ['swimming'],
        startingEquipment: { mainhand: 'short_sword', offhand: 'buckler' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(RANGED_WEAPON_TYPES).concat(['shield']), armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Tidesage',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Tidecaller', hp: 12, movement: 5, attack: 2, defense: 2, str: 1, agi: 3, con: 0, int: 2,
        passives: ['swimming', 'weightless'],
        cost: { wood: 4, stone: 3, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'scimitar'},
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(MAGIC_WEAPON_TYPES), armor: MAIL_ARMOR_TYPES }
      },
    },
    heroes: {
      tidewarden: {
        name: 'Tidewarden', char: '≋',
        hp: 10, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 1, int: 1,
        passives: ['swimming', 'run_and_gun'],
        startingEquipment: { mainhand: 'shortbow' },
        proficiencies: { weapons: RANGED_WEAPON_TYPES.concat(MAGIC_WEAPON_TYPES), armor: MAIL_ARMOR_TYPES },
        ability: { id: 'harpoon_shot', name: 'Harpoon Shot', desc: 'Hook an enemy within 5 tiles and drag them when you move (this turn only). 2-turn CD.' },
        description: 'A skilled Merfolk hunter who strikes from afar, hooking foes with a harpoon to drag them along.'
      },
      amorphous_blob: {
        name: 'Amorphous Blob', char: '◓',
        hp: 6, movement: 4, attack: 2, defense: 2, str: 0, agi: 0, con: 0, int: 0,
        passives: ['swimming', 'double_strike'],
        blockedSlots: ['head', 'body', 'legs', 'feet', 'hands'],
        startingEquipment: { mainhand: 'short_sword', offhand: 'poisoned_dagger' },
        proficiencies: { weapons: MELEE_1H_WEAPON_TYPES.concat(['shield']), armor: [] },
        ability: { id: 'morph', name: 'Morph', desc: 'Spend your morph stat pool across STR, AGI, CON, and INT. Once per turn.' },
        description: 'A sentient mass of living water. Reshapes its form at will, wielding a weapon in each pseudopod.'
      }
    },
    forgeBonusItems: []
  },
  gnomes: {
    name: 'Gnomes', prefix: 'Gnome',
    chars: { worker: 'ĝ', warrior: 'ğ', mage: 'ǵ', elite: '⛭', hero: '⚒' },
    unitOverrides: {
      worker: {
        hp: 3, movement: 3, attack: 1, defense: 0, str: 0, agi: 2, con: 0, int: 3,
        proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
      },
      warrior: {
        hp: 7, movement: 4, attack: 2, defense: 1, str: 1, agi: 2, con: 0, int: 1,
        startingEquipment: { mainhand: 'short_sword', offhand: 'buckler' },
        proficiencies: { weapons: ALL_MELEE_WEAPON_TYPES.concat(['shield','bow']), armor: LEATHER_ARMOR_TYPES }
      },
      mage: {
        name: 'Spellsmith',
        proficiencies: { weapons: MAGIC_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
      },
      elite: {
        name: 'Engineer', hp: 11, movement: 4, attack: 2, defense: 2, str: 1, agi: 2, con: 0, int: 2,
        passives: ['precision'],
        cost: { wood: 3, stone: 2, gold: 2, water: 0 },
        startingEquipment: { mainhand: 'short_sword', offhand: 'duellists_pistol' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES.concat(['shield']), armor: MAIL_ARMOR_TYPES }
      },
    },
    heroes: {
      gnome_sniper: {
        name: 'Sniper', char: '⊕',
        hp: 9, movement: 3, attack: 0, defense: 1, str: 1, agi: 3, con: 0, int: 0,
        passives: ['ballistics_training'],
        startingEquipment: { mainhand: 'crossbow', offhand: '_two_handed_' },
        proficiencies: { weapons: RANGED_WEAPON_TYPES, armor: LEATHER_ARMOR_TYPES },
        ability: { id: 'sniper_shot', name: 'Sniper Shot', desc: 'Fire a long-range shot (base range 6 + INT). Rolls like a normal attack. 2 turn CD.' },
        description: 'A patient marksman. No normal attack — lives for the perfect shot.'
      },
      gnome_mortar_tech: {
        name: 'Mortar Technician', char: '☻',
        hp: 11, movement: 3, attack: 0, defense: 2, str: 1, agi: 2, con: 1, int: 2,
        noAttack: true,
        passives: ['steady_bombardment'],
        startingEquipment: { mainhand: 'hand_axe', body: 'leather_vest' },
        proficiencies: { weapons: ALL_PHYSICAL_WEAPON_TYPES, armor: PLATE_ARMOR_TYPES },
        ability: { id: 'mortar_strike', name: 'Mortar Strike', desc: 'Launch a mortar shell at a target within 4 tiles. Rolls like a normal attack, plus 1 splash damage to all adjacent units. Ignores walls and line of sight. No CD.' },
        description: 'Rains death from above. Cannot attack normally — his mortar speaks for him.'
      }
    },
    forgeBonusItems: []
  }
};

const UNIFIED_WORKER_BASE = {
  hp: 3, movement: 3, attack: 1, defense: 0, str: 0, agi: 3, con: 0, int: 3,
  proficiencies: { weapons: ['tool', 'instrument'], armor: LEATHER_ARMOR_TYPES }
};

function applyUnifiedWorkerStats() {
  for (const f of Object.values(FACTIONS)) {
    if (!f.unitOverrides || !f.unitOverrides.worker) continue;
    f.unitOverrides.worker = {
      ...UNIFIED_WORKER_BASE,
      proficiencies: {
        weapons: [...UNIFIED_WORKER_BASE.proficiencies.weapons],
        armor: [...UNIFIED_WORKER_BASE.proficiencies.armor]
      }
    };
  }
}

applyUnifiedWorkerStats();

function getAverageHeroCoreStatPoints() {
  const heroCoreTotals = [];
  for (const f of Object.values(FACTIONS)) {
    if (!f.heroes) continue;
    for (const h of Object.values(f.heroes)) {
      const core = (h.str || 0) + (h.agi || 0) + (h.con || 0) + (h.int || 0);
      heroCoreTotals.push(core);
    }
  }
  if (heroCoreTotals.length === 0) return 8;
  const sum = heroCoreTotals.reduce((a, b) => a + b, 0);
  return sum / heroCoreTotals.length;
}

const AMORPHOUS_BLOB_MORPH_BONUS_POINTS = 8;
const AMORPHOUS_BLOB_MORPH_POINTS = Math.ceil(getAverageHeroCoreStatPoints() + AMORPHOUS_BLOB_MORPH_BONUS_POINTS);

const EQUIP_SLOTS = ['head', 'body', 'legs', 'feet', 'hands', 'mainhand', 'offhand', 'accessory'];
const SLOT_LABELS = { head: 'Head', body: 'Body', legs: 'Legs', feet: 'Feet', hands: 'Hands', mainhand: 'Main Hand', offhand: 'Off Hand', accessory: 'Accessory', head2: 'Head 2', offhand2: 'Off Hand 2', accessory2: 'Accessory 2', accessory3: 'Accessory 3', accessory4: 'Accessory 4', accessory5: 'Accessory 5' };

// Get the equipment slots a unit actually uses (extra slots for Magnate, etc.)
function getUnitEquipSlots(unit) {
  const heroData = (unit.type === 'hero' && unit.faction) ? (() => {
    const f = FACTIONS[unit.faction];
    if (!f || !f.heroes) return null;
    return (unit.heroChoice && f.heroes[unit.heroChoice]) ? f.heroes[unit.heroChoice] : Object.values(f.heroes)[0];
  })() : null;
  if (!heroData || !heroData.extraSlots) return EQUIP_SLOTS;
  const slots = [...EQUIP_SLOTS];
  for (const [baseSlot, count] of Object.entries(heroData.extraSlots)) {
    for (let i = 2; i <= count + 1; i++) {
      slots.push(baseSlot + i);
    }
  }
  return slots;
}

function getEquippedCoreStatBonus(unit) {
  const bonus = { str: 0, agi: 0, con: 0, int: 0 };
  if (!unit || !unit.equipment) return bonus;
  for (const slot of getUnitEquipSlots(unit)) {
    const item = unit.equipment[slot];
    if (!item || item === '_two_handed_' || !item.stats) continue;
    bonus.str += item.stats.str || 0;
    bonus.agi += item.stats.agi || 0;
    bonus.con += item.stats.con || 0;
    bonus.int += item.stats.int || 0;
  }
  return bonus;
}

// Check if a unit is blocked from equipping into a slot
function isSlotBlocked(unit, slotName) {
  const heroData = (unit.type === 'hero' && unit.faction) ? (() => {
    const f = FACTIONS[unit.faction];
    if (!f || !f.heroes) return null;
    return (unit.heroChoice && f.heroes[unit.heroChoice]) ? f.heroes[unit.heroChoice] : Object.values(f.heroes)[0];
  })() : null;
  if (!heroData || !heroData.blockedSlots) return unit.severedSlots && unit.severedSlots.includes(slotName);
  return heroData.blockedSlots.includes(slotName) || (unit.severedSlots && unit.severedSlots.includes(slotName));
}

// Returns { weapons: [...], armor: [...] } or null if no restrictions
function getBaseArmorTier(armorTypes) {
  if (!armorTypes || armorTypes.length === 0) return 0;
  const normalized = armorTypes.map(t => (t === 'chain' ? 'mail' : t));
  if (normalized.includes('plate')) return 4;
  if (normalized.includes('mail')) return 3;
  if (normalized.includes('leather')) return 2;
  if (normalized.includes('cloth')) return 1;
  return 0;
}

function getArmorTypesForTier(tier) {
  switch (tier) {
    case 4: return ['cloth', 'leather', 'mail', 'plate'];
    case 3: return ['cloth', 'leather', 'mail'];
    case 2: return ['cloth', 'leather'];
    case 1: return ['cloth'];
    default: return [];
  }
}

function getUnitArmorTier(unit) {
  const prof = getUnitBaseProficiencies(unit);
  const baseTier = prof && prof.armor ? getBaseArmorTier(prof.armor) : 0;
  const bonus = (unit && typeof unit.armorProficiencyBonus === 'number') ? unit.armorProficiencyBonus : 0;
  return Math.min(4, baseTier + bonus);
}

function getUnitBaseProficiencies(unit) {
  if (unit.npc || unit.summon) return null; // NPCs/summons have no restrictions
  const faction = unit.faction ? FACTIONS[unit.faction] : null;
  if (!faction) return null;
  // Heroes: check hero definition
  if (unit.type === 'hero' && faction.heroes) {
    const heroData = (unit.heroChoice && faction.heroes[unit.heroChoice]) ? faction.heroes[unit.heroChoice] : Object.values(faction.heroes)[0];
    return heroData.proficiencies || null;
  }
  // Non-hero units: check faction unitOverrides
  if (faction.unitOverrides && faction.unitOverrides[unit.type]) {
    return faction.unitOverrides[unit.type].proficiencies || UNIT_DEFS[unit.type].proficiencies || null;
  }
  return UNIT_DEFS[unit.type].proficiencies || null;
}

function getUnitProficiencies(unit) {
  const baseProf = getUnitBaseProficiencies(unit);
  if (!baseProf) return null;
  if (!baseProf.armor) return baseProf;
  const tier = getUnitArmorTier(unit);
  return { ...baseProf, armor: getArmorTypesForTier(tier) };
}

function canUseProficiency(unit, item) {
  if (!item) return true;
  const prof = getUnitProficiencies(unit);
  if (!prof) return true; // no restrictions defined
  const type = item.weaponType || item.armorType;
  if (!type) return true; // accessories and untyped items are always OK
  if (type === 'misc' || type === 'tool') return true; // universal types
  if (item.weaponType) return prof.weapons && prof.weapons.includes(item.weaponType);
  if (item.armorType) {
    if (!prof.armor) return false;
    if (prof.armor.includes(item.armorType)) return true;
    // Backward compatibility: treat "mail" and "chain" as equivalent armor tiers.
    if (item.armorType === 'chain' && prof.armor.includes('mail')) return true;
    if (item.armorType === 'mail' && prof.armor.includes('chain')) return true;
    return false;
  }
  return true;
}

function itemTypeTag(item) {
  const t = item.weaponType || item.armorType;
  if (!t) return '';
  let label;
  if (t.startsWith('1h_')) label = '1H ' + t.slice(3).charAt(0).toUpperCase() + t.slice(4);
  else if (t.startsWith('2h_')) label = '2H ' + t.slice(3).charAt(0).toUpperCase() + t.slice(4);
  else label = t.charAt(0).toUpperCase() + t.slice(1);
  const color = item.weaponType ? '#c93' : '#39c';
  return `<span style="color:${color};font-size:10px;"> [${label}]</span>`;
}

// ============================================================
// ITEMS DATABASE
// ============================================================
const ITEMS = {
  // --- Head ---
  leather_cap:          { id: 'leather_cap',          name: 'Leather Cap',          slot: 'head', armorType: 'leather',     stats: { defense: 1 },                      weight: 1, shopCost: 2, description: 'A simple leather cap.' },
  iron_helm:            { id: 'iron_helm',            name: 'Iron Helm',            slot: 'head', armorType: 'plate',     stats: { defense: 2 },                      weight: 2, shopCost: 4, description: 'A sturdy iron helmet.' },
  helm_of_constitution: { id: 'helm_of_constitution', name: 'Helm of Constitution', slot: 'head', armorType: 'plate',     stats: { defense: 1, con: 3 },              weight: 2, shopCost: 8, description: '+3 CON. Fortifies vitality.' },
  crown_of_intellect:   { id: 'crown_of_intellect',   name: 'Crown of Intellect',   slot: 'head', armorType: 'cloth',     stats: { int: 4 },                          weight: 1, shopCost: 9, description: '+4 INT. Sharpens the mind.' },
  wolf_pelt_hood:       { id: 'wolf_pelt_hood',       name: 'Wolf Pelt Hood',       slot: 'head', armorType: 'leather',     stats: { defense: 1, str: 1, agi: 1 },     weight: 1, shopCost: 5, description: 'A savage wolf pelt hood.' },
  mage_circlet:          { id: 'mage_circlet',          name: 'Mage\'s Circlet',      slot: 'head', armorType: 'cloth',     stats: { defense: 1, int: 2 },              weight: 1, shopCost: 6, description: '+2 INT. Enhances arcane focus.' },
  horned_helm:           { id: 'horned_helm',           name: 'Horned Helm',          slot: 'head', armorType: 'plate',     stats: { defense: 2, str: 2 },              weight: 3, shopCost: 7, description: '+2 STR. Intimidating horned headgear.' },
  scouts_bandana:        { id: 'scouts_bandana',        name: 'Scout\'s Bandana',     slot: 'head', armorType: 'cloth',     stats: { agi: 2 },                          weight: 0, shopCost: 5, description: '+2 AGI. Light and unrestrictive.' },
  helm_of_vitality:      { id: 'helm_of_vitality',      name: 'Helm of Vitality',     slot: 'head', armorType: 'plate',     stats: { defense: 1, con: 2 },              weight: 2, shopCost: 6, description: '+2 CON. Pulses with life force.' },
  circlet_of_clarity:    { id: 'circlet_of_clarity',    name: 'Circlet of Clarity',   slot: 'head', armorType: 'cloth',     stats: { int: 3, agi: 1 },                  weight: 0, shopCost: 8, description: '+3 INT, +1 AGI. Sharpens reflexes and mind.' },
  warlords_greathelm:    { id: 'warlords_greathelm',    name: 'Warlord\'s Greathelm', slot: 'head', armorType: 'plate',     stats: { defense: 3, str: 1 },              weight: 3, shopCost: 9, passives: ['bulwark'], description: '+1 STR. Imposing helm. Grants Bulwark.' },
  druids_wreath:         { id: 'druids_wreath',         name: 'Druid\'s Wreath',      slot: 'head', armorType: 'cloth',     stats: { con: 2, int: 1 },                  weight: 0, shopCost: 6, passives: ['regeneration'], description: '+2 CON, +1 INT. Living vines that mend wounds. Grants Regeneration.' },
  hood_of_the_phantom:   { id: 'hood_of_the_phantom',   name: 'Hood of the Phantom',  slot: 'head', armorType: 'cloth',     stats: { agi: 3 },                          weight: 0, shopCost: 7, passives: ['evasion'], description: '+3 AGI. Blurs your outline. Grants Evasion (+3% dodge).' },
  skull_mask:            { id: 'skull_mask',            name: 'Skull Mask',           slot: 'head', armorType: 'leather',     stats: { attack: 1, str: 1 },               weight: 1, shopCost: 6, description: '+1 STR. Instills fear in foes.' },
  crown_of_thorns:       { id: 'crown_of_thorns',       name: 'Crown of Thorns',      slot: 'head', armorType: 'cloth',     stats: { defense: 1, int: 2 },              weight: 1, shopCost: 8, passives: ['thorns'], description: '+2 INT. Piercing barbs wound melee attackers. Grants Thorns.' },
  serpent_crown:         { id: 'serpent_crown',         name: 'Serpent Crown',        slot: 'head', armorType: 'cloth',     stats: { defense: 1, int: 1 },              weight: 1, shopCost: 7, onHit: { effect: 'poison', chance: 100 }, description: '+1 INT. Venomous crown. 100% chance to inflict Poison on hit.' },
  mountaineers_cap:      { id: 'mountaineers_cap',      name: "Mountaineer's Cap",    slot: 'head', armorType: 'leather',     stats: { con: 1, agi: 1 },                  weight: 1, shopCost: 5, passives: ['climbing'], description: '+1 CON, +1 AGI. Hardy headgear for rough terrain. Grants Climbing.' },
  visored_sallet:        { id: 'visored_sallet',        name: 'Visored Sallet',       slot: 'head', armorType: 'plate',     stats: { defense: 3 },                      weight: 3, shopCost: 6, description: 'Full-face steel helm. Maximum head protection.' },
  crit_goggles:          { id: 'crit_goggles',          name: 'Crit Goggles',         slot: 'head', armorType: 'cloth',     stats: { int: 1 },                          weight: 0, shopCost: 8, passives: ['precision', 'precision'], description: '+1 INT. Enchanted lenses that reveal weak points. Grants Precision ×2.' },
  mages_coif:            { id: 'mages_coif',            name: "Mage's Coif",          slot: 'head', armorType: 'cloth',     stats: { int: 1 },                          weight: 0, shopCost: 1, description: '+1 INT. A simple cloth coif for budding spellcasters.' },
  bouncy_helmet:         { id: 'bouncy_helmet',         name: 'Bouncy Helmet',        slot: 'head', armorType: 'leather',     stats: { agi: 1 },                          weight: 1, shopCost: 7, passives: ['reflect'], description: '+1 AGI. Springy enchanted helm that deflects projectiles. Grants Reflect.' },
  teapot_crown:          { id: 'teapot_crown',          name: 'Brass Circlet',         slot: 'head', armorType: 'cloth',     stats: { defense: 1, str: 1 },              weight: 0, shopCost: 8, description: '+1 DEF, +1 STR. A reinforced circlet with a fighter\'s feel.' },
  professors_helm:       { id: 'professors_helm',       name: "Scholar's Helm",       slot: 'head', armorType: 'chain',     stats: { defense: 1, int: 1 },              weight: 2, shopCost: 9, description: '+2 DEF, +1 INT. Practical steel headgear for battlefield tacticians.' },
  forge_banded_helm:     { id: 'forge_banded_helm',     name: 'Banded Helm',           slot: 'head', armorType: 'leather',     stats: { defense: 1, con: 1 },              weight: 2, shopCost: 5, description: '+1 CON. A practical field helm with a simple banded crown.' },

  // --- Body ---
  simple_robe:            { id: 'simple_robe',            name: 'Simple Robe',           slot: 'body', armorType: 'cloth',    stats: { defense: 1 },                      weight: 0, shopCost: 2, description: 'A plain robe. Minimal protection.' },
  leather_vest:         { id: 'leather_vest',         name: 'Leather Vest',          slot: 'body', armorType: 'leather',    stats: { defense: 1, agi: 2 },              weight: 1, shopCost: 5, description: '+2 AGI. Light and flexible.' },
  chain_mail:           { id: 'chain_mail',           name: 'Chain Mail',            slot: 'body', armorType: 'chain',    stats: { defense: 3 },                      weight: 3, shopCost: 6, description: 'Interlocked metal rings.' },
  plate_armor:          { id: 'plate_armor',          name: 'Plate Armor',           slot: 'body', armorType: 'plate',    stats: { defense: 5, str: 1 },              weight: 5, shopCost: 10, description: '+1 STR. Massive protection, very heavy.' },
  teleportation_cloak:  { id: 'teleportation_cloak',  name: 'Teleportation Cloak',   slot: 'body', armorType: 'cloth',    stats: { defense: 1, agi: 1 },              weight: 1, shopCost: 12, description: 'Grants Teleport Home action.', action: 'teleport_home' },
  robe_of_the_archmage: { id: 'robe_of_the_archmage', name: 'Robe of the Archmage',  slot: 'body', armorType: 'cloth',    stats: { defense: 2, int: 3 },              weight: 1, shopCost: 9, passives: ['magic_resistance'], description: '+3 INT. Shimmers with magic. Grants Magic Resistance.' },
  brigandine:            { id: 'brigandine',            name: 'Brigandine',            slot: 'body', armorType: 'leather',    stats: { defense: 4 },                      weight: 4, shopCost: 7, description: 'Studded leather. Solid protection.' },
  dragonhide_armor:      { id: 'dragonhide_armor',      name: 'Dragonhide Armor',      slot: 'body', armorType: 'leather',    stats: { defense: 4, con: 2 },              weight: 3, shopCost: 11, passives: ['fire_resistance'], description: '+2 CON. Scaled hide of an ancient drake. Grants Fire Resistance.' },
  berserker_harness:     { id: 'berserker_harness',     name: 'Berserker\'s Harness',  slot: 'body', armorType: 'leather',    stats: { defense: 1, str: 2, attack: 1 },   weight: 2, shopCost: 8, description: '+2 STR. Fuels battle rage.' },
  mithril_shirt:         { id: 'mithril_shirt',         name: 'Mithril Shirt',         slot: 'body', armorType: 'chain',    stats: { defense: 3, agi: 1 },              weight: 0, shopCost: 12, description: '+1 AGI. Incredibly light and strong.' },
  diviner_vestments:     { id: 'diviner_vestments',     name: 'Diviner\'s Vestments',  slot: 'body', armorType: 'cloth',    stats: { defense: 1, int: 2, con: 2 },      weight: 1, shopCost: 8, description: '+2 INT, +2 CON. Woven with foresight.' },
  thornweave_tunic:      { id: 'thornweave_tunic',      name: 'Thornweave Tunic',      slot: 'body', armorType: 'leather',    stats: { defense: 2, agi: 1 },              weight: 1, shopCost: 7, passives: ['thorns'], description: '+1 AGI. Barbed threads punish melee attackers. Grants Thorns.' },
  warden_plate:          { id: 'warden_plate',          name: 'Warden\'s Plate',       slot: 'body', armorType: 'plate',    stats: { defense: 4, con: 1, str: 1 },      weight: 4, shopCost: 10, passives: ['steadfast'], description: '+1 STR, +1 CON. Immune to movement impairment. Grants Steadfast.' },
  shadow_cloak:          { id: 'shadow_cloak',          name: 'Shadow Cloak',          slot: 'body', armorType: 'cloth',    stats: { defense: 1, agi: 3 },              weight: 0, shopCost: 9, passives: ['evasion'], description: '+3 AGI. Blends with shadow. Grants Evasion (+3% dodge).' },
  elementalist_robe:     { id: 'elementalist_robe',     name: 'Elementalist Robe',     slot: 'body', armorType: 'cloth',    stats: { defense: 2, int: 3 },              weight: 1, shopCost: 10, passives: ['frost_resistance'], description: '+3 INT. Infused with elemental wards. Grants Frost Resistance.' },
  bone_plate_armor:      { id: 'bone_plate_armor',      name: 'Bone Plate Armor',      slot: 'body', armorType: 'plate',    stats: { defense: 3, str: 2 },              weight: 3, shopCost: 9, passives: ['bulwark'], description: '+2 STR. Fused from beast bones. Grants Bulwark (-1 dmg taken).' },
  static_armor:          { id: 'static_armor',          name: 'Static Armor',          slot: 'body', armorType: 'chain',    stats: { defense: 0 },                      weight: 2, shopCost: 10, passives: ['static_shock'], description: 'No DEF. Shocks melee attackers for 2–4 damage. Grants Static Shock.' },
  vagabonds_coat:        { id: 'vagabonds_coat',        name: "Vagabond's Coat",       slot: 'body', armorType: 'leather',    stats: { defense: 1, agi: 2 },              weight: 1, shopCost: 8, passives: ['climbing', 'water_walking'], description: '+2 AGI. A well-traveled coat. Grants Climbing & Water Walking.' },
  mirror_plate:          { id: 'mirror_plate',          name: 'Mirror Plate',          slot: 'body', armorType: 'plate',    stats: { defense: 3, int: 1 },              weight: 3, shopCost: 9, passives: ['reflect'], description: '+1 INT. Polished to a blinding sheen. Grants Reflect.' },
  rattlesnake_vest:      { id: 'rattlesnake_vest',      name: 'Rattlesnake Vest',      slot: 'body', armorType: 'leather',    stats: { defense: 2, agi: 1 },              weight: 1, shopCost: 8, passives: ['retaliate', 'poison_resistance'], description: '+1 AGI. Scaled hide strikes back and wards venom. Grants Retaliate & Poison Resistance.' },
  inferno_plate:         { id: 'inferno_plate',         name: 'Inferno Plate',         slot: 'body', armorType: 'plate',    stats: { defense: 3, str: 1 },              weight: 3, shopCost: 10, passives: ['inferno_armor', 'fire_resistance'], description: '+1 STR. Forged in hellfire. Melee attackers catch fire. Grants Inferno Armor & Fire Resistance.' },
  venomspine_mail:       { id: 'venomspine_mail',       name: 'Venomspine Mail',       slot: 'body', armorType: 'chain',    stats: { defense: 2, con: 1 },              weight: 2, shopCost: 9, passives: ['venomous_armor', 'poison_resistance'], description: '+1 CON. Barbed with venom-tipped spines. Melee attackers are poisoned. Grants Venomous Armor & Poison Resistance.' },
  cardigan_of_heroics:   { id: 'cardigan_of_heroics',   name: 'Battleweave Tunic',     slot: 'body', armorType: 'cloth',    stats: { defense: 1, str: 2 },              weight: 1, shopCost: 10, description: '+1 DEF, +2 STR. Layered battlecloth that favors offense over protection.' },
  paradox_breastplate:   { id: 'paradox_breastplate',   name: 'Arcanist Breastplate',  slot: 'body', armorType: 'plate',    stats: { defense: 2, int: 1, attack: 1 },   weight: 3, shopCost: 11, description: '+2 DEF, +1 INT, +1 ATK. A disciplined fusion of steel and spellcraft.' },
  quilted_quarrel_coat:  { id: 'quilted_quarrel_coat',  name: 'Quilted Duel Coat',     slot: 'body', armorType: 'cloth',    stats: { defense: 1, attack: 2 },           weight: 1, shopCost: 9, description: '+1 DEF, +2 ATK. Light dueling wear for aggressive skirmishers.' },
  forge_braced_mail:     { id: 'forge_braced_mail',     name: 'Braced Mail',           slot: 'body', armorType: 'chain',    stats: { defense: 2, con: 1 },              weight: 3, shopCost: 5, description: '+1 CON. Repaired rings that still bite at the edges.' },
  forge_reinforced_tunic:{ id: 'forge_reinforced_tunic',name: 'Reinforced Tunic',      slot: 'body', armorType: 'cloth',    stats: { defense: 1, agi: 1, str: 1 },      weight: 1, shopCost: 6, description: '+1 AGI, +1 STR. Layered padding made for rough field use.' },

  // --- Legs ---
  leather_leggings:     { id: 'leather_leggings',     name: 'Leather Leggings',      slot: 'legs', armorType: 'leather',    stats: { defense: 1 },                      weight: 1, shopCost: 2, description: 'Simple leather leggings.' },
  iron_greaves:         { id: 'iron_greaves',         name: 'Iron Greaves',          slot: 'legs', armorType: 'plate',    stats: { defense: 2 },                      weight: 2, shopCost: 4, description: 'Solid iron leg armor.' },
  leggings_of_evasion:  { id: 'leggings_of_evasion',  name: 'Leggings of Evasion',   slot: 'legs', armorType: 'cloth',    stats: { agi: 3, defense: 1 },              weight: 1, shopCost: 8, description: '+3 AGI. Magically light.' },
  titan_legguards:      { id: 'titan_legguards',      name: 'Titan Legguards',       slot: 'legs', armorType: 'plate',    stats: { defense: 3, str: 2 },              weight: 3, shopCost: 9, description: '+2 STR. Forged for giants.' },
  chainmail_chausses:    { id: 'chainmail_chausses',    name: 'Chainmail Chausses',    slot: 'legs', armorType: 'chain',    stats: { defense: 2, con: 1 },              weight: 2, shopCost: 5, description: '+1 CON. Linked metal leg armor.' },
  shadow_leggings:       { id: 'shadow_leggings',       name: 'Shadow Leggings',       slot: 'legs', armorType: 'cloth',    stats: { agi: 2 },                          weight: 0, shopCost: 5, description: '+2 AGI. Woven from shadow threads.' },
  legplates_of_fury:     { id: 'legplates_of_fury',     name: 'Legplates of Fury',     slot: 'legs', armorType: 'plate',    stats: { defense: 2, str: 1 },              weight: 3, shopCost: 6, description: '+1 STR. Ground your strikes with power.' },
  silk_trousers:         { id: 'silk_trousers',         name: 'Silk Trousers',         slot: 'legs', armorType: 'cloth',    stats: { int: 1, agi: 1 },                  weight: 0, shopCost: 4, description: '+1 INT, +1 AGI. Enchanted elven silk.' },
  adepts_trousers:       { id: 'adepts_trousers',       name: "Adept's Trousers",      slot: 'legs', armorType: 'cloth',    stats: { agi: 1 },                          weight: 0, shopCost: 1, description: '+1 AGI. Simple cloth trousers for apprentice mages.' },
  greaves_of_fortitude:  { id: 'greaves_of_fortitude',  name: 'Greaves of Fortitude',  slot: 'legs', armorType: 'plate',    stats: { defense: 3, con: 2 },              weight: 3, shopCost: 9, description: '+2 CON. Unyielding protection.' },
  rangers_leggings:      { id: 'rangers_leggings',      name: 'Ranger\'s Leggings',    slot: 'legs', armorType: 'leather',    stats: { agi: 3, defense: 1 },              weight: 1, shopCost: 7, passives: ['climbing'], description: '+3 AGI. Built for rugged terrain. Grants Climbing.' },
  ironbark_greaves:      { id: 'ironbark_greaves',      name: 'Ironbark Greaves',      slot: 'legs', armorType: 'leather',    stats: { defense: 2, con: 2 },              weight: 2, shopCost: 7, passives: ['steadfast'], description: '+2 CON. Living wood wraps the legs. Grants Steadfast.' },
  legguards_of_the_deft: { id: 'legguards_of_the_deft', name: 'Legguards of the Deft', slot: 'legs', armorType: 'leather',    stats: { agi: 2, int: 1 },                  weight: 1, shopCost: 6, passives: ['evasion'], description: '+2 AGI, +1 INT. Impossibly nimble. Grants Evasion.' },
  bloodstained_cuisses:  { id: 'bloodstained_cuisses',  name: 'Bloodstained Cuisses',  slot: 'legs', armorType: 'plate',    stats: { defense: 2, str: 2 },              weight: 2, shopCost: 8, passives: ['vampirism'], description: '+2 STR. Steeped in crimson magic. Grants Vampirism.' },
  runic_legwraps:        { id: 'runic_legwraps',        name: 'Runic Legwraps',        slot: 'legs', armorType: 'cloth',    stats: { int: 2, con: 1 },                  weight: 0, shopCost: 6, passives: ['magic_resistance'], description: '+2 INT, +1 CON. Inscribed runes ward against spells. Grants Magic Resistance.' },
  marsh_waders:          { id: 'marsh_waders',          name: 'Marsh Waders',          slot: 'legs', armorType: 'leather',    stats: { defense: 1, con: 1 },              weight: 1, shopCost: 4, passives: ['water_walking'], description: '+1 CON. Waterproof hiking gear. Grants Water Walking.' },
  sentinels_cuisses:     { id: 'sentinels_cuisses',     name: "Sentinel's Cuisses",    slot: 'legs', armorType: 'plate',    stats: { defense: 3, str: 1 },              weight: 3, shopCost: 9, passives: ['bulwark'], description: '+1 STR. Unyielding plate guards. Grants Bulwark.' },
  curtain_culottes:      { id: 'curtain_culottes',      name: 'Woven Battle Trousers', slot: 'legs', armorType: 'cloth',    stats: { defense: 1, attack: 1 },           weight: 0, shopCost: 8, description: '+1 DEF, +1 ATK. Flexible legwear for close-quarters fighters.' },
  calculus_greaves:      { id: 'calculus_greaves',      name: 'Etched Greaves',        slot: 'legs', armorType: 'plate',    stats: { defense: 2, int: 1, agi: 1 },      weight: 2, shopCost: 9, description: '+2 DEF, +1 INT, +1 AGI. Precision-etched plates for measured movement.' },
  forge_worn_greaves:    { id: 'forge_worn_greaves',    name: 'Worn Greaves',          slot: 'legs', armorType: 'chain',    stats: { defense: 1, con: 1 },              weight: 2, shopCost: 4, description: '+1 CON. Thick but worn plate for runners and guards.' },
  forge_field_legwraps:  { id: 'forge_field_legwraps',  name: 'Field Legwraps',        slot: 'legs', armorType: 'cloth',    stats: { defense: 1, agi: 1 },              weight: 0, shopCost: 5, description: '+1 AGI. Tight wraps meant for quick footwork.' },

  // --- Feet ---
  leather_boots:        { id: 'leather_boots',        name: 'Footwraps',             slot: 'feet', armorType: 'leather',    stats: { con: 1 },                                  weight: 1, shopCost: 1, description: 'Basic leather footwear.' },
  iron_boots:           { id: 'iron_boots',           name: 'Iron Boots',            slot: 'feet', armorType: 'plate',    stats: { defense: 1 },                      weight: 2, shopCost: 3, description: 'Heavy iron boots.' },
  boots_of_speed:       { id: 'boots_of_speed',       name: 'Boots of Speed',        slot: 'feet', armorType: 'cloth',    stats: { agi: 4 },                          weight: 0, shopCost: 10, passives: ['haste'], description: '+4 AGI. Feather-light; move farther. Grants Haste (+2 move).' },
  sandals_of_the_saint: { id: 'sandals_of_the_saint', name: 'Sandals of the Saint',  slot: 'feet', armorType: 'cloth',    stats: { con: 2, int: 2 },                  weight: 0, shopCost: 8, description: '+2 CON, +2 INT. Blessed footwear.' },
  steel_sabatons:        { id: 'steel_sabatons',        name: 'Steel Sabatons',        slot: 'feet', armorType: 'plate',    stats: { defense: 2 },                      weight: 3, shopCost: 4, description: 'Heavy but protective.' },
  windrunner_boots:      { id: 'windrunner_boots',      name: 'Windrunner Boots',      slot: 'feet', armorType: 'leather',    stats: { agi: 3, defense: 1 },              weight: 0, shopCost: 8, passives: ['water_walking'], description: '+3 AGI. Run like the wind. Grants Water Walking.' },
  boots_of_stability:    { id: 'boots_of_stability',    name: 'Boots of Stability',    slot: 'feet', armorType: 'leather',    stats: { con: 2, defense: 1 },              weight: 2, shopCost: 6, description: '+2 CON. Rooted and steady.' },
  assassins_footwraps:   { id: 'assassins_footwraps',   name: 'Assassin\'s Footwraps', slot: 'feet', armorType: 'cloth',   stats: { agi: 2, attack: 1 },               weight: 0, shopCost: 7, description: '+2 AGI. Silent and deadly.' },
  earthshaker_boots:     { id: 'earthshaker_boots',     name: 'Earthshaker Boots',     slot: 'feet', armorType: 'plate',    stats: { str: 2, defense: 1 },              weight: 3, shopCost: 11, description: 'Grants War Stomp: push adjacent enemies away.', action: 'war_stomp' },
  flamestride_boots:     { id: 'flamestride_boots',     name: 'Flamestride Boots',     slot: 'feet', armorType: 'leather',    stats: { agi: 2, str: 1 },                  weight: 1, shopCost: 8, passives: ['fire_resistance', 'haste'], description: '+2 AGI, +1 STR. Leave embers in your wake. Grants Fire Resistance & Haste.' },
  frostwalkers:          { id: 'frostwalkers',          name: 'Frostwalkers',          slot: 'feet', armorType: 'leather',    stats: { defense: 1, int: 2 },              weight: 1, shopCost: 7, passives: ['frost_resistance', 'water_walking'], description: '+2 INT. Ice forms beneath each step. Grants Frost Resistance & Water Walking.' },
  boots_of_the_mountain: { id: 'boots_of_the_mountain', name: 'Boots of the Mountain', slot: 'feet', armorType: 'plate',    stats: { defense: 2, con: 2 },              weight: 3, shopCost: 8, passives: ['climbing', 'steadfast'], description: '+2 CON. Built for peaks. Grants Climbing & Steadfast.' },
  shadowstep_slippers:   { id: 'shadowstep_slippers',   name: 'Shadowstep Slippers',   slot: 'feet', armorType: 'cloth',    stats: { agi: 4 },                          weight: 0, shopCost: 10, passives: ['evasion'], description: '+4 AGI. Phase through danger. Grants Evasion (+3% dodge).' },
  ironclad_stompers:     { id: 'ironclad_stompers',     name: 'Ironclad Stompers',     slot: 'feet', armorType: 'plate',    stats: { defense: 3, str: 1 },              weight: 4, shopCost: 8, passives: ['bulwark'], description: '+1 STR. Unyielding tread. Grants Bulwark (-1 dmg taken).' },
  pilgrim_sandals:       { id: 'pilgrim_sandals',       name: 'Pilgrim Sandals',       slot: 'feet', armorType: 'cloth',    stats: { con: 1, int: 1 },                  weight: 0, shopCost: 7, passives: ['water_walking', 'climbing'], description: '+1 CON, +1 INT. Blessed sandals for any terrain. Grants Water Walking & Climbing.' },
  ballroom_sabatons:     { id: 'ballroom_sabatons',     name: 'Court Sabatons',        slot: 'feet', armorType: 'plate',    stats: { defense: 2, agi: 1 },              weight: 2, shopCost: 8, description: '+2 DEF, +1 AGI. Noble sabatons built for poise and control.' },
  librarians_slippers:   { id: 'librarians_slippers',   name: 'Archivist Slippers',    slot: 'feet', armorType: 'cloth',    stats: { defense: 1, int: 2 },              weight: 0, shopCost: 8, description: '+1 DEF, +2 INT. Quiet slippers for focused casters.' },
  forge_stitched_boots:  { id: 'forge_stitched_boots',  name: 'Stitched Boots',        slot: 'feet', armorType: 'cloth',    stats: { defense: 1, agi: 1 },              weight: 1, shopCost: 4, description: '+1 AGI. Padded boots that favor motion over weight.' },
  forge_roadworn_sabatons:{ id: 'forge_roadworn_sabatons',name:'Roadworn Sabatons',    slot: 'feet', armorType: 'plate',    stats: { defense: 1, str: 1 },              weight: 2, shopCost: 5, description: '+1 STR. Heavier than they look but reliable on long marches.' },

  // --- Main Hand (One-Handed) ---
  wooden_stick:              { id: 'wooden_stick',              name: 'Wooden Stick',               slot: 'mainhand', weaponType: 'club', stats: { attack: 2 },                      weight: 1, shopCost: 1, description: 'A simple wooden stick. Meager weapon.' },
  pickaxe:              { id: 'pickaxe',              name: 'Pickaxe',               slot: 'mainhand', weaponType: 'tool', stats: { attack: 1 },                      weight: 1, shopCost: 1, description: 'A mining pick. Meager weapon.' },
  short_sword:          { id: 'short_sword',          name: 'Short Sword',           slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 2 },                      weight: 1, shopCost: 3, description: 'A simple blade.' },
  flaming_sword:        { id: 'flaming_sword',        name: 'Flaming Sword',         slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 3, str: 2 },              weight: 2, shopCost: 10, onHit: { effect: 'burning', chance: 70 }, description: '+2 STR. Wreathed in fire. 70% chance to inflict Burning.' },
  poisoned_dagger:      { id: 'poisoned_dagger',      name: 'Poisoned Dagger',       slot: 'mainhand', weaponType: 'dagger', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 8, onHit: { effect: 'poison', chance: 100 }, description: '+2 AGI. Venomous edge. 50% chance to inflict Poison.' },
  mace:                 { id: 'mace',                 name: 'Mace',                  slot: 'mainhand', weaponType: '1h_mace', stats: { attack: 2, str: 1 },              weight: 2, shopCost: 4, description: '+1 STR. Blunt and brutal.' },
  rapier:               { id: 'rapier',               name: 'Rapier',                slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 2, agi: 3 },              weight: 1, shopCost: 8, description: '+3 AGI. Elegant and precise.' },
  hand_axe:             { id: 'hand_axe',             name: 'Hand Axe',              slot: 'mainhand', weaponType: '1h_axe', stats: { attack: 3 },                      weight: 2, shopCost: 4, combatLockBonus: 10, description: 'A compact chopping weapon. +10% combat lock chance.' },
  frost_blade:           { id: 'frost_blade',           name: 'Frost Blade',           slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 3, int: 1 },              weight: 2, shopCost: 10, onHit: { effect: 'frozen', chance: 80 }, description: '+1 INT. Chills to the bone. 80% chance to Freeze.' },
  vampiric_blade:        { id: 'vampiric_blade',        name: 'Vampiric Blade',        slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 2, str: 2 },              weight: 2, shopCost: 9, onHit: { effect: 'bleeding', chance: 100 }, passives: ['vampirism'], description: '+2 STR. Drains vitality. 100% chance to inflict Bleeding. Grants Vampirism.' },
  war_pick:              { id: 'war_pick',              name: 'War Pick',              slot: 'mainhand', weaponType: '1h_axe', stats: { attack: 3, str: 1 },              weight: 2, shopCost: 5, description: '+1 STR. Pierces armor effectively.' },
  enchanted_scepter:     { id: 'enchanted_scepter',     name: 'Enchanted Scepter',     slot: 'mainhand', weaponType: 'wand', stats: { attack: 1, int: 3 },              weight: 1, shopCost: 9, onHit: { effect: 'cursed', chance: 55 }, description: '+3 INT. A conduit for dark magic. 55% chance to inflict Cursed.' },
  scimitar:              { id: 'scimitar',              name: 'Scimitar',              slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 6, description: '+2 AGI. Curved and swift.' },
  serrated_cleaver:      { id: 'serrated_cleaver',      name: 'Serrated Cleaver',      slot: 'mainhand', weaponType: '1h_axe', stats: { attack: 2, str: 1 },              weight: 2, shopCost: 7, onHit: { effect: 'bleeding', chance: 100 }, description: '+1 STR. Jagged edge. 100% chance to inflict Bleeding.' },
  thundermace:           { id: 'thundermace',           name: 'Thundermace',           slot: 'mainhand', weaponType: '1h_mace', stats: { attack: 3, str: 2 },              weight: 2, shopCost: 9, onHit: { effect: 'slowed', chance: 75 }, description: '+2 STR. Crackling strikes. 75% chance to Slow.' },
  venom_fang:            { id: 'venom_fang',            name: 'Venom Fang',            slot: 'mainhand', weaponType: 'dagger', stats: { attack: 2, agi: 3 },              weight: 1, shopCost: 9, onHit: { effect: 'poison', chance: 100, stacks: 2 }, passives: ['piercing'], description: '+3 AGI. Razor fang dripping venom. 60% Poison (2 stacks). Grants Piercing.' },
  holy_mace:             { id: 'holy_mace',             name: 'Holy Mace',             slot: 'mainhand', weaponType: '1h_mace', stats: { attack: 2, int: 2, con: 1 },      weight: 2, shopCost: 8, description: '+2 INT, +1 CON. Blessed by the temple.' },
  shadow_dagger:         { id: 'shadow_dagger',         name: 'Shadow Dagger',         slot: 'mainhand', weaponType: 'dagger', stats: { attack: 2, agi: 4 },              weight: 0, shopCost: 10, passives: ['evasion'], description: '+4 AGI. Strikes from nowhere. Grants Evasion (+3% dodge).' },
  morning_star:          { id: 'morning_star',          name: 'Morning Star',          slot: 'mainhand', weaponType: '1h_mace', stats: { attack: 3, str: 1 },              weight: 2, shopCost: 7, onHit: { effect: 'weakened', chance: 50 }, description: '+1 STR. Flanged head crushes muscle. 50% chance to Weaken.' },
  coral_blade:           { id: 'coral_blade',           name: 'Coral Blade',           slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 7, onHit: { effect: 'slowed', chance: 70 }, description: '+2 AGI. Sea-forged edge. 70% chance to Slow.' },
  cursed_wand:           { id: 'cursed_wand',           name: 'Cursed Wand',           slot: 'mainhand', weaponType: 'wand', stats: { attack: 1, int: 2 },              weight: 1, shopCost: 8, range: 2, magicDamage: true, onHit: { effect: 'cursed', chance: 70 }, description: '+2 INT. Dark channeling wand. Ranged (2). 70% chance to Curse.' },
  stormstrike_mace:      { id: 'stormstrike_mace',      name: 'Stormstrike Mace',      slot: 'mainhand', weaponType: '1h_mace', stats: { attack: 3, int: 2 },              weight: 2, shopCost: 11, chainLightning: { chance: 75, damage: 2 }, description: '+2 INT. Crackling with storm energy. 75% chance to chain lightning — 2 damage to all enemies adjacent to target.' },
  elemental_glaive:      { id: 'elemental_glaive',      name: 'Elemental Glaive',      slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 4, str: 1, int: 1 },      weight: 3, shopCost: 14, twoHanded: true, elementalCycle: true, description: '+1 STR, +1 INT. Channels the elements. Each turn cycles between Freeze (80%), Burning (100%), and Chain Lightning (2 dmg). Two-handed.' },

  // --- Main Hand (Two-Handed) ---
  crude_axe:            { id: 'crude_axe',            name: 'Crude Axe',             slot: 'mainhand', weaponType: '2h_axe', stats: { attack: 3 },                      weight: 3, shopCost: 3, twoHanded: true, combatLockBonus: 10, description: 'A rough-hewn axe. +10% combat lock chance. Two-handed.' },
  broad_sword:          { id: 'broad_sword',          name: 'Broad Sword',           slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 3 },                      weight: 3, shopCost: 5, twoHanded: true, description: 'A heavy, wide blade. Requires both hands.' },
  staff_of_wisdom:      { id: 'staff_of_wisdom',      name: 'Staff of Wisdom',       slot: 'mainhand', weaponType: 'staff', stats: { attack: 1, int: 4, con: 1 },     weight: 2, shopCost: 10, twoHanded: true, description: '+4 INT, +1 CON. A scholar\'s weapon. Two-handed.' },
  battleaxe:            { id: 'battleaxe',            name: 'Battleaxe',             slot: 'mainhand', weaponType: '2h_axe', stats: { attack: 3, str: 2 },              weight: 4, shopCost: 11, twoHanded: true, description: '+2 STR. Devastating cleave. Two-handed.' },
  greatsword:           { id: 'greatsword',           name: 'Greatsword',            slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 5, str: 1 },              weight: 4, shopCost: 9, twoHanded: true, description: '+1 STR. Massive blade. Two-handed.' },
  warhammer:            { id: 'warhammer',            name: 'Warhammer',             slot: 'mainhand', weaponType: '2h_mace', stats: { attack: 4, str: 2, con: 1 },     weight: 5, shopCost: 12, twoHanded: true, onHit: { effect: 'weakened', chance: 25 }, description: '+2 STR, +1 CON. Crushes armor. 25% chance to Weaken. Two-handed.' },
  shortbow:             { id: 'shortbow',             name: 'Shortbow',              slot: 'mainhand', weaponType: 'bow', stats: { attack: 2 },                      weight: 1, shopCost: 3, twoHanded: true, range: 3, description: 'A simple bow. Ranged (3). Two-handed.' },
  longbow:              { id: 'longbow',              name: 'Longbow',               slot: 'mainhand', weaponType: 'bow', stats: { attack: 3, agi: 3 },              weight: 2, shopCost: 9, twoHanded: true, range: 4, description: '+3 AGI. Ranged (4). Two-handed.' },
  crossbow:             { id: 'crossbow',             name: 'Crossbow',              slot: 'mainhand', weaponType: 'bow', stats: { attack: 4 },                      weight: 3, shopCost: 7, twoHanded: true, range: 3, description: 'Heavy bolt. Ranged (3). Two-handed.' },
  throwing_knives:      { id: 'throwing_knives',      name: 'Throwing Knives',       slot: 'mainhand', weaponType: 'thrown', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 6, range: 2, description: '+2 AGI. Ranged (2). One-handed.' },
  halberd:              { id: 'halberd',              name: 'Halberd',               slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 4, str: 1, agi: 1 },     weight: 4, shopCost: 9, twoHanded: true, combatLockBonus: 15, description: '+1 STR, +1 AGI. Polearm with reach. +15% combat lock chance. Two-handed.' },
  spear:                { id: 'spear',                name: 'Spear',                 slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 3, agi: 2 },              weight: 2, shopCost: 6, twoHanded: true, combatLockBonus: 10, description: '+2 AGI. Long thrusting weapon. +10% combat lock chance. Two-handed.' },
  maul:                  { id: 'maul',                  name: 'Maul',                  slot: 'mainhand', weaponType: '2h_mace', stats: { attack: 6, str: 3 },              weight: 5, shopCost: 14, twoHanded: true, onHit: { effect: 'weakened', chance: 70 }, description: '+3 STR. Devastating overhead smash. 70% chance to Weaken. Two-handed.' },
  elven_greatbow:        { id: 'elven_greatbow',        name: 'Elven Greatbow',        slot: 'mainhand', weaponType: 'bow', stats: { attack: 4, agi: 2 },              weight: 2, shopCost: 10, twoHanded: true, range: 5, description: '+2 AGI. Superior range (5). Two-handed.' },
  pike:                  { id: 'pike',                   name: 'Pike',                  slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 3, agi: 2, str: 1 },     weight: 3, shopCost: 7, twoHanded: true, combatLockBonus: 15, description: '+1 STR, +2 AGI. Extended reach polearm. +15% combat lock chance. Two-handed.' },
  forge_field_rapier:    { id: 'forge_field_rapier',    name: 'Field Rapier',          slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 2, agi: 1 },              weight: 1, shopCost: 4, description: '+1 AGI. A lighter rapier made for dueling and skirmishing.' },
  forge_stonehook_mace:  { id: 'forge_stonehook_mace',  name: 'Stonehook Mace',        slot: 'mainhand', weaponType: '1h_mace', stats: { attack: 2, str: 1 },              weight: 2, shopCost: 4, description: '+1 STR. A compact mace with a hook for shields and armor.' },
  forge_battle_spear:    { id: 'forge_battle_spear',    name: 'Battle Spear',          slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 3, agi: 1 },            weight: 3, shopCost: 5, twoHanded: true, combatLockBonus: 10, description: '+1 AGI. A practical polearm for shieldless line breaks.' },
  forge_warded_staff:    { id: 'forge_warded_staff',    name: 'Warded Staff',          slot: 'mainhand', weaponType: 'staff', stats: { attack: 1, int: 2 },              weight: 2, shopCost: 4, twoHanded: true, description: '+2 INT. A sturdy staff etched with warding sigils.' },
  runic_staff:           { id: 'runic_staff',           name: 'Runic Staff',           slot: 'mainhand', weaponType: 'staff', stats: { attack: 2, int: 5 },              weight: 2, shopCost: 11, twoHanded: true, action: 'runic_conjure', description: '+5 INT. Crackling with runes. Grants Runic Conjure: generate a random consumable. 3 turn CD. Two-handed.' },
  executioners_blade:    { id: 'executioners_blade',    name: 'Executioner\'s Blade',  slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 6 },                      weight: 5, shopCost: 10, twoHanded: true, description: 'Pure killing power. Two-handed.' },
  // New Two-Handed melee
  bonecrusher:           { id: 'bonecrusher',           name: 'Bonecrusher',           slot: 'mainhand', weaponType: '2h_mace', stats: { attack: 5, str: 3 },              weight: 5, shopCost: 13, twoHanded: true, onHit: { effect: 'shattered', chance: 75 }, description: '+3 STR. Shatters armor. 75% to Shatter. Two-handed.' },
  volcanic_greatsword:   { id: 'volcanic_greatsword',   name: 'Volcanic Greatsword',   slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 5, str: 2 },              weight: 4, shopCost: 14, twoHanded: true, onHit: { effect: 'burning', chance: 70 }, passives: ['fire_resistance'], description: '+2 STR. Forged in lava. 70% Burning. Fire Resistance. Two-handed.' },
  windreaver:            { id: 'windreaver',            name: 'Windreaver',            slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 4, agi: 3 },              weight: 2, shopCost: 11, twoHanded: true, passives: ['haste'], description: '+3 AGI. Slices the air itself. Grants Haste. Two-handed.' },
  soul_reaper:           { id: 'soul_reaper',           name: 'Soul Reaper',           slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 5, int: 2 },              weight: 3, shopCost: 13, twoHanded: true, passives: ['vampirism'], onHit: { effect: 'cursed', chance: 30 }, description: '+2 INT. Consumes souls. 30% Curse. Vampirism. Two-handed.' },
  thornwood_greatstaff:  { id: 'thornwood_greatstaff',  name: 'Thornwood Greatstaff',  slot: 'mainhand', weaponType: 'staff', stats: { attack: 3, int: 4, con: 1 },     weight: 2, shopCost: 12, twoHanded: true, passives: ['thorns', 'regeneration'], description: '+4 INT, +1 CON. Living wood. Grants Thorns & Regeneration. Two-handed.' },
  lightning_infused_staff: { id: 'lightning_infused_staff', name: 'Lightning Infused Staff', slot: 'mainhand', weaponType: 'staff', stats: { attack: 3, int: 3 },           weight: 2, shopCost: 13, twoHanded: true, chainLightning: { chance: 100, damage: 3 }, description: '+3 INT. Chain lightning on every hit — 3 damage to all enemies adjacent to target. Two-handed.' },
  frostreaver:           { id: 'frostreaver',           name: 'Frostreaver',           slot: 'mainhand', weaponType: '2h_axe', stats: { attack: 5, str: 1 },              weight: 4, shopCost: 11, twoHanded: true, onHit: { effect: 'frozen', chance: 45 }, description: '+1 STR. Glacial greataxe. 45% chance to Freeze. Two-handed.' },
  compound_bow:          { id: 'compound_bow',          name: 'Compound Bow',          slot: 'mainhand', weaponType: 'bow', stats: { attack: 3, agi: 2 },              weight: 2, shopCost: 10, twoHanded: true, range: 4, passives: ['piercing'], description: '+2 AGI. Mechanically reinforced. Ranged (4). Grants Piercing. Two-handed.' },
  // Wave 10 — bleeding weapons (two-handed)
  jagged_greataxe:       { id: 'jagged_greataxe',       name: 'Jagged Greataxe',       slot: 'mainhand', weaponType: '2h_axe', stats: { attack: 5, str: 2 },              weight: 4, shopCost: 12, twoHanded: true, onHit: { effect: 'bleeding', chance: 100 }, description: '+2 STR. Cruel notched blade. 100% chance to inflict Bleeding. Two-handed.' },
  barbed_spear:          { id: 'barbed_spear',          name: 'Barbed Spear',          slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 3, agi: 1 },              weight: 2, shopCost: 5, twoHanded: true, combatLockBonus: 10, onHit: { effect: 'bleeding', chance: 100 }, description: '+1 AGI. Hooked tip rips flesh. 100% Bleeding. +10% combat lock. Two-handed.' },
  barbed_shortbow:       { id: 'barbed_shortbow',       name: 'Barbed Shortbow',       slot: 'mainhand', weaponType: 'bow', stats: { attack: 2, agi: 1 },              weight: 1, shopCost: 5, twoHanded: true, range: 3, onHit: { effect: 'bleeding', chance: 100 }, description: '+1 AGI. Barbed arrows. Ranged (3). 100% Bleeding. Two-handed.' },
  razorwind_glaive:      { id: 'razorwind_glaive',      name: 'Razorwind Glaive',      slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 5, str: 1, agi: 2 },     weight: 3, shopCost: 14, twoHanded: true, onHit: { effect: 'bleeding', chance: 100 }, passives: [], description: '+1 STR, +2 AGI. Whirlwind of blades. 100% Bleeding. Two-handed.' },
  // Poison weapons
  dart_gun:              { id: 'dart_gun',              name: 'Dart Gun',              slot: 'mainhand', weaponType: 'misc', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 9, range: 3, onHit: { effect: 'poison', chance: 100 }, description: '+2 AGI. Blowpipe loaded with toxic darts. Ranged (3). 100% Poison. One-handed.' },
  plague_glaive:         { id: 'plague_glaive',         name: 'Plague Glaive',         slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 5, str: 2, agi: 1 },     weight: 4, shopCost: 13, twoHanded: true, onHit: { effect: 'poison', chance: 100, stacks: 3 }, passives: ['potent_formula'], description: '+2 STR, +1 AGI. Festering polearm. 100% Poison (2 stacks). Grants Potent Formula. Two-handed.' },
  venomcleaver:          { id: 'venomcleaver',          name: 'Venomcleaver',          slot: 'mainhand', weaponType: '1h_axe', stats: { attack: 3, str: 2 },              weight: 3, shopCost: 10, combatLockBonus: 15, onHit: { effect: 'poison', chance: 100, stacks: 2 }, description: '+2 STR. Toxin-laced waraxe. 100% Poison (2 stacks). +15% combat lock chance.' },
  // Ranged Magic Weapons
  gnarled_staff:        { id: 'gnarled_staff',        name: 'Gnarled Staff',         slot: 'mainhand', weaponType: 'magical_staff', stats: {},                                weight: 1, shopCost: 1, twoHanded: true, range: 2, magicDamage: true, description: 'A gnarled staff crackling with unstable arcane threads. Ranged (2). Two-handed.' },
  staff_of_fire:         { id: 'staff_of_fire',         name: 'Staff of Fire',         slot: 'mainhand', weaponType: 'magical_staff', stats: { attack: 2, int: 3 },              weight: 2, shopCost: 13, twoHanded: true, range: 3, magicDamage: true, description: '+3 INT. Ranged (3). Grants Fireball: 4 dmg + Burning in AoE. Two-handed.', action: 'fireball' },
  staff_of_frost:        { id: 'staff_of_frost',        name: 'Staff of Frost',        slot: 'mainhand', weaponType: 'magical_staff', stats: { attack: 2, int: 3 },              weight: 2, shopCost: 13, twoHanded: true, range: 3, magicDamage: true, passives: ['frost_resistance'], description: '+3 INT. Ranged (3). Grants Frost Ray: 3 dmg + Freeze. Frost Resistance. Two-handed.', action: 'frost_ray' },
  scepter_of_lightning:  { id: 'scepter_of_lightning',  name: 'Scepter of Lightning',  slot: 'mainhand', weaponType: 'wand', stats: { attack: 2, int: 4 },              weight: 1, shopCost: 14, range: 4, magicDamage: true, description: '+4 INT. Ranged (4). Grants Lightning Bolt: 5 dmg + Slow. One-handed.', action: 'lightning_bolt' },
  wand_of_draining:      { id: 'wand_of_draining',      name: 'Wand of Draining',      slot: 'mainhand', weaponType: 'wand', stats: { attack: 1, int: 3 },              weight: 1, shopCost: 11, range: 2, magicDamage: true, description: '+3 INT. Ranged (2). Grants Life Drain: 3 dmg + heal self. One-handed.', action: 'life_drain' },
  orb_of_venom:          { id: 'orb_of_venom',          name: 'Orb of Venom',          slot: 'mainhand', weaponType: 'wand', stats: { attack: 1, int: 2 },              weight: 1, shopCost: 10, range: 3, magicDamage: true, description: '+2 INT. Ranged (3). Grants Poison Cloud: AoE poison. One-handed.', action: 'poison_cloud' },
  fire_wand:             { id: 'fire_wand',             name: 'Fire Wand',             slot: 'mainhand', weaponType: 'wand', stats: { attack: 2, int: 1 },              weight: 1, shopCost: 5, range: 3, magicDamage: true, description: '+1 INT. Ranged (3). A simple wand crackling with flame. One-handed.' },
  // Utility Magic Weapons (no-damage actions)
  haunted_bell:          { id: 'haunted_bell',          name: 'Haunted Bell',          slot: 'mainhand', weaponType: 'wand', stats: { attack: 1, int: 2 },              weight: 1, shopCost: 8, range: 2, magicDamage: true, action: 'curse_hex', description: '+2 INT. Ranged (2). Grants Curse Hex: curse a target (no damage). 2 turn CD. One-handed.' },
  wand_of_lethargy:      { id: 'wand_of_lethargy',      name: 'Wand of Lethargy',      slot: 'mainhand', weaponType: 'wand', stats: { attack: 1, int: 2 },              weight: 1, shopCost: 8, range: 2, magicDamage: true, action: 'lethargy', description: '+2 INT. Ranged (2). Grants Lethargy: slow a target (no damage). 2 turn CD. One-handed.' },
  frozen_sigil:          { id: 'frozen_sigil',          name: 'Frozen Sigil',          slot: 'mainhand', weaponType: 'wand', stats: { attack: 1, int: 2 },              weight: 1, shopCost: 9, range: 2, magicDamage: true, action: 'flash_freeze', description: '+2 INT. Ranged (2). Grants Flash Freeze: freeze a target (no damage). 2 turn CD. One-handed.' },
  fang_tipped_wand:      { id: 'fang_tipped_wand',      name: 'Fang-Tipped Wand',      slot: 'mainhand', weaponType: 'wand', stats: { attack: 2, int: 2 },              weight: 1, shopCost: 9, range: 2, magicDamage: true, passives: ['vampirism'], description: '+2 INT. Ranged (2). Drains life on hit. Grants Vampirism. One-handed.' },
  anemic_rod:            { id: 'anemic_rod',            name: 'Anemic Rod',            slot: 'mainhand', weaponType: 'magical_staff', stats: { attack: 1, int: 3 },              weight: 2, shopCost: 9, twoHanded: true, range: 3, magicDamage: true, action: 'enfeeble', description: '+3 INT. Ranged (3). Grants Enfeeble: weaken a target (no damage). 2 turn CD. Two-handed.' },
  grimoire_of_gore:      { id: 'grimoire_of_gore',      name: 'Grimoire of Gore',      slot: 'mainhand', weaponType: 'tome', stats: { attack: 1, int: 3 },              weight: 2, shopCost: 9, twoHanded: true, range: 3, magicDamage: true, action: 'gore_curse', description: '+3 INT. Ranged (3). Grants Gore Curse: inflict bleeding on a target (no damage). 2 turn CD. Two-handed.' },

  // --- Off Hand ---
  scrappy_shield:       { id: 'scrappy_shield',       name: 'Scrappy Shield',        slot: 'offhand', weaponType: 'shield',  stats: { defense: 1 },                     weight: 1, shopCost: 1, description: 'A crude shield cobbled together from scraps. +1 DEF.' },
  wooden_shield:        { id: 'wooden_shield',        name: 'Wooden Shield',         slot: 'offhand', weaponType: 'shield',  stats: { defense: 2 },                     weight: 2, shopCost: 3, combatLockBonus: 5, description: 'A sturdy wooden shield. +5% combat lock chance.' },
  iron_shield:          { id: 'iron_shield',          name: 'Iron Shield',           slot: 'offhand', weaponType: 'shield',  stats: { defense: 3, con: 1 },             weight: 3, shopCost: 7, combatLockBonus: 10, description: '+1 CON. Heavy iron shield. +10% combat lock chance.' },
  tome_of_knowledge:    { id: 'tome_of_knowledge',    name: 'Tome of Knowledge',     slot: 'offhand', weaponType: 'misc',  stats: { int: 3 },                         weight: 1, shopCost: 7, description: '+3 INT. Ancient arcane text.' },
  buckler:              { id: 'buckler',              name: 'Buckler',               slot: 'offhand', weaponType: 'shield',  stats: { defense: 1, agi: 1 },             weight: 1, shopCost: 4, combatLockBonus: 5, description: '+1 AGI. Light and quick. +5% combat lock chance.' },
  tower_shield:          { id: 'tower_shield',          name: 'Tower Shield',          slot: 'offhand', weaponType: 'shield',  stats: { defense: 4, con: 1 },             weight: 4, shopCost: 9, combatLockBonus: 15, description: '+1 CON. Massive wall of steel. +15% combat lock chance.' },
  parrying_dagger:       { id: 'parrying_dagger',       name: 'Parrying Dagger',       slot: 'offhand', weaponType: 'misc',  stats: { attack: 1, defense: 2 },  weight: 1, shopCost: 7, description: '+2 DEF. Deflect and counter.' },
  orb_of_storms:         { id: 'orb_of_storms',         name: 'Orb of Storms',         slot: 'offhand', weaponType: 'misc',  stats: { int: 2, attack: 1 },              weight: 1, shopCost: 8, onHit: { effect: 'slowed', chance: 100 }, description: '+2 INT. Crackles with lightning. 100% chance to Slow.' },
  spiked_shield:         { id: 'spiked_shield',         name: 'Spiked Shield',         slot: 'offhand', weaponType: 'shield',  stats: { defense: 2, attack: 1 },          weight: 2, shopCost: 5, passives: ['retaliate'], combatLockBonus: 10, description: 'Offensive defense. +10% combat lock chance. Grants Retaliate.' },
  healing_totem:         { id: 'healing_totem',         name: 'Healing Totem',         slot: 'offhand', weaponType: 'misc',  stats: { con: 2, int: 1 },                 weight: 1, shopCost: 10, description: 'Grants Heal Allies: restore 3 HP to adjacent allies.', action: 'heal_allies' },
  frost_ward:            { id: 'frost_ward',            name: 'Frost Ward',            slot: 'offhand', weaponType: 'shield',  stats: { defense: 2, int: 1 },              weight: 1, shopCost: 7, passives: ['frost_resistance'], description: '+1 INT. Icy protective ward. Grants Frost Resistance.' },
  living_shield:         { id: 'living_shield',         name: 'Living Shield',         slot: 'offhand', weaponType: 'shield',  stats: { defense: 3, con: 1 },              weight: 2, shopCost: 8, passives: ['regeneration', 'thorns'], combatLockBonus: 10, description: '+1 CON. Grows and mends. +10% combat lock chance. Grants Regeneration & Thorns.' },
  mirror_shield:         { id: 'mirror_shield',         name: 'Mirror Shield',         slot: 'offhand', weaponType: 'shield',  stats: { defense: 2, agi: 1 },              weight: 2, shopCost: 9, passives: ['reflect', 'magic_resistance'], combatLockBonus: 10, description: '+1 AGI. Deflects projectiles and resists magic. +10% combat lock chance. Grants Reflect & Magic Resistance.' },
  warhorn:               { id: 'warhorn',               name: 'Warhorn',               slot: 'offhand', weaponType: 'misc',  stats: { str: 1, con: 1 },                  weight: 1, shopCost: 9, description: 'Grants Battle Cry: +2 ATK to all adjacent allies for 2 turns.', action: 'battle_cry' },
  lantern_of_souls:      { id: 'lantern_of_souls',      name: 'Lantern of Souls',      slot: 'offhand', weaponType: 'misc',  stats: { int: 3 },                          weight: 1, shopCost: 10, passives: ['vampirism'], description: '+3 INT. Feeds on fallen spirits. Grants Vampirism.' },
  orb_of_fire:           { id: 'orb_of_fire',           name: 'Orb of Fire',           slot: 'offhand', weaponType: 'misc',  stats: {},                                  weight: 1, shopCost: 9, onHit: { effect: 'burning', chance: 100 }, description: 'Wreathed in flame. Attacks inflict Burning.' },
  orb_of_frost:          { id: 'orb_of_frost',          name: 'Orb of Frost',          slot: 'offhand', weaponType: 'misc',  stats: {},                                  weight: 1, shopCost: 9, onHit: { effect: 'frozen', chance: 100 }, description: 'Bitter cold radiates. Attacks inflict Freeze.' },
  orb_of_poison:         { id: 'orb_of_poison',         name: 'Orb of Poison',         slot: 'offhand', weaponType: 'misc',  stats: {},                                  weight: 1, shopCost: 8, onHit: { effect: 'poison', chance: 100, stacks: 2 }, description: 'Drips with venom. Attacks inflict Poison (2 stacks).' },
  orb_of_lightning:      { id: 'orb_of_lightning',      name: 'Orb of Lightning',      slot: 'offhand', weaponType: 'misc',  stats: {},                                  weight: 1, shopCost: 10, chainLightning: { chance: 100, damage: 2 }, description: 'Crackling energy. Attacks chain lightning to adjacent enemies for 2 damage.' },
  orb_of_vampirism:      { id: 'orb_of_vampirism',      name: 'Orb of Vampirism',      slot: 'offhand', weaponType: 'misc',  stats: {},                                  weight: 1, shopCost: 9, passives: ['vampirism'], description: 'Pulses with dark hunger. Attacks drain life (heal on hit).' },
  tome_of_curses:        { id: 'tome_of_curses',        name: 'Tome of Curses',        slot: 'offhand', weaponType: 'misc',  stats: { int: 2 },                          weight: 1, shopCost: 7, onHit: { effect: 'cursed', chance: 100 }, description: '+2 INT. Whispers dark hexes. 100% chance to Curse on hit.' },
  shrunken_head:         { id: 'shrunken_head',         name: 'Shrunken Head',         slot: 'offhand', weaponType: 'misc',  stats: { int: 1, con: 1 },                  weight: 0, shopCost: 6, passives: ['poison_resistance'], onHit: { effect: 'weakened', chance: 100 }, description: '+1 INT, +1 CON. Macabre talisman. 100% chance to Weaken. Grants Poison Resistance.' },
  // Wave 10 — bleeding offhand
  serrated_buckler:      { id: 'serrated_buckler',      name: 'Serrated Buckler',      slot: 'offhand', weaponType: 'shield',  stats: { defense: 1 },                       weight: 1, shopCost: 4, onHit: { effect: 'bleeding', chance: 100 }, combatLockBonus: 5, description: '+1 DEF. Jagged rim cuts on contact. 100% Bleeding. +5% combat lock.' },
  carrot_on_a_stick:     { id: 'carrot_on_a_stick',     name: 'Personal Carrot on a Stick', slot: 'offhand', weaponType: 'misc', stats: {},                              weight: 0, shopCost: 10, moveBonus: 3, description: 'Always just out of reach. +3 movement speed.' },
  main_gauche:            { id: 'main_gauche',            name: 'Main Gauche',            slot: 'offhand', weaponType: 'misc',  stats: { defense: 1, agi: 1 },               weight: 1, shopCost: 7, selfBuffOnHit: { effect: 'deadly_focus', chance: 25 }, description: '+1 AGI. Duelist\'s off-hand blade. 25% chance on hit to gain Deadly Focus (guaranteed crit on next attack).' },
  forge_weathered_shield: { id: 'forge_weathered_shield', name: 'Weathered Shield',     slot: 'offhand', weaponType: 'shield', stats: { defense: 1, agi: 1 },             weight: 1, shopCost: 4, combatLockBonus: 5, description: '+1 AGI. A repairable shield built for ranged support and brawling.' },
  bucket_of_water:       { id: 'bucket_of_water',       name: 'Bucket of Water',       slot: 'offhand', weaponType: 'misc',  stats: { defense: 1 },                      weight: 1, shopCost: 4, passives: ['fire_resistance'], description: '+1 DEF. A sloshing bucket. Immune to Burning. Grants Fire Resistance.' },
  pot_of_boiling_water:  { id: 'pot_of_boiling_water',  name: 'Pot of Boiling Water',  slot: 'offhand', weaponType: 'misc',  stats: { defense: 1 },                      weight: 1, shopCost: 3, passives: ['fire_resistance'], boilingWater: true, description: '+1 DEF. Scalding hot. Immune to Burning, but take 1 damage each time fire is extinguished. Grants Fire Resistance.' },

  // --- Accessory ---
  ring_of_power:        { id: 'ring_of_power',        name: 'Ring of Power',         slot: 'accessory', stats: { str: 3, attack: 1 },             weight: 0, shopCost: 9, description: '+3 STR. Pulses with energy.' },
  amulet_of_protection: { id: 'amulet_of_protection', name: 'Amulet of Protection',  slot: 'accessory', stats: { defense: 2, con: 2 },            weight: 0, shopCost: 8, description: '+2 CON. Wards off harm.' },
  lucky_charm:          { id: 'lucky_charm',          name: 'Lucky Charm',           slot: 'accessory', stats: { str: 1, agi: 1, con: 1, int: 1 }, weight: 0, shopCost: 7, description: '+1 to all stats.' },
  cloak_pin_of_shadows: { id: 'cloak_pin_of_shadows', name: 'Cloak Pin of Shadows',  slot: 'accessory', stats: { agi: 3 },                        weight: 0, shopCost: 7, description: '+3 AGI. Blend into darkness.' },
  warrior_pendant:      { id: 'warrior_pendant',      name: "Warrior's Pendant",     slot: 'accessory', stats: { str: 2, con: 1 },                weight: 0, shopCost: 6, description: '+2 STR, +1 CON. A soldier\'s heirloom.' },
  berserker_torc:        { id: 'berserker_torc',        name: 'Berserker\'s Torc',     slot: 'accessory', stats: { str: 3 },                        weight: 0, shopCost: 11, description: '+3 STR. Grants Berserk: +5 ATK, -3 DEF for 2 turns.', action: 'berserk' },
  pendant_of_warding:    { id: 'pendant_of_warding',    name: 'Pendant of Warding',    slot: 'accessory', stats: { defense: 2, int: 1 },             weight: 0, shopCost: 6, passives: ['reflect'], description: '+1 INT. Wards against physical harm. Grants Reflect.' },
  scouts_compass:        { id: 'scouts_compass',        name: 'Scout\'s Compass',      slot: 'accessory', stats: { agi: 2, int: 1 },                weight: 0, shopCost: 6, description: '+2 AGI, +1 INT. Always find the way.' },
  band_of_resilience:    { id: 'band_of_resilience',    name: 'Band of Resilience',    slot: 'accessory', stats: { con: 3 },                        weight: 0, shopCost: 7, passives: ['regeneration'], description: '+3 CON. Unyielding endurance. Grants Regeneration.' },
  signet_of_command:     { id: 'signet_of_command',     name: 'Signet of Command',     slot: 'accessory', stats: { str: 2, int: 2 },                weight: 0, shopCost: 8, description: '+2 STR, +2 INT. A leader\'s authority.' },
  talisman_of_thorns:    { id: 'talisman_of_thorns',    name: 'Talisman of Thorns',    slot: 'accessory', stats: { defense: 1, con: 2 },            weight: 0, shopCost: 7, passives: ['thorns'], description: '+1 DEF, +2 CON. Barbed aura. Grants Thorns.' },
  ring_of_piercing:      { id: 'ring_of_piercing',      name: 'Ring of Piercing',      slot: 'accessory', stats: { attack: 1, agi: 1 },             weight: 0, shopCost: 8, passives: ['piercing'], description: '+1 ATK, +1 AGI. Strikes find weak points. Grants Piercing (-2 enemy DEF).' },
  vanguard_medallion:    { id: 'vanguard_medallion',    name: 'Vanguard Medallion',    slot: 'accessory', stats: { defense: 2, str: 1 },            weight: 0, shopCost: 8, passives: ['bulwark'], description: '+1 STR. Iron resolve reduces damage. Grants Bulwark (-1 dmg taken).' },
  amulet_of_poison_ward: { id: 'amulet_of_poison_ward', name: 'Amulet of Poison Ward', slot: 'accessory', stats: { con: 2, int: 1 },               weight: 0, shopCost: 6, passives: ['poison_resistance'], description: '+2 CON, +1 INT. Purifies toxins. Grants Poison Resistance.' },
  emblem_of_the_phoenix: { id: 'emblem_of_the_phoenix', name: 'Emblem of the Phoenix', slot: 'accessory', stats: { str: 1, con: 1, int: 1 },       weight: 0, shopCost: 10, passives: ['regeneration', 'fire_resistance'], description: '+1 to STR/CON/INT. Eternal flame. Grants Regeneration & Fire Resistance.' },
  serpent_ring:          { id: 'serpent_ring',          name: 'Serpent Ring',          slot: 'accessory', stats: { agi: 1, int: 1 },                weight: 0, shopCost: 7, onHit: { effect: 'poison', chance: 75 }, description: '+1 AGI, +1 INT. Coiled serpent ring. 75% chance to inflict Poison on hit.' },
  amulet_of_frost_ward:  { id: 'amulet_of_frost_ward',  name: 'Amulet of Frost Ward',  slot: 'accessory', stats: { con: 1, int: 1 },                weight: 0, shopCost: 5, passives: ['frost_resistance'], description: '+1 CON, +1 INT. Cold-warding charm. Grants Frost Resistance.' },
  amulet_of_evasion:     { id: 'amulet_of_evasion',     name: 'Amulet of Evasion',     slot: 'accessory', stats: { },                        weight: 0, shopCost: 8, passives: ['evasion'], description: '+1 AGI. Shimmers when danger approaches. +3% dodge chance. Grants Evasion.' },
  atlas_charm:           { id: 'atlas_charm',           name: "Atlas' Charm",          slot: 'accessory', stats: { str: 1 },                     weight: 0, shopCost: 12, passives: ['weightless'], description: '+1 STR. A titan\'s gift — equipment feels light as air. Grants Weightless (ignore weight penalties).' },
  // --- Wave 21: New Accessories ---
  fighting_ring:         { id: 'fighting_ring',         name: 'Fighting Ring',           slot: 'accessory', stats: { str: 1 },                     weight: 0, shopCost: 10, action: 'double_strike', description: '+1 STR. Grants Double Strike action. 2 turn CD.' },
  blinking_amulet:       { id: 'blinking_amulet',       name: 'Blinking Amulet',         slot: 'accessory', stats: { agi: 2 },                     weight: 0, shopCost: 12, action: 'blink', description: '+2 AGI. Grants Blink: teleport up to 3 tiles in any direction, ignoring walls and combat lock. 3 turn CD.' },
  smoke_bomb:            { id: 'smoke_bomb',            name: 'Smoke Bomb',              slot: 'accessory', stats: {},                              weight: 0, shopCost: 10, action: 'smoke_bomb', description: 'Grants Smoke Bomb action: Deploy smoke for 3 turns. You and adjacent allies cannot be targeted by ranged attacks.' },
  corrupted_chalice:     { id: 'corrupted_chalice',     name: 'Corrupted Chalice',       slot: 'accessory', stats: { int: 1 },                     weight: 0, shopCost: 9, action: 'corrupted_chalice', description: '+1 INT. Sacrifice 5 HP to heal an adjacent ally for 5 HP. 2 turn CD.' },
  bottled_lightning:     { id: 'bottled_lightning',     name: 'Bottled Lightning',       slot: 'accessory', stats: { int: 1 },                     weight: 0, shopCost: 11, action: 'bottled_lightning', description: '+1 INT. Deal 3 damage to a target within 2 tiles, then chain 2 damage to one adjacent enemy. 3 turn CD.' },
  voodoo_doll:           { id: 'voodoo_doll',           name: 'Voodoo Doll',             slot: 'accessory', stats: { int: 1 },                     weight: 0, shopCost: 10, action: 'voodoo_doll', description: '+1 INT. Transfer all your debuffs onto an enemy within 3 tiles. 3 turn CD.' },
  ambidextrous_ring:     { id: 'ambidextrous_ring',     name: 'Ambidextrous Ring',       slot: 'accessory', stats: { agi: 1 },                     weight: 0, shopCost: 10, passives: ['dual_wield'], description: '+1 AGI. Grants Dual Wield: equip a weapon in the offhand for its stats (mainhand only swings).' },

  // --- Wave 3: Special Items ---
  mechanical_arm:       { id: 'mechanical_arm',       name: 'Mechanical Arm Extender', slot: 'accessory', stats: {},                               weight: 1, shopCost: 10, passives: ['extended_reach'], description: 'Extends melee weapon reach by 1 tile. Grants Extended Reach.' },
  lute:                 { id: 'lute',                 name: 'Lute',                    slot: 'mainhand', weaponType: 'instrument', stats: { attack: 0 },                     weight: 1, shopCost: 12, twoHanded: true, noAttack: true, passives: ['bardic_inspiration'], description: 'Cannot attack. Aura: +2 ATK to allies within 3 tiles. Two-handed.' },
  harp:                 { id: 'harp',                 name: 'Harp',                    slot: 'mainhand', weaponType: 'instrument', stats: { attack: 0 },                     weight: 1, shopCost: 12, twoHanded: true, noAttack: true, passives: ['bardic_dance', 'bardic_range'], description: 'Cannot attack. Aura: +10% dodge and +1 ranged weapon range to allies within 3 tiles. Two-handed.' },
  bugle:                { id: 'bugle',                name: 'Bugle',                   slot: 'mainhand', weaponType: 'instrument', stats: { attack: 0 },                     weight: 1, shopCost: 10, noAttack: true, action: 'crescendo', description: 'Cannot attack. Grants Crescendo: +4 ATK to allies within 3 tiles. 2 turn CD. One-handed.' },
  war_drum:             { id: 'war_drum',             name: 'War Drum',                slot: 'mainhand', weaponType: 'instrument', stats: { attack: 0 },                     weight: 2, shopCost: 10, twoHanded: true, noAttack: true, action: 'battle_march', description: 'Cannot attack. Grants Battle March: +3 movement to allies within 2 tiles. 2 turn CD. Two-handed.' },
  suicide_vest:         { id: 'suicide_vest',         name: 'Suicide Vest',            slot: 'body', armorType: 'cloth',     stats: {},                                weight: 1, shopCost: 8, action: 'detonate', description: 'Grants Detonate: kill self and deal 10 damage to all units within 3 tiles.' },
  scope:                { id: 'scope',                name: 'Scope',                   slot: 'accessory', stats: {},                               weight: 0, shopCost: 9, passives: ['scope_range'], description: '+1 range for bows, crossbows, and magic ranged weapons. Grants Scope.' },
  precision_scope:      { id: 'precision_scope',      name: 'Precision Scope',         slot: 'accessory', stats: {},                               weight: 0, shopCost: 11, action: 'precision_shot', description: 'Grants Precision Shot: guaranteed ranged hit (ranged weapons only). 3 turn CD.' },
  grappling_hook:       { id: 'grappling_hook',       name: 'Grappling Hook',          slot: 'offhand', weaponType: 'misc',  stats: {},                                weight: 1, shopCost: 10, action: 'grapple', description: 'Grants Grapple: pull any unit 2-5 tiles away to an adjacent tile and combat lock them. 2 turn CD.' },
  net:                  { id: 'net',                  name: 'Net',                     slot: 'offhand', weaponType: 'misc',  stats: {},                                weight: 1, shopCost: 9, action: 'ensnare', description: 'Grants Ensnare: immobilize a unit within 3 tiles for 2 turns. 4 turn CD.' },
  cracked_halo:         { id: 'cracked_halo',         name: 'Cracked Halo',            slot: 'head', armorType: 'cloth',     stats: {},                                weight: 0, shopCost: 11, action: 'divine_barrier', description: 'Grants Divine Barrier: gain 10 temporary HP for 3 turns. 3 turn CD.' },
  ring_of_regeneration: { id: 'ring_of_regeneration', name: 'Ring of Regeneration',    slot: 'accessory', stats: {},                               weight: 0, shopCost: 8, passives: ['regeneration'], description: 'Passive +1 HP regen per turn. Grants Regeneration.' },
  // ---- Hands (Gloves) ----
  leather_gloves:        { id: 'leather_gloves',        name: 'Leather Gloves',         slot: 'hands', armorType: 'leather',    stats: { defense: 1 },                       weight: 0, shopCost: 2, description: 'Simple leather grips. +1 DEF.' },
  iron_gauntlets:        { id: 'iron_gauntlets',        name: 'Iron Gauntlets',         slot: 'hands', armorType: 'plate',    stats: { str: 1, defense: 1 },              weight: 2, shopCost: 5, description: '+1 STR, +1 DEF. Heavy but protective.' },
  thiefs_gloves:         { id: 'thiefs_gloves',         name: "Thief's Gloves",         slot: 'hands', armorType: 'leather',    stats: { agi: 3 },                          weight: 0, shopCost: 7, passives: ['evasion'], description: '+3 AGI. Nimble fingers. Grants Evasion (+3% dodge).' },
  spiked_knuckles:       { id: 'spiked_knuckles',       name: 'Spiked Knuckles',        slot: 'hands', armorType: 'plate',    stats: { attack: 2, str: 2 },               weight: 1, shopCost: 9, passives: ['piercing'], description: '+2 ATK, +2 STR. Brutal striking power. Grants Piercing (-2 enemy DEF).' },
  menders_wraps:         { id: 'menders_wraps',         name: "Mender's Wraps",         slot: 'hands', armorType: 'cloth',    stats: { int: 3, con: 1 },                  weight: 0, shopCost: 8, passives: ['regeneration'], description: '+3 INT, +1 CON. Blessed bandages that mend wounds. Grants Regeneration.' },
  casting_mittens:       { id: 'casting_mittens',       name: 'Casting Mittens',        slot: 'hands', armorType: 'cloth',    stats: { int: 1 },                          weight: 0, shopCost: 1, description: '+1 INT. Simple cloth mittens that help channel magic.' },
  gauntlets_of_grabbing: { id: 'gauntlets_of_grabbing', name: 'Gauntlets of Grabbing',  slot: 'hands', armorType: 'plate',    stats: { str: 2, defense: 1 },              weight: 2, shopCost: 10, action: 'grab', combatLockBonus: 15, description: '+2 STR, +1 DEF. Grants Grab: combat lock an adjacent enemy for 1 turn. +15% combat lock chance. 2 turn CD.' },
  grippers:              { id: 'grippers',              name: 'Grippers',               slot: 'hands', armorType: 'cloth',    stats: {},                                   weight: 0, shopCost: 11, passives: ['dual_grip'], description: 'No stats. Allows equipping an offhand item while wielding a two-handed weapon. Grants Strong Grip.' },
  gloves_of_haste:      { id: 'gloves_of_haste',      name: 'Gloves of Haste',       slot: 'hands', armorType: 'leather',    stats: { attack: 1, agi: 1 },              weight: 0, shopCost: 12, description: 'Grants Double Strike action.', action: 'double_strike' },
  duelists_gloves:       { id: 'duelists_gloves',       name: "Duelist's Gloves",       slot: 'hands', armorType: 'leather',    stats: { agi: 2 },                          weight: 0, shopCost: 10, passives: ['dual_wield'], description: '+2 AGI. Grants Dual Wield: equip a weapon in the offhand for its stats (mainhand only swings).' },
  climbers_grips:        { id: 'climbers_grips',        name: "Climber's Grips",        slot: 'hands', armorType: 'leather',    stats: { agi: 1, str: 1 },                  weight: 0, shopCost: 5, passives: ['climbing'], description: '+1 AGI, +1 STR. Sure grip for any surface. Grants Climbing.' },
  gauntlets_of_retribution: { id: 'gauntlets_of_retribution', name: 'Gauntlets of Retribution', slot: 'hands', armorType: 'plate', stats: { defense: 1, str: 1 },           weight: 2, shopCost: 8, passives: ['retaliate'], description: '+1 DEF, +1 STR. Strike back when struck. Grants Retaliate.' },
  plated_gauntlets:      { id: 'plated_gauntlets',      name: 'Plated Gauntlets',       slot: 'hands', armorType: 'plate',    stats: { defense: 1 },                      weight: 2, shopCost: 6, passives: ['bulwark'], description: '+1 DEF. Heavy iron plates absorb blows. Grants Bulwark (-1 dmg taken).' },
  oven_mitts_of_uppercut: { id: 'oven_mitts_of_uppercut', name: 'Padded Knucklewraps',   slot: 'hands', armorType: 'cloth', stats: { defense: 1, attack: 2 },          weight: 0, shopCost: 8, description: '+1 DEF, +2 ATK. Light wraps that cushion and strike cleanly.' },
  gauntlets_of_gentle_thought: { id: 'gauntlets_of_gentle_thought', name: 'Sageforged Gauntlets', slot: 'hands', armorType: 'chain', stats: { defense: 2, int: 1 }, weight: 2, shopCost: 8, description: '+2 DEF, +1 INT. Tempered steel gauntlets with runic inlays.' },
  yarnbound_knucklers:   { id: 'yarnbound_knucklers',   name: 'Reinforced Wraps',      slot: 'hands', armorType: 'cloth',    stats: { defense: 1, str: 2 },              weight: 0, shopCost: 7, description: '+1 DEF, +2 STR. Tight wraps that trade comfort for impact.' },
  forge_braced_gloves:   { id: 'forge_braced_gloves',   name: 'Braced Gloves',         slot: 'hands', armorType: 'cloth',    stats: { defense: 1, attack: 1 },           weight: 0, shopCost: 4, description: '+1 ATK. Padded gloves that cushion blows and help strikes land.' },
  forge_patchwork_gauntlets:{ id: 'forge_patchwork_gauntlets', name: 'Patchwork Gauntlets', slot: 'hands', armorType: 'plate',    stats: { defense: 1, str: 1 },              weight: 2, shopCost: 5, description: '+1 STR. Forge-built gauntlets with patchwork steel plates.' },


  // ---- Special Items ----
  horse:                 { id: 'horse',                 name: 'Horse',                  slot: 'accessory', stats: {},                                weight: 0, shopCost: 14, passives: ['mounted'], description: 'Mounted movement. Extremely fast. Grants Mounted (+5 move).' },
  accordion:             { id: 'accordion',             name: 'Accordion',              slot: 'mainhand', weaponType: 'instrument', stats: { attack: 0, int: 2 },               weight: 2, shopCost: 12, twoHanded: true, noAttack: true, passives: ['discordant_aura'], description: '+2 INT. Cannot attack. Aura: -15% dodge to enemies within 3 tiles. Two-handed.' },
  gladiator_net:         { id: 'gladiator_net',         name: 'Gladiator Net',          slot: 'offhand', weaponType: 'misc',  stats: { defense: 1 },                      weight: 1, shopCost: 10, combatLockBonus: 80, description: '+1 DEF. Entangling mesh. +80% combat lock chance (100% total with base 20%).' },
  // ---- Wave 6 — new items ----
  fishing_rod:            { id: 'fishing_rod',            name: 'Fishing Rod',            slot: 'mainhand', weaponType: 'tool', stats: { attack: 0 },                       weight: 1, shopCost: 6, twoHanded: true, noAttack: true, action: 'fish', description: 'Cannot attack. Target adjacent water to catch a Fresh Fish. 2 turn CD.' },
  double_edged_sword:     { id: 'double_edged_sword',     name: 'Double Edged Sword',     slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 3 },                       weight: 3, shopCost: 12, twoHanded: true, onHit: { effect: 'bleeding', chance: 100 }, selfBleed: true, description: '+3 ATK. Attacks hit TWICE. Always causes bleeding to yourself on each hit. 100% to bleed target. Two-handed.' },
  third_leg:              { id: 'third_leg',              name: 'Third Leg',              slot: 'accessory', stats: { agi: 1, con: 1 },                  weight: 0, shopCost: 10, passives: ['haste'], description: '+1 AGI, +1 CON. Grants Haste (+2 movement). If you know what I mean.' },
    pocket_pooka:           { id: 'pocket_pooka',           name: 'Pocket Pooka',           slot: 'accessory', stats: { int: 2 },                          weight: 0, shopCost: 16, action: 'summon_pooka', description: '+2 INT. One use only. Summon a powerful Pooka that fights for you, then this becomes an Empty Pocket.' },
    empty_pocket:           { id: 'empty_pocket',           name: 'Empty Pocket',           slot: 'accessory', stats: { int: 2 },                          weight: 0, shopCost: 2, description: '+2 INT. The Pooka is gone, but the pocket still feels oddly useful.' },
  tome_of_summon_zombie:  { id: 'tome_of_summon_zombie',  name: 'Tome of Summon Zombie',  slot: 'offhand', weaponType: 'misc',  stats: { int: 1 },                          weight: 1, shopCost: 10, action: 'summon_zombie', description: '+1 INT. Summon a Zombie Warrior on an adjacent tile. 4 turn CD.' },
  boomerang:              { id: 'boomerang',              name: 'Boomerang',              slot: 'mainhand', weaponType: 'thrown', stats: { attack: 3, agi: 1 },               weight: 1, shopCost: 10, range: 4, noAttack: true, action: 'boomerang_throw', description: '+3 ATK, +1 AGI. Cannot normal attack. Boomerang Throw: hit all enemies in a line (up to 4 tiles).' },
  // Wave 9 — new items
  windstrike_blade:    { id: 'windstrike_blade',    name: 'Windstrike Blade',    slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 5, str: 1, agi: 1 },     weight: 3, shopCost: 13, twoHanded: true, selfBuffOnHit: { effect: 'hastened', chance: 100 }, description: '+1 STR, +1 AGI. Gains +3 movement for 3 turns on hit. Two-handed.' },
  madmans_greatsword:       { id: 'madmans_greatsword',       name: "Madman's Greatsword",      slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 4 },                      weight: 4, shopCost: 14, twoHanded: true, cursed: true, passives: ['unarmored_fury'], description: '+4 ATK. If wearing no other gear (besides an accessory): +5 ATK, +3 movement, +3 STR/INT/CON, +8 AGI, but DEF set to 0. Grants Unarmored Fury. Two-handed. CURSED: Cannot be unequipped.' },
  keen_blade:               { id: 'keen_blade',               name: 'Keen Blade',               slot: 'mainhand', weaponType: '1h_sword', stats: { attack: 3, agi: 1 },              weight: 1, shopCost: 9, passives: ['precision', 'precision'], description: '+1 AGI. Razor-sharp edge. Grants Precision ×2.' },
  // Wave 10 — bleeding weapons (one-handed)
  rusty_shiv:                { id: 'rusty_shiv',                name: 'Rusty Shiv',                slot: 'mainhand', weaponType: 'dagger', stats: { attack: 1 },                      weight: 0, shopCost: 2, onHit: { effect: 'bleeding', chance: 100 }, description: 'A filthy rusted blade. 100% chance to inflict Bleeding.' },
  barbed_flail:              { id: 'barbed_flail',              name: 'Barbed Flail',              slot: 'mainhand', weaponType: '1h_mace', stats: { attack: 3, str: 2 },              weight: 3, shopCost: 8, onHit: { effect: 'bleeding', chance: 100 }, description: '+2 STR. Hooked chain tears flesh. 100% chance to inflict Bleeding.' },
  bloodletters_knife:        { id: 'bloodletters_knife',        name: "Bloodletter's Knife",       slot: 'mainhand', weaponType: 'dagger', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 7, onHit: { effect: 'bleeding', chance: 100 }, passives: ['precision'], description: '+2 AGI. Surgical strikes open wounds. 100% Bleeding. Grants Precision.' },
  hooked_dagger:             { id: 'hooked_dagger',             name: 'Hooked Dagger',             slot: 'mainhand', weaponType: 'dagger', stats: { attack: 2, agi: 1 },              weight: 1, shopCost: 6, combatLockBonus: 50, description: '+1 AGI. Curved hook catches flesh. +50% combat lock chance (70% total).' },
  gauntlets_of_precision:   { id: 'gauntlets_of_precision',   name: 'Gauntlets of Precision',   slot: 'hands', armorType: 'leather',    stats: { agi: 1 },                  weight: 0, shopCost: 8, passives: ['precision', 'precision'], description: '+1 AGI. Steady hands for lethal strikes. Grants Precision ×2.' },
  ring_of_precision:        { id: 'ring_of_precision',        name: 'Ring of Precision',        slot: 'accessory', stats: { },                         weight: 0, shopCost: 7, passives: ['precision'], description: 'Sharpens focus. Grants Precision.' },
  // Wave 12 — retaliation items
  ogre_head_on_a_stick:      { id: 'ogre_head_on_a_stick',      name: 'Ogre Head on a Stick',      slot: 'mainhand', weaponType: 'club', stats: { attack: 3, str: 1 },              weight: 3, shopCost: 9, passives: ['retaliate'], description: '+1 STR. A severed ogre head that still bites back. Grants Retaliate.' },
  gloves_of_retaliation:     { id: 'gloves_of_retaliation',     name: 'Gloves of Retaliation',     slot: 'hands', armorType: 'leather',    stats: {},                                   weight: 1, shopCost: 7, passives: ['retaliate'], description: 'Enchanted gloves that punish aggressors. Grants Retaliate.' },
  eyes_on_back_of_head:      { id: 'eyes_on_back_of_head',      name: 'Eyes on Back of Head',      slot: 'accessory', stats: {},                                  weight: 0, shopCost: 8, passives: ['retaliate'], description: 'Unsettling magical eyes that see all angles. Grants Retaliate.' },
  karmic_shield:             { id: 'karmic_shield',             name: 'Karmic Shield',             slot: 'offhand', weaponType: 'shield',  stats: { defense: 3 },                      weight: 3, shopCost: 8, passives: ['retaliate'], combatLockBonus: 10, description: '+3 DEF. What goes around comes around. +10% combat lock chance. Grants Retaliate.' },
  spiteful_flail:            { id: 'spiteful_flail',            name: 'Spiteful Flail',            slot: 'mainhand', weaponType: '2h_mace', stats: { attack: 5, str: 2 },              weight: 4, shopCost: 12, twoHanded: true, passives: ['retaliate'], description: '+2 STR. A cruel spiked flail that strikes back with vengeance. Grants Retaliate. Two-handed.' },
  // Wave 13 — executioner items
  headsmans_greataxe:        { id: 'headsmans_greataxe',        name: "Headsman's Greataxe",       slot: 'mainhand', weaponType: '2h_axe', stats: { attack: 6, str: 2 },              weight: 5, shopCost: 13, twoHanded: true, passives: ['executioner'], description: '+2 STR. Finish them. Deal double damage to enemies below 25% HP. Grants Executioner. Two-handed.' },
  executioners_hood:         { id: 'executioners_hood',         name: "Executioner's Hood",        slot: 'head', armorType: 'cloth',     stats: { str: 2 },                          weight: 1, shopCost: 8, passives: ['executioner'], description: '+2 STR. The masked face of final judgment. Grants Executioner.' },
  ring_of_the_coup_de_grace: { id: 'ring_of_the_coup_de_grace', name: 'Ring of the Coup de Gr\u00e2ce', slot: 'accessory', stats: { attack: 1 },                    weight: 0, shopCost: 9, passives: ['executioner'], description: '+1 ATK. Sense weakness, strike true. Grants Executioner.' },
  // Wave 13 — sundering blows items
  sunder_maul:               { id: 'sunder_maul',               name: 'Sunder Maul',               slot: 'mainhand', weaponType: '2h_mace', stats: { attack: 4, str: 2 },              weight: 4, shopCost: 11, twoHanded: true, passives: ['sundering_blows'], description: '+2 STR. Shatters armor with every swing. Attacks apply Sundered (-2 DEF). Grants Sundering Blows. Two-handed.' },
  gauntlets_of_ruin:         { id: 'gauntlets_of_ruin',         name: 'Gauntlets of Ruin',         slot: 'hands', armorType: 'plate',    stats: { str: 2 },                          weight: 2, shopCost: 9, passives: ['sundering_blows'], description: '+2 STR. Corrode armor on contact. Attacks apply Sundered (-2 DEF). Grants Sundering Blows.' },
  // Wave 13 — overwatch items
  flintlock_rifle:           { id: 'flintlock_rifle',           name: 'Flintlock Rifle',           slot: 'mainhand', weaponType: 'firearm', stats: { attack: 5 },                      weight: 3, shopCost: 14, twoHanded: true, range: 5, passives: ['overwatch'], description: 'Long-range firearm. Ranged (5). Fires at enemies who move into range. Grants Overwatch. Two-handed.' },
  watchtower_pendant:        { id: 'watchtower_pendant',        name: 'Watchtower Pendant',        slot: 'accessory', stats: { int: 1, agi: 1 },                 weight: 0, shopCost: 10, passives: ['overwatch'], description: '+1 INT, +1 AGI. Ever-vigilant eye. Fires at enemies who enter weapon range. Grants Overwatch.' },
  // Wave 13 — stone skin items
  petrified_buckler:         { id: 'petrified_buckler',         name: 'Petrified Buckler',         slot: 'offhand', weaponType: 'shield',  stats: { defense: 3, con: 1 },              weight: 3, shopCost: 8, passives: ['stone_skin_passive'], combatLockBonus: 5, description: '+1 CON. Fossilized wood turned to stone. Immune to Bleeding & Poison. +5% combat lock. Grants Stone Skin.' },
  // Wave 13 — martyr items
  martyrs_vestments:         { id: 'martyrs_vestments',         name: "Martyr's Vestments",        slot: 'body', armorType: 'cloth',     stats: { defense: 2, con: 3 },              weight: 1, shopCost: 9, passives: ['martyr'], description: '+2 DEF, +3 CON. When you fall, adjacent allies heal 10 HP. Destroyed on death. Grants Martyr.' },
  sacrificial_scarf:         { id: 'sacrificial_scarf',         name: 'Sacrificial Scarf',         slot: 'head', armorType: 'cloth',     stats: { defense: 1, con: 2, int: 1 },      weight: 0, shopCost: 9, passives: ['martyr'], description: '+1 DEF, +2 CON, +1 INT. Woven from blessed threads. When you fall, adjacent allies heal 10 HP. Destroyed on death. Grants Martyr.' },
  // Wave 13 — jinx items
  voodoo_fiddle:             { id: 'voodoo_fiddle',             name: 'Voodoo Fiddle',             slot: 'mainhand', weaponType: 'instrument', stats: { attack: 0, int: 3 },               weight: 2, shopCost: 11, twoHanded: true, noAttack: true, passives: ['jinx'], description: '+3 INT. Cannot attack. Eerie melodies hex nearby foes. Enemies within 3 tiles have -15% crit chance. Grants Jinx. Two-handed.' },
  // Wave 13 — momentum items
  boots_of_momentum:         { id: 'boots_of_momentum',         name: 'Boots of Momentum',         slot: 'feet', armorType: 'leather',     stats: { agi: 2, str: 1 },                  weight: 1, shopCost: 9, passives: ['momentum'], description: '+2 AGI, +1 STR. Build speed into power. Every 3 tiles moved grants +1 ATK. Grants Momentum.' },
  charging_lance:            { id: 'charging_lance',            name: 'Charging Lance',            slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 4, agi: 2 },              weight: 3, shopCost: 11, twoHanded: true, passives: ['momentum'], description: '+2 AGI. Build up devastating impact. Every 3 tiles moved grants +1 ATK. Grants Momentum. Two-handed.' },
  // Wave 16 — new items
  midas_gloves:              { id: 'midas_gloves',              name: 'Midas Gloves',              slot: 'hands', armorType: 'leather',    stats: { str: 1 },                          weight: 1, shopCost: 10, passives: ['midas_touch'], description: '+1 STR. 40% chance when killing an enemy to turn their tile into a gold deposit. Grants Midas Touch.' },
  twinshot_arrow:            { id: 'twinshot_arrow',            name: 'Twinshot Arrow',            slot: 'accessory', stats: {},                                 weight: 0, shopCost: 11, passives: ['twinshot'], description: 'When attacking with a bow, fire a second arrow at the same target. Grants Twinshot.' },
  duellists_pistol:          { id: 'duellists_pistol',          name: "Duellist's Pistol",         slot: 'offhand', weaponType: 'misc',  stats: {},                                  weight: 1, shopCost: 9, action: 'pistol_shot', description: 'Grants Pistol Shot: fire at an enemy within 3 tiles for 3 damage. 2 turn CD. Does not use your attack action.' },
  sweeping_glaive:           { id: 'sweeping_glaive',           name: 'Sweeping Glaive',           slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 5, str: 2, agi: 1 },     weight: 4, shopCost: 13, twoHanded: true, passives: ['sweeping_strikes'], description: '+2 STR, +1 AGI. Sweeping arc. When you hit an enemy, roll an attack against one other adjacent enemy. Grants Sweeping Strikes. Two-handed.' },
  cleaving_hatchet:           { id: 'cleaving_hatchet',           name: 'Cleaving Hatchet',          slot: 'mainhand', weaponType: '1h_axe', stats: { attack: 1 },                      weight: 1, shopCost: 6, passives: ['sweeping_strikes'], description: 'Wide-headed axe. When you hit an enemy, roll an attack against one other adjacent enemy. Grants Sweeping Strikes.' },
  bow_of_giants:             { id: 'bow_of_giants',             name: 'Bow of Giants',             slot: 'mainhand', weaponType: 'bow', stats: { attack: 0, str: 4 },              weight: 4, shopCost: 14, twoHanded: true, range: 4, noAttack: true, action: 'giant_shot', description: '+4 STR. Grants Giant Shot: fire a massive arrow at an enemy within range, dealing STR damage. Two-handed.' },
  // Wave 20 — necromancy weapon
  gravecallers_scythe:       { id: 'gravecallers_scythe',       name: "Gravecaller's Scythe",       slot: 'mainhand', weaponType: '2h_polearm', stats: { attack: 5, str: 2, int: 1 },     weight: 3, shopCost: 13, twoHanded: true, passives: ['gravecall'], description: "+2 STR, +1 INT. A cursed scythe that reaps souls. On kill, raise a lesser zombie from the fallen enemy. Grants Gravecall. Two-handed." },
  // Excalibur — granted by consumable
  excalibur:                 { id: 'excalibur',                 name: 'Excalibur',                 slot: 'mainhand', weaponType: '2h_sword', stats: { attack: 7, str: 3, con: 2 },     weight: 3, shopCost: 20, twoHanded: true, passives: ['piercing'], onHit: { effect: 'weakened', chance: 50 }, description: '+3 STR, +2 CON. The legendary blade of kings. 50% chance to Weaken. Grants Vampirism & Piercing. Two-handed.' },
  // Heavy Handed items
  sledgehammer:              { id: 'sledgehammer',              name: 'Groundshaker',              slot: 'mainhand', weaponType: '2h_mace', stats: { attack: 6, str: 3 },              weight: 5, shopCost: 13, twoHanded: true, passives: ['heavy_handed'], description: '+3 STR. A colossal hammer that splits the earth with every swing. Grants Heavy Handed. Two-handed.' },
  iron_knuckles:             { id: 'iron_knuckles',             name: 'Titan\'s Fist',             slot: 'mainhand', weaponType: 'fist', stats: { attack: 1, str: 2 },              weight: 1, shopCost: 5, passives: ['heavy_handed'], description: '+2 STR. Forged from a golem\'s knuckle. Grants Heavy Handed.' },
  brawlers_buckler:          { id: 'brawlers_buckler',          name: "Brawler's Buckler",         slot: 'offhand', weaponType: 'shield',  stats: { defense: 1, str: 1 },             weight: 1, shopCost: 5, passives: ['heavy_handed'], combatLockBonus: 5, description: '+1 STR. A dented shield meant for bashing. +5% combat lock. Grants Heavy Handed.' },
  impact_gauntlets:          { id: 'impact_gauntlets',          name: 'Impact Gauntlets',          slot: 'hands', armorType: 'plate',    stats: { str: 2 },                         weight: 1, shopCost: 7, passives: ['heavy_handed'], description: '+2 STR. Weighted knuckle plates deliver bone-shattering strikes. Grants Heavy Handed.' },
  bruisers_harness:          { id: 'bruisers_harness',          name: "Bruiser's Harness",         slot: 'body', armorType: 'leather',     stats: { defense: 2, con: 2 },             weight: 3, shopCost: 8, passives: ['heavy_handed'], description: '+2 CON. Reinforced chest piece favored by pit fighters. Grants Heavy Handed.' },
  headbutting_helm:          { id: 'headbutting_helm',          name: 'Headbutting Helm',          slot: 'head', armorType: 'plate',     stats: { defense: 2, con: 1 },             weight: 2, shopCost: 6, passives: ['heavy_handed'], description: '+1 CON. A flat-faced helm designed for ramming. Grants Heavy Handed.' },
  stomping_boots:            { id: 'stomping_boots',            name: 'Stomping Boots',            slot: 'feet', armorType: 'plate',     stats: { defense: 1, agi: 1 },             weight: 2, shopCost: 5, passives: ['heavy_handed'], description: '+1 AGI. Steel-toed boots that crush whatever\'s underfoot. Grants Heavy Handed.' },
  ring_of_brutality:         { id: 'ring_of_brutality',         name: 'Ring of Brutality',         slot: 'accessory', stats: { str: 1 },                        weight: 0, shopCost: 7, passives: ['heavy_handed'], description: '+1 STR. A crude iron band that channels raw force. Grants Heavy Handed.' },
  // Precision items
  marksmans_bow:             { id: 'marksmans_bow',             name: "Marksman's Bow",            slot: 'mainhand', weaponType: 'bow', stats: { attack: 3, agi: 2 },              weight: 1, shopCost: 10, twoHanded: true, range: 4, passives: ['precision', 'precision'], description: '+2 AGI. A finely-crafted bow for deadly accuracy. Grants Precision ×2. Two-handed.' },
  stiletto:                  { id: 'stiletto',                  name: 'Stiletto',                  slot: 'mainhand', weaponType: 'dagger', stats: { attack: 2, agi: 1 },              weight: 0, shopCost: 5, passives: ['precision'], description: '+1 AGI. Needle-thin blade finds the gaps. Grants Precision.' },
  truesight_visor:           { id: 'truesight_visor',           name: 'Truesight Visor',           slot: 'head', armorType: 'cloth',     stats: { int: 2 },                         weight: 0, shopCost: 9, passives: ['precision', 'precision'], description: '+2 INT. Reveals every weakness. Grants Precision ×2.' },
  sniper_bracers:            { id: 'sniper_bracers',            name: 'Sniper Bracers',            slot: 'hands', armorType: 'leather',    stats: { agi: 2 },                         weight: 0, shopCost: 7, passives: ['precision'], description: '+2 AGI. Steadies the hand for the killing blow. Grants Precision.' },
  deadeye_boots:             { id: 'deadeye_boots',             name: 'Deadeye Boots',             slot: 'feet', armorType: 'leather',     stats: { agi: 1 },                         weight: 0, shopCost: 5, passives: ['precision'], description: '+1 AGI. Perfect footing for perfect aim. Grants Precision.' },
  precision_vest:            { id: 'precision_vest',            name: 'Precision Vest',            slot: 'body', armorType: 'leather',     stats: { defense: 1, agi: 2 },             weight: 1, shopCost: 7, passives: ['precision'], description: '+2 AGI. Tailored for unhindered strikes. Grants Precision.' },
  hawks_eye_pendant:         { id: 'hawks_eye_pendant',         name: "Hawk's Eye Pendant",        slot: 'accessory', stats: { int: 1 },                        weight: 0, shopCost: 8, passives: ['precision', 'precision'], description: '+1 INT. See the fatal opening. Grants Precision ×2.' },
  // Gnome faction weapons
};

// ============================================================
// CONSUMABLES — single-use items, consumed on use
// ============================================================
const CONSUMABLES = {
  healing_potion:   { id: 'healing_potion',   name: 'Healing Potion',   icon: '🧪', consumable: true, shopCost: 3, spawnIn: ['beast', 'vendor'], description: 'Restores 8 HP instantly.' },
  speed_potion:     { id: 'speed_potion',     name: 'Speed Potion',     icon: '💨', consumable: true, shopCost: 3, spawnIn: ['beast', 'vendor'], description: '+4 movement for 3 turns.' },
  rage_potion:      { id: 'rage_potion',      name: 'Rage Potion',      icon: '🔴', consumable: true, shopCost: 4, spawnIn: ['beast', 'vendor'], description: '+4 ATK for this turn.' },
  stoneskin_potion: { id: 'stoneskin_potion', name: 'Stoneskin Potion', icon: '🪨', consumable: true, shopCost: 4, spawnIn: ['beast', 'vendor'], description: '+4 DEF until end of next turn.' },
  treasure_chest:   { id: 'treasure_chest',   name: 'Treasure Chest',   icon: '💰', consumable: true, shopCost: 3, spawnIn: ['ground', 'beast'], description: 'Opens to reveal 3–5 gold.' },
  lumber_pile:      { id: 'lumber_pile',      name: 'Lumber Pile',      icon: '🪵', consumable: true, shopCost: 3, spawnIn: ['ground', 'beast'], description: 'Collect for 3–5 wood.' },
  stone_pile:       { id: 'stone_pile',       name: 'Stone Pile',       icon: '🧱', consumable: true, shopCost: 3, spawnIn: ['ground', 'beast'], description: 'Collect for 3–5 stone.' },
  water_pouch:      { id: 'water_pouch',      name: 'Water Pouch',      icon: '💧', consumable: true, shopCost: 3, spawnIn: ['ground', 'beast'], description: 'Drink for 3–5 water.' },
  potion_pouch:     { id: 'potion_pouch',     name: 'Potion Pouch',     icon: '🎒', consumable: true, passive: true, shopCost: 5, spawnIn: ['beast', 'vendor'], description: 'Generates a Healing Potion every 4 turns.' },
  fresh_fish:       { id: 'fresh_fish',       name: 'Fresh Fish',       icon: '🐟', consumable: true, shopCost: 2, spawnIn: ['beast'], description: 'Restores 4 HP.' },
  petroleum_jelly:  { id: 'petroleum_jelly',  name: 'Petroleum Jelly',  icon: '🫧', consumable: true, shopCost: 5, spawnIn: ['beast', 'vendor'], description: '100% dodge chance for 2 turns.' },
  seed_of_god:      { id: 'seed_of_god',      name: 'Seed of God',      icon: '🌱', consumable: true, shopCost: 4, spawnIn: ['beast', 'vendor'], description: 'Grow a grove of trees around you.' },
  muscle_growth_serum: { id: 'muscle_growth_serum', name: 'Muscle Growth Serum', icon: '💪', consumable: true, shopCost: 2, spawnIn: ['beast', 'vendor'], description: 'Permanently gain +1 STR.' },
  brain_growth_serum:  { id: 'brain_growth_serum',  name: 'Brain Growth Serum',  icon: '🧠', consumable: true, shopCost: 2, spawnIn: ['beast', 'vendor'], description: 'Permanently gain +1 INT.' },
  tendon_tautacity_serum: { id: 'tendon_tautacity_serum', name: 'Tendon Tautacity Serum', icon: '🦵', consumable: true, shopCost: 2, spawnIn: ['beast', 'vendor'], description: 'Permanently gain +1 AGI.' },
  skin_thickening_serum: { id: 'skin_thickening_serum', name: 'Skin Thickening Serum', icon: '🛡️', consumable: true, shopCost: 2, spawnIn: ['beast', 'vendor'], description: 'Permanently gain +1 CON.' },
  magic_mirror:     { id: 'magic_mirror',     name: 'Magic Mirror',     icon: '🪞', consumable: true, shopCost: 6, spawnIn: ['beast', 'vendor'], description: 'Duplicate an item in your inventory.' },
  manifesto: { id: 'manifesto', name: 'Manifesto', icon: '📕', consumable: true, shopCost: 5, spawnIn: ['ground', 'beast', 'vendor'], description: 'All enemy workers go on strike and cannot gather for 2 turns.' },
  strange_poultice: { id: 'strange_poultice', name: 'Strange Poultice', icon: '🩹', consumable: true, shopCost: 4, spawnIn: ['beast', 'vendor'], description: 'Grants +10 temporary HP for 3 turns.' },
  scroll_of_archers: { id: 'scroll_of_archers', name: 'Scroll of Archers', icon: '📜', consumable: true, shopCost: 6, spawnIn: ['ground', 'beast', 'vendor'], description: 'Summon 2 weak archers with crossbows on adjacent tiles.' },
  regeneration_potion: { id: 'regeneration_potion', name: 'Regeneration Potion', icon: '💚', consumable: true, shopCost: 5, spawnIn: ['ground', 'beast', 'vendor'], description: 'Grants Regeneration for 5 turns.' },
  paste_of_reaping:    { id: 'paste_of_reaping',    name: "Paste of Reaping What One Sow's", icon: '🩸', consumable: true, shopCost: 7, spawnIn: ['beast', 'vendor'], description: 'Permanently grants the Retaliate passive.' },
  hardening_clay:      { id: 'hardening_clay',      name: 'Hardening Clay',      icon: '🪨', consumable: true, shopCost: 2, spawnIn: ['beast', 'vendor'], description: 'Permanently grants the Stone Skin passive (immune to Bleeding & Poison).' },
  combat_regen_potion: { id: 'combat_regen_potion', name: 'Combat Regen Potion', icon: '❤️‍🔥', consumable: true, shopCost: 8, spawnIn: ['ground', 'beast', 'vendor'], description: 'Grants Regeneration for 5 turns that also works in combat.' },
  treasure_map:        { id: 'treasure_map',        name: 'Treasure Map',        icon: '🗺️', consumable: true, shopCost: 6, spawnIn: ['ground', 'beast', 'vendor'], description: 'Reveals the location of buried treasure — spawns a high-value item somewhere on the map.' },
  excalibur_stone:     { id: 'excalibur_stone',     name: 'Embedded Excalibur', icon: '⚔️', consumable: true, shopCost: 0, spawnIn: ['ground'], description: 'A legendary sword lodged in stone. Requires 7+ STR to pull free. Grants Excalibur on use.' },
  asbestos_applicator: { id: 'asbestos_applicator', name: 'Asbestos Applicator', icon: '🧯', consumable: true, shopCost: 2, spawnIn: ['vendor'], description: 'Permanently grants Fire Resistance (immune to Burning).' },
  loaded_die:          { id: 'loaded_die',          name: 'Loaded Die',          icon: '🎲', consumable: true, shopCost: 5, spawnIn: ['ground', 'beast', 'vendor'], description: 'Grants Deadly Focus — your next attack is a guaranteed critical hit.' },
  scroll_of_retrieve:  { id: 'scroll_of_retrieve',  name: 'Scroll of Retrieve',  icon: '📜', consumable: true, shopCost: 7, spawnIn: ['ground', 'beast', 'vendor'], description: 'Select one of your units anywhere on the map — teleport them to an adjacent tile.' },
  scroll_of_swap:      { id: 'scroll_of_swap',      name: 'Scroll of Swap',      icon: '📜', consumable: true, shopCost: 7, spawnIn: ['ground', 'beast', 'vendor'], description: 'Switch places with any unit on the map (ally or enemy).' },
  explosive_barrel:    { id: 'explosive_barrel',    name: 'Explosive Barrel',    icon: '🛢', consumable: true, shopCost: 0, spawnIn: [], description: 'Place on an adjacent tile. Explodes when attacked or shot, dealing 8 damage to all units within 2 tiles.' },
};

const CONSUMABLE_IDS = Object.keys(CONSUMABLES);
const GROUND_CONSUMABLES = CONSUMABLE_IDS.filter(id => CONSUMABLES[id].spawnIn.includes('ground'));
const BEAST_CONSUMABLES = CONSUMABLE_IDS.filter(id => CONSUMABLES[id].spawnIn.includes('beast'));
const VENDOR_CONSUMABLES = CONSUMABLE_IDS.filter(id => CONSUMABLES[id].spawnIn.includes('vendor'));
const NPC_CONSUMABLES = BEAST_CONSUMABLES; // All NPC types can carry beast-pool consumables

// Default forge catalog (these items are forge-only, excluded from ground/beast/shop loot):
const FORGE_BASE_ITEMS = [
  'leather_cap',      // head   – DEF+1
  'simple_robe',      // body   – DEF+1
  'leather_vest',     // body   – DEF+1, AGI+2
  'leather_leggings', // legs   – DEF+1
  'leather_boots',    // feet   – CON+1
  'short_sword',      // weapon – ATK+2
  'scrappy_shield',    // shield – DEF+1,
  'leather_gloves',
  'shortbow',
  'mages_coif',
  'adepts_trousers',
  'casting_mittens',
  'fishing_rod'
];

// Advanced forge catalog (water-costed, mid-tier gear only; no exotic effects)
const ADVANCED_FORGE_ITEMS = [
  { id: 'iron_helm', waterCost: 2 },
  { id: 'chain_mail', waterCost: 3 },
  { id: 'iron_greaves', waterCost: 2 },
  { id: 'broad_sword', waterCost: 3 },
  { id: 'mace', waterCost: 3 },
  { id: 'buckler', waterCost: 2 },
  { id: 'pike', waterCost: 4 },
  { id: 'crossbow', waterCost: 4 },
  { id: 'longbow', waterCost: 5 },
  { id: 'teapot_crown', waterCost: 3 },
  { id: 'professors_helm', waterCost: 3 },
  { id: 'cardigan_of_heroics', waterCost: 4 },
  { id: 'paradox_breastplate', waterCost: 4 },
  { id: 'curtain_culottes', waterCost: 3 },
  { id: 'calculus_greaves', waterCost: 3 },
  { id: 'ballroom_sabatons', waterCost: 3 },
  { id: 'librarians_slippers', waterCost: 3 },
  { id: 'oven_mitts_of_uppercut', waterCost: 3 },
  { id: 'gauntlets_of_gentle_thought', waterCost: 3 },
  { id: 'yarnbound_knucklers', waterCost: 3 },
  { id: 'brigandine', waterCost: 3 },
  { id: 'rangers_leggings', waterCost: 3 },
  { id: 'windrunner_boots', waterCost: 3 },
  { id: 'thiefs_gloves', waterCost: 3 },
  { id: 'forge_banded_helm', waterCost: 2 },
  { id: 'forge_braced_mail', waterCost: 3 },
  { id: 'forge_reinforced_tunic', waterCost: 3 },
  { id: 'forge_worn_greaves', waterCost: 2 },
  { id: 'forge_field_legwraps', waterCost: 2 },
  { id: 'forge_braced_gloves', waterCost: 2 },
  { id: 'forge_field_rapier', waterCost: 3 },
  { id: 'forge_stonehook_mace', waterCost: 3 },
  { id: 'forge_battle_spear', waterCost: 4 },
  { id: 'forge_warded_staff', waterCost: 4 }
];

const LOOT_ITEMS = [
  'flaming_sword', 'helm_of_constitution', 'boots_of_speed', 'gloves_of_haste',
  'ring_of_power', 'amulet_of_protection', 'teleportation_cloak', 'plate_armor',
  'crown_of_intellect', 'lucky_charm', 'robe_of_the_archmage', 'leggings_of_evasion',
  'battleaxe', 'poisoned_dagger', 'iron_shield', 'cloak_pin_of_shadows',
  'wolf_pelt_hood', 'titan_legguards', 'sandals_of_the_saint', 'staff_of_wisdom',
  'tome_of_knowledge', 'warrior_pendant', 'buckler',
  'greatsword', 'warhammer', 'longbow', 'halberd', 'spear', 'rapier', 'mace', 'hand_axe',
  'crossbow', 'throwing_knives',
  // Wave 1 items
  'mage_circlet', 'horned_helm', 'scouts_bandana', 'helm_of_vitality', 'circlet_of_clarity',
  'brigandine', 'dragonhide_armor', 'berserker_harness', 'mithril_shirt', 'diviner_vestments',
  'chainmail_chausses', 'shadow_leggings', 'legplates_of_fury', 'silk_trousers', 'greaves_of_fortitude',
  'steel_sabatons', 'windrunner_boots', 'boots_of_stability', 'assassins_footwraps', 'earthshaker_boots',
  'frost_blade', 'vampiric_blade', 'war_pick', 'enchanted_scepter', 'scimitar',
  'maul', 'elven_greatbow', 'pike', 'runic_staff', 'executioners_blade',
  'tower_shield', 'parrying_dagger', 'orb_of_storms', 'spiked_shield', 'healing_totem',
  'berserker_torc', 'pendant_of_warding', 'scouts_compass', 'band_of_resilience', 'signet_of_command',
  // Wave 2 — expansion items
  'warlords_greathelm', 'druids_wreath', 'hood_of_the_phantom', 'skull_mask', 'crown_of_thorns',
  'thornweave_tunic', 'warden_plate', 'shadow_cloak', 'elementalist_robe', 'bone_plate_armor',
  'rangers_leggings', 'ironbark_greaves', 'legguards_of_the_deft', 'bloodstained_cuisses', 'runic_legwraps',
  'flamestride_boots', 'frostwalkers', 'boots_of_the_mountain', 'shadowstep_slippers', 'ironclad_stompers',
  'serrated_cleaver', 'thundermace', 'venom_fang', 'holy_mace', 'shadow_dagger',
  'bonecrusher', 'volcanic_greatsword', 'windreaver', 'soul_reaper', 'thornwood_greatstaff',
  'staff_of_fire', 'staff_of_frost', 'scepter_of_lightning', 'wand_of_draining', 'orb_of_venom', 'fire_wand',
  'frost_ward', 'living_shield', 'mirror_shield', 'warhorn', 'lantern_of_souls',
  'orb_of_fire', 'orb_of_frost', 'orb_of_poison', 'orb_of_lightning', 'orb_of_vampirism',
  'talisman_of_thorns', 'ring_of_piercing', 'vanguard_medallion', 'amulet_of_poison_ward', 'emblem_of_the_phoenix',
  // Wave 3 — special items
  'mechanical_arm', 'lute', 'harp', 'suicide_vest', 'scope', 'precision_scope',
  'grappling_hook', 'net', 'cracked_halo', 'ring_of_regeneration',
  // Wave 4 — gloves
  'leather_gloves', 'iron_gauntlets', 'thiefs_gloves', 'spiked_knuckles', 'menders_wraps',
  'gauntlets_of_grabbing', 'grippers',
  // Wave 5 — special
  'horse', 'accordion', 'gladiator_net',
  // Wave 6 — new items
  'fishing_rod', 'double_edged_sword', 'third_leg', 'pocket_pooka', 'tome_of_summon_zombie', 'boomerang',
  // Wave 7 — new items
  'lightning_infused_staff', 'static_armor',
  // Wave 8 — expanded armor & weapons
  'serpent_crown', 'mountaineers_cap', 'visored_sallet',
  'vagabonds_coat', 'mirror_plate', 'rattlesnake_vest',
  'marsh_waders', 'sentinels_cuisses',
  'pilgrim_sandals',
  'morning_star', 'coral_blade', 'cursed_wand',
  'frostreaver', 'compound_bow',
  'tome_of_curses', 'shrunken_head',
  'climbers_grips', 'gauntlets_of_retribution', 'plated_gauntlets',
  'serpent_ring', 'amulet_of_frost_ward',
  // Wave 9
  'windstrike_blade', 'madmans_greatsword', 'keen_blade', 'gauntlets_of_precision', 'ring_of_precision',
  'crit_goggles', 'amulet_of_evasion',
  // Wave 10 — bleeding weapons
  'rusty_shiv', 'barbed_flail', 'bloodletters_knife', 'hooked_dagger',
  'jagged_greataxe', 'barbed_spear', 'barbed_shortbow', 'razorwind_glaive',
  'serrated_buckler',
  // Wave 11
  'atlas_charm', 'carrot_on_a_stick',
  // Wave 12 — retaliation items
  'ogre_head_on_a_stick', 'gloves_of_retaliation', 'eyes_on_back_of_head', 'karmic_shield', 'spiteful_flail',
  // Wave 13 — passive items
  'headsmans_greataxe', 'executioners_hood', 'ring_of_the_coup_de_grace',
  'sunder_maul', 'gauntlets_of_ruin',
  'flintlock_rifle', 'watchtower_pendant',
  'petrified_buckler',
  'martyrs_vestments', 'sacrificial_scarf',
  'voodoo_fiddle',
  'boots_of_momentum', 'charging_lance',
  // Wave 14 — reactive armor & water offhands
  'inferno_plate', 'venomspine_mail', 'bucket_of_water', 'pot_of_boiling_water',
  // Wave 15 — utility magic weapons
  'haunted_bell', 'wand_of_lethargy', 'frozen_sigil', 'fang_tipped_wand', 'anemic_rod', 'grimoire_of_gore',
  // Wave 16 — new items
  'midas_gloves', 'twinshot_arrow', 'duellists_pistol', 'sweeping_glaive', 'cleaving_hatchet', 'bow_of_giants',
  // Wave 17
  'bouncy_helmet',
  // Wave 18
  'stormstrike_mace', 'main_gauche',
  // Wave 19
  'elemental_glaive',
  // Wave 20
  'gravecallers_scythe',
  // Wave 21 — new accessories
  'fighting_ring', 'blinking_amulet', 'smoke_bomb', 'corrupted_chalice', 'bottled_lightning', 'voodoo_doll',
  // Poison weapons
  'dart_gun', 'plague_glaive', 'venomcleaver',
  // Heavy Handed items
  'sledgehammer', 'iron_knuckles', 'brawlers_buckler', 'impact_gauntlets', 'bruisers_harness', 'headbutting_helm', 'stomping_boots', 'ring_of_brutality',
  // Precision items
  'marksmans_bow', 'stiletto', 'truesight_visor', 'sniper_bracers', 'deadeye_boots', 'precision_vest', 'hawks_eye_pendant',
  // Starter / basic gear (also in shop)
  'iron_helm', 'chain_mail', 'iron_greaves', 'iron_boots', 'crude_axe', 'broad_sword', 'gnarled_staff',
  // Instruments
  'bugle', 'war_drum',
  // Dual Wield
  'ambidextrous_ring', 'duelists_gloves'
].filter(id => !FORGE_BASE_ITEMS.includes(id));

// NPC loot tiers based on item shop cost
const LOW_VALUE_LOOT = LOOT_ITEMS.filter(id => ITEMS[id] && ITEMS[id].shopCost <= 6);
const MID_VALUE_LOOT = LOOT_ITEMS.filter(id => ITEMS[id] && ITEMS[id].shopCost >= 5 && ITEMS[id].shopCost <= 9);
const HIGH_VALUE_LOOT = LOOT_ITEMS.filter(id => ITEMS[id] && ITEMS[id].shopCost >= 8);
const BOSS_LOOT = LOOT_ITEMS.filter(id => ITEMS[id] && ITEMS[id].shopCost >= 10);

// NPC spawn configuration: type → { weight, lootPool, maxItems, consumableChance }
const NPC_SPAWN_CONFIG = {
  bandit:        { weight: 4, lootPool: LOW_VALUE_LOOT,  maxItems: 1, consumableChance: 0.2 },
  rabid_rat:     { weight: 4, lootPool: LOW_VALUE_LOOT,  maxItems: 1, consumableChance: 0.15 },
  warg:          { weight: 3, lootPool: MID_VALUE_LOOT,  maxItems: 2, consumableChance: 0.3 },
  glowing_wisp:  { weight: 3, lootPool: MID_VALUE_LOOT,  maxItems: 2, consumableChance: 0.35 },
  beast:         { weight: 2, lootPool: HIGH_VALUE_LOOT, maxItems: 2, consumableChance: 0.4 },
  stone_golem:   { weight: 1, lootPool: HIGH_VALUE_LOOT, maxItems: 2, consumableChance: 0.4 },
  hydra:         { weight: 1, lootPool: HIGH_VALUE_LOOT, maxItems: 2, consumableChance: 0.4 },
};

function pickWeightedNpcType() {
  const entries = Object.entries(NPC_SPAWN_CONFIG);
  const totalWeight = entries.reduce((s, [, cfg]) => s + cfg.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const [type, cfg] of entries) {
    roll -= cfg.weight;
    if (roll <= 0) return type;
  }
  return entries[entries.length - 1][0];
}

function giveNpcLoot(npcUnit, lootPool, maxItems, consumableChance) {
  const numItems = 1 + Math.floor(Math.random() * maxItems); // 1 to maxItems
  for (let i = 0; i < numItems; i++) {
    const lootId = lootPool[Math.floor(Math.random() * lootPool.length)];
    npcUnit.inventory.push(JSON.parse(JSON.stringify(ITEMS[lootId])));
  }
  if (Math.random() < consumableChance) {
    const cId = NPC_CONSUMABLES[Math.floor(Math.random() * NPC_CONSUMABLES.length)];
    npcUnit.inventory.push(JSON.parse(JSON.stringify(CONSUMABLES[cId])));
  }
}

// ============================================================
// UNIT DEFINITIONS
// ============================================================
const UNIT_DEFS = {
  worker: {
    name: 'Worker', char: 'w', hp: 4, movement: 3,
    attack: 1, defense: 0,
    str: 0, agi: 2, con: 0, int: 2,
    canGather: true, canFight: false,
    passives: ['resource_gathering'],
    cost: { wood: 2, stone: 1, gold: 0, water: 0 },
    startingEquipment: { mainhand: 'pickaxe' }
  },
  warrior: {
    name: 'Warrior', char: 'k', hp: 9, movement: 4,
    attack: 2, defense: 2,
    str: 2, agi: 1, con: 0, int: 0,
    canGather: false, canFight: true,
    cost: { wood: 2, stone: 1, gold: 1, water: 0 },
    startingEquipment: { head: 'iron_helm', body: 'chain_mail', legs: 'leather_leggings', feet: 'leather_boots', mainhand: 'short_sword', offhand: 'wooden_shield', accessory: null }
  },
  mage: {
    name: 'Mage', char: '✶', hp: 5, movement: 3,
    attack: 1, defense: 1,
    str: 0, agi: 1, con: 0, int: 3,
    canGather: false, canFight: true,
    cost: { wood: 2, stone: 1, gold: 1, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: 'gnarled_staff', offhand: '_two_handed_', accessory: null }
  },
  archer: {
    name: 'Archer', char: '↣', hp: 5, movement: 3,
    attack: 1, defense: 0,
    str: 0, agi: 3, con: 0, int: 1,
    canGather: false, canFight: true,
    cost: { wood: 2, stone: 1, gold: 1, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: 'shortbow', offhand: '_two_handed_', accessory: null },
    proficiencies: { weapons: RANGED_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
  },
  hero: {
    name: 'Hero', char: 'H', hp: 16, movement: 5,
    attack: 3, defense: 3,
    str: 3, agi: 2, con: 0, int: 1,
    canGather: false, canFight: true,
    cost: { wood: 5, stone: 4, gold: 3, water: 2 },
    startingEquipment: { head: 'iron_helm', body: 'chain_mail', legs: 'iron_greaves', feet: 'iron_boots', mainhand: 'broad_sword', offhand: '_two_handed_', accessory: null }
  },
  elite: {
    name: 'Elite', char: 'E', hp: 11, movement: 4,
    attack: 3, defense: 2,
    str: 2, agi: 2, con: 0, int: 1,
    canGather: false, canFight: true,
    cost: { wood: 3, stone: 2, gold: 2, water: 0 },
    startingEquipment: { head: null, body: 'chain_mail', legs: null, feet: null, mainhand: 'broad_sword', offhand: '_two_handed_', accessory: null }
  },
  beast: {
    name: 'Foul Beast', char: 'B', hp: 14, movement: 0,
    attack: 5, defense: 6,
    str: 3, agi: 1, con: 0, int: 0,
    canGather: false, canFight: true, npc: true,
    passives: ['retaliate', 'poison_resistance'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  bandit: {
    name: 'Bandit', char: 'ƀ', hp: 8, movement: 0,
    attack: 2, defense: 1,
    str: 1, agi: 1, con: 0, int: 0,
    canGather: false, canFight: true, npc: true,
    passives: ['retaliate'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: 'leather_vest', legs: null, feet: null, mainhand: 'short_sword', offhand: 'buckler', accessory: null }
  },
  warg: {
    name: 'Warg', char: 'Ŵ', hp: 11, movement: 0,
    attack: 4, defense: 2,
    str: 2, agi: 2, con: 0, int: 0,
    canGather: false, canFight: true, npc: true,
    passives: ['retaliate'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  stone_golem: {
    name: 'Stone Golem', char: 'Ḡ', hp: 20, movement: 0,
    attack: 4, defense: 8,
    str: 4, agi: 0, con: 0, int: 0,
    canGather: false, canFight: true, npc: true,
    passives: ['retaliate', 'bulwark'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  rabid_rat: {
    name: 'Rabid Rat', char: 'ȑ', hp: 5, movement: 0,
    attack: 1, defense: 0,
    str: 0, agi: 3, con: 0, int: 0,
    canGather: false, canFight: true, npc: true,
    passives: ['retaliate', 'evasion'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  glowing_wisp: {
    name: 'Glowing Wisp', char: '¤', hp: 7, movement: 0,
    attack: 2, defense: 1,
    str: 0, agi: 1, con: 0, int: 4,
    canGather: false, canFight: true, npc: true,
    passives: ['retaliate', 'magic_resistance', 'evasion'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  hydra: {
    name: 'Hydra', char: 'Ħ', hp: 18, movement: 0,
    attack: 6, defense: 3,
    str: 3, agi: 2, con: 0, int: 1,
    canGather: false, canFight: true, npc: true,
    passives: ['retaliate', 'regeneration', 'poison_resistance'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  ancient_dragon: {
    name: 'Ancient Dragon', char: 'Ð', hp: 35, movement: 0,
    attack: 7, defense: 5,
    str: 5, agi: 2, con: 0, int: 3,
    canGather: false, canFight: true, npc: true,
    passives: ['retaliate', 'fire_resistance', 'regeneration'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  pooka: {
    name: 'Pooka', char: 'P', hp: 18, movement: 5,
    attack: 4, defense: 3,
    str: 3, agi: 3, con: 0, int: 2,
    canGather: false, canFight: true,
    passives: ['evasion', 'haste'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    summon: true,
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  zombie: {
    name: 'Zombie', char: 'Z', hp: 12, movement: 3,
    attack: 3, defense: 2,
    str: 2, agi: 0, con: 0, int: 0,
    canGather: false, canFight: true,
    passives: ['retaliate'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    summon: true,
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: 'short_sword', offhand: 'wooden_shield', accessory: null }
  },
  lesser_zombie: {
    name: 'lesser zombie', char: 'ƶ', hp: 8, movement: 2,
    attack: 5, defense: 1,
    str: 0, agi: 0, con: 0, int: 0,
    canGather: false, canFight: true,
    passives: ['vampirism'],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    summon: true,
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  summoned_archer: {
    name: 'Summoned Archer', char: 'a', hp: 5, movement: 3,
    attack: 2, defense: 0,
    str: 0, agi: 2, con: 0, int: 0,
    canGather: false, canFight: true,
    passives: [],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    summon: true,
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: 'crossbow', offhand: null, accessory: null }
  },
  shambling_corpse: {
    name: 'Shambling Corpse', char: 'z', hp: 4, movement: 3,
    attack: 2, defense: 1,
    str: 1, agi: 1, con: 0, int: 0,
    canGather: false, canFight: true,
    passives: [],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    summon: true,
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: 'short_sword', offhand: null, accessory: null }
  },
  plague_rat: {
    name: 'Plague Rat', char: 'r', hp: 4, movement: 3,
    attack: 4, defense: 1,
    str: 2, agi: 1, con: 0, int: 0,
    canGather: false, canFight: true,
    passives: [],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    summon: true,
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  },
  seizing_totem: {
    name: 'Seizing Totem', char: '⌘', hp: 15, movement: 0,
    attack: 0, defense: 0,
    str: 0, agi: 0, con: 0, int: 0,
    canGather: false, canFight: false,
    passives: [],
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    summon: true,
    isTotem: true,
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  }
};

const RESOURCE_TYPES = ['wood', 'stone', 'gold', 'water', 'wall'];
const RESOURCE_CHARS = { wood: '♣', stone: '●', gold: '★', water: '~', wall: '■' };
const RESOURCE_COLORS = { wood: '#228B22', stone: '#8B0000', gold: '#DAA520', water: '#4682B4', wall: '#6B6B6B' };
const RESOURCE_WEIGHTS = { wood: 8, stone: 7, gold: 5, water: 5, wall: 0 };
const WALLS_PER_STONE_CONVERSION = 2;
const WALL_PLACEMENTS_PER_TURN = 2;
const WALL_TILE_DURABILITY = 5;
const WALL_ENEMY_PROXIMITY_RADIUS = 4;
const RESOURCE_DENSITY = 0.5;
const BUILDING_COST_MULTIPLIER = 0.5;

const SHOP_CHAR = '$';
const SHOP_COLOR = '#0c8f00';
const VENDOR_CHAR = '☂';
const VENDOR_COLOR = '#0c8f00';
const BAZAAR_CHAR = '🏛︎';
const BAZAAR_COLOR = '#0c8f00';

// ============================================================
// STRUCTURES
// ============================================================
const STRUCTURE_DEFS = {
  town_hall: {
    name: 'Town Hall',
    char: '♜',
    hp: 30,
    cost: { wood: 8, stone: 8, gold: 3, water: 0 },
    description: 'Allows production of Workers. Workers can build new Town Halls to expand spawn areas.',
    unlocksUnits: ['worker'],
    workerBuildable: true
  },
  barracks: {
    name: 'Barracks',
    char: '⌂',
    hp: 20,
    cost: { wood: 5, stone: 5, gold: 0, water: 0 },
    description: 'Allows production of Warriors and Heroes.',
    unlocksUnits: ['warrior', 'hero']
  },
  mage_tower: {
    name: 'Mage Tower',
    char: '▓',
    hp: 20,
    cost: { wood: 5, stone: 5, gold: 0, water: 0 },
    description: 'Allows production of faction spellcasters.',
    unlocksUnits: ['mage'],
    factionNames: {
      goblins: 'Hex Hut',
      humans: 'Mage Tower',
      elves: 'Star Spire',
      orcs: 'Spirit Lodge',
      dwarves: 'Rune Tower',
      skeletons: 'Death Spire',
      trolls: 'Witch Hut',
      bards: 'Song Spire',
      kobolds: 'Spark Den',
      nomads: 'Mirage Tower',
      trade_guild: 'Arcane Exchange',
      ogres: 'Storm Pyre',
      merfolk: 'Tide Spire',
      gnomes: 'Aether Workshop'
    }
  },
  archery_range: {
    name: 'Archery Range',
    char: '⛫',
    hp: 20,
    cost: { wood: 5, stone: 5, gold: 0, water: 0 },
    description: 'Allows production of faction archers.',
    unlocksUnits: ['archer'],
    factionNames: {}
  },
  elite_hall: {
    name: 'Elite Hall',
    char: '⚑',
    hp: 25,
    cost: { wood: 10, stone: 10, gold: 0, water: 0 },
    description: 'Allows production of elite faction units.',
    unlocksUnits: ['elite'],
    factionNames: {
      goblins: 'Venom Lab',
      humans: 'War Academy',
      elves: 'Moonwell',
      orcs: 'Blood Pit',
      dwarves: 'Forge Temple',
      skeletons: 'Crypt',
      trolls: 'War Den',
      bards: 'Conservatory',
      kobolds: 'Warren',
      nomads: 'War Camp',
      trade_guild: 'Auction House',
      ogres: 'Smashing Pit',
      merfolk: 'Tidal Grotto',
      gnomes: 'Tinkering Workshop'
    }
  },
  forge: {
    name: 'Forge',
    char: '▦',
    hp: 20,
    cost: { wood: 4, stone: 4, gold: 0, water: 0 },
    description: 'Produce basic equipment for free (1 item per turn per forge). Move a unit adjacent to forge to craft.'
  },
  advanced_forge: {
    name: 'Advanced Forge',
    char: '▩',
    hp: 10,
    cost: { wood: 10, stone: 10, gold: 0, water: 0 },
    description: 'Spend water to craft improved equipment. Move a unit adjacent to craft.'
  },
  armory: {
    name: 'Armory',
    char: '⛨',
    hp: 18,
    cost: { wood: 6, stone: 6, gold: 0, water: 0 },
    description: 'Spend water to raise a unit\'s armor proficiency tier by one step and unlock heavier armor.'
  },
  enchanter: {
    name: 'Enchanter',
    char: '☽',
    hp: 16,
    cost: { wood: 7, stone: 6, gold: 0, water: 0 },
    description: 'Spend a large amount of water to enchant adjacent armor or weapons, granting +1 to one stat.'
  },
  well: {
    name: 'Well',
    char: '¶',
    hp: 5,
    cost: { wood: 3, stone: 2, gold: 0, water: 0 },
    description: 'Generates 1 water per turn for its owner.'
  }
};

function getStructureBuildCost(type) {
  const baseCost = (STRUCTURE_DEFS[type] && STRUCTURE_DEFS[type].cost) || {};
  const adjusted = {};
  for (const r of RESOURCE_TYPES) {
    const value = baseCost[r] || 0;
    adjusted[r] = value > 0 ? Math.max(1, Math.round(value * BUILDING_COST_MULTIPLIER)) : 0;
  }
  return adjusted;
}

const ARCHER_FACTION_VARIANTS = {
  goblins: { unit: 'Skirmisher', structure: 'Fletcher Den' },
  humans: { unit: 'Bowman', structure: 'Archery Range' },
  elves: { unit: 'Glade Archer', structure: 'Moonbow Grove' },
  orcs: { unit: 'Hunter', structure: 'Hunt Camp' },
  dwarves: { unit: 'Crossbowman', structure: 'Runic Range' },
  skeletons: { unit: 'Bone Archer', structure: 'Crypt Range' },
  trolls: { unit: 'Rock Hurler', structure: 'Bog Range' },
  bards: { unit: 'Balladeer', structure: 'Song Range' },
  kobolds: { unit: 'Tunnel Archer', structure: 'Warren Range' },
  nomads: { unit: 'Dune Archer', structure: 'Dust Range' },
  trade_guild: { unit: 'Guild Sharpshooter', structure: 'Mercantile Range' },
  ogres: { unit: 'Boulder Thrower', structure: 'Crushing Range' },
  merfolk: { unit: 'Tide Archer', structure: 'Reef Range' },
  gnomes: { unit: 'Sharpshooter', structure: 'Clockwork Range' }
};

function applyArcherFactionVariants() {
  const archeryRange = STRUCTURE_DEFS.archery_range;
  if (!archeryRange) return;
  if (!archeryRange.factionNames) archeryRange.factionNames = {};

  for (const [factionId, variant] of Object.entries(ARCHER_FACTION_VARIANTS)) {
    const faction = FACTIONS[factionId];
    if (!faction) continue;
    if (!faction.unitOverrides) faction.unitOverrides = {};
    faction.unitOverrides.archer = {
      ...(faction.unitOverrides.archer || {}),
      name: variant.unit
      ,proficiencies: { weapons: RANGED_WEAPON_TYPES, armor: CLOTH_ARMOR_TYPES }
    };
    archeryRange.factionNames[factionId] = variant.structure;
  }
}

applyArcherFactionVariants();

// ============================================================
// GAME STATE
// ============================================================

function getForgeItemsForFaction(faction) {
  const fDef = FACTIONS[faction];
  const baseItems = [...FORGE_BASE_ITEMS];
  // Faction bonus items: additional items unique to this faction
  const bonusItems = (fDef && fDef.forgeBonusItems) || [];
  return [...baseItems, ...bonusItems.filter(id => !baseItems.includes(id))];
}

function getAdvancedForgeEntries() {
  return ADVANCED_FORGE_ITEMS
    .filter(entry => ITEMS[entry.id])
    .map(entry => ({ ...entry, item: ITEMS[entry.id] }));
}
let G = null;
let selectedUnitId = null;
let selectedGroundTile = null;
let selectedShop = null;
let selectedVendor = null;
let selectedBazaar = null;
let selectedStructure = null;
let selectedTunnel = null;
let selectedBarrel = null;
let selectedWall = null;
let interactionMode = 'idle';
let mirrorPending = null;
let scrollPending = null;
let placingUnitType = null;
let placingStructureType = null;
let pendingHeroChoiceForPlacement = null;
let pendingHeroNameForPlacement = null;
let factionPickMode = 'new_game'; // 'new_game' | 'revive'
let productionTab = 'buildings';
let reachableTiles = [];
let nextUnitId = 0;
let lastRenderedHpByUnitId = new Map();

const SHUDDER_EFFECT_MS = 320;
const BLOOD_SPATTER_EFFECT_MS = 2400;
const DEATH_BLOOD_EFFECT_MS = 1200;
const DEATH_FIRE_EFFECT_MS = 1100;
const TRAP_EXPLOSION_EFFECT_MS = 650;

function pruneCombatEffects() {
  if (!G || !G.combatEffects) return;
  const now = Date.now();
  G.combatEffects = G.combatEffects.filter(e => e && e.expiresAt > now);
}

function queueAttackHitEffects(x, y) {
  if (!G) return;
  if (!G.combatEffects) G.combatEffects = [];
  pruneCombatEffects();

  const now = Date.now();
  const bloodStartAt = now + SHUDDER_EFFECT_MS;
  G.combatEffects.push({ x, y, type: 'shudder', expiresAt: now + SHUDDER_EFFECT_MS });
  G.combatEffects.push({ x, y, type: 'blood', startsAt: bloodStartAt, expiresAt: bloodStartAt + BLOOD_SPATTER_EFFECT_MS });

  // Force a repaint when blood should appear and again when it should fully clear.
  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, SHUDDER_EFFECT_MS + 20);
  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, SHUDDER_EFFECT_MS + BLOOD_SPATTER_EFFECT_MS + 40);
}

function queueDeathHitEffects(x, y) {
  if (!G) return;
  if (!G.combatEffects) G.combatEffects = [];
  pruneCombatEffects();

  const now = Date.now();
  G.combatEffects.push({ x, y, type: 'death_blood', expiresAt: now + DEATH_BLOOD_EFFECT_MS });

  // Repaint during the burst and once it clears so dropped loot is fully visible.
  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, 120);
  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, DEATH_BLOOD_EFFECT_MS + 40);
}

function queueTrapActivationEffects(x, y) {
  if (!G) return;
  if (!G.combatEffects) G.combatEffects = [];
  pruneCombatEffects();

  const now = Date.now();
  const bloodStartAt = now + 40;
  G.combatEffects.push({ x, y, type: 'shudder', expiresAt: now + SHUDDER_EFFECT_MS });
  G.combatEffects.push({ x, y, type: 'trap_explosion', expiresAt: now + TRAP_EXPLOSION_EFFECT_MS });
  G.combatEffects.push({ x, y, type: 'blood', startsAt: bloodStartAt, expiresAt: bloodStartAt + BLOOD_SPATTER_EFFECT_MS });

  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, 70);
  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, TRAP_EXPLOSION_EFFECT_MS + 80);
}

function queueStructureDeathEffects(x, y) {
  if (!G) return;
  if (!G.combatEffects) G.combatEffects = [];
  pruneCombatEffects();

  const now = Date.now();
  G.combatEffects.push({ x, y, type: 'death_fire', expiresAt: now + DEATH_FIRE_EFFECT_MS });

  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, 120);
  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, DEATH_FIRE_EFFECT_MS + 40);
}

function queueTileShudderOnlyEffect(x, y) {
  if (!G) return;
  if (!G.combatEffects) G.combatEffects = [];
  pruneCombatEffects();

  const now = Date.now();
  G.combatEffects.push({ x, y, type: 'shudder', expiresAt: now + SHUDDER_EFFECT_MS });

  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, SHUDDER_EFFECT_MS + 40);
}

function triggerAttackHitEffects(x, y) {
  if (!G) return;
  queueAttackHitEffects(x, y);

  renderAll();

  setTimeout(() => {
    if (!G) return;
    pruneCombatEffects();
    renderAll();
  }, SHUDDER_EFFECT_MS + BLOOD_SPATTER_EFFECT_MS + 60);
}

// ============================================================
// STAT COMPUTATION
// ============================================================

function getHeroData(unit) {
  if (unit.type !== 'hero' || !unit.faction) return null;
  const faction = FACTIONS[unit.faction];
  if (!faction || !faction.heroes) return null;
  if (unit.heroChoice && faction.heroes[unit.heroChoice]) return faction.heroes[unit.heroChoice];
  return Object.values(faction.heroes)[0];
}

// Cooldown in turns (1 = usable every turn, 2 = every other turn, etc.)
// Abilities not listed here default to 1 (no cooldown, once per turn).
const ABILITY_COOLDOWNS = {
  // Hero abilities
  arcane_blast:     2,  // INT-scaled magic damage, 70% hit
  blade_dance:      2,  // AoE attack on all adjacent
  blood_frenzy:     3,  // +4 ATK + heal-to-full on kill
  rune_of_shatter:  3,  // AoE DEF shatter
  divine_shield:    2,  // +5 DEF to group
  aimed_shot:       2,  // Guaranteed hit, normal wound roll vs defense
  mirror_image:     3,  // Summon a mirror copy
  consecrate:       3,  // AoE damage + weaken aura
  summon_swarm:     2,  // AoE 2 damage
  hex_curse:        2,  // -3 ATK/-3 DEF debuff
  tame_beast:       2,  // Convert a Foul Beast to your team
  shield_bash:      2,  // DEF-damage + push 2 + stun
  orc_warcry:       2,  // Mass stun
  bloodrend:        2,  // Flat 5 damage to bleeding enemy
  human_rally:      1,  // Requires positioning, fine at 1
  goblin_disengage: 1,  // Legacy — now slippery passive
  shadowstep:       3,  // Teleport + guaranteed crit
  elf_leap:         1,  // Movement utility, fine at 1
  dwarf_muster:     2,  // Spawning flexibility
  // Skeleton abilities
  raise_dead:       2,  // Summon free shambling corpse
  soul_siphon:      2,  // Drain 4 HP + heal
  bone_explosion:   3,  // Sacrifice ally for AoE
  // Troll abilities
  devour:           2,  // Eat low-HP enemy
  troll_rampage:    3,  // Charge + push
  trolls_blessing:  3,  // Grant regen to group
  seizing_totem:    3,  // Place seizing totem (3 turn CD after killed/retrieved)
  retrieve_totem:   0,  // Pick up seizing totem (no CD)
  // Bard abilities
  crescendo:        2,  // AoE ATK buff (unused by bards , kept for items)
  battle_march:     2,  // AoE movement buff (unused by bards , kept for items)
  mimic:            3,  // Copy last ability used
  cadence_of_haste: 2,  // Grant ally bonus action
  lullaby:          3,  // AoE stun
  // Kobold abilities
  tunnel_a:         5,  // Dig tunnel entrance A
  tunnel_b:         5,  // Dig tunnel entrance B
  use_tunnel:       3,  // Travel through tunnel
  scavenge:         2,  // Find random item
  booby_trap:       4,  // Place trap
  camouflage:       3,  // Disguise as tree
  forge_barrel:     4,  // Generate explosive barrel
  poisonous_shiv:   2,  // Instant max poison
  rescue:           3,  // Teleport to ally and heal
  appraise_destroy:  0,  // Destroy item for passives (no CD)
  bounty_mark:       4,  // Mark enemy for death
  // Item-granted abilities
  teleport_home:    5,  // Very powerful repositioning
  double_strike:    2,  // Extra free attack
  war_stomp:        2,  // AoE knockback
  heal_allies:      2,  // AoE heal
  berserk:          3,  // Big ATK boost (lasts 2 turns)
  blink:            3,  // Teleport up to 3 tiles
  corrupted_chalice: 2,  // Sacrifice HP to heal ally
  smoke_bomb:        4,  // Deploy smoke concealment for 3 turns
  bottled_lightning:  3,  // Chain lightning damage
  voodoo_doll:       3,  // Transfer debuffs to enemy
  // Magic weapon abilities
  runic_conjure:    3,  // Generate random consumable
  curse_hex:        2,  // Curse target (no damage)
  lethargy:         2,  // Slow target (no damage)
  flash_freeze:     2,  // Freeze target (no damage)
  enfeeble:         2,  // Weaken target (no damage)
  gore_curse:       2,  // Bleed target (no damage)
  fireball:         2,  // AoE fire damage + burning
  frost_ray:        2,  // Single target freeze + damage
  lightning_bolt:   2,  // Long range damage + slow
  life_drain:       3,  // Damage + self heal
  poison_cloud:     1,  // AoE poison
  battle_cry:       3,  // AoE ally ATK buff
  // Special item abilities
  detonate:         0,  // One-time use (kills wearer)
  precision_shot:   3,  // Guaranteed ranged hit
  grapple:          2,  // Pull unit to you
  ensnare:          4,  // Immobilize enemy
  grab:             2,  // Combat lock adjacent enemy
  divine_barrier:   5,  // Temp HP shield
  // Wave 6 item abilities
  fish:             2,  // Fishing rod — catch fresh fish
  summon_pooka:     10,  // Pocket Pooka — summon powerful creature
  summon_zombie:    4,  // Tome — summon zombie warrior
  // Wave 16 item abilities
  pistol_shot:      2,  // Duellist's Pistol — free action, 2 turn CD
  giant_shot:       3,  // Bow of Giants — STR-based ranged shot
  // Ogre abilities
  ogre_throw:       2,  // Hurl adjacent unit
  static_discharge: 1,  // Consume static charges for damage (no CD, but needs charges)
  // Merfolk abilities
  morph:            0,  // Reallocate stats — once per turn (no cooldown)
  harpoon_shot:     2,  // Hook enemy + drag on move (this turn only)
  // Gnome abilities
  sniper_shot:      2,  // Long-range devastating shot
  mortar_strike:    0,  // Artillery strike over walls (no cooldown)
};

function getAbilityCooldown(abilityId) {
  return ABILITY_COOLDOWNS[abilityId] || 1;
}

// All item-granted action IDs (as opposed to hero abilities or consumables)
const ITEM_ACTION_IDS = new Set([
  'double_strike', 'teleport_home', 'war_stomp', 'heal_allies', 'crescendo', 'battle_march',
  'berserk', 'fireball', 'frost_ray', 'lightning_bolt', 'life_drain', 'poison_cloud',
  'battle_cry', 'detonate', 'precision_shot', 'grapple', 'ensnare', 'grab', 'divine_barrier',
  'fish', 'summon_pooka', 'summon_zombie', 'boomerang_throw', 'runic_conjure',
  'curse_hex', 'lethargy', 'flash_freeze', 'enfeeble', 'gore_curse',
  'pistol_shot', 'giant_shot',
  'blink', 'corrupted_chalice', 'smoke_bomb',
  'bottled_lightning', 'voodoo_doll'
]);

function isAbilityReady(unit, abilityId) {
  // Blocked this turn (already used)
  if (unit.specialActionsUsed && unit.specialActionsUsed.includes(abilityId)) return false;
  // On cooldown from a previous turn
  if (unit.cooldowns && unit.cooldowns[abilityId] > 0) return false;
  return true;
}

function getAbilityCooldownRemaining(unit, abilityId) {
  if (unit.cooldowns && unit.cooldowns[abilityId] > 0) return unit.cooldowns[abilityId];
  return 0;
}

function startAbilityCooldown(unit, abilityId) {
  unit.specialActionsUsed.push(abilityId);
  // Track item action usage (one item action per turn, unless multi_action passive)
  if (ITEM_ACTION_IDS.has(abilityId) && !hasPassive(unit, 'multi_action')) {
    unit.hasUsedItemAction = true;
  }
  // Track last ability used per-unit (for Mimic)
  if (abilityId !== 'mimic' && abilityId !== 'mimicked_ability') {
    // Resolve a human-readable name for the ability
    let abilityName = abilityId;
    if (unit.ability && unit.ability.id === abilityId) {
      abilityName = unit.ability.name;
    } else {
      // Check item-granted abilities
      for (const item of (unit.inventory || [])) {
        if (item.grantsAbility && item.grantsAbility.id === abilityId) {
          abilityName = item.grantsAbility.name;
          break;
        }
      }
    }
    unit.lastAbilityUsed = { id: abilityId, name: abilityName };
  }
  const cd = getAbilityCooldown(abilityId);
  if (cd > 1) {
    if (!unit.cooldowns) unit.cooldowns = {};
    unit.cooldowns[abilityId] = cd; // will tick down at start of each turn
  }
}

// ============================================================
// STATUS EFFECTS
// ============================================================
const STATUS_EFFECTS = {
  poison:   { id: 'poison',   name: 'Poison',   icon: '☠',  color: '#00CC00', dot: 1, duration: 3, stackable: true, maxStacks: 5, desc: 'Stacks up to 5. 1-2 stacks: 1 dmg/turn, 3-4 stacks: 2 dmg/turn, 5 stacks: 3 dmg/turn. Lasts 3 turns.' },
  burning:  { id: 'burning',  name: 'Burning',  icon: '🔥', color: '#FF4400', dot: 2, duration: 2, desc: '2 damage per turn for 2 turns' },
  bleeding: { id: 'bleeding', name: 'Bleeding', icon: '🩸', color: '#CC0000', dot: 1, duration: 4, desc: '1 damage per turn for 4 turns' },
  weakened: { id: 'weakened', name: 'Weakened', icon: '⬇',  color: '#AA8800', atkMod: -3, duration: 2, desc: '-3 ATK for 2 turns' },
  slowed:   { id: 'slowed',   name: 'Slowed',   icon: '🐌', color: '#6688AA', moveMod: -2, duration: 2, desc: '-2 movement for 2 turns' },
  frozen:   { id: 'frozen',   name: 'Frozen',   icon: '❄',  color: '#88CCFF', duration: 2, desc: 'Cannot move for 1 turn. Cannot perform Attacks of Opportunity' },
  cursed:    { id: 'cursed',    name: 'Cursed',    icon: '💀', color: '#8800AA', defMod: -3, duration: 2, desc: '-3 DEF for 2 turns' },
  shattered: { id: 'shattered', name: 'Shattered', icon: '💎', color: '#AA4400', defMod: -4, duration: 2, desc: '-4 DEF for 2 turns (armor cracked)' },
  sundered:  { id: 'sundered',  name: 'Sundered',  icon: '⚒',  color: '#996633', defMod: -2, duration: 2, desc: '-2 DEF for 2 turns (armor weakened)' },
  ensnared:  { id: 'ensnared',  name: 'Ensnared',  icon: '🕸', color: '#888888', duration: 3, desc: 'Cannot move for 2 turns (trapped in net)' },
  combat_locked: { id: 'combat_locked', name: 'Combat Locked', icon: '🔒', color: '#CC6600', duration: 2, desc: 'Locked in combat! Cannot move, leap, teleport, or disengage for 1 turn' },
  beguiled: { id: 'beguiled', name: 'Beguiled', icon: '🎵', color: '#DD88DD', duration: 2, desc: 'Enchanted by song. Can move but cannot attack, retaliate, or use abilities for 2 turns' },
  speed_boost:  { id: 'speed_boost',  name: 'Speed Boost',  icon: '💨', color: '#5744ff', moveMod: 4,  duration: 3, desc: '+4 movement for 3 turns (Speed Potion)' },
  enraged:      { id: 'enraged',      name: 'Enraged',      icon: '🔴', color: '#FF4444', atkMod: 4,   duration: 1, desc: '+4 ATK this turn (Rage Potion)' },
  stoneskin:    { id: 'stoneskin',    name: 'Stoneskin',    icon: '🪨', color: '#AABB88', defMod: 4,   duration: 2, desc: '+4 DEF until end of next turn (Stoneskin Potion)' },
  greased:      { id: 'greased',      name: 'Greased',      icon: '🫧', color: '#EEDD44', duration: 2, desc: '100% dodge chance for 2 turns (Petroleum Jelly)' },
  on_strike:    { id: 'on_strike',    name: 'On Strike',    icon: '✊', color: '#DD2222', duration: 2, desc: 'Refusing to work! Cannot gather resources for 2 turns' },
  hastened:     { id: 'hastened',     name: 'Hastened',     icon: '⚡', color: '#44CCFF', moveMod: 3, duration: 3, desc: '+3 movement for 3 turns' },
  deadly_focus: { id: 'deadly_focus', name: 'Deadly Focus', icon: '🎯', color: '#FF2266', duration: 99, desc: 'Next attack is a guaranteed critical hit. Removed after attacking.' },
  bounty_marked: { id: 'bounty_marked', name: 'Bounty Marked', icon: '💰', color: '#DAA520', duration: 99, desc: 'Marked for death! Takes +3 damage from all sources. Grants 3 gold to the killer.' },
  hexed:         { id: 'hexed',         name: 'Hexed',         icon: '🔮', color: '#9933CC', dot: 1, duration: 5, desc: '1 damage per turn for 5 turns. +1 damage for each other DoT on the target (Poison, Burning, Bleeding).' },
  dark_energy:   { id: 'dark_energy',   name: 'Dark Energy',   icon: '🌑', color: '#6600CC', duration: 5, stackable: true, maxStacks: 5, desc: '+1 STR and +1 AGI per stack (max 5). Lasts 5 turns. Critting refreshes all stacks.' },
};

// ============================================================
// PASSIVES
// ============================================================
const PASSIVES = {
  retaliate:          { id: 'retaliate',          name: 'Retaliate',          icon: '⚔', desc: '50% chance to counter-attack when hit by an adjacent unit' },
  climbing:           { id: 'climbing',           name: 'Climbing',           icon: '⛰', desc: 'Can move through rock/stone tiles' },
  water_walking:      { id: 'water_walking',      name: 'Water Walking',      icon: '🌊', desc: 'Can move through water tiles' },
  haste:              { id: 'haste',              name: 'Haste',              icon: '⚡', desc: '+2 movement speed per stack (stacks)' },
  mounted:            { id: 'mounted',            name: 'Mounted',            icon: '🐴', desc: '+5 movement speed' },
  reflect:            { id: 'reflect',            name: 'Reflect',            icon: '🔃', desc: '30% chance to reflect physical projectiles (arrows, bolts, shots) back at the attacker. Does not work against magic.' },
  vampirism:          { id: 'vampirism',          name: 'Vampirism',          icon: '🧛', desc: 'On successful hit, heal 1-3 HP' },
  resource_gathering: { id: 'resource_gathering', name: 'Resource Gathering', icon: '⛏', desc: 'Can gather resources from adjacent tiles' },
  poison_resistance:  { id: 'poison_resistance',  name: 'Poison Resistance',  icon: '🛡', desc: 'Immune to Poison' },
  frost_resistance:   { id: 'frost_resistance',   name: 'Frost Resistance',   icon: '🧊', desc: 'Immune to Frozen' },
  fire_resistance:    { id: 'fire_resistance',    name: 'Fire Resistance',    icon: '🔥', desc: 'Immune to Burning' },
  magic_resistance:   { id: 'magic_resistance',   name: 'Magic Resistance',   icon: '✨', desc: 'Reduce magic damage by 2' },
  regeneration:       { id: 'regeneration',       name: 'Regeneration',       icon: '💚', desc: 'Heal 2 HP per turn instead of 1 when out of combat. +1 HP per extra stack, max 3 stacks (stacks)' },
  combat_regeneration: { id: 'combat_regeneration', name: 'Combat Regeneration', icon: '❤️‍🔥', desc: 'Heal 2 HP per turn instead of 1, even while adjacent to enemies. +1 HP per extra stack, max 3 stacks (stacks)' },
  thorns:             { id: 'thorns',             name: 'Thorns',             icon: '🌿', desc: 'Deal 1 damage per stack back to melee attackers when hit (stacks)' },
  steadfast:          { id: 'steadfast',          name: 'Steadfast',          icon: '🏔', desc: 'Immune to Slowed and movement reduction effects' },
  piercing:           { id: 'piercing',           name: 'Piercing',           icon: '🗡', desc: 'Attacks ignore 2 DEF per stack (stacks)' },
  evasion:            { id: 'evasion',            name: 'Evasion',            icon: '💨', desc: '+3% bonus dodge chance per stack (stacks)' },
  bulwark:            { id: 'bulwark',            name: 'Bulwark',            icon: '🛡', desc: 'Take 1 less damage from all sources per stack (min 1). Stacks from multiple items.' },
  extended_reach:     { id: 'extended_reach',     name: 'Extended Reach',     icon: '🦾', desc: '+1 melee weapon range (melee weapons only)' },
  bardic_inspiration: { id: 'bardic_inspiration', name: 'Bardic Inspiration', icon: '🎵', desc: 'Aura: +2 ATK to allies within 3 tiles' },
  bardic_dance:       { id: 'bardic_dance',       name: 'Bardic Dance',       icon: '💃', desc: 'Aura: +10% dodge to allies within 3 tiles' },
  scope_range:        { id: 'scope_range',        name: 'Scope',              icon: '🔭', desc: '+1 ranged weapon range (bows, crossbows, magic weapons only)' },
  bardic_range:       { id: 'bardic_range',       name: 'Bardic Range',       icon: '🎶', desc: 'Aura: +1 ranged weapon range to allies within 3 tiles' },
  discordant_aura:    { id: 'discordant_aura',    name: 'Discordant Aura',    icon: '🎶', desc: 'Aura: -15% dodge to enemies within 3 tiles' },
  dual_grip:          { id: 'dual_grip',          name: 'Strong Grip',        icon: '🤲', desc: 'Can equip an offhand item while wielding a two-handed weapon' },
  static_shock:       { id: 'static_shock',       name: 'Static Shock',       icon: '⚡', desc: 'Melee attackers take 2–4 lightning damage when they hit you' },
  unarmored_fury:     { id: 'unarmored_fury',     name: 'Unarmored Fury',     icon: '💢', desc: 'If no armor is worn (head/body/legs/feet/hands/offhand), gain +5 ATK, +3 movement, +3 STR/INT/CON, +8 AGI but DEF is set to 0' },
  sanguine_feast:     { id: 'sanguine_feast',     name: 'Sanguine Feast',     icon: '🩸', desc: 'All attacks inflict Bleeding. Whenever an enemy within 5 spaces takes bleeding damage, heal for 1' },
  weightless:         { id: 'weightless',         name: 'Weightless',         icon: '🪶', desc: 'Equipment weight has no effect on movement' },
  executioner:        { id: 'executioner',        name: 'Executioner',        icon: '🪓', desc: 'Deal double damage to enemies below 25% HP' },
  sundering_blows:    { id: 'sundering_blows',    name: 'Sundering Blows',    icon: '⚒', desc: 'Attacks apply Sundered (-2 DEF for 2 turns)' },
  overwatch:          { id: 'overwatch',          name: 'Overwatch',          icon: '🎯', desc: 'Fire a ranged attack of opportunity when an enemy moves within your weapon range' },
  stone_skin_passive: { id: 'stone_skin_passive', name: 'Stone Skin',         icon: '🗿', desc: 'Immune to Bleeding and Poison' },
  martyr:             { id: 'martyr',             name: 'Martyr',             icon: '✝', desc: 'When this unit dies, all adjacent allies heal 10 HP. Martyr items are destroyed.' },
  jinx:               { id: 'jinx',               name: 'Jinx',               icon: '🧿', desc: 'Enemies within 3 tiles have -15% crit chance' },
  momentum:           { id: 'momentum',           name: 'Momentum',           icon: '🏃', desc: 'Every 3 tiles moved before attacking grants +1 ATK to that attack' },
  inferno_armor:      { id: 'inferno_armor',      name: 'Inferno Armor',      icon: '🔥', desc: 'Melee attackers are set on fire (Burning for 2 turns)' },
  venomous_armor:     { id: 'venomous_armor',     name: 'Venomous Armor',     icon: '☠', desc: 'Melee attackers are poisoned (Poison for 3 turns)' },
  mirrored:           { id: 'mirrored',           name: 'Mirrored',           icon: '🪞', desc: 'When attacking with a magic weapon or using its ability, your mirror image also casts it' },
  spongey:            { id: 'spongey',            name: 'Spongey',            icon: '🧽', desc: 'Soaks 50% of damage dealt to adjacent allies — that damage is transferred to this unit instead' },
  lucky_rune:         { id: 'lucky_rune',         name: 'Lucky Rune',         icon: '🍀', desc: '50% chance to not consume a consumable when used' },
  demolitionist:      { id: 'demolitionist',      name: 'Demolitionist',      icon: '💣', desc: 'Deal double damage to structures/buildings' },
  bardic_wisdom:      { id: 'bardic_wisdom',      name: 'Bardic Wisdom',      icon: '📖', desc: 'Aura: +1 INT to allies within 3 tiles (stacks)' },
  midas_touch:        { id: 'midas_touch',        name: 'Midas Touch',        icon: '✨', desc: '40% chance when killing an enemy to turn their tile into a gold deposit' },
  gravecall:          { id: 'gravecall',          name: 'Gravecall',          icon: '🧟', desc: 'On kill, chance to raise a lesser zombie from the fallen enemy' },
  twinshot:           { id: 'twinshot',           name: 'Twinshot',           icon: '🏹', desc: 'When attacking with a bow, fire a second arrow at the same target' },
  sweeping_strikes:   { id: 'sweeping_strikes',   name: 'Sweeping Strikes',   icon: '🌀', desc: 'When you hit an enemy, deal the same damage to one other adjacent enemy' },
  lumbering_oaf:       { id: 'lumbering_oaf',       name: 'Lumbering Oaf',       icon: '🦣', desc: 'Can never dodge. STR grants bonus HP. DEF is capped at 5; excess DEF converts to bonus HP.' },
  potent_formula:      { id: 'potent_formula',      name: 'Potent Formula',      icon: '☠', desc: 'When you kill a poisoned enemy, spread their remaining poison stacks to nearby enemies within 2 tiles' },
  smoke_concealment:   { id: 'smoke_concealment',   name: 'Concealed by Smoke',  icon: '💨', desc: 'Aura: you and adjacent allies cannot be targeted by ranged attacks' },
  multi_action:        { id: 'multi_action',        name: 'Man of Action',       icon: '💎', desc: 'Can use multiple item actions per turn (no limit)' },
  static_conduit:      { id: 'static_conduit',      name: 'Static Conduit',      icon: '⚡', desc: 'Whenever an enemy takes damage within 3 spaces, gain a Static Charge (used by Static Discharge)' },
  swimming:            { id: 'swimming',            name: 'Swimming',            icon: '🏊', desc: 'Can move through water tiles' },
  double_strike:        { id: 'double_strike',        name: 'Double Strike',          icon: '⚔️', desc: 'Can equip weapons in the offhand slot. When attacking, swing twice — once with each hand.' },
  dual_wield:            { id: 'dual_wield',            name: 'Dual Wield',             icon: '🗡️', desc: 'Can equip a weapon in the offhand slot for its stats, but only swings with the mainhand.' },
  run_and_gun:         { id: 'run_and_gun',         name: 'Run and Gun',         icon: '🏃', desc: 'Shooting does not prevent movement. Can move after attacking.' },
  bone_collector:      { id: 'bone_collector',      name: 'Bone Collector',      icon: '🦴', desc: 'When a friendly skeleton warrior dies within 5 tiles, 40% chance to revive it at the nearest skeleton barracks.' },
  shamble_on:          { id: 'shamble_on',          name: 'Shamble On',          icon: '🧟', desc: 'Instead of dying, lose a limb (equipment slot) and survive at 1 HP. Losing legs prevents movement. On the 3rd severed limb, die. Rest to regenerate all limbs.' },
  hungering_soul:      { id: 'hungering_soul',      name: 'Soul Barricade',      icon: '💀', desc: 'When any unit dies within 5 tiles, gain a stack of Soul Barricade (max 5). Each stack reduces incoming damage by 2 (min 1). Lose 1 stack each time you are hit.' },
  pestilence:          { id: 'pestilence',          name: 'Pestilence',          icon: '🐀', desc: 'When an enemy dies within 5 tiles while poisoned, a Plague Rat spawns on the spot where it died.' },
  slippery:            { id: 'slippery',            name: 'Slippery',            icon: '💨', desc: 'Immune to Attacks of Opportunity, Overwatch, and Combat Lock' },
  hexweaver_curse:     { id: 'hexweaver_curse',     name: 'Hex Curse',           icon: '🔮', desc: 'All attacks inflict Weakened (-3 ATK) and Cursed (-3 DEF) for 2 turns' },
  bloodlust:           { id: 'bloodlust',           name: 'Bloodlust',           icon: '🩸', desc: 'On kill, movement is fully reset — can move again at full distance' },
  pack_guardian:        { id: 'pack_guardian',        name: 'Fierce Loyalty',       icon: '🐾', desc: 'When hit, your tamed beast within 5 tiles charges the attacker and retaliates' },
  trollblood_aura:     { id: 'trollblood_aura',     name: 'Trollblood Aura',      icon: '💚', desc: 'Aura: you and allies within 3 tiles gain Combat Regeneration (heal 2 HP/turn, even in combat)' },
  enchanting_song:     { id: 'enchanting_song',     name: 'Enchanting Song',      icon: '🎶', desc: 'Aura: all passives you have are shared with adjacent allies' },
  dark_purpose:          { id: 'dark_purpose',          name: 'Dark Purpose',          icon: '🌑', desc: 'Removes crit cap (up to 100%). On crit with a magic weapon or spell, gain 2 stacks of Dark Energy (+1 STR/AGI per stack, max 5, 5 turns). Critting refreshes all stacks.' },
  windworks:             { id: 'windworks',             name: 'Windworks',             icon: '🌀', desc: 'When you dodge a melee attack, automatically retaliate. When you dodge a ranged attack, reflect it back at the attacker.' },
  relentless_assault:    { id: 'relentless_assault',    name: 'Relentless Assault',    icon: '🏹', desc: 'Ranged (non-magic) attacks can combat lock enemies. +30% base combat lock chance.' },
  hunger:                { id: 'hunger',                name: 'Hunger',                icon: '🍖', desc: 'When you Devour a unit, gain a stack of Satiation (infinite stacks, no decay). Each stack: +5 max HP, -1 movement, -1 AGI, +2 STR. If you have any stacks, gain Digest (clears all stacks).' },
  holy_wrath:            { id: 'holy_wrath',            name: 'Holy Wrath',            icon: '☀', desc: 'Critical hits deal bonus damage based on DEF (+5% crit damage per point of DEF)' },
  unstoppable_force:     { id: 'unstoppable_force',     name: 'Unstoppable Force',     icon: '🌪', desc: 'Crushing hits deal +1 damage per 3 points of movement (replaces base crush damage)' },
  foresight:             { id: 'foresight',             name: 'Foresight',             icon: '🔮', desc: 'INT also contributes to crushing hit chance (INT × 2%)' },
  perfect_insight:       { id: 'perfect_insight',       name: 'Perfect Insight',       icon: '👁', desc: 'All stackable passives are set to the highest stack count among them' },
  heavy_handed:          { id: 'heavy_handed',          name: 'Heavy Handed',          icon: '🔨', desc: '+10% crushing hit chance per stack (stacks)' },
  precision:             { id: 'precision',             name: 'Precision',             icon: '🎯', desc: '+5% critical hit chance per stack (stacks)' },
  ballistics_training:   { id: 'ballistics_training',   name: 'Ballistics Training',   icon: '📐', desc: 'INT increases Sniper Shot range (base 6 + INT)' },
  steady_bombardment:    { id: 'steady_bombardment',    name: 'Steady Bombardment',    icon: '🧨', desc: 'If this unit does not move for a turn, crit chance is set to max cap until it moves again' },
};

// Check if a unit is concealed by smoke (has smoke_concealment or adjacent ally has it)
function isConcealedBySmoke(unit) {
  return hasPassive(unit, 'smoke_concealment');
}

// Get Sniper Shot range: base 6 + INT if unit has ballistics_training
function getSniperShotRange(unit) {
  if (!hasPassive(unit, 'ballistics_training')) return 6;
  const stats = getUnitStats(unit);
  return 6 + stats.int;
}

function hasEquippedRangedWeapon(unit) {
  if (!unit || !unit.equipment) return false;
  for (const slot of getUnitEquipSlots(unit)) {
    const item = unit.equipment[slot];
    if (!item || item === '_two_handed_') continue;
    if (item.weaponType && RANGED_WEAPON_TYPES.includes(item.weaponType)) return true;
  }
  return false;
}

// Get all passives a unit has (innate + from items)
function getUnitPassives(unit) {
  const passives = new Set();
  // Innate passives on the unit
  if (unit.passives) {
    for (const p of unit.passives) passives.add(p);
  }
  // Troll's Blessing temporary combat regeneration
  if (unit.trollBlessingTurns && unit.trollBlessingTurns > 0) {
    passives.add('combat_regeneration');
  }
  // Regeneration Potion temporary regeneration
  if (unit.regenPotionTurns && unit.regenPotionTurns > 0) {
    passives.add('regeneration');
  }
  // Combat Regen Potion temporary regeneration
  if (unit.combatRegenTurns && unit.combatRegenTurns > 0) {
    passives.add('combat_regeneration');
  }
  // Smoke Bomb temporary smoke concealment (self + adjacent allies)
  if (unit.smokeBombTurns && unit.smokeBombTurns > 0) {
    passives.add('smoke_concealment');
  } else if (G && G.units) {
    for (const ally of G.units) {
      if (ally.hp > 0 && ally.id !== unit.id && ally.playerId === unit.playerId &&
          isAdjacent(unit.x, unit.y, ally.x, ally.y) && ally.smokeBombTurns && ally.smokeBombTurns > 0) {
        passives.add('smoke_concealment');
        break;
      }
    }
  }
  // Passives from equipped items
  if (unit.equipment) {
    for (const slot of getUnitEquipSlots(unit)) {
      const item = unit.equipment[slot];
      if (item && item !== '_two_handed_' && item.passives) {
        for (const p of item.passives) passives.add(p);
      }
    }
  }
  // Enchanting Song aura: inherit passives from adjacent allies that have enchanting_song
  if (!unit._enchantingSongCheck && G && G.units) {
    for (const ally of G.units) {
      if (ally.hp > 0 && ally.id !== unit.id && ally.playerId === unit.playerId &&
          isAdjacent(unit.x, unit.y, ally.x, ally.y)) {
        // Check if ally has enchanting_song (use flag to prevent recursion)
        ally._enchantingSongCheck = true;
        const allyHasES = getUnitPassives(ally).has('enchanting_song');
        delete ally._enchantingSongCheck;
        if (allyHasES) {
          // Get ally's own passives (without recursion) and share them
          ally._enchantingSongCheck = true;
          const allyPassives = getUnitPassives(ally);
          delete ally._enchantingSongCheck;
          for (const p of allyPassives) {
            if (p !== 'enchanting_song') passives.add(p);
          }
        }
      }
    }
  }
  return passives;
}

function hasPassive(unit, passiveId) {
  return getUnitPassives(unit).has(passiveId);
}

const STACKABLE_PASSIVES = ['haste', 'thorns', 'piercing', 'evasion', 'bulwark', 'bardic_wisdom', 'regeneration', 'combat_regeneration', 'heavy_handed', 'precision'];

function countPassive(unit, passiveId) {
  let count = 0;
  if (unit.passives) {
    for (const p of unit.passives) if (p === passiveId) count++;
  }
  if (unit.equipment) {
    for (const slot of getUnitEquipSlots(unit)) {
      const item = unit.equipment[slot];
      if (item && item !== '_two_handed_' && item.passives) {
        for (const p of item.passives) if (p === passiveId) count++;
      }
    }
  }
  // Perfect Insight: equalize all stackable passives to the highest stack count
  if (count > 0 && STACKABLE_PASSIVES.includes(passiveId) && hasPassive(unit, 'perfect_insight')) {
    let maxStacks = count;
    for (const sp of STACKABLE_PASSIVES) {
      if (sp === passiveId) continue;
      let sc = 0;
      if (unit.passives) { for (const p of unit.passives) if (p === sp) sc++; }
      if (unit.equipment) { for (const slot of getUnitEquipSlots(unit)) { const item = unit.equipment[slot]; if (item && item !== '_two_handed_' && item.passives) { for (const p of item.passives) if (p === sp) sc++; } } }
      if (sc > maxStacks) maxStacks = sc;
    }
    return maxStacks;
  }
  return count;
}

function applyStatusEffect(unit, effectId, duration) {
  if (!unit.statusEffects) unit.statusEffects = [];
  // Resistance passives block certain effects
  if (effectId === 'poison' && hasPassive(unit, 'poison_resistance')) {
    addLog(`🛡 ${getDisplayName(unit)} resists Poison!`);
    return;
  }
  if (effectId === 'frozen' && hasPassive(unit, 'frost_resistance')) {
    addLog(`🧊 ${getDisplayName(unit)} resists being Frozen!`);
    return;
  }
  if (effectId === 'frozen' && hasPassive(unit, 'steadfast')) {
    addLog(`🏔 ${getDisplayName(unit)}'s Steadfast stance resists being Frozen!`);
    return;
  }
  if (effectId === 'burning' && hasPassive(unit, 'fire_resistance')) {
    // Pot of Boiling Water: take 1 damage when extinguishing fire
    if (unit.equipment && unit.equipment.offhand && unit.equipment.offhand.boilingWater) {
      unit.hp -= 1;
      addLog(`🔥 ${getDisplayName(unit)} resists Burning, but the boiling water scalds for 1 damage! (${unit.hp > 0 ? unit.hp + ' HP' : 'DEFEATED!'})`);
      if (unit.hp <= 0) {
        addLog(`☠ ${getDisplayName(unit)} has been defeated by boiling water!`);
        finalizeUnitDeath(unit);
      }
    } else {
      addLog(`🔥 ${getDisplayName(unit)} resists Burning!`);
    }
    return;
  }
  if (effectId === 'bleeding' && hasPassive(unit, 'stone_skin_passive')) {
    addLog(`🗿 ${getDisplayName(unit)}'s Stone Skin resists Bleeding!`);
    return;
  }
  if (effectId === 'poison' && hasPassive(unit, 'stone_skin_passive')) {
    addLog(`🗿 ${getDisplayName(unit)}'s Stone Skin resists Poison!`);
    return;
  }
  if (effectId === 'slowed' && hasPassive(unit, 'steadfast')) {
    addLog(`🏔 ${getDisplayName(unit)}'s Steadfast stance resists being Slowed!`);
    return;
  }
  if (effectId === 'ensnared' && hasPassive(unit, 'steadfast')) {
    addLog(`🏔 ${getDisplayName(unit)}'s Steadfast stance resists being Ensnared!`);
    return;
  }
  if (effectId === 'combat_locked' && hasPassive(unit, 'steadfast')) {
    addLog(`🏔 ${getDisplayName(unit)}'s Steadfast stance resists being Combat Locked!`);
    return;
  }
  if (effectId === 'combat_locked' && hasPassive(unit, 'slippery')) {
    addLog(`💨 ${getDisplayName(unit)} is too slippery to be Combat Locked!`);
    return;
  }
  const existing = unit.statusEffects.find(se => se.id === effectId);
  const effectDef = STATUS_EFFECTS[effectId];
  if (existing) {
    existing.turnsLeft = Math.max(existing.turnsLeft, duration); // refresh duration
    // Stackable effects (e.g. Poison) gain a stack on reapplication
    if (effectDef && effectDef.stackable) {
      const maxStacks = effectDef.maxStacks || 1;
      const oldStacks = existing.stacks || 1;
      existing.stacks = Math.min(oldStacks + 1, maxStacks);
      if (existing.stacks > oldStacks) {
        addLog(`${effectDef.icon} ${getDisplayName(unit)}'s ${effectDef.name} intensifies! (${existing.stacks}/${maxStacks} stacks)`);
      } else {
        addLog(`${effectDef.icon} ${getDisplayName(unit)}'s ${effectDef.name} is at max stacks! (${maxStacks}/${maxStacks})`);
      }
    }
  } else {
    const newEffect = { id: effectId, turnsLeft: duration };
    if (effectDef && effectDef.stackable) newEffect.stacks = 1;
    unit.statusEffects.push(newEffect);
  }
}

function removeStatusEffect(unit, effectId) {
  if (!unit.statusEffects) return;
  unit.statusEffects = unit.statusEffects.filter(se => se.id !== effectId);
}

function hasStatusEffect(unit, effectId) {
  return unit.statusEffects && unit.statusEffects.some(se => se.id === effectId);
}

function getStatusEffectModifiers(unit) {
  let atk = 0, def = 0, move = 0;
  if (!unit.statusEffects) return { atk, def, move };
  for (const se of unit.statusEffects) {
    const eff = STATUS_EFFECTS[se.id];
    if (!eff) continue;
    if (eff.atkMod) atk += eff.atkMod;
    if (eff.defMod) def += eff.defMod;
    if (eff.moveMod) move += eff.moveMod;
  }
  return { atk, def, move };
}

function processStatusEffects(unit) {
  if (!unit.statusEffects || unit.statusEffects.length === 0) return;
  const expiredEffects = [];
  for (const se of unit.statusEffects) {
    const def = STATUS_EFFECTS[se.id];
    if (!def) continue;
    // Apply damage over time
    if (def.dot && def.dot > 0) {
      // Stackable effects use tiered damage (Poison: 1-2 stacks=1, 3-4=2, 5=3)
      let dotDmg = def.dot;
      if (def.stackable && se.stacks) {
        const s = se.stacks;
        dotDmg = s <= 2 ? 1 : s <= 4 ? 2 : 3;
      }
      // Hexed: +1 damage for each other active DoT (poison, burning, bleeding)
      if (se.id === 'hexed') {
        const DOT_IDS = ['poison', 'burning', 'bleeding'];
        const otherDots = unit.statusEffects.filter(other => DOT_IDS.includes(other.id)).length;
        dotDmg += otherDots;
      }
      unit.hp -= dotDmg;
      const stackInfo = (def.stackable && se.stacks > 1) ? ` (${se.stacks} stacks)` : '';
      addLog(`${def.icon} ${getDisplayName(unit)} takes ${dotDmg} ${def.name} damage${stackInfo}! (${unit.hp > 0 ? unit.hp + ' HP left' : 'DEFEATED!'})`);
      // Sanguine Feast: if this is bleeding damage, heal nearby units with the passive
      if (se.id === 'bleeding') {
        for (const ally of G.units) {
          if (ally.hp > 0 && ally.playerId !== unit.playerId && hasPassive(ally, 'sanguine_feast') && chebyshevDist(ally.x, ally.y, unit.x, unit.y) <= 5) {
            const allyStats = getUnitStats(ally);
            if (ally.hp < allyStats.maxHp) {
              ally.hp = Math.min(ally.hp + 1, allyStats.maxHp);
              addLog(`🩸 ${getDisplayName(ally)}'s Sanguine Feast heals 1 HP from ${getDisplayName(unit)}'s bleeding!`);
            }
          }
        }
      }
    }
    // Decrement duration
    se.turnsLeft--;
    if (se.turnsLeft <= 0) {
      expiredEffects.push(se.id);
    }
  }
  // Remove expired effects
  for (const effectId of expiredEffects) {
    unit.statusEffects = unit.statusEffects.filter(se => se.id !== effectId);
    const eff = STATUS_EFFECTS[effectId];
    if (eff) addLog(`${eff.icon} ${getDisplayName(unit)}'s ${eff.name} effect has worn off.`);
  }
  // Check death from DoT
  if (unit.hp <= 0) {
    // Shamble On: instead of dying from DoT, lose a limb slot and survive at 1 HP
    if (hasPassive(unit, 'shamble_on')) {
      if (!unit.severedSlots) unit.severedSlots = [];
      const LIMB_SLOTS_DOT = ['offhand', 'hands', 'feet', 'mainhand', 'legs', 'head'];
      const availableLimbs = LIMB_SLOTS_DOT.filter(s => !unit.severedSlots.includes(s));
      if (unit.severedSlots.length < 2 && availableLimbs.length > 0) {
        const severedSlot = availableLimbs[Math.floor(Math.random() * availableLimbs.length)];
        unit.severedSlots.push(severedSlot);
        if (unit.equipment && unit.equipment[severedSlot] && unit.equipment[severedSlot] !== '_two_handed_') {
          if (!G.groundItems) G.groundItems = [];
          G.groundItems.push({ x: unit.x, y: unit.y, item: unit.equipment[severedSlot] });
          addLog(`💎 ${getDisplayName(unit)} dropped ${unit.equipment[severedSlot].name} from severed ${SLOT_LABELS[severedSlot]}!`);
          unit.equipment[severedSlot] = null;
        }
        if (severedSlot === 'mainhand' && unit.equipment && unit.equipment.offhand === '_two_handed_') {
          unit.equipment.offhand = null;
        }
        unit.hp = 1;
        addLog(`🧟 ${getDisplayName(unit)}'s Shamble On! Lost ${SLOT_LABELS[severedSlot]} (${unit.severedSlots.length}/3 limbs severed) — survives at 1 HP!`);
        if (severedSlot === 'legs' || severedSlot === 'feet') addLog(`🦿 ${getDisplayName(unit)} can no longer move!`);
        return;
      }
    }
    unit.hp = 0;
    // Potent Formula: if dying from poison, spread stacks to nearby enemies
    const poisonEffect = unit.statusEffects ? unit.statusEffects.find(se => se.id === 'poison') : null;
    if (poisonEffect && poisonEffect.stacks > 0) {
      // Find any living unit with potent_formula that is hostile to the dying unit
      const formulaUser = G.units.find(u => u.hp > 0 && u.playerId !== unit.playerId && hasPassive(u, 'potent_formula'));
      if (formulaUser) {
        const totalStacks = poisonEffect.stacks;
        const nearbyEnemies = G.units.filter(u =>
          u.hp > 0 && u.id !== unit.id && u.id !== formulaUser.id &&
          u.playerId !== formulaUser.playerId &&
          chebyshevDist(unit.x, unit.y, u.x, u.y) <= 2 &&
          !hasPassive(u, 'poison_resistance') && !hasPassive(u, 'stone_skin_passive')
        );
        if (nearbyEnemies.length > 0) {
          addLog(`☠ ${getDisplayName(formulaUser)}'s Potent Formula spreads ${totalStacks} poison stack${totalStacks > 1 ? 's' : ''} from the fallen ${getDisplayName(unit)}!`);
          let remaining = totalStacks;
          let idx = 0;
          while (remaining > 0 && nearbyEnemies.length > 0) {
            const target = nearbyEnemies[idx % nearbyEnemies.length];
            if (!target.statusEffects) target.statusEffects = [];
            const existing = target.statusEffects.find(se => se.id === 'poison');
            if (existing) {
              if (existing.stacks < 5) {
                existing.stacks = Math.min(5, existing.stacks + 1);
                existing.turnsLeft = Math.max(existing.turnsLeft, 3);
                remaining--;
                idx++;
              } else {
                nearbyEnemies.splice(idx % nearbyEnemies.length, 1);
                if (nearbyEnemies.length === 0) break;
                if (idx >= nearbyEnemies.length) idx = 0;
              }
            } else {
              target.statusEffects.push({ id: 'poison', turnsLeft: 3, stacks: 1 });
              remaining--;
              idx++;
            }
          }
          for (const e of G.units.filter(u => u.hp > 0 && u.statusEffects && u.statusEffects.find(se => se.id === 'poison'))) {
            const pEff = e.statusEffects.find(se => se.id === 'poison');
            if (pEff) addLog(`  ☠ ${getDisplayName(e)}: ${pEff.stacks} poison stack${pEff.stacks > 1 ? 's' : ''}`);
          }
        }
      }
    }
    dropAllItems(unit);
    addLog(`☠ ${getDisplayName(unit)} has been killed by status effects!`);
    // Pestilence: if dying unit was poisoned and an enemy with pestilence is within 5 tiles, spawn a plague rat
    {
      const wasPoisoned = unit.statusEffects && unit.statusEffects.some(se => se.id === 'poison') ||
        expiredEffects.includes('poison');
      if (wasPoisoned) {
        const pestilenceUnit = G.units.find(u =>
          u.hp > 0 && u.playerId !== unit.playerId &&
          hasPassive(u, 'pestilence') &&
          chebyshevDist(unit.x, unit.y, u.x, u.y) <= 5
        );
        if (pestilenceUnit) {
          let spawnX = unit.x, spawnY = unit.y;
          const tileOccupied = G.units.some(u => u.hp > 0 && u.x === spawnX && u.y === spawnY && u.id !== unit.id);
          if (tileOccupied) {
            const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
            let found = false;
            for (const [dx, dy] of dirs) {
              const nx = unit.x + dx, ny = unit.y + dy;
              if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
              if (G.units.some(u2 => u2.hp > 0 && u2.x === nx && u2.y === ny)) continue;
              spawnX = nx; spawnY = ny; found = true; break;
            }
            if (!found) { spawnX = -1; }
          }
          if (spawnX >= 0) {
            const pPlayer = G.players[pestilenceUnit.playerId];
            const pPrefix = pPlayer.faction && FACTIONS[pPlayer.faction] ? FACTIONS[pPlayer.faction].prefix : '';
            const rat = createUnit('plague_rat', pestilenceUnit.playerId, spawnX, spawnY, pPrefix, pPlayer.faction);
            rat.id = G.nextUnitId++;
            nextUnitId = G.nextUnitId;
            rat.movementLeft = 0;
            rat.hasAttacked = true;
            G.units.push(rat);
            addLog(`🐀 ${getDisplayName(pestilenceUnit)}'s Pestilence spawns a Plague Rat from the poisoned corpse!`);
          }
        }
      }
    }
    grantSoulBarricadeStacks(unit);
  }
}

// STR → +1 ATK per point
// AGI → +1 movement per 3 points; weight penalty = max(0, floor((weight-threshold)/2))
// CON → +2 max HP per point
// INT → +floor(INT/2) gather bonus per action
function getUnitStats(unit) {
  let totalStr = unit.str || 0;
  let totalAgi = unit.agi || 0;
  let totalCon = unit.con || 0;
  let totalInt = unit.int || 0;
  let equipAtk = 0;
  let equipDef = 0;
  let totalWeight = 0;
  let attackRange = 1;
  const actions = [];
  let noAttack = false;
  let mainhandItem = null;
  let itemMoveBonus = 0;

  for (const slot of getUnitEquipSlots(unit)) {
    const item = unit.equipment ? unit.equipment[slot] : null;
    if (!item || item === '_two_handed_') continue;
    totalStr += item.stats.str || 0;
    totalAgi += item.stats.agi || 0;
    totalCon += item.stats.con || 0;
    totalInt += item.stats.int || 0;
    equipAtk += item.stats.attack || 0;
    equipDef += item.stats.defense || 0;
    totalWeight += item.weight || 0;
    if (item.moveBonus) itemMoveBonus += item.moveBonus;
    if (item.range && item.range > attackRange) attackRange = item.range;
    if (item.action) actions.push(item.action);
    if (item.noAttack) noAttack = true;
    if (slot === 'mainhand') mainhandItem = item;
  }
  // Hero-level noAttack flag (e.g. Mortar Technician)
  if (unit.noAttack) noAttack = true;

  // Extended Reach: +1 range per stack for melee weapons only (no range property = melee)
  if (mainhandItem && !mainhandItem.range) {
    attackRange += countPassive(unit, 'extended_reach');
  }
  // Scope: +1 range per stack for bows, crossbows, and magic ranged weapons only
  if (mainhandItem && mainhandItem.range) {
    attackRange += countPassive(unit, 'scope_range');
  }

  // Bardic auras: check friendly bard units within 3 tiles
  let bardicAtkBonus = 0;
  let bardicDodgeBonus = 0;
  // Discordant aura: check enemy units with discordant_aura within 3 tiles
  let discordantDodgePenalty = 0;
  const allUnits = (G && G.units) ? G.units : [];
  for (const ally of allUnits) {
    if (ally.hp > 0 && ally.id !== unit.id && ally.playerId === unit.playerId &&
        chebyshevDist(unit.x, unit.y, ally.x, ally.y) <= 3) {
      if (hasPassive(ally, 'bardic_inspiration')) bardicAtkBonus += 2;
      if (hasPassive(ally, 'bardic_dance')) bardicDodgeBonus += 10;
      if (hasPassive(ally, 'bardic_range') && mainhandItem && mainhandItem.range) attackRange += 1;
      if (hasPassive(ally, 'bardic_wisdom')) totalInt += 1;
    }
  }
  for (const enemy of allUnits) {
    if (enemy.hp > 0 && enemy.id !== unit.id && enemy.playerId !== unit.playerId &&
        chebyshevDist(unit.x, unit.y, enemy.x, enemy.y) <= 3) {
      if (hasPassive(enemy, 'discordant_aura')) discordantDodgePenalty += 15;
    }
  }

  // Unarmored Fury: if unit has unarmored_fury passive and no armor in head/body/legs/feet/hands/offhand, gain bonuses
  let unarmoredAtkBonus = 0;
  let unarmoredMoveBonus = 0;
  let unarmoredZeroDef = false;
  if (getUnitPassives(unit).has('unarmored_fury')) {
    const armorSlots = ['head', 'body', 'legs', 'feet', 'hands', 'offhand'];
    const hasArmor = unit.equipment && armorSlots.some(s => unit.equipment[s] && unit.equipment[s] !== '_two_handed_');
    if (!hasArmor) {
      unarmoredAtkBonus = 5;
      unarmoredMoveBonus = 3;
      unarmoredZeroDef = true;
      totalStr += 3;
      totalAgi += 8;
      totalInt += 3;
      totalCon += 3;
    }
  }

  // Combat lock bonus from items
  let itemCombatLockBonus = 0;
  if (unit.equipment) {
    for (const slot of getUnitEquipSlots(unit)) {
      const item = unit.equipment[slot];
      if (item && item !== '_two_handed_') {
        if (item.combatLockBonus) itemCombatLockBonus += item.combatLockBonus;
      }
    }
  }
  const combatLockChance = 20 + itemCombatLockBonus;

  const seMods = getStatusEffectModifiers(unit);
  const attack = unit.attack + equipAtk + totalStr + (unit.rallyBonus || 0) + (unit.berserkBonus || 0) + (unit.battleCryBonus || 0) + bardicAtkBonus + unarmoredAtkBonus + seMods.atk;
  const intDefBonus = Math.floor(totalInt / 3); // Tactical awareness
  let defense = unarmoredZeroDef ? 0 : (unit.defense + equipDef + intDefBonus + (unit.stoneSkinBonus || 0) + (unit.divineShieldBonus || 0) - (unit.berserkPenalty || 0) + seMods.def);
  // Lumbering Oaf: DEF capped at 5, excess becomes HP; STR also grants bonus HP
  let lumberingOafHpBonus = 0;
  if (hasPassive(unit, 'lumbering_oaf')) {
    lumberingOafHpBonus += totalStr * 2; // STR grants HP
    if (defense > 5) {
      lumberingOafHpBonus += (defense - 5) * 2; // excess DEF converts to HP
      defense = 5;
    }
  }
  // Hunger / Satiation stacks: +5 max HP, +2 STR, -1 AGI per stack
  const satiationStacks = (hasPassive(unit, 'hunger') && unit.satiationStacks) ? unit.satiationStacks : 0;
  // Compute agiBonus BEFORE applying Satiation AGI penalty so it doesn't double-dip on movement
  const agiBonus = Math.floor(totalAgi / 3); // Improved scaling (was /5)
  if (satiationStacks > 0) {
    totalStr += satiationStacks * 2;
    totalAgi -= satiationStacks;
  }
  const maxHp = unit.maxHp + totalCon * 2 + (unit.tempHp || 0) + lumberingOafHpBonus + (satiationStacks * 5);
  const weightThreshold = 6 + Math.floor(totalStr / 2); // STR increases carry capacity (halved)
  const weightPenalty = hasPassive(unit, 'weightless') ? 0 : Math.max(0, Math.floor((totalWeight - weightThreshold) / 2));
  const severedLegs = unit.severedSlots && (unit.severedSlots.includes('legs') || unit.severedSlots.includes('feet'));
  let movement = (severedLegs || hasStatusEffect(unit, 'frozen') || hasStatusEffect(unit, 'ensnared') || hasStatusEffect(unit, 'combat_locked')) ? 0 : Math.max(2, unit.movement + agiBonus - weightPenalty + seMods.move + (countPassive(unit, 'haste') * 2) + (hasPassive(unit, 'mounted') ? 5 : 0) + unarmoredMoveBonus + itemMoveBonus);
  // Satiation reduces movement (can bring to 0)
  if (satiationStacks > 0 && movement > 0) {
    movement = Math.max(0, movement - satiationStacks);
  }
  const gatherBonus = Math.floor(totalInt / 2);

  // Dark Energy: +1 STR and +1 AGI per stack
  const darkEnergyEffect = unit.statusEffects ? unit.statusEffects.find(se => se.id === 'dark_energy') : null;
  const darkEnergyStacks = darkEnergyEffect ? (darkEnergyEffect.stacks || 1) : 0;
  if (darkEnergyStacks > 0) {
    totalStr += darkEnergyStacks;
    totalAgi += darkEnergyStacks;
  }

  // Jinx aura: reduce crit chance of this unit if enemies within 3 tiles have jinx
  let jinxPenalty = 0;
  for (const enemy of allUnits) {
    if (enemy.hp > 0 && enemy.id !== unit.id && enemy.playerId !== unit.playerId &&
        chebyshevDist(unit.x, unit.y, enemy.x, enemy.y) <= 3) {
      if (hasPassive(enemy, 'jinx')) jinxPenalty += 15;
    }
  }

  // Combat proc chances (percentage, 0-100)
  const dodgeChance = hasPassive(unit, 'lumbering_oaf') ? 0 : (hasStatusEffect(unit, 'greased') ? 100 : Math.max(0, Math.min(22, Math.floor(totalAgi * 0.6) + (countPassive(unit, 'evasion') * 3) + bardicDodgeBonus - discordantDodgePenalty))); // AGI × 0.6%, evasion stacks ×3%, cap 22%, greased = 100%, lumbering_oaf = always 0
  const critCap = hasPassive(unit, 'dark_purpose') ? 100 : 40;
  let critChance = Math.max(0, Math.min(critCap, totalInt * 5 + countPassive(unit, 'precision') * 5 - jinxPenalty)); // INT × 5% + precision stacks × 5% - jinx, cap 40% (100% with Dark Purpose)
  // Steady Bombardment: if unit hasn't moved, crit = cap
  if (hasPassive(unit, 'steady_bombardment') && unit.steadyBombardment) critChance = critCap;
  let crushBase = totalStr * 3;
  if (hasPassive(unit, 'foresight')) crushBase += totalInt * 2;
  crushBase += countPassive(unit, 'heavy_handed') * 10;
  const crushChance = Math.min(30, crushBase);       // STR × 3%, cap 30% — crushing blow

  return { str: totalStr, agi: totalAgi, con: totalCon, int: totalInt,
           attack, defense, maxHp, movement, weight: totalWeight, gatherBonus, attackRange, actions,
           dodgeChance, critChance, crushChance, combatLockChance, noAttack };
}

function itemStatString(item) {
  const parts = [];
  if (item.stats.attack) parts.push(`ATK+${item.stats.attack}`);
  if (item.stats.defense) parts.push(`DEF+${item.stats.defense}`);
  if (item.stats.str) parts.push(`STR+${item.stats.str}`);
  if (item.stats.agi) parts.push(`AGI+${item.stats.agi}`);
  if (item.stats.con) parts.push(`CON+${item.stats.con}`);
  if (item.stats.int) parts.push(`INT+${item.stats.int}`);
  if (item.enchantment && item.enchantment.stat) {
    const statNameMap = { attack: 'ATK', defense: 'DEF', str: 'STR', agi: 'AGI', con: 'CON', int: 'INT' };
    const label = statNameMap[item.enchantment.stat] || item.enchantment.stat.toUpperCase();
    parts.push(`<span style="color:#b388ff;">✧ +1 ${label}</span>`);
  }
  if (item.weight) parts.push(`W:${item.weight}`);
  if (item.range) parts.push(`R:${item.range}`);
  if (item.twoHanded) parts.push('2H');
  if (item.action) parts.push('★');
  if (item.onHit) {
    const eff = STATUS_EFFECTS[item.onHit.effect];
    if (eff) parts.push(`${eff.icon}${item.onHit.chance}%${item.onHit.stacks > 1 ? '×' + item.onHit.stacks : ''}`);
  }
  if (item.selfBuffOnHit) {
    const eff = STATUS_EFFECTS[item.selfBuffOnHit.effect];
    if (eff) parts.push(`self:${eff.icon}`);
  }

  if (item.passives) {
    for (const p of item.passives) {
      const pd = PASSIVES[p];
      if (pd) parts.push(`${pd.icon}`);
    }
  }
  if (item.enchanted) parts.push('✧');
  return parts.length ? parts.join(' ') : '';
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function showMenu() { showScreen('menu-screen'); }
function showSetup() {
  showScreen('setup-screen');
  updatePlayerSetup();
}

function updatePlayerSetup() {
  const n = parseInt(document.getElementById('num-players').value);
  const container = document.getElementById('player-setups');
  container.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const div = document.createElement('div');
    div.className = 'player-setup';
    div.style.borderLeftColor = PLAYER_COLORS[i];
    div.innerHTML = `
      <div class="setup-row">
        <label style="color:${PLAYER_COLORS[i]}">Player ${i + 1} Name:</label>
        <input type="text" id="pname-${i}" value="Player ${i + 1}" style="width:120px;">
      </div>`;
    container.appendChild(div);
  }
}

// ============================================================
// GAME INITIALIZATION
// ============================================================
function startNewGame() {
  const boardSize = parseInt(document.getElementById('board-size').value);
  const numPlayers = parseInt(document.getElementById('num-players').value);

  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      id: i,
      name: document.getElementById(`pname-${i}`).value || `Player ${i + 1}`,
      faction: null,
      heroChoice: null,
      resources: { wood: 0, stone: 0, gold: 0, water: 0, wall: 0 },
      alive: true
    });
  }

  const board = generateBoard(boardSize, numPlayers);

  nextUnitId = 0;
  const units = [];
  const startPositions = getStartPositions(numPlayers, boardSize);

  // Clear terrain around each start position so players spawn on open ground
  for (let i = 0; i < numPlayers; i++) {
    const pos = startPositions[i];
    const spawnCells = [
      { x: pos.hx, y: pos.hy },
      { x: pos.w1x, y: pos.w1y },
      { x: pos.w2x, y: pos.w2y },
      { x: pos.w3x, y: pos.w3y },
      { x: pos.wx, y: pos.wy }
    ];
    for (const sc of spawnCells) {
      board[sc.y][sc.x] = null;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = sc.x + dx, ny = sc.y + dy;
          if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
            board[ny][nx] = null;
          }
        }
      }
    }
  }

  // Spawn Ancient Dragon boss inside the largest contiguous resource chunk on the map
  // Flood-fill to find all contiguous blobs of each resource type
  const visited = Array.from({ length: boardSize }, () => new Array(boardSize).fill(false));
  const blobs = []; // { type, cells: [{x,y}] }
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      if (visited[y][x] || !board[y][x]) continue;
      const cellType = board[y][x].type;
      const blob = [];
      const stack = [{ x, y }];
      while (stack.length > 0) {
        const { x: cx, y: cy } = stack.pop();
        if (cx < 0 || cx >= boardSize || cy < 0 || cy >= boardSize) continue;
        if (visited[cy][cx]) continue;
        if (!board[cy][cx] || board[cy][cx].type !== cellType) continue;
        visited[cy][cx] = true;
        blob.push({ x: cx, y: cy });
        stack.push({ x: cx - 1, y: cy }, { x: cx + 1, y: cy }, { x: cx, y: cy - 1 }, { x: cx, y: cy + 1 });
      }
      if (blob.length >= 9) blobs.push({ type: cellType, cells: blob }); // only consider blobs with at least 9 tiles
    }
  }

  // Pick the largest blob that's far enough from start positions
  blobs.sort((a, b) => b.cells.length - a.cells.length);
  let dragonX = Math.floor(boardSize / 2), dragonY = Math.floor(boardSize / 2);
  let dragonBlobType = 'stone'; // fallback
  let foundBlob = false;
  for (const blob of blobs) {
    // Compute the centroid of this blob
    const avgX = Math.round(blob.cells.reduce((s, c) => s + c.x, 0) / blob.cells.length);
    const avgY = Math.round(blob.cells.reduce((s, c) => s + c.y, 0) / blob.cells.length);
    // Ensure it's not too close to any start position
    if (startPositions.some(pos => chebyshevDist(pos.hx, pos.hy, avgX, avgY) < 6)) continue;
    dragonX = avgX;
    dragonY = avgY;
    dragonBlobType = blob.type;
    foundBlob = true;
    break;
  }

  // Clear the center tile for the dragon; reinforce surrounding tiles with the blob's resource
  board[dragonY][dragonX] = null;
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      if (dx === 0 && dy === 0) continue;
      const sx = dragonX + dx, sy = dragonY + dy;
      if (sx < 0 || sx >= boardSize || sy < 0 || sy >= boardSize) continue;
      // Fill surrounding ring with the blob resource type so players must dig/gather through
      board[sy][sx] = { type: dragonBlobType, amount: 4 + Math.floor(Math.random() * 3) };
    }
  }

  const dragon = createUnit('ancient_dragon', NPC_PLAYER_ID, dragonX, dragonY, '');
  // Boss carries 3 high-value items and always has a consumable
  for (let i = 0; i < 3; i++) {
    const lootId = BOSS_LOOT[Math.floor(Math.random() * BOSS_LOOT.length)];
    dragon.inventory.push(JSON.parse(JSON.stringify(ITEMS[lootId])));
  }
  const dragonConsumable = NPC_CONSUMABLES[Math.floor(Math.random() * NPC_CONSUMABLES.length)];
  dragon.inventory.push(JSON.parse(JSON.stringify(CONSUMABLES[dragonConsumable])));
  units.push(dragon);

  // Spawn NPC enemies of varying difficulty (keep them away from start positions)
  const numNpcs = Math.max(3, Math.floor(boardSize * boardSize / 80));
  for (let attempt = 0, placed = 0; attempt < numNpcs * 20 && placed < numNpcs; attempt++) {
    const nx = Math.floor(Math.random() * boardSize);
    const ny = Math.floor(Math.random() * boardSize);
    if (board[ny][nx]) continue;
    if (units.some(u => u.x === nx && u.y === ny)) continue;
    // Keep NPCs away from all start positions
    if (startPositions.some(pos => chebyshevDist(pos.hx, pos.hy, nx, ny) < 5)) continue;
    if (units.some(u => chebyshevDist(u.x, u.y, nx, ny) < 3)) continue;
    const npcType = pickWeightedNpcType();
    const cfg = NPC_SPAWN_CONFIG[npcType];
    const npcUnit = createUnit(npcType, NPC_PLAYER_ID, nx, ny, '');
    giveNpcLoot(npcUnit, cfg.lootPool, cfg.maxItems, cfg.consumableChance);
    units.push(npcUnit);
    placed++;
  }

  // Scatter loot items on the map
  const groundItems = [];
  let numScattered = Math.max(3, Math.floor(boardSize * boardSize / 110));
  if (boardSize > 24) numScattered += Math.floor((boardSize - 24) / 8) * 4;
  for (let attempt = 0, placed = 0; attempt < numScattered * 40 && placed < numScattered; attempt++) {
    const ix = Math.floor(Math.random() * boardSize);
    const iy = Math.floor(Math.random() * boardSize);
    if (board[iy][ix]) continue;
    if (units.some(u => u.x === ix && u.y === iy)) continue;
    if (units.some(u => chebyshevDist(u.x, u.y, ix, iy) < 3)) continue;
    if (groundItems.some(gi => chebyshevDist(gi.x, gi.y, ix, iy) < 4)) continue;
    const lootId = LOOT_ITEMS[Math.floor(Math.random() * LOOT_ITEMS.length)];
    groundItems.push({ x: ix, y: iy, item: JSON.parse(JSON.stringify(ITEMS[lootId])) });
    placed++;
  }

  // Scatter ground consumables (resource packs)
  const numGroundConsumables = Math.max(2, Math.floor(boardSize * boardSize / 200));
  for (let attempt = 0, placed = 0; attempt < numGroundConsumables * 20 && placed < numGroundConsumables; attempt++) {
    const ix = Math.floor(Math.random() * boardSize);
    const iy = Math.floor(Math.random() * boardSize);
    if (board[iy][ix]) continue;
    if (units.some(u => u.x === ix && u.y === iy)) continue;
    if (units.some(u => chebyshevDist(u.x, u.y, ix, iy) < 3)) continue;
    const cId = GROUND_CONSUMABLES[Math.floor(Math.random() * GROUND_CONSUMABLES.length)];
    groundItems.push({ x: ix, y: iy, item: JSON.parse(JSON.stringify(CONSUMABLES[cId])) });
    placed++;
  }

  // Determine number of shops and vendors based on map size
  const numShops = boardSize >= 64 ? 3 : boardSize >= 32 ? 2 : 1;
  const numVendors = boardSize >= 64 ? 3 : boardSize >= 32 ? 2 : 1;

  // Spawn shops
  const allPlaced = []; // track all placed shop/vendor positions
  const shopPositions = spawnShops(numShops, boardSize, startPositions, units, board);
  const shops = shopPositions.map(pos => {
    allPlaced.push(pos);
    return { x: pos.x, y: pos.y, items: [], lastRestock: 0 };
  });

  // Spawn vendors near water
  const vendors = [];
  for (let i = 0; i < numVendors; i++) {
    const pos = spawnVendor(boardSize, startPositions, units, board, allPlaced);
    vendors.push({ x: pos.x, y: pos.y, items: [], lastRestock: 0 });
    allPlaced.push(pos);
  }

  G = {
    version: 2,
    boardSize: boardSize,
    currentPlayer: 0,
    turn: 1,
    players: players,
    units: units,
    board: board,
    startPositions: startPositions,
    groundItems: groundItems,
    shops: shops,
    vendors: vendors,
    bazaars: [],
    structures: [],
    log: ['Game started!'],
    chatMessages: [],
    combatEffects: [],
    traps: [],
    tunnels: [],
    nextUnitId: nextUnitId
  };

  // Stock shops with initial items
  for (const shop of G.shops) {
    restockShop(shop);
    addLog(`$ A mysterious shop has appeared at (${shop.x}, ${shop.y})!`);
  }

  // Stock vendors
  for (const vendor of G.vendors) {
    restockVendor(vendor);
    addLog(`☂ A Refreshments Vendor has set up near the water at (${vendor.x}, ${vendor.y})!`);
  }

  selectedUnitId = null;
  selectedShop = null;
  selectedVendor = null;
  selectedStructure = null;
  selectedBarrel = null;
  interactionMode = 'idle';
  lastRenderedHpByUnitId = new Map();
  showScreen('game-screen');
  renderAll();

  // Player 0 needs to pick faction first
  showFactionPick();
}

function createUnit(type, playerId, x, y, factionPrefix, factionId, heroChoice) {
  const def = UNIT_DEFS[type];
  const faction = factionId ? FACTIONS[factionId] : null;
  let overrides = (faction && faction.unitOverrides && faction.unitOverrides[type]) || {};

  // Hero variant: get stats/equipment from the chosen hero definition
  let heroData = null;
  if (type === 'hero' && faction && faction.heroes) {
    heroData = heroChoice ? faction.heroes[heroChoice] : null;
    if (!heroData) {
      // fallback to first hero
      heroData = Object.values(faction.heroes)[0];
      heroChoice = Object.keys(faction.heroes)[0];
    }
    overrides = heroData;
  }

  const equipSource = overrides.startingEquipment || def.startingEquipment;

  const equipment = {};
  for (const slot of EQUIP_SLOTS) {
    const itemId = equipSource ? equipSource[slot] : null;
    if (itemId === '_two_handed_') {
      equipment[slot] = '_two_handed_';
    } else {
      equipment[slot] = itemId ? JSON.parse(JSON.stringify(ITEMS[itemId])) : null;
    }
  }
  // Initialize extra slots for heroes with extraSlots (e.g. Magnate)
  if (heroData && heroData.extraSlots) {
    for (const [baseSlot, count] of Object.entries(heroData.extraSlots)) {
      for (let i = 2; i <= count + 1; i++) {
        equipment[baseSlot + i] = null;
      }
    }
  }

  const overrideName = overrides.name;
  const unitName = heroData ? heroData.name : (factionPrefix ? `${factionPrefix} ${overrideName || def.name}` : (overrideName || def.name));
  const typeLabel = heroData ? (factionPrefix ? `${factionPrefix} ${heroData.name}` : heroData.name) : (factionPrefix ? `${factionPrefix} ${overrideName || capitalize(type)}` : (overrideName || capitalize(type)));

  const unit = {
    id: nextUnitId++,
    playerId: playerId,
    type: type,
    faction: factionId || null,
    heroChoice: heroChoice || null,
    name: unitName,
    customName: null,
    typeLabel: typeLabel,
    x: x, y: y,
    hp: overrides.hp || def.hp, maxHp: overrides.hp || def.hp,
    movement: overrides.movement !== undefined ? overrides.movement : def.movement,
    attack: overrides.attack !== undefined ? overrides.attack : def.attack,
    defense: overrides.defense !== undefined ? overrides.defense : def.defense,
    str: overrides.str !== undefined ? overrides.str : (def.str || 0),
    agi: overrides.agi !== undefined ? overrides.agi : (def.agi || 0),
    con: overrides.con !== undefined ? overrides.con : (def.con || 0),
    int: overrides.int !== undefined ? overrides.int : (def.int || 0),
    canGather: def.canGather, canFight: def.canFight,
    hasAttacked: false,
    hasGathered: false,
    wallPlacementsLeft: def.canGather ? WALL_PLACEMENTS_PER_TURN : 0,
    hasPlacedWallThisTurn: false,
    hasUsedItemAction: false,
    specialActionsUsed: [],
    rallyBonus: 0,
    stoneSkinBonus: 0,
    divineShieldBonus: 0,
    berserkBonus: 0,
    berserkPenalty: 0,
    berserkTurns: 0,
    battleCryBonus: 0,
    battleCryTurns: 0,
    trollBlessingTurns: 0,
    soulBarricadeStacks: 0,
    satiationStacks: 0,
    staticCharges: 0,
    lastMinedResourceType: null,
    regenPotionTurns: 0,
    combatRegenTurns: 0,
    consecrateTurns: 0,
    stunned: false,
    cooldowns: {},
    statusEffects: [],
    passives: [...(overrides.passives || def.passives || [])],
    inventory: [],
    equipment: equipment
  };

  if (unit.type === 'hero' && unit.heroChoice === 'amorphous_blob') {
    unit.morphPointBudget = AMORPHOUS_BLOB_MORPH_POINTS;
  }

  // Set HP and movementLeft from computed stats
  const stats = getUnitStats(unit);
  unit.hp = stats.maxHp;
  unit.movementLeft = stats.movement;
  return unit;
}

// ============================================================
// BOARD GENERATION
// ============================================================
function generateBoard(size, numPlayers) {
  const board = [];
  for (let y = 0; y < size; y++) {
    board[y] = [];
    for (let x = 0; x < size; x++) {
      board[y][x] = null;
    }
  }

  const moisture = makeNoiseMap(size);
  const elevation = makeNoiseMap(size);

  // Water
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (moisture[y][x] > 0.52 && elevation[y][x] < 0.48) {
        board[y][x] = { type: 'water', amount: 3 + Math.floor(Math.random() * 4) };
      }
    }
  }

  // Stone
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!board[y][x] && elevation[y][x] > 0.50) {
        board[y][x] = { type: 'stone', amount: 3 + Math.floor(Math.random() * 3) };
      }
    }
  }

  // Gold veins in stone
  const stoneTiles = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (board[y][x] && board[y][x].type === 'stone') stoneTiles.push({ x, y });
    }
  }
  for (const st of stoneTiles) {
    if (Math.random() < 0.24) {
      board[st.y][st.x] = { type: 'gold', amount: 2 + Math.floor(Math.random() * 3) };
    }
  }
  const goldSeeds = Math.max(3, Math.floor(stoneTiles.length * 0.10));
  for (let i = 0; i < goldSeeds; i++) {
    if (stoneTiles.length === 0) break;
    const origin = stoneTiles[Math.floor(Math.random() * stoneTiles.length)];
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    for (const [dx, dy] of dirs) {
      const nx = origin.x + dx, ny = origin.y + dy;
      if (nx >= 0 && nx < size && ny >= 0 && ny < size && !board[ny][nx] && Math.random() < 0.5) {
        board[ny][nx] = { type: 'gold', amount: 2 + Math.floor(Math.random() * 2) };
      }
    }
  }

  // Wood forests
  const numForests = Math.floor(size * size / 25);
  for (let i = 0; i < numForests; i++) {
    const cx = Math.floor(Math.random() * size);
    const cy = Math.floor(Math.random() * size);
    if (board[cy][cx]) continue;
    if (moisture[cy][cx] > 0.7 && elevation[cy][cx] < 0.35) continue;
    if (elevation[cy][cx] > 0.6) continue;
    const clusterSize = 4 + Math.floor(Math.random() * 8);
    growCluster(board, size, cx, cy, 'wood', clusterSize);
  }

  // Scatter trees
  const scatterTrees = Math.floor(size * size * 0.06);
  for (let i = 0; i < scatterTrees; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    if (!board[y][x] && moisture[y][x] > 0.3 && elevation[y][x] < 0.55) {
      board[y][x] = { type: 'wood', amount: 2 + Math.floor(Math.random() * 3) };
    }
  }

  return board;
}

function makeNoiseMap(size) {
  const map = [];
  for (let y = 0; y < size; y++) {
    map[y] = [];
    for (let x = 0; x < size; x++) map[y][x] = 0;
  }
  const numBlobs = Math.floor(size * 1.5);
  for (let i = 0; i < numBlobs; i++) {
    const bx = Math.random() * size;
    const by = Math.random() * size;
    const radius = size * (0.08 + Math.random() * 0.18);
    const intensity = 0.3 + Math.random() * 0.7;
    for (let y = Math.max(0, Math.floor(by - radius)); y < Math.min(size, Math.ceil(by + radius)); y++) {
      for (let x = Math.max(0, Math.floor(bx - radius)); x < Math.min(size, Math.ceil(bx + radius)); x++) {
        const dist = Math.sqrt((x - bx) ** 2 + (y - by) ** 2);
        if (dist < radius) {
          const t = 1 - (dist / radius);
          map[y][x] += intensity * t * t;
        }
      }
    }
  }
  let min = Infinity, max = -Infinity;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if (map[y][x] < min) min = map[y][x];
    if (map[y][x] > max) max = map[y][x];
  }
  const range = max - min || 1;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    map[y][x] = (map[y][x] - min) / range;
  }
  return map;
}

function growCluster(board, size, startX, startY, type, count) {
  let placed = 0;
  let x = startX, y = startY;
  const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
  for (let attempts = 0; attempts < count * 4 && placed < count; attempts++) {
    if (x >= 0 && x < size && y >= 0 && y < size && !board[y][x]) {
      board[y][x] = { type: type, amount: 2 + Math.floor(Math.random() * 4) };
      placed++;
    }
    const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
    x = Math.max(0, Math.min(size - 1, x + dx));
    y = Math.max(0, Math.min(size - 1, y + dy));
  }
}

function getStartPositions(numPlayers, size) {
  const margin = 1;
  const far = size - 2;
  const corners = [
    { hx: margin, hy: margin, w1x: margin + 1, w1y: margin, w2x: margin, w2y: margin + 1, w3x: margin + 1, w3y: margin + 1, wx: margin + 2, wy: margin },
    { hx: far, hy: margin, w1x: far - 1, w1y: margin, w2x: far, w2y: margin + 1, w3x: far - 1, w3y: margin + 1, wx: far - 2, wy: margin },
    { hx: margin, hy: far, w1x: margin + 1, w1y: far, w2x: margin, w2y: far - 1, w3x: margin + 1, w3y: far - 1, wx: margin + 2, wy: far },
    { hx: far, hy: far, w1x: far - 1, w1y: far, w2x: far, w2y: far - 1, w3x: far - 1, w3y: far - 1, wx: far - 2, wy: far }
  ];
  if (numPlayers === 2) return [corners[0], corners[3]];
  if (numPlayers === 3) return [corners[0], corners[1], corners[2]];
  return corners.slice(0, numPlayers);
}

// ============================================================
// SHOP
// ============================================================
function restockShop(shop) {
  if (!shop && G.shops) { G.shops.forEach(s => restockShop(s)); return; }
  if (!shop) return;
  const items = [];
  const pool = [...LOOT_ITEMS];
  for (let i = 0; i < 20 && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const itemId = pool.splice(idx, 1)[0];
    const item = JSON.parse(JSON.stringify(ITEMS[itemId]));
    items.push(item);
  }
  shop.items = items;
  shop.lastRestock = G.turn;
}

function isValidShopTile(x, y, boardSize, board, units, takenPositions) {
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return false;
  if (board && board[y] && board[y][x]) return false; // avoid resource tiles
  if (units.some(u => u.x === x && u.y === y)) return false;
  if (takenPositions.some(p => p.x === x && p.y === y)) return false;
  return true;
}

function spawnShops(numShops, boardSize, startPositions, units, board, excludePositions = []) {
  const placed = [...excludePositions];
  const results = [];

  // --- Shop 1: center of the map ---
  const cx = Math.floor(boardSize / 2);
  const cy = Math.floor(boardSize / 2);
  let shop1 = { x: cx, y: cy };
  // Search outward from center for nearest valid empty tile
  let found = false;
  for (let r = 0; r < Math.floor(boardSize / 2) && !found; r++) {
    for (let dy = -r; dy <= r && !found; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (r > 0 && Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
        const sx = cx + dx, sy = cy + dy;
        if (isValidShopTile(sx, sy, boardSize, board, units, placed)) {
          shop1 = { x: sx, y: sy };
          found = true;
          break;
        }
      }
    }
  }
  results.push(shop1);
  placed.push(shop1);

  // --- Shop 2: random spot far from shop 1 and players ---
  if (numShops >= 2) {
    const candidates = [];
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        if (!isValidShopTile(x, y, boardSize, board, units, placed)) continue;
        let minDist = Infinity;
        for (const p of placed) minDist = Math.min(minDist, chebyshevDist(x, y, p.x, p.y));
        for (const pos of startPositions) minDist = Math.min(minDist, chebyshevDist(x, y, pos.hx, pos.hy));
        candidates.push({ x, y, dist: minDist });
      }
    }
    candidates.sort((a, b) => b.dist - a.dist);
    // Pick randomly from the top 20% farthest candidates
    const topN = Math.max(1, Math.floor(candidates.length * 0.2));
    const pick = candidates[Math.floor(Math.random() * topN)];
    const shop2 = pick || { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    results.push(shop2);
    placed.push(shop2);
  }

  // --- Shop 3: random spot far from shops 1 & 2 and players ---
  if (numShops >= 3) {
    const candidates = [];
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        if (!isValidShopTile(x, y, boardSize, board, units, placed)) continue;
        let minDist = Infinity;
        for (const p of placed) minDist = Math.min(minDist, chebyshevDist(x, y, p.x, p.y));
        for (const pos of startPositions) minDist = Math.min(minDist, chebyshevDist(x, y, pos.hx, pos.hy));
        candidates.push({ x, y, dist: minDist });
      }
    }
    candidates.sort((a, b) => b.dist - a.dist);
    const topN = Math.max(1, Math.floor(candidates.length * 0.2));
    const pick = candidates[Math.floor(Math.random() * topN)];
    const shop3 = pick || { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    results.push(shop3);
    placed.push(shop3);
  }

  return results;
}

function purchaseShopItem(unitId, shopIdx, shopItemIndex) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const shop = G.shops && G.shops[shopIdx];
  if (!shop || !shop.items[shopItemIndex]) return;
  if (!isAdjacent(u.x, u.y, shop.x, shop.y) && !(u.x === shop.x && u.y === shop.y)) return;
  const item = shop.items[shopItemIndex];
  const cost = item.shopCost || 5;
  const pRes = G.players[G.currentPlayer].resources;
  if (pRes.water < cost) {
    addLog(`Not enough water! ${item.name} costs ${cost} 💧.`);
    renderAll();
    return;
  }
  pRes.water -= cost;
  u.inventory.push(JSON.parse(JSON.stringify(item)));
  shop.items.splice(shopItemIndex, 1);
  addLog(`$ ${getDisplayName(u)} purchased ${item.name} for ${cost} 💧!`);
  renderAll();
}

// ============================================================
// FORGE CRAFTING
// ============================================================
function forgeItem(unitId, structIdx, itemId) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const struct = G.structures && G.structures[structIdx];
  if (!struct || struct.type !== 'forge' || struct.playerId !== G.currentPlayer) return;
  if (struct.forgeUsedThisTurn) {
    addLog(`⚒ This forge has already crafted an item this turn.`);
    renderAll();
    return;
  }
  if (!isAdjacent(u.x, u.y, struct.x, struct.y) && !(u.x === struct.x && u.y === struct.y)) return;
  const itemDef = ITEMS[itemId];
  if (!itemDef) return;
  const forgeFaction = G.players[G.currentPlayer].faction;
  const forgeItemIds = getForgeItemsForFaction(forgeFaction);
  if (!forgeItemIds.includes(itemId)) return;
  u.inventory.push(JSON.parse(JSON.stringify(itemDef)));
  struct.forgeUsedThisTurn = true;
  const forgeName = (STRUCTURE_DEFS.forge.factionNames && STRUCTURE_DEFS.forge.factionNames[forgeFaction]) || 'Forge';
  addLog(`⚒ ${getDisplayName(u)} crafted ${itemDef.name} at the ${forgeName}!`);
  renderAll();
}

function forgeAdvancedItem(unitId, structIdx, itemId) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const struct = G.structures && G.structures[structIdx];
  if (!struct || struct.type !== 'advanced_forge' || struct.playerId !== G.currentPlayer) return;
  if (!isAdjacent(u.x, u.y, struct.x, struct.y) && !(u.x === struct.x && u.y === struct.y)) return;

  const entry = ADVANCED_FORGE_ITEMS.find(e => e.id === itemId);
  const itemDef = ITEMS[itemId];
  if (!entry || !itemDef) return;

  const pRes = G.players[G.currentPlayer].resources;
  const waterCost = entry.waterCost || 0;
  if ((pRes.water || 0) < waterCost) {
    addLog(`Not enough water! ${itemDef.name} costs ${waterCost} 💧 at the Advanced Forge.`);
    renderAll();
    return;
  }

  pRes.water -= waterCost;
  u.inventory.push(JSON.parse(JSON.stringify(itemDef)));
  addLog(`▩ ${getDisplayName(u)} crafted ${itemDef.name} at the Advanced Forge for ${waterCost} 💧!`);
  renderAll();
}

function armoryUpgradeArmor(unitId, structIdx) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const struct = G.structures && G.structures[structIdx];
  if (!struct || struct.type !== 'armory' || struct.playerId !== G.currentPlayer) return;
  if (!isAdjacent(u.x, u.y, struct.x, struct.y) && !(u.x === struct.x && u.y === struct.y)) return;

  const currentTier = getUnitArmorTier(u);
  if (currentTier >= 4) {
    addLog(`🛡 ${getDisplayName(u)} is already at the maximum armor proficiency tier.`);
    renderAll();
    return;
  }

  const pRes = G.players[G.currentPlayer].resources;
  const waterCost = 10 + ((u.armorProficiencyBonus || 0) * 4);
  if ((pRes.water || 0) < waterCost) {
    addLog(`Not enough water! Armor training costs ${waterCost} 💧 at the Armory.`);
    renderAll();
    return;
  }

  pRes.water -= waterCost;
  u.armorProficiencyBonus = (u.armorProficiencyBonus || 0) + 1;
  addLog(`🛡 ${getDisplayName(u)} had their armor proficiency raised to tier ${getUnitArmorTier(u)} at the Armory for ${waterCost} 💧!`);
  renderAll();
}

function enchantItemStat(unitId, structIdx, itemRef, stat) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const struct = G.structures && G.structures[structIdx];
  if (!struct || struct.type !== 'enchanter' || struct.playerId !== G.currentPlayer) return;
  if (!isAdjacent(u.x, u.y, struct.x, struct.y) && !(u.x === struct.x && u.y === struct.y)) return;

  let item = null;
  if (itemRef && typeof itemRef === 'string') {
    const [kind, value] = itemRef.split(':');
    if (kind === 'equip' && u.equipment) item = u.equipment[value];
    if (kind === 'inv' && u.inventory) item = u.inventory[Number(value)];
  } else if (itemRef && itemRef.item) {
    item = itemRef.item;
  }
  if (!item || item.enchanted || !item.stats) return;
  if (!item.weaponType && !item.armorType) return;

  const pRes = G.players[G.currentPlayer].resources;
  const waterCost = 20;
  if ((pRes.water || 0) < waterCost) {
    addLog(`Not enough water! Enchanting costs ${waterCost} 💧 at the Enchanter.`);
    renderAll();
    return;
  }

  if (!item.stats) item.stats = {};
  item.stats[stat] = (item.stats[stat] || 0) + 1;
  item.enchanted = true;
  item.enchantment = { stat };
  pRes.water -= waterCost;
  addLog(`✧ ${getDisplayName(u)} enchanted ${item.name} with +1 ${stat.toUpperCase()} for ${waterCost} 💧!`);
  renderAll();
}

// ============================================================
// REFRESHMENTS VENDOR
// ============================================================
function spawnVendor(boardSize, startPositions, units, board, excludePositions = []) {
  // Find the biggest cluster of water tiles
  const visited = Array.from({ length: boardSize }, () => new Array(boardSize).fill(false));
  const clusters = [];
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      if (visited[y][x] || !board[y][x] || board[y][x].type !== 'water') continue;
      // BFS to find connected water cluster
      const queue = [{ x, y }];
      const tiles = [];
      visited[y][x] = true;
      while (queue.length > 0) {
        const cur = queue.shift();
        tiles.push(cur);
        for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
          const nx = cur.x + dx, ny = cur.y + dy;
          if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && !visited[ny][nx] && board[ny][nx] && board[ny][nx].type === 'water') {
            visited[ny][nx] = true;
            queue.push({ x: nx, y: ny });
          }
        }
      }
      clusters.push(tiles);
    }
  }
  // Sort clusters by size descending, pick the largest
  clusters.sort((a, b) => b.length - a.length);

  // Find empty tiles adjacent to the biggest water cluster, far from players
  let bestX = Math.floor(boardSize / 2), bestY = Math.floor(boardSize / 2);
  let bestDist = -1;
  const searchClusters = clusters.length > 0 ? [clusters[0]] : [];
  // Also consider 2nd largest if available
  if (clusters.length > 1 && clusters[1].length >= 3) searchClusters.push(clusters[1]);

  for (const cluster of searchClusters) {
    // Find all empty tiles adjacent to any tile in this cluster
    const adjacent = new Set();
    for (const tile of cluster) {
      for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
        const nx = tile.x + dx, ny = tile.y + dy;
        if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && !board[ny][nx]) {
          const key = `${nx},${ny}`;
          if (!adjacent.has(key) && !units.some(u => u.x === nx && u.y === ny) && !excludePositions.some(p => p.x === nx && p.y === ny)) {
            adjacent.add(key);
          }
        }
      }
    }
    for (const key of adjacent) {
      const [sx, sy] = key.split(',').map(Number);
      let minPlayerDist = Infinity;
      for (const pos of startPositions) {
        minPlayerDist = Math.min(minPlayerDist, chebyshevDist(sx, sy, pos.hx, pos.hy));
      }
      let minExclDist = Infinity;
      for (const ep of excludePositions) {
        minExclDist = Math.min(minExclDist, chebyshevDist(sx, sy, ep.x, ep.y));
      }
      const combinedDist = excludePositions.length > 0 ? Math.min(minPlayerDist, minExclDist) : minPlayerDist;
      if (combinedDist > bestDist) {
        bestDist = combinedDist;
        bestX = sx;
        bestY = sy;
      }
    }
  }

  // Fallback: if no water clusters, just pick a spot away from players
  if (bestDist <= 0) {
    for (let r = 0; r < boardSize; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const sx = Math.floor(boardSize / 2) + dx, sy = Math.floor(boardSize / 2) + dy;
          if (sx < 0 || sx >= boardSize || sy < 0 || sy >= boardSize) continue;
          if (board[sy][sx]) continue;
          if (units.some(u => u.x === sx && u.y === sy)) continue;
          if (excludePositions.some(p => p.x === sx && p.y === sy)) continue;
          let minPlayerDist = Infinity;
          for (const pos of startPositions) minPlayerDist = Math.min(minPlayerDist, chebyshevDist(sx, sy, pos.hx, pos.hy));
          let minExclDist = Infinity;
          for (const ep of excludePositions) minExclDist = Math.min(minExclDist, chebyshevDist(sx, sy, ep.x, ep.y));
          const combinedDist = excludePositions.length > 0 ? Math.min(minPlayerDist, minExclDist) : minPlayerDist;
          if (combinedDist > bestDist) { bestDist = combinedDist; bestX = sx; bestY = sy; }
        }
      }
    }
  }
  return { x: bestX, y: bestY };
}

function restockVendor(vendor) {
  if (!vendor && G.vendors) { G.vendors.forEach(v => restockVendor(v)); return; }
  if (!vendor) return;
  const items = [];
  const pool = [...VENDOR_CONSUMABLES];
  for (let i = 0; i < 5 && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const cId = pool[idx]; // don't splice — allow duplicates
    items.push(JSON.parse(JSON.stringify(CONSUMABLES[cId])));
  }
  vendor.items = items;
  vendor.lastRestock = G.turn;
}

function purchaseVendorItem(unitId, vendorIdx, vendorItemIndex) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const vendor = G.vendors && G.vendors[vendorIdx];
  if (!vendor || !vendor.items[vendorItemIndex]) return;
  if (!isAdjacent(u.x, u.y, vendor.x, vendor.y) && !(u.x === vendor.x && u.y === vendor.y)) return;
  const item = vendor.items[vendorItemIndex];
  const cost = item.shopCost || 3;
  const pRes = G.players[G.currentPlayer].resources;
  if (pRes.water < cost) {
    addLog(`Not enough water! ${item.name} costs ${cost} 💧.`);
    renderAll();
    return;
  }
  pRes.water -= cost;
  u.inventory.push(JSON.parse(JSON.stringify(item)));
  vendor.items.splice(vendorItemIndex, 1);
  addLog(`V ${getDisplayName(u)} purchased ${item.name} for ${cost} 💧!`);
  renderAll();
}

// ============================================================
// BAZAAR
// ============================================================
function spawnBazaar() {
  if (!G || !G.bazaars) G.bazaars = [];
  if (G.bazaars.length > 0) return; // only 1 bazaar ever
  const boardSize = G.boardSize;
  const allPlaced = [
    ...(G.shops || []).map(s => ({ x: s.x, y: s.y })),
    ...(G.vendors || []).map(v => ({ x: v.x, y: v.y })),
  ];
  const candidates = [];
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      if (!isValidShopTile(x, y, boardSize, G.board, G.units, allPlaced)) continue;
      let minDist = Infinity;
      for (const pos of G.startPositions) minDist = Math.min(minDist, chebyshevDist(x, y, pos.hx, pos.hy));
      for (const p of allPlaced) minDist = Math.min(minDist, chebyshevDist(x, y, p.x, p.y));
      candidates.push({ x, y, dist: minDist });
    }
  }
  candidates.sort((a, b) => b.dist - a.dist);
  const topN = Math.max(1, Math.floor(candidates.length * 0.2));
  const pick = candidates[Math.floor(Math.random() * topN)];
  const pos = pick || { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };
  G.bazaars.push({ x: pos.x, y: pos.y });
  addLog(`${BAZAAR_CHAR} A Bazaar has opened for trade at (${pos.x}, ${pos.y})!`);
}

function purchaseBazaarWater(bazaarIdx, resType) {
  const bazaar = G.bazaars && G.bazaars[bazaarIdx];
  if (!bazaar) return;
  const adjacentUnit = G.units.find(u =>
    u.hp > 0 && u.playerId === G.currentPlayer &&
    (isAdjacent(u.x, u.y, bazaar.x, bazaar.y) || (u.x === bazaar.x && u.y === bazaar.y))
  );
  if (!adjacentUnit) return;
  const pRes = G.players[G.currentPlayer].resources;
  if (pRes.water < 1) {
    addLog(`Not enough water! Trading costs 1 💧.`);
    renderAll();
    return;
  }
  pRes.water -= 1;
  pRes[resType] += 2;
  const icons = { wood: '🪵', stone: '🪨', gold: '🥇' };
  addLog(`${BAZAAR_CHAR} ${getDisplayName(adjacentUnit)} traded 1 💧 for 2 ${icons[resType]} ${resType} at the Bazaar!`);
  renderAll();
}

function purchaseBazaarExchange(bazaarIdx, fromRes, toRes) {
  const bazaar = G.bazaars && G.bazaars[bazaarIdx];
  if (!bazaar) return;
  const adjacentUnit = G.units.find(u =>
    u.hp > 0 && u.playerId === G.currentPlayer &&
    (isAdjacent(u.x, u.y, bazaar.x, bazaar.y) || (u.x === bazaar.x && u.y === bazaar.y))
  );
  if (!adjacentUnit) return;
  const pRes = G.players[G.currentPlayer].resources;
  if (pRes[fromRes] < 2) {
    const icons = { wood: '🪵', stone: '🪨', gold: '🥇', water: '💧' };
    addLog(`Not enough ${fromRes}! Trading costs 2 ${icons[fromRes]}.`);
    renderAll();
    return;
  }
  pRes[fromRes] -= 2;
  pRes[toRes] += 1;
  const icons = { wood: '🪵', stone: '🪨', gold: '🥇', water: '💧' };
  addLog(`${BAZAAR_CHAR} ${getDisplayName(adjacentUnit)} exchanged 2 ${icons[fromRes]} ${fromRes} for 1 ${icons[toRes]} ${toRes} at the Bazaar!`);
  renderAll();
}

// ============================================================
// RENDERING
// ============================================================
function renderAll() {
  renderBoard();
  renderHeader();
  renderResources();
  renderProduction();
  renderUnitPanel();
  renderActionsPanel();
  renderChat();
}

function renderHeader() {
  const p = G.players[G.currentPlayer];
  const info = document.getElementById('turn-info');
  info.textContent = `Turn ${G.turn} — ${p.name}`;
  info.style.color = PLAYER_COLORS[G.currentPlayer];
}

function getCellSize(boardSize) {
  const availableHeight = window.innerHeight - 80;
  const availableWidth = window.innerWidth - 360;
  const maxDim = Math.min(availableHeight, availableWidth);
  let size = Math.floor(maxDim / boardSize);
  size = Math.max(12, Math.min(size, 40));
  const font = Math.max(8, Math.floor(size * 0.55));
  const gap = size >= 24 ? 1 : 0;
  return { size, font, gap };
}

function renderBoard() {
  const board = document.getElementById('board');
  const { size: cellSize, font: cellFont, gap } = getCellSize(G.boardSize);
  board.style.gridTemplateColumns = `repeat(${G.boardSize}, ${cellSize}px)`;
  board.style.gap = `${gap}px`;
  board.style.setProperty('--cell-size', `${cellSize}px`);
  board.style.setProperty('--cell-font', `${cellFont}px`);
  board.innerHTML = '';

  // Catch all damage sources: HP drops and lethal removals since last render both queue hit FX.
  const currentAliveById = new Map();
  for (const u of G.units) {
    if (u.hp > 0) currentAliveById.set(u.id, u);
  }

  for (const [id, prevState] of lastRenderedHpByUnitId.entries()) {
    const cur = currentAliveById.get(id);
    const prevHp = (typeof prevState === 'number') ? prevState : (prevState && prevState.hp);
    if (!cur && typeof prevHp === 'number' && prevHp > 0 && prevState && typeof prevState.x === 'number' && typeof prevState.y === 'number') {
      queueDeathHitEffects(prevState.x, prevState.y);
    }
  }
  for (const [id, cur] of currentAliveById.entries()) {
    const prevState = lastRenderedHpByUnitId.get(id);
    const prevHp = (typeof prevState === 'number') ? prevState : (prevState && prevState.hp);
    if (typeof prevHp === 'number' && cur.hp < prevHp) {
      queueAttackHitEffects(cur.x, cur.y);
    }
  }

  pruneCombatEffects();
  const combatEffectMap = new Map();
  const now = Date.now();
  for (const effect of (G.combatEffects || [])) {
    if (effect.startsAt && now < effect.startsAt) continue;
    const effectKey = `${effect.x},${effect.y}`;
    if (!combatEffectMap.has(effectKey)) combatEffectMap.set(effectKey, []);
    combatEffectMap.get(effectKey).push(effect);
  }

  const unitMap = {};
  for (const u of G.units) {
    if (u.hp > 0) unitMap[`${u.x},${u.y}`] = u;
  }

  const groundItemSet = new Set();
  for (const gi of (G.groundItems || [])) {
    groundItemSet.add(`${gi.x},${gi.y}`);
  }

  for (let y = 0; y < G.boardSize; y++) {
    for (let x = 0; x < G.boardSize; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.onclick = () => onCellClick(x, y);

      const key = `${x},${y}`;
      const unit = unitMap[key];
      const resource = G.board[y][x];
      const hasGroundItem = groundItemSet.has(key);
      const isShop = G.shops && G.shops.some(s => s.x === x && s.y === y);
      const isVendor = G.vendors && G.vendors.some(v => v.x === x && v.y === y);
      const isBazaar = G.bazaars && G.bazaars.some(b => b.x === x && b.y === y);
      const structure = G.structures && G.structures.find(s => s.x === x && s.y === y);

      if (unit) {
        const def = UNIT_DEFS[unit.type];
        const factionChars = unit.faction && FACTIONS[unit.faction] ? FACTIONS[unit.faction].chars : null;
        // Hero variant: use hero-specific char
        let unitChar = (factionChars && factionChars[unit.type]) || def.char;
        let isVisibleUnit = true;
        if (unit.type === 'hero' && unit.heroChoice) {
          const heroData = getHeroData(unit);
          if (heroData && heroData.char) unitChar = heroData.char;
        }
        // Camouflaged units look like trees to enemies; owner sees a faint unit
        if (unit.camouflaged) {
          if (unit.playerId === G.currentPlayer) {
            cell.textContent = unitChar;
            cell.style.color = PLAYER_COLORS[unit.playerId];
            cell.style.opacity = '0.5';
            cell.style.background = RESOURCE_COLORS['wood'];
          } else {
            cell.textContent = '';
            cell.style.background = RESOURCE_COLORS['wood'];
            isVisibleUnit = false;
          }
        } else {
          cell.textContent = unitChar;
          cell.style.color = unit.playerId === NPC_PLAYER_ID ? BEAST_COLOR : PLAYER_COLORS[unit.playerId];
        }
        // Show in-tile health only for damaged, visible units.
        if (isVisibleUnit) {
          const stats = getUnitStats(unit);
          const maxHp = Math.max(1, stats.maxHp || unit.maxHp || 1);
          if (unit.hp < maxHp) {
            const hpPct = Math.max(0, Math.min(100, Math.round((unit.hp / maxHp) * 100)));
            const hpFill = document.createElement('span');
            hpFill.className = 'unit-hp-fill';
            hpFill.style.width = `${hpPct}%`;
            if (hpPct <= 25) hpFill.style.background = '#C91C1C';
            else if (hpPct <= 50) hpFill.style.background = '#D98A00';

            const hpBar = document.createElement('span');
            hpBar.className = 'unit-hp-bar';
            hpBar.appendChild(hpFill);

            cell.classList.add('unit-damaged');
            cell.appendChild(hpBar);
          }
        }
        if (unit.playerId === NPC_PLAYER_ID) cell.classList.add('beast-unit');
        if (unit.id === selectedUnitId) cell.classList.add('selected');
        // Status effect visual indicator
        if (unit.statusEffects && unit.statusEffects.length > 0) {
          cell.classList.add('unit-debuffed');
        }
        // Green dot for workers who can still gather
        if (unit.playerId === G.currentPlayer && !unit.hasGathered && !unit.hasPlacedWallThisTurn && !hasStatusEffect(unit, 'on_strike') &&
            (unit.canGather || hasPassive(unit, 'resource_gathering') || unit.mimicGather)) {
          const dot = document.createElement('span');
          dot.className = 'gather-dot';
          cell.appendChild(dot);
        }
      } else if (isShop) {
        cell.textContent = '$';
        cell.classList.add('shop-cell');
      } else if (isVendor) {
        cell.textContent = '☂';
        cell.style.color = VENDOR_COLOR;
        cell.classList.add('shop-cell');
      } else if (isBazaar) {
        cell.textContent = BAZAAR_CHAR;
        cell.style.color = BAZAAR_COLOR;
        cell.classList.add('shop-cell');
      } else if (structure) {
        const sDef = STRUCTURE_DEFS[structure.type];
        cell.textContent = sDef.char;
        cell.style.color = PLAYER_COLORS[structure.playerId];
        cell.classList.add('structure-cell');

        const structureMaxHp = Math.max(1, sDef.hp || structure.hp || 1);
        if (structure.hp < structureMaxHp) {
          const structureHpPct = Math.max(0, Math.min(100, Math.round((structure.hp / structureMaxHp) * 100)));
          cell.classList.add('unit-damaged');
          const hpBar = document.createElement('span');
          hpBar.className = 'unit-hp-bar';
          const hpFill = document.createElement('span');
          hpFill.className = 'unit-hp-fill';
          hpFill.style.width = `${structureHpPct}%`;
          if (structureHpPct <= 25) hpFill.style.background = '#C91C1C';
          else if (structureHpPct <= 50) hpFill.style.background = '#D98A00';
          hpBar.appendChild(hpFill);
          cell.appendChild(hpBar);
        }
      } else if (resource) {
        cell.textContent = '';
        cell.style.background = RESOURCE_COLORS[resource.type];

        if (resource.type === 'wall' && resource.amount > 0) {
          const wallMaxHp = Math.max(1, WALL_TILE_DURABILITY || resource.amount || 1);
          if (resource.amount < wallMaxHp) {
            const wallHpPct = Math.max(0, Math.min(100, Math.round((resource.amount / wallMaxHp) * 100)));
            cell.classList.add('unit-damaged');
            const hpBar = document.createElement('span');
            hpBar.className = 'unit-hp-bar';
            const hpFill = document.createElement('span');
            hpFill.className = 'unit-hp-fill';
            hpFill.style.width = `${wallHpPct}%`;
            if (wallHpPct <= 25) hpFill.style.background = '#C91C1C';
            else if (wallHpPct <= 50) hpFill.style.background = '#D98A00';
            hpBar.appendChild(hpFill);
            cell.appendChild(hpBar);
          }
        }
      } else if (hasGroundItem) {
        cell.textContent = '◆';
        cell.style.color = '#FFD700';
      } else if (G.traps && G.traps.some(t => t.x === x && t.y === y && t.playerId === G.currentPlayer)) {
        cell.textContent = '⚠';
        cell.style.color = '#AA4444';
        cell.style.opacity = '0.5';
      } else if (G.barrels && G.barrels.some(b => b.x === x && b.y === y)) {
        cell.textContent = '🛢';
        cell.style.color = '#CC6600';
      } else if (G.tunnels && G.tunnels.some(t => t.x === x && t.y === y)) {
        const tun = G.tunnels.find(t => t.x === x && t.y === y);
        cell.textContent = tun.label === 'A' ? 'Ⓐ' : 'Ⓑ';
        cell.style.color = PLAYER_COLORS[tun.playerId];
        cell.style.opacity = '0.6';
      } else {
        cell.textContent = '·';
        cell.style.color = '#C0B898';
      }

      const tileEffects = combatEffectMap.get(key) || [];
      if (tileEffects.some(e => e.type === 'shudder')) {
        cell.classList.add('hit-shudder');
      }
      for (const effect of tileEffects) {
        const fx = document.createElement('span');
        fx.className = `combat-effect combat-effect-${effect.type}`;
        cell.appendChild(fx);
      }

      // Highlights
      if (interactionMode === 'move' && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-move');
      }
      if (interactionMode === 'attack' || interactionMode === 'double_strike') {
        const su = getUnit(selectedUnitId);
        if (su) {
          const suStats = getUnitStats(su);
          const range = suStats.attackRange || 1;
          const dist = chebyshevDist(su.x, su.y, x, y);
          if (unit && unit.playerId !== su.playerId && dist <= range && hasLineOfSight(su.x, su.y, x, y)) {
            // Smoke concealment blocks ranged attacks (distance > 1)
            if (dist <= 1 || !isConcealedBySmoke(unit)) {
              cell.classList.add('highlight-attack');
            }
          }
          // Highlight enemy structures as attackable
          if (!unit && structure && structure.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
          // Highlight enemy walls as attackable
          if (interactionMode === 'attack' && !unit && resource && resource.type === 'wall' && resource.amount > 0 && (resource.ownerPlayerId == null || resource.ownerPlayerId !== su.playerId) && dist <= range && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
          // Highlight explosive barrels as attackable
          if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      if (interactionMode === 'gather') {
        const su = getUnit(selectedUnitId);
        if (su && resource && resource.type !== 'wall' && resource.amount > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-gather');
        }
      }
      if (interactionMode === 'build_town_hall') {
        const su = getUnit(selectedUnitId);
        if (su && isAdjacent(su.x, su.y, x, y) && !unit && !resource && !(structure) &&
            x >= 0 && x < G.boardSize && y >= 0 && y < G.boardSize && !G.board[y][x]) {
          cell.classList.add('highlight-place');
        }
      }
      if (interactionMode === 'scroll_retrieve' && scrollPending) {
        const su = getUnit(scrollPending.unitId);
        if (su && unit && unit.id !== su.id && unit.playerId === su.playerId && unit.hp > 0) {
          cell.classList.add('highlight-move');
        }
      }
      if (interactionMode === 'scroll_swap' && scrollPending) {
        const su = getUnit(scrollPending.unitId);
        if (su && unit && unit.id !== su.id && unit.hp > 0) {
          cell.classList.add('highlight-move');
        }
      }
      if (interactionMode === 'place' && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-place');
      }
      if (interactionMode === 'place_structure' && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-place');
      }
      if (interactionMode === 'place_wall' && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-place');
      }
      if (interactionMode === 'leap' && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-move');
      }
      // Targeted hero abilities
      if ((interactionMode === 'hex_curse' || interactionMode === 'arcane_blast') && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
        if (interactionMode === 'arcane_blast' && su && G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Bloodrend: adjacent bleeding enemies only
      if (interactionMode === 'bloodrend' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && isAdjacent(su.x, su.y, x, y) && hasStatusEffect(unit, 'bleeding')) {
          cell.classList.add('highlight-attack');
        }
      }
      if (interactionMode === 'aimed_shot' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su) {
          const suStats = getUnitStats(su);
          const range = suStats.attackRange || 1;
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(unit)) {
            cell.classList.add('highlight-attack');
          }
          if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Harpoon Shot: enemies within 5 with LOS
      if (interactionMode === 'harpoon_shot' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 5 && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(unit)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Targeted magic weapon abilities
      if (['fireball', 'frost_ray', 'lightning_bolt', 'life_drain', 'curse_hex', 'lethargy', 'flash_freeze', 'enfeeble', 'gore_curse'].includes(interactionMode) && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su) {
          const suStats = getUnitStats(su);
          const range = suStats.attackRange || 3;
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
          if (['fireball', 'frost_ray', 'lightning_bolt'].includes(interactionMode) && G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Grapple: any unit 2-5 tiles away
      if (interactionMode === 'grapple' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && unit.hp > 0) {
          const dist = chebyshevDist(su.x, su.y, x, y);
          if (dist >= 2 && dist <= 5 && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Ensnare: enemies within 3 tiles
      if (interactionMode === 'ensnare' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Grab: adjacent enemies
      if (interactionMode === 'grab' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Devour: adjacent enemies below 25% HP or adjacent allies
      if (interactionMode === 'devour' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && isAdjacent(su.x, su.y, x, y) &&
          ((unit.playerId !== su.playerId && unit.hp <= getUnitStats(unit).maxHp * 0.25) || unit.playerId === su.playerId)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Shield Bash: adjacent enemies
      if (interactionMode === 'shield_bash' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Precision Shot: enemies within weapon range
      if (interactionMode === 'precision_shot' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su) {
          const suStats = getUnitStats(su);
          const range = suStats.attackRange || 1;
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(unit)) {
            cell.classList.add('highlight-attack');
          }
          if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Soul Siphon: enemies within 3 tiles
      if (interactionMode === 'soul_siphon' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Shadowstep: enemies within 10 tiles
      if (interactionMode === 'shadowstep' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 10) {
          cell.classList.add('highlight-attack');
        }
      }
      // Bone Explosion: adjacent allied units
      if (interactionMode === 'bone_explosion' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId === su.playerId && unit.id !== su.id && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-gather'); // greenish highlight for ally selection
        }
      }
      // Troll Rampage: straight/diagonal lines within 3 tiles
      if (interactionMode === 'troll_rampage' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su) {
          const rdx = x - su.x, rdy = y - su.y;
          const dist = chebyshevDist(su.x, su.y, x, y);
          if (dist >= 1 && dist <= 3 && (rdx === 0 || rdy === 0 || Math.abs(rdx) === Math.abs(rdy))) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Booby Trap: adjacent empty tiles
      if (interactionMode === 'booby_trap' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && !unit && !resource && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-place');
        }
      }
      // Seizing Totem: adjacent empty tiles
      if (interactionMode === 'seizing_totem' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && !unit && !resource && isAdjacent(su.x, su.y, x, y) &&
            !(G.barrels && G.barrels.some(b => b.x === x && b.y === y))) {
          cell.classList.add('highlight-place');
        }
      }
      // Tunnel Entrance A: adjacent empty tiles; Tunnel Entrance B: within 5 tiles
      if ((interactionMode === 'tunnel_a' || interactionMode === 'tunnel_b') && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        const tunnelInRange = interactionMode === 'tunnel_b' ? chebyshevDist(su.x, su.y, x, y) <= 5 : isAdjacent(su.x, su.y, x, y);
        if (su && !unit && !resource && tunnelInRange) {
          cell.classList.add('highlight-place');
        }
      }
      // Cadence of Haste: adjacent allies
      if (interactionMode === 'cadence_of_haste' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && unit.playerId === su.playerId && unit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-gather');
        }
      }
      // Tame Beast: adjacent NPC beasts
      if (interactionMode === 'tame_beast' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId === NPC_PLAYER_ID && (unit.type === 'beast' || unit.type === 'warg' || unit.type === 'hydra') && unit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-gather');
        }
      }
      // Mimic: adjacent units (allies or enemies) that have a lastAbilityUsed
      if (interactionMode === 'mimic' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && unit.hp > 0 && isAdjacent(su.x, su.y, x, y) && unit.lastAbilityUsed) {
          cell.classList.add('highlight-gather');
        }
      }
      // Fish: adjacent water tiles
      if (interactionMode === 'fish' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && resource && resource.type === 'water' && resource.amount > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-gather');
        }
      }
      // Poisonous Shiv: adjacent enemies
      if (interactionMode === 'poisonous_shiv' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && unit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Rescue: any ally on the map
      if (interactionMode === 'rescue' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && unit.playerId === su.playerId && unit.hp > 0) {
          cell.classList.add('highlight-gather');
        }
      }
      // Place Barrel: adjacent empty tiles (no existing barrels, traps, tunnels, or structures)
      if (interactionMode === 'place_barrel' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        const hasBarrelAlready = G.barrels && G.barrels.some(b => b.x === x && b.y === y);
        if (su && !unit && !resource && isAdjacent(su.x, su.y, x, y) && !hasBarrelAlready) {
          cell.classList.add('highlight-place');
        }
      }
      // Pistol Shot: enemies within 3 tiles
      if (interactionMode === 'pistol_shot' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(unit)) {
          cell.classList.add('highlight-attack');
        }
        if (su && G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Giant Shot: enemies within weapon range
      if (interactionMode === 'giant_shot' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su) {
          const suStats = getUnitStats(su);
          const range = suStats.attackRange || 4;
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(unit)) {
            cell.classList.add('highlight-attack');
          }
          if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Boomerang Throw: enemies on a straight line (cardinal/diagonal) within range 4
      if (interactionMode === 'boomerang_throw' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 4 && isOnStraightLine(su.x, su.y, x, y) && hasLineOfSight(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }
      // Sniper Shot: enemies within range (6 + INT via Ballistics Training) with LoS
      if (interactionMode === 'sniper_shot' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su) {
          const ssRange = getSniperShotRange(su);
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= ssRange && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(unit)) {
            cell.classList.add('highlight-attack');
          }
          if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= ssRange && hasLineOfSight(su.x, su.y, x, y)) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Mortar Strike: enemies within 4 tiles (NO LoS required — fires over walls)
      if (interactionMode === 'mortar_strike' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 4) {
          cell.classList.add('highlight-attack');
        }
      }
      // Bounty Mark: any enemy on the map (unlimited range, no LoS needed)
      if (interactionMode === 'bounty_mark' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && unit.hp > 0) {
          cell.classList.add('highlight-attack');
        }
      }
      // Blink: any empty tile within 3 Chebyshev distance (ignores walls/terrain)
      if (interactionMode === 'blink' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && !unit && chebyshevDist(su.x, su.y, x, y) <= 3 && chebyshevDist(su.x, su.y, x, y) >= 1) {
          // Allow blink onto any empty tile (no wall/terrain check -- blink goes through everything)
          const isOccupied = G.units.some(o => o.hp > 0 && o.x === x && o.y === y);
          const hasBarrel = G.barrels && G.barrels.some(b => b.x === x && b.y === y);
          if (!isOccupied && !hasBarrel) {
            cell.classList.add('highlight-move');
          }
        }
      }
      // Corrupted Chalice: adjacent allies
      if (interactionMode === 'corrupted_chalice' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && unit.playerId === su.playerId && unit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-move');
        }
      }
      // Ogre Throw – Phase 1: highlight adjacent units (enemy or ally)
      if (interactionMode === 'ogre_throw_select' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && unit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add(unit.playerId === su.playerId ? 'highlight-move' : 'highlight-attack');
        }
      }
      // Ogre Throw – Phase 2: highlight valid landing tiles within 4 tiles
      if (interactionMode === 'ogre_throw_dest' && selectedUnitId !== null && G._throwTarget) {
        const su = getUnit(selectedUnitId);
        if (su) {
          const dist = chebyshevDist(su.x, su.y, x, y);
          if (dist >= 2 && dist <= 4) {
            const isOccupiedByOther = G.units.some(o => o.hp > 0 && o.x === x && o.y === y && o.id !== G._throwTarget.id);
            const hasBarrel = G.barrels && G.barrels.some(b => b.x === x && b.y === y);
            const hasResource = G.board[y] && G.board[y][x] && G.board[y][x].type && G.board[y][x].amount > 0;
            const landOnEnemy = G.units.find(o => o.hp > 0 && o.x === x && o.y === y && o.id !== G._throwTarget.id && o.id !== su.id);
            if (!hasBarrel && !hasResource) {
              if (!isOccupiedByOther) {
                cell.classList.add('highlight-move');
              } else if (landOnEnemy) {
                cell.classList.add('highlight-attack');
              }
            }
          }
        }
      }
      // Bottled Lightning: enemies within 2 tiles
      if (interactionMode === 'bottled_lightning' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && unit.hp > 0 && chebyshevDist(su.x, su.y, x, y) <= 2) {
          cell.classList.add('highlight-attack');
        }
      }
      // Voodoo Doll: enemies within 3 tiles
      if (interactionMode === 'voodoo_doll' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && unit.hp > 0 && chebyshevDist(su.x, su.y, x, y) <= 3) {
          cell.classList.add('highlight-attack');
        }
      }
      // Static Discharge: enemies within 3 tiles
      if (interactionMode === 'static_discharge' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && unit.hp > 0 && chebyshevDist(su.x, su.y, x, y) <= 3) {
          cell.classList.add('highlight-attack');
        }
      }

      // Seizing Totem radius: dotted border on boundary cells
      const seizingTotems = G.units.filter(t => t.hp > 0 && t.type === 'seizing_totem');
      for (const totem of seizingTotems) {
        const dist = chebyshevDist(x, y, totem.x, totem.y);
        if (dist <= 2) {
          const totemColor = PLAYER_COLORS[totem.playerId] || '#cc4444';
          // Check each cardinal neighbor — if it's outside the radius, draw a dotted border on that side
          if (chebyshevDist(x, y - 1, totem.x, totem.y) > 2) cell.style.borderTop = `2px dotted ${totemColor}`;
          if (chebyshevDist(x, y + 1, totem.x, totem.y) > 2) cell.style.borderBottom = `2px dotted ${totemColor}`;
          if (chebyshevDist(x - 1, y, totem.x, totem.y) > 2) cell.style.borderLeft = `2px dotted ${totemColor}`;
          if (chebyshevDist(x + 1, y, totem.x, totem.y) > 2) cell.style.borderRight = `2px dotted ${totemColor}`;
        }
      }

      // Consecrate radius: golden dotted border when active
      const consecrateUnits = G.units.filter(u => u.hp > 0 && u.consecrateTurns > 0);
      for (const cu of consecrateUnits) {
        const dist = chebyshevDist(x, y, cu.x, cu.y);
        if (dist <= 1) {
          if (chebyshevDist(x, y - 1, cu.x, cu.y) > 1) cell.style.borderTop = '3px dotted #DAA520';
          if (chebyshevDist(x, y + 1, cu.x, cu.y) > 1) cell.style.borderBottom = '3px dotted #DAA520';
          if (chebyshevDist(x - 1, y, cu.x, cu.y) > 1) cell.style.borderLeft = '3px dotted #DAA520';
          if (chebyshevDist(x + 1, y, cu.x, cu.y) > 1) cell.style.borderRight = '3px dotted #DAA520';
        }
      }

      board.appendChild(cell);
    }
  }

  const hpSnapshot = new Map();
  for (const u of G.units) {
    if (u.hp > 0) hpSnapshot.set(u.id, { hp: u.hp, x: u.x, y: u.y });
  }
  lastRenderedHpByUnitId = hpSnapshot;
}

function renderResources() {
  const p = G.players[G.currentPlayer];
  const container = document.getElementById('resources-display');
  container.innerHTML = RESOURCE_TYPES.map(r =>
    `<div class="resource-item">
      <span class="resource-icon res-${r}"></span>
      <span>${capitalize(r)}: <b>${p.resources[r]}</b></span>
    </div>`
  ).join('');
}

function renderUnitPanel() {
  const panel = document.getElementById('unit-panel');
  const info = document.getElementById('unit-info');

  // Shop inspection
  if (selectedShop) {
    const shop = selectedShop;
    const shopIdx = G.shops ? G.shops.indexOf(shop) : -1;
    if (shopIdx < 0) { selectedShop = null; panel.style.display = 'none'; return; }
    panel.style.display = 'block';
    const pRes = G.players[G.currentPlayer].resources;
    // Find if the current player has a unit adjacent to the shop (prefer selected unit)
    const selUnit = selectedUnitId != null ? getUnit(selectedUnitId) : null;
    const adjacentUnit = (selUnit && selUnit.hp > 0 && selUnit.playerId === G.currentPlayer &&
      (isAdjacent(selUnit.x, selUnit.y, shop.x, shop.y) || (selUnit.x === shop.x && selUnit.y === shop.y)))
      ? selUnit
      : G.units.find(u =>
        u.hp > 0 && u.playerId === G.currentPlayer &&
        (isAdjacent(u.x, u.y, shop.x, shop.y) || (u.x === shop.x && u.y === shop.y))
      );
    let html = `<div class="unit-name" style="color: ${SHOP_COLOR}">$ Shop (${shop.x}, ${shop.y})</div>`;
    if (adjacentUnit) html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Buyer: <b>${getDisplayName(adjacentUnit)}</b></div>`;
    if (shop.items.length === 0) {
      html += `<div class="empty-slot" style="padding:6px 4px;">Sold out! Restocks every 7 turns.</div>`;
    }
    for (let i = 0; i < shop.items.length; i++) {
      const item = shop.items[i];
      const cost = item.shopCost || 5;
      const statStr = itemStatString(item);
      const canAfford = pRes.water >= cost;
      const canBuy = adjacentUnit && canAfford;
      html += `<div class="inv-item" data-tip="${item.description || ''}" style="margin-bottom:3px;">
        <div>
          <span class="item-name">${item.name}${itemTypeTag(item)}</span>
          <span class="item-stats">(${SLOT_LABELS[item.slot]}) ${statStr}</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
          <span style="color:${canAfford ? '#4682B4' : '#c44'};font-size:11px;font-weight:bold;">${cost} 💧</span>
          ${adjacentUnit ? `<button class="btn-tiny ${canBuy ? 'btn-success' : ''}" ${canBuy ? '' : 'disabled'} onclick="purchaseShopItem(${adjacentUnit.id}, ${shopIdx}, ${i})" style="font-size:10px;">Buy</button>` : ''}
        </div>
      </div>`;
    }
    if (!adjacentUnit) {
      html += `<div style="font-size:10px;color:#c44;padding:4px;font-style:italic;">Move a unit adjacent to the shop to purchase items.</div>`;
    }
    info.innerHTML = html;
    return;
  }

  // Vendor inspection
  if (selectedVendor) {
    const vendor = selectedVendor;
    const vendorIdx = G.vendors ? G.vendors.indexOf(vendor) : -1;
    if (vendorIdx < 0) { selectedVendor = null; panel.style.display = 'none'; return; }
    panel.style.display = 'block';
    const pRes = G.players[G.currentPlayer].resources;
    const selUnit = selectedUnitId != null ? getUnit(selectedUnitId) : null;
    const adjacentUnit = (selUnit && selUnit.hp > 0 && selUnit.playerId === G.currentPlayer &&
      (isAdjacent(selUnit.x, selUnit.y, vendor.x, vendor.y) || (selUnit.x === vendor.x && selUnit.y === vendor.y)))
      ? selUnit
      : G.units.find(u =>
        u.hp > 0 && u.playerId === G.currentPlayer &&
        (isAdjacent(u.x, u.y, vendor.x, vendor.y) || (u.x === vendor.x && u.y === vendor.y))
      );
    let html = `<div class="unit-name" style="color: ${VENDOR_COLOR}">☂ Refreshments Vendor (${vendor.x}, ${vendor.y})</div>`;
    if (adjacentUnit) html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Buyer: <b>${getDisplayName(adjacentUnit)}</b></div>`;
    if (vendor.items.length === 0) {
      html += `<div class="empty-slot" style="padding:6px 4px;">Sold out! Restocks every 4 turns.</div>`;
    }
    for (let i = 0; i < vendor.items.length; i++) {
      const item = vendor.items[i];
      const cost = item.shopCost || 3;
      const canAfford = pRes.water >= cost;
      const canBuy = adjacentUnit && canAfford;
      html += `<div class="inv-item" data-tip="${item.description || ''}" style="margin-bottom:3px;">
        <div>
          <span class="item-name">${item.icon || '🧪'} ${item.name}</span>
          <span class="item-stats">(Consumable)</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
          <span style="color:${canAfford ? '#4682B4' : '#c44'};font-size:11px;font-weight:bold;">${cost} 💧</span>
          ${adjacentUnit ? `<button class="btn-tiny ${canBuy ? 'btn-success' : ''}" ${canBuy ? '' : 'disabled'} onclick="purchaseVendorItem(${adjacentUnit.id}, ${vendorIdx}, ${i})" style="font-size:10px;">Buy</button>` : ''}
        </div>
      </div>`;
    }
    if (!adjacentUnit) {
      html += `<div style="font-size:10px;color:#c44;padding:4px;font-style:italic;">Move a unit adjacent to the vendor to purchase consumables.</div>`;
    }
    info.innerHTML = html;
    return;
  }

  // Bazaar inspection
  if (selectedBazaar) {
    const bazaar = selectedBazaar;
    const bazaarIdx = G.bazaars ? G.bazaars.indexOf(bazaar) : -1;
    if (bazaarIdx < 0) { selectedBazaar = null; panel.style.display = 'none'; return; }
    panel.style.display = 'block';
    const pRes = G.players[G.currentPlayer].resources;
    const selUnit = selectedUnitId != null ? getUnit(selectedUnitId) : null;
    const adjacentUnit = (selUnit && selUnit.hp > 0 && selUnit.playerId === G.currentPlayer &&
      (isAdjacent(selUnit.x, selUnit.y, bazaar.x, bazaar.y) || (selUnit.x === bazaar.x && selUnit.y === bazaar.y)))
      ? selUnit
      : G.units.find(u =>
        u.hp > 0 && u.playerId === G.currentPlayer &&
        (isAdjacent(u.x, u.y, bazaar.x, bazaar.y) || (u.x === bazaar.x && u.y === bazaar.y))
      );
    let html = `<div class="unit-name" style="color: ${BAZAAR_COLOR}">${BAZAAR_CHAR} Bazaar (${bazaar.x}, ${bazaar.y})</div>`;
    html += `<div style="font-size:11px;color:#888;padding:2px 4px;">Your resources: 🪵 <b>${pRes.wood}</b> | 🪨 <b>${pRes.stone}</b> | 🥇 <b>${pRes.gold}</b> | 💧 <b style="color:#4682B4">${pRes.water}</b></div>`;
    html += `<div style="font-size:11px;color:#DAA520;padding:4px;font-weight:bold;">Buy Resources (1 💧 → 2 resource)</div>`;
    const waterTrades = [
      { res: 'wood', icon: '🪵', label: 'Wood' },
      { res: 'stone', icon: '🪨', label: 'Stone' },
      { res: 'gold', icon: '🥇', label: 'Gold' }
    ];
    for (const t of waterTrades) {
      const canAfford = pRes.water >= 1;
      const canBuy = adjacentUnit && canAfford;
      html += `<div class="inv-item" style="margin-bottom:3px;">
        <div><span class="item-name">${t.icon} Buy 2 ${t.label}</span><span class="item-stats">(costs 1 💧)</span></div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
          <span style="color:${canAfford ? '#4682B4' : '#c44'};font-size:11px;font-weight:bold;">1 💧</span>
          ${adjacentUnit ? `<button class="btn-tiny ${canBuy ? 'btn-success' : ''}" ${canBuy ? '' : 'disabled'} onclick="purchaseBazaarWater(${bazaarIdx}, '${t.res}')" style="font-size:10px;">Buy</button>` : ''}
        </div>
      </div>`;
    }
    html += `<div style="font-size:11px;color:#DAA520;padding:4px;font-weight:bold;margin-top:4px;">Exchange Resources (2 → 1)</div>`;
    const resTypes = [
      { res: 'wood', icon: '🪵', label: 'Wood' },
      { res: 'stone', icon: '🪨', label: 'Stone' },
      { res: 'gold', icon: '🥇', label: 'Gold' },
      { res: 'water', icon: '💧', label: 'Water' }
    ];
    for (const from of resTypes) {
      for (const to of resTypes) {
        if (from.res === to.res) continue;
        if (from.res === 'water' && ['wood', 'stone', 'gold'].includes(to.res)) continue; // already covered above
        const canAfford = pRes[from.res] >= 2;
        const canBuy = adjacentUnit && canAfford;
        html += `<div class="inv-item" style="margin-bottom:2px;">
          <div><span class="item-name">${from.icon} 2 ${from.label} → ${to.icon} 1 ${to.label}</span></div>
          <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
            <span style="color:${canAfford ? '#6a6' : '#c44'};font-size:11px;font-weight:bold;">2 ${from.icon}</span>
            ${adjacentUnit ? `<button class="btn-tiny ${canBuy ? 'btn-success' : ''}" ${canBuy ? '' : 'disabled'} onclick="purchaseBazaarExchange(${bazaarIdx}, '${from.res}', '${to.res}')" style="font-size:10px;">Trade</button>` : ''}
          </div>
        </div>`;
      }
    }
    if (!adjacentUnit) {
      html += `<div style="font-size:10px;color:#c44;padding:4px;font-style:italic;">Move a unit adjacent to the bazaar to trade resources.</div>`;
    }
    info.innerHTML = html;
    return;
  }

  // Tunnel inspection
  if (selectedTunnel) {
    const tun = selectedTunnel;
    const ownerPlayer = G.players[tun.playerId];
    const tunColor = PLAYER_COLORS[tun.playerId];
    panel.style.display = 'block';
    let html = `<div class="unit-name" style="color: ${tunColor}">${tun.label === 'A' ? 'Ⓐ' : 'Ⓑ'} Tunnel Entrance ${tun.label}</div>`;
    html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Owner: <b style="color:${tunColor}">${ownerPlayer.name}</b></div>`;
    html += `<div style="font-size:11px;color:#888;padding:2px 4px;">Position: (${tun.x}, ${tun.y})</div>`;
    const otherTun = G.tunnels.find(t => t.playerId === tun.playerId && t.label !== tun.label);
    if (otherTun) {
      html += `<div style="font-size:11px;color:#AA6622;padding:2px 4px;">Connected to Entrance ${otherTun.label} at (${otherTun.x}, ${otherTun.y})</div>`;
    } else {
      html += `<div style="font-size:11px;color:#886;padding:2px 4px;font-style:italic;">No exit tunnel placed yet</div>`;
    }
    html += `<div style="font-size:11px;color:#888;padding:4px 4px;font-style:italic;">Kobold units can travel instantly between connected tunnel entrances.</div>`;
    info.innerHTML = html;
    return;
  }

  // Barrel inspection
  if (selectedBarrel) {
    const barrel = selectedBarrel;
    // Verify barrel still exists
    if (!G.barrels || !G.barrels.some(b => b.x === barrel.x && b.y === barrel.y)) {
      selectedBarrel = null;
      panel.style.display = 'none';
      return;
    }
    const ownerColor = PLAYER_COLORS[barrel.playerId] || '#CC6600';
    const ownerName = G.players[barrel.playerId] ? G.players[barrel.playerId].name : 'Unknown';
    panel.style.display = 'block';
    let html = `<div class="unit-name" style="color: #CC6600">🛢 Explosive Barrel</div>`;
    html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Owner: <b style="color:${ownerColor}">${ownerName}</b></div>`;
    html += `<div style="font-size:11px;color:#888;padding:2px 4px;">Position: (${barrel.x}, ${barrel.y})</div>`;
    html += `<div style="font-size:11px;color:#ff6644;padding:2px 4px;">💥 Damage: <b>${barrel.damage}</b></div>`;
    html += `<div style="font-size:11px;color:#ff6644;padding:2px 4px;">💢 Blast Radius: <b>${barrel.radius} tiles</b></div>`;
    html += `<div style="font-size:11px;color:#888;padding:4px 4px;font-style:italic;">Explodes when attacked or shot. Damages ALL units in radius (allies included). Can chain-react with nearby barrels.</div>`;
    info.innerHTML = html;
    return;
  }

  // Wall inspection
  if (selectedWall) {
    const wall = selectedWall;
    const tile = G.board && G.board[wall.y] && G.board[wall.y][wall.x];
    if (!tile || tile.type !== 'wall' || tile.amount <= 0) {
      selectedWall = null;
      panel.style.display = 'none';
      return;
    }
    const ownerId = tile.ownerPlayerId;
    const ownerName = ownerId != null && G.players[ownerId] ? G.players[ownerId].name : 'Unknown';
    const ownerColor = ownerId != null ? (PLAYER_COLORS[ownerId] || '#6B6B6B') : '#6B6B6B';
    const canDestroy = ownerId == null || ownerId === G.currentPlayer;
    panel.style.display = 'block';
    let html = `<div class="unit-name" style="color:#6B6B6B">■ Wall</div>`;
    html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Owner: <b style="color:${ownerColor}">${ownerName}</b></div>`;
    html += `<div style="font-size:11px;color:#888;padding:2px 4px;">Position: (${wall.x}, ${wall.y})</div>`;
    html += `<div style="font-size:11px;color:#c84;padding:2px 4px;">Durability: <b>${tile.amount}</b></div>`;
    html += `<div style="font-size:11px;color:#888;padding:4px 4px;font-style:italic;">Impassable obstacle. Attack to break through.</div>`;
    if (canDestroy) {
      html += `<div style="padding:4px;"><button class="btn btn-small btn-danger" onclick="destroySelectedWall()">Destroy Wall</button></div>`;
    }
    info.innerHTML = html;
    return;
  }

  // Structure inspection
  if (selectedStructure) {
    const struct = selectedStructure;
    const sDef = STRUCTURE_DEFS[struct.type];
    const ownerPlayer = G.players[struct.playerId];
    const faction = FACTIONS[struct.faction];
    const structColor = PLAYER_COLORS[struct.playerId];
    panel.style.display = 'block';
    const maxHp = sDef.hp;
    const hpPct = Math.max(0, struct.hp / maxHp * 100);
    const hpColor = hpPct > 60 ? '#4a4' : hpPct > 30 ? '#aa6' : '#c44';
    const structDisplayName = (sDef.factionNames && sDef.factionNames[struct.faction]) || sDef.name;
    let html = `<div class="unit-name" style="color: ${structColor}">${sDef.char} ${faction.prefix} ${structDisplayName}</div>`;
    html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Owner: <b style="color:${structColor}">${ownerPlayer.name}</b></div>`;
    html += `<div style="padding:2px 4px;"><div style="background:#333;border-radius:3px;height:8px;width:100%;margin:2px 0;"><div style="background:${hpColor};height:100%;width:${hpPct}%;border-radius:3px;"></div></div><span style="font-size:11px;color:${hpColor};">${struct.hp} / ${maxHp} HP</span></div>`;
    html += `<div style="font-size:11px;color:#888;padding:2px 4px;">Position: (${struct.x}, ${struct.y})</div>`;
    html += `<div style="font-size:11px;color:#888;padding:4px 4px;font-style:italic;">${sDef.description}</div>`;
    if (sDef.unlocksUnits && sDef.unlocksUnits.length > 0) {
      const unlockNames = sDef.unlocksUnits.map(t => {
        const factionOverrideName = faction && faction.unitOverrides && faction.unitOverrides[t] && faction.unitOverrides[t].name;
        return factionOverrideName || UNIT_DEFS[t].name;
      });
      html += `<div style="font-size:11px;color:#AA6622;padding:2px 4px;">Unlocks: ${unlockNames.join(', ')}</div>`;
    }
    // Forge crafting UI
    if ((struct.type === 'forge' || struct.type === 'advanced_forge') && struct.playerId === G.currentPlayer) {
      const isAdvancedForge = struct.type === 'advanced_forge';
      const forgeUsed = struct.forgeUsedThisTurn || false;
      const selUnit = selectedUnitId != null ? getUnit(selectedUnitId) : null;
      const adjacentUnit = (selUnit && selUnit.hp > 0 && selUnit.playerId === G.currentPlayer &&
        (isAdjacent(selUnit.x, selUnit.y, struct.x, struct.y) || (selUnit.x === struct.x && selUnit.y === struct.y)))
        ? selUnit
        : G.units.find(u =>
          u.hp > 0 && u.playerId === G.currentPlayer &&
          (isAdjacent(u.x, u.y, struct.x, struct.y) || (u.x === struct.x && u.y === struct.y))
        );
      const forgeFaction = G.players[G.currentPlayer].faction;
      const forgeItemIds = isAdvancedForge ? [] : getForgeItemsForFaction(forgeFaction);
      const advancedEntries = isAdvancedForge ? getAdvancedForgeEntries() : [];
      // Separate bonus items for display (base forge only)
      const bonusIds = isAdvancedForge ? [] : ((FACTIONS[forgeFaction] && FACTIONS[forgeFaction].forgeBonusItems) || []);
      html += `<div style="border-top:1px solid #555;margin-top:4px;padding-top:4px;">`;
      if (adjacentUnit) html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Crafter: <b>${getDisplayName(adjacentUnit)}</b></div>`;
      html += `<div style="font-size:12px;color:#DAA520;padding:2px 4px;font-weight:bold;">${isAdvancedForge ? '▩ Advanced Crafting' : '⚒ Crafting'}${(!isAdvancedForge && forgeUsed) ? ' <span style="color:#c44;">(Used this turn)</span>' : ''}</div>`;
      if (!adjacentUnit) {
        html += `<div style="font-size:10px;color:#c44;padding:4px;font-style:italic;">Move a unit adjacent to the ${isAdvancedForge ? 'advanced forge' : 'forge'} to craft items.</div>`;
      }
      if (isAdvancedForge) {
        html += `<div style="font-size:10px;color:#4682B4;padding:2px 4px;font-style:italic;">Advanced forge items cost water.</div>`;
      }
      // Group items by slot
      const slotGroups = {};
      if (isAdvancedForge) {
        for (const entry of advancedEntries) {
          const slot = entry.item.slot || 'other';
          if (!slotGroups[slot]) slotGroups[slot] = [];
          slotGroups[slot].push({ id: entry.id, item: entry.item, isBonus: false, waterCost: entry.waterCost || 0 });
        }
      } else {
        for (const itemId of forgeItemIds) {
          const item = ITEMS[itemId];
          if (!item) continue;
          const slot = item.slot || 'other';
          if (!slotGroups[slot]) slotGroups[slot] = [];
          const isBonus = bonusIds.includes(itemId);
          slotGroups[slot].push({ id: itemId, item, isBonus, waterCost: 0 });
        }
      }
      const structIdx = G.structures.indexOf(struct);
      const pRes = G.players[G.currentPlayer].resources;
      for (const slot of EQUIP_SLOTS) {
        if (!slotGroups[slot]) continue;
        html += `<div style="font-size:10px;color:#888;padding:2px 4px;margin-top:3px;border-bottom:1px solid #333;">${SLOT_LABELS[slot]}</div>`;
        for (const entry of slotGroups[slot]) {
          const item = entry.item;
          const statStr = itemStatString(item);
          const waterCost = entry.waterCost || 0;
          const canAffordWater = !isAdvancedForge || (pRes.water >= waterCost);
          const canCraft = adjacentUnit && (isAdvancedForge ? canAffordWater : (!forgeUsed && canAffordWater));
          html += `<div class="inv-item" style="margin-bottom:2px;">
            <div>
              <span class="item-name" data-tip="${item.description || ''}">${entry.isBonus ? '<span style=\"color:#DAA520;\">★</span> ' : ''}${item.name}${itemTypeTag(item)}</span>
              <span class="item-stats">${statStr}${isAdvancedForge ? ` | ${waterCost} 💧` : ''}</span>
            </div>
            <div style="display:flex;align-items:center;gap:4px;margin-top:1px;">
              ${adjacentUnit ? `<button class="btn-tiny ${canCraft ? 'btn-success' : ''}" ${canCraft ? '' : 'disabled'} onclick="${isAdvancedForge ? `forgeAdvancedItem(${adjacentUnit.id}, ${structIdx}, '${entry.id}')` : `forgeItem(${adjacentUnit.id}, ${structIdx}, '${entry.id}')`}" style="font-size:10px;">Craft</button>` : ''}
            </div>
          </div>`;
        }
      }
      html += `</div>`;
    }
    if (struct.type === 'armory' && struct.playerId === G.currentPlayer) {
      const selUnit = selectedUnitId != null ? getUnit(selectedUnitId) : null;
      const adjacentUnit = (selUnit && selUnit.hp > 0 && selUnit.playerId === G.currentPlayer &&
        (isAdjacent(selUnit.x, selUnit.y, struct.x, struct.y) || (selUnit.x === struct.x && selUnit.y === struct.y)))
        ? selUnit
        : G.units.find(u =>
          u.hp > 0 && u.playerId === G.currentPlayer &&
          (isAdjacent(u.x, u.y, struct.x, struct.y) || (u.x === struct.x && u.y === struct.y))
        );
      const structIdx = G.structures.indexOf(struct);
      const currentTier = adjacentUnit ? getUnitArmorTier(adjacentUnit) : 0;
      const nextTier = Math.min(4, currentTier + 1);
      const waterCost = adjacentUnit ? 10 + ((adjacentUnit.armorProficiencyBonus || 0) * 4) : 10;
      const canAffordWater = (G.players[G.currentPlayer].resources.water || 0) >= waterCost;
      html += `<div style="border-top:1px solid #555;margin-top:4px;padding-top:4px;">`;
      if (adjacentUnit) html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Training: <b>${getDisplayName(adjacentUnit)}</b></div>`;
      html += `<div style="font-size:12px;color:#39c;padding:2px 4px;font-weight:bold;">🛡 Armor Training</div>`;
      if (!adjacentUnit) {
        html += `<div style="font-size:10px;color:#c44;padding:4px;font-style:italic;">Move a unit adjacent to the armory to improve their armor training.</div>`;
      } else {
        html += `<div style="font-size:10px;color:#888;padding:2px 4px;">Current tier: ${currentTier} → ${nextTier} (${waterCost} 💧)</div>`;
        if (currentTier >= 4) {
          html += `<div style="font-size:10px;color:#888;padding:2px 4px;font-style:italic;">This unit already has access to the heaviest armor available.</div>`;
        } else {
          html += `<div style="display:flex;align-items:center;gap:4px;margin-top:4px;">
            <button class="btn-tiny ${canAffordWater ? 'btn-success' : ''}" ${canAffordWater ? '' : 'disabled'} onclick="armoryUpgradeArmor(${adjacentUnit.id}, ${structIdx})" style="font-size:10px;">Upgrade</button>
          </div>`;
        }
      }
      html += `</div>`;
    }
    if (struct.type === 'enchanter' && struct.playerId === G.currentPlayer) {
      const selUnit = selectedUnitId != null ? getUnit(selectedUnitId) : null;
      const adjacentUnit = (selUnit && selUnit.hp > 0 && selUnit.playerId === G.currentPlayer &&
        (isAdjacent(selUnit.x, selUnit.y, struct.x, struct.y) || (selUnit.x === struct.x && selUnit.y === struct.y)))
        ? selUnit
        : G.units.find(u =>
          u.hp > 0 && u.playerId === G.currentPlayer &&
          (isAdjacent(u.x, u.y, struct.x, struct.y) || (u.x === struct.x && u.y === struct.y))
        );
      const structIdx = G.structures.indexOf(struct);
      const waterCost = 20;
      const canAffordWater = (G.players[G.currentPlayer].resources.water || 0) >= waterCost;
      const enchantableItems = [];
      if (adjacentUnit) {
        for (const slot of getUnitEquipSlots(adjacentUnit)) {
          const item = adjacentUnit.equipment && adjacentUnit.equipment[slot];
          if (item && !item.enchanted && (item.weaponType || item.armorType)) enchantableItems.push({ slot, item, isEquipped: true });
        }
        for (let i = 0; i < (adjacentUnit.inventory || []).length; i++) {
          const item = adjacentUnit.inventory[i];
          if (item && !item.enchanted && (item.weaponType || item.armorType)) enchantableItems.push({ index: i, item, isEquipped: false });
        }
      }
      html += `<div style="border-top:1px solid #555;margin-top:4px;padding-top:4px;">`;
      if (adjacentUnit) html += `<div style="font-size:11px;color:#aaa;padding:2px 4px;">Enchanter: <b>${getDisplayName(adjacentUnit)}</b></div>`;
      html += `<div style="font-size:12px;color:#DAA520;padding:2px 4px;font-weight:bold;">✧ Enchant Weapon or Armor</div>`;
      if (!adjacentUnit) {
        html += `<div style="font-size:10px;color:#c44;padding:4px;font-style:italic;">Move a unit adjacent to the enchanter to enchant their gear.</div>`;
      } else if (enchantableItems.length === 0) {
        html += `<div style="font-size:10px;color:#888;padding:4px;font-style:italic;">This unit has no eligible weapon or armor to enchant.</div>`;
      } else {
        html += `<div style="font-size:10px;color:#888;padding:2px 4px;">Cost: ${waterCost} 💧 per enchantment. Each item may only be enchanted once.</div>`;
        for (const entry of enchantableItems) {
          const item = entry.item;
          const statStr = itemStatString(item);
          html += `<div class="inv-item" style="margin-bottom:4px;">
            <div>
              <span class="item-name" data-tip="${item.description || ''}">${item.name}${itemTypeTag(item)}</span>
              <span class="item-stats">${statStr}</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:2px;">
              ${['attack','defense','str','agi','con','int'].map(stat => `<button class="btn-tiny ${canAffordWater ? 'btn-success' : ''}" ${canAffordWater ? '' : 'disabled'} onclick="enchantItemStat(${adjacentUnit.id}, ${structIdx}, '${entry.isEquipped ? 'equip:' + entry.slot : 'inv:' + entry.index}', '${stat}')" style="font-size:10px;">+1 ${stat.toUpperCase()}</button>`).join('')}
            </div>
          </div>`;
        }
      }
      html += `</div>`;
    }
    info.innerHTML = html;
    return;
  }

  // Ground item inspection
  if (selectedGroundTile) {
    const items = (G.groundItems || []).filter(gi => gi.x === selectedGroundTile.x && gi.y === selectedGroundTile.y);
    if (items.length === 0) { selectedGroundTile = null; panel.style.display = 'none'; return; }
    panel.style.display = 'block';
    let html = `<div class="unit-name" style="color: #DAA520">Items on ground (${selectedGroundTile.x}, ${selectedGroundTile.y})</div>`;
    for (const gi of items) {
      if (gi.item.consumable) {
        html += `<div class="inv-item">
          <span class="item-name" data-tip="${gi.item.description || ''}">${gi.item.icon || ''} ${gi.item.name}</span>
          <span class="item-stats">(Consumable)</span>
        </div>`;
      } else {
        const statStr = itemStatString(gi.item);
        html += `<div class="inv-item">
          <span class="item-name" data-tip="${gi.item.description || ''}">${gi.item.name}${itemTypeTag(gi.item)}</span>
          <span class="item-stats">(${SLOT_LABELS[gi.item.slot]}) ${statStr}</span>
        </div>`;
      }
      if (gi.item.description) html += `<div style="font-size:10px;color:#555;padding:0 4px 2px;font-style:italic;">${gi.item.description}</div>`;
    }
    info.innerHTML = html;
    return;
  }

  if (!selectedUnitId && selectedUnitId !== 0) { panel.style.display = 'none'; return; }
  const u = getUnit(selectedUnitId);
  if (!u) { panel.style.display = 'none'; return; }

  panel.style.display = 'block';
  const stats = getUnitStats(u);
  const isOwned = u.playerId === G.currentPlayer;
  const unitColor = u.playerId === NPC_PLAYER_ID ? BEAST_COLOR : PLAYER_COLORS[u.playerId];
  const ownerName = u.playerId === NPC_PLAYER_ID ? 'Wild' : G.players[u.playerId].name;

  let html = `
    <div class="unit-name" style="color: ${unitColor}">${getDisplayName(u)} (${ownerName})${isOwned ? ` <button class="btn-tiny" onclick="renameUnit(${u.id})" style="margin-left:6px;font-size:10px;vertical-align:middle;">✏ Rename</button>` : ''}</div>
    <div class="stat-grid">
      <div class="info-row"><span class="label" data-tip="Hit Points. Unit dies at 0.">HP</span><span>${u.hp} / ${stats.maxHp}</span></div>
      <div class="info-row"><span class="label" data-tip="Spaces this unit can move per turn.">Move</span><span>${u.movementLeft} / ${stats.movement}</span></div>
      <div class="info-row"><span class="label" data-tip="${USE_NEW_COMBAT ? 'Attack power. Each attack rolls to hit, then rolls to wound. Higher ATK makes both rolls easier. ATK also determines wound damage.' : 'Attack power. Rolled as D6 + ATK + 2 vs enemy D6 + DEF. Damage = difference (min 1 on hit).'}">ATK</span><span>${stats.attack}</span></div>
      <div class="info-row"><span class="label" data-tip="${USE_NEW_COMBAT ? 'Defense power. Higher DEF makes enemies less likely to hit you and harder to wound you. Strong armor can turn hits into glancing blows.' : 'Defense power. Enemy rolls D6 + ATK + 2 vs your D6 + DEF. Higher DEF reduces incoming damage.'}">DEF</span><span>${stats.defense}</span></div>
      <div class="info-row"><span class="label" data-tip="Attack range in tiles. 1 = melee (adjacent only).">Range</span><span>${stats.attackRange > 1 ? stats.attackRange + ' (ranged)' : '1 (melee)'}</span></div>
    </div>
    <div class="stat-grid" style="margin-top:2px;">
      <div class="info-row"><span class="label" data-tip="Strength — +1 ATK per point. ${stats.crushChance}% Crushing Blow chance (deals +2 bonus damage on hit). Weight threshold raised to ${6 + Math.floor(stats.str / 2)} (base 6 + half STR).">STR</span><span>${stats.str}${stats.crushChance > 0 ? ` <span style='color:#c44;font-size:10px'>(${stats.crushChance}% crush)</span>` : ''}</span></div>
      <div class="info-row"><span class="label" data-tip="Agility — +1 movement per 3 points. ${stats.dodgeChance}% Dodge chance (completely negates an incoming attack, capped at 22%).">AGI</span><span>${stats.agi}${stats.dodgeChance > 0 ? ` <span style='color:#4a4;font-size:10px'>(${stats.dodgeChance}% dodge)</span>` : ''}</span></div>
      <div class="info-row"><span class="label" data-tip="Constitution — +2 max HP per point.">CON</span><span>${stats.con}</span></div>
      <div class="info-row"><span class="label" data-tip="Intelligence — ${stats.critChance}% Critical Hit chance (1.5× damage). +1 DEF per 3 points (tactical awareness). +1 gather yield per 2 points.">INT</span><span>${stats.int}${stats.critChance > 0 ? ` <span style='color:#48f;font-size:10px'>(${stats.critChance}% crit)</span>` : ''}</span></div>
      <div class="info-row"><span class="label" data-tip="Total equipment weight. Above ${6 + Math.floor(stats.str / 2)}, every 2 weight costs −1 movement (min 2 move).">Weight</span><span>${stats.weight}</span></div>
      <div class="info-row"><span class="label" data-tip="Chance to combat lock an enemy on melee hit, preventing them from moving for 1 turn. Base 20% + item bonuses.">Lock%</span><span>${stats.combatLockChance}%${stats.combatLockChance > 20 ? ` <span style='color:#f80;font-size:10px'>(+${stats.combatLockChance - 20}%)</span>` : ''}</span></div>
      <div class="info-row"><span class="label">Type</span><span>${u.typeLabel || capitalize(u.type)}</span></div>
    </div>`;

  // Hero ability info
  if (u.type === 'hero') {
    const heroData = getHeroData(u);
    if (heroData && heroData.ability) {
      let abilityHtml = `<div class="info-row"><span class="label" data-tip="${heroData.ability.desc}">Ability</span><span style="color:#DAA520;font-size:11px;">★ ${heroData.ability.name}</span></div>`;
      if (heroData.ability2) {
        abilityHtml += `<div class="info-row"><span class="label" data-tip="${heroData.ability2.desc}">Ability 2</span><span style="color:#DAA520;font-size:11px;">★ ${heroData.ability2.name}</span></div>`;
      }
      html += `<div class="stat-grid" style="margin-top:2px;">${abilityHtml}</div>`;
    }
  }

  // Status effects
  if (u.statusEffects && u.statusEffects.length > 0) {
    html += `<div class="stat-grid" style="margin-top:2px;"><div class="equip-header" style="color:#c44;">Status Effects</div>`;
    for (const se of u.statusEffects) {
      const eff = STATUS_EFFECTS[se.id];
      if (eff) {
        const stackText = (eff.stackable && se.stacks > 0) ? ` x${se.stacks}` : '';
        html += `<div class="info-row"><span class="label" style="color:${eff.color}" data-tip="${eff.desc}">${eff.icon} ${eff.name}${stackText}</span><span>${se.turnsLeft} turn${se.turnsLeft > 1 ? 's' : ''}</span></div>`;
      }
    }
    html += `</div>`;
  }

  // Passives
  const unitPassives = getUnitPassives(u);
  // Check for bardic auras from nearby allies
  const bardicAuras = [];
  const allUnitsForAura = (G && G.units) ? G.units : [];
  for (const ally of allUnitsForAura) {
    if (ally.hp > 0 && ally.id !== u.id && ally.playerId === u.playerId &&
        chebyshevDist(u.x, u.y, ally.x, ally.y) <= 3) {
      if (hasPassive(ally, 'bardic_inspiration')) bardicAuras.push({ id: 'bardic_inspiration', source: getDisplayName(ally) });
      if (hasPassive(ally, 'bardic_dance')) bardicAuras.push({ id: 'bardic_dance', source: getDisplayName(ally) });
      if (hasPassive(ally, 'bardic_range')) bardicAuras.push({ id: 'bardic_range', source: getDisplayName(ally) });
      if (hasPassive(ally, 'bardic_wisdom')) bardicAuras.push({ id: 'bardic_wisdom', source: getDisplayName(ally) });
      if (hasPassive(ally, 'trollblood_aura')) bardicAuras.push({ id: 'combat_regeneration', source: getDisplayName(ally) });
    }
  }
  // Self trollblood aura: show combat regen on the shaman itself
  if (hasPassive(u, 'trollblood_aura')) {
    bardicAuras.push({ id: 'combat_regeneration', source: getDisplayName(u) + ' (self)' });
  }
  // Enchanting Song: show shared passives from adjacent allies with enchanting_song
  for (const ally of allUnitsForAura) {
    if (ally.hp > 0 && ally.id !== u.id && ally.playerId === u.playerId &&
        isAdjacent(u.x, u.y, ally.x, ally.y) && hasPassive(ally, 'enchanting_song')) {
      ally._enchantingSongCheck = true;
      const allyPassives = getUnitPassives(ally);
      delete ally._enchantingSongCheck;
      for (const p of allyPassives) {
        if (p !== 'enchanting_song' && !unitPassives.has(p)) {
          bardicAuras.push({ id: p, source: getDisplayName(ally) });
        }
      }
    }
  }
  // Check for discordant auras from nearby enemies
  const discordantAuras = [];
  for (const enemy of allUnitsForAura) {
    if (enemy.hp > 0 && enemy.playerId !== u.playerId &&
        chebyshevDist(u.x, u.y, enemy.x, enemy.y) <= 3) {
      if (hasPassive(enemy, 'discordant_aura')) discordantAuras.push({ id: 'discordant_aura', source: getDisplayName(enemy) });
    }
  }
  // Check for Seized status (within enemy seizing totem radius)
  const seizingTotemAuras = [];
  for (const t of allUnitsForAura) {
    if (t.hp > 0 && t.type === 'seizing_totem' && t.playerId !== u.playerId &&
        chebyshevDist(u.x, u.y, t.x, t.y) <= 2) {
      seizingTotemAuras.push({ source: getDisplayName(t) });
    }
  }
  if (unitPassives.size > 0 || bardicAuras.length > 0 || discordantAuras.length > 0 || seizingTotemAuras.length > 0) {
    html += `<div class="stat-grid" style="margin-top:2px;"><div class="equip-header" style="color:#6a6;">Passives</div>`;
    for (const pid of unitPassives) {
      const pd = PASSIVES[pid];
      if (pd) {
        let passiveLabel = `${pd.icon} ${pd.name}`;
        if (pid === 'bulwark') {
          const stacks = countPassive(u, 'bulwark');
          if (stacks > 0) passiveLabel += ` (${stacks})`;
        }
        if (pid === 'haste') {
          const stacks = countPassive(u, 'haste');
          if (stacks > 1) passiveLabel += ` (${stacks})`;
        }
        if (pid === 'evasion') {
          const stacks = countPassive(u, 'evasion');
          if (stacks > 1) passiveLabel += ` (${stacks})`;
        }
        if (pid === 'piercing') {
          const stacks = countPassive(u, 'piercing');
          if (stacks > 1) passiveLabel += ` (${stacks})`;
        }
        if (pid === 'thorns') {
          const stacks = countPassive(u, 'thorns');
          if (stacks > 1) passiveLabel += ` (${stacks})`;
        }
        if (pid === 'regeneration') {
          const stacks = countPassive(u, 'regeneration');
          if (stacks > 1) passiveLabel += ` (${Math.min(3, stacks)})`;
        }
        if (pid === 'combat_regeneration') {
          const stacks = countPassive(u, 'combat_regeneration');
          if (stacks > 1) passiveLabel += ` (${Math.min(3, stacks)})`;
        }
        if (pid === 'heavy_handed') {
          const stacks = countPassive(u, 'heavy_handed');
          if (stacks > 1) passiveLabel += ` (${stacks})`;
        }
        if (pid === 'precision') {
          const stacks = countPassive(u, 'precision');
          if (stacks > 1) passiveLabel += ` (${stacks})`;
        }
        if (pid === 'hungering_soul') {
          const sbStacks = u.soulBarricadeStacks || 0;
          passiveLabel += ` (${sbStacks}/5)`;
        }
        if (pid === 'hunger') {
          const satStacks = u.satiationStacks || 0;
          passiveLabel += ` (${satStacks} Satiation)`;
        }
        if (pid === 'momentum') {
          const mBonus = Math.floor((u.tilesMoved || 0) / 3);
          passiveLabel += ` (+${mBonus} ATK)`;
        }
        if (pid === 'ballistics_training') {
          const btRange = getSniperShotRange(u);
          passiveLabel += ` (Range ${btRange})`;
        }
        if (pid === 'steady_bombardment') {
          passiveLabel += u.steadyBombardment ? ' (ACTIVE)' : ' (Inactive)';
        }
        html += `<div class="info-row"><span class="label" style="color:#6a6" data-tip="${pd.desc}">${passiveLabel}</span></div>`;
      }
    }
    for (const aura of bardicAuras) {
      const pd = PASSIVES[aura.id];
      if (pd) {
        const safeSrc = aura.source.replace(/"/g, '&quot;');
        html += `<div class="info-row"><span class="label" style="color:#da2" data-tip="${pd.desc} (from ${safeSrc})">${pd.icon} ${pd.name}</span><span style="font-size:10px;color:#aa8;">♪ ${aura.source}</span></div>`;
      }
    }
    for (const aura of discordantAuras) {
      const pd = PASSIVES[aura.id];
      if (pd) {
        const safeSrc = aura.source.replace(/"/g, '&quot;');
        html += `<div class="info-row"><span class="label" style="color:#d55" data-tip="${pd.desc} (from ${safeSrc})">${pd.icon} ${pd.name}</span><span style="font-size:10px;color:#a66;">⚠ ${aura.source}</span></div>`;
      }
    }
    for (const seized of seizingTotemAuras) {
      const safeSrc = seized.source.replace(/"/g, '&quot;');
      html += `<div class="info-row"><span class="label" style="color:#d55" data-tip="Cannot move outside the Seizing Totem's radius (from ${safeSrc})">⌘ Seized</span><span style="font-size:10px;color:#a66;">⚠ ${seized.source}</span></div>`;
    }
    html += `</div>`;
  }

  // Equipment section
  const unitSlots = getUnitEquipSlots(u);
  // Show proficiencies if defined
  const prof = getUnitProficiencies(u);
  if (prof) {
    const fmtType = t => t.startsWith('1h_') ? '1H ' + t.slice(3).charAt(0).toUpperCase() + t.slice(4) : t.startsWith('2h_') ? '2H ' + t.slice(3).charAt(0).toUpperCase() + t.slice(4) : t.charAt(0).toUpperCase() + t.slice(1);
    const wepStr = prof.weapons && prof.weapons.length > 0 ? prof.weapons.map(fmtType).join(', ') : 'None';
    const armStr = prof.armor && prof.armor.length > 0 ? prof.armor.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ') : 'None';
    html += `<div class="prof-tip-wrap" style="position:relative;display:inline-block;margin:4px 0 2px 0;">
      <span class="prof-label" style="font-size:13px;color:#DAA520;cursor:default;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">📜 Proficiencies</span>
      <div class="prof-tooltip"><span style="color:#c93;">⚔ Weapons:</span> ${wepStr}<br><span style="color:#39c;">🛡 Armor:</span> ${armStr}</div>
    </div>`;
  }
  html += `<div class="equip-section"><div class="equip-header">Equipment</div>`;
  for (const slot of unitSlots) {
    // Skip blocked slots (e.g. Magnate can't wear armor) but show severed slots
    const isSevered = u.severedSlots && u.severedSlots.includes(slot);
    if (isSlotBlocked(u, slot) && !isSevered) continue;
    if (isSevered) {
      html += `<div class="equip-slot"><span class="label">${SLOT_LABELS[slot]}:</span> <span class="empty-slot" style="color:#CC0000;">— SEVERED —</span></div>`;
      continue;
    }
    const item = u.equipment[slot];
    if (item && item !== '_two_handed_') {
      const statStr = itemStatString(item);
      const twoHandTag = item.twoHanded ? ' <span class="two-hand-tag">[2H]</span>' : '';
      const elementTag = item.elementalCycle ? (() => { const p = item.elementalPhase || 0; return [' <span style="color:#6cf">(❄️ Freeze)</span>', ' <span style="color:#f84">(🔥 Burning)</span>', ' <span style="color:#ff0">(⚡ Lightning)</span>'][p]; })() : '';
      const isAppraising = interactionMode === 'appraise_destroy' && isOwned && item.passives && item.passives.length > 0;
      html += `<div class="equip-slot">
        <span class="label">${SLOT_LABELS[slot]}:</span>
        <span class="item-name" data-tip="${item.description || ''}">${item.name}${itemTypeTag(item)}${twoHandTag}${elementTag}</span>
        <span class="item-stats">${statStr}</span>
        ${isAppraising ? `<button class="btn-tiny" style="background:#a33;" onclick="appraiseDestroyEquip(${u.id}, '${slot}')">Destroy</button>` : ''}
        ${isOwned && !item.cursed ? `<button class="btn-tiny" onclick="unequipItem(${u.id}, '${slot}')">✕</button>` : ''}
      </div>`;
    } else if (item === '_two_handed_') {
      html += `<div class="equip-slot"><span class="label">${SLOT_LABELS[slot]}:</span> <span class="empty-slot">— (2H weapon) —</span></div>`;
    } else {
      html += `<div class="equip-slot"><span class="label">${SLOT_LABELS[slot]}:</span> <span class="empty-slot">— Empty —</span></div>`;
    }
  }
  html += `</div>`;

  // Inventory section
  if (u.inventory.length > 0 || isOwned) {
    html += `<div class="inv-section"><div class="equip-header">Inventory (${u.inventory.length})</div>`;
    if (u.inventory.length === 0) {
      html += `<div class="empty-slot">No items</div>`;
    }
    for (let i = 0; i < u.inventory.length; i++) {
      const item = u.inventory[i];
      const isMirrorActive = mirrorPending && mirrorPending.unitId === u.id;
      const isThisMirror = isMirrorActive && mirrorPending.idx === i;
      const unitInCombat = isOwned && isInCombat(u);
      if (item.consumable) {
        let buttons = '';
        if (isOwned) {
          if (isThisMirror) {
            buttons = `<button class="btn-tiny" style="background:#853;" onclick="cancelMirror()">Cancel</button>`;
          } else if (isMirrorActive) {
            buttons = `<button class="btn-tiny" style="background:#538;" onclick="mirrorCopyItem(${u.id}, ${i})">Copy</button>`;
          } else if (item.passive) {
            buttons = unitInCombat ? `<button class="btn-tiny" disabled title="In combat!">Drop</button>` : `<button class="btn-tiny" onclick="dropItem(${u.id}, ${i})">Drop</button>`;
          } else {
            const dropBtn = unitInCombat ? `<button class="btn-tiny" disabled title="In combat!">Drop</button>` : `<button class="btn-tiny" onclick="dropItem(${u.id}, ${i})">Drop</button>`;
            buttons = `<button class="btn-tiny" style="background:#185;" onclick="useConsumable(${u.id}, ${i})">Use</button>
            ${dropBtn}`;
          }
        }
        html += `<div class="inv-item">
          <span class="item-name" data-tip="${item.description || ''}">${item.icon || '🧪'} ${item.name}</span>
          <span class="item-stats">(${item.passive ? 'Passive' : 'Consumable'})</span>
          <span class="inv-buttons">${buttons}</span>
        </div>`;
      } else {
        const statStr = itemStatString(item);
        let buttons = '';
        if (isOwned) {
          const dropBtnEquip = unitInCombat ? `<button class="btn-tiny" disabled title="In combat!">Drop</button>` : `<button class="btn-tiny" onclick="dropItem(${u.id}, ${i})">Drop</button>`;
          const profOk = canUseProficiency(u, item);
          const equipBtn = profOk
            ? `<button class="btn-tiny" onclick="equipItem(${u.id}, ${i})">Equip</button>`
            : `<button class="btn-tiny" disabled title="Not proficient with ${item.weaponType || item.armorType}" style="opacity:0.4">Equip</button>`;
          if (interactionMode === 'appraise_destroy' && item.passives && item.passives.length > 0) {
            buttons = `<button class="btn-tiny" style="background:#a33;" onclick="appraiseDestroyInv(${u.id}, ${i})">Destroy</button>
            ${equipBtn}
            ${dropBtnEquip}`;
          } else if (isMirrorActive) {
            buttons = `<button class="btn-tiny" style="background:#538;" onclick="mirrorCopyItem(${u.id}, ${i})">Copy</button>`;
          } else {
            buttons = `${equipBtn}
            ${dropBtnEquip}`;
          }
        }
        html += `<div class="inv-item">
          <span class="item-name" data-tip="${item.description || ''}">${item.name}${itemTypeTag(item)}</span>
          <span class="item-stats">(${SLOT_LABELS[item.slot]}) ${statStr}</span>
          <span class="inv-buttons">${buttons}</span>
        </div>`;
      }
    }
    html += `</div>`;
  }

  // Morph UI: stat reallocation panel
  if (interactionMode === 'morph' && isOwned && u.type === 'hero') {
    if (!window._morphState || window._morphState.unitId !== u.id) {
      const itemBonus = (typeof u.morphPointBudget === 'number')
        ? getEquippedCoreStatBonus(u)
        : { str: 0, agi: 0, con: 0, int: 0 };
      const baseBudget = (typeof u.morphPointBudget === 'number')
        ? u.morphPointBudget
        : (u.str + u.agi + u.con + u.int);
      const effectiveBudget = baseBudget + itemBonus.str + itemBonus.agi + itemBonus.con + itemBonus.int;
      window._morphState = {
        unitId: u.id,
        stats: {
          str: u.str + itemBonus.str,
          agi: u.agi + itemBonus.agi,
          con: u.con + itemBonus.con,
          int: u.int + itemBonus.int
        },
        original: {
          str: u.str + itemBonus.str,
          agi: u.agi + itemBonus.agi,
          con: u.con + itemBonus.con,
          int: u.int + itemBonus.int
        },
        minStats: { ...itemBonus },
        itemBonus,
        budget: effectiveBudget
      };
    }
    const ms = window._morphState;
    const totalOrig = ms.budget;
    const totalNow = ms.stats.str + ms.stats.agi + ms.stats.con + ms.stats.int;
    const pool = totalOrig - totalNow;
    const statLabels = { str: 'STR', agi: 'AGI', con: 'CON', int: 'INT' };
    html += `<div class="stat-grid" style="margin-top:6px;border:2px solid #48f;padding:6px;border-radius:4px;background:#112;">`;
    html += `<div class="equip-header" style="color:#48f;">🔄 Morph — Reallocate Stats</div>`;
    html += `<div class="info-row"><span class="label" style="color:#ff0;">Unspent Points</span><span style="color:#ff0;font-weight:bold;">${pool}</span></div>`;
    for (const [key, label] of Object.entries(statLabels)) {
      const val = ms.stats[key];
      const orig = ms.original[key];
      const min = ms.minStats[key] || 0;
      const diff = val - orig;
      const diffStr = diff > 0 ? ` <span style='color:#4f4;'>+${diff}</span>` : diff < 0 ? ` <span style='color:#f44;'>${diff}</span>` : '';
      html += `<div class="info-row" style="display:flex;align-items:center;justify-content:space-between;">
        <span class="label">${label}</span>
        <span style="display:flex;align-items:center;gap:4px;">
          <button class="btn-tiny" onclick="morphAdjust('${key}', -1)" ${val <= min ? 'disabled' : ''}>−</button>
          <span style="min-width:24px;text-align:center;">${val}${diffStr}</span>
          <button class="btn-tiny" onclick="morphAdjust('${key}', 1)" ${pool <= 0 ? 'disabled' : ''}>+</button>
        </span>
      </div>`;
    }
    html += `<div style="display:flex;gap:6px;margin-top:6px;">`;
    html += `<button class="btn-tiny" onclick="morphConfirm()" ${pool !== 0 ? 'disabled title="Spend all points first"' : ''} style="flex:1;background:#2a6;color:#fff;padding:4px 8px;">✔ Confirm</button>`;
    html += `<button class="btn-tiny" onclick="morphCancel()" style="flex:1;padding:4px 8px;">✖ Cancel</button>`;
    html += `</div></div>`;
  }

  info.innerHTML = html;
}

// --- Morph ability helpers ---
function morphAdjust(stat, delta) {
  if (!window._morphState) return;
  const ms = window._morphState;
  const totalOrig = ms.budget;
  const totalNow = ms.stats.str + ms.stats.agi + ms.stats.con + ms.stats.int;
  const pool = totalOrig - totalNow;
  if (delta > 0 && pool <= 0) return;
  const min = (ms.minStats && ms.minStats[stat] !== undefined) ? ms.minStats[stat] : 0;
  if (delta < 0 && ms.stats[stat] <= min) return;
  ms.stats[stat] += delta;
  renderUnitPanel();
}

function morphConfirm() {
  if (!window._morphState) return;
  const ms = window._morphState;
  const u = getUnit(ms.unitId);
  if (!u) return;
  const totalOrig = ms.budget;
  const totalNow = ms.stats.str + ms.stats.agi + ms.stats.con + ms.stats.int;
  if (totalNow !== totalOrig) return; // must spend all points
  const itemBonus = ms.itemBonus || { str: 0, agi: 0, con: 0, int: 0 };
  u.str = Math.max(0, ms.stats.str - itemBonus.str);
  u.agi = Math.max(0, ms.stats.agi - itemBonus.agi);
  u.con = Math.max(0, ms.stats.con - itemBonus.con);
  u.int = Math.max(0, ms.stats.int - itemBonus.int);
  // Recalculate HP (CON changes affect maxHp)
  const stats = getUnitStats(u);
  if (u.hp > stats.maxHp) u.hp = stats.maxHp;
  // Mark ability used this turn
  startAbilityCooldown(u, 'morph');
  addLog(`🔄 ${getDisplayName(u)} morphs! Stats reallocated.`);
  window._morphState = null;
  interactionMode = 'idle';
  renderAll();
}

function morphCancel() {
  window._morphState = null;
  interactionMode = 'idle';
  renderAll();
}

function getActionHotkeyNumber(event) {
  const key = event.key;
  if (key >= '1' && key <= '9') return Number(key);
  if (key.startsWith('Numpad')) {
    const num = key.slice('Numpad'.length);
    if (num >= '1' && num <= '9') return Number(num);
  }
  return null;
}

function cycleSelectedUnit(direction = 1) {
  const ownedUnits = (G.units || [])
    .filter(u => u.hp > 0 && u.playerId === G.currentPlayer)
    .sort((a, b) => a.id - b.id);

  if (ownedUnits.length === 0) {
    selectedUnitId = null;
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }

  if (selectedUnitId == null || !ownedUnits.some(u => u.id === selectedUnitId)) {
    selectedUnitId = ownedUnits[0].id;
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }

  const currentIndex = ownedUnits.findIndex(u => u.id === selectedUnitId);
  const nextIndex = (currentIndex + direction + ownedUnits.length) % ownedUnits.length;
  selectedUnitId = ownedUnits[nextIndex].id;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

function handleUnitActionHotkey(event) {
  if (event.defaultPrevented) return;
  const target = event.target;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) return;

  if (event.key === 'Tab') {
    event.preventDefault();
    event.stopPropagation();
    cycleSelectedUnit(event.shiftKey ? -1 : 1);
    return;
  }

  const hotkeyIndex = getActionHotkeyNumber(event);
  if (hotkeyIndex == null) return;

  const panel = document.getElementById('actions-panel');
  const list = document.getElementById('actions-list');
  if (!panel || panel.style.display !== 'block' || !list) return;

  const buttons = Array.from(list.querySelectorAll('button.btn.btn-small'));
  const targetButton = buttons.find(btn => btn.dataset.hotkey === String(hotkeyIndex));
  if (!targetButton || targetButton.disabled || !targetButton.onclick) return;

  event.preventDefault();
  event.stopPropagation();
  targetButton.click();
}

document.addEventListener('keydown', handleUnitActionHotkey);

function renderActionsPanel() {
  const panel = document.getElementById('actions-panel');
  const list = document.getElementById('actions-list');
  const u = getUnit(selectedUnitId);

  if (!u || u.playerId !== G.currentPlayer) {
    panel.style.display = 'none';
    return;
  }

  panel.style.display = 'block';
  list.innerHTML = '';

  const stats = getUnitStats(u);

  // Move
  if (u.movementLeft > 0) {
    addAction(list, 'Move', 'Select destination', () => {
      interactionMode = 'move';
      reachableTiles = getReachableTiles(u);
      renderBoard();
    }, interactionMode === 'move');
  }

  // Attack
  if (u.canFight && !u.hasAttacked && !u.stunned && !stats.noAttack && !hasStatusEffect(u, 'beguiled') && hasAttackTargetInRange(u)) {
    const rng = stats.attackRange || 1;
    addAction(list, 'Attack', rng > 1 ? `Select enemy in range ${rng}` : 'Select adjacent enemy', () => {
      interactionMode = 'attack';
      renderBoard();
    }, interactionMode === 'attack');
  }

  // Rest (heal 3-4 HP, costs 1 water, requires 7+ distance from player enemies, uses entire turn)
  const nearestPlayerEnemy = G.units
    .filter(e => e.hp > 0 && e.playerId !== u.playerId && e.playerId !== NPC_PLAYER_ID)
    .reduce((min, e) => Math.min(min, chebyshevDist(u.x, u.y, e.x, e.y)), Infinity);
  const playerRes = G.players[G.currentPlayer].resources;
  if (nearestPlayerEnemy >= 7 && u.hp < stats.maxHp && u.movementLeft === stats.movement && !u.hasAttacked && !u.hasGathered && playerRes.water >= 1) {
    addAction(list, 'Rest', `Heal 3-4 HP (1 💧, ends turn)${u.severedSlots && u.severedSlots.length > 0 ? ' — also regenerates severed limbs!' : ''}`, () => {
      const heal = 3 + Math.floor(Math.random() * 2); // 3 or 4
      const oldHp = u.hp;
      u.hp = Math.min(stats.maxHp, u.hp + heal);
      const healed = u.hp - oldHp;
      playerRes.water -= 1;
      u.movementLeft = 0;
      u.hasAttacked = true;
      u.hasGathered = true;
      addLog(`💤 ${getDisplayName(u)} rests and heals ${healed} HP. (${u.hp}/${stats.maxHp})`);
      // Shamble On: Rest regenerates all severed limbs
      if (u.severedSlots && u.severedSlots.length > 0) {
        const restored = u.severedSlots.map(s => SLOT_LABELS[s] || s).join(', ');
        u.severedSlots = [];
        addLog(`🧟 ${getDisplayName(u)} regenerates lost limbs! (${restored} restored)`);
      }
      renderAll();
    });
  }

  // Gather (canGather flag or resource_gathering passive or mimic_gather)
  if ((u.canGather || hasPassive(u, 'resource_gathering') || u.mimicGather) && !u.hasGathered && !u.hasPlacedWallThisTurn && !hasStatusEffect(u, 'on_strike') && getAdjacentResources(u).length > 0) {
    const gatherHint = u.type === 'worker' ? 'Select resource (gather 1)' : `Select resource (bonus +${stats.gatherBonus})`;
    addAction(list, 'Gather', gatherHint, () => {
      interactionMode = 'gather';
      renderBoard();
    }, interactionMode === 'gather');
  }

  // Place Wall (workers only, up to 2 per turn; cannot place after gathering)
  if (u.canGather && !u.hasGathered && !hasStatusEffect(u, 'on_strike')) {
    const placementsLeft = u.wallPlacementsLeft != null ? u.wallPlacementsLeft : WALL_PLACEMENTS_PER_TURN;
    const nearbyEnemy = hasNearbyEnemyPlayerUnit(u.playerId, u.x, u.y, WALL_ENEMY_PROXIMITY_RADIUS);
    const validWallTiles = getValidWallPlacementTiles(u);
    if ((playerRes.wall || 0) >= 1 && placementsLeft > 0 && !nearbyEnemy && validWallTiles.length > 0) {
      addAction(list, 'Place Wall', `Place adjacent wall (${placementsLeft} left this turn)`, () => {
        interactionMode = 'place_wall';
        reachableTiles = validWallTiles;
        renderBoard();
      }, interactionMode === 'place_wall');
    } else {
      let reason = 'No valid tile';
      if ((playerRes.wall || 0) < 1) reason = 'Need 1 Wall';
      else if (placementsLeft <= 0) reason = 'No placements left';
      else if (nearbyEnemy) reason = `Enemy within ${WALL_ENEMY_PROXIMITY_RADIUS} tiles`;
      addAction(list, 'Place Wall', '', null, false, reason);
    }
  }

  // Build Town Hall (workers only, adjacent empty tile, costs resources)
  if (u.canGather && !u.hasGathered) {
    const thCost = getStructureBuildCost('town_hall');
    const pRes = G.players[G.currentPlayer].resources;
    const canAffordTH = RESOURCE_TYPES.every(r => (pRes[r] || 0) >= (thCost[r] || 0));
    const costLabel = RESOURCE_TYPES.filter(r => thCost[r] > 0).map(r => `${thCost[r]} ${capitalize(r)}`).join(', ');
    // Check for at least one valid adjacent tile
    const hasAdjacentSpace = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]].some(([dx,dy]) => {
      const nx = u.x + dx, ny = u.y + dy;
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) return false;
      if (G.board[ny][nx]) return false;
      if (G.units.some(o => o.hp > 0 && o.x === nx && o.y === ny)) return false;
      if (G.structures && G.structures.some(s => s.x === nx && s.y === ny)) return false;
      return true;
    });
    if (hasAdjacentSpace) {
      if (canAffordTH) {
        addAction(list, 'Build Town Hall', `Place adjacent (${costLabel})`, () => {
          interactionMode = 'build_town_hall';
          renderBoard();
        }, interactionMode === 'build_town_hall');
      } else {
        addAction(list, 'Build Town Hall', '', null, false, `Need ${costLabel}`);
      }
    }
  }

  // Pick Up ground items
  if (getAdjacentGroundItems(u).length > 0) {
    addAction(list, 'Pick Up', '', () => {
      openPickupOverlay(u);
    });
  }

  // Use Tunnel (any kobold unit standing on a tunnel entrance)
  if (u.faction === 'kobolds' && G.tunnels && G.tunnels.length === 2 && u.movementLeft > 0) {
    const myTunnel = G.tunnels.find(t => t.x === u.x && t.y === u.y && t.playerId === u.playerId);
    if (myTunnel) {
      const otherTunnel = G.tunnels.find(t => t.playerId === u.playerId && t.label !== myTunnel.label);
      if (otherTunnel) {
        const tunCdLeft = getAbilityCooldownRemaining(u, 'use_tunnel');
        if (tunCdLeft > 0) {
          addAction(list, 'Use Tunnel', '', null, false, `${tunCdLeft} turn${tunCdLeft > 1 ? 's' : ''} CD`);
        } else {
          const occupied = G.units.some(o => o.hp > 0 && o.x === otherTunnel.x && o.y === otherTunnel.y);
          const barrelBlocked = G.barrels && G.barrels.some(b => b.x === otherTunnel.x && b.y === otherTunnel.y);
          if (!occupied && !barrelBlocked) {
            addAction(list, 'Use Tunnel', `Travel to Tunnel ${otherTunnel.label}`, () => {
              executeTunnelTravel(u, otherTunnel);
            });
          } else {
            addAction(list, 'Use Tunnel', '', null, false, 'Exit blocked');
          }
        }
      }
    }
  }

  // Item-granted actions (blocked when beguiled or already used an item action)
  const isBeguiled = hasStatusEffect(u, 'beguiled');
  for (const action of stats.actions) {
    const itemCdLeft = getAbilityCooldownRemaining(u, action);
    if (isBeguiled) {
      addAction(list, action.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), '', null, false, '🎵 Beguiled');
      continue;
    }
    if (u.hasUsedItemAction && ITEM_ACTION_IDS.has(action) && !hasPassive(u, 'multi_action')) {
      addAction(list, action.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), '', null, false, 'Action Used');
      continue;
    }
    if (action === 'double_strike' && u.canFight && hasEnemyInRange(u)) {
      if (isAbilityReady(u, 'double_strike')) {
        addAction(list, 'Double Strike', 'Attack without spending action', () => {
          interactionMode = 'double_strike';
          renderBoard();
        }, interactionMode === 'double_strike');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Double Strike', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'teleport_home') {
      if (hasStatusEffect(u, 'combat_locked')) {
        addAction(list, 'Teleport Home', '', null, false, '🔒 Locked');
      } else if (isAbilityReady(u, 'teleport_home')) {
        addAction(list, 'Teleport Home', 'Return to starting area', () => {
          executeTeleportHome(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Teleport Home', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'war_stomp') {
      if (isAbilityReady(u, 'war_stomp') && hasAdjacentEnemy(u)) {
        addAction(list, 'War Stomp', 'Push adjacent enemies 1 tile away', () => {
          executeWarStomp(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'War Stomp', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'heal_allies') {
      if (isAbilityReady(u, 'heal_allies') && hasAdjacentAlly(u)) {
        addAction(list, 'Heal Allies', 'Restore 3 HP to adjacent allies', () => {
          executeHealAllies(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Heal Allies', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'crescendo') {
      if (isAbilityReady(u, 'crescendo')) {
        addAction(list, 'Crescendo', '+4 ATK to allies within 3 tiles', () => {
          executeCrescendo(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Crescendo', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'battle_march') {
      if (isAbilityReady(u, 'battle_march')) {
        addAction(list, 'Battle March', '+3 movement to allies within 2 tiles', () => {
          executeBattleMarch(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Battle March', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'berserk') {
      if (isAbilityReady(u, 'berserk')) {
        addAction(list, 'Berserk', '+5 ATK, -3 DEF for 2 turns', () => {
          executeBerserk(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Berserk', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'blink') {
      if (isAbilityReady(u, 'blink')) {
        addAction(list, 'Blink', 'Teleport up to 3 tiles (ignores walls & combat lock)', () => {
          interactionMode = 'blink';
          renderBoard();
        }, interactionMode === 'blink');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Blink', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'smoke_bomb') {
      if (isAbilityReady(u, 'smoke_bomb')) {
        addAction(list, 'Smoke Bomb', 'Deploy smoke for 3 turns (blocks ranged targeting)', () => {
          executeSmokeBomb(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Smoke Bomb', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'corrupted_chalice') {
      const hasAdjAlly = G.units.some(a => a.hp > 0 && a.id !== u.id && a.playerId === u.playerId && isAdjacent(u.x, u.y, a.x, a.y));
      if (isAbilityReady(u, 'corrupted_chalice') && hasAdjAlly && u.hp > 5) {
        addAction(list, 'Corrupted Chalice', 'Sacrifice 5 HP to heal adjacent ally for 5 HP', () => {
          interactionMode = 'corrupted_chalice';
          renderBoard();
        }, interactionMode === 'corrupted_chalice');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Corrupted Chalice', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      } else if (u.hp <= 5) {
        addAction(list, 'Corrupted Chalice', 'Not enough HP', null, false, 'Low HP');
      }
    }
    if (action === 'bottled_lightning') {
      const hasTarget = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 2);
      if (isAbilityReady(u, 'bottled_lightning') && hasTarget) {
        addAction(list, 'Bottled Lightning', 'Deal 3 dmg to enemy within 2 tiles, chain 2 dmg to adjacent enemy', () => {
          interactionMode = 'bottled_lightning';
          renderBoard();
        }, interactionMode === 'bottled_lightning');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Bottled Lightning', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'voodoo_doll') {
      const hasDebuffs = u.statusEffects && u.statusEffects.some(se => ['poison','burning','bleeding','weakened','slowed','frozen','cursed','shattered','sundered','ensnared','hexed','combat_locked','beguiled'].includes(se.id));
      const hasTarget = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 3);
      if (isAbilityReady(u, 'voodoo_doll') && hasDebuffs && hasTarget) {
        addAction(list, 'Voodoo Doll', 'Transfer all your debuffs onto an enemy within 3 tiles', () => {
          interactionMode = 'voodoo_doll';
          renderBoard();
        }, interactionMode === 'voodoo_doll');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Voodoo Doll', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      } else if (!hasDebuffs) {
        addAction(list, 'Voodoo Doll', 'No debuffs to transfer', null, false, 'No debuffs');
      }
    }
    if (action === 'fireball') {
      if (isAbilityReady(u, 'fireball') && hasEnemyInRange(u)) {
        addAction(list, 'Fireball', 'AoE fire (4 dmg + splash + Burning)', () => {
          interactionMode = 'fireball';
          renderBoard();
        }, interactionMode === 'fireball');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Fireball', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'frost_ray') {
      if (isAbilityReady(u, 'frost_ray') && hasEnemyInRange(u)) {
        addAction(list, 'Frost Ray', 'Frost damage + Freeze', () => {
          interactionMode = 'frost_ray';
          renderBoard();
        }, interactionMode === 'frost_ray');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Frost Ray', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'lightning_bolt') {
      if (isAbilityReady(u, 'lightning_bolt') && hasEnemyInRange(u)) {
        addAction(list, 'Lightning Bolt', 'Long range damage + Slow', () => {
          interactionMode = 'lightning_bolt';
          renderBoard();
        }, interactionMode === 'lightning_bolt');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Lightning Bolt', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'life_drain') {
      if (isAbilityReady(u, 'life_drain') && hasEnemyInRange(u)) {
        addAction(list, 'Life Drain', 'Damage + heal self', () => {
          interactionMode = 'life_drain';
          renderBoard();
        }, interactionMode === 'life_drain');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Life Drain', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'poison_cloud') {
      if (isAbilityReady(u, 'poison_cloud')) {
        const nearbyEnemies = G.units.filter(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 2);
        if (nearbyEnemies.length > 0) {
          addAction(list, 'Poison Cloud', 'AoE poison (range 2)', () => {
            executePoisonCloud(u);
          });
        }
      } else if (itemCdLeft > 0) {
        addAction(list, 'Poison Cloud', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'battle_cry') {
      if (isAbilityReady(u, 'battle_cry')) {
        addAction(list, 'Battle Cry', '+2 ATK to self & adjacent allies (2 turns)', () => {
          executeBattleCry(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Battle Cry', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'detonate') {
      if (isAbilityReady(u, 'detonate')) {
        addAction(list, 'Detonate', 'Kill self + 10 damage to all within 3 tiles', () => {
          if (confirm('Are you sure? This will KILL this unit!')) {
            executeDetonate(u);
          }
        });
      }
    }
    if (action === 'precision_shot') {
      if (isAbilityReady(u, 'precision_shot') && hasEnemyInRange(u) && stats.attackRange > 1) {
        addAction(list, 'Precision Shot', 'Guaranteed ranged hit (ranged weapons only)', () => {
          interactionMode = 'precision_shot';
          renderBoard();
        }, interactionMode === 'precision_shot');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Precision Shot', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      } else if (stats.attackRange <= 1) {
        addAction(list, 'Precision Shot', 'Requires ranged weapon', null, false, 'No ranged wpn');
      }
    }
    if (action === 'grapple') {
      if (isAbilityReady(u, 'grapple')) {
        const hasGrappleTarget = G.units.some(t =>
          t.hp > 0 && t.id !== u.id &&
          chebyshevDist(u.x, u.y, t.x, t.y) >= 2 &&
          chebyshevDist(u.x, u.y, t.x, t.y) <= 5 &&
          hasLineOfSight(u.x, u.y, t.x, t.y)
        );
        if (hasGrappleTarget) {
          addAction(list, 'Grapple', 'Pull any unit 2-5 tiles away to you', () => {
            interactionMode = 'grapple';
            renderBoard();
          }, interactionMode === 'grapple');
        }
      } else if (itemCdLeft > 0) {
        addAction(list, 'Grapple', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'ensnare') {
      if (isAbilityReady(u, 'ensnare')) {
        const hasEnsnareTarget = G.units.some(t =>
          t.hp > 0 && t.playerId !== u.playerId &&
          chebyshevDist(u.x, u.y, t.x, t.y) <= 3 &&
          hasLineOfSight(u.x, u.y, t.x, t.y)
        );
        if (hasEnsnareTarget) {
          addAction(list, 'Ensnare', 'Immobilize an enemy within 3 tiles for 2 turns', () => {
            interactionMode = 'ensnare';
            renderBoard();
          }, interactionMode === 'ensnare');
        }
      } else if (itemCdLeft > 0) {
        addAction(list, 'Ensnare', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'grab') {
      if (isAbilityReady(u, 'grab') && hasAdjacentEnemy(u)) {
        addAction(list, 'Grab', 'Combat lock an adjacent enemy for 1 turn', () => {
          interactionMode = 'grab';
          renderBoard();
        }, interactionMode === 'grab');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Grab', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'divine_barrier') {
      if (isAbilityReady(u, 'divine_barrier')) {
        addAction(list, 'Divine Barrier', 'Gain 10 temporary HP for 3 turns', () => {
          executeDivineBarrier(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Divine Barrier', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'fish') {
      const adjWater = getAdjacentResources(u).filter(r => r.res.type === 'water');
      if (isAbilityReady(u, 'fish') && adjWater.length > 0) {
        addAction(list, 'Fish', 'Catch a Fresh Fish from adjacent water', () => {
          interactionMode = 'fish';
          renderBoard();
        }, interactionMode === 'fish');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Fish', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'summon_pooka') {
      if (isAbilityReady(u, 'summon_pooka')) {
        addAction(list, 'Summon Pooka', 'Summon a powerful Pooka ally on adjacent tile', () => {
          executeSummonPooka(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Summon Pooka', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'summon_zombie') {
      if (isAbilityReady(u, 'summon_zombie')) {
        addAction(list, 'Summon Zombie', 'Summon a Zombie Warrior on adjacent tile', () => {
          executeSummonZombie(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Summon Zombie', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'runic_conjure') {
      if (isAbilityReady(u, 'runic_conjure')) {
        addAction(list, 'Runic Conjure', 'Generate a random consumable', () => {
          executeRunicConjure(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Runic Conjure', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'curse_hex') {
      if (isAbilityReady(u, 'curse_hex') && hasEnemyInRange(u)) {
        addAction(list, 'Curse Hex', 'Curse a target (no damage)', () => {
          interactionMode = 'curse_hex';
          renderBoard();
        }, interactionMode === 'curse_hex');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Curse Hex', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'lethargy') {
      if (isAbilityReady(u, 'lethargy') && hasEnemyInRange(u)) {
        addAction(list, 'Lethargy', 'Slow a target (no damage)', () => {
          interactionMode = 'lethargy';
          renderBoard();
        }, interactionMode === 'lethargy');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Lethargy', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'flash_freeze') {
      if (isAbilityReady(u, 'flash_freeze') && hasEnemyInRange(u)) {
        addAction(list, 'Flash Freeze', 'Freeze a target (no damage)', () => {
          interactionMode = 'flash_freeze';
          renderBoard();
        }, interactionMode === 'flash_freeze');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Flash Freeze', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'enfeeble') {
      if (isAbilityReady(u, 'enfeeble') && hasEnemyInRange(u)) {
        addAction(list, 'Enfeeble', 'Weaken a target (no damage)', () => {
          interactionMode = 'enfeeble';
          renderBoard();
        }, interactionMode === 'enfeeble');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Enfeeble', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'gore_curse') {
      if (isAbilityReady(u, 'gore_curse') && hasEnemyInRange(u)) {
        addAction(list, 'Gore Curse', 'Inflict bleeding on a target (no damage)', () => {
          interactionMode = 'gore_curse';
          renderBoard();
        }, interactionMode === 'gore_curse');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Gore Curse', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'pistol_shot') {
      const pistolTargets = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 3 && hasLineOfSight(u.x, u.y, e.x, e.y));
      if (isAbilityReady(u, 'pistol_shot') && pistolTargets && u.canFight) {
        addAction(list, 'Pistol Shot', 'Free action: fire at an enemy within 3 tiles for 3 damage', () => {
          interactionMode = 'pistol_shot';
          renderBoard();
        }, interactionMode === 'pistol_shot');
      } else if (itemCdLeft > 0) {
        addAction(list, 'Pistol Shot', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'giant_shot') {
      if (isAbilityReady(u, 'giant_shot') && u.canFight) {
        const giantRange = stats.attackRange || 4;
        const giantTargets = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= giantRange && hasLineOfSight(u.x, u.y, e.x, e.y));
        if (giantTargets) {
          addAction(list, 'Giant Shot', 'Fire massive arrow dealing STR damage', () => {
            interactionMode = 'giant_shot';
            renderBoard();
          }, interactionMode === 'giant_shot');
        }
      } else if (itemCdLeft > 0) {
        addAction(list, 'Giant Shot', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
      }
    }
    if (action === 'boomerang_throw') {
      if (!u.hasAttacked && G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 4 && isOnStraightLine(u.x, u.y, e.x, e.y) && hasLineOfSight(u.x, u.y, e.x, e.y))) {
        addAction(list, 'Boomerang Throw', 'Hit all enemies in a line (up to 4 tiles)', () => {
          interactionMode = 'boomerang_throw';
          renderBoard();
        }, interactionMode === 'boomerang_throw');
      }
    }
  }

  // Hero racial ability
  if (u.type === 'hero' && u.faction) {
    const heroData = getHeroData(u);
    const ability = heroData ? heroData.ability : null;
    if (ability) {
      const heroCdLeft = getAbilityCooldownRemaining(u, ability.id);
      const heroReady = isAbilityReady(u, ability.id);
      if (hasStatusEffect(u, 'beguiled')) {
        addAction(list, ability.name, '', null, false, '🎵 Beguiled');
      } else if (!heroReady && heroCdLeft > 0) {
        // Show greyed-out button with cooldown
        addAction(list, ability.name, '', null, false, `${heroCdLeft} turn${heroCdLeft > 1 ? 's' : ''} CD`);
      } else if (heroReady) {
      if (ability.id === 'goblin_disengage') {
          // Legacy: disengage is now the 'slippery' passive
      }
      if (ability.id === 'shadowstep') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'shadowstep';
          renderBoard();
        }, interactionMode === 'shadowstep');
      }
      if (ability.id === 'human_rally' && hasAdjacentAlly(u)) {
        addAction(list, ability.name, ability.desc, () => {
          executeRally(u);
        });
      }
      if (ability.id === 'mirror_image' && !u.isMirrorImage) {
        // Only usable if there's an adjacent empty tile (mirror images cannot cast this)
        const dirs8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
        const hasEmptyAdj = dirs8.some(([dx,dy]) => {
          const nx = u.x + dx, ny = u.y + dy;
          if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) return false;
          if (G.units.some(o => o.hp > 0 && o.x === nx && o.y === ny)) return false;
          const cell = G.board[ny][nx];
          if (cell && cell.type && cell.amount > 0) return false;
          return true;
        });
        if (hasEmptyAdj) {
          addAction(list, ability.name, ability.desc, () => {
            executeMirrorImage(u);
          });
        }
      }
      if (ability.id === 'consecrate') {
        addAction(list, ability.name, ability.desc, () => {
          executeConsecrate(u);
        });
      }
      if (ability.id === 'elf_leap') {
        if (hasStatusEffect(u, 'combat_locked')) {
          addAction(list, ability.name, '', null, false, '🔒 Locked');
        } else {
          const leapTiles = getLeapTiles(u);
          if (leapTiles.length > 0) {
            addAction(list, ability.name, ability.desc, () => {
              interactionMode = 'leap';
              reachableTiles = leapTiles;
              renderBoard();
            }, interactionMode === 'leap');
          }
        }
      }
      if (ability.id === 'orc_warcry' && hasAdjacentEnemy(u)) {
        addAction(list, ability.name, ability.desc, () => {
          executeWarCry(u);
        });
      }
      if (ability.id === 'bloodrend') {
        // Only show if there's an adjacent bleeding enemy
        const hasBleedingEnemy = G.units.some(e =>
          e.hp > 0 && e.playerId !== u.playerId && isAdjacent(u.x, u.y, e.x, e.y) && hasStatusEffect(e, 'bleeding')
        );
        if (hasBleedingEnemy) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'bloodrend';
            renderBoard();
          }, interactionMode === 'bloodrend');
        }
      }
      if (ability.id === 'dwarf_muster') {
        addAction(list, ability.name, ability.desc, () => {
          u.musterActive = true;
          startAbilityCooldown(u, 'dwarf_muster');
          addLog(`⛏ ${getDisplayName(u)} rallies the forge! New units can spawn near the hero this turn.`);
          renderAll();
        });
      }
      // --- New hero abilities ---
      if (ability.id === 'hex_curse') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'hex_curse';
          renderBoard();
        }, interactionMode === 'hex_curse');
      }
      if (ability.id === 'summon_swarm' && hasAdjacentEnemy(u)) {
        addAction(list, ability.name, ability.desc, () => {
          executeSummonSwarm(u);
        });
      }
      if (ability.id === 'divine_shield') {
        addAction(list, ability.name, ability.desc, () => {
          executeDivineShield(u);
        });
      }
      if (ability.id === 'aimed_shot' && hasEnemyInRange(u)) {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'aimed_shot';
          renderBoard();
        }, interactionMode === 'aimed_shot');
      }
      if (ability.id === 'harpoon_shot') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'harpoon_shot';
          renderBoard();
        }, interactionMode === 'harpoon_shot');
      }
      if (ability.id === 'arcane_blast') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'arcane_blast';
          renderBoard();
        }, interactionMode === 'arcane_blast');
      }
      if (ability.id === 'blade_dance' && hasAdjacentEnemy(u)) {
        addAction(list, ability.name, ability.desc, () => {
          executeBladeDance(u);
        });
      }
      if (ability.id === 'blood_frenzy') {
        addAction(list, ability.name, ability.desc, () => {
          executeBloodFrenzy(u);
        });
      }
      if (ability.id === 'tame_beast') {
        // Only show if there's an adjacent NPC beast and no existing tamed beast
        const hasAdjacentBeast = G.units.some(b => b.hp > 0 && b.playerId === NPC_PLAYER_ID && (b.type === 'beast' || b.type === 'warg' || b.type === 'hydra') && isAdjacent(u.x, u.y, b.x, b.y));
        const alreadyHasTamed = G.units.some(b => b.hp > 0 && (b.type === 'beast' || b.type === 'warg' || b.type === 'hydra') && b.playerId === u.playerId && b.tamedBy === u.id);
        if (hasAdjacentBeast && !alreadyHasTamed) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'tame_beast';
            renderBoard();
          }, interactionMode === 'tame_beast');
        }
      }
      if (ability.id === 'shield_bash') {
        const sbTarget = G.units.find(e => e.hp > 0 && e.playerId !== u.playerId && isAdjacent(u.x, u.y, e.x, e.y));
        if (sbTarget) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'shield_bash';
            renderBoard();
          }, interactionMode === 'shield_bash');
        }
      }
      if (ability.id === 'rune_of_shatter' && hasAdjacentEnemy(u)) {
        addAction(list, ability.name, ability.desc, () => {
          executeRuneOfShatter(u);
        });
      }
      // --- Skeleton abilities ---
      if (ability.id === 'raise_dead') {
        addAction(list, ability.name, ability.desc, () => {
          executeRaiseDead(u);
        });
      }
      if (ability.id === 'soul_siphon') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'soul_siphon';
          renderBoard();
        }, interactionMode === 'soul_siphon');
      }
      if (ability.id === 'bone_explosion' && hasAdjacentAlly(u)) {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'bone_explosion';
          renderBoard();
        }, interactionMode === 'bone_explosion');
      }
      // --- Troll abilities ---
      if (ability.id === 'devour') {
        // Usable if there's an adjacent enemy below 25% HP OR an adjacent ally
        const devourTarget = G.units.find(e =>
          e.hp > 0 && isAdjacent(u.x, u.y, e.x, e.y) && e.id !== u.id &&
          ((e.playerId !== u.playerId && e.hp <= getUnitStats(e).maxHp * 0.25) || e.playerId === u.playerId)
        );
        if (devourTarget) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'devour';
            renderBoard();
          }, interactionMode === 'devour');
        }
      }
      if (ability.id === 'troll_rampage') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'troll_rampage';
          renderBoard();
        }, interactionMode === 'troll_rampage');
      }
      if (ability.id === 'trolls_blessing') {
        addAction(list, ability.name, ability.desc, () => {
          executeTrollsBlessing(u);
        });
      }
      if (ability.id === 'seizing_totem') {
        // Only show Place if no totem already exists for this unit
        const existingTotem = G.units.find(t => t.hp > 0 && t.type === 'seizing_totem' && t.summonerId === u.id);
        if (existingTotem) {
          // Show Retrieve Totem instead
          if (isAdjacent(u.x, u.y, existingTotem.x, existingTotem.y)) {
            addAction(list, '⌘ Retrieve Totem', 'Pick up your Seizing Totem', () => {
              executeRetrieveTotem(u, existingTotem);
            });
          } else {
            addAction(list, '⌘ Retrieve Totem', '', null, false, 'Not adjacent');
          }
        } else {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'seizing_totem';
            renderBoard();
          }, interactionMode === 'seizing_totem');
        }
      }
      // --- Bard abilities ---
      if (ability.id === 'crescendo') {
        addAction(list, ability.name, ability.desc, () => {
          executeCrescendo(u);
        });
      }
      if (ability.id === 'battle_march') {
        addAction(list, ability.name, ability.desc, () => {
          executeBattleMarch(u);
        });
      }
      if (ability.id === 'mimic' && !u.mimickedAbility) {
        // Mimic: select adjacent enemy to copy their last ability
        const hasAdjacentWithAbility = G.units.some(t => t.hp > 0 && t.id !== u.id && t.playerId !== u.playerId && isAdjacent(u.x, u.y, t.x, t.y) && t.lastAbilityUsed);
        if (hasAdjacentWithAbility) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'mimic';
            renderBoard();
          }, interactionMode === 'mimic');
        }
      }
      if (ability.id === 'cadence_of_haste' && hasAdjacentAlly(u)) {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'cadence_of_haste';
          renderBoard();
        }, interactionMode === 'cadence_of_haste');
      }
      if (ability.id === 'lullaby' && hasAdjacentEnemy(u)) {
        addAction(list, ability.name, ability.desc, () => {
          executeLullaby(u);
        });
      }
      // --- Kobold abilities ---
      if (ability.id === 'tunnel_a') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'tunnel_a';
          renderBoard();
        }, interactionMode === 'tunnel_a');
      }
      if (ability.id === 'scavenge') {
        addAction(list, ability.name, ability.desc, () => {
          executeScavenge(u);
        });
      }
      if (ability.id === 'booby_trap') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'booby_trap';
          renderBoard();
        }, interactionMode === 'booby_trap');
      }
      // --- Nomad abilities ---
      if (ability.id === 'forge_barrel') {
        addAction(list, ability.name, ability.desc, () => {
          executeForgeBarrel(u);
        });
      }
      if (ability.id === 'poisonous_shiv') {
        const hasAdjEnemy = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && isAdjacent(u.x, u.y, e.x, e.y));
        if (hasAdjEnemy) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'poisonous_shiv';
            renderBoard();
          }, interactionMode === 'poisonous_shiv');
        }
      }
      if (ability.id === 'rescue') {
        const hasAllyAnywhere = G.units.some(a => a.hp > 0 && a.id !== u.id && a.playerId === u.playerId);
        if (hasAllyAnywhere) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'rescue';
            renderBoard();
          }, interactionMode === 'rescue');
        }
      }
      // --- Trade Guild abilities ---
      if (ability.id === 'bounty_mark') {
        const hasVisibleEnemy = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && hasLineOfSight(u.x, u.y, e.x, e.y));
        if (hasVisibleEnemy) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'bounty_mark';
            renderBoard();
          }, interactionMode === 'bounty_mark');
        }
      }
      if (ability.id === 'appraise_destroy') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'appraise_destroy';
          renderAll();
        }, interactionMode === 'appraise_destroy');
      }
      // --- Ogre abilities ---
      if (ability.id === 'ogre_throw') {
        const hasAdjacentUnit = G.units.some(t => t.hp > 0 && t.id !== u.id && isAdjacent(u.x, u.y, t.x, t.y));
        if (hasAdjacentUnit) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'ogre_throw_select';
            renderBoard();
          }, interactionMode === 'ogre_throw_select' || interactionMode === 'ogre_throw_dest');
        }
      }
      if (ability.id === 'static_discharge') {
        const charges = u.staticCharges || 0;
        if (charges > 0) {
          const hasTarget = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 3);
          if (hasTarget) {
            addAction(list, `${ability.name} (${charges}⚡)`, ability.desc, () => {
              interactionMode = 'static_discharge';
              renderBoard();
            }, interactionMode === 'static_discharge');
          } else {
            addAction(list, `${ability.name} (${charges}⚡)`, '', null, false, 'No target');
          }
        } else {
          addAction(list, ability.name, '', null, false, '0 charges');
        }
      }
      // --- Merfolk abilities ---
      if (ability.id === 'morph') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'morph';
          renderAll();
        }, interactionMode === 'morph');
      }
      // --- Gnome abilities ---
      if (ability.id === 'sniper_shot') {
        if (!hasEquippedRangedWeapon(u)) {
          addAction(list, ability.name, ability.desc, null, false, 'Needs ranged weapon');
        } else {
          const sniperRange = getSniperShotRange(u);
          const hasTarget = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= sniperRange && hasLineOfSight(u.x, u.y, e.x, e.y) && !isConcealedBySmoke(e));
          if (hasTarget) {
            addAction(list, ability.name, ability.desc, () => {
              interactionMode = 'sniper_shot';
              renderBoard();
            }, interactionMode === 'sniper_shot');
          }
        }
      }
      if (ability.id === 'mortar_strike') {
        const mortarRange = 4;
        const hasTarget = G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= mortarRange);
        if (hasTarget) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'mortar_strike';
            renderBoard();
          }, interactionMode === 'mortar_strike');
        }
      }
      } // end heroReady
    }

    // Second ability (ability2) — e.g. Saboteur's Tunnel Entrance B
    const ability2 = heroData ? heroData.ability2 : null;
    if (ability2) {
      const cd2Left = getAbilityCooldownRemaining(u, ability2.id);
      const ready2 = isAbilityReady(u, ability2.id);
      if (hasStatusEffect(u, 'beguiled')) {
        addAction(list, ability2.name, '', null, false, '🎵 Beguiled');
      } else if (!ready2 && cd2Left > 0) {
        addAction(list, ability2.name, '', null, false, `${cd2Left} turn${cd2Left > 1 ? 's' : ''} CD`);
      } else if (ready2) {
        if (ability2.id === 'tunnel_b') {
          // Only enable if tunnel A already exists for this player
          const hasA = G.tunnels && G.tunnels.some(t => t.playerId === u.playerId && t.label === 'A');
          if (hasA) {
            addAction(list, ability2.name, ability2.desc, () => {
              interactionMode = 'tunnel_b';
              renderBoard();
            }, interactionMode === 'tunnel_b');
          } else {
            addAction(list, ability2.name, '', null, false, 'Need A first');
          }
        }
        if (ability2.id === 'camouflage') {
          if (u.camouflaged) {
            addAction(list, ability2.name, '', null, false, 'Active');
          } else {
            addAction(list, ability2.name, ability2.desc, () => {
              executeCamouflage(u);
            });
          }
        }
      }
    }
  }

  // Hunger passive: show Digest if unit has Satiation stacks (outside heroReady check)
  if (u.type === 'hero' && hasPassive(u, 'hunger') && (u.satiationStacks || 0) > 0 && !u.hasAttacked) {
    addAction(list, '🍖 Digest', `Clear all ${u.satiationStacks} Satiation stacks (restore lost AGI/MVT, lose bonus HP/STR)`, () => {
      executeDigest(u);
    });
  }

  // Show mimicked ability (persists across turns, outside heroReady check)
  if (u.type === 'hero' && u.mimickedAbility) {
    const ma = u.mimickedAbility;
    addAction(list, `🎭 ${ma.name}`, `Mimicked ability (use it to consume)`, () => {
      executeMimickedAbility(u);
    });
  }

  // Browse Shop (if adjacent to any shop)
  if (G.shops) {
    for (const shop of G.shops) {
      if ((isAdjacent(u.x, u.y, shop.x, shop.y) || (u.x === shop.x && u.y === shop.y)) && shop.items.length > 0) {
        addAction(list, '$ Browse Shop', `${shop.items.length} item${shop.items.length > 1 ? 's' : ''} for sale (${shop.x},${shop.y})`, () => {
          selectedShop = shop;
          selectedVendor = null;
          selectedBazaar = null;
          selectedUnitId = u.id;
          renderUnitPanel();
          renderActionsPanel();
        });
      }
    }
  }

  // Browse Vendor (if adjacent to any vendor)
  if (G.vendors) {
    for (const vendor of G.vendors) {
      if ((isAdjacent(u.x, u.y, vendor.x, vendor.y) || (u.x === vendor.x && u.y === vendor.y)) && vendor.items.length > 0) {
        addAction(list, '☂ Browse Vendor', `${vendor.items.length} consumable${vendor.items.length > 1 ? 's' : ''} for sale (${vendor.x},${vendor.y})`, () => {
          selectedVendor = vendor;
          selectedShop = null;
          selectedBazaar = null;
          selectedStructure = null;
          selectedUnitId = u.id;
          renderUnitPanel();
          renderActionsPanel();
        });
      }
    }
  }

  // Browse Bazaar (if adjacent to any bazaar)
  if (G.bazaars) {
    for (const bazaar of G.bazaars) {
      if (isAdjacent(u.x, u.y, bazaar.x, bazaar.y) || (u.x === bazaar.x && u.y === bazaar.y)) {
        addAction(list, '🏪 Browse Bazaar', `Trade resources (${bazaar.x},${bazaar.y})`, () => {
          selectedBazaar = bazaar;
          selectedShop = null;
          selectedVendor = null;
          selectedStructure = null;
          selectedUnitId = u.id;
          renderUnitPanel();
          renderActionsPanel();
        });
      }
    }
  }

  // Deselect
  addAction(list, 'Deselect', '', () => {
    deselectUnit();
  });
}

function addAction(container, label, desc, fn, isActive, cooldownInfo) {
  const btn = document.createElement('button');
  btn.className = 'btn btn-small' + (isActive ? ' btn-success' : '');
  const actionIndex = container.querySelectorAll('button.btn.btn-small').length + 1;
  const hotkeyLabel = actionIndex <= 9 ? `<span style="color:#12304a;font-weight:700;text-shadow:0 0 1px rgba(255,255,255,0.8);font-size:10px;margin-right:4px;">[${actionIndex}]</span>` : '';
  btn.dataset.hotkey = actionIndex <= 9 ? String(actionIndex) : '';
  const cdTag = cooldownInfo ? ` <span style="color:#c44;font-size:10px;">(${cooldownInfo})</span>` : '';
  btn.innerHTML = `${hotkeyLabel}${hotkeyLabel ? ' ' : ''}${label}${cdTag}${desc ? ` <span style="color:#888;font-size:10px;">${desc}</span>` : ''}`;
  if (cooldownInfo) {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'not-allowed';
  } else {
    btn.onclick = fn;
  }
  container.appendChild(btn);
}

function convertStoneToWallFromProduction() {
  const p = G.players[G.currentPlayer];
  if (!p || !p.resources) return;
  if ((p.resources.stone || 0) < 1) return;
  p.resources.stone -= 1;
  p.resources.wall = (p.resources.wall || 0) + WALLS_PER_STONE_CONVERSION;
  addLog(`🧱 ${p.name} converts 1 Stone into ${WALLS_PER_STONE_CONVERSION} Wall.`);
  renderAll();
}

function setProductionTab(tab) {
  if (tab !== 'buildings' && tab !== 'units') return;
  if (productionTab === tab) return;
  productionTab = tab;
  renderProduction();
}

function renderProduction() {
  const container = document.getElementById('production-list');
  const p = G.players[G.currentPlayer];
  container.innerHTML = '';

  // Can't produce units until faction is chosen
  if (!p.faction) {
    container.innerHTML = '<div style="color:#888;padding:8px;font-style:italic;">Choose a faction first...</div>';
    return;
  }

  const faction = FACTIONS[p.faction];
  const tabWrap = document.createElement('div');
  tabWrap.className = 'prod-tabs';
  tabWrap.innerHTML = `
    <button class="prod-tab-btn ${productionTab === 'buildings' ? 'active' : ''}" id="prod-tab-buildings">Buildings</button>
    <button class="prod-tab-btn ${productionTab === 'units' ? 'active' : ''}" id="prod-tab-units">Units</button>
  `;
  container.appendChild(tabWrap);
  tabWrap.querySelector('#prod-tab-buildings').onclick = () => setProductionTab('buildings');
  tabWrap.querySelector('#prod-tab-units').onclick = () => setProductionTab('units');

  const list = document.createElement('div');
  list.className = 'prod-tab-content';
  container.appendChild(list);

  if (productionTab === 'buildings') {
    // --- Structure building options ---
    for (const [sType, sDef] of Object.entries(STRUCTURE_DEFS)) {
      const canAfford = canAffordStructure(p, sType);
      const structureCost = getStructureBuildCost(sType);
      const costStr = RESOURCE_TYPES
        .filter(r => structureCost[r] > 0)
        .map(r => `<span style="color:${RESOURCE_COLORS[r]}">${structureCost[r]} ${capitalize(r)}</span>`)
        .join(', ');

      const structName = (sDef.factionNames && sDef.factionNames[p.faction]) || sDef.name;

      // Build unlock hint for this structure
      let unlockHint = '';
      if (sDef.unlocksUnits && sDef.unlocksUnits.length > 0) {
        const unitNames = sDef.unlocksUnits.map(uType => {
          const override = faction.unitOverrides && faction.unitOverrides[uType] && faction.unitOverrides[uType].name;
          const name = override || (UNIT_DEFS[uType] ? UNIT_DEFS[uType].name : uType);
          return name.endsWith('s') ? name : name + 's';
        });
        unlockHint = `<div style="font-size:10px;color:#AA6622;font-style:italic;">Produces ${unitNames.join(', ')}</div>`;
      } else if (sType === 'well') {
        unlockHint = `<div style="font-size:10px;color:#4682B4;font-style:italic;">Generates +1 Water per turn</div>`;
      } else if (sType === 'advanced_forge') {
        unlockHint = `<div style="font-size:10px;color:#4682B4;font-style:italic;">Spend Water to craft improved basic gear</div>`;
      } else if (sType === 'armory') {
        unlockHint = `<div style="font-size:10px;color:#39c;font-style:italic;">Spend Water to upgrade armor proficiency and unlock heavier armor</div>`;
      } else if (sType === 'enchanter') {
        unlockHint = `<div style="font-size:10px;color:#DAA520;font-style:italic;">Spend Water to enchant gear with +1 to a chosen stat</div>`;
      }

      const div = document.createElement('div');
      div.className = 'prod-item';
      div.innerHTML = `
        <div>
          <div style="color:${canAfford ? '#2F4F2F' : '#808080'}">${faction.prefix} ${structName} <span style="color:${canAfford ? PLAYER_COLORS[G.currentPlayer] : '#808080'}">[${sDef.char}]</span></div>
          <div class="prod-cost">${costStr}</div>
          ${unlockHint}
        </div>
        <button class="btn btn-small ${canAfford ? 'btn-success' : ''}" ${canAfford ? '' : 'disabled'} id="prod-struct-${sType}">Build</button>
      `;
      list.appendChild(div);

      if (canAfford) {
        div.querySelector(`#prod-struct-${sType}`).onclick = () => startStructurePlacement(sType);
      }
    }

    // --- Resource conversion options ---
    const canConvertStoneToWall = (p.resources.stone || 0) >= 1;
    const convertDiv = document.createElement('div');
    convertDiv.className = 'prod-item';
    convertDiv.innerHTML = `
      <div>
        <div style="color:${canConvertStoneToWall ? '#2F4F2F' : '#808080'}">Convert Stone -> Wall <span style="color:${canConvertStoneToWall ? '#6B6B6B' : '#808080'}">[■]</span></div>
        <div class="prod-cost"><span style="color:${RESOURCE_COLORS.stone}">1 Stone</span> -> <span style="color:${RESOURCE_COLORS.wall}">${WALLS_PER_STONE_CONVERSION} Wall</span></div>
        <div style="font-size:10px;color:#666;font-style:italic;">Turns mined stone into buildable wall blocks.</div>
      </div>
      <button class="btn btn-small ${canConvertStoneToWall ? 'btn-success' : ''}" ${canConvertStoneToWall ? '' : 'disabled'} id="prod-convert-stone-wall">Convert</button>
    `;
    list.appendChild(convertDiv);
    if (canConvertStoneToWall) {
      convertDiv.querySelector('#prod-convert-stone-wall').onclick = () => convertStoneToWallFromProduction();
    }
    return;
  }

  // --- Unit production options ---
  let unitsShown = 0;
  for (const [type, def] of Object.entries(UNIT_DEFS)) {
    if (def.npc || def.summon) continue;

    const hasLivingHero = G.units.some(u => u.playerId === G.currentPlayer && u.type === 'hero' && u.hp > 0);
    if (type === 'hero' && hasLivingHero) continue;

    // Gate unit production behind the structure that unlocks this type
    let unitUnlocked = true;
    for (const [sType, sDef] of Object.entries(STRUCTURE_DEFS)) {
      if (sDef.unlocksUnits && sDef.unlocksUnits.includes(type)) {
        const hasStructure = G.structures && G.structures.some(s => s.type === sType && s.playerId === G.currentPlayer);
        if (!hasStructure) {
          unitUnlocked = false;
          break;
        }
      }
    }
    if (!unitUnlocked) continue;

    const canAfford = canAffordUnit(p, type);

    const overrideCost = faction && faction.unitOverrides && faction.unitOverrides[type] && faction.unitOverrides[type].cost;
    const unitCost = overrideCost || def.cost;
    const costStr = RESOURCE_TYPES
      .filter(r => unitCost[r] > 0)
      .map(r => `<span style="color:${RESOURCE_COLORS[r]}">${unitCost[r]} ${capitalize(r)}</span>`)
      .join(', ');

    let buildLabel = type === 'hero' ? 'Resurrect' : 'Build';
    if (type === 'worker') {
      const wCount = G.units.filter(u => u.playerId === G.currentPlayer && u.type === 'worker' && u.hp > 0).length;
      buildLabel = `Build (${wCount}/${WORKER_CAP})`;
    }

    const overrideName = faction && faction.unitOverrides && faction.unitOverrides[type] && faction.unitOverrides[type].name;
    const displayName = overrideName || def.name;

    const div = document.createElement('div');
    div.className = 'prod-item';
    div.innerHTML = `
      <div>
        <div style="color:${canAfford ? '#2F4F2F' : '#808080'}">${faction.prefix} ${displayName} <span style="color:${canAfford ? PLAYER_COLORS[G.currentPlayer] : '#808080'}">[${(faction.chars && faction.chars[type]) || def.char}]</span></div>
        <div class="prod-cost">${costStr}</div>
      </div>
      <button class="btn btn-small ${canAfford ? 'btn-success' : ''}" ${canAfford ? '' : 'disabled'} id="prod-${type}">${buildLabel}</button>
    `;
    list.appendChild(div);
    unitsShown++;

    if (canAfford) {
      div.querySelector(`#prod-${type}`).onclick = () => startPlacement(type);
    }
  }

  if (unitsShown === 0) {
    const emptyState = document.createElement('div');
    emptyState.style.cssText = 'color:#888;padding:8px;font-style:italic;';
    emptyState.textContent = 'No units available yet. Build production structures first.';
    list.appendChild(emptyState);
  }

  // Worker cap notice
  const workerCount = G.units.filter(u => u.playerId === G.currentPlayer && u.type === 'worker' && u.hp > 0).length;
  if (workerCount >= WORKER_CAP) {
    const notice = document.createElement('div');
    notice.style.cssText = 'color:#AA6622;padding:6px 8px;font-style:italic;font-size:12px;border-top:1px solid #3a3a2a;margin-top:4px;';
    notice.textContent = `⚠ Worker cap reached (${WORKER_CAP}/${WORKER_CAP}). Cannot produce more Workers.`;
    list.appendChild(notice);
  }

  // Show notices for missing structures
  const hasTownHall = G.structures && G.structures.some(s => s.type === 'town_hall' && s.playerId === G.currentPlayer);
  if (!hasTownHall) {
    const notice = document.createElement('div');
    notice.style.cssText = 'color:#CC3333;padding:6px 8px;font-style:italic;font-size:12px;border-top:1px solid #3a3a2a;margin-top:4px;';
    notice.textContent = '♜ Town Hall destroyed! Cannot produce Workers. Build a new one with a Worker.';
    list.appendChild(notice);
  }
}

function renderLog() {
  const container = document.getElementById('combat-log');
  container.innerHTML = G.log.slice(-30).map(entry => {
    let cls = 'log-info';
    let inlineStyle = '';
    if (entry.startsWith('---') && entry.includes('turn')) {
      cls = 'log-turn';
      // Find which player's turn this is and use their color
      const pid = G.players.findIndex(p => entry.includes(p.name + "'s turn"));
      if (pid >= 0) {
        const pc = PLAYER_COLORS[pid] || '#444';
        inlineStyle = `style="background:${pc};"`;
      }
    }
    else if (entry.includes('attacks') || entry.includes('damage') || entry.includes('defeated') || entry.includes('Strike') || entry.includes('retaliates')) cls = 'log-combat';
    else if (entry.includes('gather')) cls = 'log-gather';
    else if (entry.includes('produced') || entry.includes('built')) cls = 'log-produce';
    else if (entry.includes('moved') || entry.includes('Teleport')) cls = 'log-move';
    else if (entry.includes('equipped') || entry.includes('unequipped') || entry.includes('dropped') || entry.includes('picked up')) cls = 'log-item';
    return `<div class="log-entry ${cls}" ${inlineStyle}>${entry}</div>`;
  }).join('');
  container.scrollTop = container.scrollHeight;
}

// ============================================================
// INPUT HANDLING
// ============================================================
function onCellClick(x, y) {
  const clickedUnit = getUnitAt(x, y);

  // PLACE MODE
  if (interactionMode === 'place') {
    if (reachableTiles.some(t => t.x === x && t.y === y) && !clickedUnit) {
      finishPlacement(x, y);
    } else {
      cancelPlacement();
    }
    return;
  }

  // PLACE STRUCTURE MODE
  if (interactionMode === 'place_structure') {
    if (reachableTiles.some(t => t.x === x && t.y === y) && !clickedUnit) {
      finishStructurePlacement(x, y);
    } else {
      cancelPlacement();
    }
    return;
  }

  // MOVE MODE
  if (interactionMode === 'move' && selectedUnitId !== null) {
    if (reachableTiles.some(t => t.x === x && t.y === y) && !clickedUnit) {
      moveUnit(getUnit(selectedUnitId), x, y);
      return;
    }
    interactionMode = 'idle';
    reachableTiles = [];
  }

  // ATTACK MODE
  if (interactionMode === 'attack' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 1;
    const dist = chebyshevDist(su.x, su.y, x, y);
    const clickedRes = G.board[y] && G.board[y][x];
    if (clickedUnit && clickedUnit.playerId !== su.playerId && dist <= range && hasLineOfSight(su.x, su.y, x, y)) {
      // Smoke concealment blocks ranged attacks (distance > 1)
      if (dist > 1 && isConcealedBySmoke(clickedUnit)) {
        addLog(`💨 ${getDisplayName(clickedUnit)} is concealed by smoke! Cannot target with ranged attack.`);
        interactionMode = 'idle';
        renderAll();
        return;
      }
      resolveAttack(su, clickedUnit);
      return;
    }
    // Attack enemy structure
    const clickedStruct = G.structures && G.structures.find(s => s.x === x && s.y === y);
    if (clickedStruct && clickedStruct.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      resolveAttackStructure(su, clickedStruct);
      return;
    }
    // Attack enemy wall tile
    if (clickedRes && clickedRes.type === 'wall' && clickedRes.amount > 0 && (clickedRes.ownerPlayerId == null || clickedRes.ownerPlayerId !== su.playerId) && dist <= range && hasLineOfSight(su.x, su.y, x, y)) {
      resolveAttackWall(su, x, y, clickedRes);
      return;
    }
    // Attack explosive barrel
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`🏹 ${getDisplayName(su)} attacks the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // DOUBLE STRIKE MODE
  if (interactionMode === 'double_strike' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 1;
    const dist = chebyshevDist(su.x, su.y, x, y);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && dist <= range && hasLineOfSight(su.x, su.y, x, y)) {
      if (dist > 1 && isConcealedBySmoke(clickedUnit)) {
        addLog(`💨 ${getDisplayName(clickedUnit)} is concealed by smoke! Cannot target with ranged attack.`);
        interactionMode = 'idle';
        renderAll();
        return;
      }
      resolveDoubleStrike(su, clickedUnit);
      return;
    }
    // Attack explosive barrel with double strike
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`🏹 ${getDisplayName(su)} attacks the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // GATHER MODE
  if (interactionMode === 'gather' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const res = G.board[y][x];
    if (su && res && res.type !== 'wall' && res.amount > 0 && isAdjacent(su.x, su.y, x, y)) {
      gatherResource(su, x, y);
      return;
    }
    interactionMode = 'idle';
  }

  // PLACE WALL MODE
  if (interactionMode === 'place_wall' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (su && reachableTiles.some(t => t.x === x && t.y === y) && !clickedUnit) {
      placeWallBlock(su, x, y);
      return;
    }
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }

  // BUILD TOWN HALL MODE
  if (interactionMode === 'build_town_hall' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (su && isAdjacent(su.x, su.y, x, y) && !clickedUnit) {
      const existingStruct = G.structures && G.structures.find(s => s.x === x && s.y === y);
      const occupied = G.units.some(o => o.hp > 0 && o.x === x && o.y === y);
      const res = G.board[y][x];
      if (!existingStruct && !occupied && !res) {
        placingStructureType = 'town_hall';
        su.hasGathered = true;
        finishStructurePlacement(x, y);
        return;
      }
    }
    interactionMode = 'idle';
    renderAll();
    return;
  }



  // LEAP MODE (Elf hero jump over obstacles)
  if (interactionMode === 'leap' && selectedUnitId !== null) {
    if (reachableTiles.some(t => t.x === x && t.y === y) && !clickedUnit) {
      const su = getUnit(selectedUnitId);
      su.x = x;
      su.y = y;
      startAbilityCooldown(su, 'elf_leap');
      addLog(`🌿 ${getDisplayName(su)} leaps to (${x},${y})!`);
      interactionMode = 'idle';
      reachableTiles = [];
      renderAll();
      return;
    }
    interactionMode = 'idle';
    reachableTiles = [];
  }

  // SCROLL OF RETRIEVE MODE — click any friendly unit anywhere on map
  if (interactionMode === 'scroll_retrieve' && scrollPending && scrollPending.type === 'retrieve') {
    const su = getUnit(scrollPending.unitId);
    if (su && clickedUnit && clickedUnit.id !== su.id && clickedUnit.playerId === su.playerId && clickedUnit.hp > 0) {
      executeScrollRetrieve(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
    scrollPending = null;
  }

  // SCROLL OF SWAP MODE — click any unit anywhere on map
  if (interactionMode === 'scroll_swap' && scrollPending && scrollPending.type === 'swap') {
    const su = getUnit(scrollPending.unitId);
    if (su && clickedUnit && clickedUnit.id !== su.id && clickedUnit.hp > 0) {
      executeScrollSwap(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
    scrollPending = null;
  }

  // HEX CURSE MODE (Goblin Hexweaver - target within 3)
  if (interactionMode === 'hex_curse' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
      executeHexCurse(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // BLOODREND MODE (Orc Warchief - adjacent bleeding enemy)
  if (interactionMode === 'bloodrend' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && isAdjacent(su.x, su.y, x, y) && hasStatusEffect(clickedUnit, 'bleeding')) {
      executeBloodrend(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // AIMED SHOT MODE (Human Ranger - target within weapon range)
  if (interactionMode === 'aimed_shot' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 1;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(clickedUnit)) {
      executeAimedShot(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`🏹 ${getDisplayName(su)} shoots the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // HARPOON SHOT MODE (Merfolk Tidewarden - hook enemy within 5)
  if (interactionMode === 'harpoon_shot' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 5 && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(clickedUnit)) {
      executeHarpoonShot(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // ARCANE BLAST MODE (Elf Duskweaver - target within 3)
  if (interactionMode === 'arcane_blast' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
      executeArcaneBlast(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`✨ ${getDisplayName(su)} blasts the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // UTILITY MAGIC WEAPON MODES (no-damage debuff actions - target within weapon range)
  if (['curse_hex', 'lethargy', 'flash_freeze', 'enfeeble', 'gore_curse'].includes(interactionMode) && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 2;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      executeUtilityHex(su, clickedUnit, interactionMode);
      return;
    }
    interactionMode = 'idle';
  }

  // FIREBALL MODE (Staff of Fire - target within weapon range)
  if (interactionMode === 'fireball' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 3;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      executeFireball(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`🔥 ${getDisplayName(su)} hurls a fireball at the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // FROST RAY MODE (Staff of Frost - target within weapon range)
  if (interactionMode === 'frost_ray' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 3;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      executeFrostRay(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`❄ ${getDisplayName(su)} fires a frost ray at the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // LIGHTNING BOLT MODE (Scepter of Lightning - target within weapon range)
  if (interactionMode === 'lightning_bolt' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 4;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      executeLightningBolt(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`⚡ ${getDisplayName(su)} strikes the Explosive Barrel at (${x},${y}) with lightning!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // LIFE DRAIN MODE (Wand of Draining - target within weapon range)
  if (interactionMode === 'life_drain' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 2;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      executeLifeDrain(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // PRECISION SHOT MODE
  if (interactionMode === 'precision_shot' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 1;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(clickedUnit)) {
      executePrecisionShot(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`🎯 ${getDisplayName(su)} takes a precision shot at the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // GRAPPLE MODE
  if (interactionMode === 'grapple' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && clickedUnit.hp > 0) {
      const dist = chebyshevDist(su.x, su.y, clickedUnit.x, clickedUnit.y);
      if (dist >= 2 && dist <= 5 && hasLineOfSight(su.x, su.y, clickedUnit.x, clickedUnit.y)) {
        executeGrapple(su, clickedUnit);
        return;
      }
    }
    interactionMode = 'idle';
  }

  // ENSNARE MODE
  if (interactionMode === 'ensnare' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, clickedUnit.x, clickedUnit.y) <= 3 && hasLineOfSight(su.x, su.y, clickedUnit.x, clickedUnit.y)) {
      executeEnsnare(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // GRAB MODE (combat lock adjacent enemy)
  if (interactionMode === 'grab' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && isAdjacent(su.x, su.y, clickedUnit.x, clickedUnit.y)) {
      applyStatusEffect(clickedUnit, 'combat_locked', 2);
      if (hasStatusEffect(clickedUnit, 'combat_locked')) {
        addLog(`🔒 ${getDisplayName(su)} grabs ${getDisplayName(clickedUnit)} and locks them in combat!`);
      } else {
        addLog(`🔒 ${getDisplayName(su)} tries to grab ${getDisplayName(clickedUnit)} but they resist!`);
      }
      startAbilityCooldown(su, 'grab');
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // SHIELD BASH MODE (slam adjacent enemy)
  if (interactionMode === 'shield_bash' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && isAdjacent(su.x, su.y, clickedUnit.x, clickedUnit.y)) {
      executeShieldBash(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // DEVOUR MODE (eat adjacent enemy below 25% HP or adjacent ally)
  if (interactionMode === 'devour' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && isAdjacent(su.x, su.y, clickedUnit.x, clickedUnit.y) &&
        ((clickedUnit.playerId !== su.playerId && clickedUnit.hp <= getUnitStats(clickedUnit).maxHp * 0.25) || clickedUnit.playerId === su.playerId)) {
      executeDevour(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // SOUL SIPHON MODE (Skeleton Lich - target within 3)
  if (interactionMode === 'soul_siphon' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
      executeSoulSiphon(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // SHADOWSTEP MODE (Goblin Shadowblade - teleport to enemy within 10 + guaranteed crit)
  if (interactionMode === 'shadowstep' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 10) {
      executeShadowstep(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // BONE EXPLOSION MODE (Skeleton Death Knight - target adjacent ally)
  if (interactionMode === 'bone_explosion' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId === su.playerId && clickedUnit.id !== su.id && isAdjacent(su.x, su.y, x, y)) {
      executeBoneExplosion(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // TROLL RAMPAGE MODE (click a tile in a straight line to charge)
  if (interactionMode === 'troll_rampage' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const rdx = x - su.x, rdy = y - su.y;
    // Must be a straight or diagonal line within 3 tiles
    const dist = chebyshevDist(su.x, su.y, x, y);
    if (dist >= 1 && dist <= 3 && (rdx === 0 || rdy === 0 || Math.abs(rdx) === Math.abs(rdy))) {
      const normDx = rdx === 0 ? 0 : rdx / Math.abs(rdx);
      const normDy = rdy === 0 ? 0 : rdy / Math.abs(rdy);
      executeTrollRampage(su, normDx, normDy);
      return;
    }
    interactionMode = 'idle';
  }

  // SEIZING TOTEM MODE (place totem on adjacent empty tile)
  if (interactionMode === 'seizing_totem' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (isAdjacent(su.x, su.y, x, y) && !clickedUnit &&
        x >= 0 && x < G.boardSize && y >= 0 && y < G.boardSize &&
        !(G.board[y][x] && G.board[y][x].type && G.board[y][x].amount > 0) &&
        !(G.barrels && G.barrels.some(b => b.x === x && b.y === y))) {
      executeSeizingTotem(su, x, y);
      return;
    }
    interactionMode = 'idle';
  }

  // TUNNEL A/B MODE (Kobold Saboteur - A: adjacent, B: within 5 tiles)
  if ((interactionMode === 'tunnel_a' || interactionMode === 'tunnel_b') && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const tunnelInRange = interactionMode === 'tunnel_b' ? chebyshevDist(su.x, su.y, x, y) <= 5 : isAdjacent(su.x, su.y, x, y);
    if (tunnelInRange && !clickedUnit &&
        x >= 0 && x < G.boardSize && y >= 0 && y < G.boardSize) {
      const res = G.board[y] && G.board[y][x];
      if (!res || !res.type || res.amount <= 0) {
        executeTunnelPlace(su, x, y, interactionMode === 'tunnel_a' ? 'A' : 'B');
        return;
      }
    }
    interactionMode = 'idle';
  }

  // CADENCE OF HASTE MODE (Bard Drummer - target adjacent ally)
  if (interactionMode === 'cadence_of_haste' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && clickedUnit.playerId === su.playerId && clickedUnit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
      executeCadenceOfHaste(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // TAME BEAST MODE (Orc Beastmaster - tame adjacent Foul Beast)
  if (interactionMode === 'tame_beast' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId === NPC_PLAYER_ID && (clickedUnit.type === 'beast' || clickedUnit.type === 'warg' || clickedUnit.type === 'hydra') && clickedUnit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
      executeTameBeast(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // MIMIC MODE (Bard Maestro - copy adjacent unit's last ability, ally or enemy)
  if (interactionMode === 'mimic' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && clickedUnit.hp > 0 && isAdjacent(su.x, su.y, x, y) && clickedUnit.lastAbilityUsed) {
      executeMimic(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // BOOBY TRAP MODE (Kobold Trapmaster - place on adjacent empty tile)
  if (interactionMode === 'booby_trap' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (isAdjacent(su.x, su.y, x, y) && !clickedUnit &&
        x >= 0 && x < G.boardSize && y >= 0 && y < G.boardSize) {
      executeBoobyTrap(su, x, y);
      return;
    }
    interactionMode = 'idle';
  }

  // FISH MODE (Fishing Rod - target adjacent water)
  if (interactionMode === 'fish' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const res = G.board[y][x];
    if (su && res && res.type === 'water' && res.amount > 0 && isAdjacent(su.x, su.y, x, y)) {
      executeFish(su, x, y);
      return;
    }
    interactionMode = 'idle';
  }

  // POISONOUS SHIV MODE (Nomad Bandit King - target adjacent enemy)
  if (interactionMode === 'poisonous_shiv' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && clickedUnit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
      executePoisonousShiv(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // RESCUE MODE (Nomad Seer - click any ally on the map)
  if (interactionMode === 'rescue' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && clickedUnit.playerId === su.playerId && clickedUnit.hp > 0) {
      executeRescue(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // PLACE BARREL MODE (place explosive barrel on adjacent empty tile)
  if (interactionMode === 'place_barrel' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (isAdjacent(su.x, su.y, x, y) && !clickedUnit &&
        x >= 0 && x < G.boardSize && y >= 0 && y < G.boardSize) {
      const res = G.board[y] && G.board[y][x];
      const hasBarrelAlready = G.barrels && G.barrels.some(b => b.x === x && b.y === y);
      if ((!res || !res.type || res.amount <= 0) && !hasBarrelAlready) {
        executePlaceBarrel(su, x, y);
        return;
      }
    }
    interactionMode = 'idle';
  }

  // BOOMERANG THROW MODE (hit all enemies in a line)
  if (interactionMode === 'boomerang_throw' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 4 && isOnStraightLine(su.x, su.y, x, y) && hasLineOfSight(su.x, su.y, x, y)) {
      executeBoomerangThrow(su, x, y);
      return;
    }
    interactionMode = 'idle';
  }

  // BOUNTY MARK MODE (mark any enemy on the map — unlimited range, no LoS)
  if (interactionMode === 'bounty_mark' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && clickedUnit.hp > 0) {
      executeBountyMark(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // PISTOL SHOT MODE (Duellist's Pistol — 3 damage, 3 range, free action)
  if (interactionMode === 'pistol_shot' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(clickedUnit)) {
      executePistolShot(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= 3 && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`🔫 ${getDisplayName(su)} shoots the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      startAbilityCooldown(su, 'pistol_shot');
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // GIANT SHOT MODE (Bow of Giants — STR damage, weapon range)
  if (interactionMode === 'giant_shot' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 4;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(clickedUnit)) {
      executeGiantShot(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= range && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`💥 ${getDisplayName(su)} fires a giant shot at the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // BLINK MODE (Blinking Amulet — teleport up to 3 tiles)
  if (interactionMode === 'blink' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const dist = chebyshevDist(su.x, su.y, x, y);
    if (dist >= 1 && dist <= 3) {
      const isOccupied = G.units.some(o => o.hp > 0 && o.x === x && o.y === y);
      const hasBarrel = G.barrels && G.barrels.some(b => b.x === x && b.y === y);
      if (!isOccupied && !hasBarrel) {
        executeBlink(su, x, y);
        return;
      }
    }
    interactionMode = 'idle';
  }

  // CORRUPTED CHALICE MODE (sacrifice HP to heal adjacent ally)
  if (interactionMode === 'corrupted_chalice' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && clickedUnit.playerId === su.playerId && clickedUnit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
      executeCorruptedChalice(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // BOTTLED LIGHTNING MODE (zap enemy within 2 tiles, chain to adjacent)
  if (interactionMode === 'bottled_lightning' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && clickedUnit.hp > 0 && chebyshevDist(su.x, su.y, x, y) <= 2) {
      executeBottledLightning(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // VOODOO DOLL MODE (transfer debuffs to enemy within 3 tiles)
  if (interactionMode === 'voodoo_doll' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && clickedUnit.hp > 0 && chebyshevDist(su.x, su.y, x, y) <= 3) {
      executeVoodooDoll(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // OGRE THROW – PHASE 1: select adjacent unit to grab
  if (interactionMode === 'ogre_throw_select' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && clickedUnit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
      G._throwTarget = clickedUnit;
      interactionMode = 'ogre_throw_dest';
      addLog(`👹 ${getDisplayName(su)} grabs ${getDisplayName(clickedUnit)}! Select where to throw them.`);
      renderBoard();
      return;
    }
    interactionMode = 'idle';
    renderBoard();
  }

  // OGRE THROW – PHASE 2: select landing tile
  if (interactionMode === 'ogre_throw_dest' && selectedUnitId !== null && G._throwTarget) {
    const su = getUnit(selectedUnitId);
    const throwTarget = G._throwTarget;
    const dist = chebyshevDist(su.x, su.y, x, y);
    if (dist >= 2 && dist <= 4) {
      const hasBarrel = G.barrels && G.barrels.some(b => b.x === x && b.y === y);
      const hasResource = G.board[y] && G.board[y][x] && G.board[y][x].type && G.board[y][x].amount > 0;
      const landOnUnit = G.units.find(o => o.hp > 0 && o.x === x && o.y === y && o.id !== throwTarget.id && o.id !== su.id);
      const isOccupiedByOther = G.units.some(o => o.hp > 0 && o.x === x && o.y === y && o.id !== throwTarget.id);
      if (!hasBarrel && !hasResource && (!isOccupiedByOther || landOnUnit)) {
        executeOgreThrow(su, throwTarget, x, y, landOnUnit);
        G._throwTarget = null;
        return;
      }
    }
    // Cancel throw on invalid click
    G._throwTarget = null;
    interactionMode = 'idle';
    renderBoard();
  }

  // SNIPER SHOT MODE (Gnome Sniper — normal attack roll, range 6+INT, 2 turn CD)
  if (interactionMode === 'sniper_shot' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (!hasEquippedRangedWeapon(su)) {
      addLog(`🚫 ${getDisplayName(su)} cannot use Sniper Shot without a ranged weapon equipped.`);
      interactionMode = 'idle';
      renderAll();
      return;
    }
    const ssRange = getSniperShotRange(su);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= ssRange && hasLineOfSight(su.x, su.y, x, y) && !isConcealedBySmoke(clickedUnit)) {
      executeSniperShot(su, clickedUnit);
      return;
    }
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y) && chebyshevDist(su.x, su.y, x, y) <= ssRange && hasLineOfSight(su.x, su.y, x, y)) {
      addLog(`🎯 ${getDisplayName(su)} fires a sniper shot at the Explosive Barrel at (${x},${y})!`);
      triggerBarrelExplosion(x, y);
      su.hasAttacked = true;
      startAbilityCooldown(su, 'sniper_shot');
      interactionMode = 'idle';
      renderAll();
      return;
    }
    interactionMode = 'idle';
  }

  // MORTAR STRIKE MODE (Gnome Mortar Tech — normal attack + 1 AoE, ignores walls, no CD)
  if (interactionMode === 'mortar_strike' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 4) {
      executeMortarStrike(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // STATIC DISCHARGE MODE (consume charges, blast enemy)
  if (interactionMode === 'static_discharge' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && clickedUnit.hp > 0 && chebyshevDist(su.x, su.y, x, y) <= 3) {
      executeStaticDischarge(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // DEFAULT: select/deselect
  if (clickedUnit && clickedUnit.hp > 0) {
    selectedUnitId = clickedUnit.id;
    selectedGroundTile = null;
    selectedShop = null;
    selectedVendor = null;
    selectedBazaar = null;
    selectedStructure = null;
    selectedTunnel = null;
    selectedBarrel = null;
    selectedWall = null;
    interactionMode = 'idle';
    reachableTiles = [];
  } else {
    // Check for shop tile
    const clickedShop = G.shops && G.shops.find(s => s.x === x && s.y === y);
    // Check for vendor tile
    const clickedVendor = G.vendors && G.vendors.find(v => v.x === x && v.y === y);
    // Check for bazaar tile
    const clickedBazaar = G.bazaars && G.bazaars.find(b => b.x === x && b.y === y);
    // Check for structure tile
    const clickedStructure = G.structures && G.structures.find(s => s.x === x && s.y === y);
    // Check for barrel tile
    const clickedBarrel = G.barrels && G.barrels.find(b => b.x === x && b.y === y);
    const clickedRes = G.board[y] && G.board[y][x];
    const clickedWall = clickedRes && clickedRes.type === 'wall' && clickedRes.amount > 0 ? clickedRes : null;
    // Check for ground items
    const hasGroundItem = (G.groundItems || []).some(gi => gi.x === x && gi.y === y);
    if (clickedWall) {
      selectedUnitId = null;
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = null;
      selectedTunnel = null;
      selectedBarrel = null;
      selectedWall = { x, y };
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (clickedShop) {
      // Preserve selectedUnitId if that unit is adjacent to the shop (so purchases go to that unit)
      if (selectedUnitId != null) {
        const su = getUnit(selectedUnitId);
        if (!su || su.hp <= 0 || su.playerId !== G.currentPlayer ||
            (!isAdjacent(su.x, su.y, clickedShop.x, clickedShop.y) && !(su.x === clickedShop.x && su.y === clickedShop.y))) {
          selectedUnitId = null;
        }
      }
      selectedGroundTile = null;
      selectedShop = clickedShop;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = null;
      selectedTunnel = null;
      selectedBarrel = null;
      selectedWall = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (clickedVendor) {
      if (selectedUnitId != null) {
        const su = getUnit(selectedUnitId);
        if (!su || su.hp <= 0 || su.playerId !== G.currentPlayer ||
            (!isAdjacent(su.x, su.y, clickedVendor.x, clickedVendor.y) && !(su.x === clickedVendor.x && su.y === clickedVendor.y))) {
          selectedUnitId = null;
        }
      }
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = clickedVendor;
      selectedBazaar = null;
      selectedStructure = null;
      selectedTunnel = null;
      selectedBarrel = null;
      selectedWall = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (clickedBazaar) {
      if (selectedUnitId != null) {
        const su = getUnit(selectedUnitId);
        if (!su || su.hp <= 0 || su.playerId !== G.currentPlayer ||
            (!isAdjacent(su.x, su.y, clickedBazaar.x, clickedBazaar.y) && !(su.x === clickedBazaar.x && su.y === clickedBazaar.y))) {
          selectedUnitId = null;
        }
      }
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = clickedBazaar;
      selectedStructure = null;
      selectedTunnel = null;
      selectedBarrel = null;
      selectedWall = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (clickedStructure) {
      if (selectedUnitId != null) {
        const su = getUnit(selectedUnitId);
        if (!su || su.hp <= 0 || su.playerId !== G.currentPlayer ||
            (!isAdjacent(su.x, su.y, clickedStructure.x, clickedStructure.y) && !(su.x === clickedStructure.x && su.y === clickedStructure.y))) {
          selectedUnitId = null;
        }
      }
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = clickedStructure;
      selectedTunnel = null;
      selectedBarrel = null;
      selectedWall = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (G.tunnels && G.tunnels.find(t => t.x === x && t.y === y)) {
      selectedUnitId = null;
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = null;
      selectedTunnel = G.tunnels.find(t => t.x === x && t.y === y);
      selectedBarrel = null;
      selectedWall = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (clickedBarrel) {
      selectedUnitId = null;
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = null;
      selectedTunnel = null;
      selectedBarrel = clickedBarrel;
      selectedWall = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (hasGroundItem) {
      selectedUnitId = null;
      selectedGroundTile = { x, y };
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = null;
      selectedTunnel = null;
      selectedBarrel = null;
      selectedWall = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else {
      deselectUnit();
    }
  }

  renderAll();
}

function deselectUnit() {
  selectedUnitId = null;
  selectedGroundTile = null;
  selectedShop = null;
  selectedVendor = null;
  selectedBazaar = null;
  selectedStructure = null;
  selectedTunnel = null;
  selectedBarrel = null;
  selectedWall = null;
  mirrorPending = null;
  scrollPending = null;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

// ============================================================
// MOVEMENT
// ============================================================
function isBlockedBySeizingTotem(fromX, fromY, toX, toY, unit) {
  // Seizing Totem: enemies within 5 tiles can't leave, enemies outside can't enter
  if (!G || !G.units) return false;
  const totems = G.units.filter(u => u.hp > 0 && u.type === 'seizing_totem' && u.playerId !== unit.playerId);
  for (const totem of totems) {
    const distFrom = chebyshevDist(fromX, fromY, totem.x, totem.y);
    const distTo = chebyshevDist(toX, toY, totem.x, totem.y);
    const insideFrom = distFrom <= 2;
    const insideTo = distTo <= 2;
    // Can't leave the radius (inside -> outside)
    if (insideFrom && !insideTo) return true;
    // Can't enter the radius (outside -> inside)
    if (!insideFrom && insideTo) return true;
  }
  return false;
}

function isTileBlockedForUnit(nx, ny, unit) {
  const cell = G.board[ny][nx];
  // Barrels block movement
  if (G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) return true;
  if (!cell) return false; // empty tile, not blocked
  const type = cell.type;
  if (type === 'stone' && hasPassive(unit, 'climbing')) return false;
  if (type === 'water' && (hasPassive(unit, 'water_walking') || hasPassive(unit, 'swimming'))) return false;
  return true; // blocked by resource tile
}

function getReachableTiles(unit) {
  const tiles = [];
  const visited = new Set();
  const queue = [{ x: unit.x, y: unit.y, steps: 0 }];
  visited.add(`${unit.x},${unit.y}`);

  while (queue.length > 0) {
    const { x, y, steps } = queue.shift();
    if (steps > 0) tiles.push({ x, y });
    if (steps >= unit.movementLeft) continue;

    for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
      const nx = x + dx, ny = y + dy;
      const key = `${nx},${ny}`;
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (visited.has(key)) continue;
      if (getUnitAt(nx, ny)) continue;
      if (isTileBlockedForUnit(nx, ny, unit)) continue;
      if (isBlockedBySeizingTotem(x, y, nx, ny, unit)) continue;
      visited.add(key);
      queue.push({ x: nx, y: ny, steps: steps + 1 });
    }
  }
  return tiles;
}

function triggerOverwatchOnUnitEntry(unit, fromX, fromY) {
  // Fire Overwatch only when a unit newly enters range/LoS.
  if (!unit || unit.hp <= 0 || unit.disengaged || hasPassive(unit, 'slippery')) return false;
  const overwatchers = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && u.canFight &&
    !hasStatusEffect(u, 'beguiled') &&
    !hasStatusEffect(u, 'frozen') &&
    hasPassive(u, 'overwatch') &&
    !u.overwatchFired
  );
  for (const ow of overwatchers) {
    const owStats = getUnitStats(ow);
    if (owStats.attackRange <= 1) continue;
    const oldDist = chebyshevDist(ow.x, ow.y, fromX, fromY);
    const newDist = chebyshevDist(ow.x, ow.y, unit.x, unit.y);
    const oldInRange = oldDist <= owStats.attackRange && oldDist > 1 && hasLineOfSight(ow.x, ow.y, fromX, fromY);
    const newInRange = newDist <= owStats.attackRange && newDist > 1 && hasLineOfSight(ow.x, ow.y, unit.x, unit.y);
    if (newInRange && !oldInRange && !isConcealedBySmoke(unit)) {
      addLog(`🎯 ${getDisplayName(ow)} fires an Overwatch shot at ${getDisplayName(unit)}!`);
      ow.overwatchFired = true;
      performAttack(ow, unit, { isAoO: true });
      if (unit.hp <= 0) return true;
    }
  }
  return false;
}

function getMovementPath(unit, tx, ty) {
  const visited = new Set();
  const queue = [{ x: unit.x, y: unit.y, steps: 0, prev: null }];
  visited.add(`${unit.x},${unit.y}`);

  while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === tx && current.y === ty) {
      const path = [];
      let node = current;
      while (node) {
        path.unshift({ x: node.x, y: node.y });
        node = node.prev;
      }
      return path;
    }
    if (current.steps >= unit.movementLeft) continue;

    for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      const key = `${nx},${ny}`;
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (visited.has(key)) continue;
      if (getUnitAt(nx, ny) && !(nx === tx && ny === ty)) continue;
      if (isTileBlockedForUnit(nx, ny, unit)) continue;
      if (isBlockedBySeizingTotem(current.x, current.y, nx, ny, unit)) continue;
      visited.add(key);
      queue.push({ x: nx, y: ny, steps: current.steps + 1, prev: current });
    }
  }

  return null;
}

function moveUnit(unit, x, y) {
  const path = getMovementPath(unit, x, y);
  const pathCost = path ? path.length - 1 : null;
  if (!path || pathCost > unit.movementLeft) return;

  // Attack of Opportunity (Slippery passive and Goblin Disengage bypass this)
  if (unit.disengaged || hasPassive(unit, 'slippery')) {
    // Skip AoO entirely
  }
  const adjacentEnemies = (unit.disengaged || hasPassive(unit, 'slippery')) ? [] : G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && u.canFight &&
    !hasStatusEffect(u, 'beguiled') &&
    !hasStatusEffect(u, 'frozen') &&
    isAdjacent(unit.x, unit.y, u.x, u.y) &&
    !isAdjacent(x, y, u.x, u.y)
  );
  let aooStopped = false;
  for (const enemy of adjacentEnemies) {
    addLog(`⚡ ${getDisplayName(enemy)} gets an Attack of Opportunity against ${getDisplayName(unit)}!`);
    performAttack(enemy, unit, { isAoO: true });
    if (unit.hp <= 0) {
      interactionMode = 'idle';
      reachableTiles = [];
      selectedUnitId = null;
      renderAll();
      return;
    }
    // AoO can trigger combat lock — if locked, stop movement
    if (hasStatusEffect(unit, 'combat_locked')) {
      unit.movementLeft = 0;
      addLog(`🔒 ${getDisplayName(unit)} is locked in place and cannot continue moving!`);
      aooStopped = true;
      break;
    }
  }
  if (aooStopped) {
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }

  // Break camouflage on movement
  if (unit.camouflaged) {
    breakCamouflage(unit, 'moved');
  }

  const oldX = unit.x, oldY = unit.y;
  unit.x = x;
  unit.y = y;
  unit.movementLeft -= pathCost;
  // Track tiles moved this turn for Momentum passive
  unit.tilesMoved = (unit.tilesMoved || 0) + pathCost;
  // Steady Bombardment: moving breaks the bonus
  if (hasPassive(unit, 'steady_bombardment') && unit.steadyBombardment) {
    unit.steadyBombardment = false;
    addLog(`🧨 ${getDisplayName(unit)} moves — Steady Bombardment lost!`);
  }

  // Harpoon drag: if this unit has a hooked target, drag them to trail right behind
  if (unit.harpoonDragTargetId && unit.harpoonDragTurn === G.turn) {
    const dragTarget = G.units.find(u => u.id === unit.harpoonDragTargetId && u.hp > 0);
    if (dragTarget) {
      // Place enemy one tile behind the Tidewarden (opposite of movement direction)
      const dx = Math.sign(x - oldX);
      const dy = Math.sign(y - oldY);
      let dragX = x - dx;
      let dragY = y - dy;
      // If that tile is blocked, fall back to the vacated tile
      const tileBlocked = G.units.some(u => u.hp > 0 && u.id !== dragTarget.id && u.x === dragX && u.y === dragY) ||
        (G.map && G.map[dragY] && G.map[dragY][dragX] === 'wall');
      if (tileBlocked) { dragX = oldX; dragY = oldY; }
      dragTarget.x = dragX;
      dragTarget.y = dragY;
      addLog(`🔱 ${getDisplayName(unit)} drags ${getDisplayName(dragTarget)} to (${dragX},${dragY})!`);
    } else {
      // Target died or disappeared — clear hook
      delete unit.harpoonDragTargetId;
      delete unit.harpoonDragTurn;
    }
  }

  addLog(`${getDisplayName(unit)} moved from (${oldX},${oldY}) to (${x},${y})`);

  // Overwatch: ranged enemies fire when this unit newly enters their range.
  if (triggerOverwatchOnUnitEntry(unit, oldX, oldY)) {
    interactionMode = 'idle';
    reachableTiles = [];
    selectedUnitId = null;
    renderAll();
    return;
  }

  // Check for traps along the full movement path
  if (G.traps && G.traps.length > 0) {
    for (const step of path.slice(1)) {
      const trapIdx = G.traps.findIndex(t => t.x === step.x && t.y === step.y && t.playerId !== unit.playerId);
      if (trapIdx === -1) continue;
      const trap = G.traps[trapIdx];
      queueTrapActivationEffects(trap.x, trap.y);
      unit.hp -= trap.damage;
      applyStatusEffect(unit, 'ensnared', 3);
      addLog(`🪤 ${getDisplayName(unit)} triggers a hidden trap! ${trap.damage} damage and Ensnared!`);
      G.traps.splice(trapIdx, 1);
      if (unit.hp <= 0) {
        unit.hp = 0;
        dropAllItems(unit);
        addLog(`☠ ${getDisplayName(unit)} has been slain by a trap!`);
        G.units = G.units.filter(u => u.hp > 0);
        checkPlayerElimination(unit.playerId);
        selectedUnitId = null;
        break;
      }
    }
  }

  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

function bfsDistance(unit, tx, ty) {
  const visited = new Set();
  const queue = [{ x: unit.x, y: unit.y, steps: 0 }];
  visited.add(`${unit.x},${unit.y}`);

  while (queue.length > 0) {
    const { x, y, steps } = queue.shift();
    if (x === tx && y === ty) return steps;
    if (steps >= unit.movementLeft) continue;

    for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
      const nx = x + dx, ny = y + dy;
      const key = `${nx},${ny}`;
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (visited.has(key)) continue;
      if (getUnitAt(nx, ny) && !(nx === tx && ny === ty)) continue;
      if (isTileBlockedForUnit(nx, ny, unit)) continue;
      if (isBlockedBySeizingTotem(x, y, nx, ny, unit)) continue;
      visited.add(key);
      queue.push({ x: nx, y: ny, steps: steps + 1 });
    }
  }
  return null;
}

// ============================================================
// COMBAT
// ============================================================
function performAttack(attacker, defender, { isAoO = false, isDoubleStrike = false, attackContext = null } = {}) {
  const setAttackOutcome = (outcome) => {
    if (attackContext) attackContext.outcome = outcome;
  };

  // Mark both units as in combat this turn (blocks item dropping)
  attacker.lastCombatTurn = G.turn;
  defender.lastCombatTurn = G.turn;

  // Break camouflage on attack
  if (attacker.camouflaged) breakCamouflage(attacker, 'attacked');

  const aStats = getUnitStats(attacker);
  const dStats = getUnitStats(defender);

  const prefix = isAoO ? '⚡ AoO: ' : isDoubleStrike ? '⚡ ' : '';

  // Dodge check (AGI-based)
  if (Math.random() * 100 < dStats.dodgeChance) {
    addLog(`${prefix}${getDisplayName(attacker)} ${isAoO ? 'swings at' : 'attacks'} ${getDisplayName(defender)} — 🌀 DODGED! (${dStats.dodgeChance}% chance)`);
    attacker._lastDamageDealt = 0;
    // Windworks: on dodge, retaliate (melee) or reflect (ranged)
    if (hasPassive(defender, 'windworks') && defender.hp > 0 && attacker.hp > 0 && !isAoO) {
      const dodgeDist = chebyshevDist(attacker.x, attacker.y, defender.x, defender.y);
      if (dodgeDist <= 1) {
        // Melee dodge → guaranteed retaliate
        addLog(`🌀 ${getDisplayName(defender)}'s Windworks — counter-strikes!`);
        performAttack(defender, attacker, { isAoO: true });
      } else {
        // Ranged dodge → reflect the attack back
        addLog(`🌀 ${getDisplayName(defender)}'s Windworks — reflects the projectile!`);
        performAttack(defender, attacker, { isAoO: true });
      }
    }
    // NPCs should retaliate on misses when adjacent.
    if (!isAoO && defender.hp > 0 && attacker.hp > 0 && !hasStatusEffect(defender, 'beguiled') && isAdjacent(attacker.x, attacker.y, defender.x, defender.y) && defender.playerId === NPC_PLAYER_ID) {
      beastRetaliate(defender, attacker);
    }
    setAttackOutcome('miss');
    return false;
  }

  // Momentum passive: +1 ATK per 3 tiles moved this turn
  let momentumBonus = 0;
  if (hasPassive(attacker, 'momentum') && attacker.tilesMoved > 0) {
    momentumBonus = Math.floor(attacker.tilesMoved / 3);
  }

  // Piercing passive: ignore 2 DEF per stack (stacks)
  const piercingStacks = countPassive(attacker, 'piercing');
  const piercingReduction = piercingStacks * 2;
  const effectiveDef = Math.max(0, dStats.defense - piercingReduction);

  let damage, rollDetails, woundTarget;

  if (USE_NEW_COMBAT) {
    // ── NEW COMBAT: PHASE 1 — HIT ROLL ──
    const atkPower = aStats.attack + momentumBonus;
    // Cap at 4+ so very defensive targets are still hittable 50% of the time.
    const hitTarget = Math.max(2, Math.min(4, 4 - Math.floor((atkPower - effectiveDef) / 2)));
    const hitRoll = rollD6();
    const hitSuccess = hitRoll >= hitTarget;

    if (!hitSuccess) {
      addLog(`${prefix}${getDisplayName(attacker)} ${isAoO ? 'swings at' : 'attacks'} ${getDisplayName(defender)} — MISS! (${hitRoll} vs ${hitTarget}+ to hit)`);
      attacker._lastDamageDealt = 0;
      if (!isAoO && defender.hp > 0 && attacker.hp > 0 && !hasStatusEffect(defender, 'beguiled') && isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
        if (defender.playerId === NPC_PLAYER_ID) {
          beastRetaliate(defender, attacker);
        } else if (hasPassive(defender, 'retaliate') && Math.random() < 0.5) {
          addLog(`⚔ ${getDisplayName(defender)} retaliates!`);
          performAttack(defender, attacker, { isAoO: true });
        }
      }
      setAttackOutcome('miss');
      return false;
    }

    // ── NEW COMBAT: PHASE 2 — WOUND ROLL ──
    const atkVsDef = atkPower - effectiveDef;
    if (atkVsDef >= 4)       woundTarget = 2;
    else if (atkVsDef >= 2)  woundTarget = 3;
    else if (atkVsDef >= 0)  woundTarget = 4;
    else if (atkVsDef >= -2) woundTarget = 5;
    else                     woundTarget = 6;

    const woundRoll = rollD6();
    damage = woundRoll >= woundTarget ? Math.max(1, 1 + (woundRoll - woundTarget)) : 1;
    rollDetails = `${hitRoll} to hit, ${woundRoll} to wound`;

  } else {
    // ── CLASSIC COMBAT: OPPOSED ROLL ──
    const atkRoll = rollD6() + aStats.attack + momentumBonus + 2; // +2 attacker advantage (hit only)
    const defRoll = rollD6() + effectiveDef;
    const atkRollDmg = atkRoll - 2; // +2 helps hit, not damage
    damage = Math.max(0, atkRollDmg - defRoll);
    if (atkRoll > defRoll) damage = Math.max(1, damage);
    rollDetails = `${atkRoll} vs ${defRoll}`;
    woundTarget = 0; // not used in classic mode
  }

  // Critical hit (INT-based) — tactical precision
  let isCrit = false;
  if (damage > 0 && hasStatusEffect(attacker, 'deadly_focus')) {
    let critMult = 1.5;
    if (hasPassive(attacker, 'holy_wrath')) critMult += aStats.defense * 0.05;
    damage = Math.ceil(damage * critMult);
    isCrit = true;
    removeStatusEffect(attacker, 'deadly_focus');
    addLog(`🎯 ${getDisplayName(attacker)}'s Deadly Focus guarantees a critical strike!`);
  } else if (damage > 0 && Math.random() * 100 < aStats.critChance) {
    let critMult = 1.5;
    if (hasPassive(attacker, 'holy_wrath')) critMult += aStats.defense * 0.05;
    damage = Math.ceil(damage * critMult);
    isCrit = true;
  }

  // Dark Purpose: gain Dark Energy stack on crit with magic weapon
  if (isCrit && hasPassive(attacker, 'dark_purpose')) {
    const atkWeapon = attacker.equipment && attacker.equipment.mainhand;
    if (atkWeapon && atkWeapon !== '_two_handed_' && atkWeapon.magicDamage) {
      triggerDarkPurpose(attacker);
    }
  }

  // Crushing blow (STR-based) — raw power
  let isCrush = false;
  if (damage > 0 && !isCrit && Math.random() * 100 < aStats.crushChance) {
    let crushDmg = 2;
    if (hasPassive(attacker, 'unstoppable_force')) crushDmg = Math.floor(aStats.movement / 3);
    damage += crushDmg;
    isCrush = true;
  }

  // Executioner passive: double damage to enemies below 25% HP
  let isExecute = false;
  if (damage > 0 && hasPassive(attacker, 'executioner')) {
    const dFullStats = getUnitStats(defender);
    if (defender.hp <= dFullStats.maxHp * 0.25) {
      damage *= 2;
      isExecute = true;
    }
  }

  // Bounty Marked: +3 damage from all sources
  let bountyBonusApplied = false;
  if (damage > 0 && hasStatusEffect(defender, 'bounty_marked')) {
    damage += 3;
    bountyBonusApplied = true;
  }

  if (damage > 0) {
    // Magic Resistance: reduce magic weapon basic attack damage by 2
    const attackerWeapon = attacker.equipment && attacker.equipment.mainhand;
    if (attackerWeapon && attackerWeapon !== '_two_handed_' && attackerWeapon.magicDamage && hasPassive(defender, 'magic_resistance') && damage > 0) {
      damage = Math.max(0, damage - 2);
      addLog(`✨ ${getDisplayName(defender)}'s Magic Resistance reduces the magic damage!`);
    }
    // Bulwark passive: reduce all incoming damage by stack count (min 1)
    const bulwarkStacks = countPassive(defender, 'bulwark');
    if (bulwarkStacks > 0 && damage > 1) {
      damage = Math.max(1, damage - bulwarkStacks);
    }
    // Soul Barricade: reduce damage by 2 per stack, then lose 1 stack
    if (defender.soulBarricadeStacks > 0 && damage > 1) {
      damage = Math.max(1, damage - defender.soulBarricadeStacks * 2);
      defender.soulBarricadeStacks = Math.max(0, defender.soulBarricadeStacks - 1);
      addLog(`💀 ${getDisplayName(defender)}'s Soul Barricade absorbs damage! (${defender.soulBarricadeStacks} stacks remaining)`);
    }
    // Spongey passive: adjacent ally with Spongey soaks 50% of damage (transferred to them)
    const spongeyAlly = G.units.find(u =>
      u.hp > 0 && u.id !== defender.id && u.playerId === defender.playerId &&
      isAdjacent(defender.x, defender.y, u.x, u.y) && hasPassive(u, 'spongey')
    );
    if (spongeyAlly && damage > 1) {
      const absorbed = Math.floor(damage * 0.5);
      damage = damage - absorbed;
      spongeyAlly.hp -= absorbed;
      addLog(`🧽 ${getDisplayName(spongeyAlly)}'s Spongey soaks ${absorbed} damage meant for ${getDisplayName(defender)}! (${spongeyAlly.hp > 0 ? spongeyAlly.hp + ' HP left' : 'DEFEATED!'})`);
      if (spongeyAlly.hp <= 0) {
        spongeyAlly.hp = 0;
        dropAllItems(spongeyAlly);
        addLog(`☠ ${getDisplayName(spongeyAlly)} has been slain protecting an ally!`);
        G.units = G.units.filter(u => u.hp > 0);
        checkPlayerElimination(spongeyAlly.playerId);
      }
    }
    if (momentumBonus > 0) addLog(`🏃 Momentum: +${momentumBonus} ATK from ${attacker.tilesMoved} tiles moved!`);
    const procTag = isExecute ? ' 🪓EXECUTE!' : isCrit ? ' 💥CRIT!' : isCrush ? ' 🔨CRUSH!' : '';
    const bountyTag = bountyBonusApplied ? ' 💰+3 Bounty' : '';
    defender.hp -= damage;
    attacker._lastDamageDealt = damage;
    addLog(`${prefix}${getDisplayName(attacker)} ${isAoO ? 'hits' : 'attacks'} ${getDisplayName(defender)} for ${damage} damage!${procTag}${bountyTag} (${rollDetails}) (${defender.hp > 0 ? defender.hp + ' HP left' : 'DEFEATED!'})`);

    // Static Conduit: grant charges to nearby Ogre Magi
    if (damage > 0) triggerStaticConduit(defender, damage);

    // Vampirism passive: heal 1-3 HP on successful hit
    if (hasPassive(attacker, 'vampirism') && attacker.hp > 0) {
      const healAmt = 1 + Math.floor(Math.random() * 3);
      const aFullStats = getUnitStats(attacker);
      const actualHeal = Math.min(healAmt, aFullStats.maxHp - attacker.hp);
      if (actualHeal > 0) {
        attacker.hp += actualHeal;
        addLog(`🧛 ${getDisplayName(attacker)} drains ${actualHeal} HP from the strike!`);
      }
    }

    // Apply weapon on-hit status effects (requires defender alive)
    if (defender.hp > 0 && attacker.equipment) {
      for (const slot of ['mainhand', 'offhand', 'head', 'accessory']) {
        const weapon = attacker.equipment[slot];
        if (weapon && weapon !== '_two_handed_' && weapon.onHit) {
          if (Math.random() * 100 < weapon.onHit.chance) {
            const eff = STATUS_EFFECTS[weapon.onHit.effect];
            if (eff) {
              const stacks = weapon.onHit.stacks || 1;
              for (let s = 0; s < stacks; s++) {
                applyStatusEffect(defender, weapon.onHit.effect, eff.duration);
              }
              if (hasStatusEffect(defender, weapon.onHit.effect)) {
                addLog(`${eff.icon} ${getDisplayName(defender)} is ${eff.name}!${stacks > 1 ? ' (×' + stacks + ' stacks)' : ''} (${eff.duration} turns)`);
              }
            }
          }
        }
      }
    }

    // Sanguine Feast: guaranteed bleeding on every hit
    if (defender.hp > 0 && hasPassive(attacker, 'sanguine_feast') && !hasStatusEffect(defender, 'bleeding')) {
      const bleedEff = STATUS_EFFECTS['bleeding'];
      if (bleedEff) {
        applyStatusEffect(defender, 'bleeding', bleedEff.duration);
        addLog(`🩸 ${getDisplayName(attacker)}'s Sanguine Feast causes ${getDisplayName(defender)} to bleed!`);
      }
    }

    // Hexweaver Curse: guaranteed weakened + cursed on every hit
    if (defender.hp > 0 && hasPassive(attacker, 'hexweaver_curse')) {
      applyStatusEffect(defender, 'weakened', STATUS_EFFECTS['weakened'].duration);
      applyStatusEffect(defender, 'cursed', STATUS_EFFECTS['cursed'].duration);
      addLog(`🔮 ${getDisplayName(attacker)}'s Hex Curse weakens and curses ${getDisplayName(defender)}! (-3 ATK, -3 DEF)`);
    }

    // Self-buff on hit (e.g. Windstrike Blade hastened)
    if (attacker.equipment) {
      for (const slot of ['mainhand', 'offhand']) {
        const weapon = attacker.equipment[slot];
        if (weapon && weapon !== '_two_handed_' && weapon.selfBuffOnHit) {
          if (Math.random() * 100 < weapon.selfBuffOnHit.chance) {
            const eff = STATUS_EFFECTS[weapon.selfBuffOnHit.effect];
            if (eff) {
              applyStatusEffect(attacker, weapon.selfBuffOnHit.effect, eff.duration);
              addLog(`${eff.icon} ${getDisplayName(attacker)} is ${eff.name}! (${eff.duration} turns)`);
            }
          }
        }
      }
    }

    // Elemental Glaive cycling on-hit: phase 0 = Freeze, 1 = Burning, 2 = Chain Lightning
    if (attacker.equipment) {
      for (const slot of ['mainhand', 'offhand']) {
        const weapon = attacker.equipment[slot];
        if (weapon && weapon !== '_two_handed_' && weapon.elementalCycle) {
          const phase = weapon.elementalPhase || 0;
          if (phase === 0 && defender.hp > 0) {
            // Freeze phase — 80% chance
            if (Math.random() < 0.80) {
              const eff = STATUS_EFFECTS['frozen'];
              applyStatusEffect(defender, 'frozen', eff.duration);
              if (hasStatusEffect(defender, 'frozen')) {
                addLog(`❄️ ${getDisplayName(attacker)}'s Elemental Glaive freezes ${getDisplayName(defender)}! (${eff.duration} turns)`);
              }
            }
          } else if (phase === 1 && defender.hp > 0) {
            // Burning phase — 100% chance
            const eff = STATUS_EFFECTS['burning'];
            applyStatusEffect(defender, 'burning', eff.duration);
            if (hasStatusEffect(defender, 'burning')) {
              addLog(`🔥 ${getDisplayName(attacker)}'s Elemental Glaive ignites ${getDisplayName(defender)}! (${eff.duration} turns)`);
            }
          } else if (phase === 2) {
            // Chain Lightning phase — guaranteed, 2 damage to target + adjacent enemies
            const chainDmg = 2;
            // Direct hit on defender
            let directDmg = chainDmg;
            const defBulwark = countPassive(defender, 'bulwark');
            if (defBulwark > 0 && directDmg > 1) directDmg = Math.max(1, directDmg - defBulwark);
            defender.hp -= directDmg;
            addLog(`⚡ ${getDisplayName(attacker)}'s Elemental Glaive shocks ${getDisplayName(defender)} for ${directDmg} lightning damage! (${defender.hp > 0 ? defender.hp + ' HP left' : 'DEFEATED!'})`);
            if (defender.hp <= 0) {
              defender.hp = 0;
              dropAllItems(defender);
              addLog(`☠ ${getDisplayName(defender)} has been defeated by chain lightning!`);
            }
            // Chain to adjacent enemies
            const chainTargets = G.units.filter(u =>
              u.hp > 0 && u.id !== defender.id && u.id !== attacker.id &&
              u.playerId !== attacker.playerId &&
              isAdjacent(defender.x, defender.y, u.x, u.y)
            );
            if (chainTargets.length > 0) {
              addLog(`⚡ Lightning arcs from ${getDisplayName(defender)}!`);
              for (const ct of chainTargets) {
                let cDmg = chainDmg;
                const ctBulwark = countPassive(ct, 'bulwark');
                if (ctBulwark > 0 && cDmg > 1) cDmg = Math.max(1, cDmg - ctBulwark);
                ct.hp -= cDmg;
                addLog(`⚡ Lightning strikes ${getDisplayName(ct)} for ${cDmg} damage! (${ct.hp > 0 ? ct.hp + ' HP left' : 'DEFEATED!'})`);
                if (ct.hp <= 0) {
                  ct.hp = 0;
                  dropAllItems(ct);
                  addLog(`☠ ${getDisplayName(ct)} has been defeated by chain lightning!`);
                }
              }
            }
            G.units = G.units.filter(u => u.hp > 0);
            if (defender.hp <= 0) checkPlayerElimination(defender.playerId);
            for (const ct of chainTargets) {
              if (ct.hp <= 0) checkPlayerElimination(ct.playerId);
            }
          }
        }
      }
    }

    // Chain Lightning: hits enemies adjacent to the defender (fires even if defender died)
    if (attacker.equipment) {
      for (const slot of ['mainhand', 'offhand']) {
        const weapon = attacker.equipment[slot];
        if (weapon && weapon !== '_two_handed_' && weapon.chainLightning) {
          if (Math.random() * 100 < weapon.chainLightning.chance) {
            const chainDmg = weapon.chainLightning.damage;
            const chainTargets = G.units.filter(u =>
              u.hp > 0 && u.id !== defender.id && u.id !== attacker.id &&
              u.playerId !== attacker.playerId &&
              isAdjacent(defender.x, defender.y, u.x, u.y)
            );
            if (chainTargets.length > 0) {
              addLog(`⚡ Chain lightning arcs from ${getDisplayName(defender)}!`);
              for (const ct of chainTargets) {
                let cDmg = chainDmg;
                const ctBulwark = countPassive(ct, 'bulwark');
                if (ctBulwark > 0 && cDmg > 1) cDmg = Math.max(1, cDmg - ctBulwark);
                ct.hp -= cDmg;
                addLog(`⚡ Lightning strikes ${getDisplayName(ct)} for ${cDmg} damage! (${ct.hp > 0 ? ct.hp + ' HP left' : 'DEFEATED!'})`);
                if (ct.hp <= 0) {
                  ct.hp = 0;
                  dropAllItems(ct);
                  addLog(`☠ ${getDisplayName(ct)} has been defeated by chain lightning!`);
                }
              }
              G.units = G.units.filter(u => u.hp > 0);
              for (const ct of chainTargets) {
                if (ct.hp <= 0) checkPlayerElimination(ct.playerId);
              }
            }
          }
        }
      }
    }

    if (defender.hp <= 0) {
    // Shamble On: instead of dying, lose a limb slot and survive at 1 HP
    if (hasPassive(defender, 'shamble_on')) {
      if (!defender.severedSlots) defender.severedSlots = [];
      const LIMB_SLOTS = ['offhand', 'hands', 'feet', 'mainhand', 'legs', 'head'];
      const availableLimbs = LIMB_SLOTS.filter(s => !defender.severedSlots.includes(s));
      if (defender.severedSlots.length < 2 && availableLimbs.length > 0) {
        const severedSlot = availableLimbs[Math.floor(Math.random() * availableLimbs.length)];
        defender.severedSlots.push(severedSlot);
        // Drop the item in that slot
        if (defender.equipment && defender.equipment[severedSlot] && defender.equipment[severedSlot] !== '_two_handed_') {
          if (!G.groundItems) G.groundItems = [];
          G.groundItems.push({ x: defender.x, y: defender.y, item: defender.equipment[severedSlot] });
          addLog(`💎 ${getDisplayName(defender)} dropped ${defender.equipment[severedSlot].name} from severed ${SLOT_LABELS[severedSlot]}!`);
          defender.equipment[severedSlot] = null;
        }
        // If mainhand severed and offhand was _two_handed_, clear the marker
        if (severedSlot === 'mainhand' && defender.equipment && defender.equipment.offhand === '_two_handed_') {
          defender.equipment.offhand = null;
        }
        defender.hp = 1;
        addLog(`🧟 ${getDisplayName(defender)}'s Shamble On! Lost ${SLOT_LABELS[severedSlot]} (${defender.severedSlots.length}/3 limbs severed) — survives at 1 HP!`);
        if (severedSlot === 'legs' || severedSlot === 'feet') addLog(`🦿 ${getDisplayName(defender)} can no longer move!`);
        renderAll();
        setAttackOutcome('hit');
        return false;
      }
    }
    defender.hp = 0;
    // Check martyr BEFORE dropping items (so the passive is still active from equipment)
    const hadMartyr = hasPassive(defender, 'martyr');
    // Drop all items on death (destroy martyr items instead of dropping)
    if (!G.groundItems) G.groundItems = [];
    for (const slot of EQUIP_SLOTS) {
      if (defender.equipment && defender.equipment[slot] && defender.equipment[slot] !== '_two_handed_') {
        const item = defender.equipment[slot];
        if (hadMartyr && item.passives && item.passives.includes('martyr')) {
          addLog(`✨ ${item.name} is consumed by the martyr's sacrifice!`);
        } else {
          G.groundItems.push({ x: defender.x, y: defender.y, item: item });
          addLog(`💎 ${getDisplayName(defender)} dropped ${item.name}!`);
        }
        defender.equipment[slot] = null;
      }
    }
    // Also drop items from extra slots
    for (const slot of getUnitEquipSlots(defender)) {
      if (!EQUIP_SLOTS.includes(slot) && defender.equipment && defender.equipment[slot] && defender.equipment[slot] !== '_two_handed_') {
        const item = defender.equipment[slot];
        G.groundItems.push({ x: defender.x, y: defender.y, item: item });
        addLog(`💎 ${getDisplayName(defender)} dropped ${item.name}!`);
        defender.equipment[slot] = null;
      }
    }
    for (const item of (defender.inventory || [])) {
      G.groundItems.push({ x: defender.x, y: defender.y, item: item });
      addLog(`💎 ${getDisplayName(defender)} dropped ${item.name}!`);
    }
    defender.inventory = [];
    addLog(`☠ ${getDisplayName(defender)} has been defeated${isAoO ? ' by an attack of opportunity' : ''}!`);
    // Seizing Totem killed: start CD on its summoner
    if (defender.type === 'seizing_totem' && defender.summonerId) {
      const summoner = G.units.find(u => u.id === defender.summonerId && u.hp > 0);
      if (summoner) {
        startAbilityCooldown(summoner, 'seizing_totem');
        addLog(`⌘ ${getDisplayName(summoner)}'s Seizing Totem has been destroyed! (3 turn cooldown)`);
      }
    }
    // Release tamed beast if tamer dies
    if (defender.type === 'hero') {
      const tamedBeast = G.units.find(b => b.hp > 0 && (b.type === 'beast' || b.type === 'warg' || b.type === 'hydra') && b.tamedBy === defender.id);
      if (tamedBeast) {
        tamedBeast.playerId = NPC_PLAYER_ID;
        tamedBeast.movement = 0;
        delete tamedBeast.tamedBy;
        addLog(`🐉 ${getDisplayName(tamedBeast)} breaks free and returns to the wild!`);
      }
    }
    // Martyr passive: when this unit dies, heal all adjacent allies for 10 HP
    if (hadMartyr) {
      const adjacentAllies = G.units.filter(u =>
        u.hp > 0 && u.id !== defender.id && u.playerId === defender.playerId &&
        isAdjacent(defender.x, defender.y, u.x, u.y)
      );
      if (adjacentAllies.length > 0) {
        addLog(`✝ ${getDisplayName(defender)}'s Martyr triggers!`);
        for (const ally of adjacentAllies) {
          const allyStats = getUnitStats(ally);
          ally.hp = Math.min(ally.hp + 10, allyStats.maxHp);
          addLog(`✝ ${getDisplayName(ally)} is healed for 10 HP (${ally.hp}/${allyStats.maxHp})!`);
        }
      }
    }
    // Blood Frenzy: heal attacker to full on kill, reset cooldown
    if (attacker.bloodFrenzyActive) {
      const aFullStats = getUnitStats(attacker);
      attacker.hp = aFullStats.maxHp;
      addLog(`🩸 ${getDisplayName(attacker)}'s Blood Frenzy triggers! Healed to full HP (${attacker.hp})!`);
      // Reset Blood Frenzy cooldown so it can be used again next turn
      if (attacker.cooldowns) attacker.cooldowns['blood_frenzy'] = 0;
      addLog(`🩸 ${getDisplayName(attacker)}'s Blood Frenzy cooldown is reset!`);
    }
    // Bloodlust: reset movement on kill
    if (hasPassive(attacker, 'bloodlust')) {
      const aStats = getUnitStats(attacker);
      attacker.movementLeft = aStats.movement;
      addLog(`🩸 ${getDisplayName(attacker)}'s Bloodlust surges — movement reset!`);
    }
    // Midas Touch: 40% chance to turn the dead enemy's tile into a gold deposit
    if (hasPassive(attacker, 'midas_touch') && Math.random() < 0.4) {
      const dx = defender.x, dy = defender.y;
      if (G.board[dy] && (!G.board[dy][dx] || !G.board[dy][dx].type || G.board[dy][dx].amount <= 0)) {
        G.board[dy][dx] = { type: 'gold', amount: 2 + Math.floor(Math.random() * 3) };
        addLog(`✨ ${getDisplayName(attacker)}'s Midas Touch turns the ground to gold!`);
      }
    }
    // Bounty Marked: killer's player gets 3 gold
    if (hasStatusEffect(defender, 'bounty_marked') && attacker.playerId !== undefined && G.players[attacker.playerId]) {
      G.players[attacker.playerId].resources.gold += 3;
      addLog(`💰 Bounty collected! ${G.players[attacker.playerId].name} receives 3 gold for killing the marked target!`);
    }
    // Potent Formula: spread remaining poison stacks to nearby enemies on kill
    if (hasPassive(attacker, 'potent_formula')) {
      const poisonEffect = defender.statusEffects ? defender.statusEffects.find(se => se.id === 'poison') : null;
      if (poisonEffect && poisonEffect.stacks > 0) {
        const totalStacks = poisonEffect.stacks;
        const nearbyEnemies = G.units.filter(u =>
          u.hp > 0 && u.id !== defender.id && u.id !== attacker.id &&
          u.playerId !== attacker.playerId &&
          chebyshevDist(defender.x, defender.y, u.x, u.y) <= 2 &&
          !hasPassive(u, 'poison_resistance') && !hasPassive(u, 'stone_skin_passive')
        );
        if (nearbyEnemies.length > 0) {
          addLog(`☠ ${getDisplayName(attacker)}'s Potent Formula spreads ${totalStacks} poison stack${totalStacks > 1 ? 's' : ''} from the fallen ${getDisplayName(defender)}!`);
          let remaining = totalStacks;
          let idx = 0;
          while (remaining > 0 && nearbyEnemies.length > 0) {
            const target = nearbyEnemies[idx % nearbyEnemies.length];
            if (!target.statusEffects) target.statusEffects = [];
            const existing = target.statusEffects.find(se => se.id === 'poison');
            if (existing) {
              if (existing.stacks < 5) {
                existing.stacks = Math.min(5, existing.stacks + 1);
                existing.turnsLeft = Math.max(existing.turnsLeft, 3);
                remaining--;
                idx++;
              } else {
                // This target is full, remove from pool
                nearbyEnemies.splice(idx % nearbyEnemies.length, 1);
                if (nearbyEnemies.length === 0) break;
                if (idx >= nearbyEnemies.length) idx = 0;
              }
            } else {
              target.statusEffects.push({ id: 'poison', turnsLeft: 3, stacks: 1 });
              remaining--;
              idx++;
            }
          }
          for (const e of G.units.filter(u => u.hp > 0 && u.statusEffects && u.statusEffects.find(se => se.id === 'poison'))) {
            const pEff = e.statusEffects.find(se => se.id === 'poison');
            if (pEff) addLog(`  ☠ ${getDisplayName(e)}: ${pEff.stacks} poison stack${pEff.stacks > 1 ? 's' : ''}`);
          }
        }
      }
    }
    // Gravecall: spawn a lesser zombie on the dead enemy's tile
    if (hasPassive(attacker, 'gravecall') && Math.random() <= 0.25) {
      const rdx = defender.x, rdy = defender.y;
      if (!G.board[rdy][rdx] || !G.board[rdy][rdx].type || G.board[rdy][rdx].amount <= 0) {
        const rdPlayer = G.players[attacker.playerId];
        const rdPrefix = rdPlayer.faction && FACTIONS[rdPlayer.faction] ? FACTIONS[rdPlayer.faction].prefix : '';
        const raisedZombie = createUnit('lesser_zombie', attacker.playerId, rdx, rdy, rdPrefix, rdPlayer.faction);
        raisedZombie.id = G.nextUnitId++;
        nextUnitId = G.nextUnitId;
        raisedZombie.movementLeft = 0;
        raisedZombie.hasAttacked = true;
        G.units.push(raisedZombie);
        addLog(`🧟 ${getDisplayName(attacker)}'s Gravecall raises a lesser zombie from the fallen!`);
      }
    }
    // Bone Collector: if the dead unit is a skeleton warrior (not elite) and a friendly Bonelord is within 5 tiles, 40% chance to revive at nearest barracks
    if (defender.type === 'warrior' && defender.faction === 'skeletons') {
      const bonelord = G.units.find(u =>
        u.hp > 0 && u.playerId === defender.playerId &&
        hasPassive(u, 'bone_collector') &&
        chebyshevDist(defender.x, defender.y, u.x, u.y) <= 5
      );
      if (bonelord && Math.random() < 0.5) {
        // Find nearest skeleton barracks belonging to the same player
        const barracks = (G.structures || []).filter(s =>
          s.type === 'barracks' && s.playerId === defender.playerId
        );
        if (barracks.length > 0) {
          barracks.sort((a, b) =>
            chebyshevDist(defender.x, defender.y, a.x, a.y) - chebyshevDist(defender.x, defender.y, b.x, b.y)
          );
          const targetBarracks = barracks[0];
          // Find an empty adjacent tile near the barracks to spawn the revived warrior
          const spawnDirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1],[0,0]];
          let spawnTile = null;
          for (const [sdx, sdy] of spawnDirs) {
            const sx = targetBarracks.x + sdx, sy = targetBarracks.y + sdy;
            if (sx < 0 || sx >= G.boardSize || sy < 0 || sy >= G.boardSize) continue;
            if (G.board[sy][sx] && G.board[sy][sx].type) continue;
            if (G.units.some(u => u.hp > 0 && u.x === sx && u.y === sy)) continue;
            if ((G.structures || []).some(s => s.x === sx && s.y === sy && !(s.x === targetBarracks.x && s.y === targetBarracks.y))) continue;
            spawnTile = { x: sx, y: sy };
            break;
          }
          if (spawnTile) {
            const bcPlayer = G.players[defender.playerId];
            const bcPrefix = bcPlayer.faction && FACTIONS[bcPlayer.faction] ? FACTIONS[bcPlayer.faction].prefix : '';
            const revived = createUnit('warrior', defender.playerId, spawnTile.x, spawnTile.y, bcPrefix, bcPlayer.faction);
            revived.id = G.nextUnitId++;
            nextUnitId = G.nextUnitId;
            revived.movementLeft = 0;
            revived.hasAttacked = true;
            revived.hp = Math.floor(getUnitStats(revived).maxHp / 2); // revive at half HP
            G.units.push(revived);
            addLog(`🦴 ${getDisplayName(bonelord)}'s Bone Collector revives a Skeleton Warrior at the barracks!`);
          }
        }
      }
    }
    // Pestilence: if dead unit was poisoned and an enemy with pestilence is within 5 tiles, spawn a plague rat
    if (hasStatusEffect(defender, 'poison')) {
      const pestilenceUnit = G.units.find(u =>
        u.hp > 0 && u.playerId !== defender.playerId &&
        hasPassive(u, 'pestilence') &&
        chebyshevDist(defender.x, defender.y, u.x, u.y) <= 5
      );
      if (pestilenceUnit) {
        let spawnX = defender.x, spawnY = defender.y;
        const tileOccupied = G.units.some(u => u.hp > 0 && u.x === spawnX && u.y === spawnY && u.id !== defender.id);
        if (tileOccupied) {
          // Try adjacent tiles
          const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
          let found = false;
          for (const [dx, dy] of dirs) {
            const nx = defender.x + dx, ny = defender.y + dy;
            if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
            if (G.units.some(u => u.hp > 0 && u.x === nx && u.y === ny)) continue;
            spawnX = nx; spawnY = ny; found = true; break;
          }
          if (!found) { spawnX = -1; } // no space
        }
        if (spawnX >= 0) {
          const pPlayer = G.players[pestilenceUnit.playerId];
          const pPrefix = pPlayer.faction && FACTIONS[pPlayer.faction] ? FACTIONS[pPlayer.faction].prefix : '';
          const rat = createUnit('plague_rat', pestilenceUnit.playerId, spawnX, spawnY, pPrefix, pPlayer.faction);
          rat.id = G.nextUnitId++;
          nextUnitId = G.nextUnitId;
          rat.movementLeft = 0;
          rat.hasAttacked = true;
          G.units.push(rat);
          addLog(`🐀 ${getDisplayName(pestilenceUnit)}'s Pestilence spawns a Plague Rat from the poisoned corpse!`);
        }
      }
    }
    grantSoulBarricadeStacks(defender);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(defender.playerId);
    setAttackOutcome('kill');
    return true; // defender died
  }

  // Retaliate passive: 50% chance to counter-attack when hit by adjacent unit (not during AoO)
  // Thorns passive: deal 1 damage per stack back to melee attackers (stacks)
  const thornsStacks = countPassive(defender, 'thorns');
  if (defender.hp > 0 && attacker.hp > 0 && isAdjacent(attacker.x, attacker.y, defender.x, defender.y) && thornsStacks > 0) {
    attacker.hp -= thornsStacks;
    addLog(`🌿 ${getDisplayName(defender)}'s thorns deal ${thornsStacks} damage to ${getDisplayName(attacker)}! (${attacker.hp > 0 ? attacker.hp + ' HP left' : 'DEFEATED!'})`);
    if (attacker.hp <= 0) {
      addLog(`☠ ${getDisplayName(attacker)} has been defeated by thorns!`);
      finalizeUnitDeath(attacker);
    }
  }

  // Inferno Armor passive: set melee attackers on fire
  if (defender.hp > 0 && attacker.hp > 0 && isAdjacent(attacker.x, attacker.y, defender.x, defender.y) && hasPassive(defender, 'inferno_armor')) {
    applyStatusEffect(attacker, 'burning', 2);
    if (hasStatusEffect(attacker, 'burning')) {
      addLog(`🔥 ${getDisplayName(defender)}'s Inferno Armor sets ${getDisplayName(attacker)} ablaze!`);
    }
  }

  // Venomous Armor passive: poison melee attackers
  if (defender.hp > 0 && attacker.hp > 0 && isAdjacent(attacker.x, attacker.y, defender.x, defender.y) && hasPassive(defender, 'venomous_armor')) {
    applyStatusEffect(attacker, 'poison', 3);
    if (hasStatusEffect(attacker, 'poison')) {
      addLog(`☠ ${getDisplayName(defender)}'s Venomous Armor poisons ${getDisplayName(attacker)}!`);
    }
  }

  // Static Shock passive: 2-4 lightning damage to melee attackers
  if (defender.hp > 0 && attacker.hp > 0 && isAdjacent(attacker.x, attacker.y, defender.x, defender.y) && hasPassive(defender, 'static_shock')) {
    const shockDmg = 2 + Math.floor(Math.random() * 3);
    let finalShock = shockDmg;
    const atkBulwark = countPassive(attacker, 'bulwark');
    if (atkBulwark > 0 && finalShock > 1) finalShock = Math.max(1, finalShock - atkBulwark);
    attacker.hp -= finalShock;
    addLog(`⚡ ${getDisplayName(defender)}'s Static Armor shocks ${getDisplayName(attacker)} for ${finalShock} damage! (${attacker.hp > 0 ? attacker.hp + ' HP left' : 'DEFEATED!'})`);
    if (attacker.hp <= 0) {
      addLog(`☠ ${getDisplayName(attacker)} has been defeated by static shock!`);
      finalizeUnitDeath(attacker);
    }
  }

  if (!isAoO && defender.hp > 0 && attacker.hp > 0 && !hasStatusEffect(defender, 'beguiled') && isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
    if (hasPassive(defender, 'retaliate') && Math.random() < 0.5) {
      addLog(`⚔ ${getDisplayName(defender)} retaliates!`);
      performAttack(defender, attacker, { isAoO: true });
    }
  }

  // Pack Guardian: tamed beast within 5 tiles charges and retaliates when master is hit
  if (!isAoO && defender.hp > 0 && attacker.hp > 0 && hasPassive(defender, 'pack_guardian')) {
    const tamedBeast = G.units.find(b => b.hp > 0 && (b.type === 'beast' || b.type === 'warg' || b.type === 'hydra') && b.tamedBy === defender.id && chebyshevDist(b.x, b.y, defender.x, defender.y) <= 5);
    if (tamedBeast) {
      // Move beast adjacent to attacker if not already
      if (!isAdjacent(tamedBeast.x, tamedBeast.y, attacker.x, attacker.y)) {
        const dirs8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
        let chargeTile = null;
        for (const [dx, dy] of dirs8) {
          const nx = attacker.x + dx, ny = attacker.y + dy;
          if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
          if (G.units.some(u => u.hp > 0 && u.x === nx && u.y === ny)) continue;
          const cell = G.board[ny][nx];
          if (cell && cell.type && cell.amount > 0) continue;
          chargeTile = { x: nx, y: ny };
          break;
        }
        if (chargeTile) {
          tamedBeast.x = chargeTile.x;
          tamedBeast.y = chargeTile.y;
          addLog(`🐾 ${getDisplayName(tamedBeast)} charges to defend ${getDisplayName(defender)}!`);
          performAttack(tamedBeast, attacker, { isAoO: true });
        }
      } else {
        addLog(`🐾 ${getDisplayName(tamedBeast)} retaliates to defend ${getDisplayName(defender)}!`);
        performAttack(tamedBeast, attacker, { isAoO: true });
      }
    }
  }

  // Sundering Blows passive: apply Sundered (-2 DEF) on hit
  if (damage > 0 && defender.hp > 0 && hasPassive(attacker, 'sundering_blows')) {
    applyStatusEffect(defender, 'sundered', 2);
    if (hasStatusEffect(defender, 'sundered')) {
      addLog(`⚒ ${getDisplayName(attacker)}'s Sundering Blows weaken ${getDisplayName(defender)}'s armor! (-2 DEF)`);
    }
  }

  // Combat lock chance on melee hit — base 20% + weapon/shield bonuses
  // Relentless Assault: also applies on ranged (non-magic) attacks
  const isAdj = isAdjacent(attacker.x, attacker.y, defender.x, defender.y);
  const attackerWpn = attacker.equipment && attacker.equipment.mainhand;
  const isRangedNonMagic = !isAdj && attackerWpn && attackerWpn !== '_two_handed_' && attackerWpn.range && !attackerWpn.magicDamage;
  const canCombatLock = isAdj || (isRangedNonMagic && hasPassive(attacker, 'relentless_assault'));
  if (damage > 0 && defender.hp > 0 && canCombatLock) {
    let lockChance = 20;
    // Relentless Assault: +30% base combat lock chance
    if (hasPassive(attacker, 'relentless_assault')) lockChance += 30;
    if (attacker.equipment) {
      for (const slot of getUnitEquipSlots(attacker)) {
        const item = attacker.equipment[slot];
        if (item && item !== '_two_handed_' && item.combatLockBonus) {
          lockChance += item.combatLockBonus;
        }
      }
    }
    if (Math.random() * 100 < lockChance && !hasStatusEffect(defender, 'combat_locked')) {
      applyStatusEffect(defender, 'combat_locked', 2);
      if (hasStatusEffect(defender, 'combat_locked')) {
        addLog(`🔒 ${getDisplayName(defender)} is locked in combat by ${getDisplayName(attacker)}!`);
      }
    }
  }

  } else {
    if (USE_NEW_COMBAT) {
      // Hit connected but failed to wound (armor absorbed it)
      addLog(`${prefix}${getDisplayName(attacker)} ${isAoO ? 'hits' : 'attacks'} ${getDisplayName(defender)} — glancing blow! No damage. (${rollDetails}, needed ${woundTarget}+ to wound)`);
    } else {
      addLog(`${prefix}${getDisplayName(attacker)} ${isAoO ? 'swings at' : 'attacks'} ${getDisplayName(defender)} — ${rollDetails} → MISS!`);
    }
    attacker._lastDamageDealt = 0;
    if (!isAoO && defender.hp > 0 && attacker.hp > 0 && !hasStatusEffect(defender, 'beguiled') && isAdjacent(attacker.x, attacker.y, defender.x, defender.y) && defender.playerId === NPC_PLAYER_ID) {
      beastRetaliate(defender, attacker);
    }
    if (USE_NEW_COMBAT) setAttackOutcome('glance');
    else setAttackOutcome('miss');
  }

  if (damage > 0) setAttackOutcome('hit');
}

// NPC retaliation: charge toward attacker and counter-attack if adjacent
function getNpcEmoji(unit) {
  if (unit.type === 'ancient_dragon') return '🐉';
  if (unit.type === 'warg') return '🐺';
  if (unit.type === 'stone_golem') return '🗿';
  if (unit.type === 'bandit') return '🗡️';
  if (unit.type === 'rabid_rat') return '🐀';
  if (unit.type === 'glowing_wisp') return '✨';
  if (unit.type === 'hydra') return '🐍';
  return '🐉'; // default for foul beast and any others
}

function beastRetaliate(beast, attacker) {
  if (!beast || beast.hp <= 0 || beast.playerId !== NPC_PLAYER_ID) return;
  if (!attacker || attacker.hp <= 0) return;
  if (hasStatusEffect(beast, 'beguiled')) return;
  const emoji = getNpcEmoji(beast);
  if (isAdjacent(beast.x, beast.y, attacker.x, attacker.y)) {
    addLog(`${emoji} ${getDisplayName(beast)} retaliates!`);
    performAttack(beast, attacker);
    if (attacker.hp <= 0) selectedUnitId = null;
  } else {
    beastChaseToward(beast, attacker);
    // If the charge brought it adjacent, also attack
    if (beast.hp > 0 && attacker.hp > 0 && isAdjacent(beast.x, beast.y, attacker.x, attacker.y)) {
      addLog(`${emoji} ${getDisplayName(beast)} retaliates!`);
      performAttack(beast, attacker);
      if (attacker.hp <= 0) selectedUnitId = null;
    }
  }
}

function triggerBeastRetaliationIfNpc(target, attacker) {
  if (target && target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, attacker);
}

function resolveAttack(attacker, defender) {
  // Reflect passive: 30% chance to reflect ranged projectile attacks back (not magic weapons)
  const dist = chebyshevDist(attacker.x, attacker.y, defender.x, defender.y);
  const attackerWeapon = attacker.equipment && attacker.equipment.mainhand;
  const isMagicWeapon = attackerWeapon && attackerWeapon !== '_two_handed_' && attackerWeapon.magicDamage;
  if (dist > 1 && !isMagicWeapon && hasPassive(defender, 'reflect') && Math.random() < REFLECT_CHANCE) {
    addLog(`🔃 ${getDisplayName(defender)} reflects the projectile back at ${getDisplayName(attacker)}!`);
    performAttack(defender, attacker);
    attacker.hasAttacked = true;
    interactionMode = 'idle';
    renderAll();
    return;
  }

  const defenderX = defender.x, defenderY = defender.y;
  const defenderDied = performAttack(attacker, defender);

  // Sweeping Strikes: when you hit an enemy, roll a full attack against one other adjacent enemy
  if (attacker.hp > 0 && hasPassive(attacker, 'sweeping_strikes') && attacker._lastDamageDealt > 0) {
    const sweepTargets = G.units.filter(e =>
      e.hp > 0 && e.id !== defender.id && e.id !== attacker.id &&
      e.playerId !== attacker.playerId &&
      isAdjacent(defenderX, defenderY, e.x, e.y)
    );
    if (sweepTargets.length > 0) {
      const sweepTarget = sweepTargets[Math.floor(Math.random() * sweepTargets.length)];
      addLog(`🌀 ${getDisplayName(attacker)}'s Sweeping Strikes cleaves into ${getDisplayName(sweepTarget)}!`);
      performAttack(attacker, sweepTarget);
    }
  }

  // Twinshot: fire a second arrow when attacking with a bow
  const mh = attacker.equipment && attacker.equipment.mainhand;
  const isBowAttack = mh && mh !== '_two_handed_' && mh.weaponType === 'bow';
  if (!defenderDied && attacker.hp > 0 && defender.hp > 0 && hasPassive(attacker, 'twinshot') && isBowAttack) {
    addLog(`🏹 ${getDisplayName(attacker)}'s Twinshot fires a second arrow!`);
    performAttack(attacker, defender);
  }

  // Double Edged Sword: second hit if mainhand has selfBleed
  if (!defenderDied && attacker.hp > 0 && defender.hp > 0 && attacker.equipment && attacker.equipment.mainhand && attacker.equipment.mainhand.selfBleed) {
    addLog(`⚔️ ${getDisplayName(attacker)}'s Double Edged Sword swings again!`);
    performAttack(attacker, defender);
  }

  // Double Strike: swing with offhand weapon
  if (!defenderDied && attacker.hp > 0 && defender.hp > 0 && hasPassive(attacker, 'double_strike') &&
      attacker.equipment && attacker.equipment.offhand && attacker.equipment.offhand !== '_two_handed_' &&
      attacker.equipment.offhand.slot === 'mainhand') {
    addLog(`⚔️ ${getDisplayName(attacker)} swings with their offhand ${attacker.equipment.offhand.name}!`);
    performAttack(attacker, defender);
  }

  // Double Edged Sword: always self-bleed on attack
  if (attacker.hp > 0 && attacker.equipment && attacker.equipment.mainhand && attacker.equipment.mainhand.selfBleed) {
    applyStatusEffect(attacker, 'bleeding', 4);
    addLog(`🩸 ${getDisplayName(attacker)} cuts themselves on the Double Edged Sword! Bleeding for 4 turns!`);
  }

  // Mirrored: mirror image duplicates normal attacks with magic weapons
  if (attacker.hp > 0 && defender.hp > 0) triggerMirrorNormalAttack(attacker, defender);

  // NPC chase toward attacker when hit at range (melee retaliation handled elsewhere)
  if (!defenderDied && defender.playerId === NPC_PLAYER_ID && attacker.hp > 0) {
    if (!isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
      beastChaseToward(defender, attacker);
    }
  }

  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function resolveAttackStructure(attacker, structure) {
  const aStats = getUnitStats(attacker);
  const sDef = STRUCTURE_DEFS[structure.type];
  const faction = FACTIONS[structure.faction];
  const structDisplayName = (sDef.factionNames && sDef.factionNames[structure.faction]) || sDef.name;
  const structName = `${faction.prefix} ${structDisplayName}`;

  // Structures don't dodge — straight ATK roll vs fixed defense of 2
  const atkRoll = rollD6() + aStats.attack + 2;
  const defRoll = rollD6() + 2;
  let damage = Math.max(1, atkRoll - defRoll);

  // Demolitionist passive: double damage to structures
  if (hasPassive(attacker, 'demolitionist')) {
    damage *= 2;
    addLog(`💣 Demolitionist! ${getDisplayName(attacker)} deals double damage to the structure!`);
  }

  queueTileShudderOnlyEffect(structure.x, structure.y);
  structure.hp -= damage;
  if (structure.hp <= 0) {
    structure.hp = 0;
    queueStructureDeathEffects(structure.x, structure.y);
    addLog(`🏚️ ${getDisplayName(attacker)} attacks ${structName} — ${damage} damage! DESTROYED!`);
    G.structures = G.structures.filter(s => s !== structure);
    if (selectedStructure === structure) selectedStructure = null;
  } else {
    addLog(`⚔ ${getDisplayName(attacker)} attacks ${structName} — ${damage} damage! (${structure.hp} HP left)`);
  }

  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function resolveAttackWall(attacker, x, y, wallTile) {
  const aStats = getUnitStats(attacker);
  // Walls use structure-like damage resolution.
  const atkRoll = rollD6() + aStats.attack + 2;
  const defRoll = rollD6() + 2;
  let damage = Math.max(1, atkRoll - defRoll);

  if (hasPassive(attacker, 'demolitionist')) {
    damage *= 2;
    addLog(`💣 Demolitionist! ${getDisplayName(attacker)} deals double damage to the wall!`);
  }

  queueTileShudderOnlyEffect(x, y);
  wallTile.amount -= damage;
  if (wallTile.amount <= 0) {
    G.board[y][x] = null;
    addLog(`🧱⚔ ${getDisplayName(attacker)} smashes through a wall at (${x},${y})!`);
  } else {
    addLog(`🧱⚔ ${getDisplayName(attacker)} attacks wall at (${x},${y}) — ${damage} damage! (${wallTile.amount} HP left)`);
  }

  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function resolveDoubleStrike(attacker, defender) {
  addLog(`⚡ ${getDisplayName(attacker)} uses Double Strike!`);
  const defenderDied = performAttack(attacker, defender, { isDoubleStrike: true });

  // NPC retaliation
  if (!defenderDied && defender.playerId === NPC_PLAYER_ID && attacker.hp > 0) {
    if (isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
      addLog(`${getNpcEmoji(defender)} ${getDisplayName(defender)} retaliates!`);
      performAttack(defender, attacker);
      if (attacker.hp <= 0) {
        selectedUnitId = null;
      }
    } else {
      beastChaseToward(defender, attacker);
    }
  }

  startAbilityCooldown(attacker, 'double_strike');
  // hasAttacked is NOT set — allows a second attack this turn
  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// FACTION ABILITIES
// ============================================================
function getLeapTiles(unit) {
  // Elf Leap: jump over an adjacent obstacle/resource to the tile beyond it
  const tiles = [];
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  for (const [dx, dy] of dirs) {
    const midX = unit.x + dx;
    const midY = unit.y + dy;
    const farX = unit.x + dx * 2;
    const farY = unit.y + dy * 2;
    if (farX < 0 || farX >= G.boardSize || farY < 0 || farY >= G.boardSize) continue;
    // Middle tile must have an obstacle (resource with amount > 0) or a unit
    const midCell = G.board[midY][midX];
    const midHasObstacle = (midCell && midCell.type && midCell.amount > 0);
    const midHasUnit = G.units.some(u => u.hp > 0 && u.x === midX && u.y === midY);
    if (!midHasObstacle && !midHasUnit) continue;
    // Far tile must be empty (no unit) and not an impassable resource
    const farCell = G.board[farY][farX];
    const farBlocked = (farCell && farCell.type && farCell.amount > 0);
    if (farBlocked) continue;
    if (G.units.some(u => u.hp > 0 && u.x === farX && u.y === farY)) continue;
    if (G.barrels && G.barrels.some(b => b.x === farX && b.y === farY)) continue;
    tiles.push({ x: farX, y: farY });
  }
  return tiles;
}

function executeRally(unit) {
  // Human Rally: +3 ATK to all adjacent allies for this turn
  const allies = G.units.filter(u =>
    u.hp > 0 && u.id !== unit.id && u.playerId === unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  for (const ally of allies) {
    ally.rallyBonus = 3;
  }
  startAbilityCooldown(unit, 'human_rally');
  addLog(`📯 ${getDisplayName(unit)} rallies ${allies.length} nearby ${allies.length === 1 ? 'ally' : 'allies'}! (+3 ATK)`);
  renderAll();
}

// Magic weapon actions that the Mirror Image can duplicate
const MAGIC_WEAPON_ACTIONS = ['fireball', 'frost_ray', 'lightning_bolt', 'life_drain', 'poison_cloud', 'runic_conjure', 'curse_hex', 'lethargy', 'flash_freeze', 'enfeeble', 'gore_curse'];

function isMagicWeapon(item) {
  if (!item || item === '_two_handed_') return false;
  if (item.magicDamage) return true;
  return item.action && MAGIC_WEAPON_ACTIONS.includes(item.action);
}

function triggerMirrorNormalAttack(attacker, defender) {
  // Mirrored passive: when attacking with a magic weapon, mirror image also attacks
  if (!hasPassive(attacker, 'mirrored')) return;
  if (!attacker.equipment || !isMagicWeapon(attacker.equipment.mainhand)) return;
  if (!defender || defender.hp <= 0) return;
  const mirror = G.units.find(u => u.hp > 0 && u.isMirrorImage && u.mirrorOwnerId === attacker.id);
  if (!mirror) return;
  addLog(`🪞 ${getDisplayName(attacker)}'s Mirror Image mimics the attack!`);
  performAttack(attacker, defender, { isMirrorAttack: true });
}

function triggerMirrorDuplicate(caster, abilityId, target) {
  // Mirrored passive: when the caster uses a magic weapon ability, the mirror image echoes it
  if (!hasPassive(caster, 'mirrored')) return;
  if (!MAGIC_WEAPON_ACTIONS.includes(abilityId)) return;
  const mirror = G.units.find(u => u.hp > 0 && u.isMirrorImage && u.mirrorOwnerId === caster.id);
  if (!mirror) return;

  const cStats = getUnitStats(caster); // Use wizard's INT for damage
  addLog(`🪞 ${getDisplayName(caster)}'s Mirror Image echoes the spell!`);

  if (abilityId === 'fireball') {
    if (!target || target.hp <= 0) return;
    const baseDmg = 4 + Math.floor(cStats.int / 3);
    let dmg = baseDmg;
    if (countPassive(target, 'bulwark') > 0 && dmg > 1) dmg = Math.max(1, dmg - countPassive(target, 'bulwark'));
    if (hasPassive(target, 'magic_resistance')) { dmg = Math.max(0, dmg - 2); addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`); }
    target.hp -= dmg;
    addLog(`🪞🔥 Mirror Fireball hits ${getDisplayName(target)} for ${dmg} damage! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'burning', 2);
    triggerBeastRetaliationIfNpc(target, caster);
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); }
    const splashTargets = G.units.filter(u =>
      u.hp > 0 && u.id !== target.id && u.id !== caster.id && u.id !== mirror.id && u.playerId !== caster.playerId &&
      isAdjacent(target.x, target.y, u.x, u.y)
    );
    for (const st of splashTargets) {
      let sDmg = 2;
      if (countPassive(st, 'bulwark') > 0 && sDmg > 1) sDmg = Math.max(1, sDmg - countPassive(st, 'bulwark'));
      if (hasPassive(st, 'magic_resistance')) { sDmg = Math.max(0, sDmg - 2); addLog(`✨ ${getDisplayName(st)}'s Magic Resistance reduces the damage!`); }
      st.hp -= sDmg;
      addLog(`🪞🔥 Mirror splash hits ${getDisplayName(st)} for ${sDmg}! (${st.hp > 0 ? st.hp + ' HP' : 'DEFEATED!'})`);
      if (st.hp > 0) applyStatusEffect(st, 'burning', 2);
      triggerBeastRetaliationIfNpc(st, caster);
      if (st.hp <= 0) { st.hp = 0; dropAllItems(st); }
    }
    const allHit = [target, ...splashTargets];
    G.units = G.units.filter(u => u.hp > 0);
    for (const t of allHit) { if (t.hp <= 0) checkPlayerElimination(t.playerId); }
  }

  if (abilityId === 'frost_ray') {
    if (!target || target.hp <= 0) return;
    const baseDmg = 3 + Math.floor(cStats.int / 3);
    let dmg = baseDmg;
    if (countPassive(target, 'bulwark') > 0 && dmg > 1) dmg = Math.max(1, dmg - countPassive(target, 'bulwark'));
    if (hasPassive(target, 'magic_resistance')) { dmg = Math.max(0, dmg - 2); addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`); }
    target.hp -= dmg;
    addLog(`🪞❄️ Mirror Frost Ray hits ${getDisplayName(target)} for ${dmg} damage! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'frozen', 1);
    triggerBeastRetaliationIfNpc(target, caster);
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
  }

  if (abilityId === 'lightning_bolt') {
    if (!target || target.hp <= 0) return;
    const baseDmg = 5 + Math.floor(cStats.int / 3);
    let dmg = baseDmg;
    if (countPassive(target, 'bulwark') > 0 && dmg > 1) dmg = Math.max(1, dmg - countPassive(target, 'bulwark'));
    if (hasPassive(target, 'magic_resistance')) { dmg = Math.max(0, dmg - 2); addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`); }
    target.hp -= dmg;
    addLog(`🪞⚡ Mirror Lightning Bolt hits ${getDisplayName(target)} for ${dmg} damage! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'slowed', 2);
    triggerBeastRetaliationIfNpc(target, caster);
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
  }

  if (abilityId === 'life_drain') {
    if (!target || target.hp <= 0) return;
    const baseDmg = 3 + Math.floor(cStats.int / 4);
    let dmg = baseDmg;
    if (countPassive(target, 'bulwark') > 0 && dmg > 1) dmg = Math.max(1, dmg - countPassive(target, 'bulwark'));
    if (hasPassive(target, 'magic_resistance')) { dmg = Math.max(0, dmg - 2); addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`); }
    target.hp -= dmg;
    const healAmt = Math.min(dmg, cStats.maxHp - caster.hp);
    if (healAmt > 0) caster.hp += healAmt;
    addLog(`🪞💜 Mirror Life Drain hits ${getDisplayName(target)} for ${dmg} and heals ${getDisplayName(caster)} ${healAmt} HP! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    triggerBeastRetaliationIfNpc(target, caster);
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
  }

  if (abilityId === 'poison_cloud') {
    const enemies = G.units.filter(u =>
      u.hp > 0 && u.playerId !== caster.playerId &&
      chebyshevDist(mirror.x, mirror.y, u.x, u.y) <= 2
    );
    for (const enemy of enemies) {
      if (hasPassive(enemy, 'magic_resistance')) {
        addLog(`🪞✨ ${getDisplayName(enemy)}'s Magic Resistance blocks the Mirror Poison Cloud!`);
        continue;
      }
      enemy.hp -= 1;
      applyStatusEffect(enemy, 'poison', 3);
      addLog(`🪞☠ Mirror Poison Cloud hits ${getDisplayName(enemy)}!${hasStatusEffect(enemy, 'poison') ? ' Poisoned!' : ''} (${enemy.hp > 0 ? enemy.hp + ' HP' : 'DEFEATED!'})`);
      triggerBeastRetaliationIfNpc(enemy, caster);
      if (enemy.hp <= 0) { enemy.hp = 0; dropAllItems(enemy); }
    }
    G.units = G.units.filter(u => u.hp > 0);
    for (const enemy of enemies) { if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId); }
  }

  if (abilityId === 'runic_conjure') {
    const consumableId = CONSUMABLE_IDS[Math.floor(Math.random() * CONSUMABLE_IDS.length)];
    const item = JSON.parse(JSON.stringify(CONSUMABLES[consumableId]));
    caster.inventory.push(item);
    addLog(`🪞✨ Mirror Image echoes the conjuration: ${item.icon || '🧪'} ${item.name}!`);
  }

  // Utility hex echoes (no-damage debuffs)
  const UTILITY_HEX_MAP = { curse_hex: 'cursed', lethargy: 'slowed', flash_freeze: 'frozen', enfeeble: 'weakened', gore_curse: 'bleeding' };
  const UTILITY_HEX_ICONS = { curse_hex: '👻', lethargy: '🐌', flash_freeze: '❄️', enfeeble: '💀', gore_curse: '🩸' };
  if (UTILITY_HEX_MAP[abilityId] && target && target.hp > 0) {
    if (hasPassive(target, 'magic_resistance')) {
      addLog(`🪞${UTILITY_HEX_ICONS[abilityId]} Mirror's spell fizzles — ${getDisplayName(target)} resists with Magic Resistance!`);
    } else {
      applyStatusEffect(target, UTILITY_HEX_MAP[abilityId], 2);
      addLog(`🪞${UTILITY_HEX_ICONS[abilityId]} Mirror echoes the hex on ${getDisplayName(target)}!`);
    }
  }
}

function executeMirrorImage(unit) {
  // Mirror Image: summon an identical-looking copy on an adjacent empty tile
  // Remove any existing mirror image owned by this unit
  const oldMirror = G.units.find(u => u.isMirrorImage && u.mirrorOwnerId === unit.id);
  if (oldMirror) {
    G.units = G.units.filter(u => u !== oldMirror);
    addLog(`🪞 ${getDisplayName(unit)}'s old mirror image fades.`);
  }

  const dirs8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const candidates = [];
  for (const [dx, dy] of dirs8) {
    const nx = unit.x + dx, ny = unit.y + dy;
    if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
    if (G.units.some(o => o.hp > 0 && o.x === nx && o.y === ny)) continue;
    if (G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) continue;
    const cell = G.board[ny][nx];
    if (cell && cell.type && cell.amount > 0) continue;
    candidates.push({ x: nx, y: ny });
  }
  if (candidates.length === 0) return;

  const spot = candidates[Math.floor(Math.random() * candidates.length)];

  // Create a mirror image unit that looks like the caster
  const mirror = {
    id: nextUnitId++,
    playerId: unit.playerId,
    type: 'hero',
    faction: unit.faction,
    heroChoice: unit.heroChoice,
    name: unit.name,
    customName: unit.customName,
    typeLabel: unit.typeLabel,
    x: spot.x, y: spot.y,
    hp: 1, maxHp: 1,
    movement: unit.movement,
    attack: 0, defense: 0,
    str: 0, agi: 0, con: 0, int: unit.int,
    canGather: false, canFight: false,
    hasAttacked: true,
    hasGathered: true,
    hasUsedItemAction: true,
    specialActionsUsed: [],
    rallyBonus: 0, stoneSkinBonus: 0, divineShieldBonus: 0,
    berserkBonus: 0, berserkPenalty: 0, berserkTurns: 0, battleCryBonus: 0,
    battleCryTurns: 0, trollBlessingTurns: 0,
    regenPotionTurns: 0, combatRegenTurns: 0,
    stunned: false,
    cooldowns: {},
    statusEffects: [],
    passives: [],
    inventory: [],
    equipment: { mainhand: null, offhand: null, head: null, body: null, legs: null, feet: null, hands: null, accessory: null },
    isMirrorImage: true,
    mirrorOwnerId: unit.id,
    movementLeft: 0,
  };

  G.units.push(mirror);
  G.nextUnitId = nextUnitId;
  startAbilityCooldown(unit, 'mirror_image');
  addLog(`🪞 ${getDisplayName(unit)} conjures a Mirror Image!`);
  renderAll();
}

function executeConsecrate(unit) {
  // Consecrate: deal 1 damage and Weaken all enemies within 1 tile. Lasts 3 turns.
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && chebyshevDist(unit.x, unit.y, u.x, u.y) <= 1
  );
  for (const enemy of enemies) {
    enemy.hp -= 1;
    applyStatusEffect(enemy, 'weakened', 2);
    addLog(`✝ Consecrate hits ${getDisplayName(enemy)} for 1 damage! Weakened! (${enemy.hp > 0 ? enemy.hp + ' HP left' : 'DEFEATED!'})`);
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      dropAllItems(enemy);
      addLog(`☠ ${getDisplayName(enemy)} has been slain!`);
    }
  }
  G.units = G.units.filter(u => u.hp > 0);
  for (const enemy of enemies) {
    if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId);
  }
  unit.consecrateTurns = 3; // Lasts 3 turns total (cast + 2 more ticks)
  startAbilityCooldown(unit, 'consecrate');
  addLog(`✝ ${getDisplayName(unit)} consecrates the ground! ${enemies.length} ${enemies.length === 1 ? 'enemy' : 'enemies'} hit!`);
  renderAll();
}

function executeWarCry(unit) {
  // Orc War Cry: stun all adjacent enemies (they cannot attack this turn)
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  for (const enemy of enemies) {
    enemy.stunned = true;
    enemy.hasAttacked = true; // prevent attacking
  }
  startAbilityCooldown(unit, 'orc_warcry');
  addLog(`💥 ${getDisplayName(unit)} lets out a War Cry! ${enemies.length} ${enemies.length === 1 ? 'enemy is' : 'enemies are'} stunned!`);
  // Beast retaliation (beasts are stunned, but still charge)
  for (const enemy of enemies) {
    if (enemy.hp > 0 && enemy.playerId === NPC_PLAYER_ID) {
      beastChaseToward(enemy, unit);
    }
  }
  renderAll();
}

function executeBloodrend(caster, target) {
  // Bloodrend: deal flat 5 damage to an adjacent bleeding enemy
  if (!hasStatusEffect(target, 'bleeding')) {
    addLog(`❌ ${getDisplayName(target)} is not bleeding! Bloodrend has no effect.`);
    interactionMode = 'idle';
    renderAll();
    return;
  }
  let dmg = 5;
  const bountyBR = hasStatusEffect(target, 'bounty_marked');
  if (bountyBR) dmg += 3;
  target.hp -= dmg;
  addLog(`🩸 ${getDisplayName(caster)} rends ${getDisplayName(target)}'s bleeding wounds for ${dmg} damage!${bountyBR ? ' 💰+3 Bounty' : ''} (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
  if (target.hp <= 0) {
    target.hp = 0;
    dropAllItems(target);
    addLog(`☠ ${getDisplayName(target)} has been slain!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(target.playerId);
  }
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
  startAbilityCooldown(caster, 'bloodrend');
  interactionMode = 'idle';
  renderAll();
}

function executeSmokeBomb(unit) {
  unit.smokeBombTurns = 3;
  startAbilityCooldown(unit, 'smoke_bomb');
  addLog(`💨 ${getDisplayName(unit)} deploys a Smoke Bomb! Concealed by smoke for 3 turns.`);
  renderAll();
}

function executeBlink(unit, tx, ty) {
  const oldX = unit.x, oldY = unit.y;
  unit.x = tx;
  unit.y = ty;
  startAbilityCooldown(unit, 'blink');
  addLog(`✨ ${getDisplayName(unit)} blinks from (${oldX},${oldY}) to (${tx},${ty})!`);
  interactionMode = 'idle';
  renderAll();
}

function executeCorruptedChalice(caster, target) {
  const sacrificeHp = 5;
  const healHp = 5;
  caster.hp -= sacrificeHp;
  addLog(`🍷 ${getDisplayName(caster)} sacrifices ${sacrificeHp} HP! (${caster.hp > 0 ? caster.hp + ' HP left' : 'DEFEATED!'})`);
  if (caster.hp <= 0) {
    caster.hp = 0;
    dropAllItems(caster);
    addLog(`☠ ${getDisplayName(caster)} has been defeated by the Corrupted Chalice!`);
  }
  const tStats = getUnitStats(target);
  const before = target.hp;
  target.hp = Math.min(tStats.maxHp, target.hp + healHp);
  const healed = target.hp - before;
  addLog(`💚 ${getDisplayName(target)} heals for ${healed} HP from the Corrupted Chalice! (${target.hp}/${tStats.maxHp})`);
  startAbilityCooldown(caster, 'corrupted_chalice');
  interactionMode = 'idle';
  renderAll();
}

function executeBottledLightning(caster, target) {
  const primaryDmg = 3;
  const chainDmg = 2;
  target.hp -= primaryDmg;
  triggerStaticConduit(target, primaryDmg);
  addLog(`⚡ ${getDisplayName(caster)} hurls Bottled Lightning at ${getDisplayName(target)} for ${primaryDmg} damage! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
  if (target.hp <= 0) {
    target.hp = 0;
    addLog(`☠ ${getDisplayName(target)} has been defeated!`);
    finalizeUnitDeath(target);
  }
  // Chain to one adjacent enemy
  const adjacentEnemies = G.units.filter(e => e.hp > 0 && e.id !== target.id && e.playerId !== caster.playerId && isAdjacent(target.x, target.y, e.x, e.y));
  if (adjacentEnemies.length > 0) {
    const chainTarget = adjacentEnemies[Math.floor(Math.random() * adjacentEnemies.length)];
    chainTarget.hp -= chainDmg;
    triggerStaticConduit(chainTarget, chainDmg);
    addLog(`⚡ Lightning chains to ${getDisplayName(chainTarget)} for ${chainDmg} damage! (${chainTarget.hp > 0 ? chainTarget.hp + ' HP' : 'DEFEATED!'})`);
    if (chainTarget.hp <= 0) {
      chainTarget.hp = 0;
      addLog(`☠ ${getDisplayName(chainTarget)} has been defeated!`);
      finalizeUnitDeath(chainTarget);
    }
  }
  caster.hasUsedItemAction = true;
  startAbilityCooldown(caster, 'bottled_lightning');
  interactionMode = 'idle';
  renderAll();
}

function executeVoodooDoll(caster, target) {
  const debuffIds = ['poison','burning','bleeding','weakened','slowed','frozen','cursed','shattered','sundered','ensnared','hexed','combat_locked','beguiled'];
  if (!caster.statusEffects) { interactionMode = 'idle'; renderAll(); return; }
  const debuffsToTransfer = caster.statusEffects.filter(se => debuffIds.includes(se.id));
  if (debuffsToTransfer.length === 0) { interactionMode = 'idle'; renderAll(); return; }
  const names = [];
  for (const debuff of debuffsToTransfer) {
    applyStatusEffect(target, debuff.id, debuff.turnsLeft || 2);
    names.push(debuff.id);
  }
  caster.statusEffects = caster.statusEffects.filter(se => !debuffIds.includes(se.id));
  addLog(`🪆 ${getDisplayName(caster)} uses Voodoo Doll to transfer ${names.join(', ')} onto ${getDisplayName(target)}!`);
  caster.hasUsedItemAction = true;
  startAbilityCooldown(caster, 'voodoo_doll');
  interactionMode = 'idle';
  renderAll();
}


function executeTeleportHome(unit) {
  const sp = G.startPositions ? G.startPositions[unit.playerId >= 0 ? unit.playerId : 0] : null;
  const cx = sp ? sp.hx : 1;
  const cy = sp ? sp.hy : 1;
  const radius = Math.max(3, Math.floor(G.boardSize / 4));

  let target = null;
  let bestDist = Infinity;
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (getUnitAt(nx, ny)) continue;
      if (G.board[ny][nx]) continue;
      if (G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) continue;
      const dist = Math.abs(dx) + Math.abs(dy);
      if (dist < bestDist) {
        bestDist = dist;
        target = { x: nx, y: ny };
      }
    }
  }

  if (!target) {
    addLog('No valid teleport destination!');
    return;
  }

  const oldX = unit.x, oldY = unit.y;
  unit.x = target.x;
  unit.y = target.y;
  unit.movementLeft = 0;
  unit.hasAttacked = true;
  unit.hasGathered = true;
  startAbilityCooldown(unit, 'teleport_home');

  addLog(`✨ ${getDisplayName(unit)} teleported from (${oldX},${oldY}) to (${target.x},${target.y})!`);
  interactionMode = 'idle';
  renderAll();
}

function executeWarStomp(unit) {
  // War Stomp: push all adjacent enemies 1 tile away
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  let pushed = 0;
  for (const enemy of enemies) {
    const dx = enemy.x - unit.x;
    const dy = enemy.y - unit.y;
    const nx = enemy.x + dx;
    const ny = enemy.y + dy;
    if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
        !getUnitAt(nx, ny) && !(G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) && !(G.board[ny][nx] && G.board[ny][nx].type && G.board[ny][nx].amount > 0)) {
      enemy.x = nx;
      enemy.y = ny;
      pushed++;
    }
  }
  startAbilityCooldown(unit, 'war_stomp');
  addLog(`💥 ${getDisplayName(unit)} stomps the ground! ${pushed} ${pushed === 1 ? 'enemy' : 'enemies'} pushed back!`);
  // Beast retaliation for affected beasts
  for (const enemy of enemies) {
    if (enemy.hp > 0 && enemy.playerId === NPC_PLAYER_ID) beastRetaliate(enemy, unit);
    if (unit.hp <= 0) break;
  }
  renderAll();
}

function executeHealAllies(unit) {
  // Heal Allies: restore 3 HP to all adjacent allies
  const allies = G.units.filter(u =>
    u.hp > 0 && u.id !== unit.id && u.playerId === unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  let healed = 0;
  for (const ally of allies) {
    const stats = getUnitStats(ally);
    const before = ally.hp;
    ally.hp = Math.min(stats.maxHp, ally.hp + 3);
    if (ally.hp > before) healed++;
  }
  startAbilityCooldown(unit, 'heal_allies');
  addLog(`💚 ${getDisplayName(unit)} channels the totem! ${healed} ${healed === 1 ? 'ally' : 'allies'} healed for 3 HP!`);
  renderAll();
}

function executeBerserk(unit) {
  // Berserk: +5 ATK, -3 DEF for 2 turns (this turn + next turn)
  unit.berserkBonus = 5;
  unit.berserkPenalty = 3;
  unit.berserkTurns = 2;
  startAbilityCooldown(unit, 'berserk');
  addLog(`🔥 ${getDisplayName(unit)} goes berserk! (+5 ATK, -3 DEF for 2 turns)`);
  renderAll();
}

// --- Magic Weapon Abilities ---

function executeFireball(caster, target) {
  // Fireball: 4 damage to target + 2 splash to adjacent enemies, inflicts burning
  const cStats = getUnitStats(caster);
  const baseDmg = 4 + Math.floor(cStats.int / 3);
  const splashDmg = 2;
  
  // Main target
  {
    // Bulwark reduces damage (stacks)
    let dmg = baseDmg;
    const bountyFB = hasStatusEffect(target, 'bounty_marked');
    if (bountyFB) dmg += 3;
    const tgtBulwark = countPassive(target, 'bulwark');
    if (tgtBulwark > 0 && dmg > 1) dmg = Math.max(1, dmg - tgtBulwark);
    if (hasPassive(target, 'magic_resistance')) { dmg = Math.max(0, dmg - 2); addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`); }
    target.hp -= dmg;
    if (dmg > 0) triggerStaticConduit(target, dmg);
    addLog(`🔥 ${getDisplayName(caster)}'s Fireball hits ${getDisplayName(target)} for ${dmg} fire damage!${bountyFB ? ' 💰+3 Bounty' : ''} (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'burning', 2);
    if (target.hp <= 0) {
      target.hp = 0;
      dropAllItems(target);
      addLog(`☠ ${getDisplayName(target)} has been defeated!`);
    }
  }
  
  // Splash damage to enemies adjacent to target (not caster's allies)
  const splashTargets = G.units.filter(u =>
    u.hp > 0 && u.id !== target.id && u.id !== caster.id && u.playerId !== caster.playerId &&
    isAdjacent(target.x, target.y, u.x, u.y)
  );
  for (const st of splashTargets) {
    let sDmg = splashDmg;
    const bountySP = hasStatusEffect(st, 'bounty_marked');
    if (bountySP) sDmg += 3;
    const stBulwark = countPassive(st, 'bulwark');
    if (stBulwark > 0 && sDmg > 1) sDmg = Math.max(1, sDmg - stBulwark);
    if (hasPassive(st, 'magic_resistance')) { sDmg = Math.max(0, sDmg - 2); addLog(`✨ ${getDisplayName(st)}'s Magic Resistance reduces the damage!`); }
    st.hp -= sDmg;
    if (sDmg > 0) triggerStaticConduit(st, sDmg);
    addLog(`🔥 Fireball splash hits ${getDisplayName(st)} for ${sDmg} damage!${bountySP ? ' 💰+3 Bounty' : ''} (${st.hp > 0 ? st.hp + ' HP left' : 'DEFEATED!'})`);
    if (st.hp > 0) applyStatusEffect(st, 'burning', 2);
    if (st.hp <= 0) {
      st.hp = 0;
      dropAllItems(st);
      addLog(`☠ ${getDisplayName(st)} has been defeated!`);
    }
  }
  
  G.units = G.units.filter(u => u.hp > 0);
  const allTargets = [target, ...splashTargets];
  for (const t of allTargets) {
    if (t.hp <= 0) checkPlayerElimination(t.playerId);
  }
  // Beast retaliation
  for (const t of allTargets) {
    if (t.hp > 0 && t.playerId === NPC_PLAYER_ID) beastRetaliate(t, caster);
    if (caster.hp <= 0) break;
  }
  triggerMirrorDuplicate(caster, 'fireball', target);
  startAbilityCooldown(caster, 'fireball');
  interactionMode = 'idle';
  renderAll();
}

function executeFrostRay(caster, target) {
  // Frost Ray: 3 + INT/3 damage + freeze
  const cStats = getUnitStats(caster);
  const baseDmg = 3 + Math.floor(cStats.int / 3);
  
  {
    let dmg = baseDmg;
    const bountyFR = hasStatusEffect(target, 'bounty_marked');
    if (bountyFR) dmg += 3;
    if (hasPassive(target, 'bulwark') && dmg > 1) dmg = Math.max(1, dmg - 1);
    if (hasPassive(target, 'magic_resistance')) { dmg = Math.max(0, dmg - 2); addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`); }
    target.hp -= dmg;
    if (dmg > 0) triggerStaticConduit(target, dmg);
    addLog(`🧊 ${getDisplayName(caster)}'s Frost Ray hits ${getDisplayName(target)} for ${dmg} frost damage!${bountyFR ? ' 💰+3 Bounty' : ''} (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'frozen', 2);
    if (target.hp <= 0) {
      target.hp = 0;
      dropAllItems(target);
      addLog(`☠ ${getDisplayName(target)} has been defeated!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(target.playerId);
    }
  }
  // Beast retaliation
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
  triggerMirrorDuplicate(caster, 'frost_ray', target);
  startAbilityCooldown(caster, 'frost_ray');
  interactionMode = 'idle';
  renderAll();
}

function executeLightningBolt(caster, target) {
  // Lightning Bolt: 5 + INT/3 damage + slow
  const cStats = getUnitStats(caster);
  const baseDmg = 5 + Math.floor(cStats.int / 3);
  
  {
    let dmg = baseDmg;
    const bountyLB = hasStatusEffect(target, 'bounty_marked');
    if (bountyLB) dmg += 3;
    if (hasPassive(target, 'bulwark') && dmg > 1) dmg = Math.max(1, dmg - 1);
    if (hasPassive(target, 'magic_resistance')) { dmg = Math.max(0, dmg - 2); addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`); }
    target.hp -= dmg;
    if (dmg > 0) triggerStaticConduit(target, dmg);
    addLog(`⚡ ${getDisplayName(caster)}'s Lightning Bolt hits ${getDisplayName(target)} for ${dmg} damage!${bountyLB ? ' 💰+3 Bounty' : ''} (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'slowed', 2);
    if (target.hp <= 0) {
      target.hp = 0;
      dropAllItems(target);
      addLog(`☠ ${getDisplayName(target)} has been defeated!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(target.playerId);
    }
  }
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
  triggerMirrorDuplicate(caster, 'lightning_bolt', target);
  startAbilityCooldown(caster, 'lightning_bolt');
  interactionMode = 'idle';
  renderAll();
}

function executeLifeDrain(caster, target) {
  // Life Drain: 3 + INT/4 damage to target, heal self that amount
  const cStats = getUnitStats(caster);
  const baseDmg = 3 + Math.floor(cStats.int / 4);
  
  {
    let dmg = baseDmg;
    const bountyLD = hasStatusEffect(target, 'bounty_marked');
    if (bountyLD) dmg += 3;
    if (hasPassive(target, 'bulwark') && dmg > 1) dmg = Math.max(1, dmg - 1);
    if (hasPassive(target, 'magic_resistance')) { dmg = Math.max(0, dmg - 2); addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`); }
    target.hp -= dmg;
    if (dmg > 0) triggerStaticConduit(target, dmg);
    const healAmt = Math.min(dmg, cStats.maxHp - caster.hp);
    if (healAmt > 0) caster.hp += healAmt;
    addLog(`💜 ${getDisplayName(caster)}'s Life Drain hits ${getDisplayName(target)} for ${dmg} damage${bountyLD ? ' 💰+3 Bounty' : ''} and heals ${healAmt} HP! (Target: ${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    if (target.hp <= 0) {
      target.hp = 0;
      dropAllItems(target);
      addLog(`☠ ${getDisplayName(target)} has been defeated!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(target.playerId);
    }
  }
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
  triggerMirrorDuplicate(caster, 'life_drain', target);
  startAbilityCooldown(caster, 'life_drain');
  interactionMode = 'idle';
  renderAll();
}

function executePoisonCloud(caster) {
  // Poison Cloud: poisons all enemies within range 2 of caster for 3 turns + 1 damage
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== caster.playerId &&
    chebyshevDist(caster.x, caster.y, u.x, u.y) <= 2
  );
  for (const enemy of enemies) {
    if (hasPassive(enemy, 'magic_resistance')) {
      addLog(`✨ ${getDisplayName(enemy)}'s Magic Resistance blocks the Poison Cloud!`);
      continue;
    }
    let dmg = 1;
    if (hasPassive(enemy, 'bulwark') && dmg > 1) dmg = Math.max(1, dmg - 1);
    enemy.hp -= dmg;
    if (dmg > 0) triggerStaticConduit(enemy, dmg);
    applyStatusEffect(enemy, 'poison', 3);
    const poisoned = hasStatusEffect(enemy, 'poison');
    addLog(`☠ Poison Cloud hits ${getDisplayName(enemy)} for ${dmg} damage${poisoned ? ' and poisons for 3 turns' : ''}! (${enemy.hp > 0 ? enemy.hp + ' HP left' : 'DEFEATED!'})`);
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      dropAllItems(enemy);
      addLog(`☠ ${getDisplayName(enemy)} has been defeated!`);
    }
  }
  G.units = G.units.filter(u => u.hp > 0);
  for (const enemy of enemies) {
    if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId);
  }
  for (const enemy of enemies) {
    if (enemy.hp > 0 && enemy.playerId === NPC_PLAYER_ID) beastRetaliate(enemy, caster);
    if (caster.hp <= 0) break;
  }
  triggerMirrorDuplicate(caster, 'poison_cloud', null);
  startAbilityCooldown(caster, 'poison_cloud');
  addLog(`☁ ${getDisplayName(caster)} releases a Poison Cloud! ${enemies.length} ${enemies.length === 1 ? 'enemy' : 'enemies'} affected!`);
  renderAll();
}

function executeBattleCry(unit) {
  // Battle Cry: +2 ATK to all adjacent allies for 2 turns (via temp bonus)
  const allies = G.units.filter(u =>
    u.hp > 0 && u.id !== unit.id && u.playerId === unit.playerId &&
    isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  for (const ally of allies) {
    ally.battleCryBonus = (ally.battleCryBonus || 0) + 2;
    ally.battleCryTurns = 2;
  }
  // Also buff self
  unit.battleCryBonus = (unit.battleCryBonus || 0) + 2;
  unit.battleCryTurns = 2;
  startAbilityCooldown(unit, 'battle_cry');
  addLog(`📯 ${getDisplayName(unit)} sounds a Battle Cry! +2 ATK to self and ${allies.length} ${allies.length === 1 ? 'ally' : 'allies'} for 2 turns!`);
  renderAll();
}

function executeDetonate(unit) {
  const x = unit.x, y = unit.y;
  const name = getDisplayName(unit);
  addLog(`💥 ${name} detonates the Suicide Vest!`);
  const targets = G.units.filter(u =>
    u.hp > 0 && chebyshevDist(x, y, u.x, u.y) <= 3
  );
  unit.hp = 0;
  dropAllItems(unit);
  addLog(`☠ ${name} is killed by the explosion!`);
  grantSoulBarricadeStacks(unit);
  const deadFromExplosion = [];
  for (const t of targets) {
    if (t.id === unit.id) continue;
    const dmg = hasPassive(t, 'bulwark') ? Math.max(1, 10 - 1) : 10;
    t.hp -= dmg;
    addLog(`💥 ${getDisplayName(t)} takes ${dmg} damage from the explosion! (${t.hp > 0 ? t.hp + ' HP left' : 'DEFEATED!'})`);
    if (t.hp <= 0) {
      addLog(`☠ ${getDisplayName(t)} has been slain by the explosion!`);
      deadFromExplosion.push(t);
    }
  }
  // Process enemy deaths first so friendly passives (like pestilence) still have living owners
  deadFromExplosion.sort((a, b) => {
    const aEnemy = a.playerId !== unit.playerId ? 0 : 1;
    const bEnemy = b.playerId !== unit.playerId ? 0 : 1;
    return aEnemy - bEnemy;
  });
  for (const dead of deadFromExplosion) {
    finalizeUnitDeath(dead, { dropItems: true, clearSelection: false, filterUnits: false });
  }
  G.units = G.units.filter(u => u.hp > 0);
  const affectedPlayers = new Set(targets.map(t => t.playerId));
  affectedPlayers.add(unit.playerId);
  for (const pid of affectedPlayers) checkPlayerElimination(pid);
  selectedUnitId = null;
  interactionMode = 'idle';
  renderAll();
}

function executePrecisionShot(attacker, target) {
  if (hasPassive(target, 'reflect') && Math.random() < REFLECT_CHANCE) {
    const aStats = getUnitStats(attacker);
    const reflectDmg = Math.max(1, aStats.attack);
    addLog(`🔃 ${getDisplayName(target)} reflects the precision shot back at ${getDisplayName(attacker)}!`);
    attacker.hp -= reflectDmg;
    addLog(`🎯 ${getDisplayName(attacker)} takes ${reflectDmg} reflected damage! (${attacker.hp > 0 ? attacker.hp + ' HP left' : 'DEFEATED!'})`);
    if (attacker.hp <= 0) { attacker.hp = 0; dropAllItems(attacker); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(attacker.playerId); selectedUnitId = null; }
    startAbilityCooldown(attacker, 'precision_shot');
    attacker.hasAttacked = true;
    interactionMode = 'idle';
    renderAll();
    return;
  }
  const aStats = getUnitStats(attacker);
  let damage = Math.max(1, aStats.attack);
  const bountyPS = hasStatusEffect(target, 'bounty_marked');
  if (bountyPS) damage += 3;
  target.hp -= damage;
  if (damage > 0) triggerStaticConduit(target, damage);
  addLog(`🔭 ${getDisplayName(attacker)} fires a precision shot at ${getDisplayName(target)} for ${damage} damage!${bountyPS ? ' 💰+3 Bounty' : ''} (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
  if (target.hp <= 0) {
    target.hp = 0;
    dropAllItems(target);
    addLog(`☠ ${getDisplayName(target)} has been slain!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(target.playerId);
  }
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, attacker);
  startAbilityCooldown(attacker, 'precision_shot');
  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function executeGrapple(unit, target) {
  const adj = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = unit.x + dx, ny = unit.y + dy;
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (G.units.some(u => u.hp > 0 && u.x === nx && u.y === ny)) continue;
      if (G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) continue;
      adj.push({ x: nx, y: ny });
    }
  }
  if (adj.length === 0) {
    addLog(`🪝 ${getDisplayName(unit)} tries to grapple ${getDisplayName(target)} but there's no room!`);
    interactionMode = 'idle';
    renderAll();
    return;
  }
  adj.sort((a, b) => chebyshevDist(target.x, target.y, a.x, a.y) - chebyshevDist(target.x, target.y, b.x, b.y));
  const dest = adj[0];
  const oldX = target.x, oldY = target.y;
  target.x = dest.x;
  target.y = dest.y;
  startAbilityCooldown(unit, 'grapple');
  applyStatusEffect(target, 'combat_locked', 2);
  addLog(`🪝 ${getDisplayName(unit)} grapples ${getDisplayName(target)} from (${oldX},${oldY}) to (${dest.x},${dest.y})! 🔒 Combat Locked!`);
  interactionMode = 'idle';
  renderAll();
}

function executeEnsnare(unit, target) {
  applyStatusEffect(target, 'ensnared', 3);
  startAbilityCooldown(unit, 'ensnare');
  addLog(`🕸 ${getDisplayName(unit)} throws a net at ${getDisplayName(target)}! Ensnared for 2 turns!`);
  interactionMode = 'idle';
  renderAll();
}

function executeDivineBarrier(unit) {
  unit.tempHp = (unit.tempHp || 0) + 10;
  unit.tempHpTurns = 3;
  const stats = getUnitStats(unit);
  const healed = Math.min(10, stats.maxHp - unit.hp);
  unit.hp += healed;
  startAbilityCooldown(unit, 'divine_barrier');
  addLog(`😇 ${getDisplayName(unit)} activates the Cracked Halo! +10 temporary HP and healed ${healed} HP for 3 turns. (${unit.hp}/${stats.maxHp})`);
  renderAll();
}

function executeFish(unit, wx, wy) {
  const fish = JSON.parse(JSON.stringify(CONSUMABLES.fresh_fish));
  unit.inventory.push(fish);
  startAbilityCooldown(unit, 'fish');
  addLog(`🎣 ${getDisplayName(unit)} casts a line into the water and catches a Fresh Fish!`);
  interactionMode = 'idle';
  renderAll();
}

function executeSummonPooka(unit) {
  const emptyAdj = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = unit.x + dx, ny = unit.y + dy;
      if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
          !G.board[ny][nx] &&
          !G.units.some(u => u.x === nx && u.y === ny && u.hp > 0) &&
          !(G.barrels && G.barrels.some(b => b.x === nx && b.y === ny))) {
        emptyAdj.push({ x: nx, y: ny });
      }
    }
  }
  if (emptyAdj.length === 0) {
    addLog(`👾 ${getDisplayName(unit)} tries to summon a Pooka, but there is no space!`);
    return;
  }
  const pos = emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
  const p = G.players[unit.playerId];
  const prefix = p.faction && FACTIONS[p.faction] ? FACTIONS[p.faction].prefix : '';
  const pooka = createUnit('pooka', unit.playerId, pos.x, pos.y, prefix, p.faction);
  pooka.id = G.nextUnitId++;
  nextUnitId = G.nextUnitId;
  pooka.movementLeft = 0;
  pooka.hasAttacked = true;
  G.units.push(pooka);
  const emptyPocket = JSON.parse(JSON.stringify(ITEMS.empty_pocket));
  const equipSlots = getUnitEquipSlots(unit).filter(slot => slot === 'accessory' || slot.startsWith('accessory'));
  for (const slot of equipSlots) {
    const equipped = unit.equipment[slot];
    if (equipped && equipped.id === 'pocket_pooka') {
      unit.equipment[slot] = emptyPocket;
      break;
    }
  }
  startAbilityCooldown(unit, 'summon_pooka');
  addLog(`👾 ${getDisplayName(unit)} releases a Pooka from their pocket! It materializes at (${pos.x},${pos.y}), leaving behind an Empty Pocket.`);
  renderAll();
}

function executeSummonZombie(unit) {
  const emptyAdj = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = unit.x + dx, ny = unit.y + dy;
      if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
          !G.board[ny][nx] &&
          !G.units.some(u => u.x === nx && u.y === ny && u.hp > 0) &&
          !(G.barrels && G.barrels.some(b => b.x === nx && b.y === ny))) {
        emptyAdj.push({ x: nx, y: ny });
      }
    }
  }
  if (emptyAdj.length === 0) {
    addLog(`🧟 ${getDisplayName(unit)} tries to summon a zombie, but there is no space!`);
    return;
  }
  const pos = emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
  const p = G.players[unit.playerId];
  const prefix = p.faction && FACTIONS[p.faction] ? FACTIONS[p.faction].prefix : '';
  const zombie = createUnit('zombie', unit.playerId, pos.x, pos.y, prefix, p.faction);
  zombie.id = G.nextUnitId++;
  nextUnitId = G.nextUnitId;
  zombie.movementLeft = 0;
  zombie.hasAttacked = true;
  G.units.push(zombie);
  startAbilityCooldown(unit, 'summon_zombie');
  addLog(`🧟 ${getDisplayName(unit)} summons a Zombie Warrior at (${pos.x},${pos.y})!`);
  renderAll();
}

function executeBoomerangThrow(unit, tx, ty) {
  // Calculate direction from unit to clicked target
  const dx = tx - unit.x;
  const dy = ty - unit.y;
  // Normalize to get direction sign
  const sdx = dx === 0 ? 0 : (dx > 0 ? 1 : -1);
  const sdy = dy === 0 ? 0 : (dy > 0 ? 1 : -1);
  const aStats = getUnitStats(unit);
  const baseDmg = aStats.attack;
  const hitTargets = [];
  // Trace the line up to 4 tiles
  for (let step = 1; step <= 4; step++) {
    const cx = unit.x + sdx * step;
    const cy = unit.y + sdy * step;
    if (cx < 0 || cx >= G.boardSize || cy < 0 || cy >= G.boardSize) break;
    const target = G.units.find(u => u.hp > 0 && u.x === cx && u.y === cy && u.playerId !== unit.playerId);
    if (target) hitTargets.push(target);
  }
  if (hitTargets.length === 0) {
    addLog(`🪃 ${getDisplayName(unit)} throws the Boomerang but it misses!`);
  } else {
    addLog(`🪃 ${getDisplayName(unit)} throws the Boomerang in a line!`);
    for (const t of hitTargets) {
      const dmg = Math.max(1, baseDmg - (getUnitStats(t).defense || 0) + 2);
      let finalDmg = dmg;
      const bountyBM = hasStatusEffect(t, 'bounty_marked');
      if (bountyBM) finalDmg += 3;
      if (hasPassive(t, 'bulwark') && finalDmg > 1) finalDmg = Math.max(1, finalDmg - 1);
      t.hp -= finalDmg;
      if (finalDmg > 0) triggerStaticConduit(t, finalDmg);
      addLog(`🪃 Boomerang hits ${getDisplayName(t)} for ${finalDmg} damage!${bountyBM ? ' 💰+3 Bounty' : ''} (${t.hp > 0 ? t.hp + ' HP left' : 'DEFEATED!'})`);
      if (t.hp <= 0) {
        t.hp = 0;
        dropAllItems(t);
        addLog(`☠ ${getDisplayName(t)} has been defeated by the Boomerang!`);
      }
    }
    G.units = G.units.filter(u => u.hp > 0);
    for (const t of hitTargets) {
      if (t.hp <= 0) checkPlayerElimination(t.playerId);
    }
  }
  unit.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function executePistolShot(attacker, target) {
  // Duellist's Pistol: 3 damage, range 3, free action, 2 turn cooldown
  // Reflect passive: 30% chance to reflect
  if (hasPassive(target, 'reflect') && Math.random() < REFLECT_CHANCE) {
    addLog(`🔃 ${getDisplayName(target)} reflects the pistol shot back at ${getDisplayName(attacker)}!`);
    attacker.hp -= 3;
    addLog(`🔫 ${getDisplayName(attacker)} takes 3 reflected damage! (${attacker.hp > 0 ? attacker.hp + ' HP left' : 'DEFEATED!'})`);
    if (attacker.hp <= 0) { attacker.hp = 0; dropAllItems(attacker); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(attacker.playerId); selectedUnitId = null; }
    startAbilityCooldown(attacker, 'pistol_shot');
    interactionMode = 'idle';
    renderAll();
    return;
  }
  let damage = 3;
  const bountyPT = hasStatusEffect(target, 'bounty_marked');
  if (bountyPT) damage += 3;
  const bulwarkStacks = countPassive(target, 'bulwark');
  if (bulwarkStacks > 0 && damage > 1) damage = Math.max(1, damage - bulwarkStacks);
  target.hp -= damage;
  if (damage > 0) triggerStaticConduit(target, damage);
  addLog(`🔫 ${getDisplayName(attacker)} fires a pistol shot at ${getDisplayName(target)} for ${damage} damage!${bountyPT ? ' 💰+3 Bounty' : ''} (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
  if (target.hp <= 0) {
    target.hp = 0;
    // Midas Touch on kill
    if (hasPassive(attacker, 'midas_touch') && Math.random() < 0.4) {
      if (G.board[target.y] && (!G.board[target.y][target.x] || !G.board[target.y][target.x].type || G.board[target.y][target.x].amount <= 0)) {
        G.board[target.y][target.x] = { type: 'gold', amount: 2 + Math.floor(Math.random() * 3) };
        addLog(`✨ ${getDisplayName(attacker)}'s Midas Touch turns the ground to gold!`);
      }
    }
    // Gravecall on kill
    if (hasPassive(attacker, 'gravecall') && Math.random() < 1.0) {
      if (!G.board[target.y][target.x] || !G.board[target.y][target.x].type || G.board[target.y][target.x].amount <= 0) {
        const rdPlayer = G.players[attacker.playerId];
        const rdPrefix = rdPlayer.faction && FACTIONS[rdPlayer.faction] ? FACTIONS[rdPlayer.faction].prefix : '';
        const raisedZombie = createUnit('lesser_zombie', attacker.playerId, target.x, target.y, rdPrefix, rdPlayer.faction);
        raisedZombie.id = G.nextUnitId++;
        nextUnitId = G.nextUnitId;
        raisedZombie.movementLeft = 0;
        raisedZombie.hasAttacked = true;
        G.units.push(raisedZombie);
        addLog(`🧟 ${getDisplayName(attacker)}'s Gravecall raises a lesser zombie from the fallen!`);
      }
    }
    dropAllItems(target);
    addLog(`☠ ${getDisplayName(target)} has been slain!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(target.playerId);
  }
  triggerBeastRetaliationIfNpc(target, attacker);
  startAbilityCooldown(attacker, 'pistol_shot');
  interactionMode = 'idle';
  renderAll();
}

function executeGiantShot(attacker, target) {
  // Bow of Giants: deals STR damage (guaranteed hit), no normal attack
  const aStats = getUnitStats(attacker);
  // Reflect passive: 30% chance to reflect
  if (hasPassive(target, 'reflect') && Math.random() < REFLECT_CHANCE) {
    const reflectDmg = Math.max(1, aStats.str);
    addLog(`🔃 ${getDisplayName(target)} reflects the giant arrow back at ${getDisplayName(attacker)}!`);
    attacker.hp -= reflectDmg;
    addLog(`🏹 ${getDisplayName(attacker)} takes ${reflectDmg} reflected damage! (${attacker.hp > 0 ? attacker.hp + ' HP left' : 'DEFEATED!'})`);
    if (attacker.hp <= 0) { attacker.hp = 0; dropAllItems(attacker); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(attacker.playerId); selectedUnitId = null; }
    startAbilityCooldown(attacker, 'giant_shot');
    attacker.hasAttacked = true;
    interactionMode = 'idle';
    renderAll();
    return;
  }
  const damage = Math.max(1, aStats.str);
  let finalDmg = damage;
  const bountyGA = hasStatusEffect(target, 'bounty_marked');
  if (bountyGA) finalDmg += 3;
  const bulwarkStacks = countPassive(target, 'bulwark');
  if (bulwarkStacks > 0 && finalDmg > 1) finalDmg = Math.max(1, finalDmg - bulwarkStacks);
  target.hp -= finalDmg;
  if (finalDmg > 0) triggerStaticConduit(target, finalDmg);
  addLog(`🏹 ${getDisplayName(attacker)} fires a giant arrow at ${getDisplayName(target)} for ${finalDmg} damage!${bountyGA ? ' 💰+3 Bounty' : ''} (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
  if (target.hp <= 0) {
    target.hp = 0;
    // Midas Touch on kill
    if (hasPassive(attacker, 'midas_touch') && Math.random() < 0.4) {
      if (G.board[target.y] && (!G.board[target.y][target.x] || !G.board[target.y][target.x].type || G.board[target.y][target.x].amount <= 0)) {
        G.board[target.y][target.x] = { type: 'gold', amount: 2 + Math.floor(Math.random() * 3) };
        addLog(`✨ ${getDisplayName(attacker)}'s Midas Touch turns the ground to gold!`);
      }
    }
    // Gravecall on kill
    if (hasPassive(attacker, 'gravecall') && Math.random() < 1.0) {
      if (!G.board[target.y][target.x] || !G.board[target.y][target.x].type || G.board[target.y][target.x].amount <= 0) {
        const rdPlayer = G.players[attacker.playerId];
        const rdPrefix = rdPlayer.faction && FACTIONS[rdPlayer.faction] ? FACTIONS[rdPlayer.faction].prefix : '';
        const raisedZombie = createUnit('lesser_zombie', attacker.playerId, target.x, target.y, rdPrefix, rdPlayer.faction);
        raisedZombie.id = G.nextUnitId++;
        nextUnitId = G.nextUnitId;
        raisedZombie.movementLeft = 0;
        raisedZombie.hasAttacked = true;
        G.units.push(raisedZombie);
        addLog(`🧟 ${getDisplayName(attacker)}'s Gravecall raises a lesser zombie from the fallen!`);
      }
    }
    dropAllItems(target);
    addLog(`☠ ${getDisplayName(target)} has been slain!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(target.playerId);
  }
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, attacker);
  startAbilityCooldown(attacker, 'giant_shot');
  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function executeSniperShot(attacker, target) {
  if (!hasEquippedRangedWeapon(attacker)) {
    addLog(`🚫 ${getDisplayName(attacker)} cannot use Sniper Shot without a ranged weapon equipped.`);
    interactionMode = 'idle';
    renderAll();
    return;
  }
  // Sniper Shot: a long-range normal attack (rolls like performAttack)
  addLog(`🎯 ${getDisplayName(attacker)} takes a sniper shot at ${getDisplayName(target)}!`);
  performAttack(attacker, target);
  startAbilityCooldown(attacker, 'sniper_shot');
  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function executeMortarStrike(attacker, target) {
  // Mortar Strike: normal attack roll vs target + 1 splash damage to adjacent units. Ignores walls/LoS. No CD.
  addLog(`💣 ${getDisplayName(attacker)} launches a mortar shell at ${getDisplayName(target)}!`);
  const mortarAttack = { outcome: 'miss' };
  performAttack(attacker, target, { attackContext: mortarAttack });
  if (mortarAttack.outcome === 'miss') {
    addLog(`💨 The mortar shell misses cleanly, so no splash damage is dealt.`);
    startAbilityCooldown(attacker, 'mortar_strike');
    attacker.hasAttacked = true;
    interactionMode = 'idle';
    renderAll();
    return;
  }
  // Splash damage to all units adjacent to the target (flat 1, reduced by bulwark)
  const splashTargets = G.units.filter(u => u.hp > 0 && u.id !== target.id && u.id !== attacker.id && isAdjacent(target.x, target.y, u.x, u.y));
  for (const st of splashTargets) {
    let splashDmg = 1;
    const stBulwark = countPassive(st, 'bulwark');
    if (stBulwark > 0 && splashDmg > 1) splashDmg = Math.max(1, splashDmg - stBulwark);
    st.hp -= splashDmg;
    addLog(`💥 ${getDisplayName(st)} takes ${splashDmg} splash damage from the mortar! (${st.hp > 0 ? st.hp + ' HP left' : 'DEFEATED!'})`);
    if (st.hp <= 0) {
      st.hp = 0;
      dropAllItems(st);
      addLog(`☠ ${getDisplayName(st)} has been slain!`);
    }
  }
  G.units = G.units.filter(u => u.hp > 0);
  for (const st of splashTargets) {
    if (st.hp <= 0) checkPlayerElimination(st.playerId);
  }
  if (G.barrels) {
    const adjBarrels = G.barrels.filter(b => isAdjacent(target.x, target.y, b.x, b.y));
    for (const barrel of adjBarrels) {
      triggerBarrelExplosion(barrel.x, barrel.y);
    }
  }
  startAbilityCooldown(attacker, 'mortar_strike');
  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// NEW HERO ABILITIES
// ============================================================

function executeHexCurse(caster, target) {
  // Hex: apply Hexed DoT (1 dmg/turn + bonus per other DoT) for 5 turns
  const hexDef = STATUS_EFFECTS['hexed'];
  applyStatusEffect(target, 'hexed', hexDef.duration);
  startAbilityCooldown(caster, 'hex_curse');
  addLog(`🔮 ${getDisplayName(caster)} hexes ${getDisplayName(target)}! Hexed for ${hexDef.duration} turns!`);
  // Beast retaliation
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
  interactionMode = 'idle';
  renderAll();
}

function executeSummonSwarm(unit) {
  // Summon Swarm: deal 2 damage to all adjacent enemies, poison survivors
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  let kills = 0;
  for (const enemy of enemies) {
    enemy.hp -= 2;
    addLog(`🐀 Swarm bites ${getDisplayName(enemy)} for 2 damage! (${enemy.hp > 0 ? enemy.hp + ' HP left' : 'DEFEATED!'})`);
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      dropAllItems(enemy);
      addLog(`☠ ${getDisplayName(enemy)} has been overwhelmed by the swarm!`);
      kills++;
    } else {
      applyStatusEffect(enemy, 'poison', 2);
      if (hasStatusEffect(enemy, 'poison')) {
        addLog(`☠ ${getDisplayName(enemy)} is poisoned by the swarm! (2 turns)`);
      }
    }
  }
  if (kills > 0) {
    G.units = G.units.filter(u => u.hp > 0);
    for (const enemy of enemies) {
      if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId);
    }
  }
  startAbilityCooldown(unit, 'summon_swarm');
  addLog(`🐀 ${getDisplayName(unit)} summons a swarm! ${enemies.length} ${enemies.length === 1 ? 'enemy' : 'enemies'} bitten!`);
  // Beast retaliation for surviving beasts
  for (const enemy of enemies) {
    if (enemy.hp > 0 && enemy.playerId === NPC_PLAYER_ID) beastRetaliate(enemy, unit);
    if (unit.hp <= 0) break;
  }
  renderAll();
}

function executeDivineShield(unit) {
  // Divine Shield: +5 DEF to self and all adjacent allies for a full round
  unit.divineShieldBonus = (unit.divineShieldBonus || 0) + 5;
  const allies = G.units.filter(u =>
    u.hp > 0 && u.id !== unit.id && u.playerId === unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  for (const ally of allies) {
    ally.divineShieldBonus = (ally.divineShieldBonus || 0) + 5;
  }
  startAbilityCooldown(unit, 'divine_shield');
  addLog(`🛡 ${getDisplayName(unit)} calls upon divine protection! +5 DEF to self and ${allies.length} ${allies.length === 1 ? 'ally' : 'allies'} for a full round!`);
  renderAll();
}

function executeAimedShot(attacker, target) {
  // Aimed Shot: guaranteed hit (skip dodge & hit roll), but wound roll vs defense as normal
  // Reflect passive: 30% chance to reflect
  if (hasPassive(target, 'reflect') && Math.random() < REFLECT_CHANCE) {
    const aStats = getUnitStats(attacker);
    const dStats = getUnitStats(target);
    const piercingStacks = countPassive(attacker, 'piercing');
    const effectiveDef = Math.max(0, dStats.defense - piercingStacks * 2);
    const atkPower = aStats.attack;
    const atkVsDef = atkPower - effectiveDef;
    let woundTarget;
    if (atkVsDef >= 4)       woundTarget = 2;
    else if (atkVsDef >= 2)  woundTarget = 3;
    else if (atkVsDef >= 0)  woundTarget = 4;
    else if (atkVsDef >= -2) woundTarget = 5;
    else                     woundTarget = 6;
    const woundRoll = rollD6();
    const reflectDmg = woundRoll >= woundTarget ? Math.max(1, 1 + (woundRoll - woundTarget)) : 0;
    addLog(`🔃 ${getDisplayName(target)} reflects the aimed shot back at ${getDisplayName(attacker)}!`);
    if (reflectDmg > 0) {
      attacker.hp -= reflectDmg;
      addLog(`🎯 ${getDisplayName(attacker)} takes ${reflectDmg} reflected damage! (${attacker.hp > 0 ? attacker.hp + ' HP left' : 'DEFEATED!'})`);
    } else {
      addLog(`🎯 Reflected shot fails to wound ${getDisplayName(attacker)}.`);
    }
    if (attacker.hp <= 0) { attacker.hp = 0; dropAllItems(attacker); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(attacker.playerId); selectedUnitId = null; }
    startAbilityCooldown(attacker, 'aimed_shot');
    attacker.hasAttacked = true;
    interactionMode = 'idle';
    renderAll();
    return;
  }
  const aStats = getUnitStats(attacker);
  const dStats = getUnitStats(target);
  const piercingStacks = countPassive(attacker, 'piercing');
  const effectiveDef = Math.max(0, dStats.defense - piercingStacks * 2);
  const atkPower = aStats.attack;
  const atkVsDef = atkPower - effectiveDef;
  let woundTarget;
  if (atkVsDef >= 4)       woundTarget = 2;
  else if (atkVsDef >= 2)  woundTarget = 3;
  else if (atkVsDef >= 0)  woundTarget = 4;
  else if (atkVsDef >= -2) woundTarget = 5;
  else                     woundTarget = 6;
  const woundRoll = rollD6();
  let damage = woundRoll >= woundTarget ? Math.max(1, 1 + (woundRoll - woundTarget)) : 0;
  const bountyAS = hasStatusEffect(target, 'bounty_marked');
  if (bountyAS && damage > 0) damage += 3;
  if (damage > 0) {
    target.hp -= damage;
    triggerStaticConduit(target, damage);
    addLog(`🎯 ${getDisplayName(attacker)} fires an aimed shot at ${getDisplayName(target)} for ${damage} damage! (wound roll ${woundRoll} vs ${woundTarget}+)${bountyAS ? ' 💰+3 Bounty' : ''} (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
  } else {
    addLog(`🎯 ${getDisplayName(attacker)} fires an aimed shot at ${getDisplayName(target)} — fails to wound! (wound roll ${woundRoll} vs ${woundTarget}+)`);
  }
  if (target.hp <= 0) {
    target.hp = 0;
    dropAllItems(target);
    addLog(`☠ ${getDisplayName(target)} has been slain!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(target.playerId);
  }
  // Beast retaliation
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, attacker);
  startAbilityCooldown(attacker, 'aimed_shot');
  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function executeHarpoonShot(attacker, target) {
  // Harpoon Shot: hook an enemy within 5 tiles, drag them when you move for the rest of this turn
  attacker.harpoonDragTargetId = target.id;
  attacker.harpoonDragTurn = G.turn;
  addLog(`🔱 ${getDisplayName(attacker)} fires a harpoon at ${getDisplayName(target)} and hooks them! ${getDisplayName(target)} will be dragged when ${getDisplayName(attacker)} moves.`);
  startAbilityCooldown(attacker, 'harpoon_shot');
  interactionMode = 'idle';
  renderAll();
}

function executeArcaneBlast(caster, target) {
  // Arcane Blast: flat 4 damage + Burning, hit chance = INT * 9% (cap 80%)
  const cStats = getUnitStats(caster);
  const hitChance = Math.min(80, cStats.int * 9);
  if (Math.random() * 100 >= hitChance) {
    addLog(`✨ ${getDisplayName(caster)} hurls arcane energy at ${getDisplayName(target)} — but the blast fizzles! (${hitChance}% hit)`);
    if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
    startAbilityCooldown(caster, 'arcane_blast');
    interactionMode = 'idle';
    renderAll();
    return;
  }
  let damage = 4;
  // Spell crit check (INT-based)
  let spellCrit = false;
  if (hasStatusEffect(caster, 'deadly_focus')) {
    damage = Math.ceil(damage * 1.5);
    spellCrit = true;
    removeStatusEffect(caster, 'deadly_focus');
    addLog(`🎯 ${getDisplayName(caster)}'s Deadly Focus guarantees a critical blast!`);
  } else if (Math.random() * 100 < cStats.critChance) {
    damage = Math.ceil(damage * 1.5);
    spellCrit = true;
  }
  // Dark Purpose: gain Dark Energy stack on spell crit
  if (spellCrit && hasPassive(caster, 'dark_purpose')) {
    triggerDarkPurpose(caster);
  }
  const bountyAB = hasStatusEffect(target, 'bounty_marked');
  if (bountyAB) damage += 3;
  // Magic resistance reduces magic damage by 2
  if (hasPassive(target, 'magic_resistance')) {
    damage = Math.max(1, damage - 2);
    addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`);
  }
  target.hp -= damage;
  if (damage > 0) triggerStaticConduit(target, damage);
  const critTag = spellCrit ? ' 💥CRIT!' : '';
  addLog(`✨ ${getDisplayName(caster)} blasts ${getDisplayName(target)} with arcane energy for ${damage} damage!${critTag}${bountyAB ? ' 💰+3 Bounty' : ''} (${hitChance}% hit) (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
  if (target.hp <= 0) {
    target.hp = 0;
    dropAllItems(target);
    addLog(`☠ ${getDisplayName(target)} has been disintegrated!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(target.playerId);
  } else {
    applyStatusEffect(target, 'burning', 2);
    addLog(`🔥 ${getDisplayName(target)} is set ablaze! (2 turns)`);
  }
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
  startAbilityCooldown(caster, 'arcane_blast');
  interactionMode = 'idle';
  renderAll();
}

function executeBladeDance(unit) {
  // Blade Dance: attack all adjacent enemies simultaneously
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  addLog(`⚔ ${getDisplayName(unit)} performs a Blade Dance!`);
  for (const enemy of enemies) {
    performAttack(unit, enemy);
  }
  G.units = G.units.filter(u => u.hp > 0);
  for (const enemy of enemies) {
    if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId);
  }
  // Beast retaliation for surviving beasts
  for (const enemy of enemies) {
    if (enemy.hp > 0 && enemy.playerId === NPC_PLAYER_ID) beastRetaliate(enemy, unit);
    if (unit.hp <= 0) break;
  }
  startAbilityCooldown(unit, 'blade_dance');
  renderAll();
}

function executeBloodFrenzy(unit) {
  // Blood Frenzy: +4 ATK this turn, if you kill someone, heal to full
  unit.bloodFrenzyActive = true;
  unit.rallyBonus = (unit.rallyBonus || 0) + 4;
  startAbilityCooldown(unit, 'blood_frenzy');
  addLog(`🩸 ${getDisplayName(unit)} enters a Blood Frenzy! (+4 ATK; kills heal to full)`);
  renderAll();
}

function executeTameBeast(unit, beast) {
  // Tame Beast: convert an adjacent Foul Beast to the caster's team
  // Release any previously tamed beast first
  const prevTamed = G.units.find(b => b.hp > 0 && (b.type === 'beast' || b.type === 'warg' || b.type === 'hydra') && b.playerId === unit.playerId && b.tamedBy === unit.id);
  if (prevTamed) {
    prevTamed.playerId = NPC_PLAYER_ID;
    prevTamed.movement = 0;
    delete prevTamed.tamedBy;
    addLog(`🐉 ${getDisplayName(prevTamed)} breaks free and returns to the wild!`);
  }
  beast.playerId = unit.playerId;
  beast.tamedBy = unit.id;
  beast.movement = 3;
  beast.movementLeft = 0; // Can't move this turn
  beast.hasAttacked = false;
  startAbilityCooldown(unit, 'tame_beast');
  addLog(`🐾 ${getDisplayName(unit)} tames ${getDisplayName(beast)}! The beast joins your ranks!`);
  interactionMode = 'idle';
  renderAll();
}

function executeShieldBash(unit, target) {
  // Shield Bash: deal DEF damage, push 2 tiles, stun 1 turn
  const stats = getUnitStats(unit);
  let damage = Math.max(1, stats.defense);
  const bountySB = hasStatusEffect(target, 'bounty_marked');
  if (bountySB) damage += 3;
  target.hp -= damage;
  addLog(`🛡 ${getDisplayName(unit)} shield bashes ${getDisplayName(target)} for ${damage} damage!${bountySB ? ' 💰+3 Bounty' : ''} (DEF-based)`);

  // Push target 2 tiles in the direction away from unit
  if (target.hp > 0) {
    const dx = target.x - unit.x;
    const dy = target.y - unit.y;
    let pushX = target.x, pushY = target.y;
    for (let i = 0; i < 2; i++) {
      const nx = pushX + dx, ny = pushY + dy;
      if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
          !G.units.some(u => u.x === nx && u.y === ny && u.hp > 0) &&
          !(G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) &&
          !(G.board[ny][nx] && G.board[ny][nx].type && G.board[ny][nx].amount > 0)) {
        pushX = nx;
        pushY = ny;
      } else {
        break;
      }
    }
    if (pushX !== target.x || pushY !== target.y) {
      target.x = pushX;
      target.y = pushY;
      addLog(`💨 ${getDisplayName(target)} is knocked back to (${pushX},${pushY})!`);
    }
    // Stun for 1 turn
    target.stunned = true;
    addLog(`💫 ${getDisplayName(target)} is stunned!`);
  }

  if (target.hp <= 0) {
    target.hp = 0;
    dropAllItems(target);
    addLog(`☠ ${getDisplayName(target)} has been slain!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(target.playerId);
  } else if (target.playerId === NPC_PLAYER_ID) {
    beastRetaliate(target, unit);
  }

  unit.hasAttacked = true;
  startAbilityCooldown(unit, 'shield_bash');
  interactionMode = 'idle';
  renderAll();
}

function executeRuneOfShatter(unit) {
  // Rune of Shatter: apply Shattered status (-4 DEF) to all adjacent enemies for 2 turns
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  for (const enemy of enemies) {
    applyStatusEffect(enemy, 'shattered', 2);
  }
  startAbilityCooldown(unit, 'rune_of_shatter');
  addLog(`💎 ${getDisplayName(unit)} shatters armor! ${enemies.length} ${enemies.length === 1 ? 'enemy' : 'enemies'} Shattered! (-4 DEF for 2 turns)`);
  // Beast retaliation for affected beasts
  for (const enemy of enemies) {
    if (enemy.hp > 0 && enemy.playerId === NPC_PLAYER_ID) beastRetaliate(enemy, unit);
    if (unit.hp <= 0) break;
  }
  renderAll();
}

// ============================================================
// SKELETON ABILITIES
// ============================================================
function executeRaiseDead(unit) {
  // Raise Dead: summon a free skeleton warrior on an adjacent empty tile
  const emptyAdj = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = unit.x + dx, ny = unit.y + dy;
      if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
          !G.units.some(u => u.x === nx && u.y === ny && u.hp > 0) &&
          !(G.barrels && G.barrels.some(b => b.x === nx && b.y === ny))) {
        emptyAdj.push({ x: nx, y: ny });
      }
    }
  }
  if (emptyAdj.length === 0) {
    addLog(`💀 ${getDisplayName(unit)} tries to raise the dead, but there is no space!`);
    return;
  }
  const pos = emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
  const p = G.players[unit.playerId];
  const prefix = FACTIONS[p.faction].prefix;
  const corpse = createUnit('shambling_corpse', unit.playerId, pos.x, pos.y, prefix, p.faction);
  corpse.id = G.nextUnitId++;
  nextUnitId = G.nextUnitId;
  corpse.movementLeft = 0;
  corpse.hasAttacked = true;
  G.units.push(corpse);
  startAbilityCooldown(unit, 'raise_dead');
  addLog(`💀 ${getDisplayName(unit)} raises a Shambling Corpse from the dead at (${pos.x},${pos.y})!`);
  renderAll();
}

function executeShadowstep(caster, target) {
  // Teleport adjacent to target, then perform a guaranteed crit attack
  const dirs8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  let landTile = null;
  for (const [dx, dy] of dirs8) {
    const nx = target.x + dx, ny = target.y + dy;
    if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
    if (G.units.some(u => u.hp > 0 && u.x === nx && u.y === ny)) continue;
    const cell = G.board[ny][nx];
    if (cell && cell.type && cell.amount > 0) continue;
    landTile = { x: nx, y: ny };
    break;
  }
  if (!landTile) {
    addLog(`💨 ${getDisplayName(caster)} cannot Shadowstep — no open tile adjacent to ${getDisplayName(target)}!`);
    interactionMode = 'idle';
    renderAll();
    return;
  }
  // Teleport
  caster.x = landTile.x;
  caster.y = landTile.y;
  addLog(`💨 ${getDisplayName(caster)} shadowsteps to ${getDisplayName(target)}!`);
  // Apply deadly_focus for guaranteed crit, then attack
  applyStatusEffect(caster, 'deadly_focus', 99);
  performAttack(caster, target);
  caster.hasAttacked = true;
  caster.movementLeft = 0;
  startAbilityCooldown(caster, 'shadowstep');
  interactionMode = 'idle';
  renderAll();
}

function executeSoulSiphon(caster, target) {
  // Soul Siphon: drain 4 HP from target, heal self
  const hasMR = hasPassive(target, 'magic_resistance');
  let dmg = Math.max(1, 4 - (hasMR ? 2 : 0));
  const bountySS = hasStatusEffect(target, 'bounty_marked');
  if (bountySS) dmg += 3;
  if (hasMR) addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`);
  target.hp -= dmg;
  const casterStats = getUnitStats(caster);
  const healAmt = Math.min(dmg, casterStats.maxHp - caster.hp);
  caster.hp += healAmt;
  addLog(`👻 ${getDisplayName(caster)} siphons ${dmg} HP from ${getDisplayName(target)}!${bountySS ? ' 💰+3 Bounty' : ''} (healed ${healAmt} HP)`);
  if (target.hp <= 0) {
    target.hp = 0;
    dropAllItems(target);
    addLog(`☠ ${getDisplayName(target)} has been slain!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(target.playerId);
  }
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
  startAbilityCooldown(caster, 'soul_siphon');
  interactionMode = 'idle';
  renderAll();
}

function executeBoneExplosion(unit, sacrifice) {
  // Bone Explosion: sacrifice an adjacent ally, deal flat 5 damage to enemies within 2 tiles
  const blastDmg = 5;
  const sacrificeName = getDisplayName(sacrifice);
  // Kill the sacrifice
  sacrifice.hp = 0;
  dropAllItems(sacrifice);
  G.units = G.units.filter(u => u.hp > 0);
  addLog(`💥 ${getDisplayName(unit)} detonates ${sacrificeName}! (${blastDmg} damage explosion!)`);
  // Damage nearby enemies
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && chebyshevDist(unit.x, unit.y, u.x, u.y) <= 2
  );
  for (const enemy of enemies) {
    const reducedDmg = Math.max(1, blastDmg - (hasPassive(enemy, 'bulwark') ? 1 : 0));
    enemy.hp -= reducedDmg;
    addLog(`💥 ${getDisplayName(enemy)} takes ${reducedDmg} explosion damage! (${enemy.hp > 0 ? enemy.hp + ' HP left' : 'DEFEATED!'})`);
    if (enemy.hp <= 0) {
      enemy.hp = 0;
      dropAllItems(enemy);
      addLog(`☠ ${getDisplayName(enemy)} has been slain!`);
    }
  }
  G.units = G.units.filter(u => u.hp > 0);
  for (const enemy of enemies) {
    if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId);
  }
  startAbilityCooldown(unit, 'bone_explosion');
  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// TROLL ABILITIES
// ============================================================
function executeDevour(unit, target) {
  // Devour: eat an adjacent enemy below 25% HP or an adjacent ally, kill them and heal for their remaining HP
  const healAmt = Math.min(target.hp, getUnitStats(unit).maxHp - unit.hp);
  addLog(`🧌 ${getDisplayName(unit)} DEVOURS ${getDisplayName(target)}! +${healAmt} HP!`);
  unit.hp += healAmt;
  target.hp = 0;
  dropAllItems(target);
  addLog(`☠ ${getDisplayName(target)} has been eaten alive!`);
  // Hunger passive: gain a Satiation stack
  if (hasPassive(unit, 'hunger')) {
    if (!unit.satiationStacks) unit.satiationStacks = 0;
    unit.satiationStacks++;
    // Recalculate max HP with new stacks and heal for the gained amount
    const newStats = getUnitStats(unit);
    unit.hp = Math.min(unit.hp + 5, newStats.maxHp);
    addLog(`🍖 ${getDisplayName(unit)} gains a stack of Satiation! (${unit.satiationStacks} stacks: +${unit.satiationStacks * 5} max HP, +${unit.satiationStacks * 2} STR, -${unit.satiationStacks} AGI, -${unit.satiationStacks} MVT)`);
  }
  G.units = G.units.filter(u => u.hp > 0);
  checkPlayerElimination(target.playerId);
  unit.hasAttacked = true;
  startAbilityCooldown(unit, 'devour');
  interactionMode = 'idle';
  renderAll();
}

function executeDigest(unit) {
  // Digest: clear all Satiation stacks
  const stacks = unit.satiationStacks || 0;
  if (stacks <= 0) return;
  unit.satiationStacks = 0;
  // Clamp HP to new max
  const newStats = getUnitStats(unit);
  if (unit.hp > newStats.maxHp) unit.hp = newStats.maxHp;
  addLog(`🍖 ${getDisplayName(unit)} digests all food! ${stacks} Satiation stacks cleared. Stats restored.`);
  unit.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function executeTrollRampage(unit, dx, dy) {
  // Rampage: charge up to 3 tiles in a direction, damage first enemy + push
  let hitTarget = null;
  let finalX = unit.x, finalY = unit.y;
  const oldX = unit.x;
  const oldY = unit.y;
  for (let i = 1; i <= 3; i++) {
    const nx = unit.x + dx * i;
    const ny = unit.y + dy * i;
    if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) break;
    if (G.board[ny][nx]) break; // Hit a wall/obstacle
    if (G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) break;
    const target = G.units.find(u => u.x === nx && u.y === ny && u.hp > 0);
    if (target) {
      hitTarget = target;
      finalX = unit.x + dx * (i - 1);
      finalY = unit.y + dy * (i - 1);
      break;
    }
    finalX = nx;
    finalY = ny;
  }
  // Move the troll
  unit.x = finalX;
  unit.y = finalY;
  unit.movementLeft = 0;
  if (triggerOverwatchOnUnitEntry(unit, oldX, oldY)) {
    interactionMode = 'idle';
    renderAll();
    return;
  }
  if (hitTarget) {
    let damage = 4;
    const bountyRP = hasStatusEffect(hitTarget, 'bounty_marked');
    if (bountyRP) damage += 3;
    hitTarget.hp -= damage;
    addLog(`🧌 ${getDisplayName(unit)} rampages into ${getDisplayName(hitTarget)} for ${damage} damage!${bountyRP ? ' 💰+3 Bounty' : ''}`);
    // Push target 1 tile
    const pushX = hitTarget.x + dx;
    const pushY = hitTarget.y + dy;
    if (pushX >= 0 && pushX < G.boardSize && pushY >= 0 && pushY < G.boardSize &&
        !G.board[pushY][pushX] && !(G.barrels && G.barrels.some(b => b.x === pushX && b.y === pushY)) && !G.units.some(u => u.x === pushX && u.y === pushY && u.hp > 0)) {
      const oldTargetX = hitTarget.x;
      const oldTargetY = hitTarget.y;
      hitTarget.x = pushX;
      hitTarget.y = pushY;
      addLog(`💨 ${getDisplayName(hitTarget)} is pushed back to (${pushX},${pushY})!`);
      triggerOverwatchOnUnitEntry(hitTarget, oldTargetX, oldTargetY);
    }
    if (hitTarget.hp <= 0) {
      hitTarget.hp = 0;
      dropAllItems(hitTarget);
      addLog(`☠ ${getDisplayName(hitTarget)} has been slain!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(hitTarget.playerId);
    } else if (hitTarget.playerId === NPC_PLAYER_ID) {
      beastRetaliate(hitTarget, unit);
    }
  } else {
    addLog(`🧌 ${getDisplayName(unit)} charges forward to (${finalX},${finalY})!`);
  }
  unit.hasAttacked = true;
  startAbilityCooldown(unit, 'troll_rampage');
  interactionMode = 'idle';
  renderAll();
}

function executeTrollsBlessing(unit) {
  // Troll's Blessing: grant Combat Regeneration to self and adjacent allies for 3 turns
  unit.trollBlessingTurns = 3;
  const allies = G.units.filter(u =>
    u.hp > 0 && u.id !== unit.id && u.playerId === unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  for (const ally of allies) {
    ally.trollBlessingTurns = 3;
  }
  startAbilityCooldown(unit, 'trolls_blessing');
  addLog(`🌿 ${getDisplayName(unit)} blesses the group with combat regeneration! (self + ${allies.length} ${allies.length === 1 ? 'ally' : 'allies'}, 3 turns)`);
  renderAll();
}

function executeSeizingTotem(unit, tx, ty) {
  // Place a Seizing Totem on the target tile
  const p = G.players[unit.playerId];
  const prefix = p.faction && FACTIONS[p.faction] ? FACTIONS[p.faction].prefix : '';
  const totem = createUnit('seizing_totem', unit.playerId, tx, ty, prefix, p.faction);
  totem.id = G.nextUnitId++;
  nextUnitId = G.nextUnitId;
  totem.movementLeft = 0;
  totem.hasAttacked = true;
  totem.summonerId = unit.id;
  totem.isTotem = true;
  G.units.push(totem);
  unit.hasAttacked = true;
  startAbilityCooldown(unit, 'seizing_totem');
  addLog(`⌘ ${getDisplayName(unit)} plants a Seizing Totem at (${tx},${ty})! Enemies within 2 tiles are trapped!`);
  interactionMode = 'idle';
  renderAll();
}

function executeRetrieveTotem(unit, totem) {
  // Remove the totem from the board
  totem.hp = 0;
  G.units = G.units.filter(u => u.hp > 0);
  addLog(`⌘ ${getDisplayName(unit)} retrieves their Seizing Totem!`);
  startAbilityCooldown(unit, 'seizing_totem');
  unit.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// OGRE ABILITIES
// ============================================================
function executeOgreThrow(unit, target, destX, destY, landOnUnit) {
  const isAlly = target.playerId === unit.playerId;
  const oldX = target.x, oldY = target.y;

  if (landOnUnit) {
    // Thrown unit lands on another unit — both take 3 damage
    // Place the thrown unit on an adjacent free tile to the landing spot
    target.x = destX;
    target.y = destY;
    let collisionDmg = 3;
    // Bounty bonus
    if (hasStatusEffect(landOnUnit, 'bounty_marked')) collisionDmg += 3;
    landOnUnit.hp -= collisionDmg;
    addLog(`👹 ${getDisplayName(unit)} hurls ${getDisplayName(target)} into ${getDisplayName(landOnUnit)}! Both take 3 damage!`);
    addLog(`💥 ${getDisplayName(landOnUnit)}: ${landOnUnit.hp > 0 ? landOnUnit.hp + ' HP left' : 'DEFEATED!'}`);
    let thrownCollisionDmg = 3;
    target.hp -= thrownCollisionDmg;
    addLog(`💥 ${getDisplayName(target)}: ${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'}`);

    // Push the target that was landed on 1 tile away from the landing spot
    if (landOnUnit.hp > 0) {
      const dx = Math.sign(destX - unit.x) || 0;
      const dy = Math.sign(destY - unit.y) || 0;
      const pushX = landOnUnit.x + dx;
      const pushY = landOnUnit.y + dy;
      if (pushX >= 0 && pushX < G.boardSize && pushY >= 0 && pushY < G.boardSize &&
          !G.units.some(u => u.x === pushX && u.y === pushY && u.hp > 0 && u.id !== target.id) &&
          !(G.barrels && G.barrels.some(b => b.x === pushX && b.y === pushY)) &&
          !(G.board[pushY][pushX] && G.board[pushY][pushX].type && G.board[pushY][pushX].amount > 0)) {
        landOnUnit.x = pushX;
        landOnUnit.y = pushY;
        addLog(`💨 ${getDisplayName(landOnUnit)} is knocked to (${pushX},${pushY})!`);
      }
    }

    // Finalize deaths
    if (landOnUnit.hp <= 0) { landOnUnit.hp = 0; dropAllItems(landOnUnit); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(landOnUnit.playerId); }
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
  } else {
    // Normal landing on empty tile
    target.x = destX;
    target.y = destY;
    if (!isAlly) {
      // Thrown enemies take 4 damage on landing
      let landDmg = 4;
      if (hasStatusEffect(target, 'bounty_marked')) landDmg += 3;
      target.hp -= landDmg;
      addLog(`👹 ${getDisplayName(unit)} hurls ${getDisplayName(target)} to (${destX},${destY}) for ${landDmg} damage! (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
      if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
      else if (target.playerId === NPC_PLAYER_ID) { beastRetaliate(target, unit); }
    } else {
      addLog(`👹 ${getDisplayName(unit)} hurls ${getDisplayName(target)} to (${destX},${destY})! Safe landing.`);
    }
  }

  unit.hasAttacked = true;
  startAbilityCooldown(unit, 'ogre_throw');
  interactionMode = 'idle';
  renderAll();
}

function executeStaticDischarge(caster, target) {
  const charges = caster.staticCharges || 0;
  if (charges <= 0) return;
  const cStats = getUnitStats(caster);
  let damage = charges;
  // Magic resistance
  if (hasPassive(target, 'magic_resistance')) {
    damage = Math.max(0, damage - 2);
    addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the discharge!`);
  }
  // Bulwark
  const bulwarkStacks = countPassive(target, 'bulwark');
  if (bulwarkStacks > 0 && damage > 1) damage = Math.max(1, damage - bulwarkStacks);
  // Bounty
  if (hasStatusEffect(target, 'bounty_marked')) damage += 3;
  target.hp -= damage;
  if (damage > 0) triggerStaticConduit(target, damage);
  caster.staticCharges = 0;
  addLog(`⚡ ${getDisplayName(caster)} discharges ${charges} Static Charge${charges > 1 ? 's' : ''} into ${getDisplayName(target)} for ${damage} damage! (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
  if (target.hp > 0) {
    applyStatusEffect(target, 'slowed', 1);
    addLog(`🐌 ${getDisplayName(target)} is slowed by the shock!`);
  }
  if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
  else if (target.playerId === NPC_PLAYER_ID) { beastRetaliate(target, caster); }
  caster.hasAttacked = true;
  startAbilityCooldown(caster, 'static_discharge');
  interactionMode = 'idle';
  renderAll();
}

// Static Conduit: grant charges to Ogre Magi when enemies take damage nearby
function triggerStaticConduit(damagedUnit, damageAmount) {
  if (!damagedUnit || damageAmount <= 0) return;
  for (const magi of G.units) {
    if (magi.hp > 0 && magi.id !== damagedUnit.id && magi.playerId !== damagedUnit.playerId &&
        hasPassive(magi, 'static_conduit') && chebyshevDist(magi.x, magi.y, damagedUnit.x, damagedUnit.y) <= 3) {
      magi.staticCharges = (magi.staticCharges || 0) + 1;
      addLog(`⚡ ${getDisplayName(magi)} absorbs a Static Charge! (${magi.staticCharges} total)`);
    }
  }
}

// ============================================================
// BARD ABILITIES
// ============================================================
function executeCrescendo(unit) {
  // Crescendo: all allies within 3 tiles gain +4 ATK this turn
  const allies = G.units.filter(u =>
    u.hp > 0 && u.id !== unit.id && u.playerId === unit.playerId && chebyshevDist(unit.x, unit.y, u.x, u.y) <= 3
  );
  for (const ally of allies) {
    ally.rallyBonus = (ally.rallyBonus || 0) + 4;
  }
  startAbilityCooldown(unit, 'crescendo');
  addLog(`🎵 ${getDisplayName(unit)} plays a mighty Crescendo! +4 ATK to ${allies.length} ${allies.length === 1 ? 'ally' : 'allies'} within 3 tiles!`);
  renderAll();
}

function executeBattleMarch(unit) {
  // Battle March: self and all allies within 2 tiles gain +3 movement this turn
  const allies = G.units.filter(u =>
    u.hp > 0 && u.id !== unit.id && u.playerId === unit.playerId && chebyshevDist(unit.x, unit.y, u.x, u.y) <= 2
  );
  unit.movementLeft = (unit.movementLeft || 0) + 3;
  for (const ally of allies) {
    ally.movementLeft = (ally.movementLeft || 0) + 3;
  }
  startAbilityCooldown(unit, 'battle_march');
  addLog(`🥁 ${getDisplayName(unit)} drums a Battle March! +3 movement to self and ${allies.length} ${allies.length === 1 ? 'ally' : 'allies'} within 2 tiles!`);
  renderAll();
}

function executeCadenceOfHaste(caster, target) {
  // Cadence of Haste: grant an adjacent ally a bonus action (reset movement & attack)
  const stats = getUnitStats(target);
  target.movementLeft = stats.movement;
  target.hasAttacked = false;
  target.hasUsedItemAction = false;
  target.specialActionsUsed = [];
  if (hasPassive(target, 'resource_gathering')) target.hasGathered = false;
  startAbilityCooldown(caster, 'cadence_of_haste');
  interactionMode = 'idle';
  addLog(`🎶 ${getDisplayName(caster)} plays a Cadence of Haste! ${getDisplayName(target)} can move and act again!`);
  renderAll();
}

function executeMimic(caster, target) {
  // Mimic: copy target's last used ability and hold it
  const last = target.lastAbilityUsed;
  if (!last) {
    addLog(`🎭 ${getDisplayName(caster)} tries to Mimic ${getDisplayName(target)}, but they haven't used an ability!`);
    interactionMode = 'idle';
    renderAll();
    return;
  }
  caster.mimickedAbility = { id: last.id, name: last.name };
  caster.specialActionsUsed.push('mimic');
  addLog(`🎭 ${getDisplayName(caster)} mimics ${last.name} from ${getDisplayName(target)}! Use it before it fades.`);
  interactionMode = 'idle';
  renderAll();
}

function executeMimickedAbility(unit) {
  // Execute the stored mimicked ability, then clear it and start Mimic CD
  const ma = unit.mimickedAbility;
  if (!ma) return;

  // Build ability map: self-cast abilities execute immediately, targeted ones enter interaction mode
  const abilityMap = {
    // Self-cast / AoE abilities
    human_rally: () => executeRally(unit),
    orc_warcry: () => executeWarCry(unit),
    bloodrend: () => { interactionMode = 'bloodrend'; renderBoard(); return 'deferred'; },
    crescendo: () => executeCrescendo(unit),
    battle_march: () => executeBattleMarch(unit),
    divine_shield: () => executeDivineShield(unit),
    mirror_image: () => executeMirrorImage(unit),
    consecrate: () => executeConsecrate(unit),
    blood_frenzy: () => executeBloodFrenzy(unit),
    devour: () => { interactionMode = 'devour'; renderBoard(); return 'deferred'; },
    tame_beast: () => { interactionMode = 'tame_beast'; renderBoard(); return 'deferred'; },
    trolls_blessing: () => executeTrollsBlessing(unit),
    seizing_totem: () => { interactionMode = 'seizing_totem'; renderBoard(); return 'deferred'; },
    summon_swarm: () => executeSummonSwarm(unit),
    war_stomp: () => executeWarStomp(unit),
    heal_allies: () => executeHealAllies(unit),
    battle_cry: () => executeBattleCry(unit),
    lullaby: () => executeLullaby(unit),
    shield_bash: () => { interactionMode = 'shield_bash'; renderBoard(); return 'deferred'; },
    blade_dance: () => executeBladeDance(unit),
    rune_of_shatter: () => executeRuneOfShatter(unit),
    cadence_of_haste: () => { interactionMode = 'cadence_of_haste'; renderBoard(); return 'deferred'; },
    // Targeted abilities — enter interaction mode for target selection
    hex_curse: () => { interactionMode = 'hex_curse'; renderBoard(); return 'deferred'; },
    arcane_blast: () => { interactionMode = 'arcane_blast'; renderBoard(); return 'deferred'; },
    aimed_shot: () => { interactionMode = 'aimed_shot'; renderBoard(); return 'deferred'; },
    harpoon_shot: () => { interactionMode = 'harpoon_shot'; renderBoard(); return 'deferred'; },
    soul_siphon: () => { interactionMode = 'soul_siphon'; renderBoard(); return 'deferred'; },
    bone_explosion: () => { interactionMode = 'bone_explosion'; renderBoard(); return 'deferred'; },
    troll_rampage: () => { interactionMode = 'troll_rampage'; renderBoard(); return 'deferred'; },
    fireball: () => { interactionMode = 'fireball'; renderBoard(); return 'deferred'; },
    frost_ray: () => { interactionMode = 'frost_ray'; renderBoard(); return 'deferred'; },
    lightning_bolt: () => { interactionMode = 'lightning_bolt'; renderBoard(); return 'deferred'; },
    life_drain: () => { interactionMode = 'life_drain'; renderBoard(); return 'deferred'; },
    poison_cloud: () => { interactionMode = 'poison_cloud'; renderBoard(); return 'deferred'; },
    precision_shot: () => { interactionMode = 'precision_shot'; renderBoard(); return 'deferred'; },
    grapple: () => { interactionMode = 'grapple'; renderBoard(); return 'deferred'; },
    ensnare: () => { interactionMode = 'ensnare'; renderBoard(); return 'deferred'; },
    grab: () => { interactionMode = 'grab'; renderBoard(); return 'deferred'; },
    tunnel_a: () => { interactionMode = 'tunnel_a'; renderBoard(); return 'deferred'; },
    tunnel_b: () => { interactionMode = 'tunnel_b'; renderBoard(); return 'deferred'; },
    booby_trap: () => { interactionMode = 'booby_trap'; renderBoard(); return 'deferred'; },
    camouflage: () => { executeCamouflage(unit); },
    forge_barrel: () => executeForgeBarrel(unit),
    poisonous_shiv: () => { interactionMode = 'poisonous_shiv'; renderBoard(); return 'deferred'; },
    rescue: () => { interactionMode = 'rescue'; renderBoard(); return 'deferred'; },
    bounty_mark: () => { interactionMode = 'bounty_mark'; renderBoard(); return 'deferred'; },
    appraise_destroy: () => { interactionMode = 'appraise_destroy'; renderAll(); return 'deferred'; },
    blink: () => { interactionMode = 'blink'; renderBoard(); return 'deferred'; },
    corrupted_chalice: () => { interactionMode = 'corrupted_chalice'; renderBoard(); return 'deferred'; },
    smoke_bomb: () => { executeSmokeBomb(unit); },
    bottled_lightning: () => { interactionMode = 'bottled_lightning'; renderBoard(); return 'deferred'; },
    voodoo_doll: () => { interactionMode = 'voodoo_doll'; renderBoard(); return 'deferred'; },
    // Special
    gather: () => {
      unit.mimicGather = true;
      addLog(`🎭 ${getDisplayName(unit)} uses mimicked Gather! They can now gather resources this turn.`);
      renderAll();
    },
  };

  const fn = abilityMap[ma.id];
  if (fn) {
    addLog(`🎭 ${getDisplayName(unit)} uses mimicked ${ma.name}!`);
    // Clear the mimicked ability and start Mimic CD
    unit.mimickedAbility = null;
    const cd = getAbilityCooldown('mimic');
    if (cd > 1) {
      if (!unit.cooldowns) unit.cooldowns = {};
      unit.cooldowns['mimic'] = cd;
    }
    const result = fn();
    // For deferred (targeted) abilities, the actual execution happens on click
    // but the mimicked ability is already consumed
  } else {
    addLog(`🎭 ${getDisplayName(unit)} tries to use mimicked ${ma.name}, but can't replicate it!`);
    unit.mimickedAbility = null;
    renderAll();
  }
}

function executeLullaby(unit) {
  // Lullaby: beguile all adjacent enemies for 2 turns
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  for (const enemy of enemies) {
    applyStatusEffect(enemy, 'beguiled', 2);
  }
  startAbilityCooldown(unit, 'lullaby');
  addLog(`🧜 ${getDisplayName(unit)} sings a Lullaby! ${enemies.length} ${enemies.length === 1 ? 'enemy' : 'enemies'} beguiled for 2 turns!`);
  renderAll();
}

// ============================================================
// KOBOLD ABILITIES
// ============================================================
function executeTunnelPlace(unit, x, y, label) {
  if (!G.tunnels) G.tunnels = [];
  // Remove existing tunnel of same label for this player
  G.tunnels = G.tunnels.filter(t => !(t.playerId === unit.playerId && t.label === label));
  G.tunnels.push({ x, y, playerId: unit.playerId, label });
  const abilityId = label === 'A' ? 'tunnel_a' : 'tunnel_b';
  startAbilityCooldown(unit, abilityId);
  addLog(`🕳️ ${getDisplayName(unit)} digs Tunnel Entrance ${label} at (${x},${y})!`);
  if (G.tunnels.filter(t => t.playerId === unit.playerId).length === 2) {
    addLog(`🐉 Kobold tunnel network complete! Kobold units can now travel between A and B.`);
  }
  interactionMode = 'idle';
  renderAll();
}

function executeTunnelTravel(unit, destination) {
  unit.x = destination.x;
  unit.y = destination.y;
  startAbilityCooldown(unit, 'use_tunnel');
  addLog(`🕳️ ${getDisplayName(unit)} travels through the tunnel to (${destination.x},${destination.y})!`);
  interactionMode = 'idle';
  renderAll();
}

function executeScavenge(unit) {
  // Scavenge: find a random loot item
  const lootId = LOOT_ITEMS[Math.floor(Math.random() * LOOT_ITEMS.length)];
  const item = JSON.parse(JSON.stringify(ITEMS[lootId]));
  unit.inventory.push(item);
  startAbilityCooldown(unit, 'scavenge');
  addLog(`⚙ ${getDisplayName(unit)} rummages around and finds: ${item.name}!`);
  renderAll();
}

// --- Nomad abilities ---
function executeForgeBarrel(unit) {
  // Craft Explosive Barrel: generate an explosive barrel consumable in inventory
  const barrel = JSON.parse(JSON.stringify(CONSUMABLES.explosive_barrel));
  unit.inventory.push(barrel);
  startAbilityCooldown(unit, 'forge_barrel');
  addLog(`🛢 ${getDisplayName(unit)} crafts an Explosive Barrel!`);
  renderAll();
}

function executePoisonousShiv(caster, target) {
  // Poisonous Shiv: instantly apply 5 stacks of poison
  if (hasPassive(target, 'poison_resistance')) {
    addLog(`🛡 ${getDisplayName(target)} resists the Poisonous Shiv!`);
  } else if (hasPassive(target, 'stone_skin_passive')) {
    addLog(`🪨 ${getDisplayName(target)}'s Stone Skin blocks the Poisonous Shiv!`);
  } else {
    // Apply poison, force to 5 stacks
    if (!target.statusEffects) target.statusEffects = [];
    const existing = target.statusEffects.find(se => se.id === 'poison');
    if (existing) {
      existing.stacks = 5;
      existing.turnsLeft = 3;
    } else {
      target.statusEffects.push({ id: 'poison', turnsLeft: 3, stacks: 5 });
    }
    addLog(`🗡️ ${getDisplayName(caster)} drives a poisonous shiv into ${getDisplayName(target)}! MAX POISON (5/5 stacks)!`);
  }
  startAbilityCooldown(caster, 'poisonous_shiv');
  if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
  interactionMode = 'idle';
  renderAll();
}

function executeRescue(caster, ally) {
  // Rescue: teleport to ally and heal them for 10 HP
  // Find an empty tile adjacent to the ally
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  let bestTile = null;
  for (const [dx, dy] of dirs) {
    const nx = ally.x + dx, ny = ally.y + dy;
    if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
        !G.units.some(u => u.hp > 0 && u.x === nx && u.y === ny) &&
        !(G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) &&
        (!G.board[ny][nx] || !G.board[ny][nx].type || G.board[ny][nx].amount <= 0)) {
      bestTile = { x: nx, y: ny };
      break;
    }
  }
  if (!bestTile) {
    addLog(`👁 ${getDisplayName(caster)} tries to rescue ${getDisplayName(ally)}, but there's no space nearby!`);
    interactionMode = 'idle';
    renderAll();
    return;
  }
  const oldX = caster.x, oldY = caster.y;
  caster.x = bestTile.x;
  caster.y = bestTile.y;
  const allyStats = getUnitStats(ally);
  const oldHp = ally.hp;
  ally.hp = Math.min(allyStats.maxHp, ally.hp + 10);
  const healed = ally.hp - oldHp;
  caster.movementLeft = 0;
  caster.hasAttacked = true;
  startAbilityCooldown(caster, 'rescue');
  addLog(`👁 ${getDisplayName(caster)} teleports from (${oldX},${oldY}) to rescue ${getDisplayName(ally)}! Healed ${healed} HP (${ally.hp}/${allyStats.maxHp})!`);
  interactionMode = 'idle';
  renderAll();
}

function executeBountyMark(caster, target) {
  applyStatusEffect(target, 'bounty_marked', 99);
  startAbilityCooldown(caster, 'bounty_mark');
  addLog(`🎯 ${getDisplayName(caster)} marks ${getDisplayName(target)} for death! (+3 damage from all sources, 3 gold bounty on kill)`);
  interactionMode = 'idle';
  renderAll();
}

function executePlaceBarrel(unit, x, y) {
  // Place an explosive barrel on the ground
  if (!G.barrels) G.barrels = [];
  G.barrels.push({ x, y, playerId: unit.playerId, damage: 8, radius: 2 });
  // Consume the barrel from inventory
  if (scrollPending && scrollPending.type === 'barrel') {
    unit.inventory.splice(scrollPending.idx, 1);
    scrollPending = null;
  }
  addLog(`🛢 ${getDisplayName(unit)} places an Explosive Barrel at (${x},${y})!`);
  interactionMode = 'idle';
  renderAll();
}

function triggerBarrelExplosion(bx, by) {
  if (!G.barrels) return;
  const barrelIdx = G.barrels.findIndex(b => b.x === bx && b.y === by);
  if (barrelIdx === -1) return;
  const barrel = G.barrels[barrelIdx];
  G.barrels.splice(barrelIdx, 1);
  addLog(`💥 The Explosive Barrel at (${bx},${by}) detonates!`);
  // Deal damage to all units within radius
  const targets = G.units.filter(u => u.hp > 0 && chebyshevDist(bx, by, u.x, u.y) <= barrel.radius);
  for (const t of targets) {
    let dmg = barrel.damage;
    const bulwarkStacks = countPassive(t, 'bulwark');
    if (bulwarkStacks > 0 && dmg > 1) dmg = Math.max(1, dmg - bulwarkStacks);
    t.hp -= dmg;
    addLog(`💥 ${getDisplayName(t)} takes ${dmg} barrel explosion damage! (${t.hp > 0 ? t.hp + ' HP left' : 'DEFEATED!'})`);
    if (t.hp <= 0) {
      t.hp = 0;
      dropAllItems(t);
      addLog(`☠ ${getDisplayName(t)} has been slain by the explosion!`);
    }
  }
  // Chain reaction: check if other barrels are in range
  const chainBarrels = (G.barrels || []).filter(b => chebyshevDist(bx, by, b.x, b.y) <= barrel.radius);
  for (const cb of chainBarrels) {
    triggerBarrelExplosion(cb.x, cb.y);
  }
  G.units = G.units.filter(u => u.hp > 0);
  for (const pid of [...new Set(targets.filter(t => t.hp <= 0).map(t => t.playerId))]) {
    checkPlayerElimination(pid);
  }
}

function executeRunicConjure(unit) {
  // Runic Conjure: generate a random consumable
  const consumableId = CONSUMABLE_IDS[Math.floor(Math.random() * CONSUMABLE_IDS.length)];
  const item = JSON.parse(JSON.stringify(CONSUMABLES[consumableId]));
  unit.inventory.push(item);
  startAbilityCooldown(unit, 'runic_conjure');
  addLog(`✨ ${getDisplayName(unit)}'s Runic Staff crackles and conjures: ${item.icon || '🧪'} ${item.name}!`);
  triggerMirrorDuplicate(unit, 'runic_conjure', null);
  renderAll();
}

function executeUtilityHex(caster, target, hexType) {
  // Utility magic weapon actions: apply a debuff with no damage
  const HEX_EFFECTS = { curse_hex: 'cursed', lethargy: 'slowed', flash_freeze: 'frozen', enfeeble: 'weakened', gore_curse: 'bleeding' };
  const HEX_NAMES  = { curse_hex: 'Curse Hex', lethargy: 'Lethargy', flash_freeze: 'Flash Freeze', enfeeble: 'Enfeeble', gore_curse: 'Gore Curse' };
  const HEX_ICONS  = { curse_hex: '👻', lethargy: '🐌', flash_freeze: '❄️', enfeeble: '💀', gore_curse: '🩸' };
  const effect = HEX_EFFECTS[hexType];
  const name = HEX_NAMES[hexType];
  const icon = HEX_ICONS[hexType];

  if (hasPassive(target, 'magic_resistance')) {
    addLog(`✨ ${getDisplayName(target)}'s Magic Resistance blocks the ${name}!`);
  } else {
    applyStatusEffect(target, effect, 2);
    addLog(`${icon} ${getDisplayName(caster)}'s ${name} hits ${getDisplayName(target)} — ${effect} for 2 turns!`);
  }
  triggerMirrorDuplicate(caster, hexType, target);
  startAbilityCooldown(caster, hexType);
  interactionMode = 'idle';
  renderAll();
}

function executeCamouflage(unit) {
  unit.camouflaged = true;
  unit.camouflageStationaryTurns = 0;
  unit.camoX = unit.x;
  unit.camoY = unit.y;
  startAbilityCooldown(unit, 'camouflage');
  addLog(`🌳 ${getDisplayName(unit)} blends into the surroundings, disguised as a tree!`);
  interactionMode = 'idle';
  renderAll();
}

function breakCamouflage(unit, reason) {
  if (!unit.camouflaged) return;
  unit.camouflaged = false;
  unit.camouflageStationaryTurns = 0;
  delete unit.camoX;
  delete unit.camoY;
  addLog(`🌳 ${getDisplayName(unit)}'s camouflage breaks! (${reason})`);
}

function executeBoobyTrap(unit, x, y) {
  // Booby Trap: place a hidden trap on an adjacent empty tile
  if (!G.traps) G.traps = [];
  G.traps.push({ x: x, y: y, playerId: unit.playerId, damage: 5 });
  startAbilityCooldown(unit, 'booby_trap');
  addLog(`🪤 ${getDisplayName(unit)} places a hidden trap at (${x},${y})!`);
  interactionMode = 'idle';
  renderAll();
}

function dropAllItems(unit) {
  if (!G.groundItems) G.groundItems = [];
  // If this unit is a mirror image, don't drop items (it has none)
  if (unit.isMirrorImage) return;
  // If this unit has a mirror image, destroy it
  const mirror = G.units.find(u => u.hp > 0 && u.isMirrorImage && u.mirrorOwnerId === unit.id);
  if (mirror) {
    mirror.hp = 0;
    addLog(`🪞 ${getDisplayName(unit)}'s mirror image shatters!`);
  }
  for (const slot of getUnitEquipSlots(unit)) {
    if (unit.equipment && unit.equipment[slot] && unit.equipment[slot] !== '_two_handed_') {
      G.groundItems.push({ x: unit.x, y: unit.y, item: unit.equipment[slot] });
      unit.equipment[slot] = null;
    }
  }
  for (const item of (unit.inventory || [])) {
    G.groundItems.push({ x: unit.x, y: unit.y, item: item });
  }
  unit.inventory = [];
}

function checkPlayerElimination(playerId) {
  if (playerId === NPC_PLAYER_ID) return;
  const alive = G.units.some(u => u.playerId === playerId && u.hp > 0 && !u.isTotem);
  if (!alive) {
    G.players[playerId].alive = false;
    addLog(`⚔ ${G.players[playerId].name} has been eliminated!`);

    const alivePlayers = G.players.filter(p => p.alive);
    if (alivePlayers.length === 1) {
      addLog(`🏆 ${alivePlayers[0].name} WINS THE GAME!`);
    }
  }
}

// Dark Purpose: grant a stack of Dark Energy (or refresh all stacks) on magic crit
function triggerDarkPurpose(unit) {
  if (!unit.statusEffects) unit.statusEffects = [];
  const existing = unit.statusEffects.find(se => se.id === 'dark_energy');
  if (existing) {
    const oldStacks = existing.stacks || 1;
    existing.stacks = Math.min(5, oldStacks + 2);
    existing.turnsLeft = 5; // reset decay timer on every crit
    if (existing.stacks > oldStacks) {
      addLog(`🌑 ${getDisplayName(unit)}'s Dark Purpose surges! Dark Energy ${existing.stacks}/5 stacks (+${existing.stacks} STR/AGI, 5 turns)`);
    } else {
      addLog(`🌑 ${getDisplayName(unit)}'s Dark Purpose refreshes! Dark Energy at max stacks (5/5, 5 turns)`);
    }
  } else {
    unit.statusEffects.push({ id: 'dark_energy', turnsLeft: 5, stacks: 2 });
    addLog(`🌑 ${getDisplayName(unit)}'s Dark Purpose awakens! Dark Energy 2/5 stacks (+2 STR/AGI, 5 turns)`);
  }
}

// Soul Barricade: grant stacks to nearby units with hungering_soul when a unit dies
function grantSoulBarricadeStacks(deadUnit) {
  if (!G || !G.units) return;
  for (const u of G.units) {
    if (u.hp > 0 && u.id !== deadUnit.id && hasPassive(u, 'hungering_soul') && chebyshevDist(deadUnit.x, deadUnit.y, u.x, u.y) <= 5) {
      if (!u.soulBarricadeStacks) u.soulBarricadeStacks = 0;
      if (u.soulBarricadeStacks < 5) {
        u.soulBarricadeStacks++;
        addLog(`💀 ${getDisplayName(u)}'s Soul Barricade absorbs a soul! (${u.soulBarricadeStacks}/5 stacks)`);
      }
    }
  }
}

function finalizeUnitDeath(unit, { dropItems = true, clearSelection = false, filterUnits = true } = {}) {
  if (!unit) return;
  // Pestilence: if dying unit was poisoned and an enemy with pestilence is within 5 tiles, spawn a plague rat
  if (unit.statusEffects && unit.statusEffects.some(se => se.id === 'poison')) {
    const pestilenceUnit = G.units.find(u =>
      u.hp > 0 && u.playerId !== unit.playerId &&
      hasPassive(u, 'pestilence') &&
      chebyshevDist(unit.x, unit.y, u.x, u.y) <= 5
    );
    if (pestilenceUnit) {
      let spawnX = unit.x, spawnY = unit.y;
      const tileOccupied = G.units.some(u => u.hp > 0 && u.x === spawnX && u.y === spawnY && u.id !== unit.id);
      if (tileOccupied) {
        const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
        let found = false;
        for (const [dx, dy] of dirs) {
          const nx = unit.x + dx, ny = unit.y + dy;
          if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
          if (G.units.some(u2 => u2.hp > 0 && u2.x === nx && u2.y === ny)) continue;
          spawnX = nx; spawnY = ny; found = true; break;
        }
        if (!found) { spawnX = -1; }
      }
      if (spawnX >= 0) {
        const pPlayer = G.players[pestilenceUnit.playerId];
        const pPrefix = pPlayer.faction && FACTIONS[pPlayer.faction] ? FACTIONS[pPlayer.faction].prefix : '';
        const rat = createUnit('plague_rat', pestilenceUnit.playerId, spawnX, spawnY, pPrefix, pPlayer.faction);
        rat.id = G.nextUnitId++;
        nextUnitId = G.nextUnitId;
        rat.movementLeft = 0;
        rat.hasAttacked = true;
        G.units.push(rat);
        addLog(`🐀 ${getDisplayName(pestilenceUnit)}'s Pestilence spawns a Plague Rat from the poisoned corpse!`);
      }
    }
  }
  grantSoulBarricadeStacks(unit);
  unit.hp = 0;
  if (dropItems) dropAllItems(unit);
  if (filterUnits) {
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(unit.playerId);
  }
  if (clearSelection && selectedUnitId === unit.id) selectedUnitId = null;
}

// ============================================================
// AUTO GATHER
// ============================================================
function autoGatherAll() {
  if (!G || !G.units) return;
  const pid = G.currentPlayer;
  // Get all living workers belonging to the current player
  const workers = G.units.filter(u =>
    u.hp > 0 && u.playerId === pid &&
    (u.canGather || hasPassive(u, 'resource_gathering')) &&
    !u.hasPlacedWallThisTurn &&
    !hasStatusEffect(u, 'on_strike')
  );
  if (workers.length === 0) {
    addLog('⛏ No available workers to auto-gather.');
    renderAll();
    return;
  }

  let gathered = 0, moved = 0;

  for (const worker of workers) {
    const gatherStart = worker.hasGathered;
    const moveStart = worker.movementLeft;
    runWorkerAutoGatherTurn(worker);
    if (!gatherStart && worker.hasGathered) gathered++;
    if (worker.movementLeft < moveStart) moved++;
  }

  if (gathered === 0 && moved === 0) {
    addLog('⛏ Auto Gather: No workers could gather or move closer to resources.');
  } else {
    if (gathered > 0) addLog(`⛏ Auto Gather: ${gathered} worker(s) gathered resources.`);
    if (moved > 0) addLog(`⛏ Auto Gather: ${moved} worker(s) moved towards resources.`);
  }

  interactionMode = 'idle';
  selectedUnitId = null;
  renderAll();
}

function findNearestResource(unit, resourceType = null) {
  let best = null;
  let bestDist = Infinity;
  for (let y = 0; y < G.boardSize; y++) {
    for (let x = 0; x < G.boardSize; x++) {
      const cell = G.board[y][x];
      if (cell && cell.amount > 0 && cell.type !== 'wall' && (!resourceType || cell.type === resourceType)) {
        const d = chebyshevDist(unit.x, unit.y, x, y);
        if (d < bestDist) {
          bestDist = d;
          best = { x, y, res: cell };
        }
      }
    }
  }
  return best;
}

function getWorkerAutoGatherType(unit) {
  if (!unit) return null;
  return (unit.lastMinedResourceType && RESOURCE_TYPES.includes(unit.lastMinedResourceType))
    ? unit.lastMinedResourceType
    : null;
}

function findNearestResourceForAutoGather(unit, preferredType = null) {
  let best = null;
  let bestSteps = Infinity;

  for (let y = 0; y < G.boardSize; y++) {
    for (let x = 0; x < G.boardSize; x++) {
      const cell = G.board[y][x];
      if (!cell || cell.amount <= 0 || cell.type === 'wall') continue;
      if (preferredType && cell.type !== preferredType) continue;

      for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
        const sx = x + dx, sy = y + dy;
        if (sx < 0 || sx >= G.boardSize || sy < 0 || sy >= G.boardSize) continue;
        if (sx !== unit.x || sy !== unit.y) {
          if (getUnitAt(sx, sy)) continue;
          if (isTileBlockedForUnit(sx, sy, unit)) continue;
        }

        const steps = (sx === unit.x && sy === unit.y) ? 0 : (bfsDistance(unit, sx, sy) ?? Infinity);
        if (!Number.isFinite(steps)) continue;

        if (steps < bestSteps) {
          bestSteps = steps;
          best = { x, y, standX: sx, standY: sy, type: cell.type };
        }
      }
    }
  }

  return best;
}

function runWorkerAutoGatherTurn(worker) {
  const preferredType = getWorkerAutoGatherType(worker);
  let safety = 0;
  while (worker && worker.hp > 0 && safety < 40) {
    safety++;

    if (!worker.hasGathered) {
      const adjacentTarget = pickAutoGatherAdjacent(worker, preferredType);
      if (adjacentTarget) {
        gatherResource(worker, adjacentTarget.x, adjacentTarget.y);
        continue;
      }

      const gatherOpportunity = findGatherOpportunityThisTurn(worker, preferredType);
      if (gatherOpportunity) {
        const completed = moveWorkerToward(worker, gatherOpportunity.standX, gatherOpportunity.standY, true, preferredType);
        if (completed) continue;
      }
    }

    if (worker.movementLeft <= 0) break;

    const nearest = findNearestResourceForAutoGather(worker, preferredType) || findNearestResourceForAutoGather(worker, null);
    if (!nearest) break;
    if (worker.x === nearest.standX && worker.y === nearest.standY) break;

    const progressed = moveWorkerToward(worker, nearest.standX, nearest.standY, false, preferredType);
    if (!progressed) break;
  }
}

function findGatherOpportunityThisTurn(worker, preferredType) {
  const positions = [{ x: worker.x, y: worker.y }, ...getReachableTiles(worker)];
  let bestPreferred = null;
  let bestPreferredSteps = Infinity;
  let bestAny = null;
  let bestAnySteps = Infinity;

  for (const pos of positions) {
    const steps = (pos.x === worker.x && pos.y === worker.y) ? 0 : (bfsDistance(worker, pos.x, pos.y) ?? Infinity);
    if (steps > worker.movementLeft) continue;
    const adjacentResources = getAdjacentResourcesAt(pos.x, pos.y).filter(r => r.res && r.res.type !== 'wall');
    if (adjacentResources.length === 0) continue;

    if (preferredType) {
      const prefAdj = adjacentResources.find(adj => adj.res.type === preferredType);
      if (prefAdj && steps < bestPreferredSteps) {
        bestPreferredSteps = steps;
        bestPreferred = { standX: pos.x, standY: pos.y, targetX: prefAdj.x, targetY: prefAdj.y, targetType: prefAdj.res.type };
      }
    }

    if (steps < bestAnySteps) {
      const chosen = adjacentResources[0];
      bestAnySteps = steps;
      bestAny = { standX: pos.x, standY: pos.y, targetX: chosen.x, targetY: chosen.y, targetType: chosen.res.type };
    }
  }
  return bestPreferred || bestAny;
}

function getAdjacentResourcesAt(x, y) {
  const results = [];
  for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
    const res = G.board[ny][nx];
    if (res && res.amount > 0) results.push({ x: nx, y: ny, res });
  }
  return results;
}

function moveWorkerToward(worker, tx, ty, stopForGather, preferredType) {
  let progressed = false;
  let safety = 0;
  while (worker.hp > 0 && worker.movementLeft > 0 && (worker.x !== tx || worker.y !== ty) && safety < 40) {
    safety++;
    const nextStep = getNextStepToward(worker, tx, ty);
    if (!nextStep) break;
    const beforeX = worker.x;
    const beforeY = worker.y;
    moveUnit(worker, nextStep.x, nextStep.y);
    if (worker.hp <= 0) return progressed;
    if (worker.x === beforeX && worker.y === beforeY) break;
    progressed = true;

    if (!worker.hasGathered) {
      const adjacentTarget = pickAutoGatherAdjacent(worker, preferredType);
      if (adjacentTarget) {
        gatherResource(worker, adjacentTarget.x, adjacentTarget.y);
        if (stopForGather) return true;
      }
    }
  }
  return progressed;
}

function getNextStepToward(unit, tx, ty) {
  const visited = new Set();
  const parent = new Map();
  const queue = [{ x: unit.x, y: unit.y }];
  const startKey = `${unit.x},${unit.y}`;
  visited.add(startKey);

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.x === tx && cur.y === ty) break;

    for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
      const nx = cur.x + dx, ny = cur.y + dy;
      const key = `${nx},${ny}`;
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (visited.has(key)) continue;
      if (getUnitAt(nx, ny) && !(nx === tx && ny === ty)) continue;
      if (isTileBlockedForUnit(nx, ny, unit)) continue;
      if (isBlockedBySeizingTotem(cur.x, cur.y, nx, ny, unit)) continue;
      visited.add(key);
      parent.set(key, `${cur.x},${cur.y}`);
      queue.push({ x: nx, y: ny });
    }
  }

  const targetKey = `${tx},${ty}`;
  if (!visited.has(targetKey)) return null;

  let stepKey = targetKey;
  let prevKey = parent.get(stepKey);
  while (prevKey && prevKey !== startKey) {
    stepKey = prevKey;
    prevKey = parent.get(stepKey);
  }
  const [sx, sy] = stepKey.split(',').map(Number);
  if (!Number.isFinite(sx) || !Number.isFinite(sy) || (sx === unit.x && sy === unit.y)) return null;
  return { x: sx, y: sy };
}

function pickAutoGatherAdjacent(worker, preferredType) {
  const adjRes = getAdjacentResources(worker).filter(r => r.res && r.res.type !== 'wall');
  if (adjRes.length === 0) return null;
  if (preferredType) {
    const preferred = adjRes.find(r => r.res && r.res.type === preferredType);
    if (preferred) return preferred;
  }
  return adjRes[0];
}

// ============================================================
// RESOURCE GATHERING
// ============================================================
function getAdjacentResources(unit) {
  const results = [];
  for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
    const nx = unit.x + dx, ny = unit.y + dy;
    if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
    const r = G.board[ny][nx];
    if (r && r.amount > 0 && r.type !== 'wall') results.push({ x: nx, y: ny, res: r });
  }
  return results;
}

function hasNearbyEnemyPlayerUnit(playerId, x, y, radius = WALL_ENEMY_PROXIMITY_RADIUS) {
  return G.units.some(u =>
    u.hp > 0 &&
    u.playerId !== playerId &&
    u.playerId !== NPC_PLAYER_ID &&
    chebyshevDist(x, y, u.x, u.y) <= radius
  );
}

function canPlaceWallAt(x, y, playerId) {
  if (x < 0 || x >= G.boardSize || y < 0 || y >= G.boardSize) return false;
  if (G.board[y][x]) return false;
  if (G.units.some(u => u.hp > 0 && u.x === x && u.y === y)) return false;
  if (G.structures && G.structures.some(s => s.x === x && s.y === y)) return false;
  if (G.shops && G.shops.some(s => s.x === x && s.y === y)) return false;
  if (G.vendors && G.vendors.some(v => v.x === x && v.y === y)) return false;
  if (G.bazaars && G.bazaars.some(b => b.x === x && b.y === y)) return false;
  if (G.barrels && G.barrels.some(b => b.x === x && b.y === y)) return false;
  if (G.tunnels && G.tunnels.some(t => t.x === x && t.y === y)) return false;
  if (G.traps && G.traps.some(t => t.x === x && t.y === y)) return false;
  if (hasNearbyEnemyPlayerUnit(playerId, x, y, WALL_ENEMY_PROXIMITY_RADIUS)) return false;
  return true;
}

function getValidWallPlacementTiles(unit) {
  if (!unit || unit.hp <= 0) return [];
  const tiles = [];
  for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
    const nx = unit.x + dx;
    const ny = unit.y + dy;
    if (canPlaceWallAt(nx, ny, unit.playerId)) tiles.push({ x: nx, y: ny });
  }
  return tiles;
}

function destroySelectedWall() {
  if (!selectedWall || !G || !G.board) return;
  const { x, y } = selectedWall;
  const tile = G.board[y] && G.board[y][x];
  if (!tile || tile.type !== 'wall' || tile.amount <= 0) {
    selectedWall = null;
    renderAll();
    return;
  }
  if (tile.ownerPlayerId != null && tile.ownerPlayerId !== G.currentPlayer) {
    addLog(`Cannot destroy an enemy wall.`);
    return;
  }
  G.board[y][x] = null;
  addLog(`🧱 ${G.players[G.currentPlayer].name} demolishes a wall at (${x},${y}).`);
  selectedWall = null;
  renderAll();
}

function placeWallBlock(unit, x, y) {
  if (!unit || unit.playerId !== G.currentPlayer || !unit.canGather || hasStatusEffect(unit, 'on_strike')) return;
  if (unit.hasGathered) {
    addLog(`🧱 ${getDisplayName(unit)} already gathered and cannot place walls this turn.`);
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }
  const pRes = G.players[unit.playerId].resources;
  if ((unit.wallPlacementsLeft || 0) <= 0) {
    addLog(`🧱 ${getDisplayName(unit)} has no wall placements left this turn.`);
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }
  if ((pRes.wall || 0) < 1) {
    addLog(`Not enough wall resource! Placing a wall costs 1 Wall.`);
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }
  if (!isAdjacent(unit.x, unit.y, x, y) || !canPlaceWallAt(x, y, unit.playerId)) {
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }

  pRes.wall -= 1;
  unit.wallPlacementsLeft = (unit.wallPlacementsLeft || 0) - 1;
  unit.hasPlacedWallThisTurn = true;
  G.board[y][x] = { type: 'wall', amount: WALL_TILE_DURABILITY, ownerPlayerId: unit.playerId };
  addLog(`🧱 ${getDisplayName(unit)} builds a wall at (${x},${y}). (${unit.wallPlacementsLeft} placement${unit.wallPlacementsLeft === 1 ? '' : 's'} left this turn)`);

  const canContinue = (unit.wallPlacementsLeft || 0) > 0 && (pRes.wall || 0) > 0 && !hasNearbyEnemyPlayerUnit(unit.playerId, unit.x, unit.y, WALL_ENEMY_PROXIMITY_RADIUS);
  if (canContinue) {
    const nextTiles = getValidWallPlacementTiles(unit);
    if (nextTiles.length > 0) {
      interactionMode = 'place_wall';
      reachableTiles = nextTiles;
      renderAll();
      return;
    }
  }

  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

function gatherResource(unit, rx, ry) {
  const resource = G.board[ry][rx];
  if (!resource || resource.amount <= 0) return;
  const type = resource.type;
  if (type === 'wall') {
    addLog(`🧱 Walls must be attacked, not gathered.`);
    interactionMode = 'idle';
    renderAll();
    return;
  }
  const stats = getUnitStats(unit);
  const gatherPerAction = unit.type === 'worker' ? 1 : Math.max(1, 1 + stats.gatherBonus);
  const amount = Math.min(resource.amount, gatherPerAction);

  G.players[unit.playerId].resources[type] += amount;
  resource.amount -= amount;
  unit.hasGathered = true;
  unit.lastMinedResourceType = type;

  // Track gather per-unit so Mimic can copy it
  unit.lastAbilityUsed = { id: 'gather', name: 'Gather' };

  addLog(`${getDisplayName(unit)} gathered ${amount} ${type} from (${rx},${ry}) (${resource.amount} remaining)`);

  if (resource.amount <= 0) {
    G.board[ry][rx] = null;
    addLog(`Resource depleted at (${rx}, ${ry})`);
  }

  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// ITEM MANAGEMENT
// ============================================================
function equipItem(unitId, inventoryIndex) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const item = u.inventory[inventoryIndex];
  if (!item) return;

  const slot = item.slot;

  // Block equipping in restricted slots (e.g. Magnate can't wear armor)
  if (isSlotBlocked(u, slot)) {
    addLog(`${getDisplayName(u)} cannot equip items in the ${SLOT_LABELS[slot] || slot} slot!`);
    renderAll();
    return;
  }

  // Block equipping items the unit is not proficient with
  if (!canUseProficiency(u, item)) {
    const type = item.weaponType || item.armorType;
    addLog(`${getDisplayName(u)} is not proficient with ${type} items and cannot equip ${item.name}!`);
    renderAll();
    return;
  }

  // Double Strike / Dual Wield: if equipping a 1H weapon and mainhand occupied, put in offhand
  // With Strong Grip: can also put two-handed weapons in offhand
  if (slot === 'mainhand' && (hasPassive(u, 'double_strike') || hasPassive(u, 'dual_wield')) &&
      u.equipment.mainhand && u.equipment.mainhand !== '_two_handed_') {
    // 1H weapons always work with double strike
    // 2H weapons require dual_grip (Strong Grip) to go in offhand
    if (!item.twoHanded || (item.twoHanded && hasPassive(u, 'dual_grip'))) {
      const oldOff = u.equipment.offhand;
      u.inventory.splice(inventoryIndex, 1);
      if (oldOff && oldOff !== '_two_handed_') u.inventory.push(oldOff);
      u.equipment.offhand = item;
      addLog(`${getDisplayName(u)} equips ${item.name} in their off hand!`);
      renderAll();
      return;
    }
  }

  // If equipping a two-handed weapon, also clear offhand (unless unit has dual_grip)
  if (item.twoHanded) {
    const hasDualGrip = hasPassive(u, 'dual_grip');
    const oldMain = u.equipment.mainhand;
    const oldOff = u.equipment.offhand;
    u.inventory.splice(inventoryIndex, 1);
    if (oldMain && oldMain !== '_two_handed_') u.inventory.push(oldMain);
    if (!hasDualGrip && oldOff && oldOff !== '_two_handed_') u.inventory.push(oldOff);
    u.equipment.mainhand = item;
    if (!hasDualGrip) u.equipment.offhand = '_two_handed_';
  }
  // If equipping an offhand item and mainhand is two-handed (and no dual_grip), unequip the 2H weapon first
  else if (slot === 'offhand' && u.equipment.mainhand && u.equipment.mainhand.twoHanded && !hasPassive(u, 'dual_grip')) {
    const old2H = u.equipment.mainhand;
    const oldOff = u.equipment.offhand;
    u.inventory.splice(inventoryIndex, 1);
    u.inventory.push(old2H);
    // oldOff is '_two_handed_' marker, don't push it
    u.equipment.mainhand = null;
    u.equipment.offhand = item;
  }
  // Extra slot equipping: items can go into extra slots if primary is full (offhand, accessory, head, etc.)
  else if (u.equipment[slot] && u.equipment[slot] !== '_two_handed_') {
    const unitSlots = getUnitEquipSlots(u);
    const extraSlot = unitSlots.find(s => s !== slot && s.startsWith(slot) && (!u.equipment[s] || u.equipment[s] === null));
    if (extraSlot) {
      u.inventory.splice(inventoryIndex, 1);
      u.equipment[extraSlot] = item;
    } else {
      // All extra slots full — swap with primary slot
      const oldItem = u.equipment[slot];
      u.inventory.splice(inventoryIndex, 1);
      if (oldItem && oldItem !== '_two_handed_') u.inventory.push(oldItem);
      u.equipment[slot] = item;
    }
  }
  // Normal equip
  else {
    const oldItem = u.equipment[slot];
    u.inventory.splice(inventoryIndex, 1);
    if (oldItem && oldItem !== '_two_handed_') u.inventory.push(oldItem);
    u.equipment[slot] = item;
  }

  // Recompute and cap HP
  const stats = getUnitStats(u);
  if (u.hp > stats.maxHp) u.hp = stats.maxHp;
  // Update movementLeft if movement decreased
  if (u.movementLeft > stats.movement) u.movementLeft = stats.movement;

  // Newly equipped items with actions can't be used the same turn
  if (item.action) {
    if (!u.cooldowns) u.cooldowns = {};
    if (!u.cooldowns[item.action] || u.cooldowns[item.action] < 1) {
      u.cooldowns[item.action] = 1;
    }
  }

  addLog(`${getDisplayName(u)} equipped ${item.name}`);
  renderAll();
}

function unequipItem(unitId, slot) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const item = u.equipment[slot];
  if (!item || item === '_two_handed_') return;
  if (item.cursed) { addLog(`⚠️ ${item.name} is cursed and cannot be unequipped!`); return; }

  // If unequipping a two-handed weapon, also free the offhand (unless dual_grip)
  if (item.twoHanded && slot === 'mainhand') {
    u.equipment.mainhand = null;
    if (!hasPassive(u, 'dual_grip')) {
      u.equipment.offhand = null;
    }
  } else {
    u.equipment[slot] = null;
  }
  u.inventory.push(item);

  // If we just lost dual_grip (unequipped grippers) and have a 2H weapon + offhand, unequip the offhand
  if (item.passives && item.passives.includes('dual_grip') && u.equipment.mainhand && u.equipment.mainhand.twoHanded && u.equipment.offhand && u.equipment.offhand !== '_two_handed_') {
    const lostOffhand = u.equipment.offhand;
    u.equipment.offhand = '_two_handed_';
    u.inventory.push(lostOffhand);
    addLog(`${getDisplayName(u)} can no longer hold ${lostOffhand.name} with a two-handed weapon!`);
  }

  const stats = getUnitStats(u);
  if (u.hp > stats.maxHp) u.hp = stats.maxHp;
  if (u.movementLeft > stats.movement) u.movementLeft = stats.movement;

  addLog(`${getDisplayName(u)} unequipped ${item.name}`);
  renderAll();
}

function appraiseDestroyEquip(unitId, slot) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const item = u.equipment[slot];
  if (!item || item === '_two_handed_' || !item.passives || item.passives.length === 0) return;
  // Absorb passives permanently (always adds a stack, even if already owned)
  if (!u.passives) u.passives = [];
  const absorbed = [];
  for (const p of item.passives) {
    u.passives.push(p);
    absorbed.push(p);
  }
  // Destroy the item (not dropped)
  if (item.twoHanded && slot === 'mainhand') {
    u.equipment.mainhand = null;
    if (!hasPassive(u, 'dual_grip')) u.equipment.offhand = null;
  } else {
    u.equipment[slot] = null;
  }
  const passiveNames = absorbed.map(p => {
    const pd = PASSIVES[p];
    return pd ? pd.name : p;
  });
  startAbilityCooldown(u, 'appraise_destroy');
  addLog(`🔍 ${getDisplayName(u)} appraises and destroys ${item.name}! Absorbed: ${passiveNames.join(', ') || 'no new passives'}.`);
  interactionMode = 'idle';
  const stats = getUnitStats(u);
  if (u.hp > stats.maxHp) u.hp = stats.maxHp;
  renderAll();
}

function appraiseDestroyInv(unitId, inventoryIndex) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const item = u.inventory[inventoryIndex];
  if (!item || !item.passives || item.passives.length === 0) return;
  // Absorb passives permanently (always adds a stack, even if already owned)
  if (!u.passives) u.passives = [];
  const absorbed = [];
  for (const p of item.passives) {
    u.passives.push(p);
    absorbed.push(p);
  }
  // Destroy the item
  u.inventory.splice(inventoryIndex, 1);
  const passiveNames = absorbed.map(p => {
    const pd = PASSIVES[p];
    return pd ? pd.name : p;
  });
  startAbilityCooldown(u, 'appraise_destroy');
  addLog(`🔍 ${getDisplayName(u)} appraises and destroys ${item.name}! Absorbed: ${passiveNames.join(', ') || 'no new passives'}.`);
  interactionMode = 'idle';
  renderAll();
}

function useConsumable(unitId, inventoryIndex) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const item = u.inventory[inventoryIndex];
  if (!item || !item.consumable) return;
  const stats = getUnitStats(u);

  if (item.id === 'healing_potion') {
    const oldHp = u.hp;
    u.hp = Math.min(stats.maxHp, u.hp + 8);
    const healed = u.hp - oldHp;
    addLog(`🧪 ${getDisplayName(u)} drinks a Healing Potion and recovers ${healed} HP! (${u.hp}/${stats.maxHp})`);
  } else if (item.id === 'speed_potion') {
    applyStatusEffect(u, 'speed_boost', 3);
    u.movementLeft = Math.min(u.movementLeft + 4, getUnitStats(u).movement);
    addLog(`💨 ${getDisplayName(u)} drinks a Speed Potion! (+4 movement for 3 turns)`);
  } else if (item.id === 'rage_potion') {
    applyStatusEffect(u, 'enraged', 1);
    addLog(`🔴 ${getDisplayName(u)} drinks a Rage Potion! (+4 ATK this turn)`);
  } else if (item.id === 'stoneskin_potion') {
    applyStatusEffect(u, 'stoneskin', 2);
    addLog(`🪨 ${getDisplayName(u)} drinks a Stoneskin Potion! (+4 DEF until end of next turn)`);
  } else if (item.id === 'treasure_chest') {
    const amt = 3 + Math.floor(Math.random() * 3);
    G.players[u.playerId].resources.gold += amt;
    addLog(`💰 ${getDisplayName(u)} opens a Treasure Chest and finds ${amt} gold!`);
  } else if (item.id === 'lumber_pile') {
    const amt = 3 + Math.floor(Math.random() * 3);
    G.players[u.playerId].resources.wood += amt;
    addLog(`🪵 ${getDisplayName(u)} collects a Lumber Pile for ${amt} wood!`);
  } else if (item.id === 'stone_pile') {
    const amt = 3 + Math.floor(Math.random() * 3);
    G.players[u.playerId].resources.stone += amt;
    addLog(`🧱 ${getDisplayName(u)} collects a Stone Pile for ${amt} stone!`);
  } else if (item.id === 'water_pouch') {
    const amt = 3 + Math.floor(Math.random() * 3);
    G.players[u.playerId].resources.water += amt;
    addLog(`💧 ${getDisplayName(u)} drinks a Water Pouch for ${amt} water!`);
  } else if (item.id === 'fresh_fish') {
    const oldHp = u.hp;
    u.hp = Math.min(stats.maxHp, u.hp + 4);
    const healed = u.hp - oldHp;
    addLog(`🐟 ${getDisplayName(u)} eats a Fresh Fish and recovers ${healed} HP! (${u.hp}/${stats.maxHp})`);
  } else if (item.id === 'petroleum_jelly') {
    applyStatusEffect(u, 'greased', 2);
    addLog(`🫧 ${getDisplayName(u)} applies Petroleum Jelly! 100% dodge chance for 2 turns!`);
  } else if (item.id === 'seed_of_god') {
    const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let grown = 0;
    for (const [dx, dy] of dirs) {
      const nx = u.x + dx, ny = u.y + dy;
      if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize && !G.board[ny][nx]) {
        const unitOnCell = G.units.some(unit => unit.hp > 0 && unit.x === nx && unit.y === ny);
        if (!unitOnCell) {
          G.board[ny][nx] = { type: 'wood', amount: 2 + Math.floor(Math.random() * 3) };
          grown++;
        }
      }
    }
    addLog(`🌱 ${getDisplayName(u)} plants a Seed of God! ${grown} trees spring up around them!`);
  } else if (item.id === 'muscle_growth_serum') {
    u.str = (u.str || 0) + 1;
    addLog(`💪 ${getDisplayName(u)} drinks Muscle Growth Serum! Permanently gained +1 STR!`);
  } else if (item.id === 'brain_growth_serum') {
    u.int = (u.int || 0) + 1;
    addLog(`🧠 ${getDisplayName(u)} drinks Brain Growth Serum! Permanently gained +1 INT!`);
  } else if (item.id === 'tendon_tautacity_serum') {
    u.agi = (u.agi || 0) + 1;
    addLog(`🦵 ${getDisplayName(u)} drinks Tendon Tautacity Serum! Permanently gained +1 AGI!`);
  } else if (item.id === 'skin_thickening_serum') {
    u.con = (u.con || 0) + 1;
    addLog(`🛡️ ${getDisplayName(u)} drinks Skin Thickening Serum! Permanently gained +1 CON!`);
  } else if (item.id === 'paste_of_reaping') {
    if (!u.passives) u.passives = [];
    if (!u.passives.includes('retaliate')) {
      u.passives.push('retaliate');
      addLog(`🩸 ${getDisplayName(u)} applies the Paste of Reaping! Permanently gained Retaliate!`);
    } else {
      addLog(`⚠ ${getDisplayName(u)} already has Retaliate — the paste has no effect!`);
      return; // Don't consume if already has it
    }
  } else if (item.id === 'hardening_clay') {
    if (!u.passives) u.passives = [];
    if (!u.passives.includes('stone_skin_passive')) {
      u.passives.push('stone_skin_passive');
      addLog(`🪨 ${getDisplayName(u)} applies Hardening Clay! Permanently gained Stone Skin!`);
    } else {
      addLog(`⚠ ${getDisplayName(u)} already has Stone Skin — the clay has no effect!`);
      return; // Don't consume if already has it
    }
  } else if (item.id === 'magic_mirror') {
    mirrorPending = { unitId: u.id, idx: inventoryIndex };
    renderAll();
    return; // Don't consume yet — wait for item selection
  } else if (item.id === 'manifesto') {
    const enemyWorkers = G.units.filter(w => w.hp > 0 && w.playerId !== u.playerId && w.playerId !== NPC_PLAYER_ID && w.type === 'worker');
    for (const w of enemyWorkers) {
      applyStatusEffect(w, 'on_strike', 2);
    }
    addLog(`📕 ${getDisplayName(u)} reads the Manifesto and convinces ${enemyWorkers.length} enemy worker${enemyWorkers.length !== 1 ? 's go' : ' goes'} on strike!`);
  } else if (item.id === 'strange_poultice') {
    u.tempHp = (u.tempHp || 0) + 10;
    u.tempHpTurns = 3;
    const newStats = getUnitStats(u);
    const healed = Math.min(10, newStats.maxHp - u.hp);
    u.hp += healed;
    addLog(`🩹 ${getDisplayName(u)} applies a Strange Poultice! +10 temporary HP and healed ${healed} HP for 3 turns. (${u.hp}/${newStats.maxHp})`);
  } else if (item.id === 'potion_pouch') {
    return; // Passive item, cannot be used manually
  } else if (item.id === 'scroll_of_archers') {
    const emptyAdj = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = u.x + dx, ny = u.y + dy;
        if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
            !G.board[ny][nx] &&
            !G.units.some(un => un.x === nx && un.y === ny && un.hp > 0) &&
            !(G.barrels && G.barrels.some(b => b.x === nx && b.y === ny))) {
          emptyAdj.push({ x: nx, y: ny });
        }
      }
    }
    if (emptyAdj.length === 0) {
      addLog(`📜 ${getDisplayName(u)} unrolls the Scroll of Archers, but there is no space!`);
      return;
    }
    const p = G.players[u.playerId];
    const prefix = p.faction && FACTIONS[p.faction] ? FACTIONS[p.faction].prefix : '';
    const count = Math.min(2, emptyAdj.length);
    for (let i = 0; i < count; i++) {
      const pos = emptyAdj.splice(Math.floor(Math.random() * emptyAdj.length), 1)[0];
      const archer = createUnit('summoned_archer', u.playerId, pos.x, pos.y, prefix, p.faction);
      archer.id = G.nextUnitId++;
      nextUnitId = G.nextUnitId;
      archer.movementLeft = 0;
      archer.hasAttacked = true;
      G.units.push(archer);
    }
    addLog(`📜 ${getDisplayName(u)} unrolls a Scroll of Archers! ${count} archer${count > 1 ? 's appear' : ' appears'}!`);
  } else if (item.id === 'regeneration_potion') {
    u.regenPotionTurns = 5;
    addLog(`💚 ${getDisplayName(u)} drinks a Regeneration Potion! Regeneration for 5 turns!`);
  } else if (item.id === 'combat_regen_potion') {
    u.combatRegenTurns = 5;
    addLog(`❤️‍🔥 ${getDisplayName(u)} drinks a Combat Regen Potion! Regeneration for 5 turns (works in combat)!`);
  } else if (item.id === 'treasure_map') {
    const playerUnits = G.units.filter(un => un.hp > 0 && un.playerId === u.playerId);
    const candidates = [];
    for (let y = 0; y < G.boardSize; y++) {
      for (let x = 0; x < G.boardSize; x++) {
        if (!G.board[y][x] && !G.units.some(un => un.x === x && un.y === y && un.hp > 0) &&
            !(G.groundItems || []).some(gi => gi.x === x && gi.y === y)) {
          const minDist = playerUnits.length > 0 ? Math.min(...playerUnits.map(pu => chebyshevDist(pu.x, pu.y, x, y))) : 0;
          candidates.push({ x, y, dist: minDist });
        }
      }
    }
    if (candidates.length > 0) {
      // Sort by distance descending, pick randomly from top 20% farthest tiles
      candidates.sort((a, b) => b.dist - a.dist);
      const topCount = Math.max(1, Math.floor(candidates.length * 0.2));
      const spot = candidates[Math.floor(Math.random() * topCount)];
      const lootId = LOOT_ITEMS[Math.floor(Math.random() * LOOT_ITEMS.length)];
      if (!G.groundItems) G.groundItems = [];
      G.groundItems.push({ x: spot.x, y: spot.y, item: JSON.parse(JSON.stringify(ITEMS[lootId])) });
      addLog(`🗺️ ${getDisplayName(u)} reads a Treasure Map! A ${ITEMS[lootId].name} has appeared somewhere on the map!`);
    } else {
      addLog(`🗺️ ${getDisplayName(u)} reads a Treasure Map, but there's no space on the map!`);
      return;
    }
  } else if (item.id === 'excalibur_stone') {
    const unitStats = getUnitStats(u);
    if (unitStats.str >= 7) {
      const sword = JSON.parse(JSON.stringify(ITEMS['excalibur']));
      u.inventory.push(sword);
      addLog(`⚔️ ${getDisplayName(u)} pulls Excalibur from the stone! The legendary blade is theirs!`);
    } else {
      addLog(`⚔️ ${getDisplayName(u)} strains to pull Excalibur from the stone... but is not strong enough! (Need 7 STR, have ${unitStats.str})`);
      return;
    }
  } else if (item.id === 'asbestos_applicator') {
    if (!u.passives) u.passives = [];
    if (!u.passives.includes('fire_resistance')) {
      u.passives.push('fire_resistance');
      addLog(`🧯 ${getDisplayName(u)} applies asbestos coating! Permanently gained Fire Resistance!`);
    } else {
      addLog(`⚠ ${getDisplayName(u)} already has Fire Resistance — the asbestos has no effect!`);
      return;
    }
  } else if (item.id === 'loaded_die') {
    if (hasStatusEffect(u, 'deadly_focus')) {
      addLog(`⚠ ${getDisplayName(u)} already has Deadly Focus!`);
      return;
    }
    applyStatusEffect(u, 'deadly_focus', 99);
    addLog(`🎲 ${getDisplayName(u)} rolls a loaded die — Deadly Focus! Next attack is a guaranteed crit!`);
  } else if (item.id === 'scroll_of_retrieve') {
    // Check if there are any other friendly units on the map
    const allies = G.units.filter(t => t.hp > 0 && t.id !== u.id && t.playerId === u.playerId);
    if (allies.length === 0) {
      addLog(`📜 ${getDisplayName(u)} unrolls a Scroll of Retrieve, but has no allies to summon!`);
      return;
    }
    scrollPending = { unitId: u.id, idx: inventoryIndex, type: 'retrieve' };
    interactionMode = 'scroll_retrieve';
    renderAll();
    return; // Don't consume yet — wait for target selection
  } else if (item.id === 'scroll_of_swap') {
    const targets = G.units.filter(t => t.hp > 0 && t.id !== u.id);
    if (targets.length === 0) {
      addLog(`📜 ${getDisplayName(u)} unrolls a Scroll of Swap, but there's nobody to swap with!`);
      return;
    }
    scrollPending = { unitId: u.id, idx: inventoryIndex, type: 'swap' };
    interactionMode = 'scroll_swap';
    renderAll();
    return; // Don't consume yet — wait for target selection
  } else if (item.id === 'explosive_barrel') {
    // Enter place_barrel interaction mode
    scrollPending = { unitId: u.id, idx: inventoryIndex, type: 'barrel' };
    interactionMode = 'place_barrel';
    renderAll();
    return; // Don't consume yet — wait for tile selection
  }

  // Lucky Rune: 50% chance to keep the consumable
  if (hasPassive(u, 'lucky_rune') && Math.random() < 0.5) {
    addLog(`🍀 ${getDisplayName(u)}'s Lucky Rune activates! The ${item.name} was not consumed!`);
  } else {
    // Remove the consumed item
    u.inventory.splice(inventoryIndex, 1);
  }
  renderAll();
}

function isInCombat(unit) {
  return unit.lastCombatTurn != null && (G.turn - unit.lastCombatTurn) <= 1;
}

function dropItem(unitId, inventoryIndex) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  if (isInCombat(u)) {
    addLog(`⚠️ ${getDisplayName(u)} is in combat and cannot drop items!`);
    renderAll();
    return;
  }
  const item = u.inventory[inventoryIndex];
  if (!item) return;

  u.inventory.splice(inventoryIndex, 1);
  if (!G.groundItems) G.groundItems = [];
  G.groundItems.push({ x: u.x, y: u.y, item: item });

  addLog(`${getDisplayName(u)} dropped ${item.name}`);
  renderAll();
}

function mirrorCopyItem(unitId, sourceIdx) {
  const u = getUnit(unitId);
  if (!u || !mirrorPending || mirrorPending.unitId !== unitId) return;
  const mirrorIdx = mirrorPending.idx;
  const sourceItem = u.inventory[sourceIdx];
  if (!sourceItem) return;
  const clone = JSON.parse(JSON.stringify(sourceItem));
  u.inventory.splice(mirrorIdx, 1);
  u.inventory.push(clone);
  mirrorPending = null;
  addLog(`🪞 ${getDisplayName(u)} used the Magic Mirror to duplicate ${clone.name}!`);
  renderAll();
}

function cancelMirror() {
  mirrorPending = null;
  renderAll();
}

function executeScrollRetrieve(caster, target) {
  // Find an empty adjacent tile next to the caster to place the target
  const emptyAdj = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = caster.x + dx, ny = caster.y + dy;
      if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
          !G.board[ny][nx] &&
          !G.units.some(un => un.x === nx && un.y === ny && un.hp > 0) &&
          !(G.structures && G.structures.some(s => s.x === nx && s.y === ny)) &&
          !(G.barrels && G.barrels.some(b => b.x === nx && b.y === ny))) {
        emptyAdj.push({ x: nx, y: ny });
      }
    }
  }
  if (emptyAdj.length === 0) {
    addLog(`📜 ${getDisplayName(caster)} tries to retrieve ${getDisplayName(target)}, but there's no space nearby!`);
    interactionMode = 'idle';
    scrollPending = null;
    renderAll();
    return;
  }
  // Pick the closest empty tile to the caster
  const spot = emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
  target.x = spot.x;
  target.y = spot.y;

  // Consume the scroll
  const u = getUnit(scrollPending.unitId);
  const idx = scrollPending.idx;
  if (hasPassive(u, 'lucky_rune') && Math.random() < 0.5) {
    addLog(`🍀 ${getDisplayName(u)}'s Lucky Rune activates! The Scroll of Retrieve was not consumed!`);
  } else {
    u.inventory.splice(idx, 1);
  }

  addLog(`📜 ${getDisplayName(caster)} uses a Scroll of Retrieve! ${getDisplayName(target)} is teleported to their side!`);
  interactionMode = 'idle';
  scrollPending = null;
  renderAll();
}

function executeScrollSwap(caster, target) {
  // Swap positions
  const oldX = caster.x, oldY = caster.y;
  caster.x = target.x;
  caster.y = target.y;
  target.x = oldX;
  target.y = oldY;

  // Consume the scroll
  const u = getUnit(scrollPending.unitId);
  const idx = scrollPending.idx;
  if (hasPassive(u, 'lucky_rune') && Math.random() < 0.5) {
    addLog(`🍀 ${getDisplayName(u)}'s Lucky Rune activates! The Scroll of Swap was not consumed!`);
  } else {
    u.inventory.splice(idx, 1);
  }

  addLog(`📜 ${getDisplayName(caster)} uses a Scroll of Swap! Swapped places with ${getDisplayName(target)}!`);
  interactionMode = 'idle';
  scrollPending = null;
  renderAll();
}

function getAdjacentGroundItems(unit) {
  return (G.groundItems || []).filter(gi => chebyshevDist(gi.x, gi.y, unit.x, unit.y) <= 1);
}

let _pickupOverlayUnit = null;

function openPickupOverlay(unit) {
  _pickupOverlayUnit = unit;
  refreshPickupOverlay();
  document.getElementById('pickup-overlay').classList.add('active');
}

function closePickupOverlay() {
  document.getElementById('pickup-overlay').classList.remove('active');
  _pickupOverlayUnit = null;
  interactionMode = 'idle';
  renderAll();
}

function refreshPickupOverlay() {
  const unit = _pickupOverlayUnit;
  if (!unit) return;
  const listEl = document.getElementById('pickup-item-list');
  const allWrap = document.getElementById('pickup-all-wrap');
  listEl.innerHTML = '';
  allWrap.innerHTML = '';
  const adjItems = getAdjacentGroundItems(unit);
  if (adjItems.length === 0) {
    closePickupOverlay();
    return;
  }
  adjItems.forEach(gi => {
    const idx = G.groundItems.indexOf(gi);
    const row = document.createElement('div');
    row.className = 'pickup-item-row';
    const nameSpan = document.createElement('span');
    const icon = gi.item.icon || (gi.item.consumable ? '🧪' : '⚔');
    const pType = gi.item.weaponType || gi.item.armorType;
    const fmtPickup = t => t.startsWith('1h_') ? '1H ' + t.slice(3).charAt(0).toUpperCase() + t.slice(4) : t.startsWith('2h_') ? '2H ' + t.slice(3).charAt(0).toUpperCase() + t.slice(4) : t.charAt(0).toUpperCase() + t.slice(1);
    const typeStr = pType ? ` [${fmtPickup(pType)}]` : '';
    nameSpan.textContent = `${icon} ${gi.item.name}${typeStr}`;
    const pickBtn = document.createElement('button');
    pickBtn.className = 'btn btn-small';
    pickBtn.textContent = 'Pick Up';
    pickBtn.onclick = () => {
      pickupGroundItem(unit, idx);
      refreshPickupOverlay();
    };
    row.appendChild(nameSpan);
    row.appendChild(pickBtn);
    listEl.appendChild(row);
  });
  if (adjItems.length > 1) {
    const pickAllBtn = document.createElement('button');
    pickAllBtn.className = 'btn';
    pickAllBtn.textContent = 'Pick Up All';
    pickAllBtn.onclick = () => {
      const items = getAdjacentGroundItems(unit).slice();
      items.forEach(gi => {
        const idx = G.groundItems.indexOf(gi);
        if (idx !== -1) pickupGroundItem(unit, idx);
      });
      refreshPickupOverlay();
    };
    allWrap.appendChild(pickAllBtn);
  }
}

function pickupGroundItem(unit, groundIndex) {
  const gi = (G.groundItems || [])[groundIndex];
  if (!gi) return;

  // Excalibur in the Stone requires 7+ STR to pick up
  if (gi.item.id === 'excalibur_stone') {
    const stats = getUnitStats(unit);
    if (stats.str < 7) {
      addLog(`⚔️ ${getDisplayName(unit)} tries to pick up ${gi.item.name} but isn't strong enough! (Need 7 STR, have ${stats.str})`);
      renderAll();
      return;
    }
  }

  unit.inventory.push(gi.item);
  G.groundItems.splice(groundIndex, 1);

  addLog(`${getDisplayName(unit)} picked up ${gi.item.name}`);
  renderAll();
}

function pickupAllGroundItems(unit, tx, ty) {
  const items = (G.groundItems || []).filter(gi => gi.x === tx && gi.y === ty);
  if (items.length === 0) return;

  const picked = [];
  const failed = [];
  for (const gi of items) {
    // Excalibur in the Stone requires 7+ STR to pick up
    if (gi.item.id === 'excalibur_stone') {
      const stats = getUnitStats(unit);
      if (stats.str < 7) {
        failed.push(gi.item.name);
        continue;
      }
    }
    unit.inventory.push(gi.item);
    picked.push(gi.item.name);
  }

  // Remove picked items from ground (filter instead of splice to handle multiple)
  G.groundItems = G.groundItems.filter(gi => !(gi.x === tx && gi.y === ty && picked.includes(gi.item.name)));

  if (picked.length > 0) {
    addLog(`${getDisplayName(unit)} picked up: ${picked.join(', ')}`);
  }
  for (const name of failed) {
    addLog(`⚔️ ${getDisplayName(unit)} tries to pick up ${name} but isn't strong enough! (Need 5 STR)`);
  }
  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// UNIT PRODUCTION
// ============================================================
const WORKER_CAP = 15;

function canAffordUnit(player, type) {
  // Worker cap check
  if (type === 'worker') {
    const workerCount = G.units.filter(u => u.playerId === G.players.indexOf(player) && u.type === 'worker' && u.hp > 0).length;
    if (workerCount >= WORKER_CAP) return false;
  }
  // Check faction cost overrides first
  const faction = FACTIONS[player.faction];
  const overrideCost = faction && faction.unitOverrides && faction.unitOverrides[type] && faction.unitOverrides[type].cost;
  const cost = overrideCost || UNIT_DEFS[type].cost;
  for (const r of RESOURCE_TYPES) {
    if ((cost[r] || 0) > (player.resources[r] || 0)) return false;
  }
  return true;
}

function addSpawnTilesAround(cx, cy, radius, tiles, checked) {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = cx + dx, ny = cy + dy;
      const key = `${nx},${ny}`;
      if (checked.has(key)) continue;
      checked.add(key);
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (getUnitAt(nx, ny)) continue;
      if (G.board[ny][nx]) continue;
      if (G.structures && G.structures.some(s => s.x === nx && s.y === ny)) continue;
      if (G.shops && G.shops.some(s => s.x === nx && s.y === ny)) continue;
      if (G.vendors && G.vendors.some(v => v.x === nx && v.y === ny)) continue;
      if (G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) continue;
      tiles.push({ x: nx, y: ny });
    }
  }
}

function startPlacement(type) {
  // Hero revive now requires choosing the hero variant each time.
  if (type === 'hero' && !pendingHeroChoiceForPlacement) {
    showHeroRevivePick();
    return;
  }

  placingUnitType = type;
  interactionMode = 'place';

  const tiles = [];
  const checked = new Set();
  const radius = 3;

  // Find which structure types unlock this unit type
  const unlockingStructTypes = Object.keys(STRUCTURE_DEFS).filter(sType => {
    const sDef = STRUCTURE_DEFS[sType];
    return sDef.unlocksUnits && sDef.unlocksUnits.includes(type);
  });

  // Only allow spawning near structures that unlock this unit type
  if (G.structures) {
    const validStructures = G.structures.filter(s =>
      s.playerId === G.currentPlayer && unlockingStructTypes.includes(s.type)
    );
    for (const s of validStructures) {
      addSpawnTilesAround(s.x, s.y, radius, tiles, checked);
    }
  }

  // Dwarf Muster: Forgemaster hero can spawn ANY unit near himself
  const p = G.players[G.currentPlayer];
  if (p.faction === 'dwarves') {
    const hero = G.units.find(u => u.playerId === G.currentPlayer && u.type === 'hero' && u.hp > 0 && u.musterActive);
    if (hero) {
      const musterRadius = 2;
      for (let dy = -musterRadius; dy <= musterRadius; dy++) {
        for (let dx = -musterRadius; dx <= musterRadius; dx++) {
          const nx = hero.x + dx, ny = hero.y + dy;
          const key = `${nx},${ny}`;
          if (checked.has(key)) continue;
          checked.add(key);
          if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
          if (getUnitAt(nx, ny)) continue;
          if (G.board[ny][nx]) continue;
          if (G.barrels && G.barrels.some(b => b.x === nx && b.y === ny)) continue;
          tiles.push({ x: nx, y: ny });
        }
      }
    }
  }

  reachableTiles = tiles;
  if (tiles.length === 0) {
    addLog('No space to place a new unit!');
    interactionMode = 'idle';
    if (type === 'hero') {
      pendingHeroChoiceForPlacement = null;
      pendingHeroNameForPlacement = null;
    }
  }
  renderAll();
}

function finishPlacement(x, y) {
  const p = G.players[G.currentPlayer];
  const type = placingUnitType;
  const faction = FACTIONS[p.faction];
  const overrideCost = faction && faction.unitOverrides && faction.unitOverrides[type] && faction.unitOverrides[type].cost;
  const cost = overrideCost || UNIT_DEFS[type].cost;

  for (const r of RESOURCE_TYPES) {
    p.resources[r] -= (cost[r] || 0);
  }

  const prefix = FACTIONS[p.faction].prefix;
  const heroChoiceForSpawn = type === 'hero'
    ? (pendingHeroChoiceForPlacement || p.heroChoice || Object.keys(FACTIONS[p.faction].heroes || {})[0])
    : null;
  const unit = createUnit(type, G.currentPlayer, x, y, prefix, p.faction, heroChoiceForSpawn);
  if (type === 'hero') {
    p.heroChoice = heroChoiceForSpawn || p.heroChoice || null;
    if (pendingHeroNameForPlacement && pendingHeroNameForPlacement.trim()) {
      unit.customName = pendingHeroNameForPlacement.trim();
    }
  }
  unit.id = G.nextUnitId++;
  nextUnitId = G.nextUnitId;
  // Newly produced units are immediately active on the current turn.
  unit.movementLeft = getUnitStats(unit).movement;
  unit.hasAttacked = false;
  unit.hasGathered = false;
  unit.hasPlacedWallThisTurn = false;
  unit.hasUsedItemAction = false;
  if (unit.canGather) {
    unit.wallPlacementsLeft = WALL_PLACEMENTS_PER_TURN;
  }
  G.units.push(unit);

  const overrideUnitName = faction && faction.unitOverrides && faction.unitOverrides[type] && faction.unitOverrides[type].name;
  addLog(`${p.name} built a ${prefix} ${overrideUnitName || UNIT_DEFS[type].name} at (${x}, ${y})`);
  placingUnitType = null;
  pendingHeroChoiceForPlacement = null;
  pendingHeroNameForPlacement = null;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

function cancelPlacement() {
  placingUnitType = null;
  placingStructureType = null;
  pendingHeroChoiceForPlacement = null;
  pendingHeroNameForPlacement = null;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

// ============================================================
// STRUCTURE PLACEMENT
// ============================================================
function canAffordStructure(player, type) {
  const cost = getStructureBuildCost(type);
  for (const r of RESOURCE_TYPES) {
    if ((cost[r] || 0) > (player.resources[r] || 0)) return false;
  }
  return true;
}

function startStructurePlacement(type) {
  placingStructureType = type;
  interactionMode = 'place_structure';

  const tiles = [];
  const checked = new Set();
  const sp = G.startPositions ? G.startPositions[G.currentPlayer] : null;
  const cx = sp ? sp.hx : 1;
  const cy = sp ? sp.hy : 1;
  const radius = 3;

  addSpawnTilesAround(cx, cy, radius, tiles, checked);

  // Also allow building structures near any owned Town Hall
  if (G.structures) {
    const townHalls = G.structures.filter(s => s.type === 'town_hall' && s.playerId === G.currentPlayer);
    for (const th of townHalls) {
      addSpawnTilesAround(th.x, th.y, radius, tiles, checked);
    }
  }

  reachableTiles = tiles;
  if (tiles.length === 0) {
    addLog('No space to place a structure!');
    interactionMode = 'idle';
  }
  renderAll();
}

function finishStructurePlacement(x, y) {
  const p = G.players[G.currentPlayer];
  const type = placingStructureType;
  const cost = getStructureBuildCost(type);
  const faction = FACTIONS[p.faction];

  for (const r of RESOURCE_TYPES) {
    p.resources[r] -= (cost[r] || 0);
  }

  if (!G.structures) G.structures = [];
  G.structures.push({
    type: type,
    playerId: G.currentPlayer,
    faction: p.faction,
    x: x,
    y: y,
    hp: STRUCTURE_DEFS[type].hp
  });

  const sDefPlaced = STRUCTURE_DEFS[type];
  const placedStructName = (sDefPlaced.factionNames && sDefPlaced.factionNames[p.faction]) || sDefPlaced.name;
  addLog(`${p.name} built a ${faction.prefix} ${placedStructName} at (${x}, ${y})`);
  placingStructureType = null;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

function applyWellIncomeForPlayer(playerId, { log = true } = {}) {
  if (!G || !G.structures || playerId == null || playerId === NPC_PLAYER_ID) return 0;
  const player = G.players[playerId];
  if (!player || !player.alive) return 0;
  const wellCount = G.structures.filter(s => s.playerId === playerId && s.type === 'well').length;
  if (wellCount <= 0) return 0;
  const waterGain = wellCount;
  player.resources.water = (player.resources.water || 0) + waterGain;
  if (log) {
    addLog(`💧 ${player.name} gains ${waterGain} water from ${wellCount} Well${wellCount > 1 ? 's' : ''}.`);
  }
  return waterGain;
}

// ============================================================
// TURN MANAGEMENT
// ============================================================
function endTurn() {
  // Check for workers who haven't gathered yet (skip if no movement left AND not adjacent to a resource)
  const ungathered = G.units.filter(u => u.playerId === G.currentPlayer && u.hp > 0 &&
    !u.hasGathered && !u.hasPlacedWallThisTurn && !hasStatusEffect(u, 'on_strike') &&
    (u.canGather || hasPassive(u, 'resource_gathering') || u.mimicGather) &&
    (u.movementLeft > 0 || getAdjacentResources(u).length > 0));
  const msgEl = document.getElementById('end-turn-confirm-msg');
  if (ungathered.length > 0) {
    msgEl.innerHTML = `<span style="color:#FF4444;">⚠ You have <strong>${ungathered.length}</strong> worker${ungathered.length > 1 ? 's' : ''} who can still gather resources!</span><br>Are you sure you want to end your turn?`;
  } else {
    msgEl.textContent = 'Are you sure you want to end your turn?';
  }
  document.getElementById('end-turn-confirm-overlay').classList.add('active');
}

function cancelEndTurn() {
  document.getElementById('end-turn-confirm-overlay').classList.remove('active');
}

function confirmEndTurn() {
  document.getElementById('end-turn-confirm-overlay').classList.remove('active');
  selectedUnitId = null;
  interactionMode = 'idle';
  reachableTiles = [];

  let next = G.currentPlayer;
  let turnIncremented = false;
  do {
    next = (next + 1) % G.players.length;
    if (next === 0 && !turnIncremented) {
      G.turn++;
      turnIncremented = true;
    }
  } while (!G.players[next].alive && next !== G.currentPlayer);

  G.currentPlayer = next;

  // Wells generate passive water at the start of owner's turn.
  applyWellIncomeForPlayer(G.currentPlayer);

  // Process status effects (DoTs, tick down, expire) before turn starts
  for (const u of G.units) {
    if (u.playerId === G.currentPlayer && u.hp > 0) {
      processStatusEffects(u);
    }
  }
  // Beast (NPC) status effects tick once per round, on the first player's turn
  if (G.currentPlayer === 0) {
    for (const u of G.units) {
      if (u.playerId === NPC_PLAYER_ID && u.hp > 0) {
        processStatusEffects(u);
      }
    }
    // Restock shops every 7 turns
    if (G.shops && G.turn > 1 && (G.turn - 1) % 7 === 0) {
      for (const shop of G.shops) restockShop(shop);
      addLog(`$ The shops have been restocked with new wares!`);
    }
    // Restock vendors every 4 turns
    if (G.vendors && G.turn > 1 && (G.turn - 1) % 4 === 0) {
      for (const vendor of G.vendors) restockVendor(vendor);
      addLog(`☂ The Refreshments Vendors have new consumables!`);
    }
    // Spawn bazaar on turn 15
    if (G.turn === 15 && (!G.bazaars || G.bazaars.length === 0)) {
      spawnBazaar();
    }
  }
  // Remove units killed by DoT effects (players and beasts)
  const dotDeaths = G.units.filter(u => (u.playerId === G.currentPlayer || u.playerId === NPC_PLAYER_ID) && u.hp <= 0);
  if (dotDeaths.length > 0) {
    G.units = G.units.filter(u => u.hp > 0);
    for (const d of dotDeaths) checkPlayerElimination(d.playerId);
  }

  // Reset forge usage for the current player's forges
  if (G.structures) {
    for (const s of G.structures) {
      if ((s.type === 'forge' || s.type === 'advanced_forge') && s.playerId === G.currentPlayer) {
        s.forgeUsedThisTurn = false;
      }
    }
  }

  // Advance Elemental Glaive phase for the current player's units
  for (const u of G.units) {
    if (u.playerId === G.currentPlayer && u.hp > 0 && u.equipment) {
      for (const slot of ['mainhand', 'offhand']) {
        const weapon = u.equipment[slot];
        if (weapon && weapon !== '_two_handed_' && weapon.elementalCycle) {
          weapon.elementalPhase = ((weapon.elementalPhase || 0) + 1) % 3;
          const phaseNames = ['❄️ Freeze', '🔥 Burning', '⚡ Chain Lightning'];
          addLog(`${phaseNames[weapon.elementalPhase]} — ${getDisplayName(u)}'s Elemental Glaive shifts element!`);
        }
      }
    }
  }

  for (const u of G.units) {
    if (u.playerId === G.currentPlayer && u.hp > 0) {
      const stats = getUnitStats(u);
      // Passive regen: heal 1 HP if not adjacent to an enemy and not taking DoT
      // Regeneration passive: heal 2 HP instead of 1
      // Combat Regen Potion: also heals while adjacent to enemies
      const hasDot = u.statusEffects && u.statusEffects.some(se => STATUS_EFFECTS[se.id] && STATUS_EFFECTS[se.id].dot);
      const hasTrollbloodAura = hasPassive(u, 'trollblood_aura') || G.units.some(a => a.hp > 0 && a.id !== u.id && a.playerId === u.playerId && hasPassive(a, 'trollblood_aura') && chebyshevDist(u.x, u.y, a.x, a.y) <= 3);
      const hasCombatRegen = (u.combatRegenTurns && u.combatRegenTurns > 0) || hasPassive(u, 'combat_regeneration') || hasTrollbloodAura;
      if ((!hasAdjacentEnemy(u) || hasCombatRegen) && !hasDot && u.hp < stats.maxHp) {
        const regenStacks = Math.min(3, countPassive(u, 'regeneration'));
        const combatRegenStacks = Math.min(3, countPassive(u, 'combat_regeneration'));
        const bestStacks = Math.max(regenStacks, combatRegenStacks);
        const regenAmt = (hasPassive(u, 'regeneration') || hasCombatRegen) ? 2 + Math.max(0, bestStacks - 1) : 1;
        u.hp = Math.min(stats.maxHp, u.hp + regenAmt);
        addLog(`💚 ${getDisplayName(u)} regenerates ${regenAmt} HP. (${u.hp}/${stats.maxHp})`);
      }
      u.movementLeft = stats.movement;
      u.hasAttacked = false;
      u.hasGathered = false;
      u.wallPlacementsLeft = u.canGather ? WALL_PLACEMENTS_PER_TURN : 0;
      u.hasPlacedWallThisTurn = false;
      u.mimicGather = false;
      u.hasUsedItemAction = false;
      u.specialActionsUsed = [];
      u.rallyBonus = 0;
      u.stoneSkinBonus = 0;
      u.divineShieldBonus = 0;
      // Decay berserk bonus over turns
      if (u.berserkTurns && u.berserkTurns > 0) {
        u.berserkTurns--;
        if (u.berserkTurns <= 0) {
          u.berserkBonus = 0;
          u.berserkPenalty = 0;
          u.berserkTurns = 0;
        }
      }
      u.bloodFrenzyActive = false;
      u.disengaged = false;
      u.musterActive = false;
      // Steady Bombardment: if unit didn't move last turn, activate
      if (hasPassive(u, 'steady_bombardment') && !u.steadyBombardment && (u.tilesMoved || 0) === 0) {
        u.steadyBombardment = true;
        addLog(`🧨 ${getDisplayName(u)} holds position — Steady Bombardment active! Crit chance maxed.`);
      }
      u.tilesMoved = 0;
      u.overwatchFired = false;
      u.stunned = false;
      // Clear harpoon drag (only lasts one turn)
      delete u.harpoonDragTargetId;
      delete u.harpoonDragTurn;
      // Camouflage: track stationary turns and grant Deadly Focus at 2
      if (u.camouflaged) {
        if (u.x === u.camoX && u.y === u.camoY) {
          u.camouflageStationaryTurns = (u.camouflageStationaryTurns || 0) + 1;
          if (u.camouflageStationaryTurns >= 2 && !hasStatusEffect(u, 'deadly_focus')) {
            applyStatusEffect(u, 'deadly_focus', 99);
            addLog(`🌳🎯 ${getDisplayName(u)} has been still long enough — Deadly Focus gained!`);
          }
        } else {
          // Shouldn't normally reach here (moveUnit breaks camo), but safety net
          breakCamouflage(u, 'moved');
        }
      }
      // Lullaby: legacy cleanup (lullabied flag no longer used)
      if (u.lullabied) {
        delete u.lullabied;
      }
      // Decay battle cry bonus
      if (u.battleCryTurns && u.battleCryTurns > 0) {
        u.battleCryTurns--;
        if (u.battleCryTurns <= 0) {
          u.battleCryBonus = 0;
          u.battleCryTurns = 0;
        }
      }
      // Decay troll's blessing
      if (u.trollBlessingTurns && u.trollBlessingTurns > 0) {
        u.trollBlessingTurns--;
        if (u.trollBlessingTurns <= 0) {
          u.trollBlessingTurns = 0;
          addLog(`🌿 ${getDisplayName(u)}'s troll blessing fades.`);
        }
      }
      // Decay smoke bomb
      if (u.smokeBombTurns && u.smokeBombTurns > 0) {
        u.smokeBombTurns--;
        if (u.smokeBombTurns <= 0) {
          u.smokeBombTurns = 0;
          addLog(`💨 ${getDisplayName(u)}'s smoke dissipates.`);
        }
      }
      // Decay regeneration potion
      if (u.regenPotionTurns && u.regenPotionTurns > 0) {
        u.regenPotionTurns--;
        if (u.regenPotionTurns <= 0) {
          u.regenPotionTurns = 0;
          addLog(`💚 ${getDisplayName(u)}'s regeneration potion effect fades.`);
        }
      }
      // Decay combat regen potion
      if (u.combatRegenTurns && u.combatRegenTurns > 0) {
        u.combatRegenTurns--;
        if (u.combatRegenTurns <= 0) {
          u.combatRegenTurns = 0;
          addLog(`❤️‍🔥 ${getDisplayName(u)}'s combat regeneration fades.`);
        }
      }
      // Consecrate aura tick: 1 damage + weaken enemies within 1 tile each turn
      if (u.consecrateTurns && u.consecrateTurns > 0) {
        const consecEnemies = G.units.filter(e =>
          e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 1
        );
        for (const enemy of consecEnemies) {
          enemy.hp -= 1;
          applyStatusEffect(enemy, 'weakened', 2);
          addLog(`✝ Consecrated ground hits ${getDisplayName(enemy)} for 1 damage! Weakened! (${enemy.hp > 0 ? enemy.hp + ' HP left' : 'DEFEATED!'})`);
          if (enemy.hp <= 0) {
            enemy.hp = 0;
            dropAllItems(enemy);
            addLog(`☠ ${getDisplayName(enemy)} has been slain!`);
          }
        }
        // Clean up dead units from consecration
        G.units = G.units.filter(uu => uu.hp > 0);
        for (const enemy of consecEnemies) {
          if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId);
        }
        u.consecrateTurns--;
        if (u.consecrateTurns <= 0) {
          addLog(`✝ ${getDisplayName(u)}'s consecration fades.`);
        }
      }
      // Mirror Image: reset movement for mirror images
      if (u.isMirrorImage) {
        const owner = G.units.find(o => o.hp > 0 && o.id === u.mirrorOwnerId);
        if (!owner) {
          // Owner is dead, mirror fades
          u.hp = 0;
          addLog(`🪞 A mirror image fades as its caster is gone.`);
        }
      }
      // Decay temporary HP
      if (u.tempHpTurns && u.tempHpTurns > 0) {
        u.tempHpTurns--;
        if (u.tempHpTurns <= 0) {
          const oldTempHp = u.tempHp || 0;
          u.tempHp = 0;
          u.tempHpTurns = 0;
          const newStats = getUnitStats(u);
          if (u.hp > newStats.maxHp) u.hp = newStats.maxHp;
          addLog(`😇 ${getDisplayName(u)}'s divine barrier fades. (-${oldTempHp} temp HP)`);
        }
      }
      // Tick ability cooldowns
      if (u.cooldowns) {
        for (const key of Object.keys(u.cooldowns)) {
          if (u.cooldowns[key] > 0) u.cooldowns[key]--;
        }
      }
      // Potion Pouch: generate a Healing Potion every 4 of this player's turns
      if (u.inventory.some(it => it.id === 'potion_pouch')) {
        u.potionPouchCD = (u.potionPouchCD || 0) + 1;
        if (u.potionPouchCD >= 4) {
          u.potionPouchCD = 0;
          u.inventory.push(JSON.parse(JSON.stringify(CONSUMABLES.healing_potion)));
          addLog(`🎒 ${getDisplayName(u)}'s Potion Pouch produces a Healing Potion!`);
        }
      }
    }
  }

  addLog(`--- ${G.players[G.currentPlayer].name}'s turn (Turn ${G.turn}) ---`);

  showTurnOverlay();
  if (!ALLOW_LOCAL_PLAY) {
    saveGame();
  }
  renderAll();
}

function showTurnOverlay() {
  const overlay = document.getElementById('turn-overlay');
  const title = document.getElementById('overlay-title');
  const msg = document.getElementById('overlay-message');
  title.textContent = `${G.players[G.currentPlayer].name}'s Turn`;
  title.style.color = PLAYER_COLORS[G.currentPlayer];
  const continueBtn = document.getElementById('continue-local-btn');
  if (ALLOW_LOCAL_PLAY) {
    msg.textContent = 'Save the game and email it to the next player, or click Continue for local (hotseat) play.';
    if (continueBtn) continueBtn.style.display = '';
  } else {
    msg.textContent = 'Save the game and email it to the next player.';
    if (continueBtn) continueBtn.style.display = 'none';
  }
  overlay.classList.add('active');
}

function continueTurn() {
  document.getElementById('turn-overlay').classList.remove('active');
  // If this player hasn't picked a faction yet, show faction picker
  if (!G.players[G.currentPlayer].faction) {
    showFactionPick();
    return;
  }
  renderAll();
}

// ============================================================
// FACTION PICK (per-player, on first turn)
// ============================================================
function showFactionPick() {
  factionPickMode = 'new_game';
  const pid = G.currentPlayer;
  const overlay = document.getElementById('faction-pick-overlay');
  const playerBanner = document.getElementById('faction-pick-player');
  playerBanner.textContent = `${G.players[pid].name}'s Turn`;
  playerBanner.style.color = PLAYER_COLORS[pid];

  // Populate faction dropdown
  const select = document.getElementById('faction-pick-select');
  const factionRow = Array.from(document.querySelectorAll('#faction-pick-overlay .setup-row')).find(r => ((r.querySelector('label') || {}).textContent || '').trim() === 'Faction:');
  if (factionRow) factionRow.style.display = '';
  select.disabled = false;
  const takenFactions = G.players.filter(p => p.faction).map(p => p.faction);
  const factionOrder = ['humans', 'orcs', 'elves', 'dwarves', 'goblins', 'bards', 'trolls', 'skeletons', 'kobolds', 'nomads', 'trade_guild', 'ogres', 'merfolk', 'gnomes'];
  select.innerHTML = factionOrder
    .filter(key => FACTIONS[key] && !takenFactions.includes(key))
    .map(key => `<option value="${key}">${FACTIONS[key].name}</option>`)
    .join('');

  // Show other players' faction choices
  const othersDiv = document.getElementById('faction-pick-others');
  othersDiv.style.display = '';
  const others = G.players.filter(p => p.id !== pid && p.faction);
  if (others.length > 0) {
    othersDiv.innerHTML = others.map(p =>
      `<div style="font-size:12px;margin:2px 0;color:${PLAYER_COLORS[p.id]}">${p.name}: ${FACTIONS[p.faction].name}</div>`
    ).join('');
  } else {
    othersDiv.innerHTML = '';
  }

  updateFactionPickHeroes();
  document.getElementById('faction-pick-heroname').value = '';
  document.getElementById('faction-pick-confirm').disabled = true;
  overlay.classList.add('active');
}

function showHeroRevivePick() {
  factionPickMode = 'revive';
  const pid = G.currentPlayer;
  const p = G.players[pid];
  const factionId = p.faction;
  if (!factionId || !FACTIONS[factionId] || !FACTIONS[factionId].heroes) {
    addLog('No valid faction heroes available for revival.');
    return;
  }

  const overlay = document.getElementById('faction-pick-overlay');
  const playerBanner = document.getElementById('faction-pick-player');
  playerBanner.textContent = `${p.name}'s Turn`;
  playerBanner.style.color = PLAYER_COLORS[pid];

  const title = document.getElementById('faction-pick-title');
  if (title) title.textContent = 'Choose Hero to Resurrect';

  const select = document.getElementById('faction-pick-select');
  select.innerHTML = `<option value="${factionId}">${FACTIONS[factionId].name}</option>`;
  select.value = factionId;
  select.disabled = true;

  const factionRow = Array.from(document.querySelectorAll('#faction-pick-overlay .setup-row')).find(r => ((r.querySelector('label') || {}).textContent || '').trim() === 'Faction:');
  if (factionRow) factionRow.style.display = 'none';

  const othersDiv = document.getElementById('faction-pick-others');
  othersDiv.innerHTML = '';
  othersDiv.style.display = 'none';

  updateFactionPickHeroes();
  const preferredHero = p.heroChoice && FACTIONS[factionId].heroes[p.heroChoice]
    ? p.heroChoice
    : Object.keys(FACTIONS[factionId].heroes)[0];
  const preferredRadio = document.querySelector(`input[name="faction-pick-hero"][value="${preferredHero}"]`);
  if (preferredRadio) preferredRadio.checked = true;

  const heroNameInput = document.getElementById('faction-pick-heroname');
  heroNameInput.value = heroNameInput.value || FACTIONS[factionId].heroes[preferredHero].name;
  document.getElementById('faction-pick-confirm').disabled = false;
  overlay.classList.add('active');
}

function updateFactionPickHeroes() {
  const factionId = document.getElementById('faction-pick-select').value;
  const faction = FACTIONS[factionId];
  const container = document.getElementById('faction-pick-heroes');
  const heroes = faction.heroes;
  const heroKeys = Object.keys(heroes);

  container.innerHTML = '';
  for (let h = 0; h < heroKeys.length; h++) {
    const hKey = heroKeys[h];
    const hero = heroes[hKey];
    const hasAbility = hero.ability && hero.ability.id;
    const cd = hasAbility ? (ABILITY_COOLDOWNS[hero.ability.id] || 1) : 0;
    const cdText = cd === 0 ? 'No cooldown' : `Cooldown: ${cd} turn${cd > 1 ? 's' : ''}`;

    // Build passives HTML
    let passivesHtml = '';
    if (hero.passives && hero.passives.length > 0) {
      passivesHtml = hero.passives.map(pId => {
        const p = PASSIVES[pId];
        if (!p) return '';
        return `<div class="hero-card-passive">${p.icon} ${p.name}<span class="hero-tooltip"><span class="tt-label">${p.icon} ${p.name}</span><br>${p.desc}</span></div>`;
      }).join('');
    }

    // Build starting equipment HTML
    let equipHtml = '';
    if (hero.startingEquipment) {
      const eqNames = Object.entries(hero.startingEquipment)
        .filter(([, v]) => v !== '_two_handed_')
        .map(([, v]) => ITEMS[v] ? ITEMS[v].name : v);
      if (eqNames.length > 0) equipHtml = `<div class="hero-card-equipment">🗡 ${eqNames.join(', ')}</div>`;
    }

    // Build ability2 HTML (if hero has a second ability)
    let ability2Html = '';
    if (hero.ability2) {
      const cd2 = ABILITY_COOLDOWNS[hero.ability2.id] || 1;
      const cd2Text = cd2 === 0 ? 'No cooldown' : `Cooldown: ${cd2} turn${cd2 > 1 ? 's' : ''}`;
      ability2Html = `<div class="hero-card-ability">★ ${hero.ability2.name}
          <span class="hero-tooltip"><span class="tt-label">★ ${hero.ability2.name}</span><br>${hero.ability2.desc}<br><span class="tt-cd">${cd2Text}</span></span>
        </div>`;
    }

    const card = document.createElement('label');
    card.className = 'hero-card';
    card.innerHTML = `
      <input type="radio" name="faction-pick-hero" value="${hKey}" ${h === 0 ? 'checked' : ''}>
      <div class="hero-card-inner">
        <div class="hero-card-char">${hero.char}</div>
        <div class="hero-card-name">${hero.name}</div>
        ${hasAbility ? `<div class="hero-card-ability">★ ${hero.ability.name}
          <span class="hero-tooltip"><span class="tt-label">★ ${hero.ability.name}</span><br>${hero.ability.desc}<br><span class="tt-cd">${cdText}</span></span>
        </div>` : '<div class="hero-card-ability" style="color:#888;">No active ability</div>'}
        ${ability2Html}
        ${passivesHtml}
        <div class="hero-card-desc">${hero.description}</div>
        ${equipHtml}
        <div class="hero-card-stats">HP:${hero.hp} ATK:${hero.attack} DEF:${hero.defense} | S:${hero.str} A:${hero.agi} C:${hero.con} I:${hero.int}</div>
      </div>`;
    container.appendChild(card);
  }
}

function confirmFactionChoice() {
  if (factionPickMode === 'revive') {
    const pid = G.currentPlayer;
    const p = G.players[pid];
    const factionId = p.faction;
    const heroRadio = document.querySelector('input[name="faction-pick-hero"]:checked');
    const heroChoice = heroRadio ? heroRadio.value : (p.heroChoice || Object.keys(FACTIONS[factionId].heroes)[0]);
    const heroName = (document.getElementById('faction-pick-heroname').value || '').trim();

    pendingHeroChoiceForPlacement = heroChoice;
    pendingHeroNameForPlacement = heroName || null;
    p.heroChoice = heroChoice;

    const title = document.getElementById('faction-pick-title');
    if (title) title.textContent = 'Choose Your Faction & Hero';
    document.getElementById('faction-pick-overlay').classList.remove('active');

    startPlacement('hero');
    return;
  }

  const pid = G.currentPlayer;
  const factionId = document.getElementById('faction-pick-select').value;
  const heroRadio = document.querySelector('input[name="faction-pick-hero"]:checked');
  const heroChoice = heroRadio ? heroRadio.value : Object.keys(FACTIONS[factionId].heroes)[0];

  // Assign faction to player
  G.players[pid].faction = factionId;
  G.players[pid].heroChoice = heroChoice;

  // Spawn units at the player's start position
  const pos = G.startPositions[pid];
  const prefix = FACTIONS[factionId].prefix;
  nextUnitId = G.nextUnitId;

  const heroUnit = createUnit('hero', pid, pos.hx, pos.hy, prefix, factionId, heroChoice);
  const heroName = (document.getElementById('faction-pick-heroname').value || '').trim();
  heroUnit.customName = heroName;
  G.units.push(heroUnit);
  G.units.push(createUnit('worker', pid, pos.w1x, pos.w1y, prefix, factionId));
  G.units.push(createUnit('worker', pid, pos.w2x, pos.w2y, prefix, factionId));
  G.units.push(createUnit('worker', pid, pos.w3x, pos.w3y, prefix, factionId));
  G.units.push(createUnit('warrior', pid, pos.wx, pos.wy, prefix, factionId));

  G.nextUnitId = nextUnitId;

  // Place starting town hall and barracks near the hero
  if (!G.structures) G.structures = [];
  const structuresToPlace = ['town_hall', 'barracks'];
  for (const structType of structuresToPlace) {
    let placed = false;
    for (let r = 1; r <= 4 && !placed; r++) {
      for (let dy = -r; dy <= r && !placed; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue; // only ring cells
          const bx = pos.hx + dx, by = pos.hy + dy;
          if (bx < 0 || bx >= G.boardSize || by < 0 || by >= G.boardSize) continue;
          if (G.board[by][bx]) continue; // resource tile
          if (G.units.some(u => u.x === bx && u.y === by && u.hp > 0)) continue;
          if (G.structures.some(s => s.x === bx && s.y === by)) continue;
          if (G.shops && G.shops.some(s => s.x === bx && s.y === by)) continue;
          if (G.vendors && G.vendors.some(v => v.x === bx && v.y === by)) continue;
          G.structures.push({
            type: structType,
            playerId: pid,
            faction: factionId,
            x: bx,
            y: by,
            hp: STRUCTURE_DEFS[structType].hp
          });
          placed = true;
          break;
        }
      }
    }
  }

  // Reset new units for this turn
  for (const u of G.units) {
    if (u.playerId === pid && u.hp > 0) {
      const stats = getUnitStats(u);
      u.movementLeft = stats.movement;
      u.hasAttacked = false;
      u.hasGathered = false;
      u.hasUsedItemAction = false;
    }
  }

  addLog(`⚔ ${G.players[pid].name} joins the battle as ${FACTIONS[factionId].name} with hero ${getDisplayName(heroUnit)}!`);

  // Close overlay and render
  document.getElementById('faction-pick-overlay').classList.remove('active');
  renderAll();
}
// ============================================================
// CHAT SYSTEM
// ============================================================
const PLAYER_CHAT_COLORS = ['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#fd79a8','#00cec9'];

function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = (input.value || '').trim().slice(0, 250);
  if (!msg) return;

  // /ff command: /ff X — fast forward X turns
  if (msg.startsWith('/ff ') && ALLOW_CONSOLE_COMMANDS) {
    const numTurns = parseInt(msg.slice(4).trim(), 10);
    if (isNaN(numTurns) || numTurns < 1) {
      addLog(`⚠️ Usage: /ff <number>. Example: /ff 10`);
    } else {
      const targetTurn = G.turn + numTurns;
      addLog(`⏩ Fast-forwarding ${numTurns} turns...`);
      let safety = numTurns * G.players.length * 2;
      while (G.turn < targetTurn && safety > 0) {
        safety--;
        // Advance to next alive player
        let next = G.currentPlayer;
        let turnIncremented = false;
        do {
          next = (next + 1) % G.players.length;
          if (next === 0 && !turnIncremented) {
            G.turn++;
            turnIncremented = true;
          }
        } while (!G.players[next].alive && next !== G.currentPlayer);
        G.currentPlayer = next;
        applyWellIncomeForPlayer(G.currentPlayer, { log: false });
        // Process status effects
        for (const u of G.units) {
          if (u.playerId === G.currentPlayer && u.hp > 0) processStatusEffects(u);
        }
        if (G.currentPlayer === 0) {
          for (const u of G.units) {
            if (u.playerId === NPC_PLAYER_ID && u.hp > 0) processStatusEffects(u);
          }
          if (G.shops && G.turn > 1 && (G.turn - 1) % 7 === 0) {
            for (const shop of G.shops) restockShop(shop);
          }
          if (G.vendors && G.turn > 1 && (G.turn - 1) % 4 === 0) {
            for (const vendor of G.vendors) restockVendor(vendor);
          }
          if (G.turn === 15 && (!G.bazaars || G.bazaars.length === 0)) {
            spawnBazaar();
          }
        }
        // Remove DoT deaths
        const dotDeaths = G.units.filter(u => (u.playerId === G.currentPlayer || u.playerId === NPC_PLAYER_ID) && u.hp <= 0);
        if (dotDeaths.length > 0) {
          G.units = G.units.filter(u => u.hp > 0);
          for (const d of dotDeaths) checkPlayerElimination(d.playerId);
        }
        // Full turn-start logic (regen, decay, cooldowns, reset)
        // Reset forge usage
        if (G.structures) {
          for (const s of G.structures) {
            if ((s.type === 'forge' || s.type === 'advanced_forge') && s.playerId === G.currentPlayer) s.forgeUsedThisTurn = false;
          }
        }
        for (const u of G.units) {
          if (u.playerId === G.currentPlayer && u.hp > 0) {
            const stats = getUnitStats(u);
            const hasDot = u.statusEffects && u.statusEffects.some(se => STATUS_EFFECTS[se.id] && STATUS_EFFECTS[se.id].dot);
            const hasTrollbloodAura = hasPassive(u, 'trollblood_aura') || G.units.some(a => a.hp > 0 && a.id !== u.id && a.playerId === u.playerId && hasPassive(a, 'trollblood_aura') && chebyshevDist(u.x, u.y, a.x, a.y) <= 3);
            const hasCombatRegen = (u.combatRegenTurns && u.combatRegenTurns > 0) || hasPassive(u, 'combat_regeneration') || hasTrollbloodAura;
            if ((!hasAdjacentEnemy(u) || hasCombatRegen) && !hasDot && u.hp < stats.maxHp) {
              const regenStacks = Math.min(3, countPassive(u, 'regeneration'));
              const combatRegenStacks = Math.min(3, countPassive(u, 'combat_regeneration'));
              const bestStacks = Math.max(regenStacks, combatRegenStacks);
              const regenAmt = (hasPassive(u, 'regeneration') || hasCombatRegen) ? 2 + Math.max(0, bestStacks - 1) : 1;
              u.hp = Math.min(stats.maxHp, u.hp + regenAmt);
            }
            u.movementLeft = stats.movement;
            u.hasAttacked = false;
            u.hasGathered = false;
            u.wallPlacementsLeft = u.canGather ? WALL_PLACEMENTS_PER_TURN : 0;
            u.hasPlacedWallThisTurn = false;
            u.mimicGather = false;
            u.hasUsedItemAction = false;
            u.specialActionsUsed = [];
            u.rallyBonus = 0;
            u.stoneSkinBonus = 0;
            u.divineShieldBonus = 0;
            // Decay berserk bonus over turns
            if (u.berserkTurns && u.berserkTurns > 0) {
              u.berserkTurns--;
              if (u.berserkTurns <= 0) {
                u.berserkBonus = 0;
                u.berserkPenalty = 0;
                u.berserkTurns = 0;
              }
            }
            u.bloodFrenzyActive = false;
            u.disengaged = false;
            u.musterActive = false;
            u.tilesMoved = 0;
            u.overwatchFired = false;
            u.stunned = false;
            delete u.harpoonDragTargetId;
            delete u.harpoonDragTurn;
            if (u.lullabied) { u.lullabied = false; }
            if (u.battleCryTurns && u.battleCryTurns > 0) { u.battleCryTurns--; if (u.battleCryTurns <= 0) { u.battleCryBonus = 0; u.battleCryTurns = 0; } }
            if (u.trollBlessingTurns && u.trollBlessingTurns > 0) { u.trollBlessingTurns--; if (u.trollBlessingTurns <= 0) u.trollBlessingTurns = 0; }
            if (u.smokeBombTurns && u.smokeBombTurns > 0) { u.smokeBombTurns--; if (u.smokeBombTurns <= 0) u.smokeBombTurns = 0; }
            if (u.regenPotionTurns && u.regenPotionTurns > 0) { u.regenPotionTurns--; if (u.regenPotionTurns <= 0) u.regenPotionTurns = 0; }
            if (u.combatRegenTurns && u.combatRegenTurns > 0) { u.combatRegenTurns--; if (u.combatRegenTurns <= 0) u.combatRegenTurns = 0; }
            if (u.consecrateTurns && u.consecrateTurns > 0) {
              const cEnemies = G.units.filter(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 2);
              for (const e of cEnemies) { e.hp -= 2; applyStatusEffect(e, 'weakened', 2); if (e.hp <= 0) { e.hp = 0; dropAllItems(e); } }
              G.units = G.units.filter(uu => uu.hp > 0);
              for (const e of cEnemies) { if (e.hp <= 0) checkPlayerElimination(e.playerId); }
              u.consecrateTurns--;
            }
            if (u.isMirrorImage) { const owner = G.units.find(o => o.hp > 0 && o.id === u.mirrorOwnerId); if (!owner) u.hp = 0; }
            if (u.tempHpTurns && u.tempHpTurns > 0) { u.tempHpTurns--; if (u.tempHpTurns <= 0) { u.tempHp = 0; u.tempHpTurns = 0; const ns = getUnitStats(u); if (u.hp > ns.maxHp) u.hp = ns.maxHp; } }
            if (u.cooldowns) { for (const key of Object.keys(u.cooldowns)) { if (u.cooldowns[key] > 0) u.cooldowns[key]--; } }
          }
        }
        // Stop when we reach the target turn on player 0's turn
        if (G.turn >= targetTurn && G.currentPlayer === 0) break;
      }
      addLog(`⏩ Fast-forwarded to turn ${G.turn} (Player ${G.currentPlayer + 1}'s turn).`);
    }
    input.value = '';
    renderAll();
    renderLog();
    return;
  }

  // /spawn command: /spawn item_id
  if (msg.startsWith('/spawn ') && ALLOW_CONSOLE_COMMANDS) {
    const itemId = msg.slice(7).trim();
    const itemDef = ITEMS[itemId] || CONSUMABLES[itemId];
    if (!itemDef) {
      addLog(`⚠️ Unknown item id: "${itemId}"`);
    } else {
      const hero = G.units.find(u => u.playerId === G.currentPlayer && u.type === 'hero' && u.hp > 0);
      if (!hero) {
        addLog(`⚠️ No living hero found.`);
      } else {
        const newItem = JSON.parse(JSON.stringify(itemDef));
        hero.inventory.push(newItem);
        addLog(`🎁 Spawned "${newItem.name}" into ${getDisplayName(hero)}'s inventory.`);
        renderUnitPanel(hero);
      }
    }
    input.value = '';
    return;
  }

  // /give command: give 100 of every resource
  if (msg === '/give' && ALLOW_CONSOLE_COMMANDS) {
    const p = G.players[G.currentPlayer];
    for (const r of RESOURCE_TYPES) p.resources[r] = (p.resources[r] || 0) + 100;
    addLog(`⚙️ Gave ${p.name} +100 of every resource.`);
    input.value = '';
    renderAll();
    return;
  }

  if (!G.chatMessages) G.chatMessages = [];
  G.chatMessages.push({
    playerId: G.currentPlayer,
    name: G.players[G.currentPlayer].name,
    text: msg,
    turn: G.turn
  });
  input.value = '';
  renderChat();
}

function renderChat() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const messages = G.chatMessages || [];
  container.innerHTML = messages.map(m => {
    const color = PLAYER_COLORS[m.playerId] || PLAYER_CHAT_COLORS[m.playerId % PLAYER_CHAT_COLORS.length];
    const escaped = m.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<div class="chat-msg"><span class="chat-name" style="color:${color}">${m.name}:</span><span>${escaped}</span></div>`;
  }).join('');
  container.scrollTop = container.scrollHeight;
}

// Chat Enter key + Feature Flag init
document.addEventListener('DOMContentLoaded', () => {
  // Apply feature flags
  if (!ALLOW_NEW_GAME) {
    const newGameBtn = document.getElementById('new-game-btn');
    if (newGameBtn) newGameBtn.style.display = 'none';
  }
  if (!ALLOW_LOCAL_PLAY) {
    const continueBtn = document.getElementById('continue-local-btn');
    if (continueBtn) continueBtn.style.display = 'none';
    const endTurnBtn = document.getElementById('end-turn-btn');
    if (endTurnBtn) endTurnBtn.textContent = 'End Turn';
    const endTurnConfirmTitle = document.getElementById('end-turn-confirm-title');
    if (endTurnConfirmTitle) endTurnConfirmTitle.textContent = 'End Turn & Save Game?';
    const endTurnConfirmMsg = document.getElementById('end-turn-confirm-msg');
    if (endTurnConfirmMsg) endTurnConfirmMsg.textContent = 'Are you sure? The game will be saved and your turn will end.';
    const endTurnConfirmBtn = document.getElementById('end-turn-confirm-btn');
    if (endTurnConfirmBtn) endTurnConfirmBtn.textContent = 'End Turn & Save Game';
  }

  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); sendChat(); }
      e.stopPropagation(); // prevent game hotkeys while typing
    });
    chatInput.addEventListener('keyup', (e) => e.stopPropagation());
    chatInput.addEventListener('keypress', (e) => e.stopPropagation());
  }
});

function saveGame() {
  const data = JSON.stringify(G, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${G.players[G.currentPlayer].name.replace(/\s+/g, '_')}_turn-${G.turn}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function loadGame() {
  document.getElementById('file-input').click();
}

function handleFileLoad(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      G = JSON.parse(e.target.result);
      nextUnitId = G.nextUnitId || G.units.length + 100;
      G.groundItems = G.groundItems || [];
      G.chatMessages = G.chatMessages || [];
      G.combatEffects = [];
      G.traps = G.traps || [];
      G.tunnels = G.tunnels || [];
      G.barrels = G.barrels || [];
      lastRenderedHpByUnitId = new Map();
      // Migrate units if needed
      for (const u of G.units) {
        u.str = u.str || 0;
        u.agi = u.agi || 0;
        u.con = u.con || 0;
        u.int = u.int || 0;
        u.specialActionsUsed = u.specialActionsUsed || [];
        u.faction = u.faction || null;
        u.rallyBonus = u.rallyBonus || 0;
        u.stoneSkinBonus = u.stoneSkinBonus || 0;
        u.divineShieldBonus = u.divineShieldBonus || 0;
        u.berserkBonus = u.berserkBonus || 0;
        u.berserkPenalty = u.berserkPenalty || 0;
        u.berserkTurns = u.berserkTurns || 0;
        u.ragePotionBonus = u.ragePotionBonus || 0;
        u.speedPotionBonus = u.speedPotionBonus || 0;
        u.stoneskinPotionBonus = u.stoneskinPotionBonus || 0;
        u.stoneskinPotionTurns = u.stoneskinPotionTurns || 0;
        u.battleCryBonus = u.battleCryBonus || 0;
        u.battleCryTurns = u.battleCryTurns || 0;
        u.trollBlessingTurns = u.trollBlessingTurns || 0;
        u.regenPotionTurns = u.regenPotionTurns || 0;
        u.consecrateTurns = u.consecrateTurns || 0;
        u.smokeBombTurns = u.smokeBombTurns || 0;
        u.tempHp = u.tempHp || 0;
        u.tempHpTurns = u.tempHpTurns || 0;
        u.bloodFrenzyActive = u.bloodFrenzyActive || false;
        u.heroChoice = u.heroChoice || null;
        u.cooldowns = u.cooldowns || {};
        u.stunned = u.stunned || false;
        u.disengaged = u.disengaged || false;
        u.musterActive = u.musterActive || false;
        u.statusEffects = u.statusEffects || [];
        // Migrate passives: assign innate passives if missing
        if (!u.passives) {
          u.passives = [];
          // Derive innate passives from unit definition or hero data
          const unitDef = UNIT_DEFS[u.type];
          if (unitDef && unitDef.passives) u.passives = [...unitDef.passives];
          if (u.type === 'hero' && u.faction && u.heroChoice) {
            const fac = FACTIONS[u.faction];
            if (fac && fac.heroes && fac.heroes[u.heroChoice] && fac.heroes[u.heroChoice].passives) {
              u.passives = [...fac.heroes[u.heroChoice].passives];
            }
          }
        }
        if (u.customName === undefined) u.customName = null;
        if (u.type === 'hero' && u.heroChoice === 'amorphous_blob' && typeof u.morphPointBudget !== 'number') {
          u.morphPointBudget = AMORPHOUS_BLOB_MORPH_POINTS;
        }
        if (!u.typeLabel || (u.type === 'hero' && u.typeLabel.endsWith('Hero'))) {
          const fac = u.faction && FACTIONS[u.faction] ? FACTIONS[u.faction].prefix : '';
          if (u.type === 'hero') {
            const hd = getHeroData(u);
            const className = hd ? hd.name : 'Hero';
            u.typeLabel = fac ? `${fac} ${className}` : className;
          } else {
            u.typeLabel = fac ? `${fac} ${capitalize(u.type)}` : capitalize(u.type);
          }
        }
        if (u.equipment.hands === undefined) u.equipment.hands = null;
        for (const slot of EQUIP_SLOTS) {
          if (u.equipment[slot] === undefined) u.equipment[slot] = null;
        }
      }
      selectedUnitId = null;
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = null;
      selectedBarrel = null;
      interactionMode = 'idle';
      reachableTiles = [];
      // Migrate shop/vendor to arrays if needed
      if (!G.shops) {
        if (G.shop) {
          G.shops = [G.shop];
          delete G.shop;
        } else {
          const numShops = G.boardSize >= 64 ? 3 : G.boardSize >= 32 ? 2 : 1;
          const shopPositions = spawnShops(numShops, G.boardSize, G.startPositions, G.units, G.board);
          G.shops = shopPositions.map(pos => {
            const shop = { x: pos.x, y: pos.y, items: [], lastRestock: 0 };
            restockShop(shop);
            addLog(`$ A mysterious shop has appeared at (${pos.x}, ${pos.y})!`);
            return shop;
          });
        }
      }
      if (!G.vendors) {
        if (G.vendor) {
          G.vendors = [G.vendor];
          delete G.vendor;
        } else {
          const numVendors = G.boardSize >= 64 ? 3 : G.boardSize >= 32 ? 2 : 1;
          const allPlaced = G.shops.map(s => ({ x: s.x, y: s.y }));
          G.vendors = [];
          for (let i = 0; i < numVendors; i++) {
            const pos = spawnVendor(G.boardSize, G.startPositions, G.units, G.board, allPlaced);
            const vendor = { x: pos.x, y: pos.y, items: [], lastRestock: 0 };
            G.vendors.push(vendor);
            allPlaced.push(pos);
            restockVendor(vendor);
            addLog(`☂ A Refreshments Vendor has set up near the water at (${pos.x}, ${pos.y})!`);
          }
        }
      }
      if (!G.bazaars) G.bazaars = [];
      if (!G.structures) G.structures = [];
      // Migrate structures without HP
      for (const s of G.structures) {
        if (s.hp === undefined) s.hp = STRUCTURE_DEFS[s.type] ? STRUCTURE_DEFS[s.type].hp : 20;
      }
      showScreen('game-screen');
      renderAll();
      addLog('Game loaded successfully.');
      renderLog();
      // If current player hasn't picked a faction yet, show the picker
      if (!G.players[G.currentPlayer].faction) {
        showFactionPick();
      }
    } catch (err) {
      alert('Error loading game file: ' + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ============================================================
// UTILITIES
// ============================================================
function getUnit(id) {
  return G.units.find(u => u.id === id && u.hp > 0);
}

function getUnitAt(x, y) {
  return G.units.find(u => u.x === x && u.y === y && u.hp > 0);
}

function isAdjacent(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1 && !(x1 === x2 && y1 === y2);
}

function chebyshevDist(x1, y1, x2, y2) {
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
}

function hasLineOfSight(x1, y1, x2, y2) {
  // Adjacent or same tiles always have line of sight
  if (chebyshevDist(x1, y1, x2, y2) <= 1) return true;

  // Trace a line from (x1,y1) to (x2,y2), checking intermediate tiles
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const cx = Math.round(x1 + dx * t);
    const cy = Math.round(y1 + dy * t);

    if (cx >= 0 && cx < G.boardSize && cy >= 0 && cy < G.boardSize) {
      const cell = G.board[cy][cx];
      // Non-water resources (stone, wood, gold) block line of sight
      if (cell && cell.type && cell.amount > 0 && cell.type !== 'water') return false;
    }
  }

  return true;
}

function isOnStraightLine(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  return (dx === 0 || dy === 0 || dx === dy) && (dx + dy > 0);
}

function hasAdjacentEnemy(unit) {
  return G.units.some(u =>
    u.hp > 0 && u.playerId !== unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
}

function hasAdjacentAlly(unit) {
  return G.units.some(u =>
    u.hp > 0 && u.id !== unit.id && u.playerId === unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
}

function hasEnemyInRange(unit) {
  const stats = getUnitStats(unit);
  const range = stats.attackRange || 1;
  const hasUnit = G.units.some(u => {
    if (u.hp <= 0 || u.playerId === unit.playerId) return false;
    const dist = chebyshevDist(unit.x, unit.y, u.x, u.y);
    if (dist > range || !hasLineOfSight(unit.x, unit.y, u.x, u.y)) return false;
    // Smoke concealment blocks ranged targeting (distance > 1)
    if (dist > 1 && isConcealedBySmoke(u)) return false;
    return true;
  });
  if (hasUnit) return true;
  const hasStruct = G.structures && G.structures.some(s =>
    s.playerId !== unit.playerId && chebyshevDist(unit.x, unit.y, s.x, s.y) <= range && hasLineOfSight(unit.x, unit.y, s.x, s.y)
  );
  if (hasStruct) return true;
  // Any barrel in range is attackable (even your own)
  const hasBarrel = G.barrels && G.barrels.some(b =>
    chebyshevDist(unit.x, unit.y, b.x, b.y) <= range && hasLineOfSight(unit.x, unit.y, b.x, b.y)
  );
  return !!hasBarrel;
}

function hasAttackTargetInRange(unit) {
  if (hasEnemyInRange(unit)) return true;
  const stats = getUnitStats(unit);
  const range = stats.attackRange || 1;
  // Walls are attackable targets for normal Attack mode.
  const hasWall = G.board && G.board.some((row, y) => row.some((cell, x) =>
    cell && cell.type === 'wall' && cell.amount > 0 &&
    (cell.ownerPlayerId == null || cell.ownerPlayerId !== unit.playerId) &&
    chebyshevDist(unit.x, unit.y, x, y) <= range &&
    hasLineOfSight(unit.x, unit.y, x, y)
  ));
  return !!hasWall;
}

function beastChaseToward(beast, target) {
  const maxSteps = 3;
  const dirs8 = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],           [1,  0],
    [-1,  1], [0,  1], [1,  1]
  ];

  const isOpenTile = (x, y) => {
    if (x < 0 || x >= G.boardSize || y < 0 || y >= G.boardSize) return false;
    const cell = G.board[y][x];
    if (cell && cell.type && cell.amount > 0) return false;
    if (G.units.some(u => u.hp > 0 && u.id !== beast.id && u.x === x && u.y === y)) return false;
    if (G.barrels && G.barrels.some(b => b.x === x && b.y === y)) return false;
    return true;
  };

  const startDist = chebyshevDist(beast.x, beast.y, target.x, target.y);
  const queue = [{ x: beast.x, y: beast.y, steps: 0, first: null }];
  const seen = new Set([`${beast.x},${beast.y}`]);
  let bestPath = null;
  let bestPathDist = startDist;

  for (let qi = 0; qi < queue.length; qi++) {
    const node = queue[qi];
    if (node.steps >= maxSteps) continue;

    for (const [dx, dy] of dirs8) {
      const nx = node.x + dx;
      const ny = node.y + dy;
      const key = `${nx},${ny}`;
      if (seen.has(key) || !isOpenTile(nx, ny)) continue;

      const first = node.first || { x: nx, y: ny };
      const dist = chebyshevDist(nx, ny, target.x, target.y);
      if (dist < bestPathDist) {
        bestPathDist = dist;
        bestPath = first;
      }

      if (dist > 0) {
        seen.add(key);
        queue.push({ x: nx, y: ny, steps: node.steps + 1, first });
      }
    }
  }

  let moved = 0;
  if (bestPath) {
    beast.x = bestPath.x;
    beast.y = bestPath.y;
    moved = 1;
    if (chebyshevDist(beast.x, beast.y, target.x, target.y) <= 1) {
      if (bestPathDist < startDist) {
        // already adjacent or better after the first step
      }
    }
  }

  if (moved > 0) {
    addLog(`${getNpcEmoji(beast)} ${getDisplayName(beast)} charges ${moved} space${moved > 1 ? 's' : ''} toward ${getDisplayName(target)}!`);
  }
}

function rollD6() { return Math.floor(Math.random() * 6) + 1; }

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function getDisplayName(u) {
  if (u.customName) {
    const label = u.typeLabel || capitalize(u.type);
    return `"${u.customName}" ${label}`;
  }
  return u.name;
}

function renameUnit(unitId) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const current = u.customName || '';
  const newName = prompt('Enter a new name (leave blank to reset):', current);
  if (newName === null) return; // cancelled
  u.customName = newName.trim() || null;
  renderAll();
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function addLog(msg) {
  if (!G) return;
  G.log.push(msg);
  renderLog();
}

// ============================================================
// INIT
// ============================================================

// Stat tooltip bar — show data-tip text at bottom of screen on hover
(function() {
  const bar = document.getElementById('stat-tooltip-bar');
  if (!bar) return;
  document.body.addEventListener('mouseover', function(e) {
    const el = e.target.closest('[data-tip]');
    if (el) {
      bar.textContent = el.getAttribute('data-tip');
      bar.classList.add('visible');
    }
  });
  document.body.addEventListener('mouseout', function(e) {
    const el = e.target.closest('[data-tip]');
    if (el) {
      bar.classList.remove('visible');
    }
  });
})();

updatePlayerSetup();
