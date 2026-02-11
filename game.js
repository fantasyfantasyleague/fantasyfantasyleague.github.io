// ============================================================
// CONSTANTS
// ============================================================
const PLAYER_COLORS = ['#7B2FFF', '#FF2222', '#00CC44', '#FF8800'];
const PLAYER_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
const NPC_PLAYER_ID = -1;
const BEAST_COLOR = '#9932CC';

const FACTIONS = {
  goblins: {
    name: 'Goblins', prefix: 'Goblin',
    chars: { worker: 'g', warrior: 'ɡ', hero: 'G' },
    heroAbility: { id: 'goblin_ambush', name: 'Ambush', desc: 'Vanish and reappear within 3 tiles, ignoring obstacles' },
    unitOverrides: {
      worker:  { hp: 3, movement: 4, attack: 1, defense: 0, str: 0, agi: 4, con: 0, int: 2 },
      warrior: { hp: 6, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 0, startingEquipment: { mainhand: 'poisoned_dagger' } },
      hero:    { hp: 10, movement: 6, attack: 3, defense: 2, str: 2, agi: 4, con: 1, int: 1, startingEquipment: { head: 'wolf_pelt_hood', mainhand: 'poisoned_dagger', offhand: 'buckler' } }
    }
  },
  humans: {
    name: 'Humans', prefix: 'Human',
    chars: { worker: 'p', warrior: '♟', hero: '♚' },
    heroAbility: { id: 'human_rally', name: 'Rally', desc: 'Boost all adjacent allies +3 ATK this turn' },
    unitOverrides: {
      worker:  { hp: 4, movement: 3, attack: 1, defense: 1, str: 1, agi: 1, con: 1, int: 2 },
      warrior: { hp: 8, movement: 4, attack: 2, defense: 2, str: 2, agi: 1, con: 1, int: 0, startingEquipment: { mainhand: 'short_sword', offhand: 'wooden_shield' } },
      hero:    { hp: 14, movement: 5, attack: 3, defense: 3, str: 3, agi: 2, con: 2, int: 1, startingEquipment: { body: 'chain_mail', mainhand: 'short_sword', offhand: 'wooden_shield' } }
    }
  },
  elves: {
    name: 'Elves', prefix: 'Elf',
    chars: { worker: 'e', warrior: '⌁', hero: '✦' },
    heroAbility: { id: 'elf_leap', name: 'Leap', desc: 'Jump over a 1-thick obstacle to land on the other side' },
    unitOverrides: {
      worker:  { hp: 3, movement: 3, attack: 1, defense: 1, str: 0, agi: 3, con: 0, int: 3 },
      warrior: { hp: 7, movement: 5, attack: 2, defense: 1, str: 1, agi: 3, con: 0, int: 1, startingEquipment: { mainhand: 'longbow', offhand: '_two_handed_' } },
      hero:    { hp: 12, movement: 6, attack: 3, defense: 2, str: 2, agi: 4, con: 1, int: 2, startingEquipment: { body: 'leather_vest', mainhand: 'rapier' } }
    }
  },
  orcs: {
    name: 'Orcs', prefix: 'Orc',
    chars: { worker: 'o', warrior: 'Ø', hero: '☠' },
    heroAbility: { id: 'orc_warcry', name: 'War Cry', desc: 'Adjacent enemies lose their attack this turn' },
    unitOverrides: {
      worker:  { hp: 5, movement: 2, attack: 2, defense: 1, str: 2, agi: 0, con: 1, int: 1 },
      warrior: { hp: 10, movement: 3, attack: 3, defense: 2, str: 3, agi: 0, con: 2, int: 0, startingEquipment: { mainhand: 'hand_axe' } },
      hero:    { hp: 18, movement: 4, attack: 4, defense: 3, str: 4, agi: 1, con: 3, int: 0, startingEquipment: { head: 'iron_helm', mainhand: 'battleaxe', offhand: '_two_handed_' } }
    }
  },
  dwarves: {
    name: 'Dwarves', prefix: 'Dwarf',
    chars: { worker: 'd', warrior: '⚒', hero: '⛏' },
    heroAbility: { id: 'dwarf_stoneskin', name: 'Stone Skin', desc: '+5 DEF until end of turn' },
    unitOverrides: {
      worker:  { hp: 5, movement: 2, attack: 1, defense: 2, str: 1, agi: 0, con: 2, int: 2 },
      warrior: { hp: 10, movement: 3, attack: 2, defense: 3, str: 2, agi: 0, con: 2, int: 0, startingEquipment: { mainhand: 'mace', offhand: 'buckler' } },
      hero:    { hp: 16, movement: 3, attack: 3, defense: 4, str: 3, agi: 0, con: 4, int: 1, startingEquipment: { body: 'chain_mail', mainhand: 'warhammer', offhand: '_two_handed_' } }
    }
  }
};

const EQUIP_SLOTS = ['head', 'body', 'legs', 'feet', 'mainhand', 'offhand', 'accessory'];
const SLOT_LABELS = { head: 'Head', body: 'Body', legs: 'Legs', feet: 'Feet', mainhand: 'Main Hand', offhand: 'Off Hand', accessory: 'Accessory' };

