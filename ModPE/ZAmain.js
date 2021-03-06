/*
			#####################################
			***Zombie Apocalypse by TeamWorld****
			=========== by PROPHESSOR ===========
			~~~~~~~~~~Все права защищены!~~~~~~~~
			#####################################
*/
	
	// ===== Глобальные переменные ===== //
var $rain, $lighting,$night,$game,$debug,$cmd;


$rain = true; //Дождь при старте?
$lighting = true; //Молнии при старте?
$night = true; //Ночь при старте?
$game = false; //Так надо....
$debug = true; //Режим отладки
$cmd = false; // Доступ к командам

	// ===== Переменные ===== //

//PU100 =)

	// ===== Константы ===== //

const items = {
    syringe: 512,
    ebonite: 516,
    ebonitestick: 515,
    detector: 514,
    staff: 523
}; //ID'шники всех вещей
const foods = {
    cocacola: 29,
    lays: 33,
    sandwich: 34,
    fre: 36,
    energy: 504,
    sausage: 119,
    jar: 506,
    eggs: 507,
    cheese: 509
};
const blocks = {
    titanOre: 180,
    nuclear: 179,
    force_field: 255
}; //ID'шники всех блоков
const armor = {
    zH: 416,
    zC: 417,
    zL: 418,
    zB: 419,
    gas:519
};//ID'шники брони
const give = [
    armor.zH,
    armor.zC,
    armor.zL,
    armor.zB
];//ID'шники, для команды /armor

const PLAYER = getPlayerEnt();

//Создаём масивы с зомбарями =)


const zSkin=['mob/lZombie.png','mob/alex.png', 'mob/zombie.png', 'mob/rZombie.png']; //Скины
const zXp=[1,100, 20, 50]; //Количество жизней
const zDamage=[1,100, 2, 5]; //Дамагэ
const zName=['Зомби - учёный','Алекс', 'Типичный зомби', 'Радиоактивный зомби']; //Погоняло зомбарей
const zRender=[EntityRenderType.villagerZombie, EntityRenderType.zombie, EntityRenderType.zombie, EntityRenderType.zombie]; //Рендеры
const zDrop=[367, 367, ];
const zDropCount=[3, 10, ];
const count = 4; //Количество мобов (в массивах)

// Мобы
const mSkin = ['mob/zcow.png', 'mob/zPig.png']; //Скины мобов...
const mXp = [10, 5, 15]; //Жизни мобов...
const mDamage = [2, 0, 3]; //ДамагЭ мобов... (ага, именно =D)
const mName = ['§cЗомби корова', '§cЗомби свинья']; //"Имена"?!?!
const mType = [32, 32]; //Реальные мобы =P
const mRender = [6, 8]; //"Прикрытие" =З
const mOriginal = [EntityType.COW, EntityType.PIG]; //Незараженный моб

//Боссы
const bSkin = ['mob/zBoss.png', 'mob/cow.png']; //Задолбался! 
const bXp = [1000, 5]; //Серьёзно!!!
const bDamage = [100, 0]; //ЗАДОЛБАЛСЯ!!!
const bName = ['§cЗомби-страж', 'Корова'];
const bType = [32, 32]; //...
const bRender = [ EntityRenderType.ironGolem, 6]; //...

/*//Кастомные мобы
const cSkin = ['mob/zombie.png']; //Задолбался! 
const cXp = [15]; //Серьёзно!!!
const cDamage = [5]; //ЗАДОЛБАЛСЯ!!!
const cName = ['§aДружелюбный зомби'];
const cType = [EntityType.ironGolem]; //...
const cRender = [ EntityRenderType.zombie]; //...*/


//Текст для катсцен (количество, текст, текст2, текст n)
const cs1 = [2, 'Тестовый', 'Текст'];

	// ===== Добавление вещей ===== //

//Блоки
//Block.defineBlock(blocks.nuclear, 'Ядерная бомба',[['nuclear_up', 0],['nuclear_down', 0],['nuclear_side', 0],['nuclear_side', 0],['nuclear_side', 0],['nuclear_side', 0]], 0, true, 0);
//Block.defineBlock(blocks.titanOre, 'Титановая руда',[['titan_ore', 0]], 0, true, 0);

