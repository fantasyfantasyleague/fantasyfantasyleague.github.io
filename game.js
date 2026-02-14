// ============================================================
// FEATURE FLAGS
// ============================================================
const ALLOW_NEW_GAME = true;
const ALLOW_LOCAL_PLAY = true;
const ALLOW_CONSOLE_COMMANDS = true;

// ============================================================
// CONSTANTS
// ============================================================
const PLAYER_COLORS = ['#2600ff', '#FF2222', '#00CC44', '#ff27db'];
const PLAYER_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
const NPC_PLAYER_ID = -1;
const BEAST_COLOR = '#9932CC';

const FACTIONS = {
  goblins: {
    name: 'Goblins', prefix: 'Goblin',
    chars: { worker: 'g', warrior: 'ǧ', elite: 'Ǥ', hero: 'G' },
    unitOverrides: {
      worker:  { hp: 3, movement: 4, attack: 1, defense: 0, str: 0, agi: 4, con: 0, int: 2 },
      warrior: { hp: 6, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 0, startingEquipment: { mainhand: 'poisoned_dagger' } },
      elite:   { name: 'Assassin', hp: 10, movement: 6, attack: 3, defense: 1, str: 2, agi: 4, con: 0, int: 1, passives: ['piercing'], startingEquipment: { body: 'leather_vest', mainhand: 'shadow_dagger' } },
    },
    heroes: {
      goblin_shadowblade: {
        name: 'Shadowblade', char: 'G',
        hp: 11, movement: 6, attack: 3, defense: 2, str: 2, agi: 4, con: 0, int: 1,
        passives: [],
        startingEquipment: { head: 'wolf_pelt_hood', mainhand: 'poisoned_dagger', offhand: 'buckler' },
        ability: { id: 'goblin_disengage', name: 'Disengage', desc: 'Break free from Frozen, Ensnared, and Combat Locked. Move without triggering Attacks of Opportunity this turn' },
        description: 'A masterful rogue who slips past any defense.'
      },
      goblin_hexweaver: {
        name: 'Hexweaver', char: 'Ğ',
        hp: 8, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 4,
        startingEquipment: { mainhand: 'enchanted_scepter', offhand: 'orb_of_storms' },
        ability: { id: 'hex_curse', name: 'Hex Curse', desc: 'Curse a visible enemy within 3 tiles: Weakened (-3 ATK) and Cursed (-3 DEF) for 2 turns' },
        description: 'A cunning hexcaster who weakens foes from afar.'
      },
      goblin_ratking: {
        name: 'Ratking', char: 'Ĝ',
        hp: 14, movement: 5, attack: 2, defense: 2, str: 2, agi: 3, con: 0, int: 0,
        passives: [],
        startingEquipment: { mainhand: 'scimitar', offhand: 'buckler', accessory: 'scouts_compass' },
        ability: { id: 'summon_swarm', name: 'Summon Swarm', desc: 'Deal 2 damage to all adjacent enemies and poison survivors for 2 turns' },
        description: 'Lord of vermin. Surrounds foes with biting swarms.'
      }
    }
  },
  humans: {
    name: 'Humans', prefix: 'Human',
    chars: { worker: 'p', warrior: '♟', elite: '⚜', hero: '♚' },
    unitOverrides: {
      worker:  { hp: 5, movement: 3, attack: 1, defense: 0, str: 1, agi: 1, con: 0, int: 2 },
      warrior: { hp: 9, movement: 4, attack: 2, defense: 2, str: 2, agi: 1, con: 0, int: 0, startingEquipment: { mainhand: 'short_sword', offhand: 'wooden_shield' } },
      elite:   { name: 'Knight', hp: 14, movement: 5, attack: 3, defense: 3, str: 3, agi: 2, con: 0, int: 0, passives: ['momentum'], startingEquipment: { body: 'chain_mail', mainhand: 'spear', offhand: '_two_handed_' } },
    },
    heroes: {
      human_wizard: {
        name: 'Wizard', char: '♆',
        hp: 13, movement: 5, attack: 2, defense: 1, str: 1, agi: 1, con: 0, int: 4,
        passives: ['mirrored'],
        startingEquipment: { body: 'simple_robe', mainhand: 'fire_wand' },
        ability: { id: 'mirror_image', name: 'Mirror Image', desc: 'Summon a mirror copy of yourself on an adjacent empty tile. The copy has 1 HP.' },
        description: 'A master of illusion. His mirror image echoes his magic.'
      },
      human_paladin: {
        name: 'Paladin', char: '♔',
        hp: 19, movement: 4, attack: 3, defense: 4, str: 3, agi: 1, con: 0, int: 1,
        passives: [],
        startingEquipment: { body: 'chain_mail', mainhand: 'mace', offhand: 'iron_shield' },
        ability: { id: 'consecrate', name: 'Consecrate', desc: 'Deal 3 damage and Weaken all enemies within 2 tiles. Lasts 2 turns.' },
        description: 'A holy warrior who consecrates the ground beneath his foes.'
      },
      human_ranger: {
        name: 'Ranger', char: '♞',
        hp: 12, movement: 6, attack: 3, defense: 2, str: 2, agi: 4, con: 0, int: 1,
        passives: [],
        startingEquipment: { body: 'leather_vest', mainhand: 'longbow', offhand: '_two_handed_' },
        ability: { id: 'aimed_shot', name: 'Aimed Shot', desc: 'Fire a guaranteed-hit arrow at a target within range that deals ATK damage, ignoring defense' },
        description: 'A peerless archer. Never misses the mark.'
      }
    }
  },
  elves: {
    name: 'Elves', prefix: 'Elf',
    chars: { worker: 'e', warrior: '➶', elite: '☘', hero: '✦' },
    unitOverrides: {
      worker:  { hp: 3, movement: 3, attack: 1, defense: 0, str: 0, agi: 3, con: 0, int: 3 },
      warrior: { hp: 7, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 1, startingEquipment: { mainhand: 'longbow', offhand: '_two_handed_' } },
      elite:   { name: 'Druid', hp: 10, movement: 5, attack: 2, defense: 2, str: 1, agi: 3, con: 0, int: 3, passives: ['regeneration'], startingEquipment: { body: 'leather_vest', mainhand: 'short_sword', offhand: 'healing_totem' } },
    },
    heroes: {
      elf_windwalker: {
        name: 'Windwalker', char: '✦',
        hp: 13, movement: 6, attack: 3, defense: 2, str: 2, agi: 4, con: 0, int: 2,
        passives: [],
        startingEquipment: { body: 'leather_vest', mainhand: 'elven_greatbow', offhand: '_two_handed_' },
        ability: { id: 'elf_leap', name: 'Leap', desc: 'Jump over a 1-thick obstacle to land on the other side' },
        description: 'Graceful and elusive. Dances across the battlefield.'
      },
      elf_duskweaver: {
        name: 'Duskweaver', char: '✧',
        hp: 10, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 3,
        passives: [],
        startingEquipment: { body: 'simple_robe',mainhand: 'wooden_stick'},
        ability: { id: 'arcane_blast', name: 'Arcane Blast', desc: 'Hurl arcane energy at a target within 3 tiles. Deals 4 damage and inflicts Burning. Hit chance scales with INT.' },
        description: 'A sorceress whose magic grows deadlier with knowledge.'
      },
      elf_sentinel: {
        name: 'Sentinel', char: '✯',
        hp: 16, movement: 5, attack: 3, defense: 3, str: 2, agi: 3, con: 0, int: 1,
        passives: [],
        startingEquipment: { body: 'leather_vest', mainhand: 'short_sword', offhand: 'parrying_dagger' },
        ability: { id: 'blade_dance', name: 'Blade Dance', desc: 'Attack all adjacent enemies simultaneously (one roll each)' },
        description: 'A whirling storm of steel. Strikes all who stand near.'
      }
    }
  },
  orcs: {
    name: 'Orcs', prefix: 'Orc',
    chars: { worker: 'o', warrior: 'ø', elite: 'Ø', hero: '☠' },
    unitOverrides: {
      worker:  { hp: 6, movement: 2, attack: 2, defense: 0, str: 2, agi: 0, con: 0, int: 1 },
      warrior: { hp: 12, movement: 3, attack: 3, defense: 2, str: 3, agi: 0, con: 0, int: 0, startingEquipment: { mainhand: 'hand_axe' } },
      elite:   { name: 'Berserker', hp: 15, movement: 3, attack: 4, defense: 1, str: 4, agi: 1, con: 0, int: 0, passives: ['executioner'], startingEquipment: { head: 'wolf_pelt_hood', mainhand: 'broad_sword', offhand: '_two_handed_' } },
    },
    heroes: {
      orc_warchief: {
        name: 'Warchief', char: '☠',
        hp: 21, movement: 4, attack: 4, defense: 3, str: 4, agi: 1, con: 0, int: 0,
        passives: ['sanguine_feast'],
        startingEquipment: { head: 'iron_helm', mainhand: 'battleaxe', offhand: '_two_handed_' },
        ability: { id: 'bloodrend', name: 'Bloodrend', desc: 'Deal 5 damage to an adjacent bleeding enemy (no normal attack damage)' },
        description: 'Feeds on the blood of his foes. Grows stronger as enemies bleed.'
      },
      orc_bloodrager: {
        name: 'Bloodrager', char: '⚔',
        hp: 24, movement: 3, attack: 5, defense: 2, str: 5, agi: 0, con: 0, int: 0,
        passives: [],
        startingEquipment: { body: 'chain_mail', legs: 'iron_greaves', mainhand: 'broad_sword', offhand: '_two_handed_' },
        ability: { id: 'blood_frenzy', name: 'Blood Frenzy', desc: 'Gain +4 ATK this turn; if you kill an enemy, heal to full HP' },
        description: 'Unstoppable when enraged. Heals through slaughter.'
      },
      orc_shaman: {
        name: 'Beastmaster', char: '☣',
        hp: 16, movement: 4, attack: 3, defense: 2, str: 2, agi: 1, con: 0, int: 3,
        passives: [],
        startingEquipment: { mainhand: 'staff_of_wisdom', body: 'simple_robe', offhand: '_two_handed_', accessory: 'band_of_resilience' },
        ability: { id: 'tame_beast', name: 'Tame Beast', desc: 'Tame an adjacent Foul Beast, converting it to your team. Only one tamed beast at a time.' },
        description: 'Whispers to wild creatures, bending them to his will.'
      }
    }
  },
  dwarves: {
    name: 'Dwarves', prefix: 'Dwarf',
    chars: { worker: 'd', warrior: '⚒', elite: 'ᛟ', hero: '⛏' },
    unitOverrides: {
      worker:  { hp: 7, movement: 2, attack: 1, defense: 0, str: 1, agi: 0, con: 0, int: 2 },
      warrior: { hp: 12, movement: 3, attack: 2, defense: 3, str: 2, agi: 0, con: 0, int: 0, startingEquipment: { mainhand: 'mace', offhand: 'buckler' } },
      elite:   { name: 'Runeguard', hp: 17, movement: 3, attack: 2, defense: 4, str: 2, agi: 0, con: 0, int: 1, passives: ['bulwark'], startingEquipment: { head: 'iron_helm', body: 'chain_mail', mainhand: 'war_pick', offhand: 'iron_shield' } },
    },
    heroes: {
      dwarf_forgemaster: {
        name: 'Forgemaster', char: '⛏',
        hp: 20, movement: 3, attack: 3, defense: 4, str: 3, agi: 0, con: 0, int: 1,
        passives: ['resource_gathering'],
        startingEquipment: { body: 'chain_mail', feet: 'leather_boots', legs: 'iron_greaves', mainhand: 'war_pick' },
        ability: { id: 'dwarf_muster', name: 'Muster', desc: 'New units can spawn near the hero instead of home base this turn' },
        description: 'Master of the forge. Rallies workers wherever he stands.'
      },
      dwarf_ironclad: {
        name: 'Ironclad', char: '🛡︎',
        hp: 25, movement: 3, attack: 2, defense: 5, str: 2, agi: 0, con: 0, int: 0,
        passives: ['spongey'],
        startingEquipment: { body: 'plate_armor', mainhand: 'mace', offhand: 'iron_shield' },
        ability: { id: 'shield_bash', name: 'Shield Bash', desc: 'Slam an adjacent enemy with your shield. Deals DEF damage, pushes them 2 tiles, and stuns for 1 turn' },
        description: 'An immovable bulwark. Nothing gets past Thora.'
      },
      dwarf_runesmith: {
        name: 'Runesmith', char: '⚗',
        hp: 17, movement: 3, attack: 2, defense: 3, str: 2, agi: 0, con: 0, int: 3,
        passives: ['lucky_rune'],
        startingEquipment: { body: 'chain_mail', mainhand: 'enchanted_scepter', offhand: 'healing_totem' },
        ability: { id: 'rune_of_shatter', name: 'Rune of Shatter', desc: 'Shatter the armor of all adjacent enemies: -4 DEF for 2 turns' },
        description: 'Inscribes runes that crack armor asunder.'
      }
    }
  },
  skeletons: {
    name: 'Skeletons', prefix: 'Skeleton',
    chars: { worker: 's', warrior: 'ş', elite: '☬', hero: '💀' },
    unitOverrides: {
      worker:  { hp: 2, movement: 3, attack: 1, defense: 0, str: 0, agi: 2, con: 0, int: 2, cost: { wood: 1, stone: 0, gold: 0, water: 0 } },
      warrior: { hp: 6, movement: 4, attack: 3, defense: 1, str: 2, agi: 2, con: 0, int: 0, cost: { wood: 1, stone: 1, gold: 0, water: 0 }, startingEquipment: { mainhand: 'short_sword', offhand: 'buckler' } },
      elite:   { name: 'Revenant', hp: 10, movement: 4, attack: 3, defense: 2, str: 3, agi: 1, con: 0, int: 1, passives: ['retaliate'], cost: { wood: 3, stone: 2, gold: 1, water: 0 }, startingEquipment: { head: 'leather_cap', mainhand: 'broad_sword', offhand: '_two_handed_' } },
    },
    heroes: {
      skeleton_bonelord: {
        name: 'Bonelord', char: '☻',
        hp: 14, movement: 4, attack: 3, defense: 2, str: 2, agi: 2, con: 0, int: 2,
        passives: [],
        startingEquipment: { body: 'simple_robe', mainhand: 'enchanted_scepter', offhand: 'tome_of_knowledge' },
        ability: { id: 'raise_dead', name: 'Raise Dead', desc: 'Summon a free Shambling Corpse on an adjacent empty tile' },
        description: 'Raises the fallen to swell the undead ranks.'
      },
      skeleton_lich: {
        name: 'Lich', char: '♝',
        hp: 11, movement: 4, attack: 2, defense: 1, str: 1, agi: 2, con: 0, int: 5,
        passives: ['magic_resistance'],
        startingEquipment: { mainhand: 'runic_staff', body: 'simple_robe', offhand: '_two_handed_' },
        ability: { id: 'soul_siphon', name: 'Soul Siphon', desc: 'Drain 4 HP from a target within 3 tiles, healing self for the amount drained' },
        description: 'Drains the living to sustain her undying form.'
      },
      skeleton_deathknight: {
        name: 'Death Knight', char: '☖',
        hp: 16, movement: 4, attack: 4, defense: 3, str: 3, agi: 1, con: 0, int: 1,
        passives: [],
        startingEquipment: { head: 'iron_helm', mainhand: 'broad_sword', offhand: '_two_handed_' },
        ability: { id: 'bone_explosion', name: 'Bone Explosion', desc: 'Sacrifice an adjacent allied unit to deal 3 + its max HP as damage to all enemies within 2 tiles' },
        description: 'Detonates the fallen. Every skeleton is a weapon.'
      }
    }
  },
  trolls: {
    name: 'Trolls', prefix: 'Troll',
    chars: { worker: 'ŧ', warrior: 'Ŧ', elite: '₮', hero: '🧌' },
    unitOverrides: {
      worker:  { hp: 8, movement: 2, attack: 2, defense: 0, str: 2, agi: 0, con: 0, int: 0 },
      warrior: { hp: 15, movement: 2, attack: 3, defense: 2, str: 3, agi: 0, con: 0, int: 0, startingEquipment: { mainhand: 'hand_axe' } },
      elite:   { name: 'Brute', hp: 20, movement: 2, attack: 4, defense: 3, str: 4, agi: 0, con: 0, int: 0, passives: ['extended_reach'], startingEquipment: { head: 'iron_helm', mainhand: 'warhammer', offhand: '_two_handed_' } },
    },
    heroes: {
      troll_warlord: {
        name: 'Warlord', char: '☰',
        hp: 27, movement: 3, attack: 4, defense: 3, str: 4, agi: 0, con: 0, int: 0,
        passives: [],
        startingEquipment: { mainhand: 'battleaxe', offhand: '_two_handed_' },
        ability: { id: 'devour', name: 'Devour', desc: 'Eat an adjacent enemy below 25% HP or an adjacent ally, instantly killing them and healing for their remaining HP' },
        description: 'A ravenous beast. Swallows his foes whole.'
      },
      troll_berserker: {
        name: 'Berserker', char: '☱',
        hp: 24, movement: 3, attack: 5, defense: 2, str: 5, agi: 1, con: 0, int: 0,
        passives: [],
        startingEquipment: { mainhand: 'spear', offhand: '_two_handed_' },
        ability: { id: 'troll_rampage', name: 'Rampage', desc: 'Charge up to 3 tiles in a straight line, dealing ATK damage to the first enemy hit and pushing them 1 tile' },
        description: 'A freight train of rage. Everything in his path is flattened.'
      },
      troll_shaman: {
        name: 'Shaman', char: '☷',
        hp: 19, movement: 3, attack: 3, defense: 3, str: 2, agi: 0, con: 0, int: 3,
        passives: [],
        startingEquipment: { mainhand: 'staff_of_wisdom', offhand: '_two_handed_', accessory: 'band_of_resilience' },
        ability: { id: 'trolls_blessing', name: "Troll's Blessing", desc: 'Grant Combat Regeneration to self and all adjacent allies for 3 turns' },
        description: 'Blesses allies with the regenerative power of trollkind.'
      }
    }
  },
  bards: {
    name: 'Bard Guild', prefix: 'Bard',
    chars: { worker: '♩', warrior: '♫', elite: '♬', hero: '🎵' },
    unitOverrides: {
      worker:  { hp: 3, movement: 3, attack: 1, defense: 0, str: 0, agi: 2, con: 0, int: 3 },
      warrior: { hp: 6, movement: 4, attack: 1, defense: 1, str: 0, agi: 2, con: 0, int: 2, startingEquipment: { mainhand: 'crossbow', offhand: '_two_handed_' } },
      elite:   { name: 'Virtuoso', hp: 11, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 3, passives: ['bardic_wisdom'], startingEquipment: { body: 'leather_vest', mainhand: 'flintlock_rifle', offhand: '_two_handed_' } },
    },
    heroes: {
      bard_maestro: {
        name: 'Maestro', char: '𝄞',
        hp: 11, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 4,
        passives: ['bardic_inspiration'],
        startingEquipment: { mainhand: 'lute', head:'helm_of_constitution', body: 'chain_mail', offhand: '_two_handed_' },
        ability: { id: 'mimic', name: 'Sight Read', desc: 'Stand adjacent to an enemy and copy their last used ability. Hold it until you use it.' },
        description: 'Echoes any melody he hears — and plays it back better.'
      },
      bard_drummer: {
        name: 'Drummer', char: '⯗',
        hp: 14, movement: 4, attack: 2, defense: 2, str: 2, agi: 2, con: 0, int: 2,
        passives: ['bardic_dance'],
        startingEquipment: { body: 'leather_vest', mainhand: 'harp', offhand: '_two_handed_' },
        ability: { id: 'cadence_of_haste', name: 'Cadence of Haste', desc: 'Grant an adjacent ally an immediate bonus action — they can move and attack again this turn' },
        description: 'His rhythm grants allies a second wind.'
      },
      bard_siren: {
        name: 'Siren', char: '☊',
        hp: 9, movement: 5, attack: 1, defense: 1, str: 0, agi: 4, con: 0, int: 5,
        passives: [],
        startingEquipment: { mainhand: 'wand_of_draining', body: 'simple_robe', head: 'leather_cap', feet: 'boots_of_speed' },
        ability: { id: 'lullaby', name: 'Lullaby', desc: 'Beguile all adjacent enemies for 1 turn — they can move but cannot attack, retaliate, or use abilities' },
        description: 'Her voice lulls foes into a helpless slumber.'
      }
    }
  },
  kobolds: {
    name: 'Kobolds', prefix: 'Kobold',
    chars: { worker: 'k', warrior: 'ḱ', elite: 'ǩ', hero: '🐉' },
    unitOverrides: {
      worker:  { hp: 3, movement: 4, attack: 1, defense: 0, str: 0, agi: 3, con: 0, int: 3 },
      warrior: { hp: 5, movement: 4, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 1, startingEquipment: { mainhand: 'poisoned_dagger', offhand: 'buckler' } },
      elite:   { name: 'Sapper', hp: 9, movement: 5, attack: 3, defense: 1, str: 2, agi: 4, con: 0, int: 1, passives: ['climbing'], startingEquipment: { body: 'leather_vest', mainhand: 'poisoned_dagger', offhand: 'buckler' } },
    },
    heroes: {
      kobold_saboteur: {
        name: 'Saboteur', char: '⥀',
        hp: 11, movement: 5, attack: 3, defense: 1, str: 2, agi: 4, con: 0, int: 1,
        passives: ['demolitionist'],
        startingEquipment: { mainhand: 'poisoned_dagger', offhand: 'buckler' },
        ability: { id: 'tunnel_a', name: 'Tunnel Entrance A', desc: 'Dig a tunnel entrance on an adjacent empty tile. Use Tunnel Entrance B to create the exit. Kobold units can travel between A and B instantly.' },
        ability2: { id: 'tunnel_b', name: 'Tunnel Entrance B', desc: 'Dig a second tunnel entrance on an adjacent empty tile. Kobold units can travel between A and B instantly.' },
        description: 'A sneaky sapper. Tunnels behind enemy lines and blows up their buildings.'
      },
      kobold_tinker: {
        name: 'Tinker', char: '⚙',
        hp: 9, movement: 5, attack: 1, defense: 1, str: 0, agi: 3, con: 0, int: 4,
        passives: ['resource_gathering'],
        startingEquipment: { accessory: 'lucky_charm' },
        ability: { id: 'scavenge', name: 'Scavenge', desc: 'Find a random item from the loot table and add it to inventory' },
        description: 'Finds treasure where others see only trash.'
      },
      kobold_trapmaster: {
        name: 'Trapmaster', char: '⟰',
        hp: 10, movement: 5, attack: 2, defense: 1, str: 1, agi: 4, con: 0, int: 2,
        passives: [],
        startingEquipment: { mainhand: 'throwing_knives', accessory: 'cloak_pin_of_shadows' },
        ability: { id: 'booby_trap', name: 'Booby Trap', desc: 'Place a hidden trap on an adjacent empty tile. Enemies stepping on it take 5 damage and are Ensnared for 2 turns' },
        description: 'Every step could be your last around Snapjaw.'
      }
    }
  }
};

const EQUIP_SLOTS = ['head', 'body', 'legs', 'feet', 'hands', 'mainhand', 'offhand', 'accessory'];
const SLOT_LABELS = { head: 'Head', body: 'Body', legs: 'Legs', feet: 'Feet', hands: 'Hands', mainhand: 'Main Hand', offhand: 'Off Hand', accessory: 'Accessory' };