// ============================================================
// ITEMS DATABASE
// ============================================================
const ITEMS = {
  // --- Head ---
  leather_cap:          { id: 'leather_cap',          name: 'Leather Cap',          slot: 'head',     stats: { defense: 1 },                      weight: 1, description: 'A simple leather cap.' },
  iron_helm:            { id: 'iron_helm',            name: 'Iron Helm',            slot: 'head',     stats: { defense: 2 },                      weight: 2, description: 'A sturdy iron helmet.' },
  helm_of_constitution: { id: 'helm_of_constitution', name: 'Helm of Constitution', slot: 'head',     stats: { defense: 1, con: 3 },              weight: 2, description: '+3 CON. Fortifies vitality.' },
  crown_of_intellect:   { id: 'crown_of_intellect',   name: 'Crown of Intellect',   slot: 'head',     stats: { int: 4 },                          weight: 1, description: '+4 INT. Sharpens the mind.' },
  wolf_pelt_hood:       { id: 'wolf_pelt_hood',       name: 'Wolf Pelt Hood',       slot: 'head',     stats: { defense: 1, str: 1, agi: 1 },     weight: 1, description: 'A savage wolf pelt hood.' },

  // --- Body ---
  leather_vest:         { id: 'leather_vest',         name: 'Leather Vest',          slot: 'body',    stats: { defense: 1, agi: 2 },              weight: 1, description: '+2 AGI. Light and flexible.' },
  chain_mail:           { id: 'chain_mail',           name: 'Chain Mail',            slot: 'body',    stats: { defense: 3 },                      weight: 3, description: 'Interlocked metal rings.' },
  plate_armor:          { id: 'plate_armor',          name: 'Plate Armor',           slot: 'body',    stats: { defense: 5, str: 1 },              weight: 5, description: '+1 STR. Massive protection, very heavy.' },
  teleportation_cloak:  { id: 'teleportation_cloak',  name: 'Teleportation Cloak',   slot: 'body',    stats: { defense: 1, agi: 1 },              weight: 1, description: 'Grants Teleport Home action.', action: 'teleport_home' },
  robe_of_the_archmage: { id: 'robe_of_the_archmage', name: 'Robe of the Archmage',  slot: 'body',    stats: { defense: 2, int: 3 },              weight: 1, description: '+3 INT. Shimmers with magic.' },

  // --- Legs ---
  leather_leggings:     { id: 'leather_leggings',     name: 'Leather Leggings',      slot: 'legs',    stats: { defense: 1 },                      weight: 1, description: 'Simple leather leggings.' },
  iron_greaves:         { id: 'iron_greaves',         name: 'Iron Greaves',          slot: 'legs',    stats: { defense: 2 },                      weight: 2, description: 'Solid iron leg armor.' },
  leggings_of_evasion:  { id: 'leggings_of_evasion',  name: 'Leggings of Evasion',   slot: 'legs',    stats: { agi: 3, defense: 1 },              weight: 1, description: '+3 AGI. Magically light.' },
  titan_legguards:      { id: 'titan_legguards',      name: 'Titan Legguards',       slot: 'legs',    stats: { defense: 3, str: 2 },              weight: 3, description: '+2 STR. Forged for giants.' },

  // --- Feet ---
  leather_boots:        { id: 'leather_boots',        name: 'Leather Boots',         slot: 'feet',    stats: {},                                  weight: 1, description: 'Basic leather footwear.' },
  iron_boots:           { id: 'iron_boots',           name: 'Iron Boots',            slot: 'feet',    stats: { defense: 1 },                      weight: 2, description: 'Heavy iron boots.' },
  boots_of_speed:       { id: 'boots_of_speed',       name: 'Boots of Speed',        slot: 'feet',    stats: { agi: 4 },                          weight: 0, description: '+4 AGI. Feather-light; move farther.' },
  sandals_of_the_saint: { id: 'sandals_of_the_saint', name: 'Sandals of the Saint',  slot: 'feet',    stats: { con: 2, int: 2 },                  weight: 0, description: '+2 CON, +2 INT. Blessed footwear.' },

  // --- Main Hand (One-Handed) ---
  pickaxe:              { id: 'pickaxe',              name: 'Pickaxe',               slot: 'mainhand', stats: { attack: 1 },                      weight: 1, description: 'A mining pick. Meager weapon.' },
  short_sword:          { id: 'short_sword',          name: 'Short Sword',           slot: 'mainhand', stats: { attack: 2 },                      weight: 1, description: 'A simple blade.' },
  flaming_sword:        { id: 'flaming_sword',        name: 'Flaming Sword',         slot: 'mainhand', stats: { attack: 3, str: 2 },              weight: 2, description: '+2 STR. Wreathed in fire.' },
  poisoned_dagger:      { id: 'poisoned_dagger',      name: 'Poisoned Dagger',       slot: 'mainhand', stats: { attack: 2, agi: 2 },              weight: 1, description: '+2 AGI. Quick and deadly.' },
  mace:                 { id: 'mace',                 name: 'Mace',                  slot: 'mainhand', stats: { attack: 2, str: 1 },              weight: 2, description: '+1 STR. Blunt and brutal.' },
  rapier:               { id: 'rapier',               name: 'Rapier',                slot: 'mainhand', stats: { attack: 2, agi: 3 },              weight: 1, description: '+3 AGI. Elegant and precise.' },
  hand_axe:             { id: 'hand_axe',             name: 'Hand Axe',              slot: 'mainhand', stats: { attack: 3 },                      weight: 2, description: 'A compact chopping weapon.' },

  // --- Main Hand (Two-Handed) ---
  broad_sword:          { id: 'broad_sword',          name: 'Broad Sword',           slot: 'mainhand', stats: { attack: 4 },                      weight: 3, twoHanded: true, description: 'A heavy, wide blade. Requires both hands.' },
  staff_of_wisdom:      { id: 'staff_of_wisdom',      name: 'Staff of Wisdom',       slot: 'mainhand', stats: { attack: 1, int: 4, con: 1 },     weight: 2, twoHanded: true, description: '+4 INT, +1 CON. A scholar\'s weapon. Two-handed.' },
  battleaxe:            { id: 'battleaxe',            name: 'Battleaxe',             slot: 'mainhand', stats: { attack: 5, str: 2 },              weight: 4, twoHanded: true, description: '+2 STR. Devastating cleave. Two-handed.' },
  greatsword:           { id: 'greatsword',           name: 'Greatsword',            slot: 'mainhand', stats: { attack: 5, str: 1 },              weight: 4, twoHanded: true, description: '+1 STR. Massive blade. Two-handed.' },
  warhammer:            { id: 'warhammer',            name: 'Warhammer',             slot: 'mainhand', stats: { attack: 4, str: 2, con: 1 },     weight: 5, twoHanded: true, description: '+2 STR, +1 CON. Crushes armor. Two-handed.' },
  longbow:              { id: 'longbow',              name: 'Longbow',               slot: 'mainhand', stats: { attack: 3, agi: 3 },              weight: 2, twoHanded: true, range: 4, description: '+3 AGI. Ranged (4). Two-handed.' },
  crossbow:             { id: 'crossbow',             name: 'Crossbow',              slot: 'mainhand', stats: { attack: 4 },                      weight: 3, twoHanded: true, range: 3, description: 'Heavy bolt. Ranged (3). Two-handed.' },
  throwing_knives:      { id: 'throwing_knives',      name: 'Throwing Knives',       slot: 'mainhand', stats: { attack: 2, agi: 2 },              weight: 1, range: 2, description: '+2 AGI. Ranged (2). One-handed.' },
  halberd:              { id: 'halberd',              name: 'Halberd',               slot: 'mainhand', stats: { attack: 4, str: 1, agi: 1 },     weight: 4, twoHanded: true, description: '+1 STR, +1 AGI. Polearm with reach. Two-handed.' },
  spear:                { id: 'spear',                name: 'Spear',                 slot: 'mainhand', stats: { attack: 3, agi: 2 },              weight: 2, twoHanded: true, description: '+2 AGI. Long thrusting weapon. Two-handed.' },

  // --- Off Hand ---
  wooden_shield:        { id: 'wooden_shield',        name: 'Wooden Shield',         slot: 'offhand',  stats: { defense: 2 },                     weight: 2, description: 'A sturdy wooden shield.' },
  iron_shield:          { id: 'iron_shield',          name: 'Iron Shield',           slot: 'offhand',  stats: { defense: 3, con: 1 },             weight: 3, description: '+1 CON. Heavy iron shield.' },
  gloves_of_haste:      { id: 'gloves_of_haste',      name: 'Gloves of Haste',       slot: 'offhand',  stats: { attack: 1, agi: 1 },              weight: 0, description: 'Grants Double Strike action.', action: 'double_strike' },
  tome_of_knowledge:    { id: 'tome_of_knowledge',    name: 'Tome of Knowledge',     slot: 'offhand',  stats: { int: 3 },                         weight: 1, description: '+3 INT. Ancient arcane text.' },
  buckler:              { id: 'buckler',              name: 'Buckler',               slot: 'offhand',  stats: { defense: 1, agi: 1 },             weight: 1, description: '+1 AGI. Light and quick.' },

  // --- Accessory ---
  ring_of_power:        { id: 'ring_of_power',        name: 'Ring of Power',         slot: 'accessory', stats: { str: 3, attack: 1 },             weight: 0, description: '+3 STR. Pulses with energy.' },
  amulet_of_protection: { id: 'amulet_of_protection', name: 'Amulet of Protection',  slot: 'accessory', stats: { defense: 2, con: 2 },            weight: 0, description: '+2 CON. Wards off harm.' },
  lucky_charm:          { id: 'lucky_charm',          name: 'Lucky Charm',           slot: 'accessory', stats: { str: 1, agi: 1, con: 1, int: 1 }, weight: 0, description: '+1 to all stats.' },
  cloak_pin_of_shadows: { id: 'cloak_pin_of_shadows', name: 'Cloak Pin of Shadows',  slot: 'accessory', stats: { agi: 3 },                        weight: 0, description: '+3 AGI. Blend into darkness.' },
  warrior_pendant:      { id: 'warrior_pendant',      name: "Warrior's Pendant",     slot: 'accessory', stats: { str: 2, con: 1 },                weight: 0, description: '+2 STR, +1 CON. A soldier\'s heirloom.' },
};