Block.defineBlock(blocks.force_field, 'Силовое поле',[['block', 0]], 0, false, 3); //Силовое поле
Block.setLightLevel(blocks.force_field, 18);
Block.setDestroyTime(blocks.force_field, 9999999);

//Вещи



//Еда

ModPE.setFoodItem(foods.cocacola, 'coca_cola' , 0, 1, 'Coca-Cola', 1);
ModPE.setFoodItem(foods.energy, "energy", 9, "Энергетический напиток",16)
ModPE.setFoodItem(foods.lays, 'lays' , 1, 5, 'Lays', 1);
ModPE.setFoodItem(foods.sandwich, 'sandwich' , 2, 5, 'Sandwich', 4);
ModPE.setFoodItem(foods.fre, 'fre' , 3, 5, 'French fries', 8);
ModPE.setFoodItem(foods.eggs, 'eggs' , 7, 4, 'Яичница', 16);
ModPE.setFoodItem(foods.cheese, 'cheese' , 5, 4, 'Сыр', 16);
ModPE.setFoodItem(foods.jar, 'jar' , 4, 7, 'Консервы', 4);
ModPE.setFoodItem(foods.sausage, 'sausage' , 6, 1, 'Колбаса', 1);

//Броня
Item.defineArmor(armor.zH, 'zombie_helmet', 0, 'Шлем из кожи зомби', 'armor/zombie_1.png', 2, 15, ArmorType.helmet);
Item.defineArmor(armor.zC, 'zombie_chestplate', 0, 'Нагрудник из кожи зомби', 'armor/zombie_1.png', 4, 28, ArmorType.chestplate);
Item.defineArmor(armor.zL, 'zombie_leggings', 0, 'Поножи из кожи зомби', 'armor/zombie_2.png', 3, 25, ArmorType.leggings);
Item.defineArmor(armor.zB, 'zombie_boots', 0, 'Ботинки из кожи зомби', 'armor/zombie_2.png', 2, 20, ArmorType.boots);
Item.defineArmor(armor.gas, 'gas_mask', 0, 'Противогаз', 'armor/gasmask_1.png', 3, 25, ArmorType.helmet);

//Креатив

Player.addItemCreativeInv(armor.gas, 1, 1); //Противогаз
Player.addItemCreativeInv(armor.zH, 1, 1); //зШлем
Player.addItemCreativeInv(armor.zC, 1, 1); //зНагрудник
Player.addItemCreativeInv(armor.zL, 1, 1); //зПоножи
Player.addItemCreativeInv(armor.zB, 1, 1); //зБотинки

Player.addItemCreativeInv(foods.cocacola, 1, 0);
Player.addItemCreativeInv(foods.energy, 1, 0);
Player.addItemCreativeInv(foods.lays, 1, 0);
Player.addItemCreativeInv(foods.sandwich, 1, 0);
Player.addItemCreativeInv(foods.fre, 1, 0);
Player.addItemCreativeInv(foods.eggs, 1, 0);
Player.addItemCreativeInv(foods.cheese, 1, 0);
Player.addItemCreativeInv(foods.jar, 1, 0);
Player.addItemCreativeInv(foods.sausage, 1, 0);

//Крафт

Item.addShapedRecipe(foods.cocacola, 1, 0, ['oao', 'obo', 'oco'], ['a', 351, 3, 'b', 353, 0, 'c', 325, 8]);
Item.addShapedRecipe(foods.energy, 1, 0, ['bab', 'bab', 'bab'], ['a', 392, 0, 'b', 339, 0]);
Item.addShapedRecipe(foods.lays, 4, 0, ['bbb', 'aaa', 'bbb'], ['a', 364, 0, 'b', 297, 0]);
Item.addShapedRecipe(foods.sandwich, 8, 3, ['ooo', 'aaa', 'bbb'], ['a', 393, 0, 'b', 339, 0]);
Item.addShapedRecipe(foods.fre, 1, 0, [' a ', ' a ', ' b '], ["a", 353, 0, 'b', 325, 8]); 
Item.addShapedRecipe(foods.eggs, 2, 0, ['ooa', 'oao', 'aoo'], ['a', 319, 0]);
Item.addShapedRecipe(foods.cheese, 4, 0, ['bbb', 'aaa', 'bbb'], ['a', 349, 0, 'b', 265, 0]);