// ============================================================
// ITEMS DATABASE
// ============================================================
const ITEMS = {
  // --- Head ---
  leather_cap:          { id: 'leather_cap',          name: 'Leather Cap',          slot: 'head',     stats: { defense: 1 },                      weight: 1, shopCost: 2, description: 'A simple leather cap.' },
  iron_helm:            { id: 'iron_helm',            name: 'Iron Helm',            slot: 'head',     stats: { defense: 2 },                      weight: 2, shopCost: 4, description: 'A sturdy iron helmet.' },
  helm_of_constitution: { id: 'helm_of_constitution', name: 'Helm of Constitution', slot: 'head',     stats: { defense: 1, con: 3 },              weight: 2, shopCost: 8, description: '+3 CON. Fortifies vitality.' },
  crown_of_intellect:   { id: 'crown_of_intellect',   name: 'Crown of Intellect',   slot: 'head',     stats: { int: 4 },                          weight: 1, shopCost: 9, description: '+4 INT. Sharpens the mind.' },
  wolf_pelt_hood:       { id: 'wolf_pelt_hood',       name: 'Wolf Pelt Hood',       slot: 'head',     stats: { defense: 1, str: 1, agi: 1 },     weight: 1, shopCost: 5, description: 'A savage wolf pelt hood.' },
  mage_circlet:          { id: 'mage_circlet',          name: 'Mage\'s Circlet',      slot: 'head',     stats: { defense: 1, int: 2 },              weight: 1, shopCost: 6, description: '+2 INT. Enhances arcane focus.' },
  horned_helm:           { id: 'horned_helm',           name: 'Horned Helm',          slot: 'head',     stats: { defense: 2, str: 2 },              weight: 3, shopCost: 7, description: '+2 STR. Intimidating horned headgear.' },
  scouts_bandana:        { id: 'scouts_bandana',        name: 'Scout\'s Bandana',     slot: 'head',     stats: { agi: 2 },                          weight: 0, shopCost: 5, description: '+2 AGI. Light and unrestrictive.' },
  helm_of_vitality:      { id: 'helm_of_vitality',      name: 'Helm of Vitality',     slot: 'head',     stats: { defense: 1, con: 2 },              weight: 2, shopCost: 6, description: '+2 CON. Pulses with life force.' },
  circlet_of_clarity:    { id: 'circlet_of_clarity',    name: 'Circlet of Clarity',   slot: 'head',     stats: { int: 3, agi: 1 },                  weight: 0, shopCost: 8, description: '+3 INT, +1 AGI. Sharpens reflexes and mind.' },
  warlords_greathelm:    { id: 'warlords_greathelm',    name: 'Warlord\'s Greathelm', slot: 'head',     stats: { defense: 3, str: 1 },              weight: 3, shopCost: 9, passives: ['bulwark'], description: '+1 STR. Imposing helm. Grants Bulwark.' },
  druids_wreath:         { id: 'druids_wreath',         name: 'Druid\'s Wreath',      slot: 'head',     stats: { con: 2, int: 1 },                  weight: 0, shopCost: 6, passives: ['regeneration'], description: '+2 CON, +1 INT. Living vines that mend wounds. Grants Regeneration.' },
  hood_of_the_phantom:   { id: 'hood_of_the_phantom',   name: 'Hood of the Phantom',  slot: 'head',     stats: { agi: 3 },                          weight: 0, shopCost: 7, passives: ['evasion'], description: '+3 AGI. Blurs your outline. Grants Evasion (+10% dodge).' },
  skull_mask:            { id: 'skull_mask',            name: 'Skull Mask',           slot: 'head',     stats: { attack: 1, str: 1 },               weight: 1, shopCost: 6, description: '+1 STR. Instills fear in foes.' },
  crown_of_thorns:       { id: 'crown_of_thorns',       name: 'Crown of Thorns',      slot: 'head',     stats: { defense: 1, int: 2 },              weight: 1, shopCost: 8, passives: ['thorns'], description: '+2 INT. Piercing barbs wound melee attackers. Grants Thorns.' },
  serpent_crown:         { id: 'serpent_crown',         name: 'Serpent Crown',        slot: 'head',     stats: { defense: 1, int: 1 },              weight: 1, shopCost: 7, onHit: { effect: 'poison', chance: 30 }, description: '+1 INT. Venomous crown. 30% chance to inflict Poison on hit.' },
  mountaineers_cap:      { id: 'mountaineers_cap',      name: "Mountaineer's Cap",    slot: 'head',     stats: { con: 1, agi: 1 },                  weight: 1, shopCost: 5, passives: ['climbing'], description: '+1 CON, +1 AGI. Hardy headgear for rough terrain. Grants Climbing.' },
  visored_sallet:        { id: 'visored_sallet',        name: 'Visored Sallet',       slot: 'head',     stats: { defense: 3 },                      weight: 3, shopCost: 6, description: 'Full-face steel helm. Maximum head protection.' },
  crit_goggles:          { id: 'crit_goggles',          name: 'Crit Goggles',         slot: 'head',     stats: { int: 1 },                          weight: 0, shopCost: 8, critBonus: 10, description: '+1 INT. Enchanted lenses that reveal weak points. +10% crit chance.' },

  // --- Body ---
  simple_robe:            { id: 'simple_robe',            name: 'Simple Robe',           slot: 'body',    stats: { defense: 1 },                      weight: 1, shopCost: 2, description: 'A plain robe. Minimal protection.' },
  leather_vest:         { id: 'leather_vest',         name: 'Leather Vest',          slot: 'body',    stats: { defense: 1, agi: 2 },              weight: 1, shopCost: 5, description: '+2 AGI. Light and flexible.' },
  chain_mail:           { id: 'chain_mail',           name: 'Chain Mail',            slot: 'body',    stats: { defense: 3 },                      weight: 3, shopCost: 6, description: 'Interlocked metal rings.' },
  plate_armor:          { id: 'plate_armor',          name: 'Plate Armor',           slot: 'body',    stats: { defense: 5, str: 1 },              weight: 5, shopCost: 10, description: '+1 STR. Massive protection, very heavy.' },
  teleportation_cloak:  { id: 'teleportation_cloak',  name: 'Teleportation Cloak',   slot: 'body',    stats: { defense: 1, agi: 1 },              weight: 1, shopCost: 12, description: 'Grants Teleport Home action.', action: 'teleport_home' },
  robe_of_the_archmage: { id: 'robe_of_the_archmage', name: 'Robe of the Archmage',  slot: 'body',    stats: { defense: 2, int: 3 },              weight: 1, shopCost: 9, passives: ['magic_resistance'], description: '+3 INT. Shimmers with magic. Grants Magic Resistance.' },
  brigandine:            { id: 'brigandine',            name: 'Brigandine',            slot: 'body',    stats: { defense: 4 },                      weight: 4, shopCost: 7, description: 'Studded leather. Solid protection.' },
  dragonhide_armor:      { id: 'dragonhide_armor',      name: 'Dragonhide Armor',      slot: 'body',    stats: { defense: 4, con: 2 },              weight: 3, shopCost: 11, passives: ['fire_resistance'], description: '+2 CON. Scaled hide of an ancient drake. Grants Fire Resistance.' },
  berserker_harness:     { id: 'berserker_harness',     name: 'Berserker\'s Harness',  slot: 'body',    stats: { defense: 1, str: 2, attack: 1 },   weight: 2, shopCost: 8, description: '+2 STR. Fuels battle rage.' },
  mithril_shirt:         { id: 'mithril_shirt',         name: 'Mithril Shirt',         slot: 'body',    stats: { defense: 3, agi: 1 },              weight: 0, shopCost: 12, description: '+1 AGI. Incredibly light and strong.' },
  diviner_vestments:     { id: 'diviner_vestments',     name: 'Diviner\'s Vestments',  slot: 'body',    stats: { defense: 1, int: 2, con: 2 },      weight: 1, shopCost: 8, description: '+2 INT, +2 CON. Woven with foresight.' },
  thornweave_tunic:      { id: 'thornweave_tunic',      name: 'Thornweave Tunic',      slot: 'body',    stats: { defense: 2, agi: 1 },              weight: 1, shopCost: 7, passives: ['thorns'], description: '+1 AGI. Barbed threads punish melee attackers. Grants Thorns.' },
  warden_plate:          { id: 'warden_plate',          name: 'Warden\'s Plate',       slot: 'body',    stats: { defense: 4, con: 1, str: 1 },      weight: 4, shopCost: 10, passives: ['steadfast'], description: '+1 STR, +1 CON. Immune to movement impairment. Grants Steadfast.' },
  shadow_cloak:          { id: 'shadow_cloak',          name: 'Shadow Cloak',          slot: 'body',    stats: { defense: 1, agi: 3 },              weight: 0, shopCost: 9, passives: ['evasion'], description: '+3 AGI. Blends with shadow. Grants Evasion (+10% dodge).' },
  elementalist_robe:     { id: 'elementalist_robe',     name: 'Elementalist Robe',     slot: 'body',    stats: { defense: 2, int: 3 },              weight: 1, shopCost: 10, passives: ['frost_resistance'], description: '+3 INT. Infused with elemental wards. Grants Frost Resistance.' },
  bone_plate_armor:      { id: 'bone_plate_armor',      name: 'Bone Plate Armor',      slot: 'body',    stats: { defense: 3, str: 2 },              weight: 3, shopCost: 9, passives: ['bulwark'], description: '+2 STR. Fused from beast bones. Grants Bulwark (-1 dmg taken).' },
  static_armor:          { id: 'static_armor',          name: 'Static Armor',          slot: 'body',    stats: { defense: 0 },                      weight: 2, shopCost: 10, passives: ['static_shock'], description: 'No DEF. Shocks melee attackers for 2–4 damage. Grants Static Shock.' },
  vagabonds_coat:        { id: 'vagabonds_coat',        name: "Vagabond's Coat",       slot: 'body',    stats: { defense: 1, agi: 2 },              weight: 1, shopCost: 8, passives: ['climbing', 'water_walking'], description: '+2 AGI. A well-traveled coat. Grants Climbing & Water Walking.' },
  mirror_plate:          { id: 'mirror_plate',          name: 'Mirror Plate',          slot: 'body',    stats: { defense: 3, int: 1 },              weight: 3, shopCost: 9, passives: ['reflect'], description: '+1 INT. Polished to a blinding sheen. Grants Reflect.' },
  rattlesnake_vest:      { id: 'rattlesnake_vest',      name: 'Rattlesnake Vest',      slot: 'body',    stats: { defense: 2, agi: 1 },              weight: 1, shopCost: 8, passives: ['retaliate', 'poison_resistance'], description: '+1 AGI. Scaled hide strikes back and wards venom. Grants Retaliate & Poison Resistance.' },
  inferno_plate:         { id: 'inferno_plate',         name: 'Inferno Plate',         slot: 'body',    stats: { defense: 3, str: 1 },              weight: 3, shopCost: 10, passives: ['inferno_armor', 'fire_resistance'], description: '+1 STR. Forged in hellfire. Melee attackers catch fire. Grants Inferno Armor & Fire Resistance.' },
  venomspine_mail:       { id: 'venomspine_mail',       name: 'Venomspine Mail',       slot: 'body',    stats: { defense: 2, con: 1 },              weight: 2, shopCost: 9, passives: ['venomous_armor', 'poison_resistance'], description: '+1 CON. Barbed with venom-tipped spines. Melee attackers are poisoned. Grants Venomous Armor & Poison Resistance.' },

  // --- Legs ---
  leather_leggings:     { id: 'leather_leggings',     name: 'Leather Leggings',      slot: 'legs',    stats: { defense: 1 },                      weight: 1, shopCost: 2, description: 'Simple leather leggings.' },
  iron_greaves:         { id: 'iron_greaves',         name: 'Iron Greaves',          slot: 'legs',    stats: { defense: 2 },                      weight: 2, shopCost: 4, description: 'Solid iron leg armor.' },
  leggings_of_evasion:  { id: 'leggings_of_evasion',  name: 'Leggings of Evasion',   slot: 'legs',    stats: { agi: 3, defense: 1 },              weight: 1, shopCost: 8, description: '+3 AGI. Magically light.' },
  titan_legguards:      { id: 'titan_legguards',      name: 'Titan Legguards',       slot: 'legs',    stats: { defense: 3, str: 2 },              weight: 3, shopCost: 9, description: '+2 STR. Forged for giants.' },
  chainmail_chausses:    { id: 'chainmail_chausses',    name: 'Chainmail Chausses',    slot: 'legs',    stats: { defense: 2, con: 1 },              weight: 2, shopCost: 5, description: '+1 CON. Linked metal leg armor.' },
  shadow_leggings:       { id: 'shadow_leggings',       name: 'Shadow Leggings',       slot: 'legs',    stats: { agi: 2 },                          weight: 0, shopCost: 5, description: '+2 AGI. Woven from shadow threads.' },
  legplates_of_fury:     { id: 'legplates_of_fury',     name: 'Legplates of Fury',     slot: 'legs',    stats: { defense: 2, str: 1 },              weight: 3, shopCost: 6, description: '+1 STR. Ground your strikes with power.' },
  silk_trousers:         { id: 'silk_trousers',         name: 'Silk Trousers',         slot: 'legs',    stats: { int: 1, agi: 1 },                  weight: 0, shopCost: 4, description: '+1 INT, +1 AGI. Enchanted elven silk.' },
  greaves_of_fortitude:  { id: 'greaves_of_fortitude',  name: 'Greaves of Fortitude',  slot: 'legs',    stats: { defense: 3, con: 2 },              weight: 3, shopCost: 9, description: '+2 CON. Unyielding protection.' },
  rangers_leggings:      { id: 'rangers_leggings',      name: 'Ranger\'s Leggings',    slot: 'legs',    stats: { agi: 3, defense: 1 },              weight: 1, shopCost: 7, passives: ['climbing'], description: '+3 AGI. Built for rugged terrain. Grants Climbing.' },
  ironbark_greaves:      { id: 'ironbark_greaves',      name: 'Ironbark Greaves',      slot: 'legs',    stats: { defense: 2, con: 2 },              weight: 2, shopCost: 7, passives: ['steadfast'], description: '+2 CON. Living wood wraps the legs. Grants Steadfast.' },
  legguards_of_the_deft: { id: 'legguards_of_the_deft', name: 'Legguards of the Deft', slot: 'legs',    stats: { agi: 2, int: 1 },                  weight: 1, shopCost: 6, passives: ['evasion'], description: '+2 AGI, +1 INT. Impossibly nimble. Grants Evasion.' },
  bloodstained_cuisses:  { id: 'bloodstained_cuisses',  name: 'Bloodstained Cuisses',  slot: 'legs',    stats: { defense: 2, str: 2 },              weight: 2, shopCost: 8, passives: ['vampirism'], description: '+2 STR. Steeped in crimson magic. Grants Vampirism.' },
  runic_legwraps:        { id: 'runic_legwraps',        name: 'Runic Legwraps',        slot: 'legs',    stats: { int: 2, con: 1 },                  weight: 0, shopCost: 6, passives: ['magic_resistance'], description: '+2 INT, +1 CON. Inscribed runes ward against spells. Grants Magic Resistance.' },
  marsh_waders:          { id: 'marsh_waders',          name: 'Marsh Waders',          slot: 'legs',    stats: { defense: 1, con: 1 },              weight: 1, shopCost: 4, passives: ['water_walking'], description: '+1 CON. Waterproof hiking gear. Grants Water Walking.' },
  sentinels_cuisses:     { id: 'sentinels_cuisses',     name: "Sentinel's Cuisses",    slot: 'legs',    stats: { defense: 3, str: 1 },              weight: 3, shopCost: 9, passives: ['bulwark'], description: '+1 STR. Unyielding plate guards. Grants Bulwark.' },

  // --- Feet ---
  leather_boots:        { id: 'leather_boots',        name: 'Leather Boots',         slot: 'feet',    stats: { con: 1 },                                  weight: 1, shopCost: 1, description: 'Basic leather footwear.' },
  iron_boots:           { id: 'iron_boots',           name: 'Iron Boots',            slot: 'feet',    stats: { defense: 1 },                      weight: 2, shopCost: 3, description: 'Heavy iron boots.' },
  boots_of_speed:       { id: 'boots_of_speed',       name: 'Boots of Speed',        slot: 'feet',    stats: { agi: 4 },                          weight: 0, shopCost: 10, passives: ['haste'], description: '+4 AGI. Feather-light; move farther. Grants Haste (+2 move).' },
  sandals_of_the_saint: { id: 'sandals_of_the_saint', name: 'Sandals of the Saint',  slot: 'feet',    stats: { con: 2, int: 2 },                  weight: 0, shopCost: 8, description: '+2 CON, +2 INT. Blessed footwear.' },
  steel_sabatons:        { id: 'steel_sabatons',        name: 'Steel Sabatons',        slot: 'feet',    stats: { defense: 2 },                      weight: 3, shopCost: 4, description: 'Heavy but protective.' },
  windrunner_boots:      { id: 'windrunner_boots',      name: 'Windrunner Boots',      slot: 'feet',    stats: { agi: 3, defense: 1 },              weight: 0, shopCost: 8, passives: ['water_walking'], description: '+3 AGI. Run like the wind. Grants Water Walking.' },
  boots_of_stability:    { id: 'boots_of_stability',    name: 'Boots of Stability',    slot: 'feet',    stats: { con: 2, defense: 1 },              weight: 2, shopCost: 6, description: '+2 CON. Rooted and steady.' },
  assassins_footwraps:   { id: 'assassins_footwraps',   name: 'Assassin\'s Footwraps', slot: 'feet',   stats: { agi: 2, attack: 1 },               weight: 0, shopCost: 7, description: '+2 AGI. Silent and deadly.' },
  earthshaker_boots:     { id: 'earthshaker_boots',     name: 'Earthshaker Boots',     slot: 'feet',    stats: { str: 2, defense: 1 },              weight: 3, shopCost: 11, description: 'Grants War Stomp: push adjacent enemies away.', action: 'war_stomp' },
  flamestride_boots:     { id: 'flamestride_boots',     name: 'Flamestride Boots',     slot: 'feet',    stats: { agi: 2, str: 1 },                  weight: 1, shopCost: 8, passives: ['fire_resistance', 'haste'], description: '+2 AGI, +1 STR. Leave embers in your wake. Grants Fire Resistance & Haste.' },
  frostwalkers:          { id: 'frostwalkers',          name: 'Frostwalkers',          slot: 'feet',    stats: { defense: 1, int: 2 },              weight: 1, shopCost: 7, passives: ['frost_resistance', 'water_walking'], description: '+2 INT. Ice forms beneath each step. Grants Frost Resistance & Water Walking.' },
  boots_of_the_mountain: { id: 'boots_of_the_mountain', name: 'Boots of the Mountain', slot: 'feet',    stats: { defense: 2, con: 2 },              weight: 3, shopCost: 8, passives: ['climbing', 'steadfast'], description: '+2 CON. Built for peaks. Grants Climbing & Steadfast.' },
  shadowstep_slippers:   { id: 'shadowstep_slippers',   name: 'Shadowstep Slippers',   slot: 'feet',    stats: { agi: 4 },                          weight: 0, shopCost: 10, passives: ['evasion'], description: '+4 AGI. Phase through danger. Grants Evasion (+10% dodge).' },
  ironclad_stompers:     { id: 'ironclad_stompers',     name: 'Ironclad Stompers',     slot: 'feet',    stats: { defense: 3, str: 1 },              weight: 4, shopCost: 8, passives: ['bulwark'], description: '+1 STR. Unyielding tread. Grants Bulwark (-1 dmg taken).' },
  pilgrim_sandals:       { id: 'pilgrim_sandals',       name: 'Pilgrim Sandals',       slot: 'feet',    stats: { con: 1, int: 1 },                  weight: 0, shopCost: 7, passives: ['water_walking', 'climbing'], description: '+1 CON, +1 INT. Blessed sandals for any terrain. Grants Water Walking & Climbing.' },

  // --- Main Hand (One-Handed) ---
  wooden_stick:              { id: 'wooden_stick',              name: 'Wooden Stick',               slot: 'mainhand', stats: { attack: 2 },                      weight: 1, shopCost: 1, description: 'A simple wooden stick. Meager weapon.' },
  pickaxe:              { id: 'pickaxe',              name: 'Pickaxe',               slot: 'mainhand', stats: { attack: 1 },                      weight: 1, shopCost: 1, description: 'A mining pick. Meager weapon.' },
  short_sword:          { id: 'short_sword',          name: 'Short Sword',           slot: 'mainhand', stats: { attack: 2 },                      weight: 1, shopCost: 3, description: 'A simple blade.' },
  flaming_sword:        { id: 'flaming_sword',        name: 'Flaming Sword',         slot: 'mainhand', stats: { attack: 3, str: 2 },              weight: 2, shopCost: 10, onHit: { effect: 'burning', chance: 70 }, description: '+2 STR. Wreathed in fire. 70% chance to inflict Burning.' },
  poisoned_dagger:      { id: 'poisoned_dagger',      name: 'Poisoned Dagger',       slot: 'mainhand', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 8, onHit: { effect: 'poison', chance: 50 }, description: '+2 AGI. Venomous edge. 50% chance to inflict Poison.' },
  mace:                 { id: 'mace',                 name: 'Mace',                  slot: 'mainhand', stats: { attack: 2, str: 1 },              weight: 2, shopCost: 4, description: '+1 STR. Blunt and brutal.' },
  rapier:               { id: 'rapier',               name: 'Rapier',                slot: 'mainhand', stats: { attack: 2, agi: 3 },              weight: 1, shopCost: 8, description: '+3 AGI. Elegant and precise.' },
  hand_axe:             { id: 'hand_axe',             name: 'Hand Axe',              slot: 'mainhand', stats: { attack: 3 },                      weight: 2, shopCost: 4, combatLockBonus: 10, description: 'A compact chopping weapon. +10% combat lock chance.' },
  frost_blade:           { id: 'frost_blade',           name: 'Frost Blade',           slot: 'mainhand', stats: { attack: 3, int: 1 },              weight: 2, shopCost: 10, onHit: { effect: 'frozen', chance: 80 }, description: '+1 INT. Chills to the bone. 80% chance to Freeze.' },
  vampiric_blade:        { id: 'vampiric_blade',        name: 'Vampiric Blade',        slot: 'mainhand', stats: { attack: 2, str: 2 },              weight: 2, shopCost: 9, onHit: { effect: 'bleeding', chance: 100 }, passives: ['vampirism'], description: '+2 STR. Drains vitality. 100% chance to inflict Bleeding. Grants Vampirism.' },
  war_pick:              { id: 'war_pick',              name: 'War Pick',              slot: 'mainhand', stats: { attack: 3, str: 1 },              weight: 2, shopCost: 5, description: '+1 STR. Pierces armor effectively.' },
  enchanted_scepter:     { id: 'enchanted_scepter',     name: 'Enchanted Scepter',     slot: 'mainhand', stats: { attack: 1, int: 3 },              weight: 1, shopCost: 9, onHit: { effect: 'cursed', chance: 55 }, description: '+3 INT. A conduit for dark magic. 55% chance to inflict Cursed.' },
  scimitar:              { id: 'scimitar',              name: 'Scimitar',              slot: 'mainhand', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 6, description: '+2 AGI. Curved and swift.' },
  serrated_cleaver:      { id: 'serrated_cleaver',      name: 'Serrated Cleaver',      slot: 'mainhand', stats: { attack: 3, str: 1 },              weight: 2, shopCost: 7, onHit: { effect: 'bleeding', chance: 100 }, description: '+1 STR. Jagged edge. 100% chance to inflict Bleeding.' },
  thundermace:           { id: 'thundermace',           name: 'Thundermace',           slot: 'mainhand', stats: { attack: 3, str: 2 },              weight: 2, shopCost: 9, onHit: { effect: 'slowed', chance: 75 }, description: '+2 STR. Crackling strikes. 75% chance to Slow.' },
  venom_fang:            { id: 'venom_fang',            name: 'Venom Fang',            slot: 'mainhand', stats: { attack: 2, agi: 3 },              weight: 1, shopCost: 9, onHit: { effect: 'poison', chance: 60 }, passives: ['piercing'], description: '+3 AGI. Razor fang dripping venom. 60% Poison. Grants Piercing.' },
  holy_mace:             { id: 'holy_mace',             name: 'Holy Mace',             slot: 'mainhand', stats: { attack: 2, int: 2, con: 1 },      weight: 2, shopCost: 8, description: '+2 INT, +1 CON. Blessed by the temple.' },
  shadow_dagger:         { id: 'shadow_dagger',         name: 'Shadow Dagger',         slot: 'mainhand', stats: { attack: 2, agi: 4 },              weight: 0, shopCost: 10, passives: ['evasion'], description: '+4 AGI. Strikes from nowhere. Grants Evasion (+10% dodge).' },
  morning_star:          { id: 'morning_star',          name: 'Morning Star',          slot: 'mainhand', stats: { attack: 3, str: 1 },              weight: 2, shopCost: 7, onHit: { effect: 'weakened', chance: 50 }, description: '+1 STR. Flanged head crushes muscle. 50% chance to Weaken.' },
  coral_blade:           { id: 'coral_blade',           name: 'Coral Blade',           slot: 'mainhand', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 7, onHit: { effect: 'slowed', chance: 70 }, description: '+2 AGI. Sea-forged edge. 70% chance to Slow.' },
  cursed_wand:           { id: 'cursed_wand',           name: 'Cursed Wand',           slot: 'mainhand', stats: { attack: 1, int: 2 },              weight: 1, shopCost: 8, range: 2, onHit: { effect: 'cursed', chance: 70 }, description: '+2 INT. Dark channeling wand. Ranged (2). 70% chance to Curse.' },

  // --- Main Hand (Two-Handed) ---
  broad_sword:          { id: 'broad_sword',          name: 'Broad Sword',           slot: 'mainhand', stats: { attack: 4 },                      weight: 3, shopCost: 5, twoHanded: true, description: 'A heavy, wide blade. Requires both hands.' },
  staff_of_wisdom:      { id: 'staff_of_wisdom',      name: 'Staff of Wisdom',       slot: 'mainhand', stats: { attack: 1, int: 4, con: 1 },     weight: 2, shopCost: 10, twoHanded: true, description: '+4 INT, +1 CON. A scholar\'s weapon. Two-handed.' },
  battleaxe:            { id: 'battleaxe',            name: 'Battleaxe',             slot: 'mainhand', stats: { attack: 5, str: 2 },              weight: 4, shopCost: 11, twoHanded: true, description: '+2 STR. Devastating cleave. Two-handed.' },
  greatsword:           { id: 'greatsword',           name: 'Greatsword',            slot: 'mainhand', stats: { attack: 5, str: 1 },              weight: 4, shopCost: 9, twoHanded: true, description: '+1 STR. Massive blade. Two-handed.' },
  warhammer:            { id: 'warhammer',            name: 'Warhammer',             slot: 'mainhand', stats: { attack: 4, str: 2, con: 1 },     weight: 5, shopCost: 12, twoHanded: true, onHit: { effect: 'weakened', chance: 25 }, description: '+2 STR, +1 CON. Crushes armor. 25% chance to Weaken. Two-handed.' },
  longbow:              { id: 'longbow',              name: 'Longbow',               slot: 'mainhand', stats: { attack: 3, agi: 3 },              weight: 2, shopCost: 9, twoHanded: true, range: 4, description: '+3 AGI. Ranged (4). Two-handed.' },
  crossbow:             { id: 'crossbow',             name: 'Crossbow',              slot: 'mainhand', stats: { attack: 4 },                      weight: 3, shopCost: 7, twoHanded: true, range: 3, description: 'Heavy bolt. Ranged (3). Two-handed.' },
  throwing_knives:      { id: 'throwing_knives',      name: 'Throwing Knives',       slot: 'mainhand', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 6, range: 2, description: '+2 AGI. Ranged (2). One-handed.' },
  halberd:              { id: 'halberd',              name: 'Halberd',               slot: 'mainhand', stats: { attack: 4, str: 1, agi: 1 },     weight: 4, shopCost: 9, twoHanded: true, combatLockBonus: 15, description: '+1 STR, +1 AGI. Polearm with reach. +15% combat lock chance. Two-handed.' },
  spear:                { id: 'spear',                name: 'Spear',                 slot: 'mainhand', stats: { attack: 3, agi: 2 },              weight: 2, shopCost: 6, twoHanded: true, combatLockBonus: 10, description: '+2 AGI. Long thrusting weapon. +10% combat lock chance. Two-handed.' },
  maul:                  { id: 'maul',                  name: 'Maul',                  slot: 'mainhand', stats: { attack: 6, str: 3 },              weight: 5, shopCost: 14, twoHanded: true, onHit: { effect: 'weakened', chance: 70 }, description: '+3 STR. Devastating overhead smash. 70% chance to Weaken. Two-handed.' },
  elven_greatbow:        { id: 'elven_greatbow',        name: 'Elven Greatbow',        slot: 'mainhand', stats: { attack: 4, agi: 2 },              weight: 2, shopCost: 10, twoHanded: true, range: 5, description: '+2 AGI. Superior range (5). Two-handed.' },
  pike:                  { id: 'pike',                  name: 'Pike',                  slot: 'mainhand', stats: { attack: 3, agi: 2, str: 1 },     weight: 3, shopCost: 7, twoHanded: true, combatLockBonus: 15, description: '+1 STR, +2 AGI. Extended reach polearm. +15% combat lock chance. Two-handed.' },
  runic_staff:           { id: 'runic_staff',           name: 'Runic Staff',           slot: 'mainhand', stats: { attack: 2, int: 5 },              weight: 2, shopCost: 11, twoHanded: true, description: '+5 INT. Crackling with runes. Two-handed.' },
  executioners_blade:    { id: 'executioners_blade',    name: 'Executioner\'s Blade',  slot: 'mainhand', stats: { attack: 6 },                      weight: 5, shopCost: 10, twoHanded: true, description: 'Pure killing power. Two-handed.' },
  // New Two-Handed melee
  bonecrusher:           { id: 'bonecrusher',           name: 'Bonecrusher',           slot: 'mainhand', stats: { attack: 5, str: 3 },              weight: 5, shopCost: 13, twoHanded: true, onHit: { effect: 'shattered', chance: 75 }, description: '+3 STR. Shatters armor. 75% to Shatter. Two-handed.' },
  volcanic_greatsword:   { id: 'volcanic_greatsword',   name: 'Volcanic Greatsword',   slot: 'mainhand', stats: { attack: 5, str: 2 },              weight: 4, shopCost: 14, twoHanded: true, onHit: { effect: 'burning', chance: 70 }, passives: ['fire_resistance'], description: '+2 STR. Forged in lava. 70% Burning. Fire Resistance. Two-handed.' },
  windreaver:            { id: 'windreaver',            name: 'Windreaver',            slot: 'mainhand', stats: { attack: 4, agi: 3 },              weight: 2, shopCost: 11, twoHanded: true, passives: ['haste'], description: '+3 AGI. Slices the air itself. Grants Haste. Two-handed.' },
  soul_reaper:           { id: 'soul_reaper',           name: 'Soul Reaper',           slot: 'mainhand', stats: { attack: 5, int: 2 },              weight: 3, shopCost: 13, twoHanded: true, passives: ['vampirism'], onHit: { effect: 'cursed', chance: 30 }, description: '+2 INT. Consumes souls. 30% Curse. Vampirism. Two-handed.' },
  thornwood_greatstaff:  { id: 'thornwood_greatstaff',  name: 'Thornwood Greatstaff',  slot: 'mainhand', stats: { attack: 3, int: 4, con: 1 },     weight: 2, shopCost: 12, twoHanded: true, passives: ['thorns', 'regeneration'], description: '+4 INT, +1 CON. Living wood. Grants Thorns & Regeneration. Two-handed.' },
  lightning_infused_staff: { id: 'lightning_infused_staff', name: 'Lightning Infused Staff', slot: 'mainhand', stats: { attack: 3, int: 3 },           weight: 2, shopCost: 13, twoHanded: true, chainLightning: { chance: 100, damage: 3 }, description: '+3 INT. Chain lightning on every hit — 3 damage to all enemies adjacent to target. Two-handed.' },
  frostreaver:           { id: 'frostreaver',           name: 'Frostreaver',           slot: 'mainhand', stats: { attack: 5, str: 1 },              weight: 4, shopCost: 11, twoHanded: true, onHit: { effect: 'frozen', chance: 45 }, description: '+1 STR. Glacial greataxe. 45% chance to Freeze. Two-handed.' },
  compound_bow:          { id: 'compound_bow',          name: 'Compound Bow',          slot: 'mainhand', stats: { attack: 3, agi: 2 },              weight: 2, shopCost: 10, twoHanded: true, range: 4, passives: ['piercing'], description: '+2 AGI. Mechanically reinforced. Ranged (4). Grants Piercing. Two-handed.' },
  // Wave 10 — bleeding weapons (two-handed)
  jagged_greataxe:       { id: 'jagged_greataxe',       name: 'Jagged Greataxe',       slot: 'mainhand', stats: { attack: 5, str: 2 },              weight: 4, shopCost: 12, twoHanded: true, onHit: { effect: 'bleeding', chance: 100 }, description: '+2 STR. Cruel notched blade. 100% chance to inflict Bleeding. Two-handed.' },
  barbed_spear:          { id: 'barbed_spear',          name: 'Barbed Spear',          slot: 'mainhand', stats: { attack: 3, agi: 1 },              weight: 2, shopCost: 5, twoHanded: true, combatLockBonus: 10, onHit: { effect: 'bleeding', chance: 100 }, description: '+1 AGI. Hooked tip rips flesh. 100% Bleeding. +10% combat lock. Two-handed.' },
  barbed_shortbow:       { id: 'barbed_shortbow',       name: 'Barbed Shortbow',       slot: 'mainhand', stats: { attack: 2, agi: 1 },              weight: 1, shopCost: 5, twoHanded: true, range: 3, onHit: { effect: 'bleeding', chance: 100 }, description: '+1 AGI. Barbed arrows. Ranged (3). 100% Bleeding. Two-handed.' },
  razorwind_glaive:      { id: 'razorwind_glaive',      name: 'Razorwind Glaive',      slot: 'mainhand', stats: { attack: 5, str: 1, agi: 2 },     weight: 3, shopCost: 14, twoHanded: true, onHit: { effect: 'bleeding', chance: 100 }, passives: [], description: '+1 STR, +2 AGI. Whirlwind of blades. 100% Bleeding. Two-handed.' },
  // Ranged Magic Weapons
  staff_of_fire:         { id: 'staff_of_fire',         name: 'Staff of Fire',         slot: 'mainhand', stats: { attack: 2, int: 3 },              weight: 2, shopCost: 13, twoHanded: true, range: 3, description: '+3 INT. Ranged (3). Grants Fireball: 4 dmg + Burning in AoE. Two-handed.', action: 'fireball' },
  staff_of_frost:        { id: 'staff_of_frost',        name: 'Staff of Frost',        slot: 'mainhand', stats: { attack: 2, int: 3 },              weight: 2, shopCost: 13, twoHanded: true, range: 3, passives: ['frost_resistance'], description: '+3 INT. Ranged (3). Grants Frost Ray: 3 dmg + Freeze. Frost Resistance. Two-handed.', action: 'frost_ray' },
  scepter_of_lightning:  { id: 'scepter_of_lightning',  name: 'Scepter of Lightning',  slot: 'mainhand', stats: { attack: 2, int: 4 },              weight: 1, shopCost: 14, range: 4, description: '+4 INT. Ranged (4). Grants Lightning Bolt: 5 dmg + Slow. One-handed.', action: 'lightning_bolt' },
  wand_of_draining:      { id: 'wand_of_draining',      name: 'Wand of Draining',      slot: 'mainhand', stats: { attack: 1, int: 3 },              weight: 1, shopCost: 11, range: 2, description: '+3 INT. Ranged (2). Grants Life Drain: 3 dmg + heal self. One-handed.', action: 'life_drain' },
  orb_of_venom:          { id: 'orb_of_venom',          name: 'Orb of Venom',          slot: 'mainhand', stats: { attack: 1, int: 2 },              weight: 1, shopCost: 10, range: 3, description: '+2 INT. Ranged (3). Grants Poison Cloud: AoE poison. One-handed.', action: 'poison_cloud' },
  fire_wand:             { id: 'fire_wand',             name: 'Fire Wand',             slot: 'mainhand', stats: { attack: 2, int: 1 },              weight: 1, shopCost: 5, range: 3, description: '+1 INT. Ranged (3). A simple wand crackling with flame. One-handed.' },

  // --- Off Hand ---
  wooden_shield:        { id: 'wooden_shield',        name: 'Wooden Shield',         slot: 'offhand',  stats: { defense: 2 },                     weight: 2, shopCost: 3, combatLockBonus: 5, description: 'A sturdy wooden shield. +5% combat lock chance.' },
  iron_shield:          { id: 'iron_shield',          name: 'Iron Shield',           slot: 'offhand',  stats: { defense: 3, con: 1 },             weight: 3, shopCost: 7, combatLockBonus: 10, description: '+1 CON. Heavy iron shield. +10% combat lock chance.' },
  tome_of_knowledge:    { id: 'tome_of_knowledge',    name: 'Tome of Knowledge',     slot: 'offhand',  stats: { int: 3 },                         weight: 1, shopCost: 7, description: '+3 INT. Ancient arcane text.' },
  buckler:              { id: 'buckler',              name: 'Buckler',               slot: 'offhand',  stats: { defense: 1, agi: 1 },             weight: 1, shopCost: 4, combatLockBonus: 5, description: '+1 AGI. Light and quick. +5% combat lock chance.' },
  tower_shield:          { id: 'tower_shield',          name: 'Tower Shield',          slot: 'offhand',  stats: { defense: 4, con: 1 },             weight: 4, shopCost: 9, combatLockBonus: 15, description: '+1 CON. Massive wall of steel. +15% combat lock chance.' },
  parrying_dagger:       { id: 'parrying_dagger',       name: 'Parrying Dagger',       slot: 'offhand',  stats: { attack: 1, defense: 2 },  weight: 1, shopCost: 7, description: '+2 DEF. Deflect and counter.' },
  orb_of_storms:         { id: 'orb_of_storms',         name: 'Orb of Storms',         slot: 'offhand',  stats: { int: 2, attack: 1 },              weight: 1, shopCost: 8, onHit: { effect: 'slowed', chance: 30 }, description: '+2 INT. Crackles with lightning. 30% chance to Slow.' },
  spiked_shield:         { id: 'spiked_shield',         name: 'Spiked Shield',         slot: 'offhand',  stats: { defense: 2, attack: 1 },          weight: 2, shopCost: 5, passives: ['retaliate'], combatLockBonus: 10, description: 'Offensive defense. +10% combat lock chance. Grants Retaliate.' },
  healing_totem:         { id: 'healing_totem',         name: 'Healing Totem',         slot: 'offhand',  stats: { con: 2, int: 1 },                 weight: 1, shopCost: 10, description: 'Grants Heal Allies: restore 3 HP to adjacent allies.', action: 'heal_allies' },
  frost_ward:            { id: 'frost_ward',            name: 'Frost Ward',            slot: 'offhand',  stats: { defense: 2, int: 1 },              weight: 1, shopCost: 7, passives: ['frost_resistance'], description: '+1 INT. Icy protective ward. Grants Frost Resistance.' },
  living_shield:         { id: 'living_shield',         name: 'Living Shield',         slot: 'offhand',  stats: { defense: 3, con: 1 },              weight: 2, shopCost: 8, passives: ['regeneration', 'thorns'], combatLockBonus: 10, description: '+1 CON. Grows and mends. +10% combat lock chance. Grants Regeneration & Thorns.' },
  mirror_shield:         { id: 'mirror_shield',         name: 'Mirror Shield',         slot: 'offhand',  stats: { defense: 2, agi: 1 },              weight: 2, shopCost: 9, passives: ['reflect', 'magic_resistance'], combatLockBonus: 10, description: '+1 AGI. Reflects spells and projectiles. +10% combat lock chance. Grants Reflect & Magic Resistance.' },
  warhorn:               { id: 'warhorn',               name: 'Warhorn',               slot: 'offhand',  stats: { str: 1, con: 1 },                  weight: 1, shopCost: 9, description: 'Grants Battle Cry: +2 ATK to all adjacent allies for 2 turns.', action: 'battle_cry' },
  lantern_of_souls:      { id: 'lantern_of_souls',      name: 'Lantern of Souls',      slot: 'offhand',  stats: { int: 3 },                          weight: 1, shopCost: 10, passives: ['vampirism'], description: '+3 INT. Feeds on fallen spirits. Grants Vampirism.' },
  orb_of_fire:           { id: 'orb_of_fire',           name: 'Orb of Fire',           slot: 'offhand',  stats: {},                                  weight: 1, shopCost: 9, onHit: { effect: 'burning', chance: 100 }, description: 'Wreathed in flame. Attacks inflict Burning.' },
  orb_of_frost:          { id: 'orb_of_frost',          name: 'Orb of Frost',          slot: 'offhand',  stats: {},                                  weight: 1, shopCost: 9, onHit: { effect: 'frozen', chance: 100 }, description: 'Bitter cold radiates. Attacks inflict Freeze.' },
  orb_of_poison:         { id: 'orb_of_poison',         name: 'Orb of Poison',         slot: 'offhand',  stats: {},                                  weight: 1, shopCost: 8, onHit: { effect: 'poison', chance: 100 }, description: 'Drips with venom. Attacks inflict Poison.' },
  orb_of_lightning:      { id: 'orb_of_lightning',      name: 'Orb of Lightning',      slot: 'offhand',  stats: {},                                  weight: 1, shopCost: 10, chainLightning: { chance: 100, damage: 2 }, description: 'Crackling energy. Attacks chain lightning to adjacent enemies for 2 damage.' },
  orb_of_vampirism:      { id: 'orb_of_vampirism',      name: 'Orb of Vampirism',      slot: 'offhand',  stats: {},                                  weight: 1, shopCost: 9, passives: ['vampirism'], description: 'Pulses with dark hunger. Attacks drain life (heal on hit).' },
  tome_of_curses:        { id: 'tome_of_curses',        name: 'Tome of Curses',        slot: 'offhand',  stats: { int: 2 },                          weight: 1, shopCost: 7, onHit: { effect: 'cursed', chance: 35 }, description: '+2 INT. Whispers dark hexes. 35% chance to Curse on hit.' },
  shrunken_head:         { id: 'shrunken_head',         name: 'Shrunken Head',         slot: 'offhand',  stats: { int: 1, con: 1 },                  weight: 0, shopCost: 6, passives: ['poison_resistance'], onHit: { effect: 'weakened', chance: 25 }, description: '+1 INT, +1 CON. Macabre talisman. 25% chance to Weaken. Grants Poison Resistance.' },
  // Wave 10 — bleeding offhand
  serrated_buckler:      { id: 'serrated_buckler',      name: 'Serrated Buckler',      slot: 'offhand',  stats: { defense: 1 },                       weight: 1, shopCost: 4, onHit: { effect: 'bleeding', chance: 100 }, combatLockBonus: 5, description: '+1 DEF. Jagged rim cuts on contact. 100% Bleeding. +5% combat lock.' },
  carrot_on_a_stick:     { id: 'carrot_on_a_stick',     name: 'Personal Carrot on a Stick', slot: 'offhand', stats: {},                              weight: 0, shopCost: 10, moveBonus: 3, description: 'Always just out of reach. +3 movement speed.' },
  bucket_of_water:       { id: 'bucket_of_water',       name: 'Bucket of Water',       slot: 'offhand',  stats: { defense: 1 },                      weight: 1, shopCost: 4, passives: ['fire_resistance'], description: '+1 DEF. A sloshing bucket. Immune to Burning. Grants Fire Resistance.' },
  pot_of_boiling_water:  { id: 'pot_of_boiling_water',  name: 'Pot of Boiling Water',  slot: 'offhand',  stats: { defense: 1 },                      weight: 1, shopCost: 3, passives: ['fire_resistance'], boilingWater: true, description: '+1 DEF. Scalding hot. Immune to Burning, but take 1 damage each time fire is extinguished. Grants Fire Resistance.' },

  // --- Accessory ---
  ring_of_power:        { id: 'ring_of_power',        name: 'Ring of Power',         slot: 'accessory', stats: { str: 3, attack: 1 },             weight: 0, shopCost: 9, description: '+3 STR. Pulses with energy.' },
  amulet_of_protection: { id: 'amulet_of_protection', name: 'Amulet of Protection',  slot: 'accessory', stats: { defense: 2, con: 2 },            weight: 0, shopCost: 8, description: '+2 CON. Wards off harm.' },
  lucky_charm:          { id: 'lucky_charm',          name: 'Lucky Charm',           slot: 'accessory', stats: { str: 1, agi: 1, con: 1, int: 1 }, weight: 0, shopCost: 7, description: '+1 to all stats.' },
  cloak_pin_of_shadows: { id: 'cloak_pin_of_shadows', name: 'Cloak Pin of Shadows',  slot: 'accessory', stats: { agi: 3 },                        weight: 0, shopCost: 7, description: '+3 AGI. Blend into darkness.' },
  warrior_pendant:      { id: 'warrior_pendant',      name: "Warrior's Pendant",     slot: 'accessory', stats: { str: 2, con: 1 },                weight: 0, shopCost: 6, description: '+2 STR, +1 CON. A soldier\'s heirloom.' },
  berserker_torc:        { id: 'berserker_torc',        name: 'Berserker\'s Torc',     slot: 'accessory', stats: { str: 3 },                        weight: 0, shopCost: 11, description: '+3 STR. Grants Berserk: +5 ATK, -3 DEF this turn.', action: 'berserk' },
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
  amulet_of_evasion:     { id: 'amulet_of_evasion',     name: 'Amulet of Evasion',     slot: 'accessory', stats: { },                        weight: 0, shopCost: 8, passives: ['evasion'], description: '+1 AGI. Shimmers when danger approaches. +10% dodge chance. Grants Evasion.' },
  atlas_charm:           { id: 'atlas_charm',           name: "Atlas' Charm",          slot: 'accessory', stats: { str: 1 },                     weight: 0, shopCost: 12, passives: ['weightless'], description: '+1 STR. A titan\'s gift — equipment feels light as air. Grants Weightless (ignore weight penalties).' },

  // --- Wave 3: Special Items ---
  mechanical_arm:       { id: 'mechanical_arm',       name: 'Mechanical Arm Extender', slot: 'accessory', stats: {},                               weight: 1, shopCost: 10, passives: ['extended_reach'], description: 'Extends melee weapon reach by 1 tile. Grants Extended Reach.' },
  lute:                 { id: 'lute',                 name: 'Lute',                    slot: 'mainhand', stats: { attack: 0 },                     weight: 1, shopCost: 12, twoHanded: true, noAttack: true, passives: ['bardic_inspiration'], description: 'Cannot attack. Aura: +2 ATK to allies within 3 tiles. Two-handed.' },
  harp:                 { id: 'harp',                 name: 'Harp',                    slot: 'mainhand', stats: { attack: 0 },                     weight: 1, shopCost: 12, twoHanded: true, noAttack: true, passives: ['bardic_dance', 'bardic_range'], description: 'Cannot attack. Aura: +10% dodge and +1 ranged weapon range to allies within 3 tiles. Two-handed.' },
  bugle:                { id: 'bugle',                name: 'Bugle',                   slot: 'mainhand', stats: { attack: 0 },                     weight: 1, shopCost: 10, noAttack: true, action: 'crescendo', description: 'Cannot attack. Grants Crescendo: +4 ATK to allies within 3 tiles. 2 turn CD. One-handed.' },
  war_drum:             { id: 'war_drum',             name: 'War Drum',                slot: 'mainhand', stats: { attack: 0 },                     weight: 2, shopCost: 10, twoHanded: true, noAttack: true, action: 'battle_march', description: 'Cannot attack. Grants Battle March: +3 movement to allies within 2 tiles. 2 turn CD. Two-handed.' },
  suicide_vest:         { id: 'suicide_vest',         name: 'Suicide Vest',            slot: 'body',     stats: {},                                weight: 1, shopCost: 8, action: 'detonate', description: 'Grants Detonate: kill self and deal 10 damage to all units within 3 tiles.' },
  scope:                { id: 'scope',                name: 'Scope',                   slot: 'accessory', stats: {},                               weight: 0, shopCost: 9, passives: ['scope_range'], description: '+1 range for bows, crossbows, and magic ranged weapons. Grants Scope.' },
  precision_scope:      { id: 'precision_scope',      name: 'Precision Scope',         slot: 'accessory', stats: {},                               weight: 0, shopCost: 11, action: 'precision_shot', description: 'Grants Precision Shot: guaranteed ranged hit (ranged weapons only). 3 turn CD.' },
  grappling_hook:       { id: 'grappling_hook',       name: 'Grappling Hook',          slot: 'offhand',  stats: {},                                weight: 1, shopCost: 10, action: 'grapple', description: 'Grants Grapple: pull any unit 2-5 tiles away to an adjacent tile and combat lock them. 2 turn CD.' },
  net:                  { id: 'net',                  name: 'Net',                     slot: 'offhand',  stats: {},                                weight: 1, shopCost: 9, action: 'ensnare', description: 'Grants Ensnare: immobilize a unit within 3 tiles for 2 turns. 4 turn CD.' },
  cracked_halo:         { id: 'cracked_halo',         name: 'Cracked Halo',            slot: 'head',     stats: {},                                weight: 0, shopCost: 11, action: 'divine_barrier', description: 'Grants Divine Barrier: gain 10 temporary HP for 3 turns. 3 turn CD.' },
  ring_of_regeneration: { id: 'ring_of_regeneration', name: 'Ring of Regeneration',    slot: 'accessory', stats: {},                               weight: 0, shopCost: 8, passives: ['regeneration'], description: 'Passive +1 HP regen per turn. Grants Regeneration.' },
  // ---- Hands (Gloves) ----
  leather_gloves:        { id: 'leather_gloves',        name: 'Leather Gloves',         slot: 'hands',    stats: { defense: 1 },                       weight: 0, shopCost: 2, description: 'Simple leather grips. +1 DEF.' },
  iron_gauntlets:        { id: 'iron_gauntlets',        name: 'Iron Gauntlets',         slot: 'hands',    stats: { str: 1, defense: 1 },              weight: 2, shopCost: 5, description: '+1 STR, +1 DEF. Heavy but protective.' },
  thiefs_gloves:         { id: 'thiefs_gloves',         name: "Thief's Gloves",         slot: 'hands',    stats: { agi: 3 },                          weight: 0, shopCost: 7, passives: ['evasion'], description: '+3 AGI. Nimble fingers. Grants Evasion (+10% dodge).' },
  spiked_knuckles:       { id: 'spiked_knuckles',       name: 'Spiked Knuckles',        slot: 'hands',    stats: { attack: 2, str: 2 },               weight: 1, shopCost: 9, passives: ['piercing'], description: '+2 ATK, +2 STR. Brutal striking power. Grants Piercing (-2 enemy DEF).' },
  menders_wraps:         { id: 'menders_wraps',         name: "Mender's Wraps",         slot: 'hands',    stats: { int: 3, con: 1 },                  weight: 0, shopCost: 8, passives: ['regeneration'], description: '+3 INT, +1 CON. Blessed bandages that mend wounds. Grants Regeneration.' },
  gauntlets_of_grabbing: { id: 'gauntlets_of_grabbing', name: 'Gauntlets of Grabbing',  slot: 'hands',    stats: { str: 2, defense: 1 },              weight: 2, shopCost: 10, action: 'grab', combatLockBonus: 15, description: '+2 STR, +1 DEF. Grants Grab: combat lock an adjacent enemy for 1 turn. +15% combat lock chance. 2 turn CD.' },
  grippers:              { id: 'grippers',              name: 'Grippers',               slot: 'hands',    stats: {},                                   weight: 0, shopCost: 11, passives: ['dual_grip'], description: 'No stats. Allows equipping an offhand item while wielding a two-handed weapon. Grants Dual Grip.' },
  gloves_of_haste:      { id: 'gloves_of_haste',      name: 'Gloves of Haste',       slot: 'hands',    stats: { attack: 1, agi: 1 },              weight: 0, shopCost: 12, description: 'Grants Double Strike action.', action: 'double_strike' },
  climbers_grips:        { id: 'climbers_grips',        name: "Climber's Grips",        slot: 'hands',    stats: { agi: 1, str: 1 },                  weight: 0, shopCost: 5, passives: ['climbing'], description: '+1 AGI, +1 STR. Sure grip for any surface. Grants Climbing.' },
  gauntlets_of_retribution: { id: 'gauntlets_of_retribution', name: 'Gauntlets of Retribution', slot: 'hands', stats: { defense: 1, str: 1 },           weight: 2, shopCost: 8, passives: ['retaliate'], description: '+1 DEF, +1 STR. Strike back when struck. Grants Retaliate.' },
  plated_gauntlets:      { id: 'plated_gauntlets',      name: 'Plated Gauntlets',       slot: 'hands',    stats: { defense: 1 },                      weight: 2, shopCost: 6, passives: ['bulwark'], description: '+1 DEF. Heavy iron plates absorb blows. Grants Bulwark (-1 dmg taken).' },


  // ---- Special Items ----
  horse:                 { id: 'horse',                 name: 'Horse',                  slot: 'accessory', stats: {},                                weight: 0, shopCost: 14, passives: ['mounted'], description: 'Mounted movement. Extremely fast. Grants Mounted (+5 move).' },
  accordion:             { id: 'accordion',             name: 'Accordion',              slot: 'mainhand', stats: { attack: 0, int: 2 },               weight: 2, shopCost: 12, twoHanded: true, noAttack: true, passives: ['discordant_aura'], description: '+2 INT. Cannot attack. Aura: -15% dodge to enemies within 3 tiles. Two-handed.' },
  gladiator_net:         { id: 'gladiator_net',         name: 'Gladiator Net',          slot: 'offhand',  stats: { defense: 1 },                      weight: 1, shopCost: 10, combatLockBonus: 80, description: '+1 DEF. Entangling mesh. +80% combat lock chance (100% total with base 20%).' },
  // ---- Wave 6 — new items ----
  fishing_rod:            { id: 'fishing_rod',            name: 'Fishing Rod',            slot: 'mainhand', stats: { attack: 0 },                       weight: 1, shopCost: 6, twoHanded: true, noAttack: true, action: 'fish', description: 'Cannot attack. Target adjacent water to catch a Fresh Fish. 2 turn CD.' },
  double_edged_sword:     { id: 'double_edged_sword',     name: 'Double Edged Sword',     slot: 'mainhand', stats: { attack: 3 },                       weight: 3, shopCost: 12, twoHanded: true, onHit: { effect: 'bleeding', chance: 100 }, selfBleed: true, description: '+3 ATK. Attacks hit TWICE. Always causes bleeding to yourself on each hit. 100% to bleed target. Two-handed.' },
  third_leg:              { id: 'third_leg',              name: 'Third Leg',              slot: 'accessory', stats: { agi: 1, con: 1 },                  weight: 0, shopCost: 10, passives: ['haste'], description: '+1 AGI, +1 CON. Grants Haste (+2 movement). If you know what I mean.' },
  pocket_pooka:           { id: 'pocket_pooka',           name: 'Pocket Pooka',           slot: 'accessory', stats: { int: 2 },                          weight: 0, shopCost: 16, action: 'summon_pooka', description: '+2 INT. Summon a powerful Pooka that fights for you. 5 turn CD.' },
  tome_of_summon_zombie:  { id: 'tome_of_summon_zombie',  name: 'Tome of Summon Zombie',  slot: 'offhand',  stats: { int: 1 },                          weight: 1, shopCost: 10, action: 'summon_zombie', description: '+1 INT. Summon a Zombie Warrior on an adjacent tile. 4 turn CD.' },
  boomerang:              { id: 'boomerang',              name: 'Boomerang',              slot: 'mainhand', stats: { attack: 3, agi: 1 },               weight: 1, shopCost: 10, range: 4, noAttack: true, action: 'boomerang_throw', description: '+3 ATK, +1 AGI. Cannot normal attack. Boomerang Throw: hit all enemies in a line (up to 4 tiles).' },
  // Wave 9 — new items
  windstrike_blade:    { id: 'windstrike_blade',    name: 'Windstrike Blade',    slot: 'mainhand', stats: { attack: 5, str: 1, agi: 1 },     weight: 3, shopCost: 13, twoHanded: true, selfBuffOnHit: { effect: 'hastened', chance: 100 }, description: '+1 STR, +1 AGI. Gains +3 movement for 3 turns on hit. Two-handed.' },
  madmans_greatsword:       { id: 'madmans_greatsword',       name: "Madman's Greatsword",      slot: 'mainhand', stats: { attack: 4 },                      weight: 4, shopCost: 14, twoHanded: true, passives: ['unarmored_fury'], description: '+4 ATK. If wearing no other gear (besides an accessory): +5 ATK, +3 movement, but DEF set to 0. Grants Unarmored Fury. Two-handed.' },
  keen_blade:               { id: 'keen_blade',               name: 'Keen Blade',               slot: 'mainhand', stats: { attack: 3, agi: 1 },              weight: 1, shopCost: 9, critBonus: 10, description: '+1 AGI. Razor-sharp edge. +10% crit chance.' },
  // Wave 10 — bleeding weapons (one-handed)
  rusty_shiv:                { id: 'rusty_shiv',                name: 'Rusty Shiv',                slot: 'mainhand', stats: { attack: 1 },                      weight: 0, shopCost: 2, onHit: { effect: 'bleeding', chance: 100 }, description: 'A filthy rusted blade. 100% chance to inflict Bleeding.' },
  barbed_flail:              { id: 'barbed_flail',              name: 'Barbed Flail',              slot: 'mainhand', stats: { attack: 3, str: 2 },              weight: 3, shopCost: 8, onHit: { effect: 'bleeding', chance: 100 }, description: '+2 STR. Hooked chain tears flesh. 100% chance to inflict Bleeding.' },
  bloodletters_knife:        { id: 'bloodletters_knife',        name: "Bloodletter's Knife",       slot: 'mainhand', stats: { attack: 2, agi: 2 },              weight: 1, shopCost: 7, onHit: { effect: 'bleeding', chance: 100 }, critBonus: 5, description: '+2 AGI. Surgical strikes open wounds. 100% Bleeding. +5% crit chance.' },
  hooked_dagger:             { id: 'hooked_dagger',             name: 'Hooked Dagger',             slot: 'mainhand', stats: { attack: 2, agi: 1 },              weight: 1, shopCost: 6, combatLockBonus: 50, description: '+1 AGI. Curved hook catches flesh. +50% combat lock chance (70% total).' },
  gauntlets_of_precision:   { id: 'gauntlets_of_precision',   name: 'Gauntlets of Precision',   slot: 'hands',    stats: { agi: 1 },                  weight: 0, shopCost: 8, critBonus: 10, description: '+1 AGI. Steady hands for lethal strikes. +10% crit chance.' },
  ring_of_precision:        { id: 'ring_of_precision',        name: 'Ring of Precision',        slot: 'accessory', stats: { },                         weight: 0, shopCost: 7, critBonus: 5, description: 'Sharpens focus. +5% crit chance.' },
  // Wave 12 — retaliation items
  ogre_head_on_a_stick:      { id: 'ogre_head_on_a_stick',      name: 'Ogre Head on a Stick',      slot: 'mainhand', stats: { attack: 3, str: 1 },              weight: 3, shopCost: 9, passives: ['retaliate'], description: '+1 STR. A severed ogre head that still bites back. Grants Retaliate.' },
  gloves_of_retaliation:     { id: 'gloves_of_retaliation',     name: 'Gloves of Retaliation',     slot: 'hands',    stats: {},                                   weight: 1, shopCost: 7, passives: ['retaliate'], description: 'Enchanted gloves that punish aggressors. Grants Retaliate.' },
  eyes_on_back_of_head:      { id: 'eyes_on_back_of_head',      name: 'Eyes on Back of Head',      slot: 'accessory', stats: {},                                  weight: 0, shopCost: 8, passives: ['retaliate'], description: 'Unsettling magical eyes that see all angles. Grants Retaliate.' },
  karmic_shield:             { id: 'karmic_shield',             name: 'Karmic Shield',             slot: 'offhand',  stats: { defense: 3 },                      weight: 3, shopCost: 8, passives: ['retaliate'], combatLockBonus: 10, description: '+3 DEF. What goes around comes around. +10% combat lock chance. Grants Retaliate.' },
  spiteful_flail:            { id: 'spiteful_flail',            name: 'Spiteful Flail',            slot: 'mainhand', stats: { attack: 5, str: 2 },              weight: 4, shopCost: 12, twoHanded: true, passives: ['retaliate'], description: '+2 STR. A cruel spiked flail that strikes back with vengeance. Grants Retaliate. Two-handed.' },
  // Wave 13 — executioner items
  headsmans_greataxe:        { id: 'headsmans_greataxe',        name: "Headsman's Greataxe",       slot: 'mainhand', stats: { attack: 6, str: 2 },              weight: 5, shopCost: 13, twoHanded: true, passives: ['executioner'], description: '+2 STR. Finish them. Deal double damage to enemies below 25% HP. Grants Executioner. Two-handed.' },
  executioners_hood:         { id: 'executioners_hood',         name: "Executioner's Hood",        slot: 'head',     stats: { str: 2 },                          weight: 1, shopCost: 8, passives: ['executioner'], description: '+2 STR. The masked face of final judgment. Grants Executioner.' },
  ring_of_the_coup_de_grace: { id: 'ring_of_the_coup_de_grace', name: 'Ring of the Coup de Gr\u00e2ce', slot: 'accessory', stats: { attack: 1 },                    weight: 0, shopCost: 9, passives: ['executioner'], description: '+1 ATK. Sense weakness, strike true. Grants Executioner.' },
  // Wave 13 — sundering blows items
  sunder_maul:               { id: 'sunder_maul',               name: 'Sunder Maul',               slot: 'mainhand', stats: { attack: 4, str: 2 },              weight: 4, shopCost: 11, twoHanded: true, passives: ['sundering_blows'], description: '+2 STR. Shatters armor with every swing. Attacks apply Sundered (-2 DEF). Grants Sundering Blows. Two-handed.' },
  gauntlets_of_ruin:         { id: 'gauntlets_of_ruin',         name: 'Gauntlets of Ruin',         slot: 'hands',    stats: { str: 2 },                          weight: 2, shopCost: 9, passives: ['sundering_blows'], description: '+2 STR. Corrode armor on contact. Attacks apply Sundered (-2 DEF). Grants Sundering Blows.' },
  // Wave 13 — overwatch items
  flintlock_rifle:           { id: 'flintlock_rifle',           name: 'Flintlock Rifle',           slot: 'mainhand', stats: { attack: 5 },                      weight: 3, shopCost: 14, twoHanded: true, range: 5, passives: ['overwatch'], description: 'Long-range firearm. Ranged (5). Fires at enemies who move into range. Grants Overwatch. Two-handed.' },
  watchtower_pendant:        { id: 'watchtower_pendant',        name: 'Watchtower Pendant',        slot: 'accessory', stats: { int: 1, agi: 1 },                 weight: 0, shopCost: 10, passives: ['overwatch'], description: '+1 INT, +1 AGI. Ever-vigilant eye. Fires at enemies who enter weapon range. Grants Overwatch.' },
  // Wave 13 — stone skin items
  petrified_buckler:         { id: 'petrified_buckler',         name: 'Petrified Buckler',         slot: 'offhand',  stats: { defense: 3, con: 1 },              weight: 3, shopCost: 8, passives: ['stone_skin_passive'], combatLockBonus: 5, description: '+1 CON. Fossilized wood turned to stone. Immune to Bleeding & Poison. +5% combat lock. Grants Stone Skin.' },
  // Wave 13 — martyr items
  martyrs_vestments:         { id: 'martyrs_vestments',         name: "Martyr's Vestments",        slot: 'body',     stats: { defense: 2, con: 3 },              weight: 1, shopCost: 9, passives: ['martyr'], description: '+2 DEF, +3 CON. When you fall, adjacent allies heal 10 HP. Destroyed on death. Grants Martyr.' },
  sacrificial_scarf:         { id: 'sacrificial_scarf',         name: 'Sacrificial Scarf',         slot: 'head',     stats: { defense: 1, con: 2, int: 1 },      weight: 0, shopCost: 9, passives: ['martyr'], description: '+1 DEF, +2 CON, +1 INT. Woven from blessed threads. When you fall, adjacent allies heal 10 HP. Destroyed on death. Grants Martyr.' },
  // Wave 13 — jinx items
  voodoo_fiddle:             { id: 'voodoo_fiddle',             name: 'Voodoo Fiddle',             slot: 'mainhand', stats: { attack: 0, int: 3 },               weight: 2, shopCost: 11, twoHanded: true, noAttack: true, passives: ['jinx'], description: '+3 INT. Cannot attack. Eerie melodies hex nearby foes. Adjacent enemies have -15% crit chance. Grants Jinx. Two-handed.' },
  // Wave 13 — momentum items
  boots_of_momentum:         { id: 'boots_of_momentum',         name: 'Boots of Momentum',         slot: 'feet',     stats: { agi: 2, str: 1 },                  weight: 1, shopCost: 9, passives: ['momentum'], description: '+2 AGI, +1 STR. Build speed into power. Every 3 tiles moved grants +1 ATK. Grants Momentum.' },
  charging_lance:            { id: 'charging_lance',            name: 'Charging Lance',            slot: 'mainhand', stats: { attack: 4, agi: 2 },              weight: 3, shopCost: 11, twoHanded: true, passives: ['momentum'], description: '+2 AGI. Build up devastating impact. Every 3 tiles moved grants +1 ATK. Grants Momentum. Two-handed.' },
  // Excalibur — granted by consumable
  excalibur:                 { id: 'excalibur',                 name: 'Excalibur',                 slot: 'mainhand', stats: { attack: 7, str: 3, con: 2 },     weight: 3, shopCost: 20, twoHanded: true, passives: ['piercing'], onHit: { effect: 'weakened', chance: 50 }, description: '+3 STR, +2 CON. The legendary blade of kings. 50% chance to Weaken. Grants Vampirism & Piercing. Two-handed.' },
};

