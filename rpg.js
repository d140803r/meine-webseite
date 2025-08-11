class Player {
  constructor() {
    this.level = 1;
    this.xp = 0;
    this.inventory = [];
    this.quests = [];
  }

  gainXP(amount) {
    this.xp += amount;
    while (this.xp >= this.level * 100) {
      this.xp -= this.level * 100;
      this.level++;
    }
    this.updateUI();
  }

  addItem(item) {
    if (item) {
      this.inventory.push(item);
      this.updateUI();
    }
  }

  startQuest(name) {
    if (name) {
      this.quests.push(name);
      this.updateUI();
    }
  }

  finishQuest(name) {
    const index = this.quests.indexOf(name);
    if (index >= 0) {
      this.quests.splice(index, 1);
      this.gainXP(50);
      this.updateUI();
    }
  }

  updateUI() {
    document.getElementById('level').textContent = this.level;
    document.getElementById('xp').textContent = this.xp;

    const invList = document.getElementById('inventory');
    invList.innerHTML = '';
    this.inventory.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      invList.appendChild(li);
    });

    const questList = document.getElementById('quests');
    questList.innerHTML = '';
    this.quests.forEach(q => {
      const li = document.createElement('li');
      li.textContent = q;
      questList.appendChild(li);
    });
  }
}

const player = new Player();
player.updateUI();

document.getElementById('gainXpBtn').addEventListener('click', () => {
  player.gainXP(20);
});

document.getElementById('addItemBtn').addEventListener('click', () => {
  const item = prompt('Welchen Gegenstand hinzufügen?');
  player.addItem(item);
});

document.getElementById('addQuestBtn').addEventListener('click', () => {
  const quest = prompt('Name der neuen Quest?');
  player.startQuest(quest);
});

document.getElementById('finishQuestBtn').addEventListener('click', () => {
  const quest = prompt('Welche Quest abschließen?');
  player.finishQuest(quest);
});