const LOOT_ITEMS = [
  'flaming_sword', 'helm_of_constitution', 'boots_of_speed', 'gloves_of_haste',
  'ring_of_power', 'amulet_of_protection', 'teleportation_cloak', 'plate_armor',
  'crown_of_intellect', 'lucky_charm', 'robe_of_the_archmage', 'leggings_of_evasion',
  'battleaxe', 'poisoned_dagger', 'iron_shield', 'cloak_pin_of_shadows',
  'wolf_pelt_hood', 'titan_legguards', 'sandals_of_the_saint', 'staff_of_wisdom',
  'tome_of_knowledge', 'warrior_pendant', 'buckler',
  'greatsword', 'warhammer', 'longbow', 'halberd', 'spear', 'rapier', 'mace', 'hand_axe',
  'crossbow', 'throwing_knives'
];

// ============================================================
// UNIT DEFINITIONS
// ============================================================
const UNIT_DEFS = {
  worker: {
    name: 'Worker', char: 'w', hp: 4, movement: 3,
    attack: 1, defense: 1,
    str: 0, agi: 2, con: 0, int: 2,
    canGather: true, canFight: false,
    cost: { wood: 2, stone: 1, gold: 0, water: 0 },
    startingEquipment: { head: 'leather_cap', body: 'leather_vest', legs: 'leather_leggings', feet: 'leather_boots', mainhand: 'pickaxe', offhand: null, accessory: null }
  },
  warrior: {
    name: 'Warrior', char: 'k', hp: 8, movement: 4,
    attack: 2, defense: 2,
    str: 2, agi: 1, con: 1, int: 0,
    canGather: false, canFight: true,
    cost: { wood: 3, stone: 2, gold: 1, water: 0 },
    startingEquipment: { head: 'iron_helm', body: 'chain_mail', legs: 'leather_leggings', feet: 'leather_boots', mainhand: 'short_sword', offhand: 'wooden_shield', accessory: null }
  },
  hero: {
    name: 'Hero', char: 'H', hp: 14, movement: 5,
    attack: 3, defense: 3,
    str: 3, agi: 2, con: 2, int: 1,
    canGather: false, canFight: true,
    cost: { wood: 5, stone: 4, gold: 3, water: 2 },
    startingEquipment: { head: 'iron_helm', body: 'chain_mail', legs: 'iron_greaves', feet: 'iron_boots', mainhand: 'broad_sword', offhand: '_two_handed_', accessory: null }
  },
  beast: {
    name: 'Foul Beast', char: 'B', hp: 12, movement: 0,
    attack: 5, defense: 6,
    str: 3, agi: 1, con: 2, int: 0,
    canGather: false, canFight: true, npc: true,
    cost: { wood: 0, stone: 0, gold: 0, water: 0 },
    startingEquipment: { head: null, body: null, legs: null, feet: null, mainhand: null, offhand: null, accessory: null }
  }
};