// ============================================================
// CONSUMABLES — single-use items, consumed on use
// ============================================================
const CONSUMABLES = {
  healing_potion:   { id: 'healing_potion',   name: 'Healing Potion',   icon: '🧪', consumable: true, shopCost: 3, spawnIn: ['beast', 'vendor'], description: 'Restores 8 HP instantly.' },
  speed_potion:     { id: 'speed_potion',     name: 'Speed Potion',     icon: '💨', consumable: true, shopCost: 3, spawnIn: ['beast', 'vendor'], description: '+4 movement for this turn.' },
  rage_potion:      { id: 'rage_potion',      name: 'Rage Potion',      icon: '🔴', consumable: true, shopCost: 4, spawnIn: ['beast', 'vendor'], description: '+4 ATK for this turn.' },
  stoneskin_potion: { id: 'stoneskin_potion', name: 'Stoneskin Potion', icon: '🪨', consumable: true, shopCost: 4, spawnIn: ['beast', 'vendor'], description: '+4 DEF until end of next turn.' },
  treasure_chest:   { id: 'treasure_chest',   name: 'Treasure Chest',   icon: '💰', consumable: true, shopCost: 3, spawnIn: ['ground', 'beast'], description: 'Opens to reveal 3–5 gold.' },
  lumber_pile:      { id: 'lumber_pile',      name: 'Lumber Pile',      icon: '🪵', consumable: true, shopCost: 3, spawnIn: ['ground', 'beast'], description: 'Collect for 3–5 wood.' },
  stone_pile:       { id: 'stone_pile',       name: 'Stone Pile',       icon: '🧱', consumable: true, shopCost: 3, spawnIn: ['ground', 'beast'], description: 'Collect for 3–5 stone.' },
  water_pouch:      { id: 'water_pouch',      name: 'Water Pouch',      icon: '💧', consumable: true, shopCost: 3, spawnIn: ['ground', 'beast'], description: 'Drink for 3–5 water.' },
  potion_pouch:     { id: 'potion_pouch',     name: 'Potion Pouch',     icon: '🎒', consumable: true, passive: true, shopCost: 5, spawnIn: ['beast', 'vendor'], description: 'Generates a Healing Potion every 2 turns.' },
  fresh_fish:       { id: 'fresh_fish',       name: 'Fresh Fish',       icon: '🐟', consumable: true, shopCost: 2, spawnIn: ['beast'], description: 'Restores 4 HP.' },
  petroleum_jelly:  { id: 'petroleum_jelly',  name: 'Petroleum Jelly',  icon: '🫧', consumable: true, shopCost: 5, spawnIn: ['beast', 'vendor'], description: '100% dodge chance for 2 turns.' },
  seed_of_god:      { id: 'seed_of_god',      name: 'Seed of God',      icon: '🌱', consumable: true, shopCost: 4, spawnIn: ['beast', 'vendor'], description: 'Grow a grove of trees around you.' },
  muscle_growth_serum: { id: 'muscle_growth_serum', name: 'Muscle Growth Serum', icon: '💪', consumable: true, shopCost: 6, spawnIn: ['beast', 'vendor'], description: 'Permanently gain +1 STR.' },
  brain_growth_serum:  { id: 'brain_growth_serum',  name: 'Brain Growth Serum',  icon: '🧠', consumable: true, shopCost: 6, spawnIn: ['beast', 'vendor'], description: 'Permanently gain +1 INT.' },
  tendon_tautacity_serum: { id: 'tendon_tautacity_serum', name: 'Tendon Tautacity Serum', icon: '🦵', consumable: true, shopCost: 6, spawnIn: ['beast', 'vendor'], description: 'Permanently gain +1 AGI.' },
  skin_thickening_serum: { id: 'skin_thickening_serum', name: 'Skin Thickening Serum', icon: '🛡️', consumable: true, shopCost: 6, spawnIn: ['beast', 'vendor'], description: 'Permanently gain +1 CON.' },
  magic_mirror:     { id: 'magic_mirror',     name: 'Magic Mirror',     icon: '🪞', consumable: true, shopCost: 6, spawnIn: ['beast', 'vendor'], description: 'Duplicate an item in your inventory.' },
  communist_manifesto: { id: 'communist_manifesto', name: 'Communist Manifesto', icon: '📕', consumable: true, shopCost: 5, spawnIn: ['ground', 'beast', 'vendor'], description: 'All enemy workers go on strike and cannot gather for 2 turns.' },
  strange_poultice: { id: 'strange_poultice', name: 'Strange Poultice', icon: '🩹', consumable: true, shopCost: 4, spawnIn: ['beast', 'vendor'], description: 'Grants +10 temporary HP for 3 turns.' },
  scroll_of_archers: { id: 'scroll_of_archers', name: 'Scroll of Archers', icon: '📜', consumable: true, shopCost: 6, spawnIn: ['ground', 'beast', 'vendor'], description: 'Summon 2 weak archers with crossbows on adjacent tiles.' },
  regeneration_potion: { id: 'regeneration_potion', name: 'Regeneration Potion', icon: '💚', consumable: true, shopCost: 5, spawnIn: ['ground', 'beast', 'vendor'], description: 'Grants Regeneration for 5 turns.' },
  paste_of_reaping:    { id: 'paste_of_reaping',    name: "Paste of Reaping What One Sow's", icon: '🩸', consumable: true, shopCost: 7, spawnIn: ['beast', 'vendor'], description: 'Permanently grants the Retaliate passive.' },
  hardening_clay:      { id: 'hardening_clay',      name: 'Hardening Clay',      icon: '🪨', consumable: true, shopCost: 7, spawnIn: ['beast', 'vendor'], description: 'Permanently grants the Stone Skin passive (immune to Bleeding & Poison).' },
  combat_regen_potion: { id: 'combat_regen_potion', name: 'Combat Regen Potion', icon: '❤️‍🔥', consumable: true, shopCost: 8, spawnIn: ['ground', 'beast', 'vendor'], description: 'Grants Regeneration for 5 turns that also works in combat.' },
  treasure_map:        { id: 'treasure_map',        name: 'Treasure Map',        icon: '🗺️', consumable: true, shopCost: 6, spawnIn: ['ground', 'beast', 'vendor'], description: 'Reveals the location of buried treasure — spawns a high-value item somewhere on the map.' },
  excalibur_stone:     { id: 'excalibur_stone',     name: 'Embedded Excalibur', icon: '⚔️', consumable: true, shopCost: 0, spawnIn: ['ground'], description: 'A legendary sword lodged in stone. Requires 5+ STR to pull free. Grants Excalibur on use.' },
  asbestos_applicator: { id: 'asbestos_applicator', name: 'Asbestos Applicator', icon: '🧯', consumable: true, shopCost: 8, spawnIn: ['vendor'], description: 'Permanently grants Fire Resistance (immune to Burning).' },
};