/*Item.addShapedRecipe(ID SHPRITSA, 1, 0, ['oao', 'obo', 'oco'], ['a', ID IGLY, 0, 'b', ID KOLBY, 0, 'c', 77, 0]);
Item.addShapedRecipe(ID Igly, 3, 0, ['ooo', 'odo', 'odo'], ['d', 265, 0]);
Item.addShapedRecipe(ID KOLBY, 1, 0, ['oao', 'oao', 'oao'], ['a', 102, 0]);
Item.addShapedRecipe(ID GOTOVOVO SHPRITSA, 1, 0, ['oao', 'aba', 'oao'], ['a', ID CELEBNIE TRAV, 0, 'b', ID SHPRITSA, 0]);*/




//Item.addFurnaceRecipe(344, 507, 0);
//Item.addFurnaceRecipe(325, 508, 0);


	// ===== Входит и выходит.... ===== //

function newLevel() //Вход в игру
{
	$game = true;
	if($night){
		 Level.setTime(15000);
	}
	loadMobs(); //Восстановление текстур и рендера мобов
}
function leaveGame() //Выход из игры
{
	$game = false;
}

	// ===== Мод Тиск =P ===== //

function modTick() //Лагающая вещь...
{
	$rain ? Level.setRainLevel(5) : Level.setRainLevel(0); //Защита от читеров
	$lighting ? Level.setLightningLevel (5) : Level.setLightningLevel(0); //Защита от читеров
	if($night){ //Зациклыть ночь
		setNightMode(0);
		if( Level.getTime() >= 2000){
			Level.setTime(15000);
		}
	}
	if(Player.getArmorSlot(0)==519){ //Противогаз
		Entity.addEffect(PLAYER, 15, 20, 0, true, true); //Слепота
	} 
}

	// ===== -!Команды!- ===== //

function procCmd(cmd)
{
    if($debug || cmd){
	switch(cmd){
		 case 'day':
		 $night = true;
		 Level.setTime(8000);
		 clientMessage('§aДень!');
		 break;
		 case 'night':
		 $night = true;
		 Level.setTime(15000);
		 clientMessage('§aНочь!');
		 break;
		 case 'lighting on':
		$lighting = true;
		 Level.setLightningLevel(5);
		clientMessage('§aПогода успешно изменена!');
		break;
		case  'lighting off':
		$lighting = false;
		 Level.setLightningLevel(0);
		clientMessage('§aПогода успешно изменена!');
		break;
		case 'rain on':
		$rain = true;
		 Level.setRainLevel(5);
		 clientMessage('§bДождь включён!');
		break;
		case 'rain off':
		$rain = false;
		 Level.setRainLevel(0);
		 clientMessage('§bДождь выключен!');
		break;
		case 'tunder on':
		$rain = true;
		$lighting = true;
		 Level.setLightningLevel(2);
		 Level.setRainLevel(2);
		 clientMessage('§aВключена гроза!');
		break;
		case 'tunder off':
		$lighting = false;
		$rain = false;
		 Level.setLightningLevel(0);
		 Level.setRainLevel(0);
		 clientMessage('§aПогода изменена на ясную!');
		break;
		case 'night on':
		Level.setNightMode(false);
		$night = true;
		clientMessage('§aНочной режим включен!');
		break;
		case 'night off':
		 Level.setNightMode(true);
		 $night = false;
		clientMessage('§aНочной режим выключен!');
		 break;
 		case 'gm1':
		Level.setGameMode(1);
		clientMessage('§aИгровой режим обновлён');
		break;
		case 'gm0':
		Level.setGameMode(0);
		clientMessage('§aИгровой режим обновлён');
		break;
		 case 'food':
		 Player.addItemInventory(364, 64, 0);
		 clientMessage('§eПриятного аппетита =)');
		 break;
		 case 'bed':
		 Player.addItemInventory(26, 1, 0);
		 clientMessage('§cНе поспишь =)');
		 break;
		case 'armor':
		addItemInventory(give[0], 1, 0);
		addItemInventory(give[1], 1, 0);
		addItemInventory(give[2], 1, 0);
		addItemInventory(give[3], 1, 0);
		clientMessage('Поделись с другом!');
		break;

	}
    }
}

	// ===== Тап по блоку ===== //

