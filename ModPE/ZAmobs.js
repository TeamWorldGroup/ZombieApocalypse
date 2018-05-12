/*
 * Zombie Apocalypse by TeamWorld
 * ===Все права защищены!===
*/
/*    Отладочная инфа
spawnZombie(x,y,z); - спавнит случайный тип зомби, по координатам
spawnBoss(x,y,z,id); - спавнит босса, с id (0-4), по координатам
*/

//Создаём масивы с зомбарями =)
print('Мобы для мода "Zombie Apocalypse by TeamWorld" загружены!');
var zSkin=['mob/steve.png','mob/alex.png', 'mob/zombie.png', 'mob/rzombie.png'];
var zXp=[1,100, 20, 50];
var zDamage=[1,100, 2, 5];
var zName=['Стив','Алекс', 'Типичный зомби', 'Радиоактивный зомби'];
var zRender=[EntityRenderType.zombie, EntityRenderType.zombie, EntityRenderType.zombie, EntityRenderType.zombie];
var count = 4;

function useItem(x, y, z, item, block, side)
{
	if(item == 280){
//		print('280');
		spawnZombie(x, y+1, z);
	}
	 else if(item == 353){
	 	spawnBoss(x, y+1, z, 0);
	 }
}

function spawnZombie(x, y, z){
	var rndZ= Math.floor(Math.random()*count)
	clientMessage('§d Spawned zombie: '+rndZ+'§a at X :'+x+' Y: '+y+ ' Z: ' +z+';');
	var zombie = Level.spawnMob(x, y, z, 44, zSkin[rndZ]); //Спавн 
 	Entity.setHealth(zombie, zXp[rndZ]); //ХР
	Entity.setNameTag(zombie, zName[rndZ]); //Погоняло =D
	Entity.setRenderType(zombie, zRender[rndZ]); //Рендер	
}

//Боссы
var bSkin = ['mob/strazh.png', 'mob/cow.png'];
var bXp = [1000, 5];
var bDamage = [100, 0];
var bName = ['§cЗомби-страж', 'Корова'];
var bType = [32, 32];
var bRender = [ EntityRenderType.ironGolem, 6];

function spawnBoss(x, y, z, id){
	 var zombie = Level.spawnMob(x, y, z, 44, bSkin[id]); //Спавн 
 	Entity.setHealth(zombie, bXp[id]); //ХР
	Entity.setNameTag(zombie, bName[id]); //Погоняло =D
	Entity.setRenderType(zombie, bRender[id]); //Рендер	
}

// Мобы

var mSkin = ['mob/zcow.png', 'mob/cow.png'];
var mXp = [10, 5];
var mDamage = [2, 0];
var mName = ['§cЗомби корова', 'Корова'];
var mType = [32, 11];
var mRender = [6, 6];

function entityAddedHook(added)
{
	nX = Entity.getX(added);
	nY = Entity.getY(added);
	nZ = Entity.getZ(added);
	 switch(Entity.getEntityTypeId(added)){
	 	case EntityType.COW: //Зомбирование коров
	 	 var zCow = Level.spawnMob(nX,nY+0.5,nZ, mType[0], mSkin[0]);
	 	 Entity.setHealth(zCow, mXp[0]);
	 	 Entity.setNameTag(zCow, mName[0]);
	 	 Entity.setRenderType(zCow, mRender[0]);
	 	 Entity.remove(added);
	 	 break;
	case EntityType.ZOMBIE: //Спавн зомбарей{
		clientMessage('§cZombie!!!');
 	spawnZombie(nX,nY,nZ);
	 break;
//
	 case EntityType.VILLAGER: //Зомбирование жителей{
	 	 Level.spawnMob(nX,nY,nZ, 44);
	 	 Entity.remove(added);
	 break;
}
}

//  ModTick