const CONSUMABLE_IDS = Object.keys(CONSUMABLES);
const GROUND_CONSUMABLES = CONSUMABLE_IDS.filter(id => CONSUMABLES[id].spawnIn.includes('ground'));
const BEAST_CONSUMABLES = CONSUMABLE_IDS.filter(id => CONSUMABLES[id].spawnIn.includes('beast'));
const VENDOR_CONSUMABLES = CONSUMABLE_IDS.filter(id => CONSUMABLES[id].spawnIn.includes('vendor'));

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
  'inferno_plate', 'venomspine_mail', 'bucket_of_water', 'pot_of_boiling_water'
];

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
    cost: { wood: 3, stone: 2, gold: 1, water: 0 },
    startingEquipment: { head: 'iron_helm', body: 'chain_mail', legs: 'leather_leggings', feet: 'leather_boots', mainhand: 'short_sword', offhand: 'wooden_shield', accessory: null }
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
    cost: { wood: 5, stone: 3, gold: 2, water: 0 },
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
  }
};

const RESOURCE_TYPES = ['wood', 'stone', 'gold', 'water'];
const RESOURCE_CHARS = { wood: '♣', stone: '●', gold: '★', water: '~' };
const RESOURCE_COLORS = { wood: '#228B22', stone: '#8B0000', gold: '#DAA520', water: '#4682B4' };
const RESOURCE_WEIGHTS = { wood: 8, stone: 7, gold: 5, water: 5 };
const RESOURCE_DENSITY = 0.5;

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
  barracks: {
    name: 'Barracks',
    char: '⌂',
    hp: 20,
    cost: { wood: 5, stone: 5, gold: 0, water: 0 },
    description: 'Allows production of Warriors and Heroes.',
    unlocksUnits: ['warrior', 'hero']
  },
  elite_hall: {
    name: 'Elite Hall',
    char: '⚑',
    hp: 25,
    cost: { wood: 12, stone: 12, gold: 0, water: 0 },
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
      kobolds: 'Warren'
    }
  }
};