function useItem(x, y, z, item, block, side)
{
	switch (item) {
		case 280: //Палочкой!!!
			$debug ? print('280'):null;
			spawnZombie(x, y+1, z, 0);
		break;
		case 353: //Сахарком =D
			spawnBoss(x, y+1, z, 0);
		break; 
		//Эбонитовой палкой-силовое поле
        case items.syringe:
            Entity.addEffect(PLAYER, 6, 1*20, 1, true, false);
            Entity.addEffect(PLAYER, 10, 31*20, 1, true, false);
	}
}

	// ===== Тап по мобу ===== //

function attackHook(a, n){
    if(a==PLAYER){
        var mob = Entity.getNameTag(n);
        switch(Player.getCarriedItem()){
            case items.syringe: //Лечение
                for(var i in mName){
                    if(mob.getNameTag == mName[i]){
                        var a = Level.spawnMob(Entity.getX(n),Entity.getY(n),Entity.getZ(n), mOriginal[i]);
                        Entity.remove(n);
                    }
                }
            break;
        }
    }
}

	// ===== Смерть моба ===== //
	
// Дроп
/* function deathHook(a, v)
{
	var x = Entity.getX(v), y = Entity.getY(v), z = Entity.getZ(v); //ХУЗ
	if(Entity.getEntityTypeId(v) == 11&&){
	Level.dropItem(eX, eY, eZ, 1, zDrop[], 2, 0);//1 Это неизвестный показатель. 450 Это ID предмета который будет дропатся с моба. 2 Это сколько будет дропатся. 0 Это дамаг предмета который будет дропатся.
}}
*/
	// ===== Съедание ===== //
	
function eatHook(h){
    switch(getCarriedItem()){
        case foor.energy:
            Entity.addEffect(PLAYER, MobEffect.movementSpeed, 120*20,4, false, false);
            Entity.addEffect(PLAYER, MobEffect.jump, 120*20,4, false, false);
        break;
	}
}






	// ===== Спавнеры ===== //

//Рядовые зомбари...

function spawnZombie(x, y, z, id){
	if(id == 0){
		var rndZ= Math.floor(Math.random()*count);
	}else{
		var rndZ= id;
	}
	$debug ? clientMessage('§d Spawned zombie: '+rndZ+'§a at X :'+x+' Y: '+y+ ' Z: ' +z+';'):null;
	var zombie = Level.spawnMob(x, y, z, 44, zSkin[rndZ]); //Спавн 
 	Entity.setMaxHealth(zombie, zXp[rndZ]); //ХР
 	Entity.setHealth(zombie, zXp[rndZ]); //ХР
	Entity.setNameTag(zombie, zName[rndZ]); //Погоняло =D
	Entity.setRenderType(zombie, zRender[rndZ]); //Рендер	
}

//Союзники...

function spawnSafeZombie(x, y, z, id){
	if(id == 0){
		var rndZ= Math.floor(Math.random()*count);
	}else{
		var rndZ= id;
	}
	$debug ? clientMessage('§d Spawned zombie: '+rndZ+'§a at X :'+x+' Y: '+y+ ' Z: ' +z+';'):null;
	var zombie = Level.spawnMob(x, y, z, EntityType.ironGolem, zSkin[rndZ]); //Спавн 
 	Entity.setMaxHealth(zombie, zXp[rndZ]); //ХР
 	Entity.setHealth(zombie, zXp[rndZ]); //ХР
	Entity.setNameTag(zombie, zName[rndZ]); //Погоняло =D
	Entity.setRenderType(zombie, zRender[rndZ]); //Рендер	
}