const RESOURCE_TYPES = ['wood', 'stone', 'gold', 'water'];
const RESOURCE_CHARS = { wood: '♣', stone: '●', gold: '★', water: '~' };
const RESOURCE_COLORS = { wood: '#228B22', stone: '#8B0000', gold: '#DAA520', water: '#4682B4' };
const RESOURCE_WEIGHTS = { wood: 8, stone: 7, gold: 5, water: 5 };
const RESOURCE_DENSITY = 0.32;

// ============================================================
// GAME STATE
// ============================================================
let G = null;
let selectedUnitId = null;
let selectedGroundTile = null;
let interactionMode = 'idle';
let placingUnitType = null;
let reachableTiles = [];
let nextUnitId = 0;

// ============================================================
// STAT COMPUTATION
// ============================================================
// STR → +1 ATK per point
// AGI → +1 movement per 5 points; weight penalty = max(0, floor((weight-10)/5))
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
    if (item.range && item.range > attackRange) attackRange = item.range;
    if (item.action) actions.push(item.action);
  }

  const attack = unit.attack + equipAtk + totalStr + (unit.rallyBonus || 0);
  const defense = unit.defense + equipDef + (unit.stoneSkinBonus || 0);
  const maxHp = unit.maxHp + totalCon * 2;
  const agiBonus = Math.floor(totalAgi / 5);
  const weightPenalty = Math.max(0, Math.floor((totalWeight - 10) / 5));
  const movement = Math.max(1, unit.movement + agiBonus - weightPenalty);
  const gatherBonus = Math.floor(totalInt / 2);

  return { str: totalStr, agi: totalAgi, con: totalCon, int: totalInt,
           attack, defense, maxHp, movement, weight: totalWeight, gatherBonus, attackRange, actions };
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
      </div>
      <div class="setup-row">
        <label>Faction:</label>
        <select id="pfaction-${i}">
          ${Object.entries(FACTIONS).map(([key, f]) => `<option value="${key}">${f.name}</option>`).join('')}
        </select>
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
      faction: document.getElementById(`pfaction-${i}`).value,
      resources: { wood: 0, stone: 0, gold: 0, water: 0 },
      alive: true
    });
  }

  const board = generateBoard(boardSize, numPlayers);

  nextUnitId = 0;
  const units = [];
  const startPositions = getStartPositions(numPlayers, boardSize);
  for (let i = 0; i < numPlayers; i++) {
    const pos = startPositions[i];
    const factionId = players[i].faction;
    const prefix = FACTIONS[factionId].prefix;

    units.push(createUnit('hero', i, pos.hx, pos.hy, prefix, factionId));
    units.push(createUnit('worker', i, pos.w1x, pos.w1y, prefix, factionId));
    units.push(createUnit('worker', i, pos.w2x, pos.w2y, prefix, factionId));

    for (const u of units.filter(u => u.playerId === i)) {
      board[u.y][u.x] = null;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = u.x + dx, ny = u.y + dy;
          if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
            board[ny][nx] = null;
          }
        }
      }
    }
  }

  // Spawn Foul Beasts
  const numBeasts = Math.max(2, Math.floor(boardSize * boardSize / 120));
  for (let attempt = 0, placed = 0; attempt < numBeasts * 20 && placed < numBeasts; attempt++) {
    const bx = Math.floor(Math.random() * boardSize);
    const by = Math.floor(Math.random() * boardSize);
    if (board[by][bx]) continue;
    if (units.some(u => u.x === bx && u.y === by)) continue;
    if (units.some(u => chebyshevDist(u.x, u.y, bx, by) < 5)) continue;
    const beast = createUnit('beast', NPC_PLAYER_ID, bx, by, '');
    // Give beast a random loot item
    const lootId = LOOT_ITEMS[Math.floor(Math.random() * LOOT_ITEMS.length)];
    beast.inventory.push(JSON.parse(JSON.stringify(ITEMS[lootId])));
    units.push(beast);
    placed++;
  }

  // Scatter loot items on the map
  const groundItems = [];
  const numScattered = Math.max(3, Math.floor(boardSize * boardSize / 150));
  for (let attempt = 0, placed = 0; attempt < numScattered * 20 && placed < numScattered; attempt++) {
    const ix = Math.floor(Math.random() * boardSize);
    const iy = Math.floor(Math.random() * boardSize);
    if (board[iy][ix]) continue;
    if (units.some(u => u.x === ix && u.y === iy)) continue;
    if (units.some(u => chebyshevDist(u.x, u.y, ix, iy) < 3)) continue;
    const lootId = LOOT_ITEMS[Math.floor(Math.random() * LOOT_ITEMS.length)];
    groundItems.push({ x: ix, y: iy, item: JSON.parse(JSON.stringify(ITEMS[lootId])) });
    placed++;
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
    log: ['Game started!'],
    nextUnitId: nextUnitId
  };

  selectedUnitId = null;
  interactionMode = 'idle';
  showScreen('game-screen');
  renderAll();
}