// ============================================================
// GAME STATE
// ============================================================
let G = null;
let selectedUnitId = null;
let selectedGroundTile = null;
let selectedShop = null;
let selectedVendor = null;
let selectedBazaar = null;
let selectedStructure = null;
let selectedTunnel = null;
let interactionMode = 'idle';
let mirrorPending = null;
let placingUnitType = null;
let placingStructureType = null;
let reachableTiles = [];
let nextUnitId = 0;

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
  arcane_blast:     3,  // INT-scaled magic damage, 70% hit
  blade_dance:      2,  // AoE attack on all adjacent
  blood_frenzy:     3,  // +4 ATK + heal-to-full on kill
  rune_of_shatter:  3,  // AoE DEF shatter
  divine_shield:    2,  // +5 DEF to group
  aimed_shot:       2,  // Guaranteed hit ignoring defense
  mirror_image:     3,  // Summon a mirror copy
  consecrate:       3,  // AoE damage + weaken aura
  summon_swarm:     2,  // AoE 2 damage
  hex_curse:        2,  // -3 ATK/-3 DEF debuff
  tame_beast:       2,  // Convert a Foul Beast to your team
  shield_bash:      2,  // DEF-damage + push 2 + stun
  orc_warcry:       2,  // Mass stun
  bloodrend:        2,  // Flat 5 damage to bleeding enemy
  human_rally:      1,  // Requires positioning, fine at 1
  goblin_disengage: 1,  // Defensive utility, fine at 1
  elf_leap:         1,  // Movement utility, fine at 1
  dwarf_muster:     2,  // Spawning flexibility
  // Skeleton abilities
  raise_dead:       0,  // Summon free shambling corpse
  soul_siphon:      2,  // Drain 4 HP + heal
  bone_explosion:   3,  // Sacrifice ally for AoE
  // Troll abilities
  devour:           2,  // Eat low-HP enemy
  troll_rampage:    3,  // Charge + push
  trolls_blessing:  3,  // Grant regen to group
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
  scavenge:         5,  // Find random item
  booby_trap:       4,  // Place trap
  // Item-granted abilities
  teleport_home:    5,  // Very powerful repositioning
  double_strike:    2,  // Extra free attack
  war_stomp:        2,  // AoE knockback
  heal_allies:      2,  // AoE heal
  berserk:          2,  // Big ATK boost
  // Magic weapon abilities
  fireball:         2,  // AoE fire damage + burning
  frost_ray:        2,  // Single target freeze + damage
  lightning_bolt:   2,  // Long range damage + slow
  life_drain:       3,  // Damage + self heal
  poison_cloud:     2,  // AoE poison
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
};

function getAbilityCooldown(abilityId) {
  return ABILITY_COOLDOWNS[abilityId] || 1;
}

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
  poison:   { id: 'poison',   name: 'Poison',   icon: '☠',  color: '#00CC00', dot: 1, duration: 3, desc: '2 damage per turn for 3 turns' },
  burning:  { id: 'burning',  name: 'Burning',  icon: '🔥', color: '#FF4400', dot: 2, duration: 2, desc: '3 damage per turn for 2 turns' },
  bleeding: { id: 'bleeding', name: 'Bleeding', icon: '🩸', color: '#CC0000', dot: 1, duration: 4, desc: '1 damage per turn for 4 turns' },
  weakened: { id: 'weakened', name: 'Weakened', icon: '⬇',  color: '#AA8800', atkMod: -3, duration: 2, desc: '-3 ATK for 2 turns' },
  slowed:   { id: 'slowed',   name: 'Slowed',   icon: '🐌', color: '#6688AA', moveMod: -2, duration: 2, desc: '-2 movement for 2 turns' },
  frozen:   { id: 'frozen',   name: 'Frozen',   icon: '❄',  color: '#88CCFF', duration: 2, desc: 'Cannot move for 1 turn' },
  cursed:    { id: 'cursed',    name: 'Cursed',    icon: '💀', color: '#8800AA', defMod: -3, duration: 2, desc: '-3 DEF for 2 turns' },
  shattered: { id: 'shattered', name: 'Shattered', icon: '💎', color: '#AA4400', defMod: -4, duration: 2, desc: '-4 DEF for 2 turns (armor cracked)' },
  sundered:  { id: 'sundered',  name: 'Sundered',  icon: '⚒',  color: '#996633', defMod: -2, duration: 2, desc: '-2 DEF for 2 turns (armor weakened)' },
  ensnared:  { id: 'ensnared',  name: 'Ensnared',  icon: '🕸', color: '#888888', duration: 3, desc: 'Cannot move for 2 turns (trapped in net)' },
  combat_locked: { id: 'combat_locked', name: 'Combat Locked', icon: '🔒', color: '#CC6600', duration: 2, desc: 'Locked in combat! Cannot move, leap, teleport, or disengage for 1 turn' },
  beguiled: { id: 'beguiled', name: 'Beguiled', icon: '🎵', color: '#DD88DD', duration: 1, desc: 'Enchanted by song. Can move but cannot attack, retaliate, or use abilities for 1 turn' },
  speed_boost:  { id: 'speed_boost',  name: 'Speed Boost',  icon: '💨', color: '#5744ff', moveMod: 4,  duration: 1, desc: '+4 movement this turn (Speed Potion)' },
  enraged:      { id: 'enraged',      name: 'Enraged',      icon: '🔴', color: '#FF4444', atkMod: 4,   duration: 1, desc: '+4 ATK this turn (Rage Potion)' },
  stoneskin:    { id: 'stoneskin',    name: 'Stoneskin',    icon: '🪨', color: '#AABB88', defMod: 4,   duration: 2, desc: '+4 DEF until end of next turn (Stoneskin Potion)' },
  greased:      { id: 'greased',      name: 'Greased',      icon: '🫧', color: '#EEDD44', duration: 2, desc: '100% dodge chance for 2 turns (Petroleum Jelly)' },
  on_strike:    { id: 'on_strike',    name: 'On Strike',    icon: '✊', color: '#DD2222', duration: 2, desc: 'Refusing to work! Cannot gather resources for 2 turns' },
  hastened:     { id: 'hastened',     name: 'Hastened',     icon: '⚡', color: '#44CCFF', moveMod: 3, duration: 3, desc: '+3 movement for 3 turns' },
};

// ============================================================
// PASSIVES
// ============================================================
const PASSIVES = {
  retaliate:          { id: 'retaliate',          name: 'Retaliate',          icon: '⚔', desc: '50% chance to counter-attack when hit by an adjacent unit' },
  climbing:           { id: 'climbing',           name: 'Climbing',           icon: '⛰', desc: 'Can move through rock/stone tiles' },
  water_walking:      { id: 'water_walking',      name: 'Water Walking',      icon: '🌊', desc: 'Can move through water tiles' },
  haste:              { id: 'haste',              name: 'Haste',              icon: '⚡', desc: '+2 movement speed' },
  mounted:            { id: 'mounted',            name: 'Mounted',            icon: '🐴', desc: '+5 movement speed' },
  reflect:            { id: 'reflect',            name: 'Reflect',            icon: '🔃', desc: '30% chance to reflect ranged/magic damage back at the attacker' },
  vampirism:          { id: 'vampirism',          name: 'Vampirism',          icon: '🧛', desc: 'On successful hit, heal 1-3 HP' },
  resource_gathering: { id: 'resource_gathering', name: 'Resource Gathering', icon: '⛏', desc: 'Can gather resources from adjacent tiles' },
  poison_resistance:  { id: 'poison_resistance',  name: 'Poison Resistance',  icon: '🛡', desc: 'Immune to Poison' },
  frost_resistance:   { id: 'frost_resistance',   name: 'Frost Resistance',   icon: '🧊', desc: 'Immune to Frozen' },
  fire_resistance:    { id: 'fire_resistance',    name: 'Fire Resistance',    icon: '🔥', desc: 'Immune to Burning' },
  magic_resistance:   { id: 'magic_resistance',   name: 'Magic Resistance',   icon: '✨', desc: 'Reduce magic damage by 2' },
  regeneration:       { id: 'regeneration',       name: 'Regeneration',       icon: '💚', desc: 'Heal 2 HP per turn instead of 1 when out of combat' },
  combat_regeneration: { id: 'combat_regeneration', name: 'Combat Regeneration', icon: '❤️‍🔥', desc: 'Heal 2 HP per turn instead of 1, even while adjacent to enemies' },
  thorns:             { id: 'thorns',             name: 'Thorns',             icon: '🌿', desc: 'Deal 1 damage back to melee attackers when hit' },
  steadfast:          { id: 'steadfast',          name: 'Steadfast',          icon: '🏔', desc: 'Immune to Slowed and movement reduction effects' },
  piercing:           { id: 'piercing',           name: 'Piercing',           icon: '🗡', desc: 'Attacks ignore 2 points of enemy DEF' },
  evasion:            { id: 'evasion',            name: 'Evasion',            icon: '💨', desc: '+10% bonus dodge chance' },
  bulwark:            { id: 'bulwark',            name: 'Bulwark',            icon: '🛡', desc: 'Take 1 less damage from all sources per stack (min 1). Stacks from multiple items.' },
  extended_reach:     { id: 'extended_reach',     name: 'Extended Reach',     icon: '🦾', desc: '+1 melee weapon range (melee weapons only)' },
  bardic_inspiration: { id: 'bardic_inspiration', name: 'Bardic Inspiration', icon: '🎵', desc: 'Aura: +2 ATK to allies within 3 tiles' },
  bardic_dance:       { id: 'bardic_dance',       name: 'Bardic Dance',       icon: '💃', desc: 'Aura: +10% dodge to allies within 3 tiles' },
  scope_range:        { id: 'scope_range',        name: 'Scope',              icon: '🔭', desc: '+1 ranged weapon range (bows, crossbows, magic weapons only)' },
  bardic_range:       { id: 'bardic_range',       name: 'Bardic Range',       icon: '🎶', desc: 'Aura: +1 ranged weapon range to allies within 3 tiles' },
  discordant_aura:    { id: 'discordant_aura',    name: 'Discordant Aura',    icon: '🎶', desc: 'Aura: -15% dodge to enemies within 3 tiles' },
  dual_grip:          { id: 'dual_grip',          name: 'Dual Grip',          icon: '🤲', desc: 'Can equip an offhand item while wielding a two-handed weapon' },
  static_shock:       { id: 'static_shock',       name: 'Static Shock',       icon: '⚡', desc: 'Melee attackers take 2–4 lightning damage when they hit you' },
  unarmored_fury:     { id: 'unarmored_fury',     name: 'Unarmored Fury',     icon: '💢', desc: 'If no armor is worn (head/body/legs/feet/hands/offhand), gain +5 ATK and +3 movement but DEF is set to 0' },
  sanguine_feast:     { id: 'sanguine_feast',     name: 'Sanguine Feast',     icon: '🩸', desc: 'Whenever an enemy within 5 spaces takes bleeding damage, heal for 1' },
  weightless:         { id: 'weightless',         name: 'Weightless',         icon: '🪶', desc: 'Equipment weight has no effect on movement' },
  executioner:        { id: 'executioner',        name: 'Executioner',        icon: '🪓', desc: 'Deal double damage to enemies below 25% HP' },
  sundering_blows:    { id: 'sundering_blows',    name: 'Sundering Blows',    icon: '⚒', desc: 'Attacks apply Sundered (-2 DEF for 2 turns)' },
  overwatch:          { id: 'overwatch',          name: 'Overwatch',          icon: '🎯', desc: 'Fire a ranged attack of opportunity when an enemy moves within your weapon range' },
  stone_skin_passive: { id: 'stone_skin_passive', name: 'Stone Skin',         icon: '🗿', desc: 'Immune to Bleeding and Poison' },
  martyr:             { id: 'martyr',             name: 'Martyr',             icon: '✝', desc: 'When this unit dies, all adjacent allies heal 10 HP. Martyr items are destroyed.' },
  jinx:               { id: 'jinx',               name: 'Jinx',               icon: '🧿', desc: 'Adjacent enemies have -15% crit chance' },
  momentum:           { id: 'momentum',           name: 'Momentum',           icon: '🏃', desc: 'Every 3 tiles moved before attacking grants +1 ATK to that attack' },
  inferno_armor:      { id: 'inferno_armor',      name: 'Inferno Armor',      icon: '🔥', desc: 'Melee attackers are set on fire (Burning for 2 turns)' },
  venomous_armor:     { id: 'venomous_armor',     name: 'Venomous Armor',     icon: '☠', desc: 'Melee attackers are poisoned (Poison for 3 turns)' },
  mirrored:           { id: 'mirrored',           name: 'Mirrored',           icon: '🪞', desc: 'When using a magic weapon ability, your mirror image also casts it' },
  spongey:            { id: 'spongey',            name: 'Spongey',            icon: '🧽', desc: 'Soaks 50% of damage dealt to adjacent allies — that damage is transferred to this unit instead' },
  lucky_rune:         { id: 'lucky_rune',         name: 'Lucky Rune',         icon: '🍀', desc: '50% chance to not consume a consumable when used' },
  demolitionist:      { id: 'demolitionist',      name: 'Demolitionist',      icon: '💣', desc: 'Deal double damage to structures/buildings' },
  bardic_wisdom:      { id: 'bardic_wisdom',      name: 'Bardic Wisdom',      icon: '📖', desc: 'Aura: +1 INT to allies within 3 tiles (stacks)' },
};

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
  // Passives from equipped items
  if (unit.equipment) {
    for (const slot of EQUIP_SLOTS) {
      const item = unit.equipment[slot];
      if (item && item !== '_two_handed_' && item.passives) {
        for (const p of item.passives) passives.add(p);
      }
    }
  }
  return passives;
}

function hasPassive(unit, passiveId) {
  return getUnitPassives(unit).has(passiveId);
}