//Боссы...

function spawnBoss(x, y, z, id){
	 var boss = Level.spawnMob(x, y, z, 44, bSkin[id]); //Спавн 
 	Entity.setMaxHealth(boss, bXp[id]); //ХР
 	Entity.setHealth(boss, bXp[id]); //ХР
	Entity.setNameTag(boss, bName[id]); //Погоняло =D
	Entity.setRenderType(boss, bRender[id]); //Рендер	
}

//Зомбирование

function entityAddedHook(added) //Стандартный спавнер майна =D
{
	nX = Entity.getX(added);
	nY = Entity.getY(added);
	nZ = Entity.getZ(added);
	switch(Entity.getEntityTypeId(added)){
		case EntityType.COW: //Зомбирование коров
			var zCow = Level.spawnMob(nX,nY+0.5,nZ, mType[0], mSkin[0]);	
			Entity.setMaxHealth(zCow, mXp[0]); //XP 
			Entity.setHealth(zCow, mXp[0]); //XP
			Entity.setNameTag(zCow, mName[0]); //Погоняло
			Entity.setRenderType(zCow, mRender[0]); //Рендер
			Entity.remove(added); //Нафиг
		break;
		case EntityType.COW: //Зомбирование свиней
		   if(Math.floor(Math.random()*2)==0){
			var zPig = Level.spawnMob(nX,nY+0.5,nZ, mType[1], mSkin[1]);
			Entity.setMaxHealth(zCow, mXp[1]); //XP
			Entity.setHealth(zPig, mXp[1]); //XP
			Entity.setNameTag(zPig, mName[1]); //Погоняло
			Entity.setRenderType(zPig, mRender[1]); //Рендер
			Entity.remove(added); //Нафиг
			$debug ? clientMessage('§cZombiePig!!!'):null;
		   }else{
		   	var zPigM = Level.spawnMob(nX,nY+1,nZ, 36);
		   	$debug ? clientMessage('§cZombiePigMan!!!'):null;
		   }
		break;
		case EntityType.ZOMBIE: //Спавн зомбарей
			$debug ? clientMessage('§cZombie!!!'):null;
			spawnZombie(nX,nY,nZ, 0);
		break;
		case EntityType.VILLAGER: //Зомбирование жителей
			Level.spawnMob(nX,nY,nZ, 44);
			Entity.remove(added);
		break;
	}
}

// ================== Исправление загрузка мобов ================== //

function loadMobs(){//Восстановление текстур и рендера мобов
	var mobs = Entity.getAll();
	for(i in mobs){
		var mob=all[i];
		switch (Entity.getNameTag(mob)){
			case zName[0]:
				Entity.setMobSkin(mob, zSkin[0]);
				Entity.setRenderType(mob, zRender[0]);
			break;
			case zName[1]:
				Entity.setMobSkin(mob, zSkin[1]); 
				Entity.setRenderType(mob, zRender[1]);
			break;
			case zName[2]:
				Entity.setMobSkin(mob, zSkin[2]);
				Entity.setRenderType(mob, zRender[2]);
			break;
			case zName[3]:
				Entity.setMobSkin(mob, zSkin[3]);
				Entity.setRenderType(mob, zRender[3]);
			break;
			case bName[0]:
				Entity.setMobSkin(mob, bSkin[0]);
				Entity.setRenderType(mob, bRender[0]);
			break;
			case mName[0]:
				Entity.setMobSkin(mob, mSkin[0]);
				Entity.setRenderType(mob, mRender[0]);
			break;
			case mName[1]:
				Entity.setMobSkin(mob, mSkin[0]); 
				Entity.setRenderType(mob, mRender[1]);
			break;
			
		}
	}
}

$debug ? print('Мод "Zombie Apocalypse by TeamWorld" загружен!'): null; //Отчёт о загрузке