function createUnit(type, playerId, x, y, factionPrefix, factionId) {
  const def = UNIT_DEFS[type];
  const faction = factionId ? FACTIONS[factionId] : null;
  const overrides = (faction && faction.unitOverrides && faction.unitOverrides[type]) || {};
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

  const unit = {
    id: nextUnitId++,
    playerId: playerId,
    type: type,
    faction: factionId || null,
    name: factionPrefix ? `${factionPrefix} ${def.name}` : def.name,
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
    stunned: false,
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
    if (Math.random() < 0.18) {
      board[st.y][st.x] = { type: 'gold', amount: 2 + Math.floor(Math.random() * 3) };
    }
  }
  const goldSeeds = Math.max(3, Math.floor(stoneTiles.length * 0.07));
  for (let i = 0; i < goldSeeds; i++) {
    if (stoneTiles.length === 0) break;
    const origin = stoneTiles[Math.floor(Math.random() * stoneTiles.length)];
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    for (const [dx, dy] of dirs) {
      const nx = origin.x + dx, ny = origin.y + dy;
      if (nx >= 0 && nx < size && ny >= 0 && ny < size && !board[ny][nx] && Math.random() < 0.4) {
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
// RENDERING
// ============================================================
function renderAll() {
  renderBoard();
  renderHeader();
  renderResources();
  renderProduction();
  renderUnitPanel();
  renderActionsPanel();
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

      if (unit) {
        const def = UNIT_DEFS[unit.type];
        const factionChars = unit.faction && FACTIONS[unit.faction] ? FACTIONS[unit.faction].chars : null;
        cell.textContent = (factionChars && factionChars[unit.type]) || def.char;
        cell.style.color = unit.playerId === NPC_PLAYER_ID ? BEAST_COLOR : PLAYER_COLORS[unit.playerId];
        if (unit.playerId === NPC_PLAYER_ID) cell.classList.add('beast-unit');
        if (unit.id === selectedUnitId) cell.classList.add('selected');
      } else if (resource) {
        cell.textContent = '';
        cell.style.background = RESOURCE_COLORS[resource.type];
      } else if (hasGroundItem) {
        cell.textContent = '◆';
        cell.style.color = '#FFD700';
        cell.style.textShadow = '0 0 4px #FFD700';
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
      if ((interactionMode === 'ambush' || interactionMode === 'leap') && reachableTiles.some(t => t.x === x && t.y === y)) {
        cell.classList.add('highlight-move');
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

  // Ground item inspection
  if (selectedGroundTile) {
    const items = (G.groundItems || []).filter(gi => gi.x === selectedGroundTile.x && gi.y === selectedGroundTile.y);
    if (items.length === 0) { selectedGroundTile = null; panel.style.display = 'none'; return; }
    panel.style.display = 'block';
    let html = `<div class="unit-name" style="color: #DAA520">Items on ground (${selectedGroundTile.x}, ${selectedGroundTile.y})</div>`;
    for (const gi of items) {
      const statStr = itemStatString(gi.item);
      html += `<div class="inv-item">
        <span class="item-name" title="${gi.item.description || ''}">${gi.item.name}</span>
        <span class="item-stats">(${SLOT_LABELS[gi.item.slot]}) ${statStr}</span>
      </div>`;
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
    <div class="unit-name" style="color: ${unitColor}">${u.name} (${ownerName})</div>
    <div class="stat-grid">
      <div class="info-row"><span class="label" title="Hit Points. Unit dies at 0.">HP</span><span>${u.hp} / ${stats.maxHp}</span></div>
      <div class="info-row"><span class="label" title="Spaces this unit can move per turn.">Move</span><span>${u.movementLeft} / ${stats.movement}</span></div>
      <div class="info-row"><span class="label" title="Attack power. Rolled as D6 + ATK vs enemy DEF.">ATK</span><span>${stats.attack}</span></div>
      <div class="info-row"><span class="label" title="Defense power. Enemy rolls D6 + ATK vs your D6 + DEF.">DEF</span><span>${stats.defense}</span></div>
      <div class="info-row"><span class="label" title="Attack range in tiles. 1 = melee (adjacent only).">Range</span><span>${stats.attackRange > 1 ? stats.attackRange + ' (ranged)' : '1 (melee)'}</span></div>
    </div>
    <div class="stat-grid" style="margin-top:2px;">
      <div class="info-row"><span class="label" title="Strength. +1 ATK per point.">STR</span><span>${stats.str}</span></div>
      <div class="info-row"><span class="label" title="Agility. +1 movement per 5 points (reduced by weight penalty).">AGI</span><span>${stats.agi}</span></div>
      <div class="info-row"><span class="label" title="Constitution. +2 max HP per point.">CON</span><span>${stats.con}</span></div>
      <div class="info-row"><span class="label" title="Intelligence. +1 gather yield per 2 points.">INT</span><span>${stats.int}</span></div>
      <div class="info-row"><span class="label" title="Total equipment weight. Above 10, every 5 weight costs -1 movement.">Weight</span><span>${stats.weight}</span></div>
      <div class="info-row"><span class="label">Type</span><span>${capitalize(u.type)}</span></div>
    </div>`;

  // Equipment section
  html += `<div class="equip-section"><div class="equip-header">Equipment</div>`;
  for (const slot of EQUIP_SLOTS) {
    const item = u.equipment[slot];
    if (item && item !== '_two_handed_') {
      const statStr = itemStatString(item);
      const twoHandTag = item.twoHanded ? ' <span class="two-hand-tag">[2H]</span>' : '';
      html += `<div class="equip-slot">
        <span class="label">${SLOT_LABELS[slot]}:</span>
        <span class="item-name" title="${item.description || ''}">${item.name}${twoHandTag}</span>
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
      const statStr = itemStatString(item);
      html += `<div class="inv-item">
        <span class="item-name" title="${item.description || ''}">${item.name}</span>
        <span class="item-stats">(${SLOT_LABELS[item.slot]}) ${statStr}</span>
        <span class="inv-buttons">
        ${isOwned ? `<button class="btn-tiny" onclick="equipItem(${u.id}, ${i})">Equip</button>
        <button class="btn-tiny" onclick="dropItem(${u.id}, ${i})">Drop</button>` : ''}
        </span>
      </div>`;
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
  if (u.canFight && !u.hasAttacked && !u.stunned && hasEnemyInRange(u)) {
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
      addLog(`💤 ${u.name} rests and heals ${healed} HP. (${u.hp}/${stats.maxHp})`);
      renderAll();
    });
  }

  // Gather
  if (u.canGather && !u.hasGathered && getAdjacentResources(u).length > 0) {
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

  // Item-granted actions
  for (const action of stats.actions) {
    if (action === 'double_strike' && !u.specialActionsUsed.includes('double_strike') && u.canFight && hasEnemyInRange(u)) {
      addAction(list, 'Double Strike', 'Attack without spending action', () => {
        interactionMode = 'double_strike';
        renderBoard();
      }, interactionMode === 'double_strike');
    }
    if (action === 'teleport_home' && !u.specialActionsUsed.includes('teleport_home')) {
      addAction(list, 'Teleport Home', 'Return to starting area', () => {
        executeTeleportHome(u);
      });
    }
  }

  // Hero racial ability
  if (u.type === 'hero' && u.faction) {
    const ability = FACTIONS[u.faction].heroAbility;
    if (ability && !u.specialActionsUsed.includes(ability.id)) {
      if (ability.id === 'goblin_ambush') {
        addAction(list, ability.name, ability.desc, () => {
          interactionMode = 'ambush';
          reachableTiles = getAmbushTiles(u);
          renderBoard();
        }, interactionMode === 'ambush');
      }
      if (ability.id === 'human_rally' && hasAdjacentAlly(u)) {
        addAction(list, ability.name, ability.desc, () => {
          executeRally(u);
        });
      }
      if (ability.id === 'elf_leap') {
        const leapTiles = getLeapTiles(u);
        if (leapTiles.length > 0) {
          addAction(list, ability.name, ability.desc, () => {
            interactionMode = 'leap';
            reachableTiles = leapTiles;
            renderBoard();
          }, interactionMode === 'leap');
        }
      }
      if (ability.id === 'orc_warcry' && hasAdjacentEnemy(u)) {
        addAction(list, ability.name, ability.desc, () => {
          executeWarCry(u);
        });
      }
      if (ability.id === 'dwarf_stoneskin') {
        addAction(list, ability.name, ability.desc, () => {
          executeStoneSkin(u);
        });
      }
    }
  }

  // Deselect
  addAction(list, 'Deselect', '', () => {
    deselectUnit();
  });
}

function addAction(container, label, desc, fn, isActive) {
  const btn = document.createElement('button');
  btn.className = 'btn btn-small' + (isActive ? ' btn-success' : '');
  btn.innerHTML = `${label} ${desc ? `<span style="color:#888;font-size:10px;">${desc}</span>` : ''}`;
  btn.onclick = fn;
  container.appendChild(btn);
}

function renderProduction() {
  const container = document.getElementById('production-list');
  const p = G.players[G.currentPlayer];
  container.innerHTML = '';

  for (const [type, def] of Object.entries(UNIT_DEFS)) {
    if (def.npc) continue;
    const faction = FACTIONS[p.faction];
    const canAfford = canAffordUnit(p, type);

    const hasLivingHero = G.units.some(u => u.playerId === G.currentPlayer && u.type === 'hero' && u.hp > 0);
    if (type === 'hero' && hasLivingHero) continue;

    const costStr = RESOURCE_TYPES
      .filter(r => def.cost[r] > 0)
      .map(r => `<span style="color:${RESOURCE_COLORS[r]}">${def.cost[r]} ${capitalize(r)}</span>`)
      .join(', ');

    const buildLabel = type === 'hero' ? 'Resurrect' : 'Build';

    const div = document.createElement('div');
    div.className = 'prod-item';
    div.innerHTML = `
      <div>
        <div style="color:${canAfford ? '#2F4F2F' : '#808080'}">${faction.prefix} ${def.name} <span style="color:${canAfford ? PLAYER_COLORS[G.currentPlayer] : '#808080'}">[${(faction.chars && faction.chars[type]) || def.char}]</span></div>
        <div class="prod-cost">${costStr}</div>
      </div>
      <button class="btn btn-small ${canAfford ? 'btn-success' : ''}" ${canAfford ? '' : 'disabled'} id="prod-${type}">${buildLabel}</button>
    `;
    container.appendChild(div);

    if (canAfford) {
      div.querySelector(`#prod-${type}`).onclick = () => startPlacement(type);
    }
  }
}

function renderLog() {
  const container = document.getElementById('combat-log');
  container.innerHTML = G.log.slice(-30).map(entry => {
    let cls = 'log-info';
    if (entry.includes('attacks') || entry.includes('damage') || entry.includes('defeated') || entry.includes('Strike') || entry.includes('retaliates')) cls = 'log-combat';
    else if (entry.includes('gather')) cls = 'log-gather';
    else if (entry.includes('produced') || entry.includes('built')) cls = 'log-produce';
    else if (entry.includes('moved') || entry.includes('Teleport')) cls = 'log-move';
    else if (entry.includes('equipped') || entry.includes('unequipped') || entry.includes('dropped') || entry.includes('picked up')) cls = 'log-item';
    return `<div class="log-entry ${cls}">${entry}</div>`;
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

  // AMBUSH MODE (Goblin hero teleport)
  if (interactionMode === 'ambush' && selectedUnitId !== null) {
    if (reachableTiles.some(t => t.x === x && t.y === y) && !clickedUnit) {
      const su = getUnit(selectedUnitId);
      su.x = x;
      su.y = y;
      su.specialActionsUsed.push('goblin_ambush');
      addLog(`🗡 ${su.name} ambushes to (${x},${y})!`);
      interactionMode = 'idle';
      reachableTiles = [];
      renderAll();
      return;
    }
    interactionMode = 'idle';
    reachableTiles = [];
  }

  // LEAP MODE (Elf hero jump over obstacles)
  if (interactionMode === 'leap' && selectedUnitId !== null) {
    if (reachableTiles.some(t => t.x === x && t.y === y) && !clickedUnit) {
      const su = getUnit(selectedUnitId);
      su.x = x;
      su.y = y;
      su.specialActionsUsed.push('elf_leap');
      addLog(`🌿 ${su.name} leaps to (${x},${y})!`);
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

  // DEFAULT: select/deselect
  if (clickedUnit && clickedUnit.hp > 0) {
    selectedUnitId = clickedUnit.id;
    selectedGroundTile = null;
    interactionMode = 'idle';
    reachableTiles = [];
  } else {
    // Check for ground items
    const hasGroundItem = (G.groundItems || []).some(gi => gi.x === x && gi.y === y);
    if (hasGroundItem) {
      selectedUnitId = null;
      selectedGroundTile = { x, y };
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
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

// ============================================================
// MOVEMENT
// ============================================================
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
      if (G.board[ny][nx]) continue;
      visited.add(key);
      queue.push({ x: nx, y: ny, steps: steps + 1 });
    }
  }
  return tiles;
}

function moveUnit(unit, x, y) {
  const path = bfsDistance(unit, x, y);
  if (path === null || path > unit.movementLeft) return;

  // Attack of Opportunity
  const adjacentEnemies = G.units.filter(u =>
    u.hp > 0 && u.playerId !== unit.playerId && u.canFight &&
    isAdjacent(unit.x, unit.y, u.x, u.y) &&
    !isAdjacent(x, y, u.x, u.y)
  );
  for (const enemy of adjacentEnemies) {
    addLog(`⚡ ${enemy.name} gets an Attack of Opportunity against ${unit.name}!`);
    performAttack(enemy, unit, { isAoO: true });
    if (unit.hp <= 0) {
      interactionMode = 'idle';
      reachableTiles = [];
      selectedUnitId = null;
      renderAll();
      return;
    }
    // AoO hit stops movement
    unit.movementLeft = 0;
    addLog(`${unit.name} is stopped in their tracks!`);
    interactionMode = 'idle';
    reachableTiles = [];
    renderAll();
    return;
  }

  const oldX = unit.x, oldY = unit.y;
  unit.x = x;
  unit.y = y;
  unit.movementLeft -= path;

  addLog(`${unit.name} moved from (${oldX},${oldY}) to (${x},${y})`);
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
      if (G.board[ny][nx]) continue;
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

  const atkRoll = rollD6() + aStats.attack + 2; // +2 attacker advantage
  const defRoll = rollD6() + dStats.defense;
  let damage = Math.max(0, atkRoll - defRoll);
  if (atkRoll > defRoll) damage = Math.max(1, damage);

  const prefix = isAoO ? '⚡ AoO: ' : isDoubleStrike ? '⚡ ' : '';

  if (damage > 0) {
    defender.hp -= damage;
    addLog(`${prefix}${attacker.name} ${isAoO ? 'hits' : 'attacks'} ${defender.name} — ${atkRoll} vs ${defRoll} → ${damage} damage! (${defender.hp > 0 ? defender.hp + ' HP left' : 'DEFEATED!'})`);

    if (defender.hp <= 0) {
    defender.hp = 0;
    // Drop all items on death
    if (!G.groundItems) G.groundItems = [];
    for (const slot of EQUIP_SLOTS) {
      if (defender.equipment && defender.equipment[slot] && defender.equipment[slot] !== '_two_handed_') {
        G.groundItems.push({ x: defender.x, y: defender.y, item: defender.equipment[slot] });
        addLog(`💎 ${defender.name} dropped ${defender.equipment[slot].name}!`);
        defender.equipment[slot] = null;
      }
    }
    for (const item of (defender.inventory || [])) {
      G.groundItems.push({ x: defender.x, y: defender.y, item: item });
      addLog(`💎 ${defender.name} dropped ${item.name}!`);
    }
    defender.inventory = [];
    addLog(`☠ ${defender.name} has been defeated${isAoO ? ' by an attack of opportunity' : ''}!`);
    G.units = G.units.filter(u => u.hp > 0);
    checkPlayerElimination(defender.playerId);
    return true; // defender died
  }
  } else {
    addLog(`${prefix}${attacker.name} ${isAoO ? 'swings at' : 'attacks'} ${defender.name} — ${atkRoll} vs ${defRoll} → MISS!`);
  }
}

function resolveAttack(attacker, defender) {
  const defenderDied = performAttack(attacker, defender);

  // Foul Beast retaliation
  if (!defenderDied && defender.playerId === NPC_PLAYER_ID && attacker.hp > 0) {
    if (isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
      // Melee range: counter-attack
      addLog(`🐉 ${defender.name} retaliates!`);
      performAttack(defender, attacker);
      if (attacker.hp <= 0) {
        selectedUnitId = null;
      }
    } else {
      // Ranged hit: beast charges toward attacker
      beastChaseToward(defender, attacker);
    }
  }

  attacker.hasAttacked = true;
  interactionMode = 'idle';
  renderAll();
}

function resolveDoubleStrike(attacker, defender) {
  addLog(`⚡ ${attacker.name} uses Double Strike!`);
  const defenderDied = performAttack(attacker, defender, { isDoubleStrike: true });

  // Foul Beast retaliation
  if (!defenderDied && defender.playerId === NPC_PLAYER_ID && attacker.hp > 0) {
    if (isAdjacent(attacker.x, attacker.y, defender.x, defender.y)) {
      addLog(`🐉 ${defender.name} retaliates!`);
      performAttack(defender, attacker);
      if (attacker.hp <= 0) {
        selectedUnitId = null;
      }
    } else {
      beastChaseToward(defender, attacker);
    }
  }

  attacker.specialActionsUsed.push('double_strike');
  // hasAttacked is NOT set — allows a second attack this turn
  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// FACTION ABILITIES
// ============================================================
function getAmbushTiles(unit) {
  // Goblin Ambush: teleport to any empty tile within 3 Chebyshev distance
  const tiles = [];
  for (let dy = -3; dy <= 3; dy++) {
    for (let dx = -3; dx <= 3; dx++) {
      const nx = unit.x + dx;
      const ny = unit.y + dy;
      if (nx < 0 || nx >= G.boardSize || ny < 0 || ny >= G.boardSize) continue;
      if (nx === unit.x && ny === unit.y) continue;
      if (chebyshevDist(unit.x, unit.y, nx, ny) > 3) continue;
      // Must be empty (no unit)
      if (G.units.some(u => u.hp > 0 && u.x === nx && u.y === ny)) continue;
      // Can land on resource tiles (ambush ignores terrain)
      tiles.push({ x: nx, y: ny });
    }
  }
  return tiles;
}

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
  unit.specialActionsUsed.push('human_rally');
  addLog(`📯 ${unit.name} rallies ${allies.length} nearby ${allies.length === 1 ? 'ally' : 'allies'}! (+3 ATK)`);
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
  unit.specialActionsUsed.push('orc_warcry');
  addLog(`💥 ${unit.name} lets out a War Cry! ${enemies.length} ${enemies.length === 1 ? 'enemy is' : 'enemies are'} stunned!`);
  renderAll();
}

function executeStoneSkin(unit) {
  // Dwarf Stone Skin: +5 DEF until next turn
  unit.stoneSkinBonus = 5;
  unit.specialActionsUsed.push('dwarf_stoneskin');
  addLog(`🪨 ${unit.name} activates Stone Skin! (+5 DEF)`);
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
  unit.specialActionsUsed.push('teleport_home');

  addLog(`✨ ${unit.name} teleported from (${oldX},${oldY}) to (${target.x},${target.y})!`);
  interactionMode = 'idle';
  renderAll();
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

  addLog(`${unit.name} gathered ${amount} ${type} from (${rx},${ry}) (${resource.amount} remaining)`);

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

  // If equipping a two-handed weapon, also clear offhand
  if (item.twoHanded) {
    const oldMain = u.equipment.mainhand;
    const oldOff = u.equipment.offhand;
    u.inventory.splice(inventoryIndex, 1);
    if (oldMain && oldMain !== '_two_handed_') u.inventory.push(oldMain);
    if (oldOff && oldOff !== '_two_handed_') u.inventory.push(oldOff);
    u.equipment.mainhand = item;
    u.equipment.offhand = '_two_handed_';
  }
  // If equipping an offhand item and mainhand is two-handed, unequip the 2H weapon first
  else if (slot === 'offhand' && u.equipment.mainhand && u.equipment.mainhand.twoHanded) {
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

  addLog(`${u.name} equipped ${item.name}`);
  renderAll();
}

function unequipItem(unitId, slot) {
  const u = getUnit(unitId);
  if (!u || u.playerId !== G.currentPlayer) return;
  const item = u.equipment[slot];
  if (!item || item === '_two_handed_') return;

  // If unequipping a two-handed weapon, also free the offhand
  if (item.twoHanded && slot === 'mainhand') {
    u.equipment.mainhand = null;
    u.equipment.offhand = null;
  } else {
    u.equipment[slot] = null;
  }
  u.inventory.push(item);

  const stats = getUnitStats(u);
  if (u.hp > stats.maxHp) u.hp = stats.maxHp;
  if (u.movementLeft > stats.movement) u.movementLeft = stats.movement;

  addLog(`${u.name} unequipped ${item.name}`);
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

  addLog(`${u.name} dropped ${item.name}`);
  renderAll();
}

function getAdjacentGroundItems(unit) {
  return (G.groundItems || []).filter(gi => chebyshevDist(gi.x, gi.y, unit.x, unit.y) <= 1);
}

function pickupGroundItem(unit, groundIndex) {
  const gi = (G.groundItems || [])[groundIndex];
  if (!gi) return;

  unit.inventory.push(gi.item);
  G.groundItems.splice(groundIndex, 1);

  addLog(`${unit.name} picked up ${gi.item.name}`);
  interactionMode = 'idle';
  renderAll();
}

// ============================================================
// UNIT PRODUCTION
// ============================================================
function canAffordUnit(player, type) {
  const cost = UNIT_DEFS[type].cost;
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
  const cost = UNIT_DEFS[type].cost;

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

  addLog(`${p.name} built a ${prefix} ${UNIT_DEFS[type].name} at (${x}, ${y})`);
  placingUnitType = null;
  interactionMode = 'idle';
  reachableTiles = [];
  renderAll();
}

function cancelPlacement() {
  placingUnitType = null;
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
  for (const u of G.units) {
    if (u.playerId === G.currentPlayer && u.hp > 0) {
      const stats = getUnitStats(u);
      // Passive regen: heal 1 HP if not adjacent to an enemy
      if (!hasAdjacentEnemy(u) && u.hp < stats.maxHp) {
        u.hp = Math.min(stats.maxHp, u.hp + 1);
        addLog(`💚 ${u.name} regenerates 1 HP. (${u.hp}/${stats.maxHp})`);
      }
      u.movementLeft = stats.movement;
      u.hasAttacked = false;
      u.hasGathered = false;
      u.specialActionsUsed = [];
      u.rallyBonus = 0;
      u.stoneSkinBonus = 0;
      u.stunned = false;
    }
  }

  addLog(`--- ${G.players[G.currentPlayer].name}'s turn (Turn ${G.turn}) ---`);

  showTurnOverlay();
  renderAll();
}

function showTurnOverlay() {
  const overlay = document.getElementById('turn-overlay');
  const title = document.getElementById('overlay-title');
  const msg = document.getElementById('overlay-message');
  title.textContent = `${G.players[G.currentPlayer].name}'s Turn`;
  title.style.color = PLAYER_COLORS[G.currentPlayer];
  msg.textContent = 'Save the game and email it to the next player, or click Continue for local (hotseat) play.';
  overlay.classList.add('active');
}

function continueTurn() {
  document.getElementById('turn-overlay').classList.remove('active');
  renderAll();
}

// ============================================================
// SAVE / LOAD
// ============================================================
function saveGame() {
  const data = JSON.stringify(G, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fantasy-league-turn${G.turn}-${G.players[G.currentPlayer].name.replace(/\s+/g, '_')}.json`;
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
        u.stunned = u.stunned || false;
        if (!u.equipment.mainhand && u.equipment.hands) {
          u.equipment.mainhand = u.equipment.hands;
          delete u.equipment.hands;
        }
        for (const slot of EQUIP_SLOTS) {
          if (u.equipment[slot] === undefined) u.equipment[slot] = null;
        }
      }
      selectedUnitId = null;
      interactionMode = 'idle';
      reachableTiles = [];
      showScreen('game-screen');
      renderAll();
      addLog('Game loaded successfully.');
      renderLog();
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
    addLog(`🐉 ${beast.name} charges ${moved} space${moved > 1 ? 's' : ''} toward ${target.name}!`);
  }
}

function rollD6() { return Math.floor(Math.random() * 6) + 1; }

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

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
updatePlayerSetup();