function countPassive(unit, passiveId) {
  let count = 0;
  if (unit.passives) {
    for (const p of unit.passives) if (p === passiveId) count++;
  }
  if (unit.equipment) {
    for (const slot of EQUIP_SLOTS) {
      const item = unit.equipment[slot];
      if (item && item !== '_two_handed_' && item.passives) {
        for (const p of item.passives) if (p === passiveId) count++;
      }
    }
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
        unit.hp = 0;
        addLog(`☠ ${getDisplayName(unit)} has been defeated by boiling water!`);
        G.units = G.units.filter(u => u.hp > 0);
        checkPlayerElimination(unit.playerId);
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
  const existing = unit.statusEffects.find(se => se.id === effectId);
  if (existing) {
    existing.turnsLeft = Math.max(existing.turnsLeft, duration); // refresh duration
  } else {
    unit.statusEffects.push({ id: effectId, turnsLeft: duration });
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
      unit.hp -= def.dot;
      addLog(`${def.icon} ${getDisplayName(unit)} takes ${def.dot} ${def.name} damage! (${unit.hp > 0 ? unit.hp + ' HP left' : 'DEFEATED!'})`);
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
    unit.hp = 0;
    dropAllItems(unit);
    addLog(`☠ ${getDisplayName(unit)} has been killed by status effects!`);
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

  for (const slot of EQUIP_SLOTS) {
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

  // Extended Reach: +1 range for melee weapons only (no range property = melee)
  if (mainhandItem && !mainhandItem.range && getUnitPassives(unit).has('extended_reach')) {
    attackRange += 1;
  }
  // Scope: +1 range for bows, crossbows, and magic ranged weapons only
  if (mainhandItem && mainhandItem.range && getUnitPassives(unit).has('scope_range')) {
    attackRange += 1;
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
    }
  }

  // Crit bonus from items
  let itemCritBonus = 0;
  let itemCombatLockBonus = 0;
  if (unit.equipment) {
    for (const slot of EQUIP_SLOTS) {
      const item = unit.equipment[slot];
      if (item && item !== '_two_handed_') {
        if (item.critBonus) itemCritBonus += item.critBonus;
        if (item.combatLockBonus) itemCombatLockBonus += item.combatLockBonus;
      }
    }
  }
  const combatLockChance = 20 + itemCombatLockBonus;

  const seMods = getStatusEffectModifiers(unit);
  const attack = unit.attack + equipAtk + totalStr + (unit.rallyBonus || 0) + (unit.berserkBonus || 0) + (unit.battleCryBonus || 0) + bardicAtkBonus + unarmoredAtkBonus + seMods.atk;
  const intDefBonus = Math.floor(totalInt / 3); // Tactical awareness
  const defense = unarmoredZeroDef ? 0 : (unit.defense + equipDef + intDefBonus + (unit.stoneSkinBonus || 0) + (unit.divineShieldBonus || 0) - (unit.berserkPenalty || 0) + seMods.def);
  const maxHp = unit.maxHp + totalCon * 2 + (unit.tempHp || 0);
  const agiBonus = Math.floor(totalAgi / 3); // Improved scaling (was /5)
  const weightThreshold = 6 + Math.floor(totalStr / 2); // STR increases carry capacity (halved)
  const weightPenalty = hasPassive(unit, 'weightless') ? 0 : Math.max(0, Math.floor((totalWeight - weightThreshold) / 2));
  const movement = (hasStatusEffect(unit, 'frozen') || hasStatusEffect(unit, 'ensnared') || hasStatusEffect(unit, 'combat_locked')) ? 0 : Math.max(2, unit.movement + agiBonus - weightPenalty + seMods.move + (hasPassive(unit, 'haste') ? 2 : 0) + (hasPassive(unit, 'mounted') ? 5 : 0) + unarmoredMoveBonus + itemMoveBonus);
  const gatherBonus = Math.floor(totalInt / 2);

  // Jinx aura: reduce crit chance of this unit if adjacent enemies have jinx
  let jinxPenalty = 0;
  for (const enemy of allUnits) {
    if (enemy.hp > 0 && enemy.id !== unit.id && enemy.playerId !== unit.playerId &&
        isAdjacent(unit.x, unit.y, enemy.x, enemy.y)) {
      if (hasPassive(enemy, 'jinx')) jinxPenalty += 15;
    }
  }

  // Combat proc chances (percentage, 0-100)
  const dodgeChance = hasStatusEffect(unit, 'greased') ? 100 : Math.max(0, Math.min(50, totalAgi * 2 + (hasPassive(unit, 'evasion') ? 10 : 0) + bardicDodgeBonus - discordantDodgePenalty)); // AGI × 2%, cap 50%, greased = 100%
  const critChance = Math.max(0, Math.min(50, totalInt * 5 + itemCritBonus - jinxPenalty)); // INT × 5% + item crit bonus - jinx, cap 50%
  const crushChance = Math.min(30, totalStr * 3);       // STR × 3%, cap 30% — crushing blow

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
  if (item.weight) parts.push(`W:${item.weight}`);
  if (item.range) parts.push(`R:${item.range}`);
  if (item.twoHanded) parts.push('2H');
  if (item.action) parts.push('★');
  if (item.onHit) {
    const eff = STATUS_EFFECTS[item.onHit.effect];
    if (eff) parts.push(`${eff.icon}${item.onHit.chance}%`);
  }
  if (item.selfBuffOnHit) {
    const eff = STATUS_EFFECTS[item.selfBuffOnHit.effect];
    if (eff) parts.push(`self:${eff.icon}`);
  }
  if (item.critBonus) parts.push(`CRIT+${item.critBonus}%`);
  if (item.passives) {
    for (const p of item.passives) {
      const pd = PASSIVES[p];
      if (pd) parts.push(`${pd.icon}`);
    }
  }
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
      resources: { wood: 0, stone: 0, gold: 0, water: 0 },
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
    const spawnCells = [{ x: pos.hx, y: pos.hy }, { x: pos.w1x, y: pos.w1y }, { x: pos.w2x, y: pos.w2y }];
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

  // Spawn Foul Beasts (keep them away from start positions)
  const numBeasts = Math.max(2, Math.floor(boardSize * boardSize / 120));
  for (let attempt = 0, placed = 0; attempt < numBeasts * 20 && placed < numBeasts; attempt++) {
    const bx = Math.floor(Math.random() * boardSize);
    const by = Math.floor(Math.random() * boardSize);
    if (board[by][bx]) continue;
    if (units.some(u => u.x === bx && u.y === by)) continue;
    // Keep beasts away from all start positions
    if (startPositions.some(pos => chebyshevDist(pos.hx, pos.hy, bx, by) < 5)) continue;
    if (units.some(u => chebyshevDist(u.x, u.y, bx, by) < 5)) continue;
    const beast = createUnit('beast', NPC_PLAYER_ID, bx, by, '');
    const lootId = LOOT_ITEMS[Math.floor(Math.random() * LOOT_ITEMS.length)];
    beast.inventory.push(JSON.parse(JSON.stringify(ITEMS[lootId])));
    // 40% chance to also carry a random consumable
    if (Math.random() < 0.4) {
      const cId = BEAST_CONSUMABLES[Math.floor(Math.random() * BEAST_CONSUMABLES.length)];
      beast.inventory.push(JSON.parse(JSON.stringify(CONSUMABLES[cId])));
    }
    units.push(beast);
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
  interactionMode = 'idle';
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
    specialActionsUsed: [],
    rallyBonus: 0,
    stoneSkinBonus: 0,
    divineShieldBonus: 0,
    berserkBonus: 0,
    berserkPenalty: 0,
    battleCryBonus: 0,
    battleCryTurns: 0,
    trollBlessingTurns: 0,
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
    { hx: margin, hy: margin, w1x: margin + 1, w1y: margin, w2x: margin, w2y: margin + 1 },
    { hx: far, hy: margin, w1x: far - 1, w1y: margin, w2x: far, w2y: margin + 1 },
    { hx: margin, hy: far, w1x: margin + 1, w1y: far, w2x: margin, w2y: far - 1 },
    { hx: far, hy: far, w1x: far - 1, w1y: far, w2x: far, w2y: far - 1 }
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
  for (let i = 0; i < 10 && pool.length > 0; i++) {
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
        if (unit.type === 'hero' && unit.heroChoice) {
          const heroData = getHeroData(unit);
          if (heroData && heroData.char) unitChar = heroData.char;
        }
        cell.textContent = unitChar;
        cell.style.color = unit.playerId === NPC_PLAYER_ID ? BEAST_COLOR : PLAYER_COLORS[unit.playerId];
        if (unit.playerId === NPC_PLAYER_ID) cell.classList.add('beast-unit');
        if (unit.id === selectedUnitId) cell.classList.add('selected');
        // Status effect visual indicator
        if (unit.statusEffects && unit.statusEffects.length > 0) {
          cell.classList.add('unit-debuffed');
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
      } else if (resource) {
        cell.textContent = '';
        cell.style.background = RESOURCE_COLORS[resource.type];
      } else if (hasGroundItem) {
        cell.textContent = '◆';
        cell.style.color = '#FFD700';
      } else if (G.traps && G.traps.some(t => t.x === x && t.y === y && t.playerId === G.currentPlayer)) {
        cell.textContent = '⚠';
        cell.style.color = '#AA4444';
        cell.style.opacity = '0.5';
      } else if (G.tunnels && G.tunnels.some(t => t.x === x && t.y === y)) {
        const tun = G.tunnels.find(t => t.x === x && t.y === y);
        cell.textContent = tun.label === 'A' ? 'Ⓐ' : 'Ⓑ';
        cell.style.color = PLAYER_COLORS[tun.playerId];
        cell.style.opacity = '0.6';
      } else {
        cell.textContent = '·';
        cell.style.color = '#C0B898';
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
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
            cell.classList.add('highlight-attack');
          }
          // Highlight enemy structures as attackable
          if (!unit && structure && structure.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      if (interactionMode === 'gather') {
        const su = getUnit(selectedUnitId);
        if (su && resource && resource.amount > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-gather');
        }
      }
      if (interactionMode === 'pickup') {
        const su = getUnit(selectedUnitId);
        if (su && hasGroundItem && chebyshevDist(su.x, su.y, x, y) <= 1) {
          cell.classList.add('highlight-gather');
        }
      }
      if (interactionMode === 'place' && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-place');
      }
      if (interactionMode === 'place_structure' && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-place');
      }
      if (interactionMode === 'leap' && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-move');
      }
      // Targeted hero abilities
      if ((interactionMode === 'hex_curse' || interactionMode === 'arcane_blast') && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3) {
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
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Targeted magic weapon abilities
      if (['fireball', 'frost_ray', 'lightning_bolt', 'life_drain'].includes(interactionMode) && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su) {
          const suStats = getUnitStats(su);
          const range = suStats.attackRange || 3;
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Grapple: any unit 2-5 tiles away
      if (interactionMode === 'grapple' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && unit.hp > 0) {
          const dist = chebyshevDist(su.x, su.y, x, y);
          if (dist >= 2 && dist <= 5) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Ensnare: enemies within 3 tiles
      if (interactionMode === 'ensnare' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3) {
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
          if (unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
            cell.classList.add('highlight-attack');
          }
        }
      }
      // Soul Siphon: enemies within 3 tiles
      if (interactionMode === 'soul_siphon' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3) {
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
      // Tunnel Entrance A/B: adjacent empty tiles
      if ((interactionMode === 'tunnel_a' || interactionMode === 'tunnel_b') && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && !unit && !resource && isAdjacent(su.x, su.y, x, y)) {
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
        if (su && unit && unit.playerId === NPC_PLAYER_ID && unit.type === 'beast' && unit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
          cell.classList.add('highlight-gather');
        }
      }
      // Mimic: adjacent enemies that have a lastAbilityUsed
      if (interactionMode === 'mimic' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.id !== su.id && unit.playerId !== su.playerId && unit.hp > 0 && isAdjacent(su.x, su.y, x, y) && unit.lastAbilityUsed) {
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
      // Boomerang Throw: enemies on a straight line (cardinal/diagonal) within range 4
      if (interactionMode === 'boomerang_throw' && selectedUnitId !== null) {
        const su = getUnit(selectedUnitId);
        if (su && unit && unit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 4 && isOnStraightLine(su.x, su.y, x, y)) {
          cell.classList.add('highlight-attack');
        }
      }

      board.appendChild(cell);
    }
  }
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
    // Find if the current player has a unit adjacent to the shop
    const adjacentUnit = G.units.find(u =>
      u.hp > 0 && u.playerId === G.currentPlayer &&
      (isAdjacent(u.x, u.y, shop.x, shop.y) || (u.x === shop.x && u.y === shop.y))
    );
    let html = `<div class="unit-name" style="color: ${SHOP_COLOR}">$ Shop (${shop.x}, ${shop.y})</div>`;
    html += `<div style="font-size:11px;color:#888;padding:2px 4px;">Your water: <b style="color:#4682B4">${pRes.water} 💧</b></div>`;
    if (shop.items.length === 0) {
      html += `<div class="empty-slot" style="padding:6px 4px;">Sold out! Restocks every 7 turns.</div>`;
    }
    for (let i = 0; i < shop.items.length; i++) {
      const item = shop.items[i];
      const cost = item.shopCost || 5;
      const statStr = itemStatString(item);
      const canAfford = pRes.water >= cost;
      const canBuy = adjacentUnit && canAfford;
      html += `<div class="inv-item" style="margin-bottom:3px;">
        <div>
          <span class="item-name" data-tip="${item.description || ''}">${item.name}</span>
          <span class="item-stats">(${SLOT_LABELS[item.slot]}) ${statStr}</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
          <span style="color:${canAfford ? '#4682B4' : '#c44'};font-size:11px;font-weight:bold;">${cost} 💧</span>
          ${adjacentUnit ? `<button class="btn-tiny ${canBuy ? 'btn-success' : ''}" ${canBuy ? '' : 'disabled'} onclick="purchaseShopItem(${adjacentUnit.id}, ${shopIdx}, ${i})" style="font-size:10px;">Buy</button>` : ''}
        </div>
      </div>`;
      if (item.description) html += `<div style="font-size:10px;color:#555;padding:0 4px 2px;font-style:italic;">${item.description}</div>`;
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
    const adjacentUnit = G.units.find(u =>
      u.hp > 0 && u.playerId === G.currentPlayer &&
      (isAdjacent(u.x, u.y, vendor.x, vendor.y) || (u.x === vendor.x && u.y === vendor.y))
    );
    let html = `<div class="unit-name" style="color: ${VENDOR_COLOR}">☂ Refreshments Vendor (${vendor.x}, ${vendor.y})</div>`;
    html += `<div style="font-size:11px;color:#888;padding:2px 4px;">Your water: <b style="color:#4682B4">${pRes.water} 💧</b></div>`;
    if (vendor.items.length === 0) {
      html += `<div class="empty-slot" style="padding:6px 4px;">Sold out! Restocks every 4 turns.</div>`;
    }
    for (let i = 0; i < vendor.items.length; i++) {
      const item = vendor.items[i];
      const cost = item.shopCost || 3;
      const canAfford = pRes.water >= cost;
      const canBuy = adjacentUnit && canAfford;
      html += `<div class="inv-item" style="margin-bottom:3px;">
        <div>
          <span class="item-name" data-tip="${item.description || ''}">${item.icon || '🧪'} ${item.name}</span>
          <span class="item-stats">(Consumable)</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:2px;">
          <span style="color:${canAfford ? '#4682B4' : '#c44'};font-size:11px;font-weight:bold;">${cost} 💧</span>
          ${adjacentUnit ? `<button class="btn-tiny ${canBuy ? 'btn-success' : ''}" ${canBuy ? '' : 'disabled'} onclick="purchaseVendorItem(${adjacentUnit.id}, ${vendorIdx}, ${i})" style="font-size:10px;">Buy</button>` : ''}
        </div>
      </div>`;
      if (item.description) html += `<div style="font-size:10px;color:#555;padding:0 4px 2px;font-style:italic;">${item.description}</div>`;
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
    const adjacentUnit = G.units.find(u =>
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
          <span class="item-name" data-tip="${gi.item.description || ''}">${gi.item.name}</span>
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
      <div class="info-row"><span class="label" data-tip="Attack power. Rolled as D6 + ATK + 2 vs enemy D6 + DEF. Damage = difference (min 1 on hit).">ATK</span><span>${stats.attack}</span></div>
      <div class="info-row"><span class="label" data-tip="Defense power. Enemy rolls D6 + ATK + 2 vs your D6 + DEF. Higher DEF reduces incoming damage.">DEF</span><span>${stats.defense}</span></div>
      <div class="info-row"><span class="label" data-tip="Attack range in tiles. 1 = melee (adjacent only).">Range</span><span>${stats.attackRange > 1 ? stats.attackRange + ' (ranged)' : '1 (melee)'}</span></div>
    </div>
    <div class="stat-grid" style="margin-top:2px;">
      <div class="info-row"><span class="label" data-tip="Strength — +1 ATK per point. ${stats.crushChance}% Crushing Blow chance (deals +2 bonus damage on hit). Weight threshold raised to ${6 + Math.floor(stats.str / 2)} (base 6 + half STR).">STR</span><span>${stats.str}${stats.crushChance > 0 ? ` <span style='color:#c44;font-size:10px'>(${stats.crushChance}% crush)</span>` : ''}</span></div>
      <div class="info-row"><span class="label" data-tip="Agility — +1 movement per 3 points. ${stats.dodgeChance}% Dodge chance (completely negates an incoming attack, capped at 50%).">AGI</span><span>${stats.agi}${stats.dodgeChance > 0 ? ` <span style='color:#4a4;font-size:10px'>(${stats.dodgeChance}% dodge)</span>` : ''}</span></div>
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
        html += `<div class="info-row"><span class="label" style="color:${eff.color}" data-tip="${eff.desc}">${eff.icon} ${eff.name}</span><span>${se.turnsLeft} turn${se.turnsLeft > 1 ? 's' : ''}</span></div>`;
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
  if (unitPassives.size > 0 || bardicAuras.length > 0 || discordantAuras.length > 0) {
    html += `<div class="stat-grid" style="margin-top:2px;"><div class="equip-header" style="color:#6a6;">Passives</div>`;
    for (const pid of unitPassives) {
      const pd = PASSIVES[pid];
      if (pd) {
        let passiveLabel = `${pd.icon} ${pd.name}`;
        if (pid === 'bulwark') {
          const stacks = countPassive(u, 'bulwark');
          if (stacks > 0) passiveLabel += ` (${stacks})`;
        }
        if (pid === 'momentum') {
          const mBonus = Math.floor((u.tilesMoved || 0) / 3);
          passiveLabel += ` (+${mBonus} ATK)`;
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
    html += `</div>`;
  }

  // Equipment section
  html += `<div class="equip-section"><div class="equip-header">Equipment</div>`;
  for (const slot of EQUIP_SLOTS) {
    const item = u.equipment[slot];
    if (item && item !== '_two_handed_') {
      const statStr = itemStatString(item);
      const twoHandTag = item.twoHanded ? ' <span class="two-hand-tag">[2H]</span>' : '';
      html += `<div class="equip-slot">
        <span class="label">${SLOT_LABELS[slot]}:</span>
        <span class="item-name" data-tip="${item.description || ''}">${item.name}${twoHandTag}</span>
        <span class="item-stats">${statStr}</span>
        ${isOwned ? `<button class="btn-tiny" onclick="unequipItem(${u.id}, '${slot}')">✕</button>` : ''}
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
      if (item.consumable) {
        let buttons = '';
        if (isOwned) {
          if (isThisMirror) {
            buttons = `<button class="btn-tiny" style="background:#853;" onclick="cancelMirror()">Cancel</button>`;
          } else if (isMirrorActive) {
            buttons = `<button class="btn-tiny" style="background:#538;" onclick="mirrorCopyItem(${u.id}, ${i})">Copy</button>`;
          } else if (item.passive) {
            buttons = `<button class="btn-tiny" onclick="dropItem(${u.id}, ${i})">Drop</button>`;
          } else {
            buttons = `<button class="btn-tiny" style="background:#185;" onclick="useConsumable(${u.id}, ${i})">Use</button>
            <button class="btn-tiny" onclick="dropItem(${u.id}, ${i})">Drop</button>`;
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
          if (isMirrorActive) {
            buttons = `<button class="btn-tiny" style="background:#538;" onclick="mirrorCopyItem(${u.id}, ${i})">Copy</button>`;
          } else {
            buttons = `<button class="btn-tiny" onclick="equipItem(${u.id}, ${i})">Equip</button>
            <button class="btn-tiny" onclick="dropItem(${u.id}, ${i})">Drop</button>`;
          }
        }
        html += `<div class="inv-item">
          <span class="item-name" data-tip="${item.description || ''}">${item.name}</span>
          <span class="item-stats">(${SLOT_LABELS[item.slot]}) ${statStr}</span>
          <span class="inv-buttons">${buttons}</span>
        </div>`;
      }
    }
    html += `</div>`;
  }

  info.innerHTML = html;
}

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
  if (u.canFight && !u.hasAttacked && !u.stunned && !stats.noAttack && !hasStatusEffect(u, 'beguiled') && hasEnemyInRange(u)) {
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
    addAction(list, 'Rest', `Heal 3-4 HP (1 💧, ends turn)`, () => {
      const heal = 3 + Math.floor(Math.random() * 2); // 3 or 4
      const oldHp = u.hp;
      u.hp = Math.min(stats.maxHp, u.hp + heal);
      const healed = u.hp - oldHp;
      playerRes.water -= 1;
      u.movementLeft = 0;
      u.hasAttacked = true;
      u.hasGathered = true;
      addLog(`💤 ${getDisplayName(u)} rests and heals ${healed} HP. (${u.hp}/${stats.maxHp})`);
      renderAll();
    });
  }

  // Gather (canGather flag or resource_gathering passive or mimic_gather)
  if ((u.canGather || hasPassive(u, 'resource_gathering') || u.mimicGather) && !u.hasGathered && !hasStatusEffect(u, 'on_strike') && getAdjacentResources(u).length > 0) {
    addAction(list, 'Gather', `Select resource (bonus +${stats.gatherBonus})`, () => {
      interactionMode = 'gather';
      renderBoard();
    }, interactionMode === 'gather');
  }

  // Pick Up ground items
  if (getAdjacentGroundItems(u).length > 0) {
    addAction(list, 'Pick Up', 'Select nearby item', () => {
      interactionMode = 'pickup';
      renderBoard();
    }, interactionMode === 'pickup');
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
          if (!occupied) {
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

  // Item-granted actions (blocked when beguiled)
  const isBeguiled = hasStatusEffect(u, 'beguiled');
  for (const action of stats.actions) {
    const itemCdLeft = getAbilityCooldownRemaining(u, action);
    if (isBeguiled) {
      addAction(list, action.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), '', null, false, '🎵 Beguiled');
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
        addAction(list, 'Berserk', '+5 ATK, -3 DEF this turn', () => {
          executeBerserk(u);
        });
      } else if (itemCdLeft > 0) {
        addAction(list, 'Berserk', '', null, false, `${itemCdLeft} turn${itemCdLeft > 1 ? 's' : ''} CD`);
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
          chebyshevDist(u.x, u.y, t.x, t.y) <= 5
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
          chebyshevDist(u.x, u.y, t.x, t.y) <= 3
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
    if (action === 'boomerang_throw') {
      if (!u.hasAttacked && G.units.some(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 4 && isOnStraightLine(u.x, u.y, e.x, e.y))) {
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
          addAction(list, ability.name, ability.desc, () => {
            const freed = [];
            if (hasStatusEffect(u, 'combat_locked')) { removeStatusEffect(u, 'combat_locked'); freed.push('Combat Lock'); }
            if (hasStatusEffect(u, 'frozen')) { removeStatusEffect(u, 'frozen'); freed.push('Frozen'); }
            if (hasStatusEffect(u, 'ensnared')) { removeStatusEffect(u, 'ensnared'); freed.push('Ensnared'); }
            u.disengaged = true;
            startAbilityCooldown(u, 'goblin_disengage');
            if (freed.length > 0) {
              addLog(`💨 ${getDisplayName(u)} breaks free from ${freed.join(', ')} and disengages! (no AoO this turn)`);
            } else {
              addLog(`💨 ${getDisplayName(u)} prepares to disengage! (no AoO this turn)`);
            }
            renderAll();
          });
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
        const hasAdjacentBeast = G.units.some(b => b.hp > 0 && b.playerId === NPC_PLAYER_ID && b.type === 'beast' && isAdjacent(u.x, u.y, b.x, b.y));
        const alreadyHasTamed = G.units.some(b => b.hp > 0 && b.type === 'beast' && b.playerId === u.playerId && b.tamedBy === u.id);
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
      }
    }
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
  const cdTag = cooldownInfo ? ` <span style="color:#c44;font-size:10px;">(${cooldownInfo})</span>` : '';
  btn.innerHTML = `${label}${cdTag} ${desc ? `<span style="color:#888;font-size:10px;">${desc}</span>` : ''}`;
  if (cooldownInfo) {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'not-allowed';
  } else {
    btn.onclick = fn;
  }
  container.appendChild(btn);
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

  // --- Structure building options ---
  for (const [sType, sDef] of Object.entries(STRUCTURE_DEFS)) {
    const canAfford = canAffordStructure(p, sType);
    const costStr = RESOURCE_TYPES
      .filter(r => sDef.cost[r] > 0)
      .map(r => `<span style="color:${RESOURCE_COLORS[r]}">${sDef.cost[r]} ${capitalize(r)}</span>`)
      .join(', ');

    const structName = (sDef.factionNames && sDef.factionNames[p.faction]) || sDef.name;

    const div = document.createElement('div');
    div.className = 'prod-item';
    div.innerHTML = `
      <div>
        <div style="color:${canAfford ? '#2F4F2F' : '#808080'}">${faction.prefix} ${structName} <span style="color:${canAfford ? PLAYER_COLORS[G.currentPlayer] : '#808080'}">[${sDef.char}]</span></div>
        <div class="prod-cost">${costStr}</div>
      </div>
      <button class="btn btn-small ${canAfford ? 'btn-success' : ''}" ${canAfford ? '' : 'disabled'} id="prod-struct-${sType}">Build</button>
    `;
    container.appendChild(div);

    if (canAfford) {
      div.querySelector(`#prod-struct-${sType}`).onclick = () => startStructurePlacement(sType);
    }
  }

  // --- Unit production options ---
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

    const buildLabel = type === 'hero' ? 'Resurrect' : 'Build';

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
    container.appendChild(div);

    if (canAfford) {
      div.querySelector(`#prod-${type}`).onclick = () => startPlacement(type);
    }
  }

  // Show notices for missing structures
  const hasBarracks = G.structures && G.structures.some(s => s.type === 'barracks' && s.playerId === G.currentPlayer);
  const hasEliteHall = G.structures && G.structures.some(s => s.type === 'elite_hall' && s.playerId === G.currentPlayer);
  if (!hasBarracks) {
    const notice = document.createElement('div');
    notice.style.cssText = 'color:#AA6622;padding:6px 8px;font-style:italic;font-size:12px;border-top:1px solid #3a3a2a;margin-top:4px;';
    notice.textContent = '⌂ Build a Barracks to unlock Warriors and Heroes.';
    container.appendChild(notice);
  }
  if (!hasEliteHall) {
    const eliteName = (STRUCTURE_DEFS.elite_hall.factionNames && STRUCTURE_DEFS.elite_hall.factionNames[p.faction]) || 'Elite Hall';
    const eliteUnitName = (faction.unitOverrides && faction.unitOverrides.elite && faction.unitOverrides.elite.name) || 'Elite';
    const notice = document.createElement('div');
    notice.style.cssText = 'color:#AA6622;padding:6px 8px;font-style:italic;font-size:12px;border-top:1px solid #3a3a2a;margin-top:4px;';
    notice.textContent = `⚑ Build a ${eliteName} to unlock ${eliteUnitName}s.`;
    container.appendChild(notice);
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
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
      resolveAttack(su, clickedUnit);
      return;
    }
    // Attack enemy structure
    const clickedStruct = G.structures && G.structures.find(s => s.x === x && s.y === y);
    if (clickedStruct && clickedStruct.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
      resolveAttackStructure(su, clickedStruct);
      return;
    }
    interactionMode = 'idle';
  }

  // DOUBLE STRIKE MODE
  if (interactionMode === 'double_strike' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 1;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
      resolveDoubleStrike(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // GATHER MODE
  if (interactionMode === 'gather' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const res = G.board[y][x];
    if (su && res && res.amount > 0 && isAdjacent(su.x, su.y, x, y)) {
      gatherResource(su, x, y);
      return;
    }
    interactionMode = 'idle';
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

  // PICKUP MODE
  if (interactionMode === 'pickup' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (su && chebyshevDist(su.x, su.y, x, y) <= 1) {
      const idx = (G.groundItems || []).findIndex(gi => gi.x === x && gi.y === y);
      if (idx !== -1) {
        pickupGroundItem(su, idx);
        return;
      }
    }
    interactionMode = 'idle';
  }

  // HEX CURSE MODE (Goblin Hexweaver - target within 3)
  if (interactionMode === 'hex_curse' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3) {
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
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
      executeAimedShot(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // ARCANE BLAST MODE (Elf Duskweaver - target within 3)
  if (interactionMode === 'arcane_blast' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3) {
      executeArcaneBlast(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // FIREBALL MODE (Staff of Fire - target within weapon range)
  if (interactionMode === 'fireball' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 3;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
      executeFireball(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // FROST RAY MODE (Staff of Frost - target within weapon range)
  if (interactionMode === 'frost_ray' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 3;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
      executeFrostRay(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // LIGHTNING BOLT MODE (Scepter of Lightning - target within weapon range)
  if (interactionMode === 'lightning_bolt' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 4;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
      executeLightningBolt(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // LIFE DRAIN MODE (Wand of Draining - target within weapon range)
  if (interactionMode === 'life_drain' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    const suStats = getUnitStats(su);
    const range = suStats.attackRange || 2;
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
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
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= range) {
      executePrecisionShot(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // GRAPPLE MODE
  if (interactionMode === 'grapple' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && clickedUnit.hp > 0) {
      const dist = chebyshevDist(su.x, su.y, clickedUnit.x, clickedUnit.y);
      if (dist >= 2 && dist <= 5) {
        executeGrapple(su, clickedUnit);
        return;
      }
    }
    interactionMode = 'idle';
  }

  // ENSNARE MODE
  if (interactionMode === 'ensnare' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, clickedUnit.x, clickedUnit.y) <= 3) {
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
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 3) {
      executeSoulSiphon(su, clickedUnit);
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

  // TUNNEL A/B MODE (Kobold Saboteur - place on adjacent empty tile)
  if ((interactionMode === 'tunnel_a' || interactionMode === 'tunnel_b') && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (isAdjacent(su.x, su.y, x, y) && !clickedUnit &&
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
    if (clickedUnit && clickedUnit.playerId === NPC_PLAYER_ID && clickedUnit.type === 'beast' && clickedUnit.hp > 0 && isAdjacent(su.x, su.y, x, y)) {
      executeTameBeast(su, clickedUnit);
      return;
    }
    interactionMode = 'idle';
  }

  // MIMIC MODE (Bard Maestro - copy adjacent enemy's last ability)
  if (interactionMode === 'mimic' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.id !== su.id && clickedUnit.playerId !== su.playerId && clickedUnit.hp > 0 && isAdjacent(su.x, su.y, x, y) && clickedUnit.lastAbilityUsed) {
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

  // BOOMERANG THROW MODE (hit all enemies in a line)
  if (interactionMode === 'boomerang_throw' && selectedUnitId !== null) {
    const su = getUnit(selectedUnitId);
    if (clickedUnit && clickedUnit.playerId !== su.playerId && chebyshevDist(su.x, su.y, x, y) <= 4 && isOnStraightLine(su.x, su.y, x, y)) {
      executeBoomerangThrow(su, x, y);
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
    // Check for ground items
    const hasGroundItem = (G.groundItems || []).some(gi => gi.x === x && gi.y === y);
    if (clickedShop) {
      selectedUnitId = null;
      selectedGroundTile = null;
      selectedShop = clickedShop;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = null;
      selectedTunnel = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (clickedVendor) {
      selectedUnitId = null;
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = clickedVendor;
      selectedBazaar = null;
      selectedStructure = null;
      selectedTunnel = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (clickedBazaar) {
      selectedUnitId = null;
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = clickedBazaar;
      selectedStructure = null;
      selectedTunnel = null;
      interactionMode = 'idle';
      reachableTiles = [];
    } else if (clickedStructure) {
      selectedUnitId = null;
      selectedGroundTile = null;
      selectedShop = null;
      selectedVendor = null;
      selectedBazaar = null;
      selectedStructure = clickedStructure;
      selectedTunnel = null;
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
  mirrorPending = null;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

// ============================================================
// MOVEMENT
// ============================================================
function isTileBlockedForUnit(nx, ny, unit) {
  const cell = G.board[ny][nx];
  if (!cell) return false; // empty tile, not blocked
  const type = cell.type;
  if (type === 'stone' && hasPassive(unit, 'climbing')) return false;
  if (type === 'water' && hasPassive(unit, 'water_walking')) return false;
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
      visited.add(key);
      queue.push({ x: nx, y: ny, steps: steps + 1 });
    }
  }
  return tiles;
}

function moveUnit(unit, x, y) {
  const path = bfsDistance(unit, x, y);
  if (path === null || path > unit.movementLeft) return;

  // Attack of Opportunity (Goblin Disengage bypasses this)
  if (unit.disengaged) {
    // Goblin hero ability: skip AoO entirely
  }
  const adjacentEnemies = unit.disengaged ? [] : G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && u.canFight &&
    !hasStatusEffect(u, 'beguiled') &&
    isAdjacent(unit.x, unit.y, u.x, u.y) &&
    !isAdjacent(x, y, u.x, u.y)
  );
  let aooStopped = false;
  for (const enemy of adjacentEnemies) {
    addLog(`⚡ ${getDisplayName(enemy)} gets an Attack of Opportunity against ${getDisplayName(unit)}!`);
    const hpBefore = unit.hp;
    performAttack(enemy, unit, { isAoO: true });
    if (unit.hp <= 0) {
      interactionMode = 'idle';
      reachableTiles = [];
      selectedUnitId = null;
      renderAll();
      return;
    }
    // If the AoO dealt damage, stop movement
    if (unit.hp < hpBefore) {
      unit.movementLeft = 0;
      addLog(`${getDisplayName(unit)} is stopped in their tracks!`);
      aooStopped = true;
      break;
    }
    // If the unit dodged, they can continue moving freely
    if (unit.hp >= hpBefore) {
      addLog(`💨 ${getDisplayName(unit)} dodges and keeps moving!`);
    }
  }
  if (aooStopped) {
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }

  const oldX = unit.x, oldY = unit.y;
  unit.x = x;
  unit.y = y;
  unit.movementLeft -= path;
  // Track tiles moved this turn for Momentum passive
  unit.tilesMoved = (unit.tilesMoved || 0) + path;

  addLog(`${getDisplayName(unit)} moved from (${oldX},${oldY}) to (${x},${y})`);

  // Overwatch: ranged enemies with overwatch passive fire when unit enters their range
  if (!unit.disengaged) {
    const overwatchers = G.units.filter(u =>
      u.hp > 0 && u.playerId !== unit.playerId && u.canFight &&
      !hasStatusEffect(u, 'beguiled') &&
      hasPassive(u, 'overwatch') &&
      !u.overwatchFired
    );
    for (const ow of overwatchers) {
      const owStats = getUnitStats(ow);
      if (owStats.attackRange > 1) {
        const dist = chebyshevDist(ow.x, ow.y, x, y);
        if (dist <= owStats.attackRange && dist > 1) {
          addLog(`🎯 ${getDisplayName(ow)} fires an Overwatch shot at ${getDisplayName(unit)}!`);
          ow.overwatchFired = true;
          performAttack(ow, unit, { isAoO: true });
          if (unit.hp <= 0) {
            interactionMode = 'idle';
            reachableTiles = [];
            selectedUnitId = null;
            renderAll();
            return;
          }
        }
      }
    }
  }

  // Check for traps
  if (G.traps && G.traps.length > 0) {
    const trapIdx = G.traps.findIndex(t => t.x === x && t.y === y && t.playerId !== unit.playerId);
    if (trapIdx !== -1) {
      const trap = G.traps[trapIdx];
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
      visited.add(key);
      queue.push({ x: nx, y: ny, steps: steps + 1 });
    }
  }
  return null;
}

// ============================================================
// COMBAT
// ============================================================
function performAttack(attacker, defender, { isAoO = false, isDoubleStrike = false } = {}) {
  const aStats = getUnitStats(attacker);
  const dStats = getUnitStats(defender);

  const prefix = isAoO ? '⚡ AoO: ' : isDoubleStrike ? '⚡ ' : '';

  // Dodge check (AGI-based)
  if (Math.random() * 100 < dStats.dodgeChance) {
    addLog(`${prefix}${getDisplayName(attacker)} ${isAoO ? 'swings at' : 'attacks'} ${getDisplayName(defender)} — 🌀 DODGED! (${dStats.dodgeChance}% chance)`);
    return false;
  }

  // Momentum passive: +1 ATK per 3 tiles moved this turn
  let momentumBonus = 0;
  if (hasPassive(attacker, 'momentum') && attacker.tilesMoved > 0) {
    momentumBonus = Math.floor(attacker.tilesMoved / 3);
  }

  const atkRoll = rollD6() + aStats.attack + momentumBonus + 2; // +2 attacker advantage (hit only)
  // Piercing passive: ignore 2 DEF
  const piercingReduction = hasPassive(attacker, 'piercing') ? 2 : 0;
  const defRoll = rollD6() + Math.max(0, dStats.defense - piercingReduction);
  const atkRollDmg = atkRoll - 2; // +2 helps hit, not damage
  let damage = Math.max(0, atkRollDmg - defRoll);
  if (atkRoll > defRoll) damage = Math.max(1, damage);

  // Critical hit (INT-based) — tactical precision
  let isCrit = false;
  if (damage > 0 && Math.random() * 100 < aStats.critChance) {
    damage = Math.ceil(damage * 1.5);
    isCrit = true;
  }

  // Crushing blow (STR-based) — raw power
  let isCrush = false;
  if (damage > 0 && !isCrit && Math.random() * 100 < aStats.crushChance) {
    damage += 2;
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

  if (damage > 0) {
    // Bulwark passive: reduce all incoming damage by stack count (min 1)
    const bulwarkStacks = countPassive(defender, 'bulwark');
    if (bulwarkStacks > 0 && damage > 1) {
      damage = Math.max(1, damage - bulwarkStacks);
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
    defender.hp -= damage;
    addLog(`${prefix}${getDisplayName(attacker)} ${isAoO ? 'hits' : 'attacks'} ${getDisplayName(defender)} — ${atkRoll} vs ${defRoll} → ${damage} damage!${procTag} (${defender.hp > 0 ? defender.hp + ' HP left' : 'DEFEATED!'})`);

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
      for (const slot of ['mainhand', 'offhand']) {
        const weapon = attacker.equipment[slot];
        if (weapon && weapon !== '_two_handed_' && weapon.onHit) {
          if (Math.random() * 100 < weapon.onHit.chance) {
            const eff = STATUS_EFFECTS[weapon.onHit.effect];
            if (eff) {
              applyStatusEffect(defender, weapon.onHit.effect, eff.duration);
              addLog(`${eff.icon} ${getDisplayName(defender)} is ${eff.name}! (${eff.duration} turns)`);
            }
          }
        }
      }
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
    for (const item of (defender.inventory || [])) {
      G.groundItems.push({ x: defender.x, y: defender.y, item: item });
      addLog(`💎 ${getDisplayName(defender)} dropped ${item.name}!`);
    }
    defender.inventory = [];
    addLog(`☠ ${getDisplayName(defender)} has been defeated${isAoO ? ' by an attack of opportunity' : ''}!`);
    // Release tamed beast if tamer dies
    if (defender.type === 'hero') {
      const tamedBeast = G.units.find(b => b.hp > 0 && b.type === 'beast' && b.tamedBy === defender.id);
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
    // Blood Frenzy: heal attacker to full on kill
    if (attacker.bloodFrenzyActive) {
      const aFullStats = getUnitStats(attacker);
      attacker.hp = aFullStats.maxHp;
      addLog(`🩸 ${getDisplayName(attacker)}'s Blood Frenzy triggers! Healed to full HP (${attacker.hp})!`);
    }
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(defender.playerId);
    return true; // defender died
  }

  // Retaliate passive: 50% chance to counter-attack when hit by adjacent unit (not during AoO)
  // Thorns passive: deal 1 damage back to melee attackers
  if (defender.hp > 0 && attacker.hp > 0 && isAdjacent(attacker.x, attacker.y, defender.x, defender.y) && hasPassive(defender, 'thorns')) {
    attacker.hp -= 1;
    addLog(`🌿 ${getDisplayName(defender)}'s thorns deal 1 damage to ${getDisplayName(attacker)}! (${attacker.hp > 0 ? attacker.hp + ' HP left' : 'DEFEATED!'})`);
    if (attacker.hp <= 0) {
      attacker.hp = 0;
      addLog(`☠ ${getDisplayName(attacker)} has been defeated by thorns!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(attacker.playerId);
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
      attacker.hp = 0;
      addLog(`☠ ${getDisplayName(attacker)} has been defeated by static shock!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(attacker.playerId);
    }
  }

  if (!isAoO && defender.hp > 0 && attacker.hp > 0 && !hasStatusEffect(defender, 'beguiled') && isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
    if (hasPassive(defender, 'retaliate') && Math.random() < 0.5) {
      addLog(`⚔ ${getDisplayName(defender)} retaliates!`);
      performAttack(defender, attacker, { isAoO: true });
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
  if (damage > 0 && defender.hp > 0 && isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
    let lockChance = 20;
    if (attacker.equipment) {
      for (const slot of EQUIP_SLOTS) {
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
    addLog(`${prefix}${getDisplayName(attacker)} ${isAoO ? 'swings at' : 'attacks'} ${getDisplayName(defender)} — ${atkRoll} vs ${defRoll} → MISS!`);
  }
}

// Beast retaliation: charge toward attacker and counter-attack if adjacent
function beastRetaliate(beast, attacker) {
  if (!beast || beast.hp <= 0 || beast.playerId !== NPC_PLAYER_ID) return;
  if (!attacker || attacker.hp <= 0) return;
  if (hasStatusEffect(beast, 'beguiled')) return;
  if (isAdjacent(beast.x, beast.y, attacker.x, attacker.y)) {
    addLog(`🐉 ${getDisplayName(beast)} retaliates!`);
    performAttack(beast, attacker);
    if (attacker.hp <= 0) selectedUnitId = null;
  } else {
    beastChaseToward(beast, attacker);
    // If the charge brought it adjacent, also attack
    if (beast.hp > 0 && attacker.hp > 0 && isAdjacent(beast.x, beast.y, attacker.x, attacker.y)) {
      addLog(`🐉 ${getDisplayName(beast)} retaliates!`);
      performAttack(beast, attacker);
      if (attacker.hp <= 0) selectedUnitId = null;
    }
  }
}

function resolveAttack(attacker, defender) {
  // Reflect passive: 30% chance to reflect ranged attacks back
  const dist = chebyshevDist(attacker.x, attacker.y, defender.x, defender.y);
  if (dist > 1 && hasPassive(defender, 'reflect') && Math.random() < 0.3) {
    addLog(`🔃 ${getDisplayName(defender)} reflects the projectile back at ${getDisplayName(attacker)}!`);
    performAttack(defender, attacker);
    attacker.hasAttacked = true;
    interactionMode = 'idle';
    renderAll();
    return;
  }

  const defenderDied = performAttack(attacker, defender);

  // Double Edged Sword: second hit if mainhand has selfBleed
  if (!defenderDied && attacker.hp > 0 && defender.hp > 0 && attacker.equipment && attacker.equipment.mainhand && attacker.equipment.mainhand.selfBleed) {
    addLog(`⚔️ ${getDisplayName(attacker)}'s Double Edged Sword swings again!`);
    performAttack(attacker, defender);
  }

  // Double Edged Sword: always self-bleed on attack
  if (attacker.hp > 0 && attacker.equipment && attacker.equipment.mainhand && attacker.equipment.mainhand.selfBleed) {
    applyStatusEffect(attacker, 'bleeding', 4);
    addLog(`🩸 ${getDisplayName(attacker)} cuts themselves on the Double Edged Sword! Bleeding for 4 turns!`);
  }

  // Foul Beast retaliation
  if (!defenderDied && defender.playerId === NPC_PLAYER_ID && attacker.hp > 0) {
    if (isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
      // Melee range: counter-attack
      addLog(`🐉 ${getDisplayName(defender)} retaliates!`);
      performAttack(defender, attacker);
      if (attacker.hp <= 0) {
        selectedUnitId = null;
      }
    } else {
      // Ranged hit: beast charges toward attacker
      beastChaseToward(defender, attacker);
    }
  }

  // Mirrored: mirror image duplicates normal attacks with magic weapons
  if (attacker.hp > 0 && defender.hp > 0) triggerMirrorNormalAttack(attacker, defender);

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

  structure.hp -= damage;
  if (structure.hp <= 0) {
    structure.hp = 0;
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

function resolveDoubleStrike(attacker, defender) {
  addLog(`⚡ ${getDisplayName(attacker)} uses Double Strike!`);
  const defenderDied = performAttack(attacker, defender, { isDoubleStrike: true });

  // Foul Beast retaliation
  if (!defenderDied && defender.playerId === NPC_PLAYER_ID && attacker.hp > 0) {
    if (isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
      addLog(`🐉 ${getDisplayName(defender)} retaliates!`);
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
const MAGIC_WEAPON_ACTIONS = ['fireball', 'frost_ray', 'lightning_bolt', 'life_drain', 'poison_cloud'];

function isMagicWeapon(item) {
  return item && item !== '_two_handed_' && item.action && MAGIC_WEAPON_ACTIONS.includes(item.action);
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
    if (hasPassive(target, 'magic_resistance')) dmg = Math.max(0, dmg - 2);
    target.hp -= dmg;
    addLog(`🪞🔥 Mirror Fireball hits ${getDisplayName(target)} for ${dmg} damage! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'burning', 2);
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); }
    const splashTargets = G.units.filter(u =>
      u.hp > 0 && u.id !== target.id && u.id !== caster.id && u.id !== mirror.id && u.playerId !== caster.playerId &&
      isAdjacent(target.x, target.y, u.x, u.y)
    );
    for (const st of splashTargets) {
      let sDmg = 2;
      if (countPassive(st, 'bulwark') > 0 && sDmg > 1) sDmg = Math.max(1, sDmg - countPassive(st, 'bulwark'));
      if (hasPassive(st, 'magic_resistance')) sDmg = Math.max(0, sDmg - 2);
      st.hp -= sDmg;
      addLog(`🪞🔥 Mirror splash hits ${getDisplayName(st)} for ${sDmg}! (${st.hp > 0 ? st.hp + ' HP' : 'DEFEATED!'})`);
      if (st.hp > 0) applyStatusEffect(st, 'burning', 2);
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
    if (hasPassive(target, 'magic_resistance')) dmg = Math.max(0, dmg - 2);
    target.hp -= dmg;
    addLog(`🪞❄️ Mirror Frost Ray hits ${getDisplayName(target)} for ${dmg} damage! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'frozen', 1);
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
  }

  if (abilityId === 'lightning_bolt') {
    if (!target || target.hp <= 0) return;
    const baseDmg = 5 + Math.floor(cStats.int / 3);
    let dmg = baseDmg;
    if (countPassive(target, 'bulwark') > 0 && dmg > 1) dmg = Math.max(1, dmg - countPassive(target, 'bulwark'));
    if (hasPassive(target, 'magic_resistance')) dmg = Math.max(0, dmg - 2);
    target.hp -= dmg;
    addLog(`🪞⚡ Mirror Lightning Bolt hits ${getDisplayName(target)} for ${dmg} damage! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    if (target.hp > 0) applyStatusEffect(target, 'slowed', 2);
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
  }

  if (abilityId === 'life_drain') {
    if (!target || target.hp <= 0) return;
    const baseDmg = 3 + Math.floor(cStats.int / 4);
    let dmg = baseDmg;
    if (countPassive(target, 'bulwark') > 0 && dmg > 1) dmg = Math.max(1, dmg - countPassive(target, 'bulwark'));
    if (hasPassive(target, 'magic_resistance')) dmg = Math.max(0, dmg - 2);
    target.hp -= dmg;
    const healAmt = Math.min(dmg, cStats.maxHp - caster.hp);
    if (healAmt > 0) caster.hp += healAmt;
    addLog(`🪞💜 Mirror Life Drain hits ${getDisplayName(target)} for ${dmg} and heals ${getDisplayName(caster)} ${healAmt} HP! (${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
    if (target.hp <= 0) { target.hp = 0; dropAllItems(target); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(target.playerId); }
  }

  if (abilityId === 'poison_cloud') {
    const enemies = G.units.filter(u =>
      u.hp > 0 && u.playerId !== caster.playerId &&
      chebyshevDist(mirror.x, mirror.y, u.x, u.y) <= 2
    );
    for (const enemy of enemies) {
      enemy.hp -= 1;
      applyStatusEffect(enemy, 'poison', 3);
      addLog(`🪞☠ Mirror Poison Cloud hits ${getDisplayName(enemy)}! (${enemy.hp > 0 ? enemy.hp + ' HP' : 'DEFEATED!'})`);
      if (enemy.hp <= 0) { enemy.hp = 0; dropAllItems(enemy); }
    }
    G.units = G.units.filter(u => u.hp > 0);
    for (const enemy of enemies) { if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId); }
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
    specialActionsUsed: [],
    rallyBonus: 0, stoneSkinBonus: 0, divineShieldBonus: 0,
    berserkBonus: 0, berserkPenalty: 0, battleCryBonus: 0,
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
  // Consecrate: deal 3 damage and Weaken all enemies within 2 tiles. Lasts 2 turns.
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && chebyshevDist(unit.x, unit.y, u.x, u.y) <= 2
  );
  for (const enemy of enemies) {
    enemy.hp -= 3;
    applyStatusEffect(enemy, 'weakened', 2);
    addLog(`✝ Consecrate hits ${getDisplayName(enemy)} for 3 damage! Weakened! (${enemy.hp > 0 ? enemy.hp + ' HP left' : 'DEFEATED!'})`);
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
  unit.consecrateTurns = 1; // Will tick once more at the start of next turn
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
  const dmg = 5;
  target.hp -= dmg;
  addLog(`🩸 ${getDisplayName(caster)} rends ${getDisplayName(target)}'s bleeding wounds for ${dmg} damage! (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
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
        !getUnitAt(nx, ny) && !(G.board[ny][nx] && G.board[ny][nx].type && G.board[ny][nx].amount > 0)) {
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
  // Berserk: +5 ATK, -3 DEF this turn
  unit.berserkBonus = 5;
  unit.berserkPenalty = 3;
  startAbilityCooldown(unit, 'berserk');
  addLog(`🔥 ${getDisplayName(unit)} goes berserk! (+5 ATK, -3 DEF this turn)`);
  renderAll();
}

// --- Magic Weapon Abilities ---

function executeFireball(caster, target) {
  // Fireball: 4 damage to target + 2 splash to adjacent enemies, inflicts burning
  const cStats = getUnitStats(caster);
  const baseDmg = 4 + Math.floor(cStats.int / 3);
  const splashDmg = 2;
  
  // Main target
  if (hasPassive(target, 'reflect') && Math.random() < 0.3) {
    addLog(`🔃 ${getDisplayName(target)} reflects the Fireball back at ${getDisplayName(caster)}!`);
    caster.hp -= baseDmg;
    applyStatusEffect(caster, 'burning', 2);
    addLog(`🔥 ${getDisplayName(caster)} takes ${baseDmg} fire damage and is Burning! (${caster.hp > 0 ? caster.hp + ' HP left' : 'DEFEATED!'})`);
    if (caster.hp <= 0) {
      caster.hp = 0;
      dropAllItems(caster);
      addLog(`☠ ${getDisplayName(caster)} has been defeated!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(caster.playerId);
    }
  } else {
    // Bulwark reduces damage (stacks)
    let dmg = baseDmg;
    const tgtBulwark = countPassive(target, 'bulwark');
    if (tgtBulwark > 0 && dmg > 1) dmg = Math.max(1, dmg - tgtBulwark);
    if (hasPassive(target, 'magic_resistance')) dmg = Math.max(0, dmg - 2);
    target.hp -= dmg;
    addLog(`🔥 ${getDisplayName(caster)}'s Fireball hits ${getDisplayName(target)} for ${dmg} fire damage! (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
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
    const stBulwark = countPassive(st, 'bulwark');
    if (stBulwark > 0 && sDmg > 1) sDmg = Math.max(1, sDmg - stBulwark);
    if (hasPassive(st, 'magic_resistance')) sDmg = Math.max(0, sDmg - 2);
    st.hp -= sDmg;
    addLog(`🔥 Fireball splash hits ${getDisplayName(st)} for ${sDmg} damage! (${st.hp > 0 ? st.hp + ' HP left' : 'DEFEATED!'})`);
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
  
  if (hasPassive(target, 'reflect') && Math.random() < 0.3) {
    addLog(`🔃 ${getDisplayName(target)} reflects the Frost Ray back at ${getDisplayName(caster)}!`);
    caster.hp -= baseDmg;
    applyStatusEffect(caster, 'frozen', 2);
    addLog(`🧊 ${getDisplayName(caster)} takes ${baseDmg} frost damage and is Frozen! (${caster.hp > 0 ? caster.hp + ' HP left' : 'DEFEATED!'})`);
    if (caster.hp <= 0) {
      caster.hp = 0;
      dropAllItems(caster);
      addLog(`☠ ${getDisplayName(caster)} has been defeated!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(caster.playerId);
    }
  } else {
    let dmg = baseDmg;
    if (hasPassive(target, 'bulwark') && dmg > 1) dmg = Math.max(1, dmg - 1);
    if (hasPassive(target, 'magic_resistance')) dmg = Math.max(0, dmg - 2);
    target.hp -= dmg;
    addLog(`🧊 ${getDisplayName(caster)}'s Frost Ray hits ${getDisplayName(target)} for ${dmg} frost damage! (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
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
  
  if (hasPassive(target, 'reflect') && Math.random() < 0.3) {
    addLog(`🔃 ${getDisplayName(target)} reflects the Lightning Bolt at ${getDisplayName(caster)}!`);
    caster.hp -= baseDmg;
    applyStatusEffect(caster, 'slowed', 2);
    addLog(`⚡ ${getDisplayName(caster)} takes ${baseDmg} lightning damage and is Slowed! (${caster.hp > 0 ? caster.hp + ' HP left' : 'DEFEATED!'})`);
    if (caster.hp <= 0) {
      caster.hp = 0;
      dropAllItems(caster);
      addLog(`☠ ${getDisplayName(caster)} has been defeated!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(caster.playerId);
    }
  } else {
    let dmg = baseDmg;
    if (hasPassive(target, 'bulwark') && dmg > 1) dmg = Math.max(1, dmg - 1);
    if (hasPassive(target, 'magic_resistance')) dmg = Math.max(0, dmg - 2);
    target.hp -= dmg;
    addLog(`⚡ ${getDisplayName(caster)}'s Lightning Bolt hits ${getDisplayName(target)} for ${dmg} damage! (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
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
  
  if (hasPassive(target, 'reflect') && Math.random() < 0.3) {
    addLog(`🔃 ${getDisplayName(target)} reflects the Life Drain back at ${getDisplayName(caster)}!`);
    const selfDmg = baseDmg;
    caster.hp -= selfDmg;
    target.hp = Math.min(getUnitStats(target).maxHp, target.hp + selfDmg);
    addLog(`💜 ${getDisplayName(target)} drains ${selfDmg} HP from ${getDisplayName(caster)}!`);
    if (caster.hp <= 0) {
      caster.hp = 0;
      dropAllItems(caster);
      addLog(`☠ ${getDisplayName(caster)} has been defeated!`);
      G.units = G.units.filter(u => u.hp > 0);
      checkPlayerElimination(caster.playerId);
    }
  } else {
    let dmg = baseDmg;
    if (hasPassive(target, 'bulwark') && dmg > 1) dmg = Math.max(1, dmg - 1);
    if (hasPassive(target, 'magic_resistance')) dmg = Math.max(0, dmg - 2);
    target.hp -= dmg;
    const healAmt = Math.min(dmg, cStats.maxHp - caster.hp);
    if (healAmt > 0) caster.hp += healAmt;
    addLog(`💜 ${getDisplayName(caster)}'s Life Drain hits ${getDisplayName(target)} for ${dmg} damage and heals ${healAmt} HP! (Target: ${target.hp > 0 ? target.hp + ' HP' : 'DEFEATED!'})`);
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
    let dmg = 1;
    if (hasPassive(enemy, 'bulwark') && dmg > 1) dmg = Math.max(1, dmg - 1);
    enemy.hp -= dmg;
    applyStatusEffect(enemy, 'poison', 3);
    addLog(`☠ Poison Cloud hits ${getDisplayName(enemy)} for ${dmg} damage and poisons for 3 turns! (${enemy.hp > 0 ? enemy.hp + ' HP left' : 'DEFEATED!'})`);
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
  for (const t of targets) {
    if (t.id === unit.id) continue;
    const dmg = hasPassive(t, 'bulwark') ? Math.max(1, 10 - 1) : 10;
    t.hp -= dmg;
    addLog(`💥 ${getDisplayName(t)} takes ${dmg} damage from the explosion! (${t.hp > 0 ? t.hp + ' HP left' : 'DEFEATED!'})`);
    if (t.hp <= 0) {
      t.hp = 0;
      dropAllItems(t);
      addLog(`☠ ${getDisplayName(t)} has been slain by the explosion!`);
    }
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
  if (hasPassive(target, 'reflect') && Math.random() < 0.3) {
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
  const damage = Math.max(1, aStats.attack);
  target.hp -= damage;
  addLog(`🔭 ${getDisplayName(attacker)} fires a precision shot at ${getDisplayName(target)} for ${damage} damage! (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
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
          !G.units.some(u => u.x === nx && u.y === ny && u.hp > 0)) {
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
  startAbilityCooldown(unit, 'summon_pooka');
  addLog(`👾 ${getDisplayName(unit)} releases a Pooka from their pocket! It materializes at (${pos.x},${pos.y})!`);
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
          !G.units.some(u => u.x === nx && u.y === ny && u.hp > 0)) {
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
      if (hasPassive(t, 'bulwark') && finalDmg > 1) finalDmg = Math.max(1, finalDmg - 1);
      t.hp -= finalDmg;
      addLog(`🪃 Boomerang hits ${getDisplayName(t)} for ${finalDmg} damage! (${t.hp > 0 ? t.hp + ' HP left' : 'DEFEATED!'})`);
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

// ============================================================
// NEW HERO ABILITIES
// ============================================================

function executeHexCurse(caster, target) {
  // Hex Curse: apply Weakened and Cursed status effects for 2 turns
  applyStatusEffect(target, 'weakened', 2);
  applyStatusEffect(target, 'cursed', 2);
  startAbilityCooldown(caster, 'hex_curse');
  addLog(`🔮 ${getDisplayName(caster)} hexes ${getDisplayName(target)}! Weakened (-3 ATK) and Cursed (-3 DEF) for 2 turns!`);
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
      addLog(`☠ ${getDisplayName(enemy)} is poisoned by the swarm! (2 turns)`);
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
  // Aimed Shot: guaranteed hit, deals ATK damage ignoring defense
  // Reflect passive: 30% chance to reflect
  if (hasPassive(target, 'reflect') && Math.random() < 0.3) {
    const aStats = getUnitStats(attacker);
    const reflectDmg = Math.max(1, aStats.attack);
    addLog(`🔃 ${getDisplayName(target)} reflects the aimed shot back at ${getDisplayName(attacker)}!`);
    attacker.hp -= reflectDmg;
    addLog(`🎯 ${getDisplayName(attacker)} takes ${reflectDmg} reflected damage! (${attacker.hp > 0 ? attacker.hp + ' HP left' : 'DEFEATED!'})`);
    if (attacker.hp <= 0) { attacker.hp = 0; dropAllItems(attacker); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(attacker.playerId); selectedUnitId = null; }
    startAbilityCooldown(attacker, 'aimed_shot');
    attacker.hasAttacked = true;
    interactionMode = 'idle';
    renderAll();
    return;
  }
  const aStats = getUnitStats(attacker);
  const damage = Math.max(1, aStats.attack);
  target.hp -= damage;
  addLog(`🎯 ${getDisplayName(attacker)} fires an aimed shot at ${getDisplayName(target)} for ${damage} damage! (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
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

function executeArcaneBlast(caster, target) {
  // Arcane Blast: flat 4 damage + Burning, hit chance = INT * 8% (cap 80%)
  // Reflect passive: 30% chance to reflect the blast back
  if (hasPassive(target, 'reflect') && Math.random() < 0.3) {
    addLog(`🔃 ${getDisplayName(target)} reflects the arcane blast back at ${getDisplayName(caster)}!`);
    const reflectDmg = Math.max(1, 4 - (hasPassive(caster, 'magic_resistance') ? 2 : 0));
    caster.hp -= reflectDmg;
    addLog(`✨ ${getDisplayName(caster)} takes ${reflectDmg} reflected damage! (${caster.hp > 0 ? caster.hp + ' HP left' : 'DEFEATED!'})`);
    if (caster.hp <= 0) { caster.hp = 0; dropAllItems(caster); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(caster.playerId); }
    startAbilityCooldown(caster, 'arcane_blast');
    interactionMode = 'idle';
    renderAll();
    return;
  }
  const cStats = getUnitStats(caster);
  const hitChance = Math.min(80, cStats.int * 8);
  if (Math.random() * 100 >= hitChance) {
    addLog(`✨ ${getDisplayName(caster)} hurls arcane energy at ${getDisplayName(target)} — but the blast fizzles! (${hitChance}% hit)`);
    if (target.hp > 0 && target.playerId === NPC_PLAYER_ID) beastRetaliate(target, caster);
    startAbilityCooldown(caster, 'arcane_blast');
    interactionMode = 'idle';
    renderAll();
    return;
  }
  let damage = 4;
  // Magic resistance reduces magic damage by 2
  if (hasPassive(target, 'magic_resistance')) {
    damage = Math.max(1, damage - 2);
    addLog(`✨ ${getDisplayName(target)}'s Magic Resistance reduces the damage!`);
  }
  target.hp -= damage;
  addLog(`✨ ${getDisplayName(caster)} blasts ${getDisplayName(target)} with arcane energy for ${damage} damage! (${hitChance}% hit) (${target.hp > 0 ? target.hp + ' HP left' : 'DEFEATED!'})`);
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
  const prevTamed = G.units.find(b => b.hp > 0 && b.type === 'beast' && b.playerId === unit.playerId && b.tamedBy === unit.id);
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
  const damage = Math.max(1, stats.defense);
  target.hp -= damage;
  addLog(`🛡 ${getDisplayName(unit)} shield bashes ${getDisplayName(target)} for ${damage} damage! (DEF-based)`);

  // Push target 2 tiles in the direction away from unit
  if (target.hp > 0) {
    const dx = target.x - unit.x;
    const dy = target.y - unit.y;
    let pushX = target.x, pushY = target.y;
    for (let i = 0; i < 2; i++) {
      const nx = pushX + dx, ny = pushY + dy;
      if (nx >= 0 && nx < G.boardSize && ny >= 0 && ny < G.boardSize &&
          !G.units.some(u => u.x === nx && u.y === ny && u.hp > 0) &&
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
          !G.units.some(u => u.x === nx && u.y === ny && u.hp > 0)) {
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

function executeSoulSiphon(caster, target) {
  // Soul Siphon: drain 4 HP from target, heal self
  // Reflect passive: 30% chance to reflect
  if (hasPassive(target, 'reflect') && Math.random() < 0.3) {
    addLog(`🔃 ${getDisplayName(target)} reflects the soul siphon back at ${getDisplayName(caster)}!`);
    const reflectDmg = Math.max(1, 4 - (hasPassive(caster, 'magic_resistance') ? 2 : 0));
    caster.hp -= reflectDmg;
    addLog(`👻 ${getDisplayName(caster)} takes ${reflectDmg} reflected damage! (${caster.hp > 0 ? caster.hp + ' HP left' : 'DEFEATED!'})`);
    if (caster.hp <= 0) { caster.hp = 0; dropAllItems(caster); G.units = G.units.filter(u => u.hp > 0); checkPlayerElimination(caster.playerId); selectedUnitId = null; }
    startAbilityCooldown(caster, 'soul_siphon');
    interactionMode = 'idle';
    renderAll();
    return;
  }
  const dmg = Math.max(1, 4 - (hasPassive(target, 'magic_resistance') ? 2 : 0));
  target.hp -= dmg;
  const casterStats = getUnitStats(caster);
  const healAmt = Math.min(dmg, casterStats.maxHp - caster.hp);
  caster.hp += healAmt;
  addLog(`👻 ${getDisplayName(caster)} siphons ${dmg} HP from ${getDisplayName(target)}! (healed ${healAmt} HP)`);
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
  // Bone Explosion: sacrifice an adjacent ally, deal 3 + its maxHp as damage to enemies within 2 tiles
  const sacrificeStats = getUnitStats(sacrifice);
  const blastDmg = 3 + sacrificeStats.maxHp;
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
  G.units = G.units.filter(u => u.hp > 0);
  checkPlayerElimination(target.playerId);
  unit.hasAttacked = true;
  startAbilityCooldown(unit, 'devour');
  interactionMode = 'idle';
  renderAll();
}

function executeTrollRampage(unit, dx, dy) {
  // Rampage: charge up to 3 tiles in a direction, damage first enemy + push
  let hitTarget = null;
  let finalX = unit.x, finalY = unit.y;
  for (let i = 1; i <= 3; i++) {
    const nx = unit.x + dx * i;
    const ny = unit.y + dy * i;
    if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) break;
    if (G.board[ny][nx]) break; // Hit a wall/obstacle
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
  if (hitTarget) {
    const stats = getUnitStats(unit);
    const damage = Math.max(1, stats.attack - getUnitStats(hitTarget).defense);
    hitTarget.hp -= damage;
    addLog(`🧌 ${getDisplayName(unit)} rampages into ${getDisplayName(hitTarget)} for ${damage} damage!`);
    // Push target 1 tile
    const pushX = hitTarget.x + dx;
    const pushY = hitTarget.y + dy;
    if (pushX >= 0 && pushX < G.boardSize && pushY >= 0 && pushY < G.boardSize &&
        !G.board[pushY][pushX] && !G.units.some(u => u.x === pushX && u.y === pushY && u.hp > 0)) {
      hitTarget.x = pushX;
      hitTarget.y = pushY;
      addLog(`💨 ${getDisplayName(hitTarget)} is pushed back to (${pushX},${pushY})!`);
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
  // Lullaby: beguile all adjacent enemies — they can move but cannot attack/act
  const enemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && isAdjacent(unit.x, unit.y, u.x, u.y)
  );
  for (const enemy of enemies) {
    enemy.lullabied = true; // flag to re-apply beguiled at their next turn start
    applyStatusEffect(enemy, 'beguiled', 1); // also apply immediately
  }
  startAbilityCooldown(unit, 'lullaby');
  addLog(`🧜 ${getDisplayName(unit)} sings a Lullaby! ${enemies.length} ${enemies.length === 1 ? 'enemy' : 'enemies'} beguiled!`);
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
  for (const slot of EQUIP_SLOTS) {
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
  const alive = G.units.some(u => u.playerId === playerId && u.hp > 0);
  if (!alive) {
    G.players[playerId].alive = false;
    addLog(`⚔ ${G.players[playerId].name} has been eliminated!`);

    const alivePlayers = G.players.filter(p => p.alive);
    if (alivePlayers.length === 1) {
      addLog(`🏆 ${alivePlayers[0].name} WINS THE GAME!`);
    }
  }
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
    if (r && r.amount > 0) results.push({ x: nx, y: ny, res: r });
  }
  return results;
}

function gatherResource(unit, rx, ry) {
  const resource = G.board[ry][rx];
  if (!resource || resource.amount <= 0) return;
  const type = resource.type;
  const stats = getUnitStats(unit);
  const amount = Math.min(resource.amount, 1 + stats.gatherBonus);

  G.players[unit.playerId].resources[type] += amount;
  resource.amount -= amount;
  unit.hasGathered = true;

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

  addLog(`${getDisplayName(u)} equipped ${item.name}`);
  renderAll();
}

function unequipItem(unitId, slot) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const item = u.equipment[slot];
  if (!item || item === '_two_handed_') return;

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
    applyStatusEffect(u, 'speed_boost', 1);
    u.movementLeft = Math.min(u.movementLeft + 4, getUnitStats(u).movement);
    addLog(`💨 ${getDisplayName(u)} drinks a Speed Potion! (+4 movement this turn)`);
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
  } else if (item.id === 'communist_manifesto') {
    const enemyWorkers = G.units.filter(w => w.hp > 0 && w.playerId !== u.playerId && w.playerId !== NPC_PLAYER_ID && w.type === 'worker');
    for (const w of enemyWorkers) {
      applyStatusEffect(w, 'on_strike', 2);
    }
    addLog(`📕 ${getDisplayName(u)} reads the Communist Manifesto and convinces ${enemyWorkers.length} enemy worker${enemyWorkers.length !== 1 ? 's go' : ' goes'} on strike!`);
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
            !G.units.some(un => un.x === nx && un.y === ny && un.hp > 0)) {
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
    if (unitStats.str >= 5) {
      const sword = JSON.parse(JSON.stringify(ITEMS['excalibur']));
      u.inventory.push(sword);
      addLog(`⚔️ ${getDisplayName(u)} pulls Excalibur from the stone! The legendary blade is theirs!`);
    } else {
      addLog(`⚔️ ${getDisplayName(u)} strains to pull Excalibur from the stone... but is not strong enough! (Need 5 STR, have ${unitStats.str})`);
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

function dropItem(unitId, inventoryIndex) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
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

function getAdjacentGroundItems(unit) {
  return (G.groundItems || []).filter(gi => chebyshevDist(gi.x, gi.y, unit.x, unit.y) <= 1);
}

function pickupGroundItem(unit, groundIndex) {
  const gi = (G.groundItems || [])[groundIndex];
  if (!gi) return;

  // Excalibur in the Stone requires 5+ STR to pick up
  if (gi.item.id === 'excalibur_stone') {
    const stats = getUnitStats(unit);
    if (stats.str < 5) {
      addLog(`⚔️ ${getDisplayName(unit)} tries to pick up ${gi.item.name} but isn't strong enough! (Need 5 STR, have ${stats.str})`);
      interactionMode = 'idle';
      renderAll();
      return;
    }
  }

  unit.inventory.push(gi.item);
  G.groundItems.splice(groundIndex, 1);

  addLog(`${getDisplayName(unit)} picked up ${gi.item.name}`);
  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// UNIT PRODUCTION
// ============================================================
function canAffordUnit(player, type) {
  // Check faction cost overrides first
  const faction = FACTIONS[player.faction];
  const overrideCost = faction && faction.unitOverrides && faction.unitOverrides[type] && faction.unitOverrides[type].cost;
  const cost = overrideCost || UNIT_DEFS[type].cost;
  for (const r of RESOURCE_TYPES) {
    if ((cost[r] || 0) > (player.resources[r] || 0)) return false;
  }
  return true;
}

function startPlacement(type) {
  placingUnitType = type;
  interactionMode = 'place';

  const tiles = [];
  const checked = new Set();
  const sp = G.startPositions ? G.startPositions[G.currentPlayer] : null;
  const cx = sp ? sp.hx : 1;
  const cy = sp ? sp.hy : 1;
  const radius = Math.max(3, Math.floor(G.boardSize / 4));

  // Home base spawn area
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = cx + dx, ny = cy + dy;
      const key = `${nx},${ny}`;
      if (checked.has(key)) continue;
      checked.add(key);
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (getUnitAt(nx, ny)) continue;
      if (G.board[ny][nx]) continue;
      tiles.push({ x: nx, y: ny });
    }
  }

  // Dwarf Muster: also allow spawning near the hero
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
          tiles.push({ x: nx, y: ny });
        }
      }
    }
  }

  reachableTiles = tiles;
  if (tiles.length === 0) {
    addLog('No space to place a new unit!');
    interactionMode = 'idle';
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
  const unit = createUnit(type, G.currentPlayer, x, y, prefix, p.faction);
  unit.id = G.nextUnitId++;
  nextUnitId = G.nextUnitId;
  unit.movementLeft = 0;
  unit.hasAttacked = true;
  unit.hasGathered = true;
  G.units.push(unit);

  const overrideUnitName = faction && faction.unitOverrides && faction.unitOverrides[type] && faction.unitOverrides[type].name;
  addLog(`${p.name} built a ${prefix} ${overrideUnitName || UNIT_DEFS[type].name} at (${x}, ${y})`);
  placingUnitType = null;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

function cancelPlacement() {
  placingUnitType = null;
  placingStructureType = null;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

// ============================================================
// STRUCTURE PLACEMENT
// ============================================================
function canAffordStructure(player, type) {
  const cost = STRUCTURE_DEFS[type].cost;
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
  const radius = Math.max(3, Math.floor(G.boardSize / 4));

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = cx + dx, ny = cy + dy;
      const key = `${nx},${ny}`;
      if (checked.has(key)) continue;
      checked.add(key);
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (G.board[ny][nx]) continue; // resource tile
      if (G.units.some(u => u.x === nx && u.y === ny && u.hp > 0)) continue;
      if (G.structures && G.structures.some(s => s.x === nx && s.y === ny)) continue;
      if (G.shops && G.shops.some(s => s.x === nx && s.y === ny)) continue;
      if (G.vendors && G.vendors.some(v => v.x === nx && v.y === ny)) continue;
      tiles.push({ x: nx, y: ny });
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
  const cost = STRUCTURE_DEFS[type].cost;
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

// ============================================================
// TURN MANAGEMENT
// ============================================================
function endTurn() {
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

  for (const u of G.units) {
    if (u.playerId === G.currentPlayer && u.hp > 0) {
      const stats = getUnitStats(u);
      // Passive regen: heal 1 HP if not adjacent to an enemy and not taking DoT
      // Regeneration passive: heal 2 HP instead of 1
      // Combat Regen Potion: also heals while adjacent to enemies
      const hasDot = u.statusEffects && u.statusEffects.some(se => STATUS_EFFECTS[se.id] && STATUS_EFFECTS[se.id].dot);
      const hasCombatRegen = (u.combatRegenTurns && u.combatRegenTurns > 0) || hasPassive(u, 'combat_regeneration');
      if ((!hasAdjacentEnemy(u) || hasCombatRegen) && !hasDot && u.hp < stats.maxHp) {
        const regenAmt = (hasPassive(u, 'regeneration') || hasCombatRegen) ? 2 : 1;
        u.hp = Math.min(stats.maxHp, u.hp + regenAmt);
        addLog(`💚 ${getDisplayName(u)} regenerates ${regenAmt} HP. (${u.hp}/${stats.maxHp})`);
      }
      u.movementLeft = stats.movement;
      u.hasAttacked = false;
      u.hasGathered = false;
      u.mimicGather = false;
      u.specialActionsUsed = [];
      u.rallyBonus = 0;
      u.stoneSkinBonus = 0;
      u.divineShieldBonus = 0;
      u.berserkBonus = 0;
      u.berserkPenalty = 0;
      u.bloodFrenzyActive = false;
      u.disengaged = false;
      u.musterActive = false;
      u.tilesMoved = 0;
      u.overwatchFired = false;
      u.stunned = false;
      // Lullaby: if lullabied, apply beguiled status this turn
      if (u.lullabied) {
        applyStatusEffect(u, 'beguiled', 1);
        u.lullabied = false;
        if (hasStatusEffect(u, 'beguiled')) {
          addLog(`🎵 ${getDisplayName(u)} is beguiled! They can move but cannot attack or use abilities.`);
        }
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
      // Consecrate aura tick: damage + weaken enemies within 2 tiles
      if (u.consecrateTurns && u.consecrateTurns > 0) {
        const consecEnemies = G.units.filter(e =>
          e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 2
        );
        for (const enemy of consecEnemies) {
          enemy.hp -= 3;
          applyStatusEffect(enemy, 'weakened', 2);
          addLog(`✝ Consecrated ground hits ${getDisplayName(enemy)} for 3 damage! Weakened! (${enemy.hp > 0 ? enemy.hp + ' HP left' : 'DEFEATED!'})`);
          if (enemy.hp <= 0) {
            enemy.hp = 0;
            dropAllItems(enemy);
            addLog(`☠ ${getDisplayName(enemy)} has been slain!`);
          }
        }
        u.consecrateTurns--;
        if (u.consecrateTurns <= 0) {
          addLog(`✝ ${getDisplayName(u)}'s consecration fades.`);
        }
        // Clean up dead units from consecration
        G.units = G.units.filter(uu => uu.hp > 0);
        for (const enemy of consecEnemies) {
          if (enemy.hp <= 0) checkPlayerElimination(enemy.playerId);
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
      // Potion Pouch: generate a Healing Potion every 2 of this player's turns
      if (u.inventory.some(it => it.id === 'potion_pouch')) {
        u.potionPouchCD = (u.potionPouchCD || 0) + 1;
        if (u.potionPouchCD >= 2) {
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
  const pid = G.currentPlayer;
  const overlay = document.getElementById('faction-pick-overlay');
  const playerBanner = document.getElementById('faction-pick-player');
  playerBanner.textContent = `${G.players[pid].name}'s Turn`;
  playerBanner.style.color = PLAYER_COLORS[pid];

  // Populate faction dropdown
  const select = document.getElementById('faction-pick-select');
  const takenFactions = G.players.filter(p => p.faction).map(p => p.faction);
  const factionOrder = ['humans', 'orcs', 'elves', 'dwarves', 'goblins', 'bards', 'trolls', 'skeletons', 'kobolds'];
  select.innerHTML = factionOrder
    .filter(key => FACTIONS[key] && !takenFactions.includes(key))
    .map(key => `<option value="${key}">${FACTIONS[key].name}</option>`)
    .join('');

  // Show other players' faction choices
  const othersDiv = document.getElementById('faction-pick-others');
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
    const cd = ABILITY_COOLDOWNS[hero.ability.id] || 1;
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
        <div class="hero-card-ability">★ ${hero.ability.name}
          <span class="hero-tooltip"><span class="tt-label">★ ${hero.ability.name}</span><br>${hero.ability.desc}<br><span class="tt-cd">${cdText}</span></span>
        </div>
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

  G.nextUnitId = nextUnitId;

  // Place starting barracks near the hero
  if (!G.structures) G.structures = [];
  let barracksPlaced = false;
  for (let r = 1; r <= 4 && !barracksPlaced; r++) {
    for (let dy = -r; dy <= r && !barracksPlaced; dy++) {
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
          type: 'barracks',
          playerId: pid,
          faction: factionId,
          x: bx,
          y: by,
          hp: STRUCTURE_DEFS.barracks.hp
        });
        barracksPlaced = true;
        break;
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
        for (const u of G.units) {
          if (u.playerId === G.currentPlayer && u.hp > 0) {
            const stats = getUnitStats(u);
            const hasDot = u.statusEffects && u.statusEffects.some(se => STATUS_EFFECTS[se.id] && STATUS_EFFECTS[se.id].dot);
            const hasCombatRegen = (u.combatRegenTurns && u.combatRegenTurns > 0) || hasPassive(u, 'combat_regeneration');
            if ((!hasAdjacentEnemy(u) || hasCombatRegen) && !hasDot && u.hp < stats.maxHp) {
              const regenAmt = (hasPassive(u, 'regeneration') || hasCombatRegen) ? 2 : 1;
              u.hp = Math.min(stats.maxHp, u.hp + regenAmt);
            }
            u.movementLeft = stats.movement;
            u.hasAttacked = false;
            u.hasGathered = false;
            u.mimicGather = false;
            u.specialActionsUsed = [];
            u.rallyBonus = 0;
            u.stoneSkinBonus = 0;
            u.divineShieldBonus = 0;
            u.berserkBonus = 0;
            u.berserkPenalty = 0;
            u.bloodFrenzyActive = false;
            u.disengaged = false;
            u.musterActive = false;
            u.tilesMoved = 0;
            u.overwatchFired = false;
            u.stunned = false;
            if (u.lullabied) { u.lullabied = false; }
            if (u.battleCryTurns && u.battleCryTurns > 0) { u.battleCryTurns--; if (u.battleCryTurns <= 0) { u.battleCryBonus = 0; u.battleCryTurns = 0; } }
            if (u.trollBlessingTurns && u.trollBlessingTurns > 0) { u.trollBlessingTurns--; if (u.trollBlessingTurns <= 0) u.trollBlessingTurns = 0; }
            if (u.regenPotionTurns && u.regenPotionTurns > 0) { u.regenPotionTurns--; if (u.regenPotionTurns <= 0) u.regenPotionTurns = 0; }
            if (u.combatRegenTurns && u.combatRegenTurns > 0) { u.combatRegenTurns--; if (u.combatRegenTurns <= 0) u.combatRegenTurns = 0; }
            if (u.consecrateTurns && u.consecrateTurns > 0) {
              const cEnemies = G.units.filter(e => e.hp > 0 && e.playerId !== u.playerId && chebyshevDist(u.x, u.y, e.x, e.y) <= 2);
              for (const e of cEnemies) { e.hp -= 3; applyStatusEffect(e, 'weakened', 2); if (e.hp <= 0) { e.hp = 0; dropAllItems(e); } }
              u.consecrateTurns--;
              G.units = G.units.filter(uu => uu.hp > 0);
              for (const e of cEnemies) { if (e.hp <= 0) checkPlayerElimination(e.playerId); }
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
    const color = PLAYER_CHAT_COLORS[m.playerId % PLAYER_CHAT_COLORS.length];
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
      G.traps = G.traps || [];
      G.tunnels = G.tunnels || [];
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
        u.ragePotionBonus = u.ragePotionBonus || 0;
        u.speedPotionBonus = u.speedPotionBonus || 0;
        u.stoneskinPotionBonus = u.stoneskinPotionBonus || 0;
        u.stoneskinPotionTurns = u.stoneskinPotionTurns || 0;
        u.battleCryBonus = u.battleCryBonus || 0;
        u.battleCryTurns = u.battleCryTurns || 0;
        u.trollBlessingTurns = u.trollBlessingTurns || 0;
        u.regenPotionTurns = u.regenPotionTurns || 0;
        u.consecrateTurns = u.consecrateTurns || 0;
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
  return G.units.some(u =>
    u.hp > 0 && u.playerId !== unit.playerId && chebyshevDist(unit.x, unit.y, u.x, u.y) <= range
  );
}

function beastChaseToward(beast, target) {
  const maxSteps = 3;
  let moved = 0;
  for (let step = 0; step < maxSteps; step++) {
    const dx = Math.sign(target.x - beast.x);
    const dy = Math.sign(target.y - beast.y);
    const nx = beast.x + dx;
    const ny = beast.y + dy;
    if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) break;
    // Can't move onto impassable resource tiles
    const cell = G.board[ny][nx];
    if (cell && cell.type && cell.amount > 0) break;
    // Can't move onto occupied tiles
    if (G.units.some(u => u.hp > 0 && u.x === nx && u.y === ny)) break;
    beast.x = nx;
    beast.y = ny;
    moved++;
    // Stop if now adjacent to attacker
    if (isAdjacent(beast.x, beast.y, target.x, target.y)) break;
  }
  if (moved > 0) {
    addLog(`🐉 ${getDisplayName(beast)} charges ${moved} space${moved > 1 ? 's' : ''} toward ${getDisplayName(target)}!`);
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